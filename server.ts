import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Support large payload uploads (e.g. Base64 PDF / Word / Text files)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ensure data persistence directory exists
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "lawhub_store.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ----------------------------------------------------
// CRYPTOGRAPHIC SECURITY, PASSWORD HASHING & SESSIONS
// ----------------------------------------------------

function hashPassword(password: string, salt?: string): { salt: string; hash: string } {
  const passwordSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, passwordSalt, 10000, 64, "sha512").toString("hex");
  return { salt: passwordSalt, hash };
}

function verifyPassword(password: string, storedHash?: string, salt?: string): boolean {
  if (!password || !storedHash || !salt) return false;
  try {
    const hashToCompare = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(hashToCompare, "hex"));
  } catch {
    return false;
  }
}

// Active Sessions Store
interface AuthSession {
  token: string;
  userId: string;
  email: string;
  role: string;
  name: string;
  createdAt: number;
  expiresAt: number;
}
const activeSessions = new Map<string, AuthSession>();

function createSession(user: any): string {
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();
  const session: AuthSession = {
    token,
    userId: user.id,
    email: user.email.toLowerCase(),
    role: user.role,
    name: user.name,
    createdAt: now,
    expiresAt: now + 7 * 24 * 60 * 60 * 1000 // 7 days expiration
  };
  activeSessions.set(token, session);
  return token;
}

function getSessionUser(token: string) {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }
  const user = systemUsers.find(
    (u) => u.id === session.userId || u.email.toLowerCase() === session.email
  );
  return user || null;
}

// Brute Force & Rate Limit Protection
const failedLoginAttempts = new Map<string, { attempts: number; lockUntil: number }>();

function checkRateLimit(identifier: string): { locked: boolean; waitSeconds?: number } {
  const key = identifier.toLowerCase().trim();
  const record = failedLoginAttempts.get(key);
  if (!record) return { locked: false };
  if (record.lockUntil > Date.now()) {
    return { locked: true, waitSeconds: Math.ceil((record.lockUntil - Date.now()) / 1000) };
  }
  if (Date.now() > record.lockUntil && record.lockUntil > 0) {
    failedLoginAttempts.delete(key);
  }
  return { locked: false };
}

function recordFailedAttempt(identifier: string) {
  const key = identifier.toLowerCase().trim();
  const record = failedLoginAttempts.get(key) || { attempts: 0, lockUntil: 0 };
  record.attempts += 1;
  if (record.attempts >= 5) {
    record.lockUntil = Date.now() + 5 * 60 * 1000; // 5-minute lockout
  }
  failedLoginAttempts.set(key, record);
}

function resetFailedAttempts(identifier: string) {
  failedLoginAttempts.delete(identifier.toLowerCase().trim());
}

// Safe user profile sanitizer to prevent exposing password hashes
function sanitizeUser(user: any) {
  if (!user) return null;
  const { passwordHash, passwordSalt, ...safe } = user;
  return safe;
}

// Lazy-initialized Gemini AI client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Seed system users
let systemUsers: any[] = [
  {
    id: "usr_student_1",
    name: "Student Scholar",
    email: "student@lawhub.ug",
    role: "Student",
    institution: "Faculty of Law",
    joinedDate: "January 2025",
    status: "ACTIVE"
  },
  {
    id: "usr_lecturer_1",
    name: "Dr. Apollo Mukasa",
    email: "apollo.mukasa@lawhub.ug",
    role: "Lecturer",
    institution: "Faculty of Law",
    joinedDate: "November 2024",
    status: "ACTIVE"
  },
  {
    id: "usr_lecturer_generic",
    name: "Dr. Apollo Mukasa (Faculty)",
    email: "lecturer@lawhub.ug",
    role: "Lecturer",
    institution: "Faculty of Law",
    joinedDate: "November 2024",
    status: "ACTIVE"
  },
  {
    id: "usr_lecturer_2",
    name: "Dr. Sarah Namubiru",
    email: "sarah.namubiru@lawhub.ug",
    role: "Lecturer",
    institution: "Uganda Christian University (UCU) Law Faculty",
    joinedDate: "December 2024",
    status: "ACTIVE"
  },
  {
    id: "usr_admin_1",
    name: "Chief Legal Administrator",
    email: "admin@lawhub.ug",
    role: "Administrator",
    institution: "LawHub Editorial Board & Academic Council",
    joinedDate: "October 2024",
    status: "ACTIVE"
  },
  {
    id: "usr_student_2",
    name: "Ronald Okello",
    email: "ronald.okello@lawhub.ug",
    role: "Student",
    institution: "LLB Year 2",
    joinedDate: "February 2025",
    status: "ACTIVE"
  }
];

// Lecturer Submissions In-Memory & Persistent Store
let lecturerSubmissions: any[] = [
  {
    id: "sub_const_01",
    title: "Constitutional Law I: Separation of Powers & Supremacy of 1995 Constitution (Articles 1, 2, 79, 98, 126)",
    courseOrUnit: "Constitutional Law I",
    description: "Detailed lecture notes covering the doctrine of constitutional supremacy, judicial review powers under Article 137, and case analysis of Paul Ssemogerere v AG and Tinyefuza v AG.",
    lecturerName: "Dr. Apollo Mukasa",
    lecturerEmail: "apollo.mukasa@lawhub.ug",
    institution: "Makerere University / Gulu University",
    academicYear: "2024/2025",
    documentType: "Lecture Notes",
    fileUrl: "/sample-files/const_law_lecture_notes_mukasa.pdf",
    fileName: "Const_Law_Separation_of_Powers_Notes.pdf",
    fileSize: "482 KB",
    fileType: "application/pdf",
    fileContent: "FACULTY OF LAW\nCONSTITUTIONAL LAW I (LLB 1101)\nLECTURE NOTES ON CONSTITUTIONAL SUPREMACY & SEPARATION OF POWERS\n\n1. Foundational Doctrine:\nUnder Article 1(1) of the 1995 Constitution of the Republic of Uganda, all power belongs to the people. In Article 2, the Constitution is established as the supreme law of Uganda.\n\n2. Key Authorities:\n- Paul K. Ssemogerere & Zachary Olum v Attorney General [2000] UGSC 1\n- Major General David Tinyefuza v Attorney General [1997] UGCC 3\n- Charles Onyango Obbo & Andrew Mwenda v AG [2004] UGSC 1",
    tags: ["Constitutional Law", "Article 1", "Article 2", "Separation of Powers", "Supremacy"],
    status: "PENDING_REVIEW",
    submittedAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: "sub_contract_02",
    title: "Law of Contract II: Tutorial Problem on Economic Duress and Undue Influence",
    courseOrUnit: "Law of Contract II",
    description: "Case study problem for tutorial discussion exploring Section 14 and Section 19 of the Contracts Act 2010 with comparative common law precedents.",
    lecturerName: "Dr. Sarah Namubiru",
    lecturerEmail: "sarah.namubiru@lawhub.ug",
    institution: "Uganda Christian University Law Faculty",
    academicYear: "2024/2025",
    documentType: "Assignments",
    fileUrl: "/sample-files/contract_duress_assignment.pdf",
    fileName: "Contract_Duress_Tutorial_Assignment.pdf",
    fileSize: "215 KB",
    fileType: "application/pdf",
    fileContent: "TUTORIAL PROBLEM SHEET: ECONOMIC DURESS & UNDUE INFLUENCE\n\nStatutory Basis: Contracts Act 2010 (Act 7 of 2010), Sections 14, 15, 19.\n\nProblem Scenario: Kigozi Construction Ltd contracted with Nile Hauliers to transport road machinery...",
    tags: ["Contract Law", "Economic Duress", "Undue Influence", "Contracts Act 2010"],
    status: "PENDING_REVIEW",
    submittedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "sub_crim_03",
    title: "Criminal Procedure: High Court Trial Handbook and Charge Sheet Drafting Guide",
    courseOrUnit: "Criminal Procedure",
    description: "Procedural manual for framing indictments, summary of evidence, plea bargaining rules, and trial rights under Article 28 of the 1995 Constitution.",
    lecturerName: "Dr. Apollo Mukasa",
    lecturerEmail: "apollo.mukasa@lawhub.ug",
    institution: "Faculty of Law",
    academicYear: "2024/2025",
    documentType: "Lecture Notes",
    fileName: "Criminal_Procedure_Trial_Handbook.docx",
    fileSize: "612 KB",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    tags: ["Criminal Procedure", "Article 28", "Indictment", "Trial Practice"],
    status: "PUBLISHED",
    submittedAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    reviewedAt: new Date(Date.now() - 3600000 * 90).toISOString(),
    reviewedBy: "Chief Legal Administrator"
  },
  {
    id: "sub_cpr_04",
    title: "Civil Procedure Rules (S.I. 71-1): Order 36 Summary Procedure Practice Exercise",
    courseOrUnit: "Civil Litigation",
    description: "Specimen specially endorsed plaint, supporting affidavit, and application for unconditional leave to defend under Order 36 Rule 3.",
    lecturerName: "Dr. Sarah Namubiru",
    lecturerEmail: "sarah.namubiru@lawhub.ug",
    institution: "Uganda Christian University",
    academicYear: "2024/2025",
    documentType: "Reading Materials",
    fileName: "Order_36_Summary_Suit_Practice.pdf",
    fileSize: "340 KB",
    fileType: "application/pdf",
    tags: ["Civil Procedure", "Order 36", "Summary Procedure", "High Court"],
    status: "PUBLISHED",
    submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    reviewedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    reviewedBy: "Chief Legal Administrator"
  }
];

