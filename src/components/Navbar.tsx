import React, { useState } from 'react';
import {
  Scale,
  Search,
  User,
  Sparkles,
  Menu,
  GraduationCap,
  LogOut,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  KeyRound,
  FileText
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { AppLogo } from './AppLogo';

interface NavbarProps {
  user: UserProfile;
  userRole?: UserRole;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  onOpenSearch?: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup' | 'edit_profile') => void;
  onOpenWatermarkGallery?: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
  onRoleChange?: (role: UserRole) => void;
  onToggleSidebarDrawer?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  userRole = user.role,
  onOpenSearch = () => {},
  onOpenAuth = () => {},
  onOpenWatermarkGallery,
  onSelectTab,
  activeTab,
  onToggleSidebarDrawer = () => {},
  onLogout = () => {}
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getRoleBadge = () => {
    switch (userRole) {
      case 'Administrator':
        return {
          label: 'ADMIN',
          bg: 'bg-[#18181c] border-white/10 text-neutral-200',
          icon: ShieldCheck
        };
      case 'Lecturer':
        return {
          label: 'LECTURER',
          bg: 'bg-[#18181c] border-[#c89d42]/30 text-[#c89d42]',
          icon: BookOpen
        };
      default:
        return {
          label: 'STUDENT',
          bg: 'bg-[#18181c] border-white/10 text-neutral-300',
          icon: GraduationCap
        };
    }
  };

  const roleBadge = getRoleBadge();
  const RoleIcon = roleBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-xl border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Side: Hamburger Menu & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebarDrawer}
            className="p-2 rounded-xl text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] transition border border-white/10 focus:outline-none cursor-pointer"
            aria-label="Open Left Navigation Drawer"
            title="Open Drawer Menu"
          >
            <Menu className="w-5 h-5 text-[#c89d42]" />
          </button>

          <AppLogo
            size="md"
            showText={true}
            subtitle="LEGAL EDUCATION"
            onClick={() => onSelectTab('landing')}
          />
        </div>

        {/* Global Search Bar Trigger */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-white/10 hover:border-[#c89d42]/40 transition text-xs min-w-[260px] lg:min-w-[340px] shadow-sm cursor-pointer backdrop-blur-md"
        >
          <Search className="w-4 h-4 text-[#c89d42]" />
          <span className="flex-1 text-left text-slate-300">Search Constitution, Cases, Acts...</span>
          <kbd className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-amber-300/80 border border-white/10">⌘K</kbd>
        </button>

        {/* Quick Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => onSelectTab('landing')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'landing' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
          >
            Home
          </button>

          {/* Role-Aware Primary Dashboard Nav Link */}
          {userRole === 'Administrator' && (
            <button
              onClick={() => onSelectTab('admin')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'admin' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Console
            </button>
          )}

          {userRole === 'Lecturer' && (
            <button
              onClick={() => onSelectTab('lecturer-dashboard')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'lecturer-dashboard' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Faculty Portal
            </button>
          )}

          {userRole === 'Student' && (
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
            >
              Student Dashboard
            </button>
          )}

          <button
            onClick={() => onSelectTab('constitution')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'constitution' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
          >
            <Scale className="w-3.5 h-3.5" />
            1995 Constitution
          </button>
          <button
            onClick={() => onSelectTab('tutor')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'tutor' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Tutor
          </button>
          <button
            onClick={() => onSelectTab('research')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'research' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
          >
            Legal Library
          </button>
          <button
            onClick={() => onSelectTab('courses')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'courses' ? 'bg-[#c89d42] text-neutral-950 font-bold shadow-sm' : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.06]'}`}
          >
            Courses
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/[0.06] transition cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-[#c89d42]" />
          </button>

          {/* Watermark Ambience Theme Switcher Button */}
          {onOpenWatermarkGallery && (
            <button
              onClick={onOpenWatermarkGallery}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#c89d42]/50 text-slate-300 hover:text-[#c89d42] transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Change Background Watermark Ambience"
            >
              <Sparkles className="w-4 h-4 text-[#c89d42]" />
              <span className="hidden lg:inline text-[11px]">Ambience</span>
            </button>
          )}

          {/* Role Indicator Badge */}
          <button
            onClick={() => onOpenAuth('login')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition hover:border-[#c89d42]/50 cursor-pointer ${roleBadge.bg}`}
            title="Click to switch account or authentication role"
          >
            <RoleIcon className="w-3.5 h-3.5 text-[#c89d42]" />
            <span>{roleBadge.label}</span>
          </button>

          {/* User Profile / Auth Button */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#c89d42]/40 transition cursor-pointer backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#c89d42] to-[#a97e29] flex items-center justify-center shadow-sm">
                <Scale className="w-4 h-4 text-neutral-950 stroke-[2.5]" />
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden md:block max-w-[110px] truncate">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#141418]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-white/10">
                  <p className="font-bold text-slate-100 truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30">
                      <RoleIcon className="w-3 h-3" />
                      {userRole}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {user.institution || 'Faculty of Law'}
                    </span>
                  </div>
                </div>

                {/* Role Specific Destination Links */}
                {userRole === 'Administrator' && (
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSelectTab('admin');
                    }}
                    className="w-full text-left px-4 py-2 text-slate-200 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 font-bold cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#c89d42]" /> Admin Console
                  </button>
                )}

                {userRole === 'Lecturer' && (
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onSelectTab('lecturer-dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-slate-200 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 font-bold cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#c89d42]" /> Lecturer Portal
                  </button>
                )}

                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onSelectTab('dashboard');
                  }}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-[#c89d42]" /> Student Dashboard
                </button>

                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#c89d42]" /> Switch Role / Sign In
                </button>

                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onOpenAuth('edit_profile');
                  }}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" /> Edit Profile & Settings
                </button>

                <div className="border-t border-[#1e293b] my-1"></div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-slate-400 hover:text-rose-300 hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer font-semibold transition"
                >
                  <LogOut className="w-4 h-4 text-rose-400" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
