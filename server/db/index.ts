import fs from 'fs';
import path from 'path';
import { BackendUser, DocumentRecord, ConstitutionChapter, LecturerSubmission, StudentSubmission } from '../types';
import { CONFIG } from '../config';
import { hashPassword } from '../middleware/auth';
import {
  DEFAULT_USER_SEEDS,
  DEFAULT_DOCUMENTS,
  DEFAULT_CONSTITUTION_DATA,
  DEFAULT_LECTURER_SUBMISSIONS,
  DEFAULT_STUDENT_SUBMISSIONS
} from './seeds';

class DatabaseStore {
  private users: BackendUser[] = [];
  private documents: DocumentRecord[] = [];
  private constitutionData: ConstitutionChapter[] = [];
  private lecturerSubmissions: LecturerSubmission[] = [];
  private studentSubmissions: StudentSubmission[] = [];

  constructor() {
    this.ensureDirectoryExists();
    this.loadData();
  }

  private ensureDirectoryExists(): void {
    if (!fs.existsSync(CONFIG.DATA_DIR)) {
      fs.mkdirSync(CONFIG.DATA_DIR, { recursive: true });
    }
  }

  private loadData(): void {
    if (fs.existsSync(CONFIG.DB_FILE)) {
      try {
        const raw = fs.readFileSync(CONFIG.DB_FILE, 'utf-8');
        const data = JSON.parse(raw);

        if (Array.isArray(data.systemUsers) && data.systemUsers.length > 0) {
          this.users = data.systemUsers;
        }
        if (Array.isArray(data.uploadedDocuments) && data.uploadedDocuments.length > 0) {
          this.documents = data.uploadedDocuments;
        }
        if (Array.isArray(data.uploadedConstitutionData) && data.uploadedConstitutionData.length > 0) {
          this.constitutionData = data.uploadedConstitutionData;
        }
        if (Array.isArray(data.lecturerSubmissions) && data.lecturerSubmissions.length > 0) {
          this.lecturerSubmissions = data.lecturerSubmissions;
        }
        if (Array.isArray(data.studentSubmissions) && data.studentSubmissions.length > 0) {
          this.studentSubmissions = data.studentSubmissions;
        }
      } catch (err) {
        console.error('[LawHub DB] Error reading data file, initializing defaults:', err);
      }
    }

    // Ensure seed documents and constitution exist if empty
    if (this.documents.length === 0) {
      this.documents = [...DEFAULT_DOCUMENTS];
    }
    if (this.constitutionData.length === 0) {
      this.constitutionData = [...DEFAULT_CONSTITUTION_DATA];
    }
    if (this.lecturerSubmissions.length === 0) {
      this.lecturerSubmissions = [...DEFAULT_LECTURER_SUBMISSIONS];
    }
    if (this.studentSubmissions.length === 0) {
      this.studentSubmissions = [...DEFAULT_STUDENT_SUBMISSIONS];
    }

    // Merge and hash default seed users
    const userMap = new Map<string, BackendUser>();
    for (const u of this.users) {
      const email = u.email.toLowerCase().trim();
      userMap.set(email, u);
    }

    for (const seed of DEFAULT_USER_SEEDS) {
      const email = seed.email.toLowerCase().trim();
      let defaultPass = 'Student@2025!';
      if (seed.role === 'Administrator') defaultPass = 'Admin@LawHub2025!';
      else if (seed.role === 'Lecturer') defaultPass = 'Faculty@2025!';

      const { salt, hash } = hashPassword(defaultPass);

      if (!userMap.has(email)) {
        userMap.set(email, {
          ...seed,
          passwordSalt: salt,
          passwordHash: hash
        });
      } else {
        const existing = userMap.get(email)!;
        if (!existing.passwordHash || !existing.passwordSalt) {
          existing.passwordSalt = salt;
          existing.passwordHash = hash;
        }
      }
    }

    this.users = Array.from(userMap.values());
    this.saveData();
    console.log(`[LawHub DB] Persistent store loaded with ${this.users.length} users, ${this.documents.length} docs, ${this.constitutionData.length} constitution chapters.`);
  }