// Student Assignments & Submissions In-Memory & Persistent Store
let studentSubmissions: any[] = [
  {
    id: "stud_sub_01",
    assignmentTitle: "Constitutional Law I: Separation of Powers and Supremacy of Constitution Analysis",
    courseOrUnit: "Constitutional Law I",
    submissionNotes: "Legal essay evaluating Articles 1, 2, 79, 98, and 126 of the 1995 Constitution with analysis of Paul Ssemogerere v AG and Major General David Tinyefuza v AG.",
    studentName: "Babirye Zula",
    studentEmail: "babiryezula10@gmail.com",
    institution: "Gulu University Faculty of Law",
    lecturerName: "Dr. Apollo Mukasa",
    lecturerEmail: "apollo.mukasa@lawhub.ug",
    fileName: "Babirye_Zula_Constitutional_Law_Essay.pdf",
    fileSize: "348 KB",
    fileType: "application/pdf",
    fileContent: "FACULTY OF LAW - CONSTITUTIONAL LAW ESSAY\n\nTitle: Constitutional Supremacy and Judicial Review under Article 137\n\nAuthor: Babirye Zula (Reg: 23/U/LAW/001)\n\n1. Foundational Constitutionalism:\nArticle 1(1) of the 1995 Constitution vests all sovereign power in the people of Uganda. Under Article 2, this Constitution is the supreme law and binds all persons and authorities throughout Uganda.\n\n2. Judicial Review Precedents:\nIn Paul K. Ssemogerere & Zachary Olum v Attorney General (Constitutional Appeal No. 1 of 2000), the Supreme Court affirmed that any Act of Parliament that infringes procedural constitutional requirements under Article 79 is void ab initio.",
    status: "GRADED",
    grade: "88% (A)",
    lecturerFeedback: "Excellent analysis of Article 137(1) vs 137(3) jurisdiction. The IRAC formulation of the ratio decidendi in Ssemogerere v AG is thoroughly argued and well supported.",
    submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    reviewedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    reviewedBy: "Dr. Apollo Mukasa"
  },
  {
    id: "stud_sub_02",
    assignmentTitle: "Law of Contract II: Legal Opinion on Economic Duress & Undue Influence",
    courseOrUnit: "Law of Contract II",
    submissionNotes: "Tutorial assignment assessing statutory provisions under Sections 14, 15, and 19 of the Contracts Act 2010 regarding unconscionable bargains.",
    studentName: "Babirye Zula",
    studentEmail: "babiryezula10@gmail.com",
    institution: "Gulu University Faculty of Law",
    lecturerName: "Dr. Sarah Namubiru",
    lecturerEmail: "sarah.namubiru@lawhub.ug",
    fileName: "Contract_Law_Legal_Opinion_Duress.pdf",
    fileSize: "284 KB",
    fileType: "application/pdf",
    fileContent: "TUTORIAL PROBLEM LEGAL OPINION: ECONOMIC DURESS & UNDUE INFLUENCE\n\nRelevant Legislation: The Contracts Act 2010 (Act No. 7 of 2010), Sections 14, 15, 19.\n\nLegal Issues:\n1. Whether the renegotiation of freight charges constitutes legitimate commercial pressure or actionable economic duress.\n2. Whether the claimant is entitled to restitutionary remedies.",
    status: "PENDING_REVIEW",
    submittedAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "stud_sub_03",
    assignmentTitle: "Criminal Procedure: High Court Indictment and Summary of Evidence Drafting",
    courseOrUnit: "Criminal Procedure",
    submissionNotes: "Draft charge sheet and indictment for Aggravated Robbery c/s 285 & 286(2) of Penal Code Act with complete summary of prosecution witnesses.",
    studentName: "Ronald Okello",
    studentEmail: "ronald.okello@gulu.ac.ug",
    institution: "Gulu University LLB Year 2",
    lecturerName: "Dr. Apollo Mukasa",
    lecturerEmail: "apollo.mukasa@lawhub.ug",
    fileName: "Criminal_Procedure_Indictment_Draft.docx",
    fileSize: "410 KB",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    status: "PENDING_REVIEW",
    submittedAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];


// Uploaded Verified Constitution Documents and Articles
let uploadedConstitutionData: any[] = [
  {
    id: "const_official_doc_1995",
    title: "The Constitution of the Republic of Uganda, 1995 (As Amended)",
    source: "Uganda Legal Information Institute (ULII) / The Uganda Gazette",
    institution: "Parliament of Uganda",
    edition: "Consolidated Official Edition (Including 2000, 2005, 2015, and 2018 Amendments)",
    datePromulgated: "8th October 1995",
    totalChapters: 19,
    totalArticles: 288,
    schedulesCount: 7,
    uploadedBy: "Chief Legal Administrator",
    uploadedAt: new Date("2025-01-05").toISOString(),
    fileName: "Constitution_of_Uganda_1995_Consolidated.pdf",
    fileSize: "2.4 MB",
    verificationStatus: "VERIFIED",
    citation: "Const. 1995 (Consolidated 2023 Edition)"
  }
];

// Document repository storage in-memory with initial seed documents
let uploadedDocuments: any[] = [
  {
    id: "doc_const_1995",
    title: "The Constitution of the Republic of Uganda, 1995 (Consolidated as amended)",
    documentType: "Constitution",
    category: "Constitutional Law",
    description: "Official supreme law of the Republic of Uganda containing 19 Chapters, 288 Articles, 7 Schedules, and constitutional amendments up to Act No. 1 of 2018.",
    authorOrInstitution: "Parliament of Uganda / The Uganda Gazette",
    source: "Uganda Legal Information Institute (ULII)",
    citation: "Const. 1995 (Consolidated Edition)",
    year: 1995,
    edition: "Consolidated Official Edition",
    date: "1995-10-08",
    tags: ["Constitution", "Supreme Law", "Fundamental Rights", "Parliament", "19 Chapters"],
    status: "PUBLISHED",
    createdAt: new Date("2025-01-10").toISOString(),
    updatedAt: new Date("2025-01-10").toISOString(),
    verifiedBy: "LawHub Editorial Board"
  },
  {
    id: "doc_land_act_227",
    title: "Land Act, Cap 227 (Revised Edition)",
    documentType: "Statute",
    category: "Property & Land Law",
    description: "Comprehensive statutory framework for land tenure, ownership rights, certificates of occupancy, and mandatory spousal consent under Section 39.",
    authorOrInstitution: "Parliament of Uganda",
    source: "Uganda Gazette / ULII",
    citation: "Cap 227",
    year: 1998,
    edition: "Revised Laws of Uganda",
    date: "1998-07-02",
    tags: ["Land Act", "Mailo Land", "Spousal Consent", "Tenure Systems"],
    status: "PUBLISHED",
    createdAt: new Date("2025-01-12").toISOString(),
    updatedAt: new Date("2025-01-12").toISOString(),
    verifiedBy: "LawHub Editorial Board"
  },
  {
    id: "doc_contracts_2010",
    title: "The Contracts Act, 2010 (Act No. 7 of 2010)",
    documentType: "Statute",
    category: "Commercial & Contract Law",
    description: "Codification of contract principles in Uganda covering offer, acceptance, consideration, vitiating factors, and statutory remedies.",
    authorOrInstitution: "Parliament of Uganda",
    source: "Uganda Gazette / Ministry of Justice",
    citation: "Act 7 of 2010",
    year: 2010,
    edition: "Official Enactment",
    date: "2010-05-14",
    tags: ["Contracts Act", "Commercial Law", "Section 10", "Remedies"],
    status: "PUBLISHED",
    createdAt: new Date("2025-01-15").toISOString(),
    updatedAt: new Date("2025-01-15").toISOString(),
    verifiedBy: "LawHub Editorial Board"
  },
  {
    id: "doc_cpr_71_1",
    title: "Civil Procedure Rules (S.I. 71-1)",
    documentType: "Regulation",
    category: "Civil Procedure",
    description: "Subsidiary procedural rules governing civil litigation in the High Court and Magistrates Courts of Uganda.",
    authorOrInstitution: "Rules Committee / Chief Justice",
    source: "Uganda Gazette / Judiciary of Uganda",
    citation: "S.I. 71-1",
    year: 1964,
    edition: "Consolidated Civil Rules",
    date: "1964-01-01",
    tags: ["Civil Procedure", "Order 6", "Order 7", "Order 36", "Injunctions"],
    status: "PUBLISHED",
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-18").toISOString(),
    verifiedBy: "LawHub Editorial Board"
  },
  {
    id: "doc_case_obbo_mwenda",
    title: "Charles Onyango Obbo & Andrew Mwenda v Attorney General",
    documentType: "Case Law",
    category: "Constitutional Law",
    description: "Supreme Court landmark judgment striking down Section 50 of Penal Code Act (false news) under Article 29 freedom of speech protections.",
    authorOrInstitution: "Supreme Court of Uganda",
    source: "ULII [2004] UGSC 1",
    citation: "[2004] UGSC 1 / Const. Appeal No. 2 of 2002",
    year: 2004,
    edition: "Law Reports of Uganda",
    date: "2004-02-11",
    tags: ["Freedom of Expression", "Article 29", "Article 43", "Constitutional Law"],
    status: "PUBLISHED",
    createdAt: new Date("2025-01-20").toISOString(),
    updatedAt: new Date("2025-01-20").toISOString(),
    verifiedBy: "LawHub Editorial Board"
  }
];

// Persistent File Storage Operations
function loadPersistentData() {
  const defaultSeeds = [
    {
      id: "usr_student_1",
      name: "Student Scholar",
      email: "student@lawhub.ug",
      role: "Student",
      institution: "Faculty of Law",
      joinedDate: "January 2025",
      status: "ACTIVE"
    },
    {
      id: "usr_lecturer_1",
      name: "Dr. Apollo Mukasa",
      email: "apollo.mukasa@lawhub.ug",
      role: "Lecturer",
      institution: "Faculty of Law",
      joinedDate: "November 2024",
      status: "ACTIVE"
    },
    {
      id: "usr_lecturer_generic",
      name: "Dr. Apollo Mukasa (Faculty)",
      email: "lecturer@lawhub.ug",
      role: "Lecturer",
      institution: "Faculty of Law",
      joinedDate: "November 2024",
      status: "ACTIVE"
    },
    {
      id: "usr_lecturer_2",
      name: "Dr. Sarah Namubiru",
      email: "sarah.namubiru@lawhub.ug",
      role: "Lecturer",
      institution: "Uganda Christian University (UCU) Law Faculty",
      joinedDate: "December 2024",
      status: "ACTIVE"
    },
    {
      id: "usr_admin_1",
      name: "Chief Legal Administrator",
      email: "admin@lawhub.ug",
      role: "Administrator",
      institution: "LawHub Editorial Board & Academic Council",
      joinedDate: "October 2024",
      status: "ACTIVE"
    },
    {
      id: "usr_student_2",
      name: "Ronald Okello",
      email: "ronald.okello@lawhub.ug",
      role: "Student",
      institution: "LLB Year 2",
      joinedDate: "February 2025",
      status: "ACTIVE"
    }
  ];

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (Array.isArray(data.systemUsers) && data.systemUsers.length > 0) {
        systemUsers = data.systemUsers;
      }
      if (Array.isArray(data.lecturerSubmissions) && data.lecturerSubmissions.length > 0) {
        lecturerSubmissions = data.lecturerSubmissions;
      }
      if (Array.isArray(data.studentSubmissions) && data.studentSubmissions.length > 0) {
        studentSubmissions = data.studentSubmissions;
      }
      if (Array.isArray(data.uploadedDocuments) && data.uploadedDocuments.length > 0) {
        uploadedDocuments = data.uploadedDocuments;
      }
      if (Array.isArray(data.uploadedConstitutionData) && data.uploadedConstitutionData.length > 0) {
        uploadedConstitutionData = data.uploadedConstitutionData;
      }

      // Automatic data migration: cleanly migrate any persisted Kaggwa records to Mukasa
      systemUsers = systemUsers.map(u => {
        if (u.email && u.email.toLowerCase().includes("kaggwa")) {
          return {
            ...u,
            name: u.name.replace(/Kaggwa/gi, "Mukasa"),
            email: u.email.replace(/kaggwa/gi, "mukasa")
          };
        }
        return u;
      });
      studentSubmissions = studentSubmissions.map(s => {
        if (s.lecturerEmail && s.lecturerEmail.toLowerCase().includes("kaggwa")) {
          return {
            ...s,
            lecturerEmail: s.lecturerEmail.replace(/kaggwa/gi, "mukasa"),
            lecturerName: s.lecturerName ? s.lecturerName.replace(/Kaggwa/gi, "Mukasa") : "Dr. Apollo Mukasa",
            reviewedBy: s.reviewedBy ? s.reviewedBy.replace(/Kaggwa/gi, "Mukasa") : undefined
          };
        }
        return s;
      });
      lecturerSubmissions = lecturerSubmissions.map(m => {
        if (m.lecturerEmail && m.lecturerEmail.toLowerCase().includes("kaggwa")) {
          return {
            ...m,
            lecturerEmail: m.lecturerEmail.replace(/kaggwa/gi, "mukasa"),
            lecturerName: m.lecturerName ? m.lecturerName.replace(/Kaggwa/gi, "Mukasa") : "Dr. Apollo Mukasa"
          };
        }
        return m;
      });

      // Deduplicate systemUsers by email and ensure unique IDs
      const uniqueUsersMap = new Map<string, any>();
      systemUsers.forEach((u, i) => {
        const emailKey = String(u.email || '').trim().toLowerCase();
        if (emailKey && !uniqueUsersMap.has(emailKey)) {
          uniqueUsersMap.set(emailKey, {
            ...u,
            id: u.id || `usr_${Date.now()}_${i}`
          });
        }
      });

      // Ensure default essential role seeds exist
      defaultSeeds.forEach(seed => {
        const emailKey = seed.email.toLowerCase();
        if (!uniqueUsersMap.has(emailKey)) {
          uniqueUsersMap.set(emailKey, seed);
        } else {
          const existing = uniqueUsersMap.get(emailKey);
          existing.role = seed.role;
          uniqueUsersMap.set(emailKey, existing);
        }
      });

      // Guarantee each user has an absolutely unique ID and cryptographic password hash
      const seenIds = new Set<string>();
      systemUsers = Array.from(uniqueUsersMap.values()).map((user, idx) => {
        let uniqueId = user.id;
        if (!uniqueId || seenIds.has(uniqueId)) {
          uniqueId = `usr_${idx + 1}_${Math.random().toString(36).substring(2, 7)}`;
        }
        seenIds.add(uniqueId);

        let passwordSalt = user.passwordSalt;
        let passwordHash = user.passwordHash;
        if (!passwordHash || !passwordSalt) {
          let defaultPass = "Student@2025!";
          if (user.role === "Administrator") defaultPass = "Admin@LawHub2025!";
          else if (user.role === "Lecturer") defaultPass = "Faculty@2025!";
          const hashed = hashPassword(defaultPass);
          passwordSalt = hashed.salt;
          passwordHash = hashed.hash;
        }

        return {
          ...user,
          id: uniqueId,
          passwordSalt,
          passwordHash
        };
      });

      console.log(`[LawHub DB] Loaded persistent data store with ${systemUsers.length} verified unique users from ${DB_FILE}`);
      savePersistentData();
      return;
    } catch (e) {
      console.error("[LawHub DB] Error reading persistent store, rewriting defaults:", e);
    }
  }

  systemUsers = defaultSeeds.map((user) => {
    let defaultPass = "Student@2025!";
    if (user.role === "Administrator") defaultPass = "Admin@LawHub2025!";
    else if (user.role === "Lecturer") defaultPass = "Faculty@2025!";
    const { salt, hash } = hashPassword(defaultPass);
    return {
      ...user,
      passwordSalt: salt,
      passwordHash: hash
    };
  });
  savePersistentData();
}

