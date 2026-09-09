import React, { useState } from 'react';
import { AppLogo } from './AppLogo';
import { WatermarkBackground } from './WatermarkBackground';
import heroVisual from '../assets/images/law_academic_hero_1786740467472.jpg';
import {
  Sparkles,
  Scale,
  BookOpen,
  GraduationCap,
  ArrowRight,
  FileText,
  PenTool,
  CheckCircle2,
  ChevronDown,
  Gavel,
  Calendar,
  FileCheck,
  Landmark,
  Layers,
  Search,
  BookMarked
} from 'lucide-react';

interface LandingPageProps {
  onStartLearning: () => void;
  onExploreResearch: () => void;
  onTryDrafting: () => void;
  onSelectTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearning,
  onExploreResearch,
  onTryDrafting,
  onSelectTab
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Course Units', value: '32+', sub: 'Core LLB & Bar Curriculum' },
    { label: 'Landmark Precedents', value: '500+', sub: 'Appellate & Supreme Court Ratios' },
    { label: 'Codified Statutes', value: '150+', sub: 'Acts of Parliament & Instruments' },
    { label: '1995 Constitution', value: '288', sub: 'Indexed Articles & Schedules' },
  ];

  const visualModules = [
    {
      title: "1995 Constitution",
      badge: "CONSTITUTIONAL",
      desc: "Full text across all 19 chapters with verbatim statutory search and cross-references.",
      icon: Landmark,
      tab: "constitution"
    },
    {
      title: "AI Legal Tutor",
      badge: "IRAC METHOD",
      desc: "Interactive reasoning assistant for problem questions and case ratio analysis.",
      icon: Sparkles,
      tab: "tutor"
    },
    {
      title: "Legal Library",
      badge: "PRIMARY SOURCES",
      desc: "Acts of Parliament, Landmark Precedents, and Black's Law definitions in one place.",
      icon: Scale,
      tab: "research"
    },
    {
      title: "Coursework & Exams",
      badge: "ASSESSMENTS",
      desc: "32 structured course units, practice quizzes, and past bar examination papers.",
      icon: GraduationCap,
      tab: "courses"
    },
    {
      title: "Submissions & Grades",
      badge: "FACULTY PORTAL",
      desc: "Submit legal assignments directly to lecturers for formal review and commentary.",
      icon: FileCheck,
      tab: "dashboard"
    },
    {
      title: "Legal Drafting Suite",
      badge: "PRACTICAL SKILLS",
      desc: "Templates for plaints, affidavits, formal notices, and contractual covenants.",
      icon: PenTool,
      tab: "drafting"
    }
  ];

  const faqs = [
    {
      q: "What is LawHub?",
      a: "LawHub is a professional legal learning and research platform built for law students, faculty lecturers, and legal scholars. It integrates codified Ugandan legal repositories with AI-assisted research and academic coursework management."
    },
    {
      q: "How does the platform support law students?",
      a: "Students have instant access to the full 1995 Constitution of Uganda, searchable Acts of Parliament, landmark case law summaries, 32 structured course units, practice quizzes, and an AI tutor that explains complex concepts using the IRAC method."
    },
    {
      q: "Can lecturers review and grade student assignments?",
      a: "Yes. LawHub features a dedicated Faculty Portal where lecturers can review incoming student assignments, inspect attached documents, issue official scores, and provide detailed pedagogical feedback."
    },
    {
      q: "Is the statutory and constitutional material authentic?",
      a: "Yes. The platform indexes the 1995 Constitution of the Republic of Uganda (as amended), key Acts of Parliament (such as the Contracts Act 2010, Land Act Cap 227, and Penal Code Act), and essential judicial precedents from the High Court, Court of Appeal, and Supreme Court."
    }
  ];

  return (
    <div className="relative space-y-12 pb-16 text-slate-100 max-w-6xl mx-auto">
      
      {/* 1. HERO SECTION WITH IMAGE BANNER & WATERMARK */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Scales of Justice Watermark Backdrop - Best Legal Watermark */}
        <WatermarkBackground
          type="classic_watermark"
          opacity={0.18}
          blendMode="normal"
          withVignette={false}
          withGradientOverlay={false}
        />

        <div className="relative z-10 max-w-3xl space-y-5 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-[#c89d42]/40 text-[#c89d42] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Scale className="w-3.5 h-3.5" />
            <span>Academic Legal Platform</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-100 tracking-tight leading-tight">
              Learn Law. Research Smarter. Build Legal Confidence.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              An authoritative academic environment combining verified constitutional sources, landmark judicial precedents, structured coursework, and AI research tools for law students and faculty.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="px-6 py-3 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-black text-xs tracking-wider uppercase transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 stroke-[2.5]" />
              <span>Student Dashboard</span>
            </button>

            <button
              onClick={() => onSelectTab('constitution')}
              className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-100 hover:border-[#c89d42]/40 font-heading font-bold text-xs transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Scale className="w-4 h-4 text-[#c89d42]" />
              <span>1995 Constitution</span>
            </button>

            <button
              onClick={onStartLearning}
              className="px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-100 hover:border-[#c89d42]/40 font-heading font-bold text-xs transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#c89d42]" />
              <span>AI Legal Tutor</span>
            </button>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-8 mt-8 border-t border-white/10 relative z-10">
          {stats.map((st, idx) => (
            <div key={idx} className="bg-black/30 border border-white/10 rounded-2xl p-3.5 space-y-1 backdrop-blur-md">
              <p className="font-heading font-black text-2xl text-[#c89d42]">{st.value}</p>
              <p className="font-bold text-xs text-slate-200">{st.label}</p>
              <p className="text-[10px] text-slate-400">{st.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CORE PLATFORM MODULES (VISUAL CARDS) */}
      <section className="space-y-4 relative">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c89d42]">Academic Architecture</span>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            Structured Legal Learning Modules
          </h2>
          <p className="text-xs text-slate-400">
            Explore integrated legal research, statutory repositories, and assessment tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visualModules.map((m, idx) => {
            const IconComp = m.icon;
            return (
              <button
                key={idx}
                onClick={() => onSelectTab(m.tab)}
                className="group text-left bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/50 rounded-2xl p-5 space-y-3 shadow-md transition flex flex-col justify-between cursor-pointer backdrop-blur-md hover:bg-slate-900/50"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center group-hover:border-[#c89d42]/40 transition">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest text-slate-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      {m.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#c89d42] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. STUDENT & LECTURER WORKFLOW */}
      <section className="relative overflow-hidden bg-slate-950/45 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <WatermarkBackground type="golden_tome" opacity={0.14} />

        <div className="relative z-10 text-center space-y-1 max-w-xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c89d42]">Faculty & Student Portals</span>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            Dedicated Roles & Workflow
          </h2>
          <p className="text-xs text-slate-400">
            Streamlined coursework submission, assessment, and constructive feedback loops.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student Experience */}
          <div className="p-5 bg-black/30 rounded-2xl border border-white/10 space-y-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-[#c89d42]">
              <GraduationCap className="w-5 h-5 shrink-0" />
              <h3 className="font-heading font-bold text-sm text-slate-100">For Law Students</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Instant Precedent & Statute Search:</strong> Query constitutional provisions and judicial authorities in seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Coursework Submissions:</strong> Upload problem questions, research essays, and case briefs with file attachments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Personal Progress Tracking:</strong> Monitor quiz scores, study streak days, and saved research notes in one dashboard.</span>
              </li>
            </ul>
          </div>

          {/* Lecturer Experience */}
          <div className="p-5 bg-black/30 rounded-2xl border border-white/10 space-y-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-[#c89d42]">
              <BookOpen className="w-5 h-5 shrink-0" />
              <h3 className="font-heading font-bold text-sm text-slate-100">For Faculty Lecturers</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Coursework Review Queue:</strong> Inspect student submissions, review drafted documents, and record official scores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Constructive Feedback:</strong> Provide statutory citations and commentary directly to student accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c89d42] shrink-0 mt-0.5" />
                <span><strong>Academic Materials Upload:</strong> Publish syllabus modules, tutorial problem questions, and past examinations.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Common questions regarding the platform and legal materials.</p>
        </div>

        <div className="space-y-2.5 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-950/40 border border-white/10 rounded-2xl overflow-hidden transition backdrop-blur-md">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-100 flex items-center justify-between gap-4 hover:text-[#c89d42] transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#c89d42]' : 'text-slate-500'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROFESSIONAL FOOTER (STRICTLY INSTITUTIONAL ONLY) */}
      <footer className="border-t border-white/10 pt-8 pb-4 text-xs text-slate-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <AppLogo
              size="sm"
              showText={true}
              subtitle="LEGAL EDUCATION PLATFORM"
              onClick={() => onSelectTab('landing')}
            />
            <p className="text-[10px] text-slate-400">
              Ugandan Constitutional, Statutory & Judicial Precedent Database
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button onClick={() => onSelectTab('dashboard')} className="hover:text-[#c89d42] transition cursor-pointer">
              Student Dashboard
            </button>
            <button onClick={() => onSelectTab('constitution')} className="hover:text-[#c89d42] transition cursor-pointer">
              1995 Constitution
            </button>
            <button onClick={() => onSelectTab('research')} className="hover:text-[#c89d42] transition cursor-pointer">
              Legal Library
            </button>
            <button onClick={() => onSelectTab('courses')} className="hover:text-[#c89d42] transition cursor-pointer">
              Courses
            </button>
            <button onClick={() => onSelectTab('tutor')} className="hover:text-[#c89d42] transition cursor-pointer">
              AI Tutor
            </button>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-center text-[10px] text-slate-500">
          &copy; {new Date().getFullYear()} LawHub. Dedicated to legal education and academic research excellence.
        </div>
      </footer>

    </div>
  );
};
