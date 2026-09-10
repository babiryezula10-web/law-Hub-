import { Router, Request, Response } from 'express';
import { db } from '../db';
import { LecturerSubmission, StudentSubmission } from '../types';

export const submissionRouter = Router();

/**
 * GET /api/submissions
 * Lecturer materials and coursework assignments.
 */
submissionRouter.get('/submissions', (req: Request, res: Response) => {
  const { role, email } = req.query;
  let items = db.getLecturerSubmissions();

  if (email && typeof email === 'string') {
    const cleanEmail = email.toLowerCase().trim();
    items = items.filter((s) => s.lecturerEmail.toLowerCase().trim() === cleanEmail);
  }

  return res.json({ submissions: items, count: items.length });
});

/**
 * POST /api/submissions
 * Lecturer posts new coursework assignment or material.
 */
submissionRouter.post('/submissions', (req: Request, res: Response) => {
  const { title, courseCode, courseName, lecturerName, lecturerEmail, submissionType, instructions, dueDate, maxScore } = req.body;

  if (!title || !courseCode) {
    return res.status(400).json({ error: 'Title and course code are required.' });
  }

  const newSub: LecturerSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: String(title).trim(),
    courseCode: String(courseCode).trim(),
    courseName: courseName || 'Law Faculty Course',
    lecturerName: lecturerName || 'Dr. Apollo Mukasa',
    lecturerEmail: lecturerEmail ? String(lecturerEmail).trim().toLowerCase() : 'apollo.mukasa@lawhub.ug',
    submissionType: submissionType || 'COURSEWORK',
    instructions: instructions || '',
    dueDate: dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    maxScore: Number(maxScore) || 30,
    uploadedAt: new Date().toISOString(),
    status: 'ACTIVE'
  };

  db.createLecturerSubmission(newSub);
  return res.status(201).json({ success: true, submission: newSub });
});

/**
 * DELETE /api/submissions/:id
 * Removes a lecturer material or coursework.
 */
submissionRouter.delete('/submissions/:id', (req: Request, res: Response) => {
  const deleted = db.deleteLecturerSubmission(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Coursework or material not found.' });
  }
  return res.json({ success: true, message: 'Deleted successfully.' });
});

/**
 * GET /api/student-submissions
 * Student submitted assignments.
 */
submissionRouter.get('/student-submissions', (req: Request, res: Response) => {
  const { studentEmail, lecturerEmail, role } = req.query;
  let items = db.getStudentSubmissions();

  if (studentEmail && typeof studentEmail === 'string') {
    const cleanStudent = studentEmail.toLowerCase().trim();
    items = items.filter((s) => s.studentEmail.toLowerCase().trim() === cleanStudent);
  }

  if (lecturerEmail && typeof lecturerEmail === 'string') {
    const cleanLecturer = lecturerEmail.toLowerCase().trim();
    items = items.filter((s) => s.lecturerEmail.toLowerCase().trim() === cleanLecturer);
  }

  return res.json({ studentSubmissions: items, count: items.length });
});

/**
 * POST /api/student-submissions
 * Student uploads coursework for grading.
 */
submissionRouter.post('/student-submissions', (req: Request, res: Response) => {
  const { assignmentTitle, courseCode, studentName, studentEmail, lecturerEmail, lecturerName, fileName, fileSize } = req.body;

  if (!assignmentTitle || !studentEmail) {
    return res.status(400).json({ error: 'Assignment title and student email are required.' });
  }

  const newSub: StudentSubmission = {
    id: `stud_sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    assignmentTitle: String(assignmentTitle).trim(),
    courseCode: courseCode || 'LAW 1101',
    studentName: studentName || 'Student Scholar',
    studentEmail: String(studentEmail).trim().toLowerCase(),
    lecturerEmail: lecturerEmail ? String(lecturerEmail).trim().toLowerCase() : 'apollo.mukasa@lawhub.ug',
    lecturerName: lecturerName || 'Dr. Apollo Mukasa',
    submittedAt: new Date().toISOString(),
    fileName: fileName || 'Legal_Assignment.pdf',
    fileSize: fileSize || '350 KB',
    status: 'SUBMITTED'
  };

  db.createStudentSubmission(newSub);
  return res.status(201).json({ success: true, submission: newSub });
});

/**
 * POST /api/student-submissions/:id/review
 * Lecturer reviews, grades, and provides feedback on a student submission.
 */
submissionRouter.post('/student-submissions/:id/review', (req: Request, res: Response) => {
  const { grade, feedback, reviewedBy } = req.body;

  if (grade === undefined) {
    return res.status(400).json({ error: 'Grade is required.' });
  }

  const reviewed = db.reviewStudentSubmission(req.params.id, {
    grade: Number(grade),
    feedback: feedback || 'Reviewed and graded.',
    reviewedBy: reviewedBy || 'Dr. Apollo Mukasa',
    status: 'GRADED'
  });

  if (!reviewed) {
    return res.status(404).json({ error: 'Submission not found.' });
  }

  return res.json({ success: true, submission: reviewed });
});

/**
 * DELETE /api/student-submissions/:id
 * Delete a student submission.
 */
submissionRouter.delete('/student-submissions/:id', (req: Request, res: Response) => {
  const deleted = db.deleteStudentSubmission(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Submission not found.' });
  }
  return res.json({ success: true, message: 'Submission removed successfully.' });
});
