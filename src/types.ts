export type UserRole = 'Student' | 'Lecturer' | 'Administrator';

export type LegalStatus = 'Current' | 'Amended' | 'Repealed' | 'Superseded' | 'Historical';
export type VerificationStatus = 'VERIFIED' | 'PENDING VERIFICATION' | 'OUTDATED' | 'REPEALED' | 'HISTORICAL';
export type SourceVerification = 'Official Legal Source' | 'LawHub Summary' | 'AI Explanation';

export interface VerifiedSourceMetadata {
  sourceInstitution: string; // e.g. "Parliament of Uganda", "Uganda Legal Information Institute (ULII)", "The Uganda Gazette", "Judiciary of Uganda"
  sourceRef: string; // e.g. "ULII Ref: [1995] UGConst 1", "Acts Supplement No. 7 / Uganda Gazette No. 45", "Judicial Precedents Bulletin"
  dateAccessed: string;
  publicationDate?: string;
  versionYear?: string;
  isCurrent: boolean;
  documentType: 'Constitution' | 'Act of Parliament' | 'Statutory Instrument' | 'Judicial Precedent' | 'Subsidiary Regulation' | 'Academic Curriculum' | 'Past Examination';
  verificationStatus: VerificationStatus;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string; // e.g. Gulu University Faculty of Law
  avatarUrl?: string;
  studyStreakDays: number;
  completedQuizzes: number;
  savedNotesCount: number;
  bookmarkedCasesCount: number;
  bookmarkedArticlesCount?: number;
  bookmarkedStatutesCount?: number;
  joinedDate: string;
}

export interface ConstitutionClause {
  clauseNumber: string;
  text: string;
}

