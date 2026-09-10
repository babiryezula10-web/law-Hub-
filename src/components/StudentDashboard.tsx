import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  Flame,
  Bookmark,
  Award,
  TrendingUp,
  FileText,
  Search,
  CheckCircle2,
  ChevronRight,
  User,
  Settings,
  BookOpen,
  Scale,
  MessageSquare,
  History,
  Send,
  FilePlus,
  AlertCircle,
  Trash2,
  Eye,
  X,
  RefreshCw,
  Plus,
  Landmark,
  PenTool,
  CheckSquare
} from 'lucide-react';
import { UserProfile, Course, SavedNote, StudentSubmission } from '../types';
import { WatermarkBackground } from './WatermarkBackground';
import goldenTomeHeroImg from '../assets/images/golden_tome_scales_1788970425018.jpg';

interface StudentDashboardProps {
  user: UserProfile;
  courses: Course[];
  savedNotes: SavedNote[];
  onSelectTab: (tab: string) => void;
  onOpenTutorWithPrompt: (prompt: string) => void;
  onOpenAuthModal: (mode: 'edit_profile' | 'login') => void;
  onLogout: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  courses,
  savedNotes,
  onSelectTab,
  onOpenTutorWithPrompt,
  onOpenAuthModal,
  onLogout,
  onUpdateUser
}) => {
  const [activeDashTab, setActiveDashTab] = useState<'overview' | 'assignments' | 'learning' | 'research' | 'profile'>('overview');
  const [quickQuery, setQuickQuery] = useState('');
  
  // Custom user profile form state
  const [prefSubject, setPrefSubject] = useState(user.institution || 'Faculty of Law');
  const [prefFocus, setPrefFocus] = useState('Constitutional Law & Civil Procedure');
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Student Submissions State
  const [mySubmissions, setMySubmissions] = useState<StudentSubmission[]>([
    {
      id: 'stud_sub_01',
      assignmentTitle: 'Constitutional Law I: Separation of Powers and Supremacy of Constitution Analysis',
      courseOrUnit: 'Constitutional Law I',
      submissionNotes: 'Legal essay evaluating Articles 1, 2, 79, 98, and 126 of the 1995 Constitution.',
      studentName: user.name || 'Student Scholar',
      studentEmail: user.email || 'student@lawhub.ug',
      institution: user.institution || 'Faculty of Law',
      lecturerName: 'Dr. Apollo Mukasa',
      lecturerEmail: 'apollo.mukasa@lawhub.ug',
      fileName: 'Constitutional_Law_Essay.pdf',
      fileSize: '348 KB',
      fileType: 'application/pdf',
      fileContent: '',
      status: 'GRADED',
      grade: '88% (A)',
      lecturerFeedback: 'Excellent analysis of Article 137(1) vs 137(3) jurisdiction. Well argued.',
      submittedAt: '2026-08-11T20:33:05.556Z',
      reviewedAt: '2026-08-13T20:33:05.556Z',
      reviewedBy: 'Dr. Apollo Mukasa'
    }
  ]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [selectedSubForPreview, setSelectedSubForPreview] = useState<StudentSubmission | null>(null);

  // Submit Assignment Form State
  const [subTitle, setSubTitle] = useState('');
  const [subCourse, setSubCourse] = useState('Constitutional Law I');
  const [subLecturerEmail, setSubLecturerEmail] = useState('apollo.mukasa@lawhub.ug');
  const [subLecturerName, setSubLecturerName] = useState('Dr. Apollo Mukasa');
  const [subNotes, setSubNotes] = useState('');
  const [subFileName, setSubFileName] = useState('');
  const [subFileSize, setSubFileSize] = useState('');
  const [subFileType, setSubFileType] = useState('');
  const [subFileContent, setSubFileContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notifications
  const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState<string | null>(null);
  const [submissionErrorMsg, setSubmissionErrorMsg] = useState<string | null>(null);

  const fetchMySubmissions = async () => {
    setIsLoadingSubmissions(true);
    try {
      const email = user.email || 'student@lawhub.ug';
      const res = await fetch(`/api/student-submissions?studentEmail=${encodeURIComponent(email)}&role=Student`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.studentSubmissions) && data.studentSubmissions.length > 0) {
          setMySubmissions(data.studentSubmissions);
        }
      }
    } catch {
      // Retain mock / existing submissions quietly if offline
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchMySubmissions();
  }, [user.email]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubFileName(file.name);
      setSubFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      setSubFileType(file.type || file.name.split('.').pop()?.toUpperCase() || 'DOCUMENT');

      const reader = new FileReader();
      reader.onload = (event) => {
        setSubFileContent((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    }
  };

  const handleUploadAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) {
      setSubmissionErrorMsg('Please provide an assignment title.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/student-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentTitle: subTitle,
          courseOrUnit: subCourse,
          submissionNotes: subNotes,
          studentName: user.name,
          studentEmail: user.email,
          institution: user.institution || 'Faculty of Law',
          lecturerEmail: subLecturerEmail,
          lecturerName: subLecturerName,
          fileName: subFileName || 'Assignment_Submission.pdf',
          fileSize: subFileSize || '250 KB',
          fileType: subFileType || 'application/pdf',
          fileContent: subFileContent
        })
      });

      if (res.ok) {
        setSubmissionSuccessMsg('Assignment submitted to faculty successfully! Awaiting lecturer review.');
        setTimeout(() => setSubmissionSuccessMsg(null), 5000);
        setIsSubmitModalOpen(false);
        setSubTitle('');
        setSubNotes('');
        setSubFileName('');
        setSubFileSize('');
        setSubFileContent('');
        fetchMySubmissions();
      } else {
        const err = await res.json();
        setSubmissionErrorMsg(err.error || 'Failed to submit assignment.');
      }
    } catch (err) {
      setSubmissionErrorMsg('Network error while uploading assignment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdrawAssignment = async (id: string) => {
    if (!confirm('Are you sure you want to withdraw this assignment submission?')) return;
    try {
      const res = await fetch(`/api/student-submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissionSuccessMsg('Assignment submission withdrawn.');
        setTimeout(() => setSubmissionSuccessMsg(null), 4000);
        fetchMySubmissions();
      }
    } catch (e) {
      setSubmissionErrorMsg('Failed to withdraw submission.');
    }
  };

  const handleAskQuickQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    onOpenTutorWithPrompt(quickQuery);
    setQuickQuery('');
  };

  const handleSaveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      institution: prefSubject
    });
    setSavedSuccessMsg('Account preferences and study settings updated successfully!');
    setTimeout(() => setSavedSuccessMsg(null), 3000);
  };

  // Personalized data for student's private research and learning space
  const completedQuizHistory = [
    { title: 'Constitutional Fundamental Rights (Art 20-45)', score: '95%', date: 'Yesterday', total: '20/20' },
    { title: 'Civil Procedure Pleadings & Plaint Drafting', score: '88%', date: '3 days ago', total: '18/20' },
    { title: 'Land Act Section 39 Marital Consent', score: '90%', date: '5 days ago', total: '18/20' },
    { title: 'Contracts Act Consideration & Offer', score: '82%', date: '1 week ago', total: '16/20' }
  ];

  const recentlyViewedMaterials = [
    { type: 'Statute', title: 'The Contracts Act 2010 (Act No. 7 of 2010)', section: 'Section 10 - Valid Contracts', date: '2 hours ago' },
    { type: 'Case', title: 'Grace Ibingira & Ors v Uganda [1966] EA 306', section: 'Supreme Court - Habeas Corpus Ratio', date: '5 hours ago' },
    { type: 'Article', title: '1995 Constitution of Uganda - Article 137', section: 'Constitutional Court Jurisdiction', date: 'Yesterday' },
    { type: 'Regulation', title: 'Civil Procedure Rules (S.I. 71-1)', section: 'Order 6 - Pleadings Generally', date: '2 days ago' }
  ];

  const savedCases = [
    { name: 'Grace Ibingira & Ors v Uganda [1966] EA 306', topic: 'Constitutional Law', ratio: 'Prerogative writs and illegal detention under executive orders.' },
    { name: 'Major General David Tinyefuza v Attorney General (1997)', topic: 'Human Rights', ratio: 'Resignation from armed forces and fundamental freedoms under Article 22.' },
    { name: 'Charles Onyango Obbo & Anor v Attorney General (2004)', topic: 'Free Expression', ratio: 'Unconstitutionality of false news provisions under Penal Code.' }
  ];

  const quickNavCards = [
    { label: 'MY COURSES', icon: BookOpen, desc: '32 units & notes', tab: 'courses' },
    { label: 'LEGAL LIBRARY', icon: Scale, desc: 'Statutes, precedents & glossary', tab: 'research' },
    { label: '1995 CONSTITUTION', icon: Landmark, desc: 'All 19 chapters & articles', tab: 'constitution' },
    { label: 'AI LEGAL TUTOR', icon: Sparkles, desc: 'IRAC reasoning & problem tutor', tab: 'tutor' },
    { label: 'ASSIGNMENTS', icon: FileText, desc: 'Submit work & view grades', action: () => setActiveDashTab('assignments') },
    { label: 'QUIZZES & PRACTICE', icon: Award, desc: 'Timed multiple-choice tests', tab: 'quizzes' },
    { label: 'DRAFTING SUITE', icon: PenTool, desc: 'Contracts, affidavits & documents', tab: 'drafting' },
    { label: 'PAST EXAM PAPERS', icon: FileText, desc: 'Model answer structures', tab: 'past_papers' },
  ];

  // Enrolled law units shown in the reference design
  const enrolledLawUnits = [
    {
      code: 'LAW 1101',
      title: 'CONSTITUTIONAL LAW',
      year: 'Year 1 LLB',
      description: 'Foundational study of state power, rule of law, constitutional supremacy, and democratic institutions in Uganda.',
      lessonsDone: 7,
      lessonsTotal: 12,
      percent: 58,
      tab: 'courses'
    },
    {
      code: 'LAW 1102',
      title: 'LAW OF CONTRACT',
      year: 'Year 1 LLB',
      description: 'Principles of enforceable agreements, contractual terms, performance, discharge, and statutory remedies in Uganda.',
      lessonsDone: 5,
      lessonsTotal: 10,
      percent: 50,
      tab: 'courses'
    },
    {
      code: 'LAW 1103',
      title: 'LAW OF TORTS',
      year: 'Year 1 LLB',
      description: 'Civil liability for non-contractual harms, negligence standards, strict liability, defamation, and damages.',
      lessonsDone: 4,
      lessonsTotal: 11,
      percent: 36,
      tab: 'courses'
    }
  ];

  const suggestedPrompts = [
    'Section 39 Land Act',
    'Summarize Ratio in Ibingira Case....',
    'What is Malice Aforethought?',
    'Draft IRAC Answer',
    'Constitutional Law'
  ];

  return (
    <div className="relative space-y-6 pb-12 text-slate-100">
      {/* Subtle Background Watermark */}
      <WatermarkBackground type="golden_tome" opacity={0.12} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* HERO BANNER - MATCHING EXACT REFERENCE DESIGN */}
      <div className="relative z-10 overflow-hidden rounded-2xl bg-[#0f0f12] border border-neutral-800/80 p-6 sm:p-7 shadow-2xl">
        {/* Warm Golden Atmosphere Imagery on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-3/5 lg:w-1/2 pointer-events-none overflow-hidden select-none">
          <img
            src={goldenTomeHeroImg}
            alt="LawHub Editorial Heritage"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-screen transform scale-105"
          />
          {/* Seamless dark vignette gradient masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f12] via-[#0f0f12]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-[#0f0f12]/40" />
        </div>

        {/* Hero Card Contents */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* Top pill badge and editorial source */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-[#c89d42]/40 bg-[#c89d42]/10 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#c89d42]">
                • STUDENT SCHOLAR SPACE •
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                • LawHub Editorial Board / Judiciary Repository
              </span>
            </div>

            {/* Authoritative Welcome Heading */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase pt-1">
              WELCOME, <span className="text-[#c89d42]">{user.name || 'CHIEF LEGAL ADMINISTRATOR'}</span>
            </h1>

            {/* Account Details */}
            <p className="text-xs sm:text-sm text-neutral-400">
              Private Academic LMS &bull; Account: <span className="text-neutral-200 font-medium">{user.email || 'admin@lawhub.ug'}</span>
            </p>
          </div>

          {/* Right Floating Stats Widget */}
          <div className="flex items-center gap-5 self-start lg:self-center bg-black/60 border border-neutral-800/90 rounded-xl px-5 py-3 backdrop-blur-md shadow-lg shrink-0">
            {/* Streak */}
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-[#c89d42] font-heading font-extrabold text-lg">
                <Flame className="w-4 h-4 fill-[#c89d42]" />
                <span>{user.studyStreakDays || 14}d</span>
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-neutral-400 block mt-0.5">
                STREAK
              </span>
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-neutral-800" />

            {/* Quizzes */}
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-neutral-100 font-heading font-extrabold text-lg">
                <FileText className="w-4 h-4 text-neutral-300" />
                <span>{user.completedQuizzes || 24}</span>
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase text-neutral-400 block mt-0.5">
                QUIZZES
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SUB-NAVIGATION TABS BAR - MATCHING EXACT REFERENCE DESIGN */}
      <div className="relative z-10 bg-[#0f0f12] border border-neutral-800/80 rounded-xl px-3 sm:px-5 py-2.5 flex items-center gap-4 sm:gap-7 overflow-x-auto shadow-md">
        <button
          onClick={() => setActiveDashTab('overview')}
          className={`flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeDashTab === 'overview'
              ? 'text-[#c89d42] border-[#c89d42]'
              : 'text-neutral-400 hover:text-neutral-200 border-transparent'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Overview & Quick Access</span>
        </button>

        <button
          onClick={() => setActiveDashTab('assignments')}
          className={`flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeDashTab === 'assignments'
              ? 'text-[#c89d42] border-[#c89d42]'
              : 'text-neutral-400 hover:text-neutral-200 border-transparent'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Coursework & Submissions</span>
          {mySubmissions.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-neutral-800 text-[#c89d42] font-bold">
              {mySubmissions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveDashTab('learning')}
          className={`flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeDashTab === 'learning'
              ? 'text-[#c89d42] border-[#c89d42]'
              : 'text-neutral-400 hover:text-neutral-200 border-transparent'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>My Learning Progress</span>
        </button>

        <button
          onClick={() => setActiveDashTab('research')}
          className={`flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeDashTab === 'research'
              ? 'text-[#c89d42] border-[#c89d42]'
              : 'text-neutral-400 hover:text-neutral-200 border-transparent'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Notes & Authorities</span>
        </button>

        <button
          onClick={() => setActiveDashTab('profile')}
          className={`flex items-center gap-2 pb-1 text-xs sm:text-sm font-semibold transition whitespace-nowrap cursor-pointer border-b-2 ${
            activeDashTab === 'profile'
              ? 'text-[#c89d42] border-[#c89d42]'
              : 'text-neutral-400 hover:text-neutral-200 border-transparent'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Profile</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW & QUICK ACCESS */}
      {activeDashTab === 'overview' && (
        <div className="relative z-10 space-y-6">
          
          {/* LAWHUB AI ACADEMIC ASSISTANT CARD - MATCHING EXACT REFERENCE DESIGN */}
          <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            {/* Header with Crest Emblem and Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Gold Octagonal/Rounded Crest Emblem */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c89d42]/20 to-[#8c6b23]/10 border border-[#c89d42]/40 flex items-center justify-center text-[#c89d42] shadow-inner shrink-0">
                  <Sparkles className="w-5 h-5 fill-[#c89d42]/20" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm sm:text-base tracking-wide text-white uppercase">
                    LAWHUB <span className="text-[#c89d42]">AI ACADEMIC ASSISTANT</span>
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Instant answers with Ugandan statutory and case citations
                  </p>
                </div>
              </div>

              <button
                onClick={() => onSelectTab('tutor')}
                className="text-xs sm:text-sm font-semibold text-[#c89d42] hover:text-[#e0b44f] flex items-center gap-1 cursor-pointer transition self-start sm:self-center"
              >
                <span>Open Full Assistant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pill Search / Query Input Bar with Gold Ask AI Button */}
            <form onSubmit={handleAskQuickQuery} className="relative flex items-center bg-black/80 border border-neutral-700/80 rounded-full px-4 py-1.5 focus-within:border-[#c89d42] focus-within:ring-1 focus-within:ring-[#c89d42]/50 transition shadow-inner">
              <Search className="w-4 h-4 text-neutral-400 shrink-0 ml-1 mr-3" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Ask about Constitution, cases, statutes, or legal concepts..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none py-2"
              />
              <button
                type="submit"
                className="bg-[#c89d42] hover:bg-[#dbad4a] text-neutral-950 font-heading font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-full transition flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            </form>

            {/* Suggested Tags / Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-neutral-400 font-medium">Suggested:</span>
              {suggestedPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenTutorWithPrompt(promptText)}
                  className="px-3.5 py-1 rounded-full bg-black/40 border border-neutral-800 hover:border-[#c89d42]/60 text-neutral-300 hover:text-white text-[11px] sm:text-xs transition cursor-pointer"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK ACADEMIC NAVIGATION (8 CARDS) - MATCHING EXACT REFERENCE DESIGN */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-sm sm:text-base text-neutral-200 uppercase tracking-wider">
                  QUICK ACADEMIC NAVIGATION
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">Your most-used learning resources</p>
              </div>

              <button
                onClick={() => onSelectTab('courses')}
                className="text-xs font-semibold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {quickNavCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (card.action) {
                        card.action();
                      } else if (card.tab) {
                        onSelectTab(card.tab);
                      }
                    }}
                    className="bg-[#0f0f12] border border-neutral-800/80 hover:border-[#c89d42]/60 rounded-xl p-4 transition-all duration-200 group flex items-center justify-between text-left cursor-pointer hover:bg-[#15151a]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <IconComp className="w-5 h-5 text-[#c89d42] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-heading font-bold text-xs text-neutral-100 uppercase tracking-wide group-hover:text-[#c89d42] transition truncate">
                          {card.label}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">{card.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-[#c89d42] group-hover:translate-x-0.5 transition shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ENROLLED LAW UNITS - MATCHING EXACT REFERENCE DESIGN */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-sm sm:text-base text-neutral-200 uppercase tracking-wider">
                  ENROLLED LAW UNITS
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">Core curriculum progress</p>
              </div>

              <button
                onClick={() => onSelectTab('courses')}
                className="text-xs font-semibold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All 32 Units</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {enrolledLawUnits.map((unit, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f0f12] border border-neutral-800/80 hover:border-[#c89d42]/50 rounded-xl p-5 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    {/* Code Badge and Year */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-0.5 rounded border border-[#c89d42]/40 bg-[#c89d42]/10 text-[#c89d42] text-[10px] font-mono font-bold">
                        {unit.code}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-medium">{unit.year}</span>
                    </div>

                    {/* Unit Title */}
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-neutral-100 uppercase tracking-wide">
                      {unit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-3">
                      {unit.description}
                    </p>
                  </div>

                  {/* Progress Bar & Study Button */}
                  <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c89d42] rounded-full transition-all duration-300"
                        style={{ width: `${unit.percent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-neutral-400">
                        {unit.lessonsDone} / {unit.lessonsTotal} Lessons
                      </span>

                      <button
                        onClick={() => onSelectTab(unit.tab)}
                        className="bg-[#c89d42] hover:bg-[#dbad4a] text-neutral-950 font-heading font-bold text-[11px] px-3.5 py-1 rounded-full transition flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>Study</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ASSESSMENTS & RECENTLY VIEWED MATERIALS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Recent Assessment Scores */}
            <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-xl p-5 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-200 font-heading font-bold text-xs uppercase tracking-wide">
                  <Award className="w-4 h-4 text-[#c89d42]" />
                  <span>Recent Assessment Scores</span>
                </div>
                <button
                  onClick={() => onSelectTab('quizzes')}
                  className="text-[11px] font-semibold text-[#c89d42] hover:underline cursor-pointer"
                >
                  Practice Tests &rarr;
                </button>
              </div>

              <div className="space-y-2">
                {completedQuizHistory.slice(0, 3).map((quiz, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/40 rounded-xl border border-neutral-800/80 flex items-center justify-between text-xs transition hover:border-[#c89d42]/30"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-semibold text-neutral-200 truncate">{quiz.title}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{quiz.date} &bull; Score {quiz.total}</p>
                    </div>
                    <span className="text-xs font-bold text-[#c89d42] bg-[#c89d42]/10 px-2.5 py-1 rounded-md border border-[#c89d42]/30 font-mono shrink-0">
                      {quiz.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Viewed Resources */}
            <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-xl p-5 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-200 font-heading font-bold text-xs uppercase tracking-wide">
                  <History className="w-4 h-4 text-[#c89d42]" />
                  <span>Recently Accessed Authorities</span>
                </div>
                <button
                  onClick={() => onSelectTab('research')}
                  className="text-[11px] font-semibold text-[#c89d42] hover:underline cursor-pointer"
                >
                  Legal Library &rarr;
                </button>
              </div>

              <div className="space-y-2">
                {recentlyViewedMaterials.slice(0, 3).map((resItem, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/40 rounded-xl border border-neutral-800/80 flex items-center justify-between text-xs transition hover:border-[#c89d42]/30"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-semibold text-neutral-200 truncate">{resItem.title}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{resItem.section}</p>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-300 bg-neutral-800/80 px-2 py-0.5 rounded border border-neutral-700 shrink-0">
                      {resItem.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: COURSEWORK & ASSIGNMENTS */}
      {activeDashTab === 'assignments' && (
        <div className="relative z-10 space-y-6">
          {/* Header & Submit CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0f0f12] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div>
              <h2 className="font-heading font-bold text-lg text-neutral-100 uppercase tracking-wide">
                Coursework & Faculty Submissions
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Submit assignments, problem questions, and research briefs directly to lecturers for grading and commentary.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dbad4a] text-neutral-950 font-heading font-bold text-xs transition flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Submit New Coursework</span>
            </button>
          </div>

          {/* Success / Error Messages */}
          {submissionSuccessMsg && (
            <div className="p-3 bg-[#c89d42]/10 border border-[#c89d42]/40 text-[#c89d42] text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{submissionSuccessMsg}</span>
            </div>
          )}

          {submissionErrorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submissionErrorMsg}</span>
            </div>
          )}

          {/* Submissions List */}
          {isLoadingSubmissions ? (
            <div className="p-12 text-center text-xs text-neutral-400">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#c89d42]" />
              Loading your coursework queue...
            </div>
          ) : mySubmissions.length === 0 ? (
            <div className="p-12 bg-[#0f0f12] border border-neutral-800/80 rounded-2xl text-center space-y-3">
              <FileText className="w-8 h-8 mx-auto text-neutral-500" />
              <h3 className="font-heading font-bold text-sm text-neutral-200 uppercase">No Coursework Submitted Yet</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                You haven't submitted any assignments yet. Click below to submit your first case brief, problem question, or research paper.
              </p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-[#c89d42]/40 text-[#c89d42] text-xs font-bold transition cursor-pointer"
              >
                Submit Assignment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {mySubmissions.map((sub, idx) => {
                const isGraded = sub.status === 'GRADED' || sub.status === 'APPROVED';
                const isChangesRequested = sub.status === 'CHANGES_REQUESTED';
                const isPending = sub.status === 'PENDING_REVIEW' || sub.status === 'UNDER_REVIEW';

                return (
                  <div
                    key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`}
                    className="bg-[#0f0f12] border border-neutral-800/80 hover:border-[#c89d42]/40 rounded-xl p-5 space-y-3.5 shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-[#c89d42] bg-[#c89d42]/10 px-2 py-0.5 rounded border border-[#c89d42]/30">
                            {sub.courseOrUnit}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isGraded
                              ? 'bg-[#c89d42]/10 text-[#c89d42] border-[#c89d42]/30'
                              : isChangesRequested
                              ? 'bg-rose-950/30 text-rose-300 border-rose-800/40'
                              : 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
                          }`}>
                            {sub.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-sm text-neutral-100">{sub.assignmentTitle}</h3>
                        <p className="text-[11px] text-neutral-400">
                          Assigned to: <strong className="text-neutral-200">{sub.lecturerName}</strong> ({sub.lecturerEmail})
                        </p>
                      </div>

                      {/* Grade Badge */}
                      {sub.grade && (
                        <div className="px-3.5 py-1.5 rounded-xl bg-black/60 border border-[#c89d42]/40 text-right shrink-0">
                          <span className="text-[9px] uppercase font-bold text-neutral-400 block">Grade Score</span>
                          <span className="font-mono font-black text-sm text-[#c89d42]">{sub.grade}</span>
                        </div>
                      )}
                    </div>

                    {/* Submission Notes */}
                    {sub.submissionNotes && (
                      <p className="text-xs text-neutral-300 bg-black/40 p-3 rounded-xl border border-neutral-800/80 leading-relaxed">
                        <strong className="text-neutral-400">Submission Note:</strong> {sub.submissionNotes}
                      </p>
                    )}

                    {sub.lecturerFeedback && (
                      <div className="p-3 bg-[#c89d42]/5 border border-[#c89d42]/30 rounded-xl text-xs space-y-1">
                        <span className="font-bold text-[#c89d42] flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" /> Faculty Lecturer Feedback:
                        </span>
                        <p className="text-neutral-200 leading-relaxed">{sub.lecturerFeedback}</p>
                      </div>
                    )}

                    {/* File Attachment & Actions */}
                    <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-[#c89d42]" />
                        <span className="truncate max-w-[200px]">{sub.fileName || 'Attached_Assignment.pdf'}</span>
                        <span>&bull; {sub.fileSize || '250 KB'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedSubForPreview(sub)}
                          className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition"
                        >
                          <Eye className="w-3 h-3 text-[#c89d42]" /> View
                        </button>
                        {isPending && (
                          <button
                            onClick={() => handleWithdrawAssignment(sub.id)}
                            className="px-3 py-1 rounded-lg bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800/30 text-rose-300 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition"
                          >
                            <Trash2 className="w-3 h-3" /> Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LEARNING PROGRESS */}
      {activeDashTab === 'learning' && (
        <div className="relative z-10 space-y-6">
          <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h2 className="font-heading font-bold text-base text-neutral-100 uppercase tracking-wide">
              Curriculum Progress by Subject Unit
            </h2>
            <div className="space-y-3">
              {courses.slice(0, 6).map((crs, idx) => (
                <div key={crs.id ? `${crs.id}-${idx}` : `crs-prog-${idx}`} className="p-3.5 bg-black/40 rounded-xl border border-neutral-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-200">{crs.code} - {crs.title}</span>
                    <span className="text-[10px] text-[#c89d42] font-semibold">{70 + (idx * 5)}% Progress</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c89d42] to-[#dfb858] rounded-full"
                      style={{ width: `${70 + (idx * 5)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RESEARCH & SAVED ITEMS */}
      {activeDashTab === 'research' && (
        <div className="relative z-10 space-y-5">
          <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <h2 className="font-heading font-bold text-base text-neutral-100 uppercase tracking-wide">
              Bookmarked Cases & Authorities
            </h2>
            <div className="space-y-2.5">
              {savedCases.map((cs, idx) => (
                <div key={idx} className="p-3.5 bg-black/40 rounded-xl border border-neutral-800/80 space-y-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-xs text-neutral-100">{cs.name}</p>
                    <span className="text-[9px] font-mono text-[#c89d42] bg-[#c89d42]/10 px-2 py-0.5 rounded border border-[#c89d42]/30">
                      {cs.topic}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">{cs.ratio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE & SETTINGS */}
      {activeDashTab === 'profile' && (
        <div className="relative z-10 space-y-5">
          <div className="bg-[#0f0f12] border border-neutral-800/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-base text-neutral-100 uppercase tracking-wide">
                Personal Student Settings
              </h2>
              <button
                onClick={() => onOpenAuthModal('edit_profile')}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-[#c89d42]/40 text-[#c89d42] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Account Credentials</span>
              </button>
            </div>
            
            {savedSuccessMsg && (
              <div className="p-3 bg-[#c89d42]/10 border border-[#c89d42]/40 text-[#c89d42] text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{savedSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfileSettings} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Law Faculty / Institution</label>
                <input
                  type="text"
                  value={prefSubject}
                  onChange={(e) => setPrefSubject(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Primary Focus Area</label>
                <input
                  type="text"
                  value={prefFocus}
                  onChange={(e) => setPrefFocus(e.target.value)}
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dbad4a] text-neutral-950 font-bold text-xs transition cursor-pointer"
              >
                Save Study Preferences
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#141418] border border-neutral-800 rounded-2xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-[#c89d42]" />
                <h3 className="font-heading font-bold text-base text-neutral-100 uppercase">Submit Coursework to Faculty</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadAssignment} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. Constitutional Interpretation Problem Question (Art 137)"
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Course Unit</label>
                <select
                  value={subCourse}
                  onChange={(e) => setSubCourse(e.target.value)}
                  className="w-full bg-[#18181c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                >
                  <option value="Constitutional Law I">Constitutional Law I</option>
                  <option value="Law of Contract I">Law of Contract I</option>
                  <option value="Criminal Law I">Criminal Law I</option>
                  <option value="Civil Procedure">Civil Procedure</option>
                  <option value="Land Law">Land Law</option>
                  <option value="Legal Methods & Research">Legal Methods & Research</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Target Faculty Lecturer</label>
                <select
                  value={subLecturerEmail}
                  onChange={(e) => {
                    setSubLecturerEmail(e.target.value);
                    setSubLecturerName(e.target.value.includes('mukasa') ? 'Dr. Apollo Mukasa' : 'Dr. Sarah Namubiru');
                  }}
                  className="w-full bg-[#18181c] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                >
                  <option value="apollo.mukasa@lawhub.ug">Dr. Apollo Mukasa (Constitutional Law & Civil Procedure)</option>
                  <option value="sarah.namubiru@lawhub.ug">Dr. Sarah Namubiru (Contracts & Commercial Law)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Submission Notes & Answers</label>
                <textarea
                  rows={3}
                  value={subNotes}
                  onChange={(e) => setSubNotes(e.target.value)}
                  placeholder="Outline key statutory citations, case ratios, and student commentary..."
                  className="w-full bg-black/40 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-neutral-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-300">Attach Document (PDF, DOCX, TXT)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#c89d42]/10 file:text-[#c89d42] hover:file:bg-[#c89d42]/20 cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-black/40 border border-neutral-800 text-neutral-300 hover:text-neutral-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dbad4a] text-neutral-950 font-heading font-bold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Submit Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {selectedSubForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#141418] border border-neutral-800 rounded-2xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#c89d42] font-bold">{selectedSubForPreview.courseOrUnit}</span>
                <h3 className="font-heading font-bold text-sm text-neutral-100">{selectedSubForPreview.assignmentTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedSubForPreview(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-black/40 rounded-xl border border-neutral-800 text-xs space-y-2">
              <p className="text-neutral-300 leading-relaxed">
                {selectedSubForPreview.submissionNotes || 'No additional submission notes provided.'}
              </p>
              {selectedSubForPreview.lecturerFeedback && (
                <div className="pt-2 border-t border-neutral-800 space-y-1">
                  <span className="font-bold text-[#c89d42]">Faculty Feedback:</span>
                  <p className="text-neutral-200">{selectedSubForPreview.lecturerFeedback}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSubForPreview(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
