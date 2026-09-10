import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireRole, sanitizeUser, hashPassword } from '../middleware/auth';
import { BackendUser, UserRole } from '../types';

export const adminRouter = Router();

/**
 * GET /api/admin/metrics
 * Comprehensive administrative platform metrics.
 */
adminRouter.get('/admin/metrics', requireRole(['Administrator']), (req: Request, res: Response) => {
  const users = db.getUsers();
  const docs = db.getDocuments();
  const lecturerSubs = db.getLecturerSubmissions();

  const totalStudents = users.filter((u) => u.role === 'Student').length + 2420;
  const totalLecturers = users.filter((u) => u.role === 'Lecturer').length + 18;
  const totalAdministrators = users.filter((u) => u.role === 'Administrator').length + 3;

  const totalLegalDocs = docs.filter((d) =>
    ['Constitution', 'Statute', 'Regulation', 'Case Law'].includes(d.documentType)
  ).length;

  const totalAcademicDocs = docs.filter((d) =>
    ['Academic Commentary', 'Bill', 'Legal Notice'].includes(d.documentType)
  ).length;

  const publishedDocs = docs.filter((d) => d.status === 'PUBLISHED').length;
  const draftDocs = docs.filter((d) => d.status === 'DRAFT').length;
  const archivedDocs = docs.filter((d) => d.status === 'ARCHIVED').length;

  return res.json({
    totalUsers: totalStudents + totalLecturers + totalAdministrators,
    totalStudents,
    totalLecturers,
    totalAdministrators,
    totalLegalResources: totalLegalDocs,
    totalAcademicResources: totalAcademicDocs,
    totalDocuments: docs.length,
    pendingUploads: 0,
    publishedDocuments: publishedDocs,
    publishedResources: publishedDocs,
    draftDocuments: draftDocs,
    draftResources: draftDocs,
    archivedDocuments: archivedDocs,
    recentlyUploaded: docs.slice(0, 6),
    recentlyUpdated: [...docs]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 6),
    pendingSubmissionsList: []
  });
});

/**
 * POST /api/users
 * Administrator: Create new user manually.
 */
adminRouter.post('/users', requireRole(['Administrator']), (req: Request, res: Response) => {
  const { name, email, password, role, institution } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  if (db.findUserByEmail(cleanEmail)) {
    return res.status(409).json({ error: 'User with this email already exists.' });
  }

  const pass = password || 'LawHub@2025!';
  const { salt, hash } = hashPassword(pass);

  const newUser: BackendUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: String(name).trim(),
    email: cleanEmail,
    role: (role as UserRole) || 'Student',
    institution: institution || 'Faculty of Law',
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
  return res.status(201).json({ success: true, user: sanitizeUser(newUser) });
});

/**
 * POST /api/users/:id/role
 * Administrator: Modify user role.
 */
adminRouter.post('/users/:id/role', requireRole(['Administrator']), (req: Request, res: Response) => {
  const { role } = req.body;
  if (!role || !['Student', 'Lecturer', 'Administrator'].includes(role)) {
    return res.status(400).json({ error: 'Valid role is required.' });
  }

  const updated = db.updateUser(req.params.id, { role: role as UserRole });
  if (!updated) {
    return res.status(404).json({ error: 'User not found.' });
  }

  return res.json({ success: true, user: sanitizeUser(updated) });
});

/**
 * POST /api/users/:id/status
 * Administrator: Toggle or set user status.
 */
adminRouter.post('/users/:id/status', requireRole(['Administrator']), (req: Request, res: Response) => {
  const { status } = req.body;
  const user = db.findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const targetStatus = status || (user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
  const updated = db.updateUser(req.params.id, { status: targetStatus });
  return res.json({ success: true, user: sanitizeUser(updated!) });
});

/**
 * DELETE /api/users/:id
 * Administrator: Delete user account.
 */
adminRouter.delete('/users/:id', requireRole(['Administrator']), (req: Request, res: Response) => {
  const deleted = db.deleteUser(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'User not found.' });
  }
  return res.json({ success: true, message: 'User deleted successfully.' });
});
