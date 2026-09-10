import { BackendUser, DocumentRecord, ConstitutionChapter, LecturerSubmission, StudentSubmission } from '../types';

export const DEFAULT_USER_SEEDS: Omit<BackendUser, 'passwordSalt' | 'passwordHash'>[] = [
  {
    id: 'usr_student_1',
    name: 'Student Scholar',
    email: 'student@lawhub.ug',
    role: 'Student',
    institution: 'Faculty of Law, Makerere University',
    joinedDate: 'January 2025',
    status: 'ACTIVE',
    studyStreakDays: 7,
    completedQuizzes: 12,
    savedNotesCount: 5,
    bookmarkedCasesCount: 8
  },
  {
    id: 'usr_lecturer_1',
    name: 'Dr. Apollo Mukasa',
    email: 'apollo.mukasa@lawhub.ug',
    role: 'Lecturer',
    institution: 'Faculty of Law',
    joinedDate: 'November 2024',
    status: 'ACTIVE'
  },
  {
    id: 'usr_lecturer_generic',
    name: 'Dr. Apollo Mukasa (Faculty)',
    email: 'lecturer@lawhub.ug',
    role: 'Lecturer',
    institution: 'Faculty of Law',
    joinedDate: 'November 2024',
    status: 'ACTIVE'
  },
  {
    id: 'usr_lecturer_2',
    name: 'Dr. Sarah Namubiru',
    email: 'sarah.namubiru@lawhub.ug',
    role: 'Lecturer',
    institution: 'Uganda Christian University (UCU) Law Faculty',
    joinedDate: 'December 2024',
    status: 'ACTIVE'
  },
  {
    id: 'usr_admin_1',
    name: 'Chief Legal Administrator',
    email: 'admin@lawhub.ug',
    role: 'Administrator',
    institution: 'LawHub Editorial Board & Academic Council',
    joinedDate: 'October 2024',
    status: 'ACTIVE'
  },
  {
    id: 'usr_student_2',
    name: 'Ronald Okello',
    email: 'ronald.okello@lawhub.ug',
    role: 'Student',
    institution: 'LLB Year 2',
    joinedDate: 'February 2025',
    status: 'ACTIVE',
    studyStreakDays: 3,
    completedQuizzes: 4,
    savedNotesCount: 2,
    bookmarkedCasesCount: 3
  }
];

export const DEFAULT_CONSTITUTION_DATA: ConstitutionChapter[] = [
  {
    chapterNumber: 1,
    chapterTitle: 'The Constitution',
    articlesCount: 4,
    schedulesCount: 0,
    uploadedBy: 'Chief Legal Administrator',
    uploadedAt: '2025-01-05T00:00:00.000Z',
    fileName: 'Chapter_1_The_Constitution.pdf',
    fileSize: '180 KB',
    verificationStatus: 'VERIFIED',
    citation: 'Const. 1995, Ch. 1'
  },
  {
    chapterNumber: 2,
    chapterTitle: 'The Republic',
    articlesCount: 5,
    schedulesCount: 0,
    uploadedBy: 'Chief Legal Administrator',
    uploadedAt: '2025-01-05T00:00:00.000Z',
    fileName: 'Chapter_2_The_Republic.pdf',
    fileSize: '145 KB',
    verificationStatus: 'VERIFIED',
    citation: 'Const. 1995, Ch. 2'
  },
  {
    chapterNumber: 3,
    chapterTitle: 'Citizenship',
    articlesCount: 9,
    schedulesCount: 0,
    uploadedBy: 'Chief Legal Administrator',
    uploadedAt: '2025-01-05T00:00:00.000Z',
    fileName: 'Chapter_3_Citizenship.pdf',
    fileSize: '210 KB',
    verificationStatus: 'VERIFIED',
    citation: 'Const. 1995, Ch. 3'
  },
  {
    chapterNumber: 4,
    chapterTitle: 'Protection and Promotion of Fundamental and Other Human Rights and Freedoms',
    articlesCount: 39,
    schedulesCount: 0,
    uploadedBy: 'Chief Legal Administrator',
    uploadedAt: '2025-01-05T00:00:00.000Z',
    fileName: 'Chapter_4_Bill_of_Rights.pdf',
    fileSize: '450 KB',
    verificationStatus: 'VERIFIED',
    citation: 'Const. 1995, Ch. 4 (Articles 20-58)'
  },
  {
    chapterNumber: 8,
    chapterTitle: 'The Judiciary',
    articlesCount: 22,
    schedulesCount: 0,
    uploadedBy: 'Chief Legal Administrator',
    uploadedAt: '2025-01-05T00:00:00.000Z',
    fileName: 'Chapter_8_The_Judiciary.pdf',
    fileSize: '320 KB',
    verificationStatus: 'VERIFIED',
    citation: 'Const. 1995, Ch. 8 (Articles 126-147)'
  }
];