  public saveData(): void {
    try {
      const payload = {
        systemUsers: this.users,
        uploadedDocuments: this.documents,
        uploadedConstitutionData: this.constitutionData,
        lecturerSubmissions: this.lecturerSubmissions,
        studentSubmissions: this.studentSubmissions,
        lastSaved: new Date().toISOString()
      };
      fs.writeFileSync(CONFIG.DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (err) {
      console.error('[LawHub DB] Error saving data store:', err);
    }
  }

  // --- Users CRUD ---
  public getUsers(): BackendUser[] {
    return [...this.users];
  }

  public findUserByEmail(email: string): BackendUser | undefined {
    const clean = email.toLowerCase().trim();
    return this.users.find((u) => u.email.toLowerCase().trim() === clean);
  }

  public findUserById(id: string): BackendUser | undefined {
    return this.users.find((u) => u.id === id);
  }

  public createUser(user: BackendUser): BackendUser {
    this.users.push(user);
    this.saveData();
    return user;
  }

  public updateUser(id: string, updates: Partial<BackendUser>): BackendUser | null {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    this.saveData();
    return this.users[index];
  }

  public deleteUser(id: string): boolean {
    const prevLen = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    if (this.users.length !== prevLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Documents CRUD ---
  public getDocuments(): DocumentRecord[] {
    return [...this.documents];
  }

  public findDocumentById(id: string): DocumentRecord | undefined {
    return this.documents.find((d) => d.id === id);
  }

  public createDocument(doc: DocumentRecord): DocumentRecord {
    this.documents.unshift(doc);
    this.saveData();
    return doc;
  }

  public updateDocument(id: string, updates: Partial<DocumentRecord>): DocumentRecord | null {
    const index = this.documents.findIndex((d) => d.id === id);
    if (index === -1) return null;
    this.documents[index] = { ...this.documents[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveData();
    return this.documents[index];
  }

  public deleteDocument(id: string): boolean {
    const prevLen = this.documents.length;
    this.documents = this.documents.filter((d) => d.id !== id);
    if (this.documents.length !== prevLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Constitution Data ---
  public getConstitutionData(): ConstitutionChapter[] {
    return [...this.constitutionData];
  }

  public addConstitutionChapter(chapter: ConstitutionChapter): void {
    this.constitutionData.push(chapter);
    this.saveData();
  }

  // --- Lecturer Submissions ---
  public getLecturerSubmissions(): LecturerSubmission[] {
    return [...this.lecturerSubmissions];
  }

  public createLecturerSubmission(submission: LecturerSubmission): LecturerSubmission {
    this.lecturerSubmissions.unshift(submission);
    this.saveData();
    return submission;
  }

  public deleteLecturerSubmission(id: string): boolean {
    const prev = this.lecturerSubmissions.length;
    this.lecturerSubmissions = this.lecturerSubmissions.filter((s) => s.id !== id);
    if (this.lecturerSubmissions.length !== prev) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Student Submissions ---
  public getStudentSubmissions(): StudentSubmission[] {
    return [...this.studentSubmissions];
  }

  public createStudentSubmission(submission: StudentSubmission): StudentSubmission {
    this.studentSubmissions.unshift(submission);
    this.saveData();
    return submission;
  }

  public reviewStudentSubmission(
    id: string,
    review: { grade: number; feedback: string; reviewedBy: string; status: 'GRADED' | 'REVISION_REQUESTED' }
  ): StudentSubmission | null {
    const sub = this.studentSubmissions.find((s) => s.id === id);
    if (!sub) return null;
    sub.grade = review.grade;
    sub.feedback = review.feedback;
    sub.reviewedBy = review.reviewedBy;
    sub.status = review.status;
    sub.reviewedAt = new Date().toISOString();
    this.saveData();
    return sub;
  }

  public deleteStudentSubmission(id: string): boolean {
    const prev = this.studentSubmissions.length;
    this.studentSubmissions = this.studentSubmissions.filter((s) => s.id !== id);
    if (this.studentSubmissions.length !== prev) {
      this.saveData();
      return true;
    }
    return false;
  }
}

export const db = new DatabaseStore();