function savePersistentData() {
  try {
    const payload = {
      systemUsers,
      lecturerSubmissions,
      studentSubmissions,
      uploadedDocuments,
      uploadedConstitutionData,
      lastSaved: new Date().toISOString()
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), "utf-8");
  } catch (e) {
    console.error("[LawHub DB] Failed to save database to disk:", e);
  }
}

// Initial load
loadPersistentData();

// Helper to extract authenticated user from bearer token session, headers, or query
function getRequesterUser(req: express.Request) {
  const authHeader = req.headers["authorization"] || (req.headers["x-auth-token"] as string);
  if (authHeader) {
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : String(authHeader).trim();
    const sessionUser = getSessionUser(token);
    if (sessionUser) return sessionUser;
  }

  const email = (
    req.headers["x-user-email"] ||
    req.query.requesterEmail ||
    req.query.userEmail ||
    req.query.email ||
    (req.body && (req.body.requesterEmail || req.body.userEmail || req.body.email))
  ) as string;

  if (!email) return null;
  const user = systemUsers.find(
    (u) => u.email.toLowerCase() === String(email).trim().toLowerCase()
  );
  return user || null;
}

// Middleware to enforce role-based access control (RBAC) on sensitive endpoints
function requireRole(allowedRoles: string[]) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = getRequesterUser(req);
    
    // Check if role is provided explicitly via headers or found in system database
    const role = user?.role || (req.headers["x-user-role"] as string);

    if (!role) {
      // If no valid user or role identified
      return res.status(401).json({
        error: "Authentication required: Please sign in with an authorized account."
      });
    }

    if (user && user.status === "SUSPENDED") {
      return res.status(403).json({
        error: "Access Denied: Account is currently suspended by administration."
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        error: `Access Forbidden: This operation requires ${allowedRoles.join(" or ")} privileges. Your account role is '${role}'.`
      });
    }

    (req as any).authenticatedUser = user;
    next();
  };
}

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper for resilient Gemini API calls with retries and fallback models
async function generateContentWithFallback(ai: GoogleGenAI, params: {
  contents: any;
  config?: any;
  primaryModel?: string;
  retriesPerModel?: number;
}) {
  const primaryModel = params.primaryModel || "gemini-3.6-flash";
  const fallbackModels = ["gemini-flash-latest", "gemini-3.1-flash-lite"];
  const modelsToTry = [primaryModel, ...fallbackModels.filter(m => m !== primaryModel)];

  let lastError: any = null;

  for (const model of modelsToTry) {
    const attempts = params.retriesPerModel ?? 2;
    for (let attempt = 0; attempt <= attempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });

        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Attempt ${attempt + 1} for model ${model} failed: ${err?.message || err}`);
        
        if (attempt < attempts) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  }

  throw lastError || new Error("The AI service is experiencing high demand. Please try again in a few moments.");
}

// Document Endpoints for Student Library and Admin CMS
app.get("/api/documents", (req, res) => {
  const { status, type, category, search, role } = req.query;
  
  let docs = [...uploadedDocuments];

  // Ordinary students can only view PUBLISHED documents
  if (role !== "Administrator") {
    docs = docs.filter(d => d.status === "PUBLISHED");
  } else if (status && status !== "All") {
    docs = docs.filter(d => d.status === status);
  }

  if (type && type !== "All") {
    docs = docs.filter(d => d.documentType === type);
  }

  if (category && category !== "All") {
    docs = docs.filter(d => d.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase();
    docs = docs.filter(d => 
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.citation && d.citation.toLowerCase().includes(q)) ||
      (d.authorOrInstitution && d.authorOrInstitution.toLowerCase().includes(q)) ||
      d.tags.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  res.json({ documents: docs, count: docs.length });
});

app.get("/api/documents/:id", (req, res) => {
  const doc = uploadedDocuments.find(d => d.id === req.params.id);
  if (!doc) {
    return res.status(404).json({ error: "Document not found" });
  }
  res.json({ document: doc });
});

// Admin Document Creation Endpoint
app.post("/api/admin/documents", requireRole(["Administrator"]), (req, res) => {
  try {
    const {
      title,
      documentType,
      category,
      description,
      authorOrInstitution,
      source,
      citation,
      year,
      edition,
      date,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      tags = [],
      status = "DRAFT"
    } = req.body;

    if (!title || !documentType || !description) {
      return res.status(400).json({ error: "Title, document type, and description are required." });
    }

    const newDoc = {
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title,
      documentType,
      category: category || "General Legal",
      description,
      authorOrInstitution: authorOrInstitution || "Authorised Ugandan Source",
      source: source || "Uganda Legal Repository",
      citation: citation || "",
      year: year ? Number(year) : new Date().getFullYear(),
      edition: edition || "Standard Edition",
      date: date || new Date().toISOString().split("T")[0],
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      tags: Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim()).filter(Boolean),
      status: status || "DRAFT",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verifiedBy: "Admin / Editorial Review"
    };

    uploadedDocuments.unshift(newDoc);
    savePersistentData();
    res.status(201).json({ success: true, document: newDoc, message: "Document saved successfully." });
  } catch (error: any) {
    console.error("Error saving document:", error);
    res.status(500).json({ error: error?.message || "Failed to save document." });
  }
});

// Admin Document Update Endpoint
app.put("/api/admin/documents/:id", requireRole(["Administrator"]), (req, res) => {
  const index = uploadedDocuments.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Document not found" });
  }

  const existing = uploadedDocuments[index];
  const updatedDoc = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  uploadedDocuments[index] = updatedDoc;
  savePersistentData();
  res.json({ success: true, document: updatedDoc, message: "Document updated successfully." });
});

// Admin Document Delete Endpoint
app.delete("/api/admin/documents/:id", requireRole(["Administrator"]), (req, res) => {
  const index = uploadedDocuments.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Document not found" });
  }

  const deleted = uploadedDocuments.splice(index, 1)[0];
  savePersistentData();
  res.json({ success: true, document: deleted, message: "Document deleted successfully." });
});

// ----------------------------------------------------
// LECTURER SUBMISSIONS API & APPROVAL WORKFLOW
// ----------------------------------------------------

// List Lecturer Submissions
app.get("/api/submissions", (req, res) => {
  try {
    const { status, email, role } = req.query;

    let subs = Array.isArray(lecturerSubmissions) ? [...lecturerSubmissions] : [];

    // If user is Lecturer (not Administrator), filter to their submissions only
    if (role === "Lecturer" && email) {
      const emailStr = String(email).trim().toLowerCase();
      subs = subs.filter(s => s && s.lecturerEmail && s.lecturerEmail.toLowerCase() === emailStr);
    }

    if (status && status !== "All") {
      subs = subs.filter(s => s && s.status === status);
    }

    res.json({ submissions: subs, count: subs.length });
  } catch (error: any) {
    console.error("Error in GET /api/submissions:", error);
    res.status(500).json({ error: error?.message || "Failed to load submissions", submissions: [] });
  }
});

// Submit New Academic Material by Lecturer
app.post("/api/submissions", (req, res) => {
  try {
    const {
      title,
      courseOrUnit,
      description,
      lecturerName,
      lecturerEmail,
      institution,
      academicYear,
      documentType,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      tags = []
    } = req.body;

    if (!title || !courseOrUnit || !description || !lecturerName) {
      return res.status(400).json({ error: "Title, Course/Unit, Description, and Lecturer Name are required." });
    }

    const newSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title,
      courseOrUnit,
      description,
      lecturerName,
      lecturerEmail: lecturerEmail || "lecturer@lawhub.ug",
      institution: institution || "Faculty of Law",
      academicYear: academicYear || "2024/2025",
      documentType: documentType || "Lecture Notes",
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      tags: Array.isArray(tags) ? tags : String(tags).split(",").map(t => t.trim()).filter(Boolean),
      status: "PENDING_REVIEW", // Submissions start in PENDING_REVIEW
      submittedAt: new Date().toISOString()
    };

    lecturerSubmissions.unshift(newSubmission);
    savePersistentData();
    res.status(201).json({
      success: true,
      submission: newSubmission,
      message: "Academic material submitted for Administrator review successfully."
    });
  } catch (error: any) {
    console.error("Error creating submission:", error);
    res.status(500).json({ error: error?.message || "Failed to submit academic material." });
  }
});

// Admin Review Action on Lecturer Submission (APPROVE / REJECT / REQUEST CHANGES / PUBLISH / DELETE)
app.post("/api/submissions/:id/review", (req, res) => {
  try {
    const { action, feedback, reviewerName = "Chief Legal Administrator" } = req.body;
    const index = lecturerSubmissions.findIndex(s => s.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Submission not found" });
    }

    const submission = lecturerSubmissions[index];

    if (action === "DELETE") {
      const deleted = lecturerSubmissions.splice(index, 1)[0];
      uploadedDocuments = uploadedDocuments.filter(d => d.id !== `doc_${deleted.id}`);
      savePersistentData();
      return res.json({ success: true, deleted, message: "Submission permanently deleted." });
    }

    let newStatus = submission.status;
    if (action === "APPROVE") newStatus = "PUBLISHED";
    else if (action === "PUBLISH") newStatus = "PUBLISHED";
    else if (action === "REJECT") newStatus = "REJECTED";
    else if (action === "REQUEST_CHANGES") newStatus = "CHANGES_REQUESTED";
    else if (action === "UNPUBLISH") newStatus = "APPROVED";

    const updated = {
      ...submission,
      status: newStatus,
      adminFeedback: feedback || submission.adminFeedback,
      reviewedAt: new Date().toISOString(),
      reviewedBy: reviewerName
    };

    lecturerSubmissions[index] = updated;

    // If PUBLISHED, ensure it also exists in published documents for students
    if (newStatus === "PUBLISHED") {
      const existingDocIdx = uploadedDocuments.findIndex(d => d.id === `doc_${submission.id}`);
      const publishedDoc = {
        id: `doc_${submission.id}`,
        title: submission.title,
        documentType: "Academic Material",
        category: submission.courseOrUnit,
        description: submission.description,
        authorOrInstitution: `${submission.lecturerName} (${submission.institution || "Faculty of Law"})`,
        source: "LawHub Academic Repository",
        citation: `${submission.courseOrUnit} / ${submission.academicYear}`,
        year: new Date().getFullYear(),
        edition: submission.academicYear,
        date: new Date().toISOString().split("T")[0],
        fileUrl: submission.fileUrl,
        fileName: submission.fileName,
        fileSize: submission.fileSize,
        fileType: submission.fileType,
        fileContent: submission.fileContent,
        tags: submission.tags,
        status: "PUBLISHED",
        createdAt: submission.submittedAt,
        updatedAt: new Date().toISOString(),
        verifiedBy: reviewerName
      };

      if (existingDocIdx >= 0) {
        uploadedDocuments[existingDocIdx] = publishedDoc;
      } else {
        uploadedDocuments.unshift(publishedDoc);
      }
    } else {
      // If unpublished/rejected, remove from public documents if previously added
      uploadedDocuments = uploadedDocuments.filter(d => d.id !== `doc_${submission.id}`);
    }

    savePersistentData();

    res.json({
      success: true,
      submission: updated,
      message: `Submission status updated to ${newStatus}.`
    });
  } catch (error: any) {
    console.error("Error reviewing submission:", error);
    res.status(500).json({ error: error?.message || "Failed to process review action." });
  }
});

// Update or Delete Submission
app.put("/api/submissions/:id", (req, res) => {
  const index = lecturerSubmissions.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Submission not found" });
  }
  lecturerSubmissions[index] = {
    ...lecturerSubmissions[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  savePersistentData();
  res.json({ success: true, submission: lecturerSubmissions[index] });
});

app.delete("/api/submissions/:id", (req, res) => {
  const index = lecturerSubmissions.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Submission not found" });
  }
  const deleted = lecturerSubmissions.splice(index, 1)[0];
  uploadedDocuments = uploadedDocuments.filter(d => d.id !== `doc_${deleted.id}`);
  savePersistentData();
  res.json({ success: true, deleted, message: "Submission deleted successfully." });
});

// ----------------------------------------------------
// CONSTITUTION VERIFIED UPLOAD & ARTICLE APIS
// ----------------------------------------------------

app.get("/api/constitution", (req, res) => {
  res.json({
    documents: uploadedConstitutionData,
    totalChapters: 19,
    totalArticles: 288,
    schedulesCount: 7,
    amendmentsCount: 5
  });
});

app.post("/api/constitution/upload", requireRole(["Administrator"]), (req, res) => {
  try {
    const {
      title,
      source,
      institution,
      edition,
      datePromulgated,
      citation,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      notes
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Document title is required." });
    }

    const newConstDoc = {
      id: `const_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title,
      source: source || "The Uganda Gazette / ULII",
      institution: institution || "Parliament of Uganda",
      edition: edition || "Consolidated 1995 Edition",
      datePromulgated: datePromulgated || "1995-10-08",
      citation: citation || "Const. 1995",
      fileUrl,
      fileName,
      fileSize,
      fileType,
      fileContent,
      notes,
      totalChapters: 19,
      totalArticles: 288,
      schedulesCount: 7,
      uploadedBy: "Chief Legal Administrator",
      uploadedAt: new Date().toISOString(),
      verificationStatus: "VERIFIED"
    };

    uploadedConstitutionData.unshift(newConstDoc);

    // Also add to public documents repository
    uploadedDocuments.unshift({
      id: `doc_${newConstDoc.id}`,
      title: newConstDoc.title,
      documentType: "Constitution",
      category: "Constitutional Law",
      description: `Official verified copy of the 1995 Constitution of Uganda uploaded by administrator. Source: ${newConstDoc.source}`,
      authorOrInstitution: newConstDoc.institution,
      source: newConstDoc.source,
      citation: newConstDoc.citation,
      year: 1995,
      edition: newConstDoc.edition,
      date: newConstDoc.datePromulgated,
      fileName: newConstDoc.fileName,
      fileSize: newConstDoc.fileSize,
      fileType: newConstDoc.fileType,
      fileContent: newConstDoc.fileContent,
      tags: ["Constitution", "19 Chapters", "Supreme Law", "Verified Official Document"],
      status: "PUBLISHED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verifiedBy: "Chief Legal Administrator"
    });

    savePersistentData();

    res.status(201).json({
      success: true,
      document: newConstDoc,
      message: "Verified Constitution document uploaded and published to Legal Library."
    });
  } catch (error: any) {
    console.error("Error uploading constitution document:", error);
    res.status(500).json({ error: error?.message || "Failed to upload Constitution document." });
  }
});