export const DEFAULT_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc_const_1995',
    title: 'The Constitution of the Republic of Uganda, 1995 (Consolidated as amended)',
    documentType: 'Constitution',
    category: 'Constitutional Law',
    description: 'Official supreme law of the Republic of Uganda containing 19 Chapters, 288 Articles, 7 Schedules, and constitutional amendments up to Act No. 1 of 2018.',
    authorOrInstitution: 'Parliament of Uganda / The Uganda Gazette',
    source: 'Uganda Legal Information Institute (ULII)',
    citation: 'Const. 1995 (Consolidated Edition)',
    year: 1995,
    edition: 'Consolidated Official Edition',
    date: '1995-10-08',
    tags: ['Constitution', 'Supreme Law', 'Fundamental Rights', 'Parliament', '19 Chapters'],
    status: 'PUBLISHED',
    createdAt: '2025-01-10T00:00:00.000Z',
    updatedAt: '2025-01-10T00:00:00.000Z',
    verifiedBy: 'LawHub Editorial Board'
  },
  {
    id: 'doc_land_act_227',
    title: 'Land Act, Cap 227 (Revised Edition)',
    documentType: 'Statute',
    category: 'Property & Land Law',
    description: 'Comprehensive statutory framework for land tenure, ownership rights, certificates of occupancy, and mandatory spousal consent under Section 39.',
    authorOrInstitution: 'Parliament of Uganda',
    source: 'Uganda Gazette / ULII',
    citation: 'Cap 227',
    year: 1998,
    edition: 'Revised Laws of Uganda',
    date: '1998-07-02',
    tags: ['Land Act', 'Mailo Land', 'Spousal Consent', 'Tenure Systems'],
    status: 'PUBLISHED',
    createdAt: '2025-01-12T00:00:00.000Z',
    updatedAt: '2025-01-12T00:00:00.000Z',
    verifiedBy: 'LawHub Editorial Board'
  },
  {
    id: 'doc_contracts_2010',
    title: 'The Contracts Act, 2010 (Act No. 7 of 2010)',
    documentType: 'Statute',
    category: 'Commercial & Contract Law',
    description: 'Codification of contract principles in Uganda covering offer, acceptance, consideration, vitiating factors, and statutory remedies.',
    authorOrInstitution: 'Parliament of Uganda',
    source: 'Uganda Gazette / Ministry of Justice',
    citation: 'Act 7 of 2010',
    year: 2010,
    edition: 'Official Enactment',
    date: '2010-05-14',
    tags: ['Contracts Act', 'Commercial Law', 'Section 10', 'Remedies'],
    status: 'PUBLISHED',
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z',
    verifiedBy: 'LawHub Editorial Board'
  },
  {
    id: 'doc_cpr_71_1',
    title: 'Civil Procedure Rules (S.I. 71-1)',
    documentType: 'Regulation',
    category: 'Civil Procedure',
    description: 'Subsidiary procedural rules governing civil litigation in the High Court and Magistrates Courts of Uganda.',
    authorOrInstitution: 'Rules Committee / Chief Justice',
    source: 'Uganda Gazette / Judiciary of Uganda',
    citation: 'S.I. 71-1',
    year: 1964,
    edition: 'Consolidated Civil Rules',
    date: '1964-01-01',
    tags: ['Civil Procedure', 'Order 6', 'Order 7', 'Order 36', 'Injunctions'],
    status: 'PUBLISHED',
    createdAt: '2025-01-18T00:00:00.000Z',
    updatedAt: '2025-01-18T00:00:00.000Z',
    verifiedBy: 'LawHub Editorial Board'
  },
  {
    id: 'doc_case_obbo_mwenda',
    title: 'Charles Onyango Obbo & Andrew Mwenda v Attorney General',
    documentType: 'Case Law',
    category: 'Constitutional Law',
    description: 'Supreme Court landmark judgment striking down Section 50 of Penal Code Act (false news) under Article 29 freedom of speech protections.',
    authorOrInstitution: 'Supreme Court of Uganda',
    source: 'ULII [2004] UGSC 1',
    citation: '[2004] UGSC 1 / Const. Appeal No. 2 of 2002',
    year: 2004,
    edition: 'Law Reports of Uganda',
    date: '2004-02-11',
    tags: ['Freedom of Expression', 'Article 29', 'Article 43', 'Constitutional Law'],
    status: 'PUBLISHED',
    createdAt: '2025-01-20T00:00:00.000Z',
    updatedAt: '2025-01-20T00:00:00.000Z',
    verifiedBy: 'LawHub Editorial Board'
  }
];

