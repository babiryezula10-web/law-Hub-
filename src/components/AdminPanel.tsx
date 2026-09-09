import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Upload,
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  Eye,
  Trash2,
  Edit3,
  Search,
  Filter,
  Plus,
  Building2,
  BookOpen,
  Scale,
  Landmark,
  FileCode,
  Tag,
  Save,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  FilePlus,
  RefreshCw,
  FolderOpen,
  GraduationCap,
  Calendar,
  X,
  Send,
  AlertCircle
} from 'lucide-react';
import {
  UploadedDocument,
  DocumentType,
  AdminMetrics,
  UserProfile,
  UserRole,
  LecturerSubmission,
  SystemUser
} from '../types';
import { AdminPlatformInfo } from './AdminPlatformInfo';
import { WatermarkBackground } from './WatermarkBackground';

export type AdminTabType =
  | 'overview'
  | 'users'
  | 'upload_materials'
  | 'legal_library'
  | 'academic_materials'
  | 'pending_submissions'
  | 'published_materials'
  | 'draft_materials'
  | 'platform_info';

interface AdminPanelProps {
  user: UserProfile;
  initialTab?: AdminTabType;
  onNavigateToTab?: (tab: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  user,
  initialTab = 'overview',
  onNavigateToTab
}) => {
  // Strict RBAC Enforcement
  if (user.role !== 'Administrator') {
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
              The LawHub Administration Suite (<code className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded">/admin</code>) is accessible only to users with the <span className="text-amber-400 font-bold">ADMIN</span> role.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 text-left space-y-1.5">
            <p><strong>Logged-in Account:</strong> {user.name} ({user.email})</p>
            <p><strong>Assigned Role:</strong> <span className="text-amber-400 font-semibold">{user.role}</span></p>
            <p className="text-[11px] text-slate-500 pt-1">
              If you require administrator access, please contact an authorized system administrator to update your account role.
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

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<AdminTabType>(initialTab);

  // Data State
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [submissions, setSubmissions] = useState<LecturerSubmission[]>([]);
  const [studentSubmissions, setStudentSubmissions] = useState<any[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // User Filter Controls
  const [userRoleFilter, setUserRoleFilter] = useState<string>('All');
  const [userSearchQuery, setUserSearchQuery] = useState<string>('');

  // Feedback / Notification
  const [notification, setNotification] = useState<string | null>(null);
  const [errorNotification, setErrorNotification] = useState<string | null>(null);

  // Preview / Review Modal State
  const [selectedSubForView, setSelectedSubForView] = useState<LecturerSubmission | null>(null);
  const [selectedDocForView, setSelectedDocForView] = useState<UploadedDocument | null>(null);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  // User Management Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Student');
  const [newUserInstitution, setNewUserInstitution] = useState('Faculty of Law');

  // Unified Admin Upload Form State
  const adminUploadCategories = [
    'Constitution',
    'Legislation',
    'Cases',
    'Regulations',
    'Lecture Materials',
    'Past Papers',
    'Research Materials',
    'Legal References',
    'Other Academic Materials'
  ];

  const [uploadCategory, setUploadCategory] = useState('Legislation');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCourseOrSubject, setUploadCourseOrSubject] = useState('Constitutional Law');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('Parliament of Uganda');
  const [uploadSource, setUploadSource] = useState('Uganda Legal Information Institute (ULII)');
  const [uploadCitation, setUploadCitation] = useState('');
  const [uploadYear, setUploadYear] = useState('2024');
  const [uploadEdition, setUploadEdition] = useState('Official Gazette Edition');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'PUBLISHED' | 'DRAFT'>('PUBLISHED');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [uploadFileType, setUploadFileType] = useState('');
  const [uploadFileContent, setUploadFileContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const showSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const showError = (msg: string) => {
    setErrorNotification(msg);
    setTimeout(() => setErrorNotification(null), 5000);
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [mRes, sRes, studRes, dRes, uRes] = await Promise.allSettled([
        fetch('/api/admin/metrics'),
        fetch('/api/submissions'),
        fetch('/api/student-submissions'),
        fetch('/api/documents?role=Administrator'),
        fetch('/api/users')
      ]);

      if (mRes.status === 'fulfilled' && mRes.value.ok) setMetrics(await mRes.value.json());
      if (sRes.status === 'fulfilled' && sRes.value.ok) {
        const sData = await sRes.value.json();
        setSubmissions(sData.submissions || []);
      }
      if (studRes.status === 'fulfilled' && studRes.value.ok) {
        const studData = await studRes.value.json();
        setStudentSubmissions(studData.studentSubmissions || []);
      }
      if (dRes.status === 'fulfilled' && dRes.value.ok) {
        const dData = await dRes.value.json();
        setDocuments(dData.documents || []);
      }
      if (uRes.status === 'fulfilled' && uRes.value.ok) {
        const uData = await uRes.value.json();
        setSystemUsers(uData.users || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle File Input for Direct Admin Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      setUploadFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      setUploadFileType(file.type || file.name.split('.').pop()?.toUpperCase() || 'DOCUMENT');

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadFileContent((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    }
  };

  // Direct Admin Upload Handler
  const handleDirectAdminUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadDescription.trim()) {
      showError('Please provide material title and description.');
      return;
    }

    setIsUploading(true);
    try {
      // Map category to standard documentType
      let mappedDocType: DocumentType = 'Legal Resource';
      if (uploadCategory === 'Constitution') mappedDocType = 'Constitution';
      else if (uploadCategory === 'Legislation') mappedDocType = 'Statute';
      else if (uploadCategory === 'Cases') mappedDocType = 'Case Law';
      else if (uploadCategory === 'Regulations') mappedDocType = 'Regulation';
      else if (['Lecture Materials', 'Past Papers', 'Other Academic Materials'].includes(uploadCategory)) {
        mappedDocType = 'Academic Material';
      }

      const payload = {
        title: uploadTitle,
        documentType: mappedDocType,
        category: uploadCategory,
        description: uploadDescription,
        authorOrInstitution: uploadAuthor,
        source: uploadSource,
        citation: uploadCitation,
        year: Number(uploadYear) || new Date().getFullYear(),
        edition: uploadEdition,
        fileName: uploadFileName,
        fileSize: uploadFileSize,
        fileType: uploadFileType,
        fileContent: uploadFileContent,
        tags: uploadTags.split(',').map((t) => t.trim()).filter(Boolean),
        status: uploadStatus
      };

      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showSuccess(`Material "${uploadTitle}" uploaded directly to LawHub Library as ${uploadStatus}.`);
        setUploadTitle('');
        setUploadDescription('');
        setUploadCitation('');
        setUploadTags('');
        setUploadFileName('');
        setUploadFileSize('');
        setUploadFileContent('');
        loadAllData();
        setActiveTab(uploadStatus === 'PUBLISHED' ? 'published_materials' : 'draft_materials');
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to upload material.');
      }
    } catch (err) {
      showError('Network error during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  // Lecturer Submission Review Actions
  const handleReviewSubmission = async (id: string, action: 'APPROVE' | 'REJECT' | 'DELETE', feedback?: string) => {
    try {
      const payload = {
        action,
        feedback: feedback || '',
        reviewerName: user.name || 'Chief Legal Administrator'
      };

      const res = await fetch(`/api/submissions/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (action === 'APPROVE') {
          showSuccess('Submission APPROVED and published to LawHub Student Library.');
        } else if (action === 'REJECT') {
          showSuccess('Submission REJECTED. It will not appear in the student library.');
        } else if (action === 'DELETE') {
          showSuccess('Submission permanently deleted from system.');
        }
        setSelectedSubForView(null);
        setFeedbackInput('');
        loadAllData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to process review action.');
      }
    } catch (err) {
      showError('Network error while updating submission.');
    }
  };

  // User Role Management Handler
  const handleUpdateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        showSuccess(`User role successfully changed to ${newRole}.`);
        loadAllData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to update user role.');
      }
    } catch (err) {
      showError('Error updating user role.');
    }
  };

  // User Status (Activate / Suspend) Toggle Handler
  const handleToggleUserStatus = async (userToToggle: SystemUser) => {
    const nextStatus = userToToggle.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      const res = await fetch(`/api/users/${userToToggle.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        showSuccess(`User ${userToToggle.name}'s account status set to ${nextStatus}.`);
        loadAllData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to update user status.');
      }
    } catch (err) {
      showError('Error updating user status.');
    }
  };

  // Create New User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showError('Please enter user name and email address.');
      return;
    }
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          institution: newUserInstitution,
          status: 'ACTIVE'
        })
      });
      if (res.ok) {
        showSuccess(`User account created with ${newUserRole} role.`);
        setNewUserName('');
        setNewUserEmail('');
        setIsAddUserModalOpen(false);
        loadAllData();
      } else {
        const err = await res.json();
        showError(err.error || 'Failed to create user account.');
      }
    } catch (err) {
      showError('Error creating user.');
    }
  };

  // Delete User
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user from the system?')) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        showSuccess('User account removed.');
        loadAllData();
      }
    } catch (err) {
      showError('Error deleting user.');
    }
  };

  // Toggle Document Status (Publish / Draft)
  const handleToggleDocStatus = async (doc: UploadedDocument) => {
    const nextStatus = doc.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await fetch(`/api/admin/documents/${doc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        showSuccess(`Material status updated to ${nextStatus}.`);
        loadAllData();
      }
    } catch (err) {
      showError('Error updating material status.');
    }
  };

  // Delete Document
  const handleDeleteDoc = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this material?')) return;
    try {
      const res = await fetch(`/api/admin/documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showSuccess('Material deleted from repository.');
        loadAllData();
      }
    } catch (err) {
      showError('Error deleting document.');
    }
  };

  // Filtered lists
  const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING_REVIEW');
  const publishedDocs = documents.filter((d) => d.status === 'PUBLISHED');
  const draftDocs = documents.filter((d) => d.status === 'DRAFT');

  const legalLibraryDocs = documents.filter((d) =>
    ['Constitution', 'Statute', 'Regulation', 'Statutory Instrument', 'Case Law', 'Legal Resource'].includes(d.documentType) ||
    ['Constitution', 'Legislation', 'Cases', 'Regulations', 'Legal References'].includes(d.category)
  );

  const academicMaterialsDocs = documents.filter((d) =>
    ['Academic Material', 'Past Paper', 'Lecture Notes', 'Assignment', 'Reading Materials'].includes(d.documentType) ||
    ['Lecture Materials', 'Past Papers', 'Research Materials', 'Other Academic Materials'].includes(d.category)
  );

  return (
    <div className="relative space-y-8 pb-16 text-slate-100">
      <WatermarkBackground type="seal" opacity={0.16} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Success Alert */}
      {notification && (
        <div className="relative z-10 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-in fade-in backdrop-blur-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[#c89d42]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorNotification && (
        <div className="relative z-10 bg-rose-950/30 border border-rose-800/40 text-rose-300 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-in fade-in backdrop-blur-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{errorNotification}</span>
        </div>
      )}

      {/* Admin Dashboard Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
              <ShieldCheck className="w-7 h-7" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-100">
                  Admin Dashboard
                </h1>
                <span className="px-2.5 py-0.5 bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[10px] font-bold rounded-md uppercase font-mono backdrop-blur-sm">
                  ADMIN SECURE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Centralized management for user roles, lecturer submissions approval, legal library, and direct uploads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={loadAllData}
              className="p-2.5 bg-black/30 border border-white/10 hover:border-[#c89d42]/40 text-slate-300 rounded-xl transition cursor-pointer backdrop-blur-sm"
              title="Refresh Data Store"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Prominent "+ Upload Material" Button */}
            <button
              id="admin-upload-material-btn"
              onClick={() => setActiveTab('upload_materials')}
              className="px-4 py-2.5 bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-md font-heading cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Upload Material</span>
            </button>
          </div>
        </div>

        {/* Admin Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-black/30 p-2 rounded-2xl border border-white/10 text-xs font-semibold overflow-x-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'users' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Manage Users ({systemUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('upload_materials')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'upload_materials' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload Materials
          </button>
          <button
            onClick={() => setActiveTab('legal_library')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'legal_library' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" /> Manage Legal Library ({legalLibraryDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('academic_materials')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'academic_materials' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Academic Materials ({academicMaterialsDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('pending_submissions')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'pending_submissions' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Pending Submissions
            {pendingSubmissions.length > 0 && (
              <span className="px-1.5 py-0.2 bg-[#c89d42] text-neutral-950 text-[10px] font-extrabold rounded-full ml-1">
                {pendingSubmissions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('published_materials')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'published_materials' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Published ({publishedDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('draft_materials')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'draft_materials' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Drafts ({draftDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('platform_info')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'platform_info' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md' : 'text-[#c89d42] hover:text-[#dfb858]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Architecture & Developer Profile
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. OVERVIEW TAB */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
              <p className="text-2xl font-black text-slate-100">{systemUsers.length}</p>
              <p className="text-[10px] text-slate-500">Students, Lecturers & Admins</p>
            </div>
            <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-2xl space-y-1 bg-amber-500/5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Pending Submissions</span>
              <p className="text-2xl font-black text-amber-400">{pendingSubmissions.length}</p>
              <p className="text-[10px] text-amber-300/70">Awaiting Admin Approval</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Published Library</span>
              <p className="text-2xl font-black text-emerald-400">{publishedDocs.length}</p>
              <p className="text-[10px] text-emerald-300/70">Live for all students</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Draft Materials</span>
              <p className="text-2xl font-black text-slate-300">{draftDocs.length}</p>
              <p className="text-[10px] text-slate-500">In-progress items</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Legal Library</span>
              <p className="text-2xl font-black text-slate-100">{legalLibraryDocs.length}</p>
              <p className="text-[10px] text-slate-500">Statutes, SIs, Precedents</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Materials</span>
              <p className="text-2xl font-black text-slate-100">{academicMaterialsDocs.length}</p>
              <p className="text-[10px] text-slate-500">Lectures, Notes, Papers</p>
            </div>
          </div>

          {/* Pending Submissions Quick Action Box */}
          {pendingSubmissions.length > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <h3 className="font-heading font-bold text-lg text-slate-100">
                    {pendingSubmissions.length} Pending Lecturer Submission{pendingSubmissions.length > 1 ? 's' : ''} Require Attention
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('pending_submissions')}
                  className="px-3.5 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-400 transition"
                >
                  Review All Submissions
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingSubmissions.slice(0, 2).map((sub, idx) => (
                  <div key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {sub.courseOrUnit}
                        </span>
                        <h4 className="font-bold text-sm text-slate-100 mt-1 line-clamp-1">{sub.title}</h4>
                        <p className="text-xs text-slate-400">By {sub.lecturerName} ({sub.institution || 'Faculty of Law'})</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-slate-900">
                      <button
                        onClick={() => setSelectedSubForView(sub)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg transition"
                      >
                        VIEW
                      </button>
                      <button
                        onClick={() => handleReviewSubmission(sub.id, 'APPROVE')}
                        className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-xs font-bold rounded-lg border border-emerald-500/30 transition"
                      >
                        APPROVE
                      </button>
                      <button
                        onClick={() => handleReviewSubmission(sub.id, 'REJECT')}
                        className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-slate-950 text-xs font-bold rounded-lg border border-red-500/30 transition"
                      >
                        REJECT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Shortcuts to Admin Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => setActiveTab('users')}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 cursor-pointer transition group"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-100">Manage System Users</h3>
              <p className="text-xs text-slate-400">
                View registered users, reassign roles (STUDENT, LECTURER, ADMIN), and manage faculty permissions.
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">Open User Management &rarr;</span>
            </div>

            <div
              onClick={() => setActiveTab('upload_materials')}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 cursor-pointer transition group"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-100">Direct Admin Upload</h3>
              <p className="text-xs text-slate-400">
                Publish Constitution, legislation, cases, regulations, lecture materials and past exam papers directly to the repository.
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">Upload New Materials &rarr;</span>
            </div>

            <div
              onClick={() => setActiveTab('legal_library')}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 cursor-pointer transition group"
            >
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-100">Manage Legal Library</h3>
              <p className="text-xs text-slate-400">
                Edit, categorize, publish or delete statutory instruments, case laws, and legislative enactments.
              </p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">Manage Legal Documents &rarr;</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MANAGE USERS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">User Role & Account Management</h2>
              <p className="text-xs text-slate-400 mt-1">
                Distinguish between students, lecturers, and administrators, modify roles in real time, and toggle account activation status.
              </p>
            </div>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add System User
            </button>
          </div>

          {/* User Filtering & Search Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            {/* Role Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'All', label: 'All Users', count: systemUsers.length },
                { id: 'Student', label: 'Students', count: systemUsers.filter((u) => u.role === 'Student').length },
                { id: 'Lecturer', label: 'Lecturers', count: systemUsers.filter((u) => u.role === 'Lecturer').length },
                { id: 'Administrator', label: 'Admins', count: systemUsers.filter((u) => u.role === 'Administrator').length }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setUserRoleFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    userRoleFilter === pill.id
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      userRoleFilter === pill.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name, email, faculty..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">User Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Role Assignment</th>
                    <th className="px-6 py-4">Account Status</th>
                    <th className="px-6 py-4">Date Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {systemUsers
                    .filter((u) => {
                      const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
                      const matchesSearch =
                        userSearchQuery === '' ||
                        u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                        (u.institution && u.institution.toLowerCase().includes(userSearchQuery.toLowerCase()));
                      return matchesRole && matchesSearch;
                    })
                    .map((u, idx) => (
                      <tr key={u.id ? `${u.id}-${u.email}-${idx}` : `usr-${idx}`} className="hover:bg-slate-800/40 transition">
                        <td className="px-6 py-4 font-bold text-slate-100">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
                                u.role === 'Administrator'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : u.role === 'Lecturer'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span>{u.name}</span>
                                {u.role === 'Administrator' && (
                                  <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
                                    ADMIN
                                  </span>
                                )}
                                {u.role === 'Lecturer' && (
                                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-semibold">
                                    FACULTY
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 font-normal">{u.institution || 'Faculty of Law'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-300">{u.email}</td>
                        <td className="px-6 py-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUserRole(u.id, e.target.value as UserRole)}
                            className={`bg-slate-950 border text-xs rounded-xl px-3 py-1.5 font-bold focus:outline-none transition cursor-pointer ${
                              u.role === 'Administrator'
                                ? 'border-emerald-500/50 text-emerald-400'
                                : u.role === 'Lecturer'
                                ? 'border-amber-500/50 text-amber-400'
                                : 'border-slate-700 text-slate-300'
                            }`}
                          >
                            <option value="Student">STUDENT</option>
                            <option value="Lecturer">LECTURER</option>
                            <option value="Administrator">ADMIN</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleUserStatus(u)}
                            title="Click to toggle Account Status"
                            className={`px-3 py-1 text-[10px] font-bold rounded-full border transition flex items-center gap-1.5 ${
                              u.status === 'SUSPENDED'
                                ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-emerald-500/20 hover:text-emerald-300'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-red-500/20 hover:text-red-300'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'SUSPENDED' ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
                            <span>{u.status || 'ACTIVE'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{u.joinedDate || 'Recent'}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. UPLOAD MATERIALS (ADMIN DIRECT UPLOAD) */}
      {/* ========================================================================= */}
      {activeTab === 'upload_materials' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                <Upload className="w-6 h-6" />
              </span>
              <div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                  Direct Material Upload (Administrator)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload legal and academic materials directly to the LawHub repository with immediate publication.
                </p>
              </div>
            </div>

            <form onSubmit={handleDirectAdminUpload} className="space-y-6">
              {/* Category Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Material Category <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {adminUploadCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setUploadCategory(cat)}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-left ${
                        uploadCategory === cat
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Material Title *</label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. Land Act Cap 227 / Criminal Procedure Lecture Notes"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Course / Subject Field</label>
                  <input
                    type="text"
                    value={uploadCourseOrSubject}
                    onChange={(e) => setUploadCourseOrSubject(e.target.value)}
                    placeholder="e.g. Constitutional Law / Commercial Law / Civil Procedure"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Description & Summary *</label>
                <textarea
                  required
                  rows={4}
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Provide an overview, key provisions, topics covered, or ratio decidendi..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl p-4 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Author, Source, Citation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Author / Institution</label>
                  <input
                    type="text"
                    value={uploadAuthor}
                    onChange={(e) => setUploadAuthor(e.target.value)}
                    placeholder="e.g. Parliament of Uganda / Judiciary / Dr. Apollo Mukasa"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Source / Gazette Ref</label>
                  <input
                    type="text"
                    value={uploadSource}
                    onChange={(e) => setUploadSource(e.target.value)}
                    placeholder="e.g. Uganda Gazette / ULII / Law Faculty"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Citation / Cap No.</label>
                  <input
                    type="text"
                    value={uploadCitation}
                    onChange={(e) => setUploadCitation(e.target.value)}
                    placeholder="e.g. [2004] UGSC 1 / Cap 227"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              {/* File Attachment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Attach Document File (PDF, DOCX, TXT)</label>
                <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center bg-slate-950/60 transition cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.doc,.txt"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-2">
                    <FilePlus className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-xs font-bold text-slate-200">
                      {uploadFileName ? `Attached: ${uploadFileName} (${uploadFileSize})` : 'Click or Drag & Drop material file here'}
                    </p>
                    <p className="text-[10px] text-slate-500">Supports PDF, Word Documents, Plain Text</p>
                  </div>
                </div>
              </div>

              {/* Tags & Publication Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    placeholder="e.g. Constitution, Supreme Court, Land Law, Revision"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Initial Status</label>
                  <select
                    value={uploadStatus}
                    onChange={(e) => setUploadStatus(e.target.value as 'PUBLISHED' | 'DRAFT')}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none"
                  >
                    <option value="PUBLISHED">PUBLISHED (Visible immediately to students)</option>
                    <option value="DRAFT">DRAFT (Saved internally)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{uploadStatus === 'PUBLISHED' ? 'Publish Directly to LawHub Library' : 'Save as Draft Material'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MANAGE LEGAL LIBRARY TAB */}
      {/* ========================================================================= */}
      {activeTab === 'legal_library' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">Manage Legal Library</h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage statutory enactments, case laws, regulations, and constitutional materials in the student research repository.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload_materials')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> + Upload Legal Document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalLibraryDocs.map((doc, idx) => (
              <div key={doc.id ? `${doc.id}-${idx}` : `legaldoc-${idx}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {doc.documentType} &bull; {doc.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-100">{doc.title}</h3>
                    <p className="text-xs text-slate-400">{doc.authorOrInstitution} &bull; {doc.citation || 'Official Enactment'}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    doc.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{doc.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDocForView(doc)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-lg transition"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => handleToggleDocStatus(doc)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-amber-400 rounded-lg transition font-semibold"
                    >
                      {doc.status === 'PUBLISHED' ? 'Unpublish (Draft)' : 'Publish to Students'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MANAGE ACADEMIC MATERIALS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'academic_materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">Manage Academic Materials</h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage published and draft lecture notes, course modules, tutorial problem sets, and past examination papers.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload_materials')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> + Upload Academic Material
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicMaterialsDocs.map((doc, idx) => (
              <div key={doc.id ? `${doc.id}-${idx}` : `acad-${idx}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {doc.category || 'Academic Material'}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-100">{doc.title}</h3>
                    <p className="text-xs text-slate-400">By {doc.authorOrInstitution}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                    doc.status === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{doc.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDocForView(doc)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-lg transition"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => handleToggleDocStatus(doc)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-amber-400 rounded-lg transition font-semibold"
                    >
                      {doc.status === 'PUBLISHED' ? 'Make Draft' : 'Publish to Students'}
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. PENDING LECTURER SUBMISSIONS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'pending_submissions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">
                Pending Lecturer Submissions ({pendingSubmissions.length})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Submissions from verified university lecturers awaiting administrative review. Approve to publish to student library or Reject.
              </p>
            </div>
          </div>

          {pendingSubmissions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto opacity-70" />
              <h3 className="font-heading font-bold text-lg text-slate-200">No Pending Submissions</h3>
              <p className="text-xs text-slate-400">All submitted materials have been reviewed and processed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map((sub, idx) => (
                <div key={sub.id ? `${sub.id}-${idx}` : `sub-${idx}`} className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold rounded-md">
                          {sub.courseOrUnit} &bull; {sub.documentType}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-md">
                          AY {sub.academicYear}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-slate-100 mt-1.5">{sub.title}</h3>
                      <p className="text-xs text-slate-400">
                        Submitted by <strong className="text-slate-200">{sub.lecturerName}</strong> ({sub.lecturerEmail}) &bull; {sub.institution || 'Faculty of Law'}
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1.5 self-start lg:self-auto">
                      <Clock className="w-3.5 h-3.5" /> PENDING REVIEW
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    {sub.description}
                  </p>

                  {sub.fileName && (
                    <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/5 px-3 py-2 rounded-xl border border-amber-500/10 w-fit">
                      <FileText className="w-4 h-4" />
                      <span>Attachment: {sub.fileName} ({sub.fileSize || 'Attached'})</span>
                    </div>
                  )}

                  {/* 4 Required Action Buttons: VIEW, APPROVE, REJECT, DELETE */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => setSelectedSubForView(sub)}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> VIEW
                    </button>

                    <button
                      onClick={() => handleReviewSubmission(sub.id, 'APPROVE')}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> APPROVE (PUBLISH)
                    </button>

                    <button
                      onClick={() => handleReviewSubmission(sub.id, 'REJECT')}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-slate-950 text-xs font-bold rounded-xl border border-red-500/30 transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" /> REJECT
                    </button>

                    <button
                      onClick={() => handleReviewSubmission(sub.id, 'DELETE')}
                      className="px-4 py-2 bg-slate-950 hover:bg-red-900/40 text-slate-400 hover:text-red-300 text-xs font-bold rounded-xl border border-slate-800 transition flex items-center gap-1.5 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. PUBLISHED MATERIALS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'published_materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">
                Published Materials ({publishedDocs.length})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Materials currently active and accessible to all students across the LawHub curriculum and research engine.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload_materials')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> + Upload New Material
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publishedDocs.map((doc, idx) => (
              <div key={doc.id ? `${doc.id}-${idx}` : `pub-${idx}`} className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5 space-y-3 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {doc.documentType} &bull; {doc.category}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full">
                    LIVE
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-100 line-clamp-1">{doc.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{doc.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => setSelectedDocForView(doc)}
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-lg transition"
                  >
                    VIEW
                  </button>
                  <button
                    onClick={() => handleToggleDocStatus(doc)}
                    className="px-3 py-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    Move to Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DRAFT MATERIALS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'draft_materials' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-100">
                Draft Materials ({draftDocs.length})
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Materials saved internally that have not yet been published to the student body.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('upload_materials')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" /> + Create New Draft
            </button>
          </div>

          {draftDocs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-2">
              <FolderOpen className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">No draft materials found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftDocs.map((doc, idx) => (
                <div key={doc.id ? `${doc.id}-${idx}` : `draft-${idx}`} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {doc.documentType} &bull; {doc.category}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full">
                      DRAFT
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100 line-clamp-1">{doc.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{doc.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => setSelectedDocForView(doc)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 rounded-lg transition"
                    >
                      VIEW
                    </button>
                    <button
                      onClick={() => handleToggleDocStatus(doc)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                    >
                      Publish Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. PLATFORM INFORMATION / DEVELOPER PROFILE (ADMIN ONLY) */}
      {/* ========================================================================= */}
      {activeTab === 'platform_info' && <AdminPlatformInfo />}

      {/* ========================================================================= */}
      {/* MODAL: VIEW LECTURER SUBMISSION */}
      {/* ========================================================================= */}
      {selectedSubForView && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {selectedSubForView.courseOrUnit} &bull; {selectedSubForView.documentType}
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-100 mt-2">{selectedSubForView.title}</h3>
                <p className="text-xs text-slate-400">
                  Submitted by {selectedSubForView.lecturerName} ({selectedSubForView.lecturerEmail}) &bull; AY {selectedSubForView.academicYear}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubForView(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-200">Description / Abstract:</h4>
                <p className="leading-relaxed">{selectedSubForView.description}</p>
              </div>

              {selectedSubForView.fileContent && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200">File Content Preview ({selectedSubForView.fileName}):</h4>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto p-2 bg-slate-900/50 rounded-xl">
                    {selectedSubForView.fileContent}
                  </pre>
                </div>
              )}

              {selectedSubForView.tags && selectedSubForView.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSubForView.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleReviewSubmission(selectedSubForView.id, 'APPROVE')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" /> APPROVE (PUBLISH)
              </button>
              <button
                onClick={() => handleReviewSubmission(selectedSubForView.id, 'REJECT')}
                className="px-4 py-2.5 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-slate-950 text-xs font-bold rounded-xl border border-red-500/30 transition flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> REJECT
              </button>
              <button
                onClick={() => handleReviewSubmission(selectedSubForView.id, 'DELETE')}
                className="px-4 py-2.5 bg-slate-950 hover:bg-red-900/40 text-slate-400 hover:text-red-300 text-xs font-bold rounded-xl border border-slate-800 transition flex items-center gap-1.5 ml-auto"
              >
                <Trash2 className="w-4 h-4" /> DELETE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VIEW DOCUMENT PREVIEW */}
      {/* ========================================================================= */}
      {selectedDocForView && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {selectedDocForView.documentType} &bull; {selectedDocForView.category}
                </span>
                <h3 className="font-heading font-bold text-xl text-slate-100 mt-2">{selectedDocForView.title}</h3>
                <p className="text-xs text-slate-400">
                  {selectedDocForView.authorOrInstitution} &bull; {selectedDocForView.source}
                </p>
              </div>
              <button
                onClick={() => setSelectedDocForView(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-200">Description:</h4>
                <p className="leading-relaxed">{selectedDocForView.description}</p>
              </div>

              {selectedDocForView.citation && (
                <p className="text-xs font-mono text-amber-400 bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                  Citation: {selectedDocForView.citation}
                </p>
              )}

              {selectedDocForView.fileContent && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-200">File Text Preview:</h4>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto p-2 bg-slate-900/50 rounded-xl">
                    {selectedDocForView.fileContent}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedDocForView(null)}
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD SYSTEM USER */}
      {/* ========================================================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-slate-100">Create System User</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Dr. Apollo Mukasa"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. apollo.mukasa@lawhub.ug"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">System Role *</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none"
                >
                  <option value="Student">STUDENT</option>
                  <option value="Lecturer">LECTURER</option>
                  <option value="Administrator">ADMIN</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Institution / Faculty</label>
                <input
                  type="text"
                  value={newUserInstitution}
                  onChange={(e) => setNewUserInstitution(e.target.value)}
                  placeholder="e.g. Gulu University Faculty of Law"
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 text-slate-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
