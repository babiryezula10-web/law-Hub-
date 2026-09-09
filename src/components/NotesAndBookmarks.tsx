import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  Bookmark,
  Plus,
  Search,
  Trash2,
  FileText,
  Download,
  Share2,
  Sparkles,
  Check,
  Edit2
} from 'lucide-react';
import { SavedNote } from '../types';

interface NotesAndBookmarksProps {
  notes: SavedNote[];
  onAddNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesAndBookmarks: React.FC<NotesAndBookmarksProps> = ({ notes, onAddNote, onDeleteNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Land Law');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('S.39, Spousal Consent');

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNoteObj: SavedNote = {
      id: `note_${Date.now()}`,
      title: newTitle,
      category: newCategory,
      content: newContent,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: 'Just now',
      tags: newTags.split(',').map((t) => t.trim())
    };

    onAddNote(newNoteObj);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="courthouse" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Bookmark className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                My Legal Study Notes & Bookmarks
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Personal case briefs, statutory summaries, and examination revision notes stored securely in your workspace.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#c89d42] text-neutral-950 font-bold text-xs hover:bg-[#dfb858] transition flex items-center gap-1.5 self-start sm:self-auto shadow-md cursor-pointer font-heading"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#c89d42] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title, tag, or topic..."
            className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((nt) => (
          <div
            key={nt.id}
            className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition shadow-lg flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                  {nt.category}
                </span>
                <button
                  onClick={() => onDeleteNote(nt.id)}
                  className="p-1 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-100">{nt.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-5 whitespace-pre-wrap font-sans">{nt.content}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>Updated {nt.updatedAt}</span>
              <div className="flex gap-1">
                {nt.tags.map((tg, i) => (
                  <span key={i} className="bg-white/[0.05] text-slate-300 px-1.5 py-0.5 rounded border border-white/10">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating Note */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleCreateNote} className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-2xl">
            <h2 className="font-heading font-extrabold text-xl text-slate-100">Create Study Note</h2>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Note Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Key ratio in Salomon v Salomon..."
                className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42]"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Course Subject</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#18181c] border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none"
              >
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Land Law">Land Law</option>
                <option value="Law of Contract">Law of Contract</option>
                <option value="Company Law">Company Law</option>
                <option value="Civil Procedure">Civil Procedure (LDC)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Note Content & Ratio Breakdown</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={5}
                placeholder="Write your revision notes, statutory provisions, or case summaries here..."
                className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42]"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="e.g. S.39, Spousal Consent, Land Act"
                className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 font-bold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
