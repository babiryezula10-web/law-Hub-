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
  Home,
  Settings
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
          bg: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
          icon: ShieldCheck
        };
      case 'Lecturer':
        return {
          label: 'LECTURER',
          bg: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
          icon: BookOpen
        };
      default:
        return {
          label: 'STUDENT',
          bg: 'border-amber-500/30 bg-amber-500/5 text-amber-200/90',
          icon: GraduationCap
        };
    }
  };

  const roleBadge = getRoleBadge();
  const RoleIcon = roleBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-[#09090b]/92 backdrop-blur-2xl border-b border-white/[0.08] transition-colors">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-6">
        
        {/* Left Side: Hamburger Menu & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSidebarDrawer}
            className="p-2 rounded-xl text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] transition border border-white/10 focus:outline-none cursor-pointer"
            aria-label="Open Navigation Drawer"
            title="Toggle Sidebar Navigation"
          >
            <Menu className="w-5 h-5 text-slate-300 hover:text-[#c89d42] transition-colors" />
          </button>

          <AppLogo
            size="sm"
            showText={true}
            textVariant="stacked"
            subtitle="LEGAL EDUCATION"
            onClick={() => onSelectTab('landing')}
          />
        </div>

        {/* Global Search Bar (Pill Shape matching reference screenshot) */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2.5 bg-black/40 hover:bg-black/60 text-slate-400 hover:text-slate-200 px-4 py-2 rounded-full border border-white/10 hover:border-[#c89d42]/40 transition text-xs w-[240px] lg:w-[280px] xl:w-[340px] shadow-inner cursor-pointer backdrop-blur-md"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="flex-1 text-left text-slate-400 truncate text-[11px]">
            Search Constitution, Cases, Acts...
          </span>
          <kbd className="text-[9px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-amber-300/80 border border-white/10">
            ⌘K
          </kbd>
        </button>

        {/* Top Navigation Links with Icons & Gold Underline Accent */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium">
          <button
            onClick={() => onSelectTab('landing')}
            className={`px-3 py-1.5 flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'text-[#c89d42] font-bold border-b-2 border-[#c89d42] bg-white/[0.03]'
                : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#c89d42]" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectTab('constitution')}
            className={`px-3 py-1.5 flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'constitution'
                ? 'text-[#c89d42] font-bold border-b-2 border-[#c89d42] bg-white/[0.03]'
                : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c89d42]" />
            <span>1995 Constitution</span>
          </button>

          <button
            onClick={() => onSelectTab('tutor')}
            className={`px-3 py-1.5 flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tutor'
                ? 'text-[#c89d42] font-bold border-b-2 border-[#c89d42] bg-white/[0.03]'
                : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c89d42]" />
            <span>AI Tutor</span>
          </button>

          <button
            onClick={() => onSelectTab('research')}
            className={`px-3 py-1.5 flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'research'
                ? 'text-[#c89d42] font-bold border-b-2 border-[#c89d42] bg-white/[0.03]'
                : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c89d42]" />
            <span>Library</span>
          </button>

          <button
            onClick={() => onSelectTab('courses')}
            className={`px-3 py-1.5 flex items-center gap-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'text-[#c89d42] font-bold border-b-2 border-[#c89d42] bg-white/[0.03]'
                : 'text-slate-300 hover:text-[#c89d42] hover:bg-white/[0.05]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#c89d42]" />
            <span>Courses</span>
          </button>
        </nav>

        {/* Right Side: Role Badge & Account Profile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Watermark Ambience Theme Switcher Button */}
          {onOpenWatermarkGallery && (
            <button
              onClick={onOpenWatermarkGallery}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#c89d42]/50 text-slate-300 hover:text-[#c89d42] transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Change Background Watermark Ambience"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c89d42]" />
              <span className="hidden xl:inline text-[11px]">Ambience</span>
            </button>
          )}

          {/* Role Pill Badge */}
          <button
            onClick={() => onOpenAuth('login')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-bold transition hover:border-[#c89d42]/60 cursor-pointer shadow-sm ${roleBadge.bg}`}
            title="Authenticated System Role (Click to switch account)"
          >
            <RoleIcon className="w-3.5 h-3.5 text-[#c89d42]" />
            <span>{roleBadge.label}</span>
          </button>

          {/* User Profile / Auth Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 py-1 px-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#c89d42]/40 transition cursor-pointer backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-[#c89d42] font-bold text-xs shadow-sm">
                <User className="w-3.5 h-3.5 text-[#c89d42]" />
              </div>
              <span className="text-xs font-semibold text-slate-200 hidden sm:block max-w-[130px] truncate">
                {user.name}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Account Menu Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#121216]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-white/10">
                  <p className="font-bold text-slate-100 truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate font-mono">{user.email || 'No email registered'}</p>
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

                {/* Role Specific Shortcuts */}
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
                    onOpenAuth('edit_profile');
                  }}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Account Settings
                </button>

                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    onOpenAuth('login');
                  }}
                  className="w-full text-left px-4 py-2 text-slate-300 hover:bg-white/[0.06] hover:text-[#c89d42] flex items-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4 text-[#c89d42]" /> Switch Account / Sign In
                </button>

                <div className="border-t border-white/10 my-1"></div>
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