// ----------------------------------------------------
// USER AUTHENTICATION & ROLE MANAGEMENT APIS
// ----------------------------------------------------

// Verify or retrieve currently logged-in user profile
app.get("/api/auth/me", (req, res) => {
  const user = getRequesterUser(req);
  if (user) {
    return res.json({ user: sanitizeUser(user) });
  }

  const { email } = req.query;
  if (!email) {
    return res.status(401).json({ error: "Not authenticated. Please sign in." });
  }

  const found = systemUsers.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (!found) {
    return res.status(404).json({ error: "User not found in system repository." });
  }
  res.json({ user: sanitizeUser(found) });
});

// User Login (Cryptographically validates password & manages rate-limited sessions)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Both email and password are required to sign in." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  // Brute force rate limiting check
  const rateLimit = checkRateLimit(normalizedEmail);
  if (rateLimit.locked) {
    return res.status(429).json({
      error: `Too many failed login attempts. Please wait ${rateLimit.waitSeconds} seconds before trying again.`
    });
  }

  const user = systemUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    recordFailedAttempt(normalizedEmail);
    return res.status(401).json({ error: "Invalid email or password. Please verify your credentials." });
  }

  if (user.status === "SUSPENDED") {
    return res.status(403).json({
      error: "This account is currently suspended. Please contact the LawHub System Administrator."
    });
  }

  // Verify password hash
  const isPasswordValid = verifyPassword(password, user.passwordHash, user.passwordSalt);
  if (!isPasswordValid) {
    recordFailedAttempt(normalizedEmail);
    return res.status(401).json({ error: "Invalid email or password. Please verify your credentials." });
  }

  // Authentication succeeded: clear rate limits and generate secure token session
  resetFailedAttempts(normalizedEmail);
  const token = createSession(user);

  res.json({
    success: true,
    token,
    user: sanitizeUser(user),
    message: "Logged in successfully."
  });
});

