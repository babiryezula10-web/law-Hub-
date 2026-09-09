import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  FileText,
  Search,
  Filter,
  Download,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { pastPapersArchive } from '../data/mockData';
import { PastPaper } from '../types';

interface PastPapersLibraryProps {
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const PastPapersLibrary: React.FC<PastPapersLibraryProps> = ({ onOpenTutorWithPrompt }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);

  const institutions = [
    'All',
    'Gulu University Faculty of Law',
    'Ugandan Law Schools & Faculties',
    'Bar Course Examinations'
  ];

  const years = ['All', '2024', '2023', '2022'];

  const filteredPapers = pastPapersArchive.filter((pp) => {
    const matchesInst = selectedInst === 'All' || pp.institution === selectedInst;
    const matchesYear = selectedYear === 'All' || pp.year.toString() === selectedYear;
    const matchesSearch =
      pp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pp.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pp.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pp.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesInst && matchesYear && matchesSearch;
  });

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="minimal_court_scales" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <FileText className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                Ugandan Past Papers & Mock Exams Archive
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Searchable archive of Gulu University and Ugandan law school examinations with step-by-step model answer guides.
            </p>
          </div>
          <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1.5 rounded-full border border-[#c89d42]/30 self-start sm:self-auto font-mono backdrop-blur-sm">
            100% Free Downloads
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#c89d42] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by exam title, course code, or lecturer (e.g. Dr. Busingye Kabumba, Civil Litigation)..."
              className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedInst}
              onChange={(e) => setSelectedInst(e.target.value)}
              className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none max-w-[220px]"
            >
              {institutions.map((inst) => (
                <option key={inst} value={inst}>{inst === 'All' ? 'All Institutions' : inst}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>{yr === 'All' ? 'All Years' : `Year ${yr}`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Past Papers List */}
      <div className="space-y-4">
        {filteredPapers.map((pp) => (
          <div
            key={pp.id}
            className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition shadow-lg backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                    {pp.courseCode}
                  </span>
                  <span className="text-[10px] text-slate-300 font-semibold">{pp.institution}</span>
                  <span className="text-[10px] text-slate-400">• Year {pp.year} ({pp.semester})</span>
                </div>
                <h3 className="font-bold text-base text-slate-100">{pp.title}</h3>
                <p className="text-xs text-slate-400">Lecturer / Examiner: {pp.lecturer}</p>
              </div>

              <button
                onClick={() => setSelectedPaper(pp)}
                className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>Preview Exam Paper</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Questions Teaser */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-300">Exam Question Snippet:</p>
              <div className="p-3.5 bg-black/30 rounded-2xl border border-white/10 text-slate-300 font-sans italic line-clamp-2 backdrop-blur-sm">
                {pp.questions[0]}
              </div>
            </div>

            {/* Model Answers Indicator */}
            {pp.hasModelAnswers && (
              <div className="flex items-center justify-between text-xs text-emerald-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Includes Step-by-Step Model Answer Guide
                </span>
                <span className="text-[11px] text-slate-400">PDF Download Ready</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---------------- PAPER PREVIEW MODAL ---------------- */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setSelectedPaper(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedPaper.courseCode} • {selectedPaper.institution}
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">{selectedPaper.title}</h2>
              <p className="text-xs text-slate-400">Lecturer: {selectedPaper.lecturer} | {selectedPaper.year} {selectedPaper.semester}</p>
            </div>

            {/* Questions List */}
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-100">Examination Questions:</h3>
              {selectedPaper.questions.map((q, idx) => (
                <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <p className="text-slate-200 leading-relaxed font-sans">{q}</p>
                  <button
                    onClick={() => {
                      setSelectedPaper(null);
                      onOpenTutorWithPrompt(`Provide a complete IRAC model answer for this exam question from ${selectedPaper.institution}:\n\n"${q}"`);
                    }}
                    className="mt-2 text-[11px] font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Generate Model Answer with AI
                  </button>
                </div>
              ))}
            </div>

            {selectedPaper.modelAnswerSummary && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-1 text-xs">
                <p className="font-bold text-emerald-400">Model Answer Guidance:</p>
                <p className="text-slate-200">{selectedPaper.modelAnswerSummary}</p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${selectedPaper.title}\n${selectedPaper.institution}\n\nQuestions:\n${selectedPaper.questions.join('\n\n')}`)}`}
                download={`${selectedPaper.courseCode}_Past_Paper.txt`}
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 hover:bg-white/10 font-bold text-xs transition flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#c89d42]" /> Download Paper PDF / Text
              </a>
              <button
                onClick={() => setSelectedPaper(null)}
                className="px-5 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
