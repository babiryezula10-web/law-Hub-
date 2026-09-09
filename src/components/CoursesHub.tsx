import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  FileText,
  RotateCw,
  Sparkles,
  X,
  Award
} from 'lucide-react';
import { lawCoursesCatalog } from '../data/mockData';
import { Course, CourseModule } from '../types';

interface CoursesHubProps {
  onOpenTutorWithPrompt: (prompt: string) => void;
}

export const CoursesHub: React.FC<CoursesHubProps> = ({ onOpenTutorWithPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Flashcard flip states
  const [currentFlashcardIdx, setCurrentFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['All', 'Public Law', 'Private Law', 'Commercial Law', 'Procedural & Clinical Law', 'Specialized Law'];

  const filteredCourses = lawCoursesCatalog.filter((crs) => {
    const matchesCategory = selectedCategory === 'All' || crs.category === selectedCategory;
    const matchesSearch =
      crs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crs.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="classic_watermark" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header Banner */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                Complete 32 Ugandan Law Courses Curriculum
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Structured study modules, revision notes, landmark case references, flashcard decks & model exam answers for LLB and LDC Bar Course.
            </p>
          </div>
          <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1.5 rounded-full border border-[#c89d42]/30 self-start sm:self-auto font-mono backdrop-blur-sm">
            32 Courses Loaded
          </span>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#c89d42] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, code (e.g. LAW 1101, Civil Procedure)..."
              className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl transition whitespace-nowrap font-medium cursor-pointer backdrop-blur-sm ${
                  selectedCategory === cat
                    ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md'
                    : 'bg-black/30 text-slate-300 border border-white/10 hover:text-slate-100 hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((crs) => (
          <div
            key={crs.id}
            onClick={() => setActiveCourse(crs)}
            className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 cursor-pointer transition space-y-4 group hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#c89d42] bg-white/[0.05] px-2.5 py-1 rounded-full border border-[#c89d42]/30">
                  {crs.code}
                </span>
                <span className="text-[10px] text-slate-300 bg-black/30 px-2 py-0.5 rounded border border-white/10">
                  {crs.category}
                </span>
              </div>

              <h3 className="font-bold text-lg text-slate-100 group-hover:text-[#c89d42] transition">{crs.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{crs.description}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>{crs.level}</span>
              <span className="text-[#c89d42] font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                Explore Syllabus <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- COURSE DETAILS MODAL ---------------- */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl">
            <button
              onClick={() => setActiveCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                  {activeCourse.code}
                </span>
                <span className="text-xs text-slate-400">• {activeCourse.category} • {activeCourse.level}</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-slate-100">{activeCourse.title}</h2>
              <p className="text-xs text-slate-300">{activeCourse.description}</p>
            </div>

            {/* Course Modules Section */}
            {activeCourse.modules.length > 0 ? (
              <div className="space-y-6">
                {activeCourse.modules.map((mod) => (
                  <div key={mod.id} className="bg-black/30 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[#c89d42]">{mod.title}</h3>
                      <button
                        onClick={() => {
                          setActiveCourse(null);
                          onOpenTutorWithPrompt(`Explain ${mod.title} for course ${activeCourse.title} with Ugandan case law and model exam structure.`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] hover:bg-[#c89d42] hover:text-neutral-950 transition font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Ask AI Lecturer
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{mod.notes}</p>

                    {/* Flashcards Deck Widget */}
                    {mod.flashcards.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Interactive Flashcards Deck</p>
                        <div
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="bg-black/30 border border-[#c89d42]/30 rounded-2xl p-6 text-center cursor-pointer transition hover:border-[#c89d42] min-h-[120px] flex flex-col justify-center items-center relative space-y-2 shadow-inner"
                        >
                          <span className="absolute top-3 right-3 text-[10px] text-slate-400 flex items-center gap-1">
                            <RotateCw className="w-3 h-3" /> Click to flip
                          </span>
                          <p className="text-xs font-semibold text-[#c89d42] uppercase tracking-widest">
                            {isFlipped ? 'ANSWER / PRINCIPLE' : 'QUESTION / PROMPT'}
                          </p>
                          <p className="text-sm font-bold text-slate-100 max-w-md">
                            {isFlipped ? mod.flashcards[currentFlashcardIdx].back : mod.flashcards[currentFlashcardIdx].front}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Problem Question & Model Answer */}
                    {mod.practiceQuestion && (
                      <div className="bg-black/20 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                        <p className="font-bold text-slate-100">Sample Exam Question:</p>
                        <p className="text-slate-300 italic">{mod.practiceQuestion}</p>
                        <div className="pt-2 border-t border-white/10">
                          <p className="font-bold text-[#c89d42]">Model Answer Guidance:</p>
                          <p className="text-slate-300">{mod.modelAnswer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/30 p-8 rounded-2xl border border-white/10 text-center space-y-3 backdrop-blur-sm">
                <BookOpen className="w-8 h-8 text-[#c89d42] mx-auto" />
                <h3 className="font-bold text-slate-200">Full Course Module Available in AI Tutor</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  You can ask the LawHub AI Tutor to generate custom revision notes, case summaries, and problem questions for {activeCourse.title} right now!
                </p>
                <button
                  onClick={() => {
                    setActiveCourse(null);
                    onOpenTutorWithPrompt(`Provide a comprehensive overview, key statutes, and landmark cases for ${activeCourse.title} in Uganda.`);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Generate Course Notes with AI
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveCourse(null)}
                className="px-6 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Close Course Overview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