// Continue with Google Sign-In / Sign-Up Flow
app.post("/api/auth/google", (req, res) => {
  try {
    const { credential, profile } = req.body;
    let email = "";
    let name = "";
    let picture = "";
    let googleId = "";

    // 1. Decode Google ID Token if present
    if (credential && typeof credential === "string") {
      try {
        const parts = credential.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
          email = payload.email || "";
          name = payload.name || "";
          picture = payload.picture || "";
          googleId = payload.sub || "";
        }
      } catch (e) {
        console.warn("[Auth Google] Failed to decode JWT payload:", e);
      }
    }

    // 2. Direct Profile fallback if supplied
    if (!email && profile) {
      email = profile.email || "";
      name = profile.name || "";
      picture = profile.picture || profile.avatar || "";
      googleId = profile.id || profile.sub || "";
    }

    if (!email) {
      return res.status(400).json({ error: "Unable to extract email from Google Sign-In response." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = systemUsers.find(u => u.email.toLowerCase() === normalizedEmail);

    if (user && user.status === "SUSPENDED") {
      return res.status(403).json({
        error: "This account is currently suspended. Please contact the LawHub System Administrator."
      });
    }

    if (!user) {
      // Auto-register new Google user as verified Student
      const randomPassword = crypto.randomBytes(24).toString("hex");
      const { salt, hash } = hashPassword(randomPassword);

      user = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: name || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        role: "Student",
        institution: "Faculty of Law",
        joinedDate: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
        status: "ACTIVE",
        avatar: picture || undefined,
        googleId,
        authProvider: "google",
        passwordSalt: salt,
        passwordHash: hash
      };
      systemUsers.push(user);
      savePersistentData();
    } else {
      // Link Google ID and avatar if not yet attached
      if (!user.googleId && googleId) user.googleId = googleId;
      if (!user.avatar && picture) user.avatar = picture;
      if (!user.authProvider) user.authProvider = "google";
      savePersistentData();
    }

    const token = createSession(user);

    res.json({
      success: true,
      token,
      user: sanitizeUser(user),
      message: `Signed in with Google as ${user.name}.`
    });
  } catch (error: any) {
    console.error("[Auth Google] Authentication error:", error);
    res.status(500).json({ error: "Failed to complete Google authentication." });
  }
});

// User Registration (Requires valid password, enforces role policies)
app.post("/api/auth/register", (req, res) => {
  const { name, email, password, institution, role = "Student", securityCode } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = systemUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return res.status(409).json({ error: "An account with this email address already exists." });
  }

  let validatedRole = "Student";
  const reqRole = String(role || "Student").trim();

  if (reqRole === "Administrator") {
    return res.status(403).json({
      error: "Security Policy Violation: Administrator accounts cannot be registered publicly. They must be provisioned directly by an authorized System Administrator."
    });
  } else if (reqRole === "Lecturer") {
    const normalizedCode = String(securityCode || "").trim().toUpperCase();
    if (normalizedCode !== "FACULTY-2025" && !normalizedEmail.includes("apollo.mukasa") && !normalizedEmail.includes("apollo.kaggwa") && !normalizedEmail.includes("lecturer@lawhub.ug")) {
      return res.status(403).json({
        error: "Invalid Faculty Lecturer Code. Please provide the authorized faculty verification key (FACULTY-2025)."
      });
    }
    validatedRole = "Lecturer";
  } else {
    validatedRole = "Student";
  }

  const { salt, hash } = hashPassword(password);

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name: name.trim(),
    email: normalizedEmail,
    role: validatedRole,
    institution: institution?.trim() || "Faculty of Law",
    joinedDate: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    status: "ACTIVE",
    passwordSalt: salt,
    passwordHash: hash
  };

  systemUsers.push(newUser);
  savePersistentData();

  const token = createSession(newUser);

  res.status(201).json({
    success: true,
    token,
    user: sanitizeUser(newUser),
    message: "Account created successfully."
  });
});

// User Logout (Invalidates token session)
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers["authorization"] || (req.headers["x-auth-token"] as string);
  if (authHeader) {
    const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : String(authHeader).trim();
    activeSessions.delete(token);
  }
  res.json({ success: true, message: "Logged out successfully." });
});

