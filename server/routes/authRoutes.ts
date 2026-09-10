import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../db';
import {
  hashPassword,
  verifyPassword,
  checkRateLimit,
  recordFailedAttempt,
  resetFailedAttempts,
  createSession,
  getSession,
  activeSessions,
  sanitizeUser,
  requireRole
} from '../middleware/auth';
import { BackendUser, UserRole } from '../types';

export const authRouter = Router();

/**
 * POST /api/auth/register
 * Registers a new user with cryptographic password hashing.
 */
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, role, institution, securityCode } = req.body;

    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (!email || !String(email).trim()) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    if (!password || String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters in length.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(name).trim();

    // Check email uniqueness
    const existing = db.findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({
        error: 'An account with this email already exists. Please sign in or use a different email.'
      });
    }

    // Role validation
    const userRole: UserRole = role === 'Lecturer' ? 'Lecturer' : 'Student';

    if (role === 'Administrator') {
      return res.status(403).json({
        error: 'Administrator accounts cannot be self-registered. Contact platform administration.'
      });
    }

    if (userRole === 'Lecturer') {
      const validCodes = ['FACULTY-2025', 'LAWHUB-FACULTY', 'MUKASA-2025'];
      if (!securityCode || !validCodes.includes(String(securityCode).trim().toUpperCase())) {
        return res.status(403).json({
          error: 'Invalid Faculty Verification Key. Please provide an authentic lecturer authorization code (e.g. FACULTY-2025).'
        });
      }
    }

    // Hash password
    const { salt, hash } = hashPassword(password);

    const newUser: BackendUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      email: cleanEmail,
      role: userRole,
      institution: institution ? String(institution).trim() : 'Faculty of Law',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      status: 'ACTIVE',
      passwordSalt: salt,
      passwordHash: hash,
      authProvider: 'local',
      studyStreakDays: 1,
      completedQuizzes: 0,
      savedNotesCount: 0,
      bookmarkedCasesCount: 0
    };

    db.createUser(newUser);
    const token = createSession(newUser);

    console.log(`[Auth] Registered new ${userRole}: ${cleanEmail} (${cleanName})`);

    return res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(newUser),
      message: `Account created successfully with ${userRole} role.`
    });
  } catch (error: any) {
    console.error('[Auth] Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Authenticates user with email + password.
 */
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !String(email).trim()) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Check rate limit
    const rateCheck = checkRateLimit(cleanEmail);
    if (rateCheck.locked) {
      return res.status(429).json({
        error: `Account temporarily locked due to too many failed attempts. Try again in ${rateCheck.waitSeconds} seconds.`
      });
    }

    // Find user
    const user = db.findUserByEmail(cleanEmail);
    if (!user) {
      recordFailedAttempt(cleanEmail);
      return res.status(401).json({
        error: 'No account found with this email address. Please check your credentials or create a new account.'
      });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({
        error: 'This account has been suspended by the administrator. Contact support for assistance.'
      });
    }

    // Verify password
    const passwordValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
    if (!passwordValid) {
      recordFailedAttempt(cleanEmail);
      return res.status(401).json({
        error: 'Incorrect password. Please try again or use the demo credentials guide.'
      });
    }

    resetFailedAttempts(cleanEmail);
    const token = createSession(user);

    console.log(`[Auth] Login success: ${cleanEmail} (${user.role})`);

    return res.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: `Welcome back, ${user.name}!`
    });
  } catch (error: any) {
    console.error('[Auth] Login error:', error);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

/**
 * POST /api/auth/google
 * Authenticates or registers a user via Google profile data.
 */
authRouter.post('/google', (req: Request, res: Response) => {
  try {
    const { credential, profile } = req.body;

    let googleEmail = '';
    let googleName = '';
    let googlePicture = '';

    if (credential) {
      try {
        const payloadBase64 = credential.split('.')[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
        const payload = JSON.parse(payloadJson);
        googleEmail = payload.email || '';
        googleName = payload.name || payload.given_name || '';
        googlePicture = payload.picture || '';
      } catch (decodeErr) {
        console.warn('[Auth] Failed to decode Google credential JWT:', decodeErr);
        return res.status(400).json({ error: 'Invalid Google credential token.' });
      }
    } else if (profile && profile.email) {
      googleEmail = String(profile.email).trim().toLowerCase();
      googleName = String(profile.name || profile.email.split('@')[0]).trim();
      googlePicture = profile.picture || '';
    } else {
      return res.status(400).json({ error: 'Google authentication requires a credential or profile.' });
    }

    if (!googleEmail) {
      return res.status(400).json({ error: 'Could not extract email from Google profile.' });
    }

    const cleanEmail = googleEmail.toLowerCase().trim();

    let user = db.findUserByEmail(cleanEmail);

    if (!user) {
      // Determine role: If email contains admin or lecturer, match role, else Student
      let inferredRole: UserRole = 'Student';
      if (cleanEmail.includes('admin')) inferredRole = 'Administrator';
      else if (cleanEmail.includes('mukasa') || cleanEmail.includes('lecturer')) inferredRole = 'Lecturer';

      const { salt, hash } = hashPassword(crypto.randomBytes(32).toString('hex'));
      user = {
        id: `usr_google_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: googleName || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: inferredRole,
        institution: inferredRole === 'Administrator' ? 'LawHub Academic Directorate' : 'Faculty of Law',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        status: 'ACTIVE',
        passwordSalt: salt,
        passwordHash: hash,
        authProvider: 'google',
        avatarUrl: googlePicture,
        studyStreakDays: 1,
        completedQuizzes: 0,
        savedNotesCount: 0,
        bookmarkedCasesCount: 0
      };

      db.createUser(user);
      console.log(`[Auth] New Google account registered: ${cleanEmail} (${inferredRole})`);
    } else {
      if (user.status === 'SUSPENDED') {
        return res.status(403).json({
          error: 'This account has been suspended. Contact the administrator.'
        });
      }
    }

    const token = createSession(user);

    console.log(`[Auth] Google login success: ${cleanEmail} (${user.role})`);

    return res.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: `Signed in with Google as ${user.name}.`
    });
  } catch (error: any) {
    console.error('[Auth] Google auth error:', error);
    return res.status(500).json({ error: 'Internal server error during Google authentication.' });
  }
});

/**
 * POST /api/auth/logout
 * Invalidates the user's session token.
 */
authRouter.post('/logout', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization'];
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      activeSessions.delete(token);
    }
    return res.json({ success: true, message: 'Signed out successfully.' });
  } catch (error: any) {
    return res.json({ success: true, message: 'Signed out.' });
  }
});

/**
 * GET /api/auth/me
 * Returns current authenticated profile (via Bearer token or email query fallback).
 */
authRouter.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  let user: BackendUser | undefined;

  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    const session = getSession(token);
    if (session) {
      user = db.findUserById(session.userId) || db.findUserByEmail(session.email);
    }
  }

  // Fallback for prototype / query param synchronization
  if (!user && req.query.email) {
    user = db.findUserByEmail(String(req.query.email));
  }

  if (!user) {
    return res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
  }

  return res.json({ user: sanitizeUser(user) });
});

/**
 * GET /api/users
 * Admin-only: Lists all registered users.
 */
authRouter.get('/users', requireRole(['Administrator']), (req: Request, res: Response) => {
  const users = db.getUsers().map(sanitizeUser);
  return res.json({ users, count: users.length });
});
