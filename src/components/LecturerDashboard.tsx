import React, { useState, useEffect } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  GraduationCap,
  Upload,
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Trash2,
  Search,
  Filter,
  Layers,
  Sparkles,
  Tag,
  Calendar,
  Building2,
  FilePlus,
  ShieldAlert,
  X,
  RefreshCw,
  Plus,
  Award,
  MessageSquare,
  Send,
  UserCheck,
  Check
} from 'lucide-react';
import { LecturerSubmission, LecturerSubmissionStatus, StudentSubmission, StudentAssignmentStatus, UserProfile } from '../types';

interface LecturerDashboardProps {
  user: UserProfile;
  onOpenTutorWithPrompt?: (prompt: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const LecturerDashboard: React.FC<LecturerDashboardProps> = ({
  user,
  onOpenTutorWithPrompt,
  onNavigateToTab
}) => {
  // Strict RBAC Enforcement
  if (user.role !== 'Lecturer' && user.role !== 'Administrator') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-red-500/30 rounded-3xl max-w-lg w-full p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-heading font-extrabold text-slate-100">
              Access Restricted: You do not have permission to view this page.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The Lecturer Faculty Portal is accessible only to verified university faculty with the <span className="text-amber-400 font-bold">LECTURER</span> or <span className="text-amber-400 font-bold">ADMIN</span> role.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 text-left space-y-1.5">
            <p><strong>Logged-in Account:</strong> {user.name} ({user.email})</p>
            <p><strong>Assigned Role:</strong> <span className="text-amber-400 font-semibold">{user.role}</span></p>
            <p className="text-[11px] text-slate-500 pt-1">
              Students cannot access lecturer upload controls. Please contact your faculty administrator if your account role requires an update.
            </p>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-md"
            >
              Return to Student Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  const [submissions, setSubmissions] = useState<LecturerSubmission[]>([]);
  const [studentAssignments, setStudentAssignments] = useState<StudentSubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'student_reviews' | 'my_materials' | 'upload_new'>('student_reviews');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorNotification, setErrorNotification] = useState<string | null>(null);

  // Student Assignment Review Modal State
  const [selectedStudentSub, setSelectedStudentSub] = useState<StudentSubmission | null>(null);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [gradeInput, setGradeInput] = useState<string>('85% (A)');
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  // The 7 Required Material Types
  const lecturerMaterialTypes = [
    'Lecture notes',
    'Course materials',
    'Assignments',
    'Past papers',
    'Reading materials',
    'Case materials',
    'Revision materials'
  ];

  // Upload Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCourse, setFormCourse] = useState('Constitutional Law I');
  const [formDocType, setFormDocType] = useState<string>('Lecture notes');
  const [formDescription, setFormDescription] = useState('');
  const [formAcademicYear, setFormAcademicYear] = useState('2024/2025');
  const [formTags, setFormTags] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const [uploadedFileType, setUploadedFileType] = useState('');
  const [uploadedFileContent, setUploadedFileContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preview Modal
  const [previewSubmission, setPreviewSubmission] = useState<LecturerSubmission | null>(null);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const emailParam = user.role === 'Administrator' ? '' : `&email=${encodeURIComponent(user.email)}`;
      
      try {
        const matRes = await fetch(`/api/submissions?role=${user.role}${emailParam}`);
        if (matRes.ok) {
          const data = await matRes.json();
          setSubmissions(data.submissions || []);
        }
      } catch (err) {
        console.warn('Submissions load warning:', err);
      }

      try {
        const studRes = await fetch(`/api/student-submissions?role=Lecturer&lecturerEmail=${encodeURIComponent(user.email)}`);
        if (studRes.ok) {
          const data = await studRes.json();
          setStudentAssignments(data.studentSubmissions || []);
        }
      } catch (err) {
        console.warn('Student assignments load warning:', err);
      }
    } catch (err) {
      console.error('Error loading lecturer data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  const showSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const showError = (msg: string) => {
    setErrorNotification(msg);
    setTimeout(() => setErrorNotification(null), 5000);
  };

  // Student Assignment Review Handler
  const handleReviewStudentAssignment = async (action: 'APPROVE' | 'GRADE' | 'REQUEST_CHANGES' | 'REJECT') => {
    if (!selectedStudentSub) return;
    setIsReviewing(true);

    try {
      const res = await fetch(`/api/student-submissions/${selectedStudentSub.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          grade: gradeInput,
          feedback: feedbackInput,
          reviewerName: user.name || 'Faculty Lecturer'
        })
      });

      if (res.ok) {
        showSuccess(`Student submission ${action === 'APPROVE' ? 'APPROVED' : action === 'GRADE' ? 'GRADED' : action === 'REQUEST_CHANGES' ? 'RETURNED FOR CORRECTIONS' : 'REJECTED'}.`);
        setSelectedStudentSub(null);
        setFeedbackInput('');
        fetchSubmissions();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to submit review.');
      }
    } catch (err) {
      showError('Network error while submitting review.');
    } finally {
      setIsReviewing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      setUploadedFileType(file.type || file.name.split('.').pop()?.toUpperCase() || 'DOCUMENT');

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFileContent((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    }
  };

  const handleSubmitForReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) {
      showError('Please enter material title and description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formTitle,
        courseOrUnit: formCourse,
        documentType: formDocType,
        description: formDescription,
        lecturerName: user.name || 'Faculty Lecturer',
        lecturerEmail: user.email || 'lecturer@lawhub.ug',
        institution: user.institution || 'Faculty of Law',
        academicYear: formAcademicYear,
        fileName: uploadedFileName,
        fileSize: uploadedFileSize,
        fileType: uploadedFileType,
        fileContent: uploadedFileContent,
        tags: formTags.split(',').map((t) => t.trim()).filter(Boolean)
      };

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showSuccess('Faculty material uploaded and queued for Editorial Board approval.');
        setFormTitle('');
        setFormDescription('');
        setFormTags('');
        setUploadedFileName('');
        setUploadedFileSize('');
        setUploadedFileContent('');
        fetchSubmissions();
        setActiveTab('my_materials');
      } else {
        const err = await res.json();
        showError(err.error || 'Upload failed.');
      }
    } catch (err) {
      showError('Network error while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to withdraw and delete this submission?')) return;
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showSuccess('Submission withdrawn successfully.');
        fetchSubmissions();
      }
    } catch (err) {
      showError('Error deleting submission.');
    }
  };

  // Metrics
  const pendingMatCount = submissions.filter((s) => s.status === 'PENDING_REVIEW').length;
  const publishedMatCount = submissions.filter((s) => s.status === 'PUBLISHED' || s.status === 'APPROVED').length;
  const pendingStudentSubsCount = studentAssignments.filter((s) => s.status === 'PENDING_REVIEW' || s.status === 'UNDER_REVIEW').length;
  const gradedStudentSubsCount = studentAssignments.filter((s) => s.status === 'GRADED' || s.status === 'APPROVED').length;

  const filteredStudentSubs = studentAssignments.filter((sub) => {
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      sub.assignmentTitle.toLowerCase().includes(q) ||
      sub.courseOrUnit.toLowerCase().includes(q) ||
      sub.studentName.toLowerCase().includes(q) ||
      sub.submissionNotes.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      sub.title.toLowerCase().includes(q) ||
      sub.courseOrUnit.toLowerCase().includes(q) ||
      sub.description.toLowerCase().includes(q) ||
      sub.documentType.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
      case 'APPROVED':
        return (
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> APPROVED / PUBLISHED
          </span>
        );
      case 'GRADED':
        return (
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> GRADED
          </span>
        );
      case 'CHANGES_REQUESTED':
        return (
          <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold rounded-full flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> CORRECTIONS REQUESTED
          </span>
        );
      case 'PENDING_REVIEW':
      case 'UNDER_REVIEW':
        return (
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> PENDING REVIEW
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-full flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> REJECTED
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full">
            {status}
          </span>
        );
    }
  };
  return (
    <div className="relative space-y-8 pb-16 text-slate-100">
      <WatermarkBackground type="classic_watermark" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Success Notification */}
      {notification && (
        <div className="relative z-10 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-in fade-in backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorNotification && (
        <div className="relative z-10 bg-rose-950/40 border border-rose-800/40 text-rose-300 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-in fade-in backdrop-blur-md">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{errorNotification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
              <GraduationCap className="w-7 h-7" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
                  Lecturer Dashboard
                </h1>
                <span className="px-2.5 py-0.5 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[10px] font-bold rounded-md uppercase">
                  FACULTY PORTAL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Upload lecture notes, past exam papers, and course materials for Editorial Board administrative review.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchSubmissions}
              className="p-2.5 bg-black/30 border border-white/10 hover:border-[#c89d42]/40 text-slate-300 rounded-xl transition cursor-pointer backdrop-blur-sm"
              title="Refresh submissions"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Prominent Upload Material Button */}
            <button
              onClick={() => setActiveTab('upload_new')}
              className="px-4 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-md cursor-pointer font-heading"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Upload Material</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 border-b border-white/10 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('student_reviews')}
            className={`px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'student_reviews'
                ? 'border-[#c89d42] text-[#c89d42]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Student Submissions ({studentAssignments.length})
            {pendingStudentSubsCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#c89d42] text-neutral-950 text-[10px] font-black rounded-full">
                {pendingStudentSubsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('my_materials')}
            className={`px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'my_materials'
                ? 'border-[#c89d42] text-[#c89d42]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> My Course Materials ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('upload_new')}
            className={`px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'upload_new'
                ? 'border-[#c89d42] text-[#c89d42]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" /> + Upload New Material
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/40 border border-white/10 p-5 rounded-2xl space-y-1 backdrop-blur-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student Submissions</span>
          <p className="text-2xl font-black text-slate-100">{studentAssignments.length}</p>
          <p className="text-xs text-slate-500">Assignments received from students</p>
        </div>
        <div className="bg-slate-950/40 border border-[#c89d42]/30 p-5 rounded-2xl space-y-1 backdrop-blur-md">
          <span className="text-[10px] font-bold text-[#c89d42] uppercase tracking-wider">Awaiting Grading</span>
          <p className="text-2xl font-black text-[#c89d42]">{pendingStudentSubsCount}</p>
          <p className="text-xs text-amber-300/70">Student assignments to review</p>
        </div>
        <div className="bg-slate-950/40 border border-emerald-500/30 p-5 rounded-2xl space-y-1 backdrop-blur-md">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Graded & Approved</span>
          <p className="text-2xl font-black text-emerald-400">{gradedStudentSubsCount}</p>
          <p className="text-xs text-emerald-300/70">Feedback sent to students</p>
        </div>
        <div className="bg-slate-950/40 border border-white/10 p-5 rounded-2xl space-y-1 backdrop-blur-md">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Teaching Materials</span>
          <p className="text-2xl font-black text-slate-100">{submissions.length}</p>
          <p className="text-xs text-slate-500">{publishedMatCount} published in library</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STUDENT SUBMISSIONS REVIEW QUEUE */}
      {/* ========================================================================= */}
      {activeTab === 'student_reviews' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">Student Assignment Submissions & Review</h2>
              <p className="text-xs text-slate-400 mt-1">
                Evaluate student submissions, provide detailed comments, and assign formal grades.
              </p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student assignments by title, course unit, student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/30 border border-white/10 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="GRADED">Graded</option>
                <option value="APPROVED">Approved</option>
                <option value="CHANGES_REQUESTED">Corrections Requested</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Student Submissions List */}
          {filteredStudentSubs.length === 0 ? (
            <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-12 text-center space-y-4 backdrop-blur-md">
              <div className="w-12 h-12 bg-white/[0.05] border border-white/10 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-300 text-sm">No student assignments found</p>
                <p className="text-xs text-slate-400">
                  {searchQuery || statusFilter !== 'All'
                    ? 'No submissions match your active filter parameters.'
                    : 'When students upload coursework for review, their submissions will appear in this faculty queue.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredStudentSubs.map((sub, idx) => (
                <div
                  key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`}
                  className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-2xl p-5 sm:p-6 transition space-y-4 shadow-lg backdrop-blur-md hover:bg-slate-900/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[10px] font-bold rounded-md">
                          {sub.courseOrUnit}
                        </span>
                        {getStatusBadge(sub.status)}
                        {sub.grade && (
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black rounded-md flex items-center gap-1">
                            <Award className="w-3 h-3" /> Grade: {sub.grade}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-slate-100">{sub.assignmentTitle}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span><strong>Student:</strong> {sub.studentName} ({sub.studentEmail})</span>
                        <span><strong>Institution:</strong> {sub.institution || 'Faculty of Law'}</span>
                        <span><strong>Submitted:</strong> {new Date(sub.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedStudentSub(sub);
                        setGradeInput(sub.grade || '85% (A)');
                        setFeedbackInput(sub.lecturerFeedback || '');
                      }}
                      className="px-4 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-bold rounded-xl transition flex items-center gap-2 self-start shrink-0 shadow-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Review & Grade</span>
                    </button>
                  </div>

                  {sub.submissionNotes && (
                    <div className="p-3.5 bg-black/30 rounded-xl border border-white/10 text-xs text-slate-300 backdrop-blur-sm">
                      <p className="font-semibold text-slate-400 text-[11px] mb-1">Student Notes / Summary:</p>
                      <p className="line-clamp-2">{sub.submissionNotes}</p>
                    </div>
                  )}

                  {sub.lecturerFeedback && (
                    <div className="p-3.5 bg-[#c89d42]/10 rounded-xl border border-[#c89d42]/30 text-xs text-amber-200/90 flex items-start gap-2.5 backdrop-blur-sm">
                      <MessageSquare className="w-4 h-4 text-[#c89d42] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#c89d42] text-[11px] block">Lecturer Feedback ({sub.reviewedBy || 'Faculty'}):</span>
                        <p className="mt-0.5">{sub.lecturerFeedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MY SUBMISSIONS (FACULTY TEACHING MATERIALS) */}
      {/* ========================================================================= */}
      {activeTab === 'my_materials' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your uploads by title, course, or material type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/30 border border-white/10 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#18181c] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="PUBLISHED">Published</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-12 text-center space-y-4 backdrop-blur-md">
              <FileText className="w-12 h-12 text-slate-500 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-slate-200">No Submissions Found</h3>
                <p className="text-xs text-slate-400">
                  {submissions.length === 0
                    ? "You have not submitted any academic materials yet. Click '+ Upload Material' to begin."
                    : 'No materials match your current search or filter.'}
                </p>
              </div>
              <button
                onClick={() => setActiveTab('upload_new')}
                className="px-5 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-bold rounded-xl transition shadow-md cursor-pointer"
              >
                + Upload Material
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubmissions.map((sub, idx) => (
                <div
                  key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`}
                  className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 shadow-lg transition flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-1 rounded-md border border-[#c89d42]/30">
                        {sub.courseOrUnit} &bull; {sub.documentType}
                      </span>
                      {getStatusBadge(sub.status)}
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-base text-slate-100">{sub.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        AY {sub.academicYear} &bull; Submitted {sub.submittedAt || 'Recently'}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{sub.description}</p>

                    {sub.fileName && (
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-black/30 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
                        <FileText className="w-4 h-4 text-[#c89d42]" />
                        <span className="truncate">{sub.fileName} ({sub.fileSize || 'Attached'})</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                    <button
                      onClick={() => setPreviewSubmission(sub)}
                      className="px-4 py-2 bg-white/[0.05] hover:bg-white/10 text-slate-200 font-bold rounded-xl border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> VIEW
                    </button>

                    <button
                      onClick={() => handleDeleteSubmission(sub.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
                      title="Withdraw Submission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: UPLOAD MATERIAL FORM */}
      {/* ========================================================================= */}
      {activeTab === 'upload_new' && (
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-4xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-3 bg-white/[0.05] border border-white/10 rounded-2xl text-[#c89d42]">
              <Upload className="w-6 h-6" />
            </span>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                Upload Faculty Material
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Submitted materials are marked <span className="text-[#c89d42] font-bold">PENDING REVIEW</span> and forwarded to the Editorial Board for verification.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitForReview} className="space-y-6">
            {/* Title & Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Constitutional Law Module 3: Separation of Powers"
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Course / Unit *</label>
                <input
                  type="text"
                  required
                  value={formCourse}
                  onChange={(e) => setFormCourse(e.target.value)}
                  placeholder="e.g. Constitutional Law I / Law of Contract / Criminal Law"
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#c89d42]"
                />
              </div>
            </div>

            {/* Material Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Material Type <span className="text-[#c89d42]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {lecturerMaterialTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormDocType(type)}
                    className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
                      formDocType === type
                        ? 'bg-[#c89d42] text-neutral-950 border-[#c89d42] shadow-md'
                        : 'bg-black/30 text-slate-300 border-white/10 hover:border-[#c89d42]/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Description *</label>
              <textarea
                required
                rows={4}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Describe key topics, case studies, assignments or syllabus context..."
                className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl p-4 focus:outline-none focus:border-[#c89d42]"
              />
            </div>

            {/* Academic Year & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Academic Year *</label>
                <input
                  type="text"
                  required
                  value={formAcademicYear}
                  onChange={(e) => setFormAcademicYear(e.target.value)}
                  placeholder="e.g. 2024/2025"
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Constitution, Separation of Powers, Judicial Review"
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#c89d42]"
                />
              </div>
            </div>

            {/* File Attachment */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">File</label>
              <div className="border-2 border-dashed border-white/10 hover:border-[#c89d42]/50 rounded-2xl p-6 text-center bg-black/30 transition cursor-pointer relative backdrop-blur-sm">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="space-y-2">
                  <FilePlus className="w-8 h-8 text-[#c89d42] mx-auto" />
                  <p className="text-xs font-bold text-slate-200">
                    {uploadedFileName ? `Attached: ${uploadedFileName} (${uploadedFileSize})` : 'Click or Drag & Drop material file here'}
                  </p>
                  <p className="text-[10px] text-slate-400">Supports PDF, Word Documents, Plain Text</p>
                </div>
              </div>
            </div>

            {/* Submit for Review Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                <span>Submit for Review</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDENT ASSIGNMENT REVIEW & GRADING MODAL */}
      {/* ========================================================================= */}
      {selectedStudentSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                    {selectedStudentSub.courseOrUnit}
                  </span>
                  {getStatusBadge(selectedStudentSub.status)}
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-100 mt-1">{selectedStudentSub.assignmentTitle}</h3>
                <p className="text-xs text-slate-400">
                  Student: <strong className="text-slate-200">{selectedStudentSub.studentName}</strong> ({selectedStudentSub.studentEmail}) &bull; {selectedStudentSub.institution || 'Faculty of Law'}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentSub(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              {selectedStudentSub.submissionNotes && (
                <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1.5">
                  <h4 className="font-bold text-slate-200">Student's Submission Notes:</h4>
                  <p className="leading-relaxed text-slate-300">{selectedStudentSub.submissionNotes}</p>
                </div>
              )}

              {selectedStudentSub.fileName && (
                <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-200 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#c89d42]" />
                      Attached File: {selectedStudentSub.fileName} ({selectedStudentSub.fileSize || 'Standard'})
                    </h4>
                  </div>
                  {selectedStudentSub.fileContent && (
                    <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto p-3 bg-black/40 rounded-xl border border-white/10">
                      {selectedStudentSub.fileContent}
                    </pre>
                  )}
                </div>
              )}

              {/* Grading and Feedback Form */}
              <div className="p-5 bg-black/30 rounded-2xl border border-[#c89d42]/30 space-y-4 backdrop-blur-sm">
                <h4 className="font-heading font-bold text-sm text-[#c89d42] flex items-center gap-2">
                  <Award className="w-4 h-4" /> Faculty Evaluation & Feedback
                </h4>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Assigned Grade / Score</label>
                  <input
                    type="text"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    placeholder="e.g. 88% (A) / First Class / Distinction"
                    className="w-full bg-[#18181c] border border-white/10 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#c89d42]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Detailed Feedback for Student</label>
                  <textarea
                    rows={3}
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Provide constructive commentary, statutory references, or guidance for the student..."
                    className="w-full bg-[#18181c] border border-white/10 text-slate-100 text-xs rounded-xl p-3.5 focus:outline-none focus:border-[#c89d42]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedStudentSub(null)}
                className="px-4 py-2.5 bg-white/[0.05] hover:bg-white/10 text-slate-400 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  disabled={isReviewing}
                  onClick={() => handleReviewStudentAssignment('REQUEST_CHANGES')}
                  className="px-4 py-2.5 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Request Corrections</span>
                </button>
                <button
                  disabled={isReviewing}
                  onClick={() => handleReviewStudentAssignment('REJECT')}
                  className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  disabled={isReviewing}
                  onClick={() => handleReviewStudentAssignment('GRADE')}
                  className="px-5 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-lg font-heading cursor-pointer"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Grade & Approve</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PREVIEW SUBMISSION MODAL */}
      {/* ========================================================================= */}
      {previewSubmission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                  {previewSubmission.courseOrUnit} &bull; {previewSubmission.documentType}
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-100 mt-2">{previewSubmission.title}</h3>
                <p className="text-xs text-slate-400">
                  Academic Year: {previewSubmission.academicYear} &bull; Status: {previewSubmission.status}
                </p>
              </div>
              <button
                onClick={() => setPreviewSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-2">
                <h4 className="font-bold text-slate-200">Description:</h4>
                <p className="leading-relaxed">{previewSubmission.description}</p>
              </div>

              {previewSubmission.fileContent && (
                <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-2">
                  <h4 className="font-bold text-slate-200">File Preview ({previewSubmission.fileName}):</h4>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto p-2 bg-black/40 rounded-xl">
                    {previewSubmission.fileContent}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setPreviewSubmission(null)}
                className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/10 text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
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