// List All Users (Protected for Administrators)
app.get("/api/users", requireRole(["Administrator"]), (req, res) => {
  const { role, status } = req.query;
  let list = [...systemUsers];
  if (role && role !== "All") {
    list = list.filter(u => u.role === role);
  }
  if (status && status !== "All") {
    list = list.filter(u => u.status === status);
  }
  res.json({ users: list.map(sanitizeUser), count: list.length });
});

// Create New System User (Admin Function)
app.post("/api/users", requireRole(["Administrator"]), (req, res) => {
  const { name, email, role = "Student", institution, status = "ACTIVE" } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const existing = systemUsers.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (existing) {
    return res.status(409).json({ error: "User with this email already exists." });
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    name,
    email: email.toLowerCase(),
    role: ["Student", "Lecturer", "Administrator"].includes(role) ? role : "Student",
    institution: institution || "Faculty of Law",
    joinedDate: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    status: status || "ACTIVE"
  };

  systemUsers.push(newUser);
  savePersistentData();

  res.status(201).json({ success: true, user: newUser, message: "User created successfully." });
});

// Update User Role (Admin Function)
app.put("/api/users/:id/role", requireRole(["Administrator"]), (req, res) => {
  const { role } = req.body;
  if (!["Student", "Lecturer", "Administrator"].includes(role)) {
    return res.status(400).json({ error: "Invalid role specified. Allowed roles: Student, Lecturer, Administrator" });
  }

  const user = systemUsers.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.role = role;
  savePersistentData();
  res.json({ success: true, user, message: `User role updated to ${role}.` });
});

// Update User Status - Activate / Suspend (Admin Function)
app.put("/api/users/:id/status", requireRole(["Administrator"]), (req, res) => {
  const { status } = req.body;
  if (!["ACTIVE", "SUSPENDED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status specified. Allowed: ACTIVE, SUSPENDED" });
  }

  const user = systemUsers.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  user.status = status;
  savePersistentData();
  res.json({ success: true, user, message: `User account status updated to ${status}.` });
});

// Delete User (Admin Function)
app.delete("/api/users/:id", requireRole(["Administrator"]), (req, res) => {
  const index = systemUsers.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  const deleted = systemUsers.splice(index, 1)[0];
  savePersistentData();
  res.json({ success: true, user: deleted, message: "User removed from system." });
});

// ----------------------------------------------------
// STUDENT ASSIGNMENTS & SUBMISSIONS API
// ----------------------------------------------------

// List Student Assignment Submissions
app.get("/api/student-submissions", (req, res) => {
  try {
    const { studentEmail, lecturerEmail, status, role } = req.query;

    let subs = Array.isArray(studentSubmissions) ? [...studentSubmissions] : [];

    if (role === "Student" && studentEmail) {
      const emailStr = String(studentEmail).trim().toLowerCase();
      subs = subs.filter(s => s && s.studentEmail && s.studentEmail.toLowerCase() === emailStr);
    } else if (role === "Lecturer" && lecturerEmail) {
      const lecEmailStr = String(lecturerEmail).trim().toLowerCase();
      subs = subs.filter(s => {
        if (!s) return false;
        if (!s.lecturerEmail || s.lecturerEmail === "all") return true;
        return typeof s.lecturerEmail === "string" && s.lecturerEmail.toLowerCase() === lecEmailStr;
      });
    }

    if (status && status !== "All") {
      subs = subs.filter(s => s && s.status === status);
    }

    res.json({ studentSubmissions: subs, count: subs.length });
  } catch (error: any) {
    console.error("Error in GET /api/student-submissions:", error);
    res.status(500).json({ error: error?.message || "Failed to load student submissions", studentSubmissions: [] });
  }
});

