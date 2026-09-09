import React, { useState, useEffect } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  Landmark,
  Search,
  BookOpen,
  Scale,
  Bookmark,
  BookMarked,
  FileText,
  Copy,
  Check,
  Building2,
  Calendar,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  Plus,
  StickyNote,
  Save,
  Trash2,
  Layers,
  Upload,
  AlertCircle,
  Info,
  X
} from 'lucide-react';
import {
  constitutionChapters,
  constitutionPreamble,
  nationalObjectives,
  constitutionSchedules,
  constitutionAmendmentsHistory
} from '../data/constitutionData';
import { ConstitutionArticle, ConstitutionChapter, UserRole } from '../types';

interface ConstitutionLibraryProps {
  userRole?: UserRole;
  onOpenAdminUpload?: () => void;
  onOpenTutorWithPrompt?: (prompt: string) => void;
}

export const ConstitutionLibrary: React.FC<ConstitutionLibraryProps> = ({
  userRole = 'Student',
  onOpenAdminUpload,
  onOpenTutorWithPrompt
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'preamble' | 'objectives' | 'schedules' | 'amendments' | 'uploaded_docs'>('browse');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ConstitutionArticle | null>(null);

  // Bookmarks & Personal Notes
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem('lawhub_bookmarked_articles');
    return saved ? JSON.parse(saved) : ['Article 1', 'Article 2', 'Article 20', 'Article 21', 'Article 126'];
  });

  const [personalNotes, setPersonalNotes] = useState<{ [articleNumber: string]: string }>(() => {
    const saved = localStorage.getItem('lawhub_constitution_notes');
    return saved ? JSON.parse(saved) : {
      'Article 1': 'Foundational constitutional authority: In Tinyefuza and Ssemogerere, Supreme Court established all organs of state derive power from the citizenry.',
      'Article 21': 'Non-discrimination clause: Scrutinize exceptions under Article 21(4) and compare with Article 33 on rights of women.',
      'Article 126': 'Substantive justice vs technicalities: In Stephen Mabosi v URA, court ruled procedural defects must not defeat substantive justice.'
    };
  });

  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('lawhub_bookmarked_articles', JSON.stringify(bookmarkedArticles));
  }, [bookmarkedArticles]);

  useEffect(() => {
    localStorage.setItem('lawhub_constitution_notes', JSON.stringify(personalNotes));
  }, [personalNotes]);

  useEffect(() => {
    fetch('/api/constitution')
      .then(res => res.json())
      .then(data => {
        if (data?.documents) {
          setUploadedDocs(data.documents);
        }
      })
      .catch(err => console.error('Error loading uploaded constitution docs:', err));
  }, []);

  const toggleBookmark = (articleNo: string) => {
    setBookmarkedArticles(prev =>
      prev.includes(articleNo) ? prev.filter(a => a !== articleNo) : [...prev, articleNo]
    );
  };

  const handleSaveNote = (articleNo: string) => {
    if (!currentNoteText.trim()) {
      const updated = { ...personalNotes };
      delete updated[articleNo];
      setPersonalNotes(updated);
    } else {
      setPersonalNotes(prev => ({ ...prev, [articleNo]: currentNoteText }));
    }
  };

  const handleSelectArticle = (article: ConstitutionArticle) => {
    setSelectedArticle(article);
    setCurrentNoteText(personalNotes[article.number] || '');
  };

  // Flatten all articles
  const allArticles: ConstitutionArticle[] = constitutionChapters.flatMap(c => c.articles);

  const filteredArticles = allArticles.filter(art => {
    const matchesChapter = selectedChapterNumber === 'all' || art.chapterNumber === selectedChapterNumber;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesChapter;
    const matchesSearch =
      art.number.toLowerCase().includes(q) ||
      art.title.toLowerCase().includes(q) ||
      art.content.toLowerCase().includes(q) ||
      art.keywords.some(k => k.toLowerCase().includes(q)) ||
      (art.keyPrinciples && art.keyPrinciples.some(p => p.toLowerCase().includes(q))) ||
      art.keyCases.some(c => c.toLowerCase().includes(q));
    return matchesChapter && matchesSearch;
  });

  const handleCopyCitation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 3000);
  };

  return (
    <div className="relative space-y-8 pb-16 text-slate-100">
      <WatermarkBackground type="classic_watermark" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* Header Banner */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Landmark className="w-6 h-6" />
              </span>
              <div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100 tracking-tight">
                  Constitution of the Republic of Uganda, 1995
                </h1>
                <p className="text-xs text-[#c89d42] font-semibold mt-0.5">
                  Consolidated Authentic Text as Amended (19 Chapters • 288 Articles • 7 Schedules)
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              Official supreme law of the Republic of Uganda. Every provision in this digital repository is verified against the Uganda Gazette, Uganda Legal Information Institute (ULII), and parliamentary amendment acts.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <span className="px-3.5 py-1.5 bg-white/[0.05] text-[#c89d42] text-xs font-bold rounded-full border border-[#c89d42]/30 flex items-center gap-1.5 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" /> 100% Authentic Law
            </span>
            {userRole === 'Administrator' && onOpenAdminUpload && (
              <button
                onClick={onOpenAdminUpload}
                className="px-4 py-2 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-heading font-bold rounded-xl transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" /> Upload Constitution
              </button>
            )}
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => setActiveSubTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'browse'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Browse Chapters (1 to 19)
          </button>
          <button
            onClick={() => setActiveSubTab('preamble')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'preamble'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Preamble
          </button>
          <button
            onClick={() => setActiveSubTab('objectives')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'objectives'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Directive Principles (I to XXIX)
          </button>
          <button
            onClick={() => setActiveSubTab('schedules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'schedules'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> 7 Schedules
          </button>
          <button
            onClick={() => setActiveSubTab('amendments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'amendments'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Constitutional Amendments
          </button>
          <button
            onClick={() => setActiveSubTab('uploaded_docs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm ${
              activeSubTab === 'uploaded_docs'
                ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                : 'bg-black/30 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Documents ({uploadedDocs.length})
          </button>
        </div>
      </div>

      {/* ----------------- SUB-TAB 1: BROWSE ARTICLES (19 CHAPTERS) ----------------- */}
      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          {/* Search & Chapter Filtering */}
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#c89d42] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Constitution by Article number (e.g. 21), keyword (e.g. equality, fair hearing, bail), or landmark case..."
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={selectedChapterNumber}
                  onChange={(e) => setSelectedChapterNumber(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-[#c89d42]"
                >
                  <option value="all">All 19 Chapters (Full Constitution)</option>
                  {constitutionChapters.map((ch) => (
                    <option key={ch.number} value={ch.number}>
                      Chapter {ch.number}: {ch.title} ({ch.articles.length} Arts)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Chapter Pill Quick Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-xs">
              <button
                onClick={() => setSelectedChapterNumber('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition backdrop-blur-sm ${
                  selectedChapterNumber === 'all'
                    ? 'bg-[#c89d42] text-neutral-950 font-bold'
                    : 'bg-black/30 text-slate-300 hover:text-slate-100 border border-white/10 hover:bg-white/[0.05]'
                }`}
              >
                All Chapters
              </button>
              {constitutionChapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapterNumber(ch.number)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition backdrop-blur-sm ${
                    selectedChapterNumber === ch.number
                      ? 'bg-[#c89d42] text-neutral-950 font-bold'
                      : 'bg-black/30 text-slate-300 hover:text-slate-100 border border-white/10 hover:bg-white/[0.05]'
                  }`}
                >
                  Ch {ch.number}: {ch.title}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-slate-200">{filteredArticles.length}</strong> Constitutional Articles
              {selectedChapterNumber !== 'all' && ` in Chapter ${selectedChapterNumber}`}
            </span>
            <span className="text-[#c89d42] font-medium">1995 Constitution of the Republic of Uganda</span>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-12 text-center space-y-3 backdrop-blur-md">
              <AlertCircle className="w-8 h-8 text-[#c89d42] mx-auto" />
              <h3 className="text-base font-bold text-slate-200">No matching articles found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Content not yet uploaded for this specific query. An authorised administrator can add or update constitutional provisions in the Admin Dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredArticles.map((article, idx) => {
                const isBookmarked = bookmarkedArticles.includes(article.number);
                const hasNote = Boolean(personalNotes[article.number]);

                return (
                  <div
                    key={idx}
                    className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-2xl p-5 space-y-4 transition flex flex-col justify-between group shadow-sm hover:shadow-md backdrop-blur-md hover:bg-slate-900/50"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#c89d42]">
                            Chapter {article.chapterNumber} • {article.chapterTitle}
                          </span>
                          <h3 className="font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">
                            {article.number}: {article.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleBookmark(article.number)}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                          className={`p-1.5 rounded-lg border transition ${
                            isBookmarked
                              ? 'bg-white/[0.08] border-[#c89d42]/40 text-[#c89d42]'
                              : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {article.content}
                      </p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {article.keywords.slice(0, 3).map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="px-2 py-0.5 rounded-md bg-black/30 border border-white/10 text-[10px] text-slate-300 font-medium"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      {/* Key Cases Badge if any */}
                      {article.keyCases && article.keyCases.length > 0 && (
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                          <Scale className="w-3 h-3 text-[#c89d42] shrink-0" />
                          <span className="truncate">{article.keyCases[0]}</span>
                        </div>
                      )}

                      {hasNote && (
                        <div className="px-2.5 py-1 bg-white/[0.05] border border-[#c89d42]/30 rounded-lg text-[10px] text-[#c89d42] flex items-center gap-1.5">
                          <StickyNote className="w-3 h-3" /> Has Personal Note
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {article.clauses ? `${article.clauses.length} Clauses` : 'Full Article'}
                      </span>
                      <button
                        onClick={() => handleSelectArticle(article)}
                        className="text-xs font-bold text-[#c89d42] hover:text-[#dfb858] flex items-center gap-1 transition cursor-pointer"
                      >
                        Read Verbatim <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ----------------- SUB-TAB 2: PREAMBLE ----------------- */}
      {activeSubTab === 'preamble' && (
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl max-w-4xl mx-auto backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-[#c89d42] font-bold uppercase tracking-wider">Foundational Enactment</span>
              <h2 className="text-xl font-heading font-extrabold text-slate-100 mt-1">
                {constitutionPreamble.title}
              </h2>
            </div>
            <button
              onClick={() => handleCopyCitation(constitutionPreamble.text)}
              className="px-3 py-1.5 bg-white/[0.05] border border-white/10 hover:border-[#c89d42]/30 text-xs text-slate-300 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCitation ? 'Copied' : 'Copy Text'}
            </button>
          </div>

          <div className="bg-black/30 p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-line backdrop-blur-sm">
            {constitutionPreamble.text}
          </div>

          <div className="p-4 bg-black/30 border border-white/10 rounded-2xl flex items-center justify-between text-xs text-slate-400 backdrop-blur-sm">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Source: Legal Notice No. 1 of 1995 (Uganda Gazette)
            </span>
            <span>Promulgated 8th October 1995</span>
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 3: DIRECTIVE PRINCIPLES ----------------- */}
      {activeSubTab === 'objectives' && (
        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
            <h2 className="text-lg font-bold text-slate-100">
              National Objectives and Directive Principles of State Policy
            </h2>
            <p className="text-xs text-slate-400">
              Principles guiding all organs and agencies of the State, citizens, and organizations in applying or interpreting the Constitution or any other law.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nationalObjectives.map((obj, idx) => (
              <div
                key={idx}
                className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2.5 shadow-sm backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-xs font-bold rounded-md">
                    {obj.number}
                  </span>
                  <span className="text-[10px] text-slate-400">Directive Principle</span>
                </div>
                <h3 className="font-bold text-sm text-slate-100">{obj.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {obj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 4: 7 SCHEDULES ----------------- */}
      {activeSubTab === 'schedules' && (
        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
            <h2 className="text-lg font-bold text-slate-100">
              The Seven Constitutional Schedules
            </h2>
            <p className="text-xs text-slate-400">
              Authentic statutory schedules annexed to the Constitution of the Republic of Uganda, 1995.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {constitutionSchedules.map((sch, idx) => (
              <div
                key={idx}
                className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-3 shadow-md backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-xs font-bold rounded-lg">
                    {sch.number}
                  </span>
                  <span className="text-[10px] text-slate-400">Uganda Constitution 1995</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">{sch.title}</h3>
                <p className="text-xs text-slate-300 font-medium">{sch.summary}</p>
                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-xs text-slate-300 leading-relaxed backdrop-blur-sm">
                  {sch.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 5: CONSTITUTIONAL AMENDMENTS ----------------- */}
      {activeSubTab === 'amendments' && (
        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
            <h2 className="text-lg font-bold text-slate-100">
              Constitutional Amendment Acts History
            </h2>
            <p className="text-xs text-slate-400">
              Enacted constitutional amendment statutes passed by the Parliament of Uganda in accordance with Chapter 18 procedures.
            </p>
          </div>

          <div className="space-y-4">
            {constitutionAmendmentsHistory.map((amend, idx) => (
              <div
                key={idx}
                className="bg-slate-950/40 border border-white/10 rounded-2xl p-6 space-y-3 shadow-md backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#c89d42] uppercase tracking-wider">
                      {amend.actNumber} • Promulgated {amend.promulgationDate}
                    </span>
                    <h3 className="text-base font-bold text-slate-100">{amend.actName}</h3>
                  </div>
                  <span className="px-3 py-1 bg-black/30 border border-white/10 text-xs text-slate-300 rounded-full font-bold self-start sm:self-auto backdrop-blur-sm">
                    Year {amend.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {amend.summary}
                </p>

                <div className="flex items-center gap-2 flex-wrap pt-2">
                  <span className="text-[11px] text-slate-400 font-bold">Affected Provisions:</span>
                  {amend.affectedArticles.map((art, aIdx) => (
                    <span
                      key={aIdx}
                      className="px-2 py-0.5 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[10px] font-semibold rounded-md"
                    >
                      {art}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 6: UPLOADED VERIFIED DOCUMENTS ----------------- */}
      {activeSubTab === 'uploaded_docs' && (
        <div className="space-y-6">
          <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
            <h2 className="text-lg font-bold text-slate-100">
              Authorised Uploaded Constitutional Documents
            </h2>
            <p className="text-xs text-slate-400">
              Verified copies of the Constitution of Uganda uploaded by authorised administrators for persistent academic and research access.
            </p>
          </div>

          <div className="space-y-4">
            {uploadedDocs.length === 0 ? (
              <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-10 text-center space-y-3 backdrop-blur-md">
                <AlertCircle className="w-8 h-8 text-[#c89d42] mx-auto" />
                <h3 className="text-base font-bold text-slate-200">No additional documents uploaded</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  The primary verified 1995 Constitution is active in the repository. Authorised administrators can upload supplementary gazetted versions from the Admin Dashboard.
                </p>
              </div>
            ) : (
              uploadedDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/40 border border-white/10 rounded-2xl p-6 space-y-3 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {doc.verificationStatus || 'VERIFIED'}
                      </span>
                      <span className="text-xs text-[#c89d42] font-bold">{doc.citation}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{doc.title}</h3>
                    <p className="text-xs text-slate-400">
                      Source: <strong>{doc.source}</strong> • Institution: <strong>{doc.institution}</strong> • Edition: {doc.edition}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      File: {doc.fileName} ({doc.fileSize}) • Uploaded by {doc.uploadedBy} on {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenTutorWithPrompt) {
                        onOpenTutorWithPrompt(`Explain the constitutional principles of the 1995 Constitution of Uganda.`);
                      }
                    }}
                    className="px-4 py-2 bg-black/30 border border-white/10 hover:border-[#c89d42]/40 text-xs font-bold text-[#c89d42] rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Research In Depth
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ----------------- ARTICLE READER & ANNOTATION MODAL ----------------- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#c89d42]">
                  Chapter {selectedArticle.chapterNumber} • {selectedArticle.chapterTitle}
                </span>
                <h2 className="text-xl font-heading font-extrabold text-slate-100 mt-1">
                  {selectedArticle.number}: {selectedArticle.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedArticle.number)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarkedArticles.includes(selectedArticle.number)
                      ? 'bg-white/[0.08] border-[#c89d42]/40 text-[#c89d42]'
                      : 'bg-black/30 border-white/10 text-slate-400'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedArticles.includes(selectedArticle.number) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-black/30 border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Verbatim Statutory Content */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verbatim Constitutional Text</span>
              <div className="p-5 bg-black/30 rounded-2xl border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-serif whitespace-pre-line backdrop-blur-sm">
                {selectedArticle.content}
              </div>
            </div>

            {/* Clauses Breakdown if available */}
            {selectedArticle.clauses && selectedArticle.clauses.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clauses Breakdown</span>
                <div className="space-y-2">
                  {selectedArticle.clauses.map((clause, cIdx) => (
                    <div key={cIdx} className="p-3 bg-black/20 border border-white/10 rounded-xl text-xs flex items-start gap-2.5">
                      <span className="font-bold text-[#c89d42] shrink-0">{clause.clauseNumber}</span>
                      <span className="text-slate-300">{clause.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Principles */}
            {selectedArticle.keyPrinciples && selectedArticle.keyPrinciples.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Constitutional Principles</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.keyPrinciples.map((principle, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-xs font-medium rounded-lg"
                    >
                      ✓ {principle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Landmark Ugandan Precedents */}
            {selectedArticle.keyCases && selectedArticle.keyCases.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relevant Ugandan Court Precedents</span>
                <div className="space-y-1.5">
                  {selectedArticle.keyCases.map((cs, csIdx) => (
                    <div
                      key={csIdx}
                      className="p-3 bg-black/30 border border-white/10 rounded-xl text-xs flex items-center justify-between text-slate-200"
                    >
                      <span className="font-medium flex items-center gap-2">
                        <Scale className="w-3.5 h-3.5 text-[#c89d42]" /> {cs}
                      </span>
                      {onOpenTutorWithPrompt && (
                        <button
                          onClick={() => {
                            setSelectedArticle(null);
                            onOpenTutorWithPrompt(`Explain the ratio decidendi and constitutional relevance of ${cs} in relation to ${selectedArticle.number} of the 1995 Constitution.`);
                          }}
                          className="text-[10px] font-bold text-[#c89d42] hover:text-[#dfb858] cursor-pointer"
                        >
                          Analyze Precedent →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Notes / Annotation Area */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <StickyNote className="w-4 h-4 text-[#c89d42]" /> Scholar Notes & Annotations
                </span>
                <button
                  onClick={() => handleSaveNote(selectedArticle.number)}
                  className="px-3 py-1 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3 h-3" /> Save Note
                </button>
              </div>

              <textarea
                value={currentNoteText}
                onChange={(e) => setCurrentNoteText(e.target.value)}
                placeholder="Write your research notes, case comments, exam problem associations, or statutory cross-references here..."
                rows={3}
                className="w-full bg-black/30 border border-white/10 text-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:border-[#c89d42]"
              />
            </div>

            {/* Source Reference & Footer */}
            <div className="p-4 bg-black/30 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Source: <strong>Uganda Gazette / ULII</strong> ({selectedArticle.number})</span>
              </div>
              <button
                onClick={() => handleCopyCitation(`${selectedArticle.number} (${selectedArticle.title}), Constitution of the Republic of Uganda 1995`)}
                className="text-[#c89d42] hover:text-[#dfb858] font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedCitation ? 'Citation Copied!' : 'Copy Formal Citation'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
