import React from 'react';
import { AppLogo } from './AppLogo';
import {
  LayoutDashboard,
  GraduationCap,
  Scale,
  Landmark,
  FileText,
  Gavel,
  BookOpen,
  FileCode,
  Sparkles,
  Calendar,
  Download,
  Bookmark,
  Shield,
  X,
  PenTool,
  FileCheck,
  BookMarked
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  target?: string;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string, subTab?: string) => void;
  isAdmin: boolean;
  userRole?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isAdmin,
  userRole = 'Student',
  isOpen = false,
  onClose = () => {}
}) => {
  const isLecturer = userRole === 'Lecturer' || userRole === 'Administrator';

  // Structured Information Architecture tailored for a real Legal LMS
  const studentSections: NavSection[] = [
    {
      title: 'ACADEMIC PORTAL',
      items: [
        { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
        { id: 'landing', label: 'Platform Overview', icon: BookOpen },
      ]
    },
    {
      title: 'COURSEWORK & EXAMS',
      items: [
        { id: 'courses', label: 'My Courses (32 Units)', icon: GraduationCap },
        { id: 'assignments', label: 'Submissions & Grades', icon: FileCheck, target: 'dashboard' },
        { id: 'quizzes', label: 'Quizzes & Practice Tests', icon: Calendar },
        { id: 'past_papers', label: 'Past Examination Papers', icon: FileCode },
      ]
    },
    {
      title: 'LEGAL REPOSITORY',
      items: [
        { id: 'constitution', label: '1995 Constitution (19 Chs)', icon: Landmark },
        { id: 'research', label: 'Legal Library & Search', icon: Scale },
        { id: 'statutes', label: 'Acts & Statutes', icon: FileText, target: 'research' },
        { id: 'caselaw', label: 'Landmark Precedents', icon: Gavel, target: 'research' },
        { id: 'blacks_law', label: "Black's Law Dictionary", icon: BookMarked, target: 'research' },
      ]
    },
    {
      title: 'STUDY TOOLS',
      items: [
        { id: 'tutor', label: 'AI Legal Tutor (IRAC)', icon: Sparkles },
        { id: 'drafting', label: 'Legal Drafting Tool', icon: PenTool },
        { id: 'notes', label: 'Saved Notes & Bookmarks', icon: Bookmark },
        { id: 'downloads', label: 'Offline Study Packs', icon: Download },
      ]
    }
  ];

  const handleItemClick = (id: string, target?: string) => {
    if (target) {
      onSelectTab(target);
    } else {
      onSelectTab(id);
    }
    onClose();
  };

  const renderContent = () => (
    <div className="flex flex-col h-full justify-between py-4 px-3">
      {/* Brand Header inside Sidebar */}
      <div>
        <div className="flex items-center justify-between px-2 mb-4">
          <AppLogo
            size="sm"
            showText={true}
            textVariant="stacked"
            subtitle="LEGAL EDUCATION"
            onClick={() => handleItemClick('landing')}
          />
          {/* Close button for drawer mode */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#0e172a] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

          {/* Scrollable Navigation Menu Items */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-13.5rem)] pr-1 custom-scrollbar">
          {studentSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-500">
                {section.title}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isDirectActive = activeTab === item.id;
                const isTargetActive = item.target && activeTab === item.target && item.id !== 'assignments';
                const isActive = isDirectActive || isTargetActive;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id, item.target)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#c89d42] text-neutral-950 shadow-md font-bold'
                        : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-neutral-950' : 'text-slate-400 group-hover:text-[#c89d42]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* FACULTY / LECTURER SECTION */}
          {isLecturer && (
            <div className="space-y-1 pt-2 border-t border-white/[0.08]">
              <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-[#c89d42]">
                FACULTY PORTAL
              </div>
              <button
                id="sidebar-lecturer-dashboard-btn"
                onClick={() => handleItemClick('lecturer-dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'lecturer-dashboard'
                    ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md'
                    : 'text-slate-200 hover:text-[#c89d42] hover:bg-white/[0.05] border border-white/[0.08]'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span className="truncate">Lecturer Portal & Grading</span>
              </button>
            </div>
          )}

          {/* ADMINISTRATION SECTION */}
          {isAdmin && (
            <div className="space-y-1 pt-2 border-t border-white/[0.08]">
              <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                SYSTEM ADMINISTRATION
              </div>
              <button
                id="sidebar-admin-dashboard-btn"
                onClick={() => handleItemClick('admin')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'admin'
                    ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md'
                    : 'text-slate-200 hover:text-[#c89d42] hover:bg-white/[0.05] border border-white/[0.08]'
                }`}
              >
                <Shield className="w-4 h-4 shrink-0" />
                <span className="truncate">Admin Console</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Quick Action Card */}
      <div className="pt-3 mt-auto border-t border-white/10 px-2 space-y-2">
        <div className="p-3 bg-white/[0.04] border border-white/10 rounded-2xl text-center space-y-1.5 backdrop-blur-md">
          <div className="flex items-center justify-center gap-1.5 text-[#c89d42] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal Assistant</span>
          </div>
          <p className="text-[10px] text-slate-300">IRAC case analysis & statutory tutor</p>
          <button
            onClick={() => handleItemClick('tutor')}
            className="w-full py-1.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-extrabold text-[11px] transition shadow-sm cursor-pointer"
          >
            Launch Tutor
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Persistent Left Sidebar for Desktop */}
      <aside className="w-64 bg-[#0c0c0e]/85 backdrop-blur-xl border-r border-white/[0.08] hidden md:flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </aside>

      {/* Slide-out Left Drawer for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0e0e11]/95 backdrop-blur-2xl border-r border-white/[0.08] text-slate-100 flex flex-col h-full z-10 shadow-2xl animate-in slide-in-from-left duration-300">
            {renderContent()}
          </aside>
        </div>
      )}
    </>
  );
};
