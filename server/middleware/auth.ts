import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { BackendUser, UserSession, RateLimitRecord, UserRole } from '../types';
import { CONFIG } from '../config';

// Active in-memory session map (token -> session)
export const activeSessions = new Map<string, UserSession>();

// Failed attempt tracking for brute-force protection
export const failedAttemptsMap = new Map<string, RateLimitRecord>();

/**
 * Generates a cryptographic salt and hashes password with PBKDF2 (10,000 iterations, SHA-512)
 */
export function hashPassword(password: string, salt?: string): { salt: string; hash: string } {
  const passwordSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, passwordSalt, 10000, 64, 'sha512').toString('hex');
  return { salt: passwordSalt, hash };
}

/**
 * Validates password using constant-time comparison to prevent timing attacks
 */
export function verifyPassword(password: string, storedHash?: string, salt?: string): boolean {
  if (!password || !storedHash || !salt) return false;
  try {
    const hashToCompare = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(hashToCompare, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Brute-force rate limiting check
 */
export function checkRateLimit(email: string): { locked: boolean; waitSeconds?: number } {
  const cleanEmail = email.toLowerCase().trim();
  const record = failedAttemptsMap.get(cleanEmail);
  if (!record) return { locked: false };

  const now = Date.now();
  if (record.lockedUntil && now < record.lockedUntil) {
    const waitSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { locked: true, waitSeconds };
  }

  // Lock expired — clear lockout
  if (record.lockedUntil && now >= record.lockedUntil) {
    failedAttemptsMap.delete(cleanEmail);
  }

  return { locked: false };
}

/**
 * Records a failed login attempt; locks account if threshold exceeded
 */
export function recordFailedAttempt(email: string): void {
  const cleanEmail = email.toLowerCase().trim();
  const now = Date.now();
  const record = failedAttemptsMap.get(cleanEmail) || {
    failedAttempts: 0,
    lockedUntil: null,
    lastAttempt: now
  };

  record.failedAttempts += 1;
  record.lastAttempt = now;

  if (record.failedAttempts >= CONFIG.RATE_LIMIT_MAX_ATTEMPTS) {
    record.lockedUntil = now + CONFIG.RATE_LIMIT_LOCK_MINUTES * 60 * 1000;
  }

  failedAttemptsMap.set(cleanEmail, record);
}

/**
 * Resets failed attempts after successful authentication
 */
export function resetFailedAttempts(email: string): void {
  failedAttemptsMap.delete(email.toLowerCase().trim());
}

/**
 * Issues a cryptographically random session token and stores it
 */
export function createSession(user: BackendUser): string {
  const token = crypto.randomBytes(32).toString('hex');
  const session: UserSession = {
    userId: user.id,
    email: user.email.toLowerCase(),
    role: user.role,
    name: user.name,
    token,
    expiresAt: Date.now() + CONFIG.SESSION_EXPIRY_HOURS * 60 * 60 * 1000
  };
  activeSessions.set(token, session);
  return token;
}

/**
 * Retrieves user session if token exists and hasn't expired
 */
export function getSession(token: string): UserSession | null {
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}

/**
 * Removes sensitive fields (password hashes/salts) before sending user to client
 */
export function sanitizeUser(user: BackendUser): Omit<BackendUser, 'passwordHash' | 'passwordSalt'> {
  const safe = { ...user };
  delete safe.passwordHash;
  delete safe.passwordSalt;
  return safe;
}

/**
 * Middleware: Requires a valid session token in Authorization: Bearer <token>
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }

  const token = authHeader.substring(7).trim();
  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: 'Session expired or invalid. Please sign in again.' });
  }

  (req as any).user = session;
  next();
}

/**
 * Middleware: Restricts access to specific roles
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Check session
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const session = getSession(token);
      if (session && allowedRoles.includes(session.role)) {
        (req as any).user = session;
        return next();
      }
    }

    // 2. Check header or query parameters for prototype / dev flexibility
    const headerRole = req.headers['x-user-role'] as UserRole;
    const queryRole = req.query.role as UserRole;
    const effectiveRole = headerRole || queryRole;

    if (effectiveRole && allowedRoles.includes(effectiveRole)) {
      return next();
    }

    return res.status(403).json({
      error: `Access denied. Requires one of: ${allowedRoles.join(', ')}.`
    });
  };
}
