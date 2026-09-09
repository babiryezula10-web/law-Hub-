import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  Flame,
  Bookmark,
  Clock,
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
  Shield,
  MessageSquare,
  LogOut,
  FolderHeart,
  History,
  Info,
  Upload,
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
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile, Course, SavedNote, StudentSubmission } from '../types';
import { WatermarkBackground } from './WatermarkBackground';

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
  const [activeDashTab, setActiveDashTab] = useState<'overview' | 'learning' | 'assignments' | 'research' | 'profile'>('overview');
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
      // In case of transient server reconnects or offline state, retain submissions quietly
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

  // Mock personalized data for student's private research and learning space
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

  const savedStatutes = [
    { title: 'The Contracts Act 2010 (Act 7/2010)', section: 'S.10, S.14, S.19', note: 'Essential elements of binding agreement and capacity.' },
    { title: 'The Land Act (Cap 227)', section: 'S.39, S.40', note: 'Requirement for spousal consent on family land transactions.' },
    { title: 'The Penal Code Act (Cap 120)', section: 'S.188, S.191', note: 'Murder definition and malice aforethought components.' }
  ];

  const quickNavCards = [
    { label: 'My Courses', icon: BookOpen, desc: '32 curriculum units & notes', tab: 'courses' },
    { label: 'Legal Library', icon: Scale, desc: 'Statutes, precedents & glossary', tab: 'research' },
    { label: '1995 Constitution', icon: Landmark, desc: 'All 19 chapters & articles', tab: 'constitution' },
    { label: 'AI Legal Tutor', icon: Sparkles, desc: 'IRAC reasoning & problem tutor', tab: 'tutor' },
    { label: 'Assignments', icon: FilePlus, desc: 'Submit work & view grades', action: () => setActiveDashTab('assignments') },
    { label: 'Quizzes & Practice', icon: Calendar, desc: 'Timed multiple-choice tests', tab: 'quizzes' },
    { label: 'Drafting Suite', icon: PenTool, desc: 'Plaints, affidavits & covenants', tab: 'drafting' },
    { label: 'Past Exam Papers', icon: FileText, desc: 'Model answer structures', tab: 'past_papers' },
  ];

  return (
    <div className="relative space-y-6 pb-12 text-slate-100">
      {/* Legal Watermark */}
      <WatermarkBackground type="golden_tome" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* Top Banner & Account Summary */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl backdrop-blur-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-[#c89d42]/30 backdrop-blur-sm">
              Student Scholar Space
            </span>
            <span className="text-xs text-slate-400">&bull; {user.institution}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
            Welcome, <span className="text-[#c89d42]">{user.name}</span>
          </h1>
          <p className="text-xs text-slate-400">
            Private Academic LMS &bull; Account: <span className="text-slate-200 font-medium">{user.email}</span>
          </p>
        </div>

        {/* Action Controls & Metrics */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-black/30 border border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md">
            <div className="text-center px-1.5">
              <div className="flex items-center justify-center gap-1 text-[#c89d42] font-extrabold text-base">
                <Flame className="w-3.5 h-3.5 fill-[#c89d42]" />
                <span>{user.studyStreakDays}d</span>
              </div>
              <p className="text-[8px] text-slate-400 uppercase font-semibold">Streak</p>
            </div>
            <div className="h-5 w-[1px] bg-white/10"></div>
            <div className="text-center px-1.5">
              <div className="text-slate-200 font-extrabold text-base">
                <span>{user.completedQuizzes}</span>
              </div>
              <p className="text-[8px] text-slate-400 uppercase font-semibold">Quizzes</p>
            </div>
            <div className="h-5 w-[1px] bg-white/10"></div>
            <div className="text-center px-1.5">
              <div className="text-[#c89d42] font-extrabold text-base">
                <span>{user.savedNotesCount}</span>
              </div>
              <p className="text-[8px] text-slate-400 uppercase font-semibold">Notes</p>
            </div>
          </div>

          <button
            onClick={() => onOpenAuthModal('edit_profile')}
            className="px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#c89d42]/40 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
          >
            <Settings className="w-3.5 h-3.5 text-[#c89d42]" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="relative z-10 flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveDashTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
            activeDashTab === 'overview'
              ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
              : 'bg-slate-950/40 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Overview & Quick Access
        </button>

        <button
          onClick={() => setActiveDashTab('assignments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
            activeDashTab === 'assignments'
              ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
              : 'bg-slate-950/40 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
          }`}
        >
          <FilePlus className="w-3.5 h-3.5" /> Coursework & Submissions
          {mySubmissions.length > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
              activeDashTab === 'assignments' ? 'bg-neutral-950 text-[#c89d42]' : 'bg-black/50 text-[#c89d42]'
            }`}>
              {mySubmissions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveDashTab('learning')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
            activeDashTab === 'learning'
              ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
              : 'bg-slate-950/40 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" /> My Learning Progress
        </button>

        <button
          onClick={() => setActiveDashTab('research')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
            activeDashTab === 'research'
              ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
              : 'bg-slate-950/40 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
          }`}
        >
          <Scale className="w-3.5 h-3.5" /> Saved Notes & Authorities
        </button>

        <button
          onClick={() => setActiveDashTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
            activeDashTab === 'profile'
              ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
              : 'bg-slate-950/40 text-slate-300 hover:text-[#c89d42] border border-white/10 hover:bg-slate-900/50'
          }`}
        >
          <User className="w-3.5 h-3.5" /> Account Profile
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeDashTab === 'overview' && (
        <div className="relative z-10 space-y-6">
          
          {/* Quick Academic Assistant Input Box */}
          <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-md space-y-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-100">LawHub AI Academic Assistant</h2>
                  <p className="text-[11px] text-slate-400">Instant answers with Ugandan statutory and case citations</p>
                </div>
              </div>
              <button
                onClick={() => onSelectTab('tutor')}
                className="text-xs font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Open Full Assistant <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleAskQuickQuery} className="flex gap-2">
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="e.g. Explain Section 10 of Contracts Act 2010 or Summarize Obbo v AG ratio..."
                className="flex-1 bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#c89d42]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#c89d42] text-neutral-950 font-bold text-xs hover:bg-[#dfb858] transition flex items-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
              <span className="text-slate-400 font-medium">Suggested:</span>
              {[
                'Explain Section 39 Land Act',
                'Summarize Ratio in Ibingira Case',
                'What is Malice Aforethought under S.191?',
                'Draft IRAC Answer for Constitutional Law'
              ].map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenTutorWithPrompt(promptText)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-[#c89d42] border border-white/10 transition text-[10px]"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access Visual Cards */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-sm text-slate-100 uppercase tracking-wider">
                Quick Academic Navigation
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                    className="p-3.5 bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/50 rounded-2xl text-left space-y-1.5 transition group cursor-pointer backdrop-blur-md hover:bg-slate-900/50"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c89d42] group-hover:border-[#c89d42]/40 transition">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <p className="font-heading font-bold text-xs text-slate-100 group-hover:text-[#c89d42] transition">
                      {card.label}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{card.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Courses Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-base text-slate-100">Enrolled Law Units</h2>
                <p className="text-xs text-slate-400">Core curriculum progress</p>
              </div>
              <button
                onClick={() => onSelectTab('courses')}
                className="text-xs font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All 32 Units <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {courses.slice(0, 6).map((crs, idx) => (
                <div
                  key={crs.id ? `${crs.id}-${idx}` : `crs-${idx}`}
                  className="p-4 bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-2xl space-y-2.5 transition flex flex-col justify-between backdrop-blur-md"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#c89d42] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                        {crs.code}
                      </span>
                      <span className="text-[10px] text-slate-400">{crs.level}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xs text-slate-100 line-clamp-1">{crs.title}</h3>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{crs.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{crs.modules?.length || 4} Modules</span>
                    <button
                      onClick={() => onSelectTab('courses')}
                      className="text-[11px] font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Study <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Results & Recently Accessed Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Assessments */}
            <div className="p-5 bg-slate-950/40 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-100 font-heading font-bold text-xs">
                  <Award className="w-4 h-4 text-[#c89d42]" />
                  <span>Recent Assessment Scores</span>
                </div>
                <button
                  onClick={() => onSelectTab('quizzes')}
                  className="text-[11px] font-bold text-[#c89d42] hover:underline cursor-pointer"
                >
                  Practice Tests
                </button>
              </div>

              <div className="space-y-2">
                {completedQuizHistory.slice(0, 3).map((quiz, idx) => (
                  <div key={idx} className="p-2.5 bg-black/30 rounded-xl border border-white/10 flex items-center justify-between text-xs backdrop-blur-sm">
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-slate-200 truncate">{quiz.title}</p>
                      <p className="text-[10px] text-slate-400">{quiz.date} &bull; Score {quiz.total}</p>
                    </div>
                    <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/20 font-mono">
                      {quiz.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Viewed Resources */}
            <div className="p-5 bg-slate-950/40 border border-white/10 rounded-2xl space-y-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-100 font-heading font-bold text-xs">
                  <History className="w-4 h-4 text-[#c89d42]" />
                  <span>Recently Accessed Authorities</span>
                </div>
                <button
                  onClick={() => onSelectTab('research')}
                  className="text-[11px] font-bold text-[#c89d42] hover:underline cursor-pointer"
                >
                  Legal Library
                </button>
              </div>

              <div className="space-y-2">
                {recentlyViewedMaterials.slice(0, 3).map((resItem, idx) => (
                  <div key={idx} className="p-2.5 bg-black/30 rounded-xl border border-white/10 flex items-center justify-between text-xs backdrop-blur-sm">
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-slate-200 truncate">{resItem.title}</p>
                      <p className="text-[10px] text-slate-400">{resItem.section}</p>
                    </div>
                    <span className="text-[9px] font-mono text-slate-300 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-md backdrop-blur-md">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-100">Coursework & Faculty Submissions</h2>
              <p className="text-xs text-slate-400">
                Submit assignments, problem questions, and research briefs directly to lecturers for grading and commentary.
              </p>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-bold text-xs transition flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Submit New Coursework</span>
            </button>
          </div>

          {/* Success / Error Messages */}
          {submissionSuccessMsg && (
            <div className="p-3 bg-white/[0.05] border border-[#c89d42]/40 text-[#c89d42] text-xs rounded-xl flex items-center gap-2 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{submissionSuccessMsg}</span>
            </div>
          )}

          {submissionErrorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs rounded-xl flex items-center gap-2 backdrop-blur-md">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submissionErrorMsg}</span>
            </div>
          )}

          {/* Submissions List */}
          {isLoadingSubmissions ? (
            <div className="p-8 text-center text-xs text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#c89d42]" />
              Loading your coursework queue...
            </div>
          ) : mySubmissions.length === 0 ? (
            <div className="p-10 bg-slate-950/40 border border-white/10 rounded-3xl text-center space-y-3 backdrop-blur-md">
              <FileText className="w-8 h-8 mx-auto text-slate-500" />
              <h3 className="font-heading font-bold text-sm text-slate-200">No Coursework Submitted Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven't submitted any assignments yet. Click below to submit your first case brief, problem question, or research paper.
              </p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#c89d42]/40 text-[#c89d42] text-xs font-bold transition cursor-pointer"
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
                    className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/30 rounded-2xl p-5 space-y-3 shadow-md transition backdrop-blur-md hover:bg-slate-900/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-[#c89d42] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                            {sub.courseOrUnit}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isGraded
                              ? 'bg-white/[0.05] text-[#c89d42] border-[#c89d42]/30'
                              : isChangesRequested
                              ? 'bg-rose-950/30 text-rose-300 border-rose-800/40'
                              : 'bg-black/30 text-slate-300 border-white/10'
                          }`}>
                            {sub.status.replace('_', ' ')}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-sm text-slate-100">{sub.assignmentTitle}</h3>
                        <p className="text-[11px] text-slate-400">
                          Assigned to: <strong className="text-slate-200">{sub.lecturerName}</strong> ({sub.lecturerEmail})
                        </p>
                      </div>

                      {/* Grade Badge */}
                      {sub.grade && (
                        <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-[#c89d42]/30 text-right">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block">Grade Score</span>
                          <span className="font-mono font-black text-sm text-[#c89d42]">{sub.grade}</span>
                        </div>
                      )}
                    </div>

                    {/* Submission Notes & Remarks */}
                    {sub.submissionNotes && (
                      <p className="text-xs text-slate-300 bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed">
                        <strong className="text-slate-400">Submission Note:</strong> {sub.submissionNotes}
                      </p>
                    )}

                    {sub.lecturerFeedback && (
                      <div className="p-3 bg-white/[0.04] border border-[#c89d42]/25 rounded-xl text-xs space-y-1 backdrop-blur-sm">
                        <span className="font-bold text-[#c89d42] flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" /> Faculty Lecturer Feedback:
                        </span>
                        <p className="text-slate-200 leading-relaxed">{sub.lecturerFeedback}</p>
                      </div>
                    )}

                    {/* File Attachment & Actions */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <FileText className="w-3.5 h-3.5 text-[#c89d42]" />
                        <span className="truncate max-w-[200px]">{sub.fileName || 'Attached_Assignment.pdf'}</span>
                        <span>&bull; {sub.fileSize || '250 KB'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedSubForPreview(sub)}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-[#c89d42]" /> View
                        </button>
                        {isPending && (
                          <button
                            onClick={() => handleWithdrawAssignment(sub.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800/30 text-rose-300 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
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
          <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md">
            <h2 className="font-heading font-bold text-base text-slate-100">Curriculum Progress by Subject Unit</h2>
            <div className="space-y-3">
              {courses.slice(0, 6).map((crs, idx) => (
                <div key={crs.id ? `${crs.id}-${idx}` : `crs-prog-${idx}`} className="p-3.5 bg-black/30 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-200">{crs.code} - {crs.title}</span>
                    <span className="text-[10px] text-[#c89d42] font-semibold">{70 + (idx * 5)}% Progress</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
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
          <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md">
            <h2 className="font-heading font-bold text-base text-slate-100">Bookmarked Cases & Authorities</h2>
            <div className="space-y-2.5">
              {savedCases.map((cs, idx) => (
                <div key={idx} className="p-3.5 bg-black/30 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-xs text-slate-100">{cs.name}</p>
                    <span className="text-[9px] font-mono text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">{cs.topic}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{cs.ratio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE & SETTINGS */}
      {activeDashTab === 'profile' && (
        <div className="relative z-10 space-y-5">
          <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 backdrop-blur-md">
            <h2 className="font-heading font-bold text-base text-slate-100">Personal Student Settings</h2>
            
            {savedSuccessMsg && (
              <div className="p-3 bg-white/[0.05] border border-[#c89d42]/40 text-[#c89d42] text-xs rounded-xl flex items-center gap-2 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{savedSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfileSettings} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Law Faculty / Institution</label>
                <input
                  type="text"
                  value={prefSubject}
                  onChange={(e) => setPrefSubject(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Primary Focus Area</label>
                <input
                  type="text"
                  value={prefFocus}
                  onChange={(e) => setPrefFocus(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition cursor-pointer"
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
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-[#c89d42]" />
                <h3 className="font-heading font-bold text-base text-slate-100">Submit Coursework to Faculty</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.05] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadAssignment} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="e.g. Constitutional Interpretation Problem Question (Art 137)"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Course Unit</label>
                <select
                  value={subCourse}
                  onChange={(e) => setSubCourse(e.target.value)}
                  className="w-full bg-[#18181c] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
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
                <label className="text-[11px] font-bold text-slate-300">Target Faculty Lecturer</label>
                <select
                  value={subLecturerEmail}
                  onChange={(e) => {
                    setSubLecturerEmail(e.target.value);
                    setSubLecturerName(e.target.value.includes('mukasa') ? 'Dr. Apollo Mukasa' : 'Dr. Sarah Namubiru');
                  }}
                  className="w-full bg-[#18181c] border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                >
                  <option value="apollo.mukasa@lawhub.ug">Dr. Apollo Mukasa (Constitutional Law & Civil Procedure)</option>
                  <option value="sarah.namubiru@lawhub.ug">Dr. Sarah Namubiru (Contracts & Commercial Law)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Submission Notes & Answers</label>
                <textarea
                  rows={3}
                  value={subNotes}
                  onChange={(e) => setSubNotes(e.target.value)}
                  placeholder="Outline key statutory citations, case ratios, and student commentary..."
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Attach Document (PDF, DOCX, TXT)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/[0.06] file:text-[#c89d42] hover:file:bg-white/[0.1] cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-black/30 border border-white/10 text-slate-300 hover:text-slate-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-bold text-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[85vh] overflow-y-auto backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#c89d42] font-bold">{selectedSubForPreview.courseOrUnit}</span>
                <h3 className="font-heading font-bold text-sm text-slate-100">{selectedSubForPreview.assignmentTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedSubForPreview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.05] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-black/30 rounded-2xl border border-white/10 text-xs space-y-2">
              <p className="text-slate-300 leading-relaxed">
                {selectedSubForPreview.submissionNotes || 'No additional submission notes provided.'}
              </p>
              {selectedSubForPreview.lecturerFeedback && (
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <span className="font-bold text-[#c89d42]">Faculty Feedback:</span>
                  <p className="text-slate-200">{selectedSubForPreview.lecturerFeedback}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSubForPreview(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-xs font-semibold cursor-pointer"
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
