import React, { useState } from 'react';
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
  X,
  PenTool,
  FileCheck,
  BookMarked,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  target?: string;
  badge?: string | number;
}

interface NavSection {
  id: string;
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
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Structured Information Architecture tailored for the reference screenshot
  const studentSections: NavSection[] = [
    {
      id: 'academic',
      title: 'ACADEMIC PORTAL',
      items: [
        { id: 'dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
        { id: 'landing', label: 'Platform Overview', icon: BookOpen },
      ]
    },
    {
      id: 'coursework',
      title: 'COURSEWORK & EXAMS',
      items: [
        { id: 'courses', label: 'My Courses (32 Units)', icon: GraduationCap, badge: '32' },
        { id: 'assignments', label: 'Submissions & Grades', icon: FileCheck, target: 'dashboard' },
        { id: 'quizzes', label: 'Quizzes & Practice Tests', icon: Calendar },
        { id: 'past_papers', label: 'Past Examination Papers', icon: FileCode },
      ]
    },
    {
      id: 'repository',
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
      id: 'study_tools',
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
    <div className="flex flex-col h-full justify-between py-4 px-3 select-none">
      {/* Brand Header inside Sidebar */}
      <div>
        <div className="flex items-center justify-between px-2 mb-4 pb-3 border-b border-white/[0.06]">
          <AppLogo
            size="sm"
            showText={true}
            textVariant="stacked"
            subtitle="LEGAL EDUCATION"
            onClick={() => handleItemClick('landing')}
          />
          {/* Close button for drawer mode on mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.06] transition cursor-pointer"
            aria-label="Close Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu Items */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-8.5rem)] pr-1 custom-scrollbar">
          {studentSections.map((section) => {
            const isCollapsed = !!collapsedSections[section.id];
            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header with Collapsible Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-slate-200 transition cursor-pointer"
                >
                  <span>{section.title}</span>
                  {isCollapsed ? (
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  ) : (
                    <ChevronUp className="w-3 h-3 text-slate-400" />
                  )}
                </button>

                {/* Section Items */}
                {!isCollapsed && (
                  <div className="space-y-0.5 pt-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isDirectActive = activeTab === item.id;
                      const isTargetActive = item.target && activeTab === item.target && item.id !== 'assignments';
                      const isActive = isDirectActive || isTargetActive;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id, item.target)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isActive
                              ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md'
                              : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive ? 'text-neutral-950' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                                isActive
                                  ? 'bg-neutral-950/20 text-neutral-950'
                                  : 'bg-white/[0.06] text-[#c89d42] border border-[#c89d42]/30'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* FACULTY / LECTURER SECTION */}
          {(isLecturer || isAdmin) && (
            <div className="space-y-1 pt-2 border-t border-white/[0.06]">
              <div className="px-3 py-1 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                <span>FACULTY PORTAL</span>
                <ChevronUp className="w-3 h-3 text-slate-400" />
              </div>
              <button
                id="sidebar-lecturer-dashboard-btn"
                onClick={() => handleItemClick('lecturer-dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'lecturer-dashboard'
                    ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.04]'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="truncate">Lecturer Portal & Grading</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Persistent Left Sidebar for Desktop */}
      <aside className="w-64 bg-[#09090b]/92 backdrop-blur-2xl border-r border-white/[0.08] hidden md:flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
        {renderContent()}
      </aside>

      {/* Slide-out Left Drawer for Mobile/Tablet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0c0c0e]/98 backdrop-blur-2xl border-r border-white/[0.08] text-slate-100 flex flex-col h-full z-10 shadow-2xl animate-in slide-in-from-left duration-300">
            {renderContent()}
          </aside>
        </div>
      )}
    </>
  );
};