export interface ConstitutionSchedule {
  number: string;
  title: string;
  summary: string;
  content: string;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface ConstitutionAmendmentInfo {
  actName: string;
  year: number;
  actNumber: string;
  promulgationDate: string;
  affectedArticles: string[];
  summary: string;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface ConstitutionArticle {
  number: string; // e.g. "Article 21"
  title: string;
  chapterNumber: number;
  chapterTitle: string;
  content: string;
  clauses?: ConstitutionClause[];
  schedules?: { scheduleNumber: string; title: string; content: string }[];
  amendments?: { year: number; actName: string; summary: string }[];
  keywords: string[];
  keyCases: string[];
  relatedActs?: string[];
  explanation?: string;
  keyPrinciples?: string[];
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface ConstitutionChapter {
  number: number;
  title: string;
  articles: ConstitutionArticle[];
}

export interface StatuteSection {
  sectionNumber: string;
  title: string;
  text: string;
  subsections?: string[];
  amendmentNotes?: string;
  keyCases?: string[];
}

export interface Statute {
  id: string;
  shortTitle: string;
  officialTitle?: string;
  longTitle: string;
  chapterNumber?: string; // Cap number or Act No.
  year: number;
  commencementDate: string;
  summary: string;
  status?: LegalStatus;
  sections: StatuteSection[];
  schedules?: string[];
  amendments?: string[];
  amendmentHistory?: { year: number; amendmentAct: string; description: string }[];
  repeals?: string[];
  relatedRegulations?: string[]; // Titles or IDs of related SIs / Regulations
  relatedCases: string[];
  relatedConstitutionalArticles?: string[];
  category: string;
  sourceType?: SourceVerification;
  officialSourceUrl?: string;
  fullTextAvailable?: boolean;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface Regulation {
  id: string;
  name: string;
  siNumber: string; // e.g. "S.I. No. 45 of 2019"
  year: number;
  parentActId: string;
  parentActTitle: string;
  regulationNumber?: string;
  commencementDate?: string;
  status: LegalStatus;
  summary: string;
  fullText?: string;
  schedules?: string[];
  relatedCases: string[];
  subject: string;
  keywords: string[];
  sourceType?: SourceVerification;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface StatutoryInstrument {
  id: string;
  siNumber: string; // e.g. "S.I. 71-1"
  year: number;
  title: string;
  type: 'Regulation' | 'Order' | 'Rules' | 'Legal Notice' | 'By-law' | 'Proclamation' | 'Direction' | 'Government Notice';
  parentLegislation: string;
  datePromulgated: string;
  status: LegalStatus;
  contentSummary: string;
  fullText?: string;
  schedules?: string[];
  relatedCases: string[];
  subjectCategory: string;
  sourceType?: SourceVerification;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface LegalCase {
  id: string;
  caseName: string;
  citation: string;
  court: 'Supreme Court' | 'Court of Appeal' | 'High Court' | 'Industrial Court' | 'Tax Appeals Tribunal' | 'Equal Opportunities Commission' | string;
  caseNumber?: string;
  judges: string[];
  parties?: { appellantOrPlaintiff: string; respondentOrDefendant: string };
  year: number;
  dateDecided?: string;
  facts: string;
  issues: string[];
  arguments?: { party: string; points: string[] }[];
  decision: string;
  orders?: string[];
  ratioDecidendi: string;
  obiterDicta?: string;
  legalPrinciples: string[];
  relatedStatutes?: string[];
  statutesConsidered?: string[];
  regulationsConsidered?: string[];
  constitutionalArticlesConsidered?: string[];
  relatedCases?: string[];
  casesFollowed?: string[];
  casesDistinguished?: string[];
  casesOverruled?: string[];
  topic: string;
  keywords?: string[];
  fullTextAvailable: boolean;
  fullJudgmentExcerpt?: string;
  sourceType?: SourceVerification;
  officialSourceUrl?: string;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface CourseTopicDetail {
  id: string;
  topicTitle: string;
  subtopics: string[];
  definitions: { term: string; definition: string }[];
  studyNotes: string;
  constitutionalProvisions: string[];
  statutes: string[];
  regulations: string[];
  landmarkCases: string[];
  practicalExamples: string[];
  revisionSummaries: string[];
  keyPoints: string[];
  revisionQuestions: {
    shortAnswerQuestions: string[];
    essayQuestions: string[];
    mcqs: { question: string; options: string[]; answer: string; explanation: string }[];
  };
}

export interface CourseModule {
  id: string;
  title: string;
  overview: string;
  notes: string;
  topics?: CourseTopicDetail[];
  definitions?: { term: string; definition: string }[];
  keyCases: string[];
  keyStatutes: string[];
  keyRegulations?: string[];
  constitutionalProvisions?: string[];
  practicalExamples?: string[];
  keyPoints?: string[];
  revisionSummaries?: string[];
  readingList: string[];
  practiceQuestion: string;
  modelAnswer: string;
  shortAnswerQuestions?: string[];
  essayQuestions?: string[];
  mcqs?: { question: string; options: string[]; answer: string; explanation: string }[];
  flashcards: { front: string; back: string }[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: 'Public Law' | 'Private Law' | 'Commercial Law' | 'Procedural & Clinical Law' | 'Specialized Law';
  description: string;
  level: string; // e.g., Year 1 LLB, Year 2 LLB, Year 3 LLB, Year 4 LLB, LDC Bar Course
  modulesCount: number;
  enrolledStudentsCount: number;
  courseOverview?: string;
  coreStatutes?: string[];
  coreCases?: string[];
  sourceMetadata?: VerifiedSourceMetadata;
  modules: CourseModule[];
}

export interface PastPaper {
  id: string;
  title: string;
  institution: string;
  courseCode: string;
  courseTitle: string;
  year: number;
  semester: string;
  lecturer: string;
  examType?: 'End of Semester' | 'Mid-Term Test' | 'Special / Supplementary' | 'Bar Course Pre-Entry / Final';
  questions: string[];
  hasModelAnswers: boolean;
  modelAnswerSummary?: string;
  sourceMetadata?: VerifiedSourceMetadata;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'fill_blank' | 'essay';
  question: string;
  options?: string[]; // for mcq
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseTitle: string;
  durationMinutes: number;
  totalQuestions: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'LDC Bar Level';
  questions: QuizQuestion[];
}

export interface SavedNote {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface LegalDraftTemplate {
  id: string;
  title: string;
  category: 'Agreements' | 'Court Documents' | 'Affidavits' | 'Corporate' | 'Formal Letters';
  description: string;
  requiredFields: { key: string; label: string; placeholder: string; type?: string }[];
  defaultTemplate: string;
}

export interface LegalDictionaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  definition: string;
  simpleExplanation: string;
  legalMeaning: string;
  exampleSentence: string;
  relatedTerms: string[];
  relevantCases: string[];
  relevantStatutes: string[];
  category: string;
}

export interface LegalMaxim {
  id: string;
  latinPhrase: string;
  englishTranslation: string;
  explanation: string;
  practicalExample: string;
  legalPrinciple: string;
  relevantUgandanCases: string[];
}

export interface BlacksLawTerm {
  id: string;
  term: string;
  etymology?: string; // e.g. Latin, Anglo-Norman, Old English
  edition: string; // e.g., 11th Edition Standard / Centennial
  definition: string;
  subDefinitions?: string[];
  ugandanApplication: string;
  crossReferences: string[];
  category: string;
}

export interface RedVolumeEntry {
  id: string;
  volumeNumber: 1 | 2;
  volumeTitle: string; // e.g. "Red Volume 1: Civil Procedure, Practice Directions & Remedies"
  partTitle: string; // e.g. "Part I: High Court Civil Procedure & Pleadings"
  title: string;
  statutoryRef: string; // e.g. Civil Procedure Act Cap 71 / S.I. 71-1
  summary: string;
  fullText?: string;
  keyRulesOrForms?: string[];
  practiceDirections?: string[];
  relatedCases?: string[];
  subject: string;
}

export interface LegalResourceGuide {
  id: string;
  title: string;
  category: 'Moot Court' | 'Citation & OSCOLA' | 'Legal Drafting' | 'Essay Writing' | 'Exam Technique' | 'Case Briefing';
  description: string;
  sections: { heading: string; body: string; keyTips?: string[] }[];
}

export type DocumentType = 
  | 'Constitution'
  | 'Statute'
  | 'Regulation'
  | 'Statutory Instrument'
  | 'Case Law'
  | 'Academic Material'
  | 'Past Paper'
  | 'Blacks Law Reference'
  | 'Red Volume Entry'
  | 'Legal Resource';

export interface UploadedDocument {
  id: string;
  title: string;
  documentType: DocumentType;
  category: string;
  description: string;
  authorOrInstitution: string;
  source: string;
  citation?: string;
  year?: number;
  edition?: string;
  date?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  fileContent?: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  verifiedBy?: string;
}

export interface AdminMetrics {
  totalUsers: number;
  totalStudents: number;
  totalLecturers: number;
  totalAdministrators: number;
  totalLegalResources: number;
  totalAcademicResources: number;
  totalDocuments: number;
  pendingUploads: number;
  publishedDocuments: number;
  publishedResources: number;
  draftDocuments: number;
  draftResources: number;
  archivedDocuments: number;
  recentlyUploaded: UploadedDocument[];
  recentlyUpdated: UploadedDocument[];
}

export type LecturerSubmissionStatus = 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED' | 'PUBLISHED' | 'ARCHIVED';

export type LecturerDocumentType =
  | 'Lecture Notes'
  | 'Course Outline'
  | 'Assignment'
  | 'Past Examination Paper'
  | 'Reading Material'
  | 'Case Material'
  | 'Revision Material'
  | 'Research Material'
  | 'Class Handout';

export interface LecturerSubmission {
  id: string;
  title: string;
  courseOrUnit: string;
  description: string;
  lecturerName: string;
  lecturerEmail: string;
  institution?: string;
  academicYear: string;
  documentType: LecturerDocumentType | string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  fileContent?: string;
  tags: string[];
  status: LecturerSubmissionStatus;
  adminFeedback?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface PersonalConstitutionNote {
  articleNumber: string;
  noteText: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  joinedDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export type StudentAssignmentStatus =
  | 'PENDING_REVIEW'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'CHANGES_REQUESTED'
  | 'REJECTED'
  | 'GRADED';

export interface StudentSubmission {
  id: string;
  studentId?: string;
  studentName: string;
  studentEmail: string;
  institution?: string;
  assignmentTitle: string;
  courseOrUnit: string;
  lecturerName?: string;
  lecturerEmail?: string;
  submissionNotes: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  fileContent?: string;
  status: StudentAssignmentStatus;
  grade?: string;
  lecturerFeedback?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}