export const DEFAULT_LECTURER_SUBMISSIONS: LecturerSubmission[] = [
  {
    id: 'sub_land_law_001',
    title: 'Land Law Coursework: Mailo Land vs Customary Rights Analysis',
    courseCode: 'LAW 2101',
    courseName: 'Land Transactions & Property Law',
    lecturerName: 'Dr. Apollo Mukasa',
    lecturerEmail: 'apollo.mukasa@lawhub.ug',
    submissionType: 'COURSEWORK',
    instructions: 'Examine Section 39 of the Land Act regarding mandatory spousal consent in the disposition of family land.',
    dueDate: '2025-03-30',
    maxScore: 30,
    uploadedAt: '2025-02-01T00:00:00.000Z',
    status: 'ACTIVE'
  },
  {
    id: 'sub_const_law_002',
    title: 'Constitutional Law Reading: The Evolution of Public Interest Litigation',
    courseCode: 'LAW 1102',
    courseName: 'Constitutional Law of Uganda',
    lecturerName: 'Dr. Apollo Mukasa',
    lecturerEmail: 'apollo.mukasa@lawhub.ug',
    submissionType: 'READING_MATERIAL',
    instructions: 'Required seminar reading ahead of next week lecture on Article 50 locus standi precedents.',
    uploadedAt: '2025-02-10T00:00:00.000Z',
    status: 'ACTIVE'
  }
];

export const DEFAULT_STUDENT_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'stud_sub_001',
    assignmentId: 'sub_land_law_001',
    assignmentTitle: 'Land Law Coursework: Mailo Land vs Customary Rights Analysis',
    courseCode: 'LAW 2101',
    studentName: 'Student Scholar',
    studentEmail: 'student@lawhub.ug',
    lecturerEmail: 'apollo.mukasa@lawhub.ug',
    lecturerName: 'Dr. Apollo Mukasa',
    submittedAt: '2025-02-15T14:30:00.000Z',
    fileName: 'Land_Law_Coursework_Student_Scholar.pdf',
    fileSize: '420 KB',
    status: 'GRADED',
    grade: 26,
    maxGrade: 30,
    feedback: 'Excellent synthesis of the Supreme Court ruling in Kampala City Council v Ndwaddewazadde. Commendable analysis of spousal consent.',
    reviewedBy: 'Dr. Apollo Mukasa',
    reviewedAt: '2025-02-18T10:15:00.000Z'
  }
];
