export type UserRole = 'Student' | 'Lecturer' | 'Administrator';

export interface BackendUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  joinedDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
  passwordSalt?: string;
  passwordHash?: string;
  authProvider?: 'local' | 'google';
  avatarUrl?: string;
  studyStreakDays?: number;
  completedQuizzes?: number;
  savedNotesCount?: number;
  bookmarkedCasesCount?: number;
}

export interface UserSession {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  token: string;
  expiresAt: number;
}

export interface RateLimitRecord {
  failedAttempts: number;
  lockedUntil: number | null;
  lastAttempt: number;
}

export interface DocumentRecord {
  id: string;
  title: string;
  documentType: 'Constitution' | 'Statute' | 'Case Law' | 'Regulation' | 'Bill' | 'Legal Notice' | 'Academic Commentary';
  category: string;
  description: string;
  authorOrInstitution: string;
  source: string;
  citation: string;
  year: number;
  edition: string;
  date: string;
  tags: string[];
  status: 'PUBLISHED' | 'UNDER_REVIEW' | 'DRAFT' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  verifiedBy?: string;
  fileUrl?: string;
  fileSize?: string;
}

export interface ConstitutionChapter {
  chapterNumber: number;
  chapterTitle: string;
  articlesCount: number;
  schedulesCount: number;
  uploadedBy: string;
  uploadedAt: string;
  fileName: string;
  fileSize: string;
  verificationStatus: string;
  citation: string;
}

export interface LecturerSubmission {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  lecturerName: string;
  lecturerEmail: string;
  submissionType: 'COURSEWORK' | 'READING_MATERIAL' | 'PAST_PAPER' | 'LECTURE_SLIDES';
  instructions?: string;
  dueDate?: string;
  maxScore?: number;
  uploadedAt: string;
  fileName?: string;
  fileSize?: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface StudentSubmission {
  id: string;
  assignmentId?: string;
  assignmentTitle: string;
  courseCode: string;
  studentName: string;
  studentEmail: string;
  lecturerEmail: string;
  lecturerName?: string;
  submittedAt: string;
  fileName: string;
  fileSize: string;
  status: 'SUBMITTED' | 'GRADED' | 'REVISION_REQUESTED';
  grade?: number;
  maxGrade?: number;
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
