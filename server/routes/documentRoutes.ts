import { Router, Request, Response } from 'express';
import { db } from '../db';
import { requireRole } from '../middleware/auth';
import { DocumentRecord, ConstitutionChapter } from '../types';

export const documentRouter = Router();

/**
 * GET /api/documents
 * List legal documents (Acts, Case Law, Regulations).
 */
documentRouter.get('/documents', (req: Request, res: Response) => {
  const { status, type, category, search, role } = req.query;

  let docs = db.getDocuments();

  if (role !== 'Administrator') {
    docs = docs.filter((d) => d.status === 'PUBLISHED');
  } else if (status && status !== 'All') {
    docs = docs.filter((d) => d.status === status);
  }

  if (type && type !== 'All') {
    docs = docs.filter((d) => d.documentType === type);
  }

  if (category && category !== 'All') {
    docs = docs.filter((d) => d.category === category);
  }

  if (search) {
    const q = String(search).toLowerCase();
    docs = docs.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)) ||
        d.citation.toLowerCase().includes(q)
    );
  }

  return res.json({ documents: docs, count: docs.length });
});

/**
 * GET /api/documents/:id
 * Retrieve a specific document by ID.
 */
documentRouter.get('/documents/:id', (req: Request, res: Response) => {
  const doc = db.findDocumentById(req.params.id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found.' });
  }
  return res.json({ document: doc });
});

/**
 * GET /api/constitution
 * Returns verified constitutional chapters and schedules.
 */
documentRouter.get('/constitution', (req: Request, res: Response) => {
  const chapters = db.getConstitutionData();
  return res.json({
    constitutionTitle: 'Constitution of the Republic of Uganda, 1995 (Consolidated)',
    lastAmended: 'Act No. 1 of 2018',
    chapters,
    totalChapters: chapters.length
  });
});

/**
 * POST /api/constitution/upload
 * Administrator only: Upload or update a chapter.
 */
documentRouter.post('/constitution/upload', requireRole(['Administrator']), (req: Request, res: Response) => {
  const { chapterNumber, chapterTitle, articlesCount, schedulesCount, fileName, fileSize, citation } = req.body;

  if (!chapterTitle) {
    return res.status(400).json({ error: 'Chapter title is required.' });
  }

  const newChapter: ConstitutionChapter = {
    chapterNumber: Number(chapterNumber) || 1,
    chapterTitle: String(chapterTitle).trim(),
    articlesCount: Number(articlesCount) || 1,
    schedulesCount: Number(schedulesCount) || 0,
    uploadedBy: 'Administrator',
    uploadedAt: new Date().toISOString(),
    fileName: fileName || 'Chapter_Update.pdf',
    fileSize: fileSize || '1.2 MB',
    verificationStatus: 'VERIFIED',
    citation: citation || 'Const. 1995'
  };

  db.addConstitutionChapter(newChapter);
  return res.status(201).json({ success: true, chapter: newChapter });
});

/**
 * POST /api/admin/documents
 * Administrator: Upload new document.
 */
documentRouter.post('/admin/documents', requireRole(['Administrator']), (req: Request, res: Response) => {
  const { title, documentType, category, description, citation, tags, year } = req.body;

  if (!title || !documentType) {
    return res.status(400).json({ error: 'Title and document type are required.' });
  }

  const newDoc: DocumentRecord = {
    id: `doc_${Date.now()}`,
    title: String(title).trim(),
    documentType: documentType || 'Statute',
    category: category || 'General Law',
    description: description || '',
    authorOrInstitution: 'Parliament of Uganda / Judiciary',
    source: 'LawHub Legal Information Repository',
    citation: citation || 'LawHub Citation',
    year: Number(year) || new Date().getFullYear(),
    edition: 'Official Edition',
    date: new Date().toISOString().split('T')[0],
    tags: Array.isArray(tags) ? tags : ['LawHub', 'Uganda'],
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verifiedBy: 'Administrator'
  };

  db.createDocument(newDoc);
  return res.status(201).json({ success: true, document: newDoc });
});

/**
 * PUT /api/admin/documents/:id
 * Administrator: Update existing document.
 */
documentRouter.put('/admin/documents/:id', requireRole(['Administrator']), (req: Request, res: Response) => {
  const updated = db.updateDocument(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Document not found.' });
  }
  return res.json({ success: true, document: updated });
});

/**
 * DELETE /api/admin/documents/:id
 * Administrator: Delete a document.
 */
documentRouter.delete('/admin/documents/:id', requireRole(['Administrator']), (req: Request, res: Response) => {
  const deleted = db.deleteDocument(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Document not found.' });
  }
  return res.json({ success: true, message: 'Document removed successfully.' });
});
