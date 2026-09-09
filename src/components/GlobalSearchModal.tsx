import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Scale,
  BookOpen,
  FileText,
  Gavel,
  Landmark,
  Sparkles,
  ArrowRight,
  Filter,
  Bookmark
} from 'lucide-react';
import {
  constitutionChapters,
  statutesList,
  caseLawDatabase,
  lawCoursesCatalog,
  pastPapersArchive,
  initialNotesList
} from '../data/mockData';
import { Statute, LegalCase, PastPaper, SavedNote } from '../types';
import { WatermarkBackground } from './WatermarkBackground';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (type: string, id: string, extraData?: any) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  onOpenTutorWithPrompt
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Constitution', 'Statutes', 'Case Law', 'Courses', 'Past Papers', 'Notes'];

  // Flatten search items
  const allResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'Constitution' | 'Statutes' | 'Case Law' | 'Courses' | 'Past Papers' | 'Notes';
      snippet: string;
      rawItem: any;
    }> = [];

    // Search Constitution
    constitutionChapters.forEach((ch) => {
      ch.articles.forEach((art) => {
        if (
          art.number.toLowerCase().includes(q) ||
          art.title.toLowerCase().includes(q) ||
          art.content.toLowerCase().includes(q) ||
          art.keywords.some((k) => k.toLowerCase().includes(q))
        ) {
          results.push({
            id: art.number,
            title: `${art.number}: ${art.title}`,
            subtitle: `Chapter ${art.chapterNumber}: ${art.chapterTitle}`,
            category: 'Constitution',
            snippet: art.content.slice(0, 160) + '...',
            rawItem: art
          });
        }
      });
    });

    // Search Statutes
    statutesList.forEach((st: Statute) => {
      if (
        st.shortTitle.toLowerCase().includes(q) ||
        st.longTitle.toLowerCase().includes(q) ||
        st.summary.toLowerCase().includes(q) ||
        st.sections.some((sec) => sec.title.toLowerCase().includes(q) || sec.text.toLowerCase().includes(q))
      ) {
        results.push({
          id: st.id,
          title: st.shortTitle,
          subtitle: `${st.chapterNumber || `Act ${st.year}`} • ${st.category}`,
          category: 'Statutes',
          snippet: st.summary.slice(0, 160) + '...',
          rawItem: st
        });
      }
    });

    // Search Cases
    caseLawDatabase.forEach((cs: LegalCase) => {
      if (
        cs.caseName.toLowerCase().includes(q) ||
        cs.citation.toLowerCase().includes(q) ||
        cs.facts.toLowerCase().includes(q) ||
        cs.ratioDecidendi.toLowerCase().includes(q) ||
        cs.legalPrinciples.some((p: string) => p.toLowerCase().includes(q))
      ) {
        results.push({
          id: cs.id,
          title: cs.caseName,
          subtitle: `${cs.citation} • ${cs.court} (${cs.year})`,
          category: 'Case Law',
          snippet: `Ratio Decidendi: ${cs.ratioDecidendi.slice(0, 150)}...`,
          rawItem: cs
        });
      }
    });

    // Search Courses
    lawCoursesCatalog.forEach((crs) => {
      if (
        crs.title.toLowerCase().includes(q) ||
        crs.code.toLowerCase().includes(q) ||
        crs.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: crs.id,
          title: `${crs.code}: ${crs.title}`,
          subtitle: `${crs.level} • ${crs.category}`,
          category: 'Courses',
          snippet: crs.description.slice(0, 150) + '...',
          rawItem: crs
        });
      }
    });

    // Search Past Papers
    pastPapersArchive.forEach((paper: PastPaper) => {
      if (
        paper.title.toLowerCase().includes(q) ||
        paper.courseTitle.toLowerCase().includes(q) ||
        paper.questions.some((quest: string) => quest.toLowerCase().includes(q))
      ) {
        results.push({
          id: paper.id,
          title: paper.title,
          subtitle: `${paper.institution} • ${paper.year} ${paper.semester}`,
          category: 'Past Papers',
          snippet: `Question sample: ${paper.questions[0]?.slice(0, 140) || ''}...`,
          rawItem: paper
        });
      }
    });

    // Search Notes
    initialNotesList.forEach((note: SavedNote) => {
      if (
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        note.tags.some((t: string) => t.toLowerCase().includes(q))
      ) {
        results.push({
          id: note.id,
          title: note.title,
          subtitle: `Saved Note • ${note.category}`,
          category: 'Notes',
          snippet: note.content.slice(0, 140) + '...',
          rawItem: note
        });
      }
    });

    return results;
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeCategory === 'All') return allResults;
    return allResults.filter((r) => r.category === activeCategory);
  }, [allResults, activeCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 text-slate-100">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#09090b]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] backdrop-blur-2xl">
        <WatermarkBackground type="constitution" opacity={0.12} blendMode="normal" withVignette={false} withGradientOverlay={false} />
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-black/40 backdrop-blur-md">
          <Search className="w-5 h-5 text-[#c89d42] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search LawHub (e.g. 'Law of contract', 'Article 21', 'Negligence', 'Land Act')..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 text-xs bg-white/[0.05] border border-white/10 rounded-lg cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-100 bg-white/[0.05] border border-white/10 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2 overflow-x-auto bg-black/30 backdrop-blur-md text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-xl font-semibold transition shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#c89d42] text-neutral-950 shadow-md'
                  : 'bg-black/30 text-slate-300 border border-white/10 hover:border-[#c89d42]/40 hover:text-slate-100 hover:bg-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {!query.trim() ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] text-[#c89d42] mx-auto flex items-center justify-center border border-white/10">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-100">Global Ugandan Legal Search</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Type any topic, case name, article, statute, or concept to instantly search across LawHub's database.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs">
                {['Law of Contract', 'Negligence', 'Article 21', 'Offer and acceptance', 'Land ownership', 'Administrative Law'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1.5 rounded-xl bg-slate-950/40 hover:bg-[#c89d42] hover:text-neutral-950 text-slate-300 border border-white/10 transition cursor-pointer backdrop-blur-sm"
                  >
                    "{sug}"
                  </button>
                ))}
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-sm text-slate-400">No results found for "{query}".</p>
              <button
                onClick={() => {
                  onOpenTutorWithPrompt(`Explain legal provisions and cases regarding: "${query}" in Ugandan law.`);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-[#c89d42] text-neutral-950 text-xs font-bold hover:bg-[#dfb858] transition inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>Ask AI Tutor to research "{query}"</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-1">
                Found {filteredResults.length} matching result{filteredResults.length > 1 ? 's' : ''}
              </p>
              {filteredResults.map((item) => (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={() => {
                    onSelectResult(item.category, item.id, item.rawItem);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/50 hover:bg-slate-900/50 cursor-pointer transition space-y-1.5 group backdrop-blur-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium truncate">{item.subtitle}</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-100 group-hover:text-[#c89d42] transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/10 bg-black/40 text-[11px] text-slate-400 flex items-center justify-between backdrop-blur-md">
          <span>Search LawHub Library</span>
          <button
            onClick={() => {
              onOpenTutorWithPrompt(`Perform deep research on: "${query || 'Ugandan Law'}"`);
              onClose();
            }}
            className="text-[#c89d42] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal Research</span>
          </button>
        </div>
      </div>
    </div>
  );
};