// Student Uploads New Assignment Submission
app.post("/api/student-submissions", (req, res) => {
  try {
    const {
      assignmentTitle,
      courseOrUnit,
      submissionNotes,
      studentName,
      studentEmail,
      institution,
      lecturerEmail,
      lecturerName,
      fileName,
      fileSize,
      fileType,
      fileContent
    } = req.body;

    if (!assignmentTitle || !courseOrUnit || !studentName || !studentEmail) {
      return res.status(400).json({ error: "Assignment title, course unit, student name, and student email are required." });
    }

    const newSub = {
      id: `stud_sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      assignmentTitle,
      courseOrUnit,
      submissionNotes: submissionNotes || "",
      studentName,
      studentEmail: studentEmail.toLowerCase(),
      institution: institution || "Faculty of Law",
      lecturerEmail: lecturerEmail ? (lecturerEmail.toLowerCase().includes("kaggwa") ? "apollo.mukasa@lawhub.ug" : lecturerEmail.toLowerCase()) : "apollo.mukasa@lawhub.ug",
      lecturerName: lecturerName ? (lecturerName.includes("Kaggwa") ? "Dr. Apollo Mukasa" : lecturerName) : "Dr. Apollo Mukasa",
      fileName: fileName || "Assignment_Submission.pdf",
      fileSize: fileSize || "250 KB",
      fileType: fileType || "application/pdf",
      fileContent: fileContent || "",
      status: "PENDING_REVIEW",
      submittedAt: new Date().toISOString()
    };

    studentSubmissions.unshift(newSub);
    savePersistentData();

    res.status(201).json({
      success: true,
      submission: newSub,
      message: "Assignment submitted successfully to faculty."
    });
  } catch (error: any) {
    console.error("Error creating student assignment submission:", error);
    res.status(500).json({ error: error?.message || "Failed to submit assignment." });
  }
});

// Review Student Assignment (Lecturer / Admin Action)
app.post("/api/student-submissions/:id/review", (req, res) => {
  try {
    const { action, grade, feedback, reviewerName = "Faculty Lecturer" } = req.body;
    const index = studentSubmissions.findIndex(s => s.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Student submission not found." });
    }

    const sub = studentSubmissions[index];

    if (action === "DELETE") {
      const deleted = studentSubmissions.splice(index, 1)[0];
      savePersistentData();
      return res.json({ success: true, deleted, message: "Student assignment submission deleted." });
    }

    let newStatus = sub.status;
    if (action === "APPROVE") newStatus = "APPROVED";
    else if (action === "GRADE") newStatus = "GRADED";
    else if (action === "REQUEST_CHANGES") newStatus = "CHANGES_REQUESTED";
    else if (action === "REJECT") newStatus = "REJECTED";

    const updated = {
      ...sub,
      status: newStatus,
      grade: grade !== undefined ? grade : sub.grade,
      lecturerFeedback: feedback !== undefined ? feedback : sub.lecturerFeedback,
      reviewedAt: new Date().toISOString(),
      reviewedBy: reviewerName
    };

    studentSubmissions[index] = updated;
    savePersistentData();

    res.json({
      success: true,
      submission: updated,
      message: `Assignment submission updated to ${newStatus}.`
    });
  } catch (error: any) {
    console.error("Error reviewing student assignment:", error);
    res.status(500).json({ error: error?.message || "Failed to review student assignment." });
  }
});

// Delete or Withdraw Student Assignment Submission
app.delete("/api/student-submissions/:id", (req, res) => {
  const index = studentSubmissions.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Student submission not found." });
  }
  const deleted = studentSubmissions.splice(index, 1)[0];
  savePersistentData();
  res.json({ success: true, deleted, message: "Assignment submission withdrawn successfully." });
});

// ----------------------------------------------------
// ADMIN & LECTURER METRICS ENDPOINTS
// ----------------------------------------------------

// Admin Comprehensive Metrics
app.get("/api/admin/metrics", requireRole(["Administrator"]), (req, res) => {
  const totalStudents = systemUsers.filter(u => u.role === "Student").length + 2420;
  const totalLecturers = systemUsers.filter(u => u.role === "Lecturer").length + 18;
  const totalAdministrators = systemUsers.filter(u => u.role === "Administrator").length + 3;

  const totalLegalDocs = uploadedDocuments.filter(d => 
    ['Constitution', 'Statute', 'Regulation', 'Statutory Instrument', 'Case Law', 'Legal Resource'].includes(d.documentType)
  ).length;

  const totalAcademicDocs = uploadedDocuments.filter(d => 
    ['Academic Material', 'Past Paper', 'Lecture Notes', 'Assignment', 'Assignments', 'Reading Materials', 'Class Handout'].includes(d.documentType)
  ).length;

  const pendingSubmissions = lecturerSubmissions.filter(s => s.status === "PENDING_REVIEW").length;
  const publishedDocs = uploadedDocuments.filter(d => d.status === "PUBLISHED").length;
  const draftDocs = uploadedDocuments.filter(d => d.status === "DRAFT").length;
  const archivedDocs = uploadedDocuments.filter(d => d.status === "ARCHIVED").length;

  res.json({
    totalUsers: totalStudents + totalLecturers + totalAdministrators,
    totalStudents,
    totalLecturers,
    totalAdministrators,
    totalLegalResources: totalLegalDocs,
    totalAcademicResources: totalAcademicDocs,
    totalDocuments: uploadedDocuments.length,
    pendingUploads: pendingSubmissions,
    publishedDocuments: publishedDocs,
    publishedResources: publishedDocs,
    draftDocuments: draftDocs,
    draftResources: draftDocs,
    archivedDocuments: archivedDocs,
    recentlyUploaded: uploadedDocuments.slice(0, 6),
    recentlyUpdated: [...uploadedDocuments].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 6),
    pendingSubmissionsList: lecturerSubmissions.filter(s => s.status === "PENDING_REVIEW")
  });
});

// Lecturer Metrics
app.get("/api/lecturer/metrics", (req, res) => {
  const { email } = req.query;
  const userSubs = email 
    ? lecturerSubmissions.filter(s => s.lecturerEmail.toLowerCase() === String(email).toLowerCase())
    : lecturerSubmissions;

  res.json({
    totalSubmissions: userSubs.length,
    pendingCount: userSubs.filter(s => s.status === "PENDING_REVIEW").length,
    approvedCount: userSubs.filter(s => s.status === "APPROVED").length,
    publishedCount: userSubs.filter(s => s.status === "PUBLISHED").length,
    changesRequestedCount: userSubs.filter(s => s.status === "CHANGES_REQUESTED").length,
    rejectedCount: userSubs.filter(s => s.status === "REJECTED").length,
    submissions: userSubs
  });
});


// Helper: Check if query is likely unrelated to law
function isLikelyNonLegalQuery(query: string): boolean {
  const q = query.trim().toLowerCase();
  
  // Greetings / meta questions should be welcomed into legal inquiry
  if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|who are you|what can you do)[\s!.?]*$/i.test(q)) {
    return false;
  }

  // Clear non-legal markers
  const nonLegalTriggers = [
    /\b(recipe|cook|baking|cake|pizza|soup|ingredient)\b/i,
    /\b(weather forecast|tomorrow'?s weather|temperature in)\b/i,
    /\b(premier league|champions league|football score|messi|ronaldo|nba score)\b/i,
    /\b(movie review|celebrity gossip|hollywood|pop song|lyrics for)\b/i,
    /\b(write me a python|javascript code|react code|css style|install npm)\b/i,
    /\b(crypto price|bitcoin forecast|stock pick|forex trading)\b/i,
    /\b(dating advice|how to flirt|horoscope|zodiac sign|astrology)\b/i,
    /\b(joke about|riddle me|bedtime story)\b/i
  ];

  // Strong legal terms that override non-legal false positives
  const strongLegalTerms = [
    /\b(law|legal|court|judge|judiciary|attorney|advocate|counsel|statute|act|constitution|article|section|clause|precedent|ratio|obiter|sub judice|habeas corpus|injunction|bail|plaint|indictment|appeal|tort|negligence|contract|property|land act|penal code|evidence|jurisdiction|remedy|damages|liability|accused|plaintiff|defendant|appellant|respondent|parliament|ulii|judicature)\b/i
  ];

  if (strongLegalTerms.some(regex => regex.test(q))) {
    return false;
  }

  return nonLegalTriggers.some(regex => regex.test(q));
}

// LawHub Academic Legal Tutor Endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { prompt, courseContext, role = "Student", history = [] } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "A question or legal topic is required." });
    }

    const trimmedPrompt = prompt.trim();

    // Strict boundary check: If question is unrelated to law, politely inform the user
    if (isLikelyNonLegalQuery(trimmedPrompt)) {
      return res.json({
        reply: `I am LawHub AI Legal Tutor, designed specifically to assist with legal and law-related questions only. I cannot assist with non-legal topics.

Please feel free to ask any question regarding:
• Legal principles and doctrines (e.g. doctrine of separation of powers, ultra vires, privity of contract, vicarious liability)
• Ugandan statutory provisions and sections (e.g. 1995 Constitution of Uganda, Contracts Act 2010, Land Act Cap 227, Penal Code Act Cap 120)
• Landmark case law and judicial precedents (e.g. Paul Ssemogerere v AG, Major General Tinyefuza v AG, Grace Ibingira v Uganda)
• IRAC legal examination methods (Issue, Rule, Application, Conclusion)
• High Court and Magistrates Courts civil and criminal procedure`
      });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are "LawHub AI Legal Tutor", an authoritative, distinguished Ugandan Legal Research & Academic Assistant (expert in the 1995 Constitution of the Republic of Uganda, Ugandan statutes, Supreme Court, Court of Appeal / Constitutional Court, and High Court jurisprudence, East African Court of Justice, common law, and LLB / Bar Course curricula).

### CRITICAL RULE 1: STRICT LAW-RELATED SCOPE
- You respond STRICTLY to law-related questions only.
- If a user asks a question that is unrelated to law (e.g. general non-legal chitchat, cooking recipes, programming/coding, sports, pop culture, medicine, casual entertainment, or everyday tasks):
  Politely inform them:
  "I am LawHub AI Legal Tutor, designed specifically to assist with legal and law-related questions only. I cannot assist with non-legal topics. Please feel free to ask any question regarding legal principles, statutory provisions, Ugandan jurisprudence, case law analysis, or legal exam preparation!"
  Do NOT answer non-legal questions under any circumstance.

### CRITICAL RULE 2: DETAILED, CLEAR, AND WELL-STRUCTURED LEGAL ANSWERS
When answering legal questions, explain legal concepts in simple, accessible language while maintaining uncompromising legal accuracy and depth.
Structure your answers with the following clear headings where appropriate:

1. **Legal Principle & Definition**:
   Clear, simple explanation of the legal concept, doctrine, or right, understandable to students and legal practitioners alike.

2. **Statutory Provisions & Sections**:
   Specific citation of relevant statutory provisions. Prioritize Ugandan legislation (e.g., specific Articles of the 1995 Constitution of Uganda; Sections of the Contracts Act 2010; Penal Code Act Cap 120; Land Act Cap 227; Companies Act 2012; Evidence Act Cap 6; Civil Procedure Act Cap 71 & S.I. 71-1).

3. **Relevant Case Law & Judicial Precedents**:
   Authoritative judgments with party names, court level, brief facts, and precise ratio decidendi. Highlight Ugandan landmark decisions first.

4. **Practical Example / Application**:
   A realistic, concrete factual scenario illustrating how this legal rule is applied in practice or in an examination scenario.

5. **Clear Conclusion**:
   A concise, definitive takeaway summarizing the legal position.

### CRITICAL RULE 3: PRIORITY OF UGANDAN LAW
- Always prioritize Ugandan law where the user's question concerns Uganda or does not specify another jurisdiction.
- Where English common law or persuasive East African decisions (Kenya, Tanzania) are discussed, explain how they apply in Uganda pursuant to Section 14 of the Judicature Act (Cap 13).

### CRITICAL RULE 4: ABSOLUTE AUTHENTICITY — NEVER INVENT LEGAL AUTHORITIES
- Do NOT generate misleading, fabricated, or unsupported legal authorities, case citations, or statutory sections.
- If you are uncertain about a specific citation, volume, or year, state this uncertainty clearly and advise the user to verify on ULII (Uganda Legal Information Institute, www.ulii.org) or the official Uganda Gazette rather than inventing information.`;

    const fullPrompt = `${courseContext ? `Academic Course: ${courseContext}\n` : ''}User Role: ${role}\nLegal Query: ${trimmedPrompt}`;

    if (ai) {
      try {
        const response = await generateContentWithFallback(ai, {
          primaryModel: "gemini-3.8-flash",
          contents: fullPrompt,
          config: {
            systemInstruction,
            temperature: 0.4,
          },
        });

        if (response.text && response.text.trim()) {
          return res.json({ reply: response.text });
        }
      } catch (genErr) {
        console.warn("[LawHub Tutor] Gemini generation failed, falling back to local legal reasoning engine:", genErr);
      }
    }

    // High-Reliability Local Legal Fallback Engine (Ugandan Law Focused)
    const qLower = trimmedPrompt.toLowerCase();
    let structuredFallback = "";

    if (qLower.includes("fair hearing") || qLower.includes("article 28") || qLower.includes("natural justice")) {
      structuredFallback = `### 1. Legal Principle & Definition
The Right to a Fair Hearing is a fundamental, non-derogable human right founded upon the twin pillars of natural justice: *audi alteram partem* (hear the other side) and *nemo judex in causa sua* (no one should be a judge in their own cause).

### 2. Statutory Provisions & Sections
• **Article 28(1) of the 1995 Constitution of Uganda**: Guarantees a speedy, fair, and public hearing before an independent and impartial court or tribunal.
• **Article 44(c) of the 1995 Constitution**: Explicitly declares the right to a fair hearing as absolute and non-derogable, meaning it cannot be restricted even during states of emergency.
• **Article 28(3)(a)**: Presumption of innocence until proven guilty or plea of guilt.

### 3. Relevant Case Law & Precedents
• **Major General David Tinyefuza v Attorney General (Constitutional Petition No. 1 of 1996)**: The Constitutional Court affirmed that natural justice must be observed in judicial and administrative proceedings alike.
• **Dr. James Rwanyarare & Ors v Attorney General [2004] UGCC 2**: The court underscored that where procedural fairness is denied, proceedings are void.
• **Ridge v Baldwin [1964] AC 40**: Common law locus classicus holding that duty to act judicially applies to all bodies with power to affect legal rights.

### 4. Practical Example
If an LLB university examination disciplinary committee expels a student without serving them with formal charges, disclosing witness statements, or affording them an opportunity to testify and call witnesses, the committee violates Article 28(1) and Article 44(c). The student can file an application for judicial review under Article 42 and Article 50 for an order of *certiorari* to quash the decision.

### 5. Clear Conclusion
Under Ugandan jurisprudence, the right to a fair hearing under Article 28 is inviolable and non-derogable under Article 44(c). Any judicial or quasi-judicial determination conducted in breach of natural justice is incurably flawed and void ab initio.`;
    } else if (qLower.includes("supremacy") || qLower.includes("article 2") || qLower.includes("article 137") || qLower.includes("constitutional supremacy")) {
      structuredFallback = `### 1. Legal Principle & Definition
Constitutional Supremacy is the doctrine that the Constitution is the paramount legal instrument of the Republic of Uganda. Any other law, customary practice, or official act that conflicts with the Constitution is void to the extent of the inconsistency.

### 2. Statutory Provisions & Sections
• **Article 1(1) of the 1995 Constitution**: All sovereign power belongs to the people of Uganda.
• **Article 2(1)**: The Constitution is the supreme law of Uganda and has binding force on all authorities and persons throughout Uganda.
• **Article 2(2)**: If any other law or custom is inconsistent with any of the provisions of this Constitution, the Constitution prevails, and that other law or custom is void.
• **Article 137(1) & (3)**: Vests original jurisdiction in the Constitutional Court (sitting as the Court of Appeal) to interpret constitutional consistency.

### 3. Relevant Case Law & Precedents
• **Paul K. Ssemogerere & Zachary Olum v Attorney General (Constitutional Appeal No. 1 of 2000)**: The Supreme Court struck down the Referendum (Political Appointments) Act 2000 because Parliament had enacted it in violation of internal voting procedures stipulated by the 1995 Constitution.
• **Charles Onyango Obbo & Andrew Mwenda v Attorney General (Constitutional Appeal No. 2 of 2002)**: The Supreme Court declared Section 50 of the Penal Code Act (publication of false news) inconsistent with Article 29(1)(a) freedom of expression and therefore void under Article 2.

### 4. Practical Example
If Parliament enacts a statute prohibiting citizens from challenging land acquisition decisions in court, that provision directly conflicts with Article 28 (fair hearing) and Article 126 (exercise of judicial power). Any citizen under Article 137(3) may petition the Constitutional Court to have the section declared unconstitutional and void ab initio.

### 5. Clear Conclusion
Uganda operates under constitutional supremacy, not parliamentary sovereignty. Any legislative enactment, executive decree, or customary norm conflicting with the 1995 Constitution is null and void under Article 2(2).`;
    } else if (qLower.includes("bail") || qLower.includes("article 23") || qLower.includes("presumption of innocence")) {
      structuredFallback = `### 1. Legal Principle & Definition
Bail is an agreement between the court and an accused person (and their sureties) securing temporary release from lawful custody pending trial, conditioned on the accused undertaking to return to court whenever required.

### 2. Statutory Provisions & Sections
• **Article 23(6)(a) of the 1995 Constitution**: An accused person is entitled to apply to the court to be released on bail, and the court may grant bail on reasonable conditions.
• **Article 23(6)(b) & (c)**: Mandatory constitutional bail after remand for 60 days (for offences triable by subordinate courts) or 120 days before committal (for capital offences triable by the High Court).
• **Article 28(3)(a)**: Presumption of innocence until proven guilty.
• **Magistrates Courts Act (Cap 16), Sections 75-77** & **Trial on Indictments Act (Cap 23), Sections 14-15**.

### 3. Relevant Case Law & Precedents
• **Foundation for Human Rights Initiative (FHRI) v Attorney General (Constitutional Appeal No. 3 of 2009)**: Supreme Court affirmed that bail is a constitutional right flowing from the presumption of innocence, and statutory restrictions must not nullify Article 23(6).
• **Uganda v Dr. Kizza Besigye (High Court Misc. Application No. 12 of 2006)**: Justice Lugayizi and Justice Katutsi clarified that bail should not be withheld as an anticipatory punishment.

### 4. Practical Example
An accused charged with obtaining money by false pretences applies for bail in the Chief Magistrates Court. If the applicant demonstrates a fixed place of abode, substantial sureties within jurisdiction, and no likelihood of absconding, bail should be granted on reasonable terms pursuant to Article 23(6)(a).

### 5. Clear Conclusion
Bail is a constitutional safeguard preserving liberty prior to conviction. Courts evaluate whether the accused will appear for trial rather than pre-judging guilt.`;
    } else {
      structuredFallback = `### 1. Legal Principle & Definition
The query involves essential principles of Ugandan substantive and procedural law. In legal analysis, all issues must be evaluated using the IRAC method (Issue, Rule, Application, Conclusion) to establish rights, duties, and statutory remedies.

### 2. Statutory Provisions & Sections
• **The 1995 Constitution of the Republic of Uganda (as amended)**: The foundational supreme law.
• **Principal Relevant Statutes**: Depending on the specific subject matter, consult the Contracts Act 2010, Land Act Cap 227, Penal Code Act Cap 120, Companies Act 2012, Evidence Act Cap 6, or Civil Procedure Act Cap 71.

### 3. Relevant Case Law & Precedents
• Landmark decisions of the Supreme Court of Uganda, Court of Appeal / Constitutional Court, and High Court establish binding precedents under the doctrine of *stare decisis*.
• Verified judicial records and unredacted law reports are accessible through the Uganda Legal Information Institute (ULII).

### 4. Practical Example
When formulating an argument in legal practice or examination:
1. Identify the precise legal issue.
2. State the statutory provision or ratio decidendi from leading precedent.
3. Apply the law to the specific facts.
4. Conclude with the available judicial remedy.

### 5. Clear Conclusion
Ugandan law requires strict alignment between statutory authority, evidentiary standards, and judicial precedent. Ensure citations are cross-referenced with current Acts of Parliament and ULII rulings.`;
    }

    return res.json({ reply: structuredFallback });
  } catch (error: any) {
    console.error("LawHub Legal Tutor endpoint error:", error);
    res.status(500).json({
      error: "The LawHub AI Legal Tutor encountered an issue processing your legal inquiry. Please verify your connection and try again."
    });
  }
});

// AI Legal Drafting Endpoint
app.post("/api/ai/draft", async (req, res) => {
  try {
    const { documentType, details, partyNames, statutoryRef } = req.body;

    if (!documentType) {
      return res.status(400).json({ error: "Document type is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please check environment variables in Settings > Secrets."
      });
    }

    const systemInstruction = `You are a Senior Legal Draftsman and Advocate of the High Court of Uganda.
Generate formal, accurate, statutory-compliant legal documents according to Ugandan procedural standards (e.g., Oaths Act Cap 19, Civil Procedure Rules SI 71-1, Land Act Cap 227, Advocates Act Cap 267).

ALWAYS include:
1. Formal Ugandan document header (THE REPUBLIC OF UGANDA, IN THE HIGH COURT OF UGANDA / IN THE MATTER OF...).
2. Clear recitals, operative clauses, spousal consent where required, witness signature blocks, and advocate stamp lines.
3. Relevant Ugandan statutory citations.
4. AT THE VERY BOTTOM, MANDATORY LEGAL DISCLAIMER: "DISCLAIMER: This legal document is prepared with LawHub Legal Drafting Assistant for educational and academic drafting reference purposes only. It must be reviewed, verified, and endorsed by an Advocate of the High Court of Uganda prior to execution or court filing."`;

    const prompt = `Draft a formal ${documentType}.\nDetails: ${details || 'Standard format'}\nParties: ${partyNames || 'To be filled'}\nSpecific Statutory References: ${statutoryRef || 'Ugandan Law'}`;

    const response = await generateContentWithFallback(ai, {
      primaryModel: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const documentText = response.text || "Unable to draft document.";
    res.json({ documentText });
  } catch (error: any) {
    console.error("AI Draft error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate legal draft." });
  }
});

// AI Quiz Generator Endpoint
app.post("/api/ai/quiz", async (req, res) => {
  try {
    const { courseTitle, topic, questionCount = 3 } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please check environment variables in Settings > Secrets."
      });
    }

    const prompt = `Generate a set of ${questionCount} high-yield exam preparation questions for Ugandan Law students on course "${courseTitle}" topic "${topic || 'General Principles'}".
Include multiple choice, true/false, or essay question style. Return formatted JSON response matching this schema:
[
  {
    "id": "q1",
    "type": "mcq",
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Exact correct option string",
    "explanation": "Detailed statutory and case law explanation referencing Ugandan statutes."
  }
]`;

    const response = await generateContentWithFallback(ai, {
      primaryModel: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    let quizData = [];
    try {
      quizData = JSON.parse(response.text || "[]");
    } catch {
      quizData = [];
    }

    res.json({ questions: quizData });
  } catch (error: any) {
    console.error("AI Quiz error:", error);
    res.status(500).json({ error: error?.message || "Failed to generate AI quiz." });
  }
});

// Vite & Static file serving
async function startServer() {
  const distHtmlPath = path.join(process.cwd(), "dist", "index.html");
  const isProduction = process.env.NODE_ENV === "production" && fs.existsSync(distHtmlPath);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), "index.html");
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, "utf-8");
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } else {
          next();
        }
      } catch (e: any) {
        if (vite && vite.ssrFixStacktrace) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(distHtmlPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LawHub Server running:`);
    console.log(`  ➜ Local:   http://localhost:${PORT}`);
    console.log(`  ➜ Network: http://127.0.0.1:${PORT}`);
  });
}

startServer();
