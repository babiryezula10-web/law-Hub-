import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  Scale,
  BookOpen,
  FileText,
  Search,
  ChevronRight,
  Share2,
  X,
  Check,
  Copy,
  Building2,
  Calendar,
  Link2,
  ShieldCheck,
  HelpCircle,
  Award,
  Layers,
  Library,
  BookMarked,
  Sparkles,
  Info
} from 'lucide-react';
import {
  constitutionChapters,
  statutesList,
  caseLawDatabase,
  regulationsList,
  statutoryInstrumentsList,
  legalDictionaryTerms,
  legalMaximsList,
  legalResourceGuides,
  blacksLawDictionary,
  redVolumesList
} from '../data/mockData';
import {
  ConstitutionArticle,
  Statute,
  LegalCase,
  Regulation,
  StatutoryInstrument,
  LegalDictionaryTerm,
  LegalMaxim,
  LegalResourceGuide,
  BlacksLawTerm,
  RedVolumeEntry
} from '../types';

export const LegalResearchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'constitution' | 'statutes' | 'regulations' | 'si' | 'cases' | 'graph' | 'dictionary' | 'blacks' | 'red_vol1' | 'red_vol2' | 'maxims' | 'resources'
  >('constitution');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedCourt, setSelectedCourt] = useState('All');
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState('All');

  // Reader Modal states
  const [selectedArticle, setSelectedArticle] = useState<ConstitutionArticle | null>(null);
  const [selectedStatute, setSelectedStatute] = useState<Statute | null>(null);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [selectedSI, setSelectedSI] = useState<StatutoryInstrument | null>(null);
  const [selectedDictTerm, setSelectedDictTerm] = useState<LegalDictionaryTerm | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<LegalResourceGuide | null>(null);
  const [selectedBlacksTerm, setSelectedBlacksTerm] = useState<BlacksLawTerm | null>(null);
  const [selectedRedEntry, setSelectedRedEntry] = useState<RedVolumeEntry | null>(null);

  const [copied, setCopied] = useState(false);

  // 1. Constitution Articles
  const allArticles: ConstitutionArticle[] = constitutionChapters.flatMap((ch) => ch.articles);
  const filteredArticles = allArticles.filter((art) => {
    const query = searchQuery.toLowerCase();
    return (
      art.number.toLowerCase().includes(query) ||
      art.title.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  // 2. Statutes Filtering
  const filteredStatutes = statutesList.filter((st) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      st.shortTitle.toLowerCase().includes(query) ||
      st.category.toLowerCase().includes(query) ||
      st.summary.toLowerCase().includes(query) ||
      st.sections.some((sec) => sec.title.toLowerCase().includes(query) || sec.sectionNumber.toLowerCase().includes(query));
    const matchesCategory = selectedStatuteCategory === 'All' || st.category === selectedStatuteCategory;
    return matchesSearch && matchesCategory;
  });

  // 3. Regulations Filtering
  const filteredRegulations = regulationsList.filter((reg) => {
    const query = searchQuery.toLowerCase();
    return (
      reg.name.toLowerCase().includes(query) ||
      reg.siNumber.toLowerCase().includes(query) ||
      reg.parentActTitle.toLowerCase().includes(query) ||
      reg.summary.toLowerCase().includes(query) ||
      reg.subject.toLowerCase().includes(query)
    );
  });

  // 4. Statutory Instruments Filtering
  const filteredSIs = statutoryInstrumentsList.filter((si) => {
    const query = searchQuery.toLowerCase();
    return (
      si.title.toLowerCase().includes(query) ||
      si.siNumber.toLowerCase().includes(query) ||
      si.parentLegislation.toLowerCase().includes(query) ||
      si.contentSummary.toLowerCase().includes(query) ||
      si.subjectCategory.toLowerCase().includes(query)
    );
  });

  // 5. Case Law Filtering
  const filteredCases = caseLawDatabase.filter((cs) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      cs.caseName.toLowerCase().includes(query) ||
      cs.citation.toLowerCase().includes(query) ||
      cs.topic.toLowerCase().includes(query) ||
      cs.ratioDecidendi.toLowerCase().includes(query) ||
      cs.facts.toLowerCase().includes(query) ||
      cs.judges.some((j) => j.toLowerCase().includes(query));
    const matchesTopic = selectedTopic === 'All' || cs.topic === selectedTopic;
    const matchesCourt = selectedCourt === 'All' || cs.court.includes(selectedCourt);
    return matchesSearch && matchesTopic && matchesCourt;
  });

  // 6. Legal Dictionary Filtering
  const filteredDictTerms = legalDictionaryTerms.filter((term) => {
    const query = searchQuery.toLowerCase();
    return (
      term.term.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      term.simpleExplanation.toLowerCase().includes(query) ||
      term.legalMeaning.toLowerCase().includes(query)
    );
  });

  // 6B. Black's Law Dictionary Filtering
  const filteredBlacksTerms = blacksLawDictionary.filter((bt) => {
    const query = searchQuery.toLowerCase();
    return (
      bt.term.toLowerCase().includes(query) ||
      bt.definition.toLowerCase().includes(query) ||
      bt.ugandanApplication.toLowerCase().includes(query) ||
      bt.category.toLowerCase().includes(query) ||
      (bt.etymology && bt.etymology.toLowerCase().includes(query))
    );
  });

  // 6C. Red Volume 1 Filtering (Civil Procedure & Practice)
  const filteredRedVol1 = redVolumesList.filter((rv) => {
    const query = searchQuery.toLowerCase();
    const isVol1 = rv.volumeNumber === 1;
    const matchesSearch =
      rv.title.toLowerCase().includes(query) ||
      rv.statutoryRef.toLowerCase().includes(query) ||
      rv.summary.toLowerCase().includes(query) ||
      rv.subject.toLowerCase().includes(query);
    return isVol1 && matchesSearch;
  });

  // 6D. Red Volume 2 Filtering (Criminal Procedure & Evidence)
  const filteredRedVol2 = redVolumesList.filter((rv) => {
    const query = searchQuery.toLowerCase();
    const isVol2 = rv.volumeNumber === 2;
    const matchesSearch =
      rv.title.toLowerCase().includes(query) ||
      rv.statutoryRef.toLowerCase().includes(query) ||
      rv.summary.toLowerCase().includes(query) ||
      rv.subject.toLowerCase().includes(query);
    return isVol2 && matchesSearch;
  });

  // 7. Legal Maxims Filtering
  const filteredMaxims = legalMaximsList.filter((mx) => {
    const query = searchQuery.toLowerCase();
    return (
      mx.latinPhrase.toLowerCase().includes(query) ||
      mx.englishTranslation.toLowerCase().includes(query) ||
      mx.explanation.toLowerCase().includes(query) ||
      mx.legalPrinciple.toLowerCase().includes(query)
    );
  });

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="golden_tome" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Scale className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                Ugandan Comprehensive Legal Library & Research Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Search the 1995 Constitution, Acts of Parliament, Regulations, Statutory Instruments, Precedents, Legal Dictionary & Maxims.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="px-3 py-1.5 bg-white/[0.05] text-[#c89d42] text-xs font-bold rounded-full border border-[#c89d42]/30 flex items-center gap-1.5 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Verifiable Authorities
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap gap-1.5 bg-black/30 p-2 rounded-2xl border border-white/10 text-xs font-semibold overflow-x-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab('constitution')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'constitution' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            🏛️ Constitution 1995
          </button>
          <button
            onClick={() => setActiveTab('statutes')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'statutes' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📜 Statutes (Acts)
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'regulations' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📑 Regulations
          </button>
          <button
            onClick={() => setActiveTab('si')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'si' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📄 Statutory Instruments
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'cases' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            ⚖️ Case Law Database
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'graph' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            🕸️ Research Graph
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'dictionary' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📖 Legal Dictionary
          </button>
          <button
            onClick={() => setActiveTab('blacks')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'blacks' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📚 Black's Law
          </button>
          <button
            onClick={() => setActiveTab('red_vol1')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'red_vol1' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📕 Red Vol 1 (Civil)
          </button>
          <button
            onClick={() => setActiveTab('red_vol2')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'red_vol2' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📕 Red Vol 2 (Criminal)
          </button>
          <button
            onClick={() => setActiveTab('maxims')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'maxims' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📜 Legal Maxims
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'resources' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            🎓 Resource Guides
          </button>
        </div>

        {/* Global Tab Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#c89d42] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.toUpperCase()} by keyword, section, citation, ratio, or article number...`}
            className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#c89d42] shadow-inner backdrop-blur-md"
          />
        </div>
      </div>

      {/* ----------------- TAB 1: CONSTITUTION 1995 ----------------- */}
      {activeTab === 'constitution' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredArticles.length}</strong> Constitutional Articles</span>
            <span className="text-[#c89d42]">Republic of Uganda Constitution (1995 as amended)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedArticle(art)}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 cursor-pointer transition space-y-4 group hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#c89d42] bg-white/[0.05] px-2.5 py-1 rounded-full border border-[#c89d42]/30">
                      {art.number}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Ch. {art.chapterNumber}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">{art.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{art.content}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{art.keyCases.length} Key Precedents</span>
                  <span className="text-[#c89d42] font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: STATUTES (ACTS OF PARLIAMENT) ----------------- */}
      {activeTab === 'statutes' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
            <span>Showing <strong>{filteredStatutes.length}</strong> Codified Acts of Parliament</span>

            <div className="flex items-center gap-2">
              <span>Category Filter:</span>
              <select
                value={selectedStatuteCategory}
                onChange={(e) => setSelectedStatuteCategory(e.target.value)}
                className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Statutory Categories</option>
                <option value="Commercial & Civil Law">Commercial & Civil Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Property & Land Law">Property & Land Law</option>
                <option value="Corporate & Commercial Law">Corporate Law</option>
                <option value="Cyber & Technology Law">Cyber & Technology Law</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredStatutes.map((st) => (
              <div
                key={st.id}
                className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/40 transition shadow-lg backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-slate-100">{st.shortTitle}</h3>
                      <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                        {st.chapterNumber}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {st.status || 'Current'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 italic mt-0.5">{st.longTitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedStatute(st)}
                    className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition self-start sm:self-auto cursor-pointer"
                  >
                    View Sections ({st.sections.length})
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{st.summary}</p>

                {/* Sections preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {st.sections.map((sec, idx) => (
                    <div key={idx} className="bg-black/30 p-3.5 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                      <p className="font-bold text-xs text-[#c89d42]">{sec.sectionNumber} - {sec.title}</p>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{sec.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 3: REGULATIONS LIBRARY ----------------- */}
      {activeTab === 'regulations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredRegulations.length}</strong> Subsidiary Regulations</span>
            <span className="text-[#c89d42]">Connected to Parent Statutory Acts</span>
          </div>

          <div className="space-y-4">
            {filteredRegulations.map((reg) => (
              <div key={reg.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 hover:border-[#c89d42]/30 transition shadow-lg backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                      {reg.siNumber}
                    </span>
                    <h3 className="font-bold text-base text-slate-100 mt-1">{reg.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Link2 className="w-3.5 h-3.5 text-[#c89d42]" />
                      <span>Parent Act: <strong className="text-slate-200">{reg.parentActTitle}</strong></span>
                    </p>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                    {reg.status} Law
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{reg.summary}</p>

                {reg.fullText && (
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/10 text-xs text-slate-300 font-mono backdrop-blur-sm">
                    {reg.fullText}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 4: STATUTORY INSTRUMENTS ----------------- */}
      {activeTab === 'si' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredSIs.length}</strong> Statutory Instruments & Subsidiary Rules</span>
            <span className="text-[#c89d42]">Promulgated Subsidiary Legislation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSIs.map((si) => (
              <div key={si.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 hover:border-[#c89d42]/30 transition shadow-lg flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-1 rounded-full border border-[#c89d42]/30">
                      {si.siNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{si.type}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-100">{si.title}</h3>
                  <p className="text-xs text-slate-400">Parent Legislation: {si.parentLegislation}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{si.contentSummary}</p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex justify-between items-center">
                  <span>Promulgated: {si.datePromulgated}</span>
                  <span className="text-emerald-400 font-bold">{si.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 5: CASE LAW DATABASE ----------------- */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-400">
            <span>Showing <strong>{filteredCases.length}</strong> Landmark Precedents</span>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span>Court:</span>
                <select
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="All">All Courts</option>
                  <option value="Supreme Court">Supreme Court</option>
                  <option value="Court of Appeal">Court of Appeal / Constitutional</option>
                  <option value="High Court">High Court Divisions</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span>Topic:</span>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="All">All Legal Topics</option>
                  <option value="Constitutional Law & Fundamental Rights">Constitutional Law</option>
                  <option value="Criminal Law & Mens Rea">Criminal Law</option>
                  <option value="Human Rights & Constitutional Law">Human Rights</option>
                  <option value="Banking Law & Corporate Law">Banking & Corporate Law</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredCases.map((cs) => (
              <div
                key={cs.id}
                className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/40 transition shadow-lg backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-100">{cs.caseName}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="text-[#c89d42] font-mono font-semibold">{cs.citation}</span>
                      <span>• {cs.court}</span>
                      <span>• Year {cs.year}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCase(cs)}
                    className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Full Case Brief</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Facts of the Case</p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">{cs.facts}</p>
                  </div>

                  <div className="bg-black/30 p-4 rounded-2xl border border-[#c89d42]/30 space-y-1 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#c89d42]">Ratio Decidendi</p>
                    <p className="text-xs text-slate-200 italic leading-relaxed line-clamp-4">{cs.ratioDecidendi}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                  <span className="text-slate-400 font-semibold">Legal Principles:</span>
                  {cs.legalPrinciples.map((pr, idx) => (
                    <span key={idx} className="bg-white/[0.05] text-slate-300 px-2 py-0.5 rounded-lg border border-white/10">
                      ✓ {pr}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 6: KNOWLEDGE GRAPH CONNECTIONS ----------------- */}
      {activeTab === 'graph' && (
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c89d42] font-bold text-sm">
            <Layers className="w-5 h-5" />
            <span>Interconnected Legal Research Graph</span>
          </div>
          <p className="text-xs text-slate-400">
            Trace bi-directional links from Constitutional Provisions → Statutory Acts → Subsidiary Regulations → Judicial Precedents → Course Material.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-[#c89d42]">1. Constitutional Foundation</span>
              <h4 className="font-bold text-sm text-slate-100">Article 237 - Land Ownership</h4>
              <p className="text-xs text-slate-400">All land belongs to citizens of Uganda under four tenure systems.</p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-[#c89d42] flex items-center gap-1 font-semibold">
                <span>Links to Land Act Cap 227</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-[#c89d42]">2. Statutory Provision</span>
              <h4 className="font-bold text-sm text-slate-100">Section 39 Land Act Cap 227</h4>
              <p className="text-xs text-slate-400">Requires mandatory written spousal consent for sale of marital land.</p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-[#c89d42] flex items-center gap-1 font-semibold">
                <span>Links to S.I. 100/2001 & Cases</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-[#c89d42]">3. Judicial Precedent</span>
              <h4 className="font-bold text-sm text-slate-100">Alice Okiror v Global Capital (2012)</h4>
              <p className="text-xs text-slate-400">Mortgage of family land without spousal consent is void ab initio.</p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <span>✓ Fully Verified Chain</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 7: LEGAL DICTIONARY ----------------- */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredDictTerms.length}</strong> Legal Terms & Definitions</span>
            <span className="text-[#c89d42]">Ugandan & Common Law Terminology</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDictTerms.map((term) => (
              <div key={term.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 hover:border-[#c89d42]/30 transition shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-100">{term.term}</h3>
                  {term.pronunciation && (
                    <span className="text-[10px] font-mono text-slate-400 italic">[{term.pronunciation}]</span>
                  )}
                </div>

                <p className="text-xs text-[#c89d42] font-semibold">{term.definition}</p>
                <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 text-xs text-slate-300 space-y-1 backdrop-blur-sm">
                  <p className="font-bold text-slate-400 text-[11px]">Simple Explanation:</p>
                  <p className="leading-relaxed">{term.simpleExplanation}</p>
                </div>

                <div className="text-xs text-slate-400 italic">
                  Example: "{term.exampleSentence}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 7B: BLACK'S LAW DICTIONARY ----------------- */}
      {activeTab === 'blacks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredBlacksTerms.length}</strong> Black's Law Standard Terms</span>
            <span className="text-[#c89d42]">Black's Law Dictionary (Common Law Edition)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlacksTerms.map((bt) => (
              <div key={bt.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/30 transition shadow-lg flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-[#c89d42]">{bt.term}</h3>
                      {bt.etymology && <span className="text-[10px] text-slate-400 font-mono italic">{bt.etymology}</span>}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-white/[0.05] text-[#c89d42] rounded-full border border-[#c89d42]/30">
                      {bt.edition}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Black's Law Definition:</h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans mt-1">{bt.definition}</p>
                  </div>

                  {bt.subDefinitions && bt.subDefinitions.length > 0 && (
                    <div className="bg-black/30 p-3 rounded-2xl border border-white/10 space-y-1 text-xs backdrop-blur-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Sub-Definitions:</span>
                      <ul className="list-disc pl-4 text-slate-300 space-y-0.5 text-[11px]">
                        {bt.subDefinitions.map((sub, idx) => (
                          <li key={idx}>{sub}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-white/[0.04] p-3 rounded-2xl border border-[#c89d42]/20 text-xs text-slate-300 space-y-1 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-[#c89d42] uppercase">Ugandan Court Application:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{bt.ugandanApplication}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 font-semibold">{bt.category}</span>
                  <button
                    onClick={() => setSelectedBlacksTerm(bt)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30 font-bold hover:bg-[#c89d42] hover:text-neutral-950 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Entry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 7C: RED VOLUME 1 (CIVIL PROCEDURE) ----------------- */}
      {activeTab === 'red_vol1' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredRedVol1.length}</strong> Red Volume 1 Entries</span>
            <span className="text-[#c89d42]">Red Volume 1: Civil Procedure, High Court Rules & Remedies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRedVol1.map((rv) => (
              <div key={rv.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/30 transition shadow-lg flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 font-bold text-xs rounded-full border border-rose-500/20">
                      Red Vol 1
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rv.statutoryRef}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-slate-100">{rv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{rv.summary}</p>

                  {rv.keyRulesOrForms && (
                    <div className="bg-black/30 p-3 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Statutory Forms & Rules:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {rv.keyRulesOrForms.map((rf, i) => (
                          <span key={i} className="px-2 py-0.5 bg-black/40 text-slate-300 text-[10px] font-semibold rounded-md border border-white/10">
                            {rf}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{rv.subject}</span>
                  <button
                    onClick={() => setSelectedRedEntry(rv)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold transition cursor-pointer"
                  >
                    Open Compendium
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 7D: RED VOLUME 2 (CRIMINAL PROCEDURE) ----------------- */}
      {activeTab === 'red_vol2' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredRedVol2.length}</strong> Red Volume 2 Entries</span>
            <span className="text-[#c89d42]">Red Volume 2: Criminal Procedure, Evidence & Directives</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRedVol2.map((rv) => (
              <div key={rv.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/30 transition shadow-lg flex flex-col justify-between backdrop-blur-md">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="px-3 py-1 bg-rose-500/10 text-rose-400 font-bold text-xs rounded-full border border-rose-500/20">
                      Red Vol 2
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rv.statutoryRef}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-slate-100">{rv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{rv.summary}</p>

                  {rv.practiceDirections && (
                    <div className="bg-black/30 p-3 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Judicial Practice Directives:</span>
                      <div className="flex flex-col gap-1 mt-1">
                        {rv.practiceDirections.map((pd, i) => (
                          <span key={i} className="text-[10px] text-[#c89d42] font-semibold">
                            • {pd}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">{rv.subject}</span>
                  <button
                    onClick={() => setSelectedRedEntry(rv)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold transition cursor-pointer"
                  >
                    Open Compendium
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 8: LEGAL MAXIMS ----------------- */}
      {activeTab === 'maxims' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong>{filteredMaxims.length}</strong> Latin Legal Maxims</span>
            <span className="text-[#c89d42]">Applied in Ugandan Courts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMaxims.map((mx) => (
              <div key={mx.id} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 hover:border-[#c89d42]/30 transition shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="font-heading font-extrabold text-lg text-[#c89d42] italic">{mx.latinPhrase}</h3>
                  <span className="text-xs text-slate-400 font-semibold">{mx.englishTranslation}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{mx.explanation}</p>

                <div className="bg-black/30 p-3.5 rounded-2xl border border-white/10 text-xs text-slate-300 space-y-1 backdrop-blur-sm">
                  <p className="font-bold text-[#c89d42] text-[11px]">Practical Ugandan Example:</p>
                  <p>{mx.practicalExample}</p>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="font-bold text-slate-500">Key Principle:</span>
                  <span>{mx.legalPrinciple}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- TAB 9: STUDENT RESOURCE GUIDES ----------------- */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Law Student Resource Centre</span>
            <span className="text-[#c89d42]">Mooting, Citation, & Exam Guides</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {legalResourceGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 cursor-pointer transition space-y-4 shadow-lg group backdrop-blur-md hover:bg-slate-900/50"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-1 rounded-full border border-[#c89d42]/30">
                    {guide.category}
                  </span>
                  <h3 className="font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">{guide.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-3">{guide.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 text-xs text-[#c89d42] font-semibold flex items-center justify-between">
                  <span>Read Full Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MODALS SECTION ---------------- */}

      {/* ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-extrabold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                1995 Constitution of Uganda • {selectedArticle.number}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedArticle.title}</h2>
              <p className="text-xs text-slate-400">Chapter {selectedArticle.chapterNumber}: {selectedArticle.chapterTitle}</p>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-white/10 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap backdrop-blur-sm">
              {selectedArticle.content}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-[#c89d42] uppercase tracking-wider">Leading Precedents Interpreting This Article</h4>
              <div className="space-y-1">
                {selectedArticle.keyCases.map((kc, idx) => (
                  <p key={idx} className="text-xs text-slate-300 bg-black/30 p-2.5 rounded-xl border border-white/10 font-medium">
                    ⚖️ {kc}
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between">
              <button
                onClick={() => handleCopyText(`${selectedArticle.number} - ${selectedArticle.title}\n\n${selectedArticle.content}`)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#c89d42]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Article Text'}</span>
              </button>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CASE BRIEF MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#c89d42] font-semibold bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedCase.citation}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedCase.caseName}</h2>
              <p className="text-xs text-slate-400">{selectedCase.court} • Coram: {selectedCase.judges.join(', ')} ({selectedCase.year})</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42]">Statement of Facts:</h4>
                <p className="text-slate-300 leading-relaxed">{selectedCase.facts}</p>
              </div>

              <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42]">Legal Issues:</h4>
                <ul className="list-disc pl-5 text-slate-300 space-y-1">
                  {selectedCase.issues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-2xl border border-[#c89d42]/30 space-y-1 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42]">Ratio Decidendi (Binding Principle):</h4>
                <p className="text-slate-200 italic leading-relaxed">{selectedCase.ratioDecidendi}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between">
              <button
                onClick={() => handleCopyText(`${selectedCase.caseName} [${selectedCase.citation}]\nRatio: ${selectedCase.ratioDecidendi}`)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 font-bold text-xs hover:bg-white/10 transition flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#c89d42]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Case Brief'}</span>
              </button>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATUTE SECTIONS MODAL */}
      {selectedStatute && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedStatute(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedStatute.chapterNumber}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedStatute.shortTitle}</h2>
              <p className="text-xs text-slate-400">{selectedStatute.longTitle}</p>
            </div>

            <div className="space-y-3">
              {selectedStatute.sections.map((sec, i) => (
                <div key={i} className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                  <h4 className="font-bold text-xs text-[#c89d42]">{sec.sectionNumber} - {sec.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{sec.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedStatute(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GUIDE READ MODAL */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedGuide(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedGuide.category}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedGuide.title}</h2>
              <p className="text-xs text-slate-400">{selectedGuide.description}</p>
            </div>

            <div className="space-y-4 text-xs">
              {selectedGuide.sections.map((sec, idx) => (
                <div key={idx} className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <h4 className="font-bold text-[#c89d42] text-sm">{sec.heading}</h4>
                  <p className="text-slate-300 leading-relaxed font-sans">{sec.body}</p>

                  {sec.keyTips && (
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">Key Tips:</p>
                      <ul className="list-disc pl-5 text-slate-400 space-y-0.5">
                        {sec.keyTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BLACK'S LAW TERM MODAL */}
      {selectedBlacksTerm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedBlacksTerm(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedBlacksTerm.edition}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedBlacksTerm.term}</h2>
              {selectedBlacksTerm.etymology && (
                <p className="text-xs font-mono text-slate-400 italic">{selectedBlacksTerm.etymology}</p>
              )}
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42] uppercase tracking-wider text-[11px]">Black's Law Standard Definition:</h4>
                <p className="text-slate-200 leading-relaxed font-sans">{selectedBlacksTerm.definition}</p>
              </div>

              {selectedBlacksTerm.subDefinitions && selectedBlacksTerm.subDefinitions.length > 0 && (
                <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">Sub-Definitions & Distinctions:</h4>
                  <ul className="list-disc pl-5 text-slate-300 space-y-1">
                    {selectedBlacksTerm.subDefinitions.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white/[0.04] p-4 rounded-2xl border border-[#c89d42]/20 space-y-2 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42] uppercase tracking-wider text-[11px]">Ugandan Law & High Court Application:</h4>
                <p className="text-slate-200 leading-relaxed font-sans">{selectedBlacksTerm.ugandanApplication}</p>
              </div>

              {selectedBlacksTerm.crossReferences && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Cross References:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBlacksTerm.crossReferences.map((ref, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/[0.05] border border-white/10 text-[#c89d42] text-[10px] font-semibold rounded-lg">
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedBlacksTerm(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close Term
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RED VOLUME ENTRY MODAL */}
      {selectedRedEntry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedRedEntry(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                  {selectedRedEntry.volumeTitle}
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedRedEntry.statutoryRef}</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{selectedRedEntry.title}</h2>
              <p className="text-xs text-slate-400">{selectedRedEntry.partTitle}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                <h4 className="font-bold text-[#c89d42] text-sm">Compendium Text & Procedural Guide</h4>
                <p className="text-slate-200 leading-relaxed font-sans whitespace-pre-line">{selectedRedEntry.fullText || selectedRedEntry.summary}</p>
              </div>

              {selectedRedEntry.keyRulesOrForms && (
                <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <h4 className="font-bold text-slate-400 text-xs">Statutory Forms & Checklists</h4>
                  <ul className="list-disc pl-5 text-slate-300 space-y-1">
                    {selectedRedEntry.keyRulesOrForms.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRedEntry.practiceDirections && (
                <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <h4 className="font-bold text-[#c89d42] text-xs">High Court Practice Directions & Circulars</h4>
                  <ul className="list-disc pl-5 text-slate-300 space-y-1">
                    {selectedRedEntry.practiceDirections.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRedEntry.relatedCases && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Related Precedents:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRedEntry.relatedCases.map((cs, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/[0.05] border border-white/10 text-emerald-400 text-[10px] font-semibold rounded-lg">
                        {cs}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedRedEntry(null)}
                className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close Compendium
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ITEM 25: LEGAL DISCLAIMER NOTICE */}
      <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/10 text-[11px] text-slate-400 flex items-start gap-3 mt-8 backdrop-blur-md">
        <Info className="w-4 h-4 text-[#c89d42] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Legal Research & Educational Disclaimer:</strong> LawHub is an educational and legal research platform. Information provided by LawHub and its AI Tutor is intended for educational and research purposes and should not be treated as a substitute for professional legal advice. Users should verify important legal information against authoritative and current legal sources.
        </p>
      </div>

    </div>
  );
};
