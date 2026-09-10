import React, { useState, useEffect } from 'react';
import {
  Scale,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  User,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { UserRole } from '../types';
import academicHeroImage from '../assets/images/law_academic_hero_1786740467472.jpg';
import lawhubIconSrc from '../assets/images/lawhub_legal_icon_1786648056843.jpg';
import classicWatermarkImage from '../assets/images/classic_legal_watermark_1788970407288.jpg';

interface WelcomeScreenProps {
  onEnter: () => void;
  onNavigate?: (tab: string) => void;
  onLogin?: (email: string, name?: string, role?: UserRole) => void;
  onSignUp?: (data: { name: string; email: string; institution: string; role: UserRole }) => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
  user?: { name: string; email: string; role: UserRole };
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnter,
  onLogin,
  onOpenAuth,
  user
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Constitutional & Case Law Archives...');
  const [isReady, setIsReady] = useState(false);
  const [showQuickAuth, setShowQuickAuth] = useState(false);

  // Smooth loading animation over ~1.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          setStatusText('Ready');
          return 100;
        }
        const next = prev + 10;
        if (next >= 40 && next < 70) {
          setStatusText('Synchronizing 1995 Constitution & Acts...');
        } else if (next >= 70 && next < 95) {
          setStatusText('Preparing Legal Intelligence & Course Modules...');
        } else if (next >= 95) {
          setStatusText('Workspace Ready');
        }
        return next;
      });
    }, 140);

    return () => clearInterval(interval);
  }, []);

  // Automatic smooth transition after progress completes
  useEffect(() => {
    if (isReady && !showQuickAuth) {
      const timer = setTimeout(() => {
        onEnter();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isReady, showQuickAuth, onEnter]);

  const presetRoles = [
    {
      role: 'Student' as UserRole,
      title: 'Law Student Scholar',
      email: 'student@lawhub.ug',
      desc: 'Student courses, constitution, library & AI tutor',
      icon: GraduationCap
    },
    {
      role: 'Lecturer' as UserRole,
      title: 'Faculty Lecturer',
      email: 'apollo.mukasa@lawhub.ug',
      desc: 'Coursework review queue & grading',
      icon: BookOpen
    },
    {
      role: 'Administrator' as UserRole,
      title: 'Legal Administrator',
      email: 'admin@lawhub.ug',
      desc: 'Full system oversight & controls',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#09090b] text-slate-100 flex flex-col items-center justify-between overflow-hidden select-none">
      
      {/* Background Law Image with Subtle Dark Neutral Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={classicWatermarkImage}
          alt="LawHub Legal Platform"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out opacity-35"
        />
        {/* Neutral dark gradient layer for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/80 backdrop-blur-[1.5px]" />
      </div>

      {/* Top Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#c89d42]/40 shadow-lg shadow-amber-950/30 bg-black/40">
            <img
              src={lawhubIconSrc}
              alt="LawHub Emblem"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-heading font-black text-xl tracking-wider text-slate-100">
              LAW<span className="text-[#c89d42]">HUB</span>
            </span>
          </div>
        </div>

        {/* Authentication & Sign-in Trigger */}
        <button
          onClick={() => {
            if (onOpenAuth) {
              onOpenAuth('login');
            } else {
              setShowQuickAuth(!showQuickAuth);
            }
          }}
          className="px-3.5 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-[#c89d42]/40 text-xs font-semibold text-slate-300 hover:text-[#c89d42] transition backdrop-blur-md cursor-pointer flex items-center gap-1.5"
        >
          <KeyRound className="w-3.5 h-3.5 text-[#c89d42]" />
          <span>Sign In / Switch Account</span>
        </button>
      </header>

      {/* Main Center Stage */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 my-auto text-center space-y-6">
        
        {!showQuickAuth ? (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            
            {/* LawHub Legal Crest Emblem */}
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-black/40 border border-[#c89d42]/30 shadow-2xl backdrop-blur-md">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c89d42] to-[#9e7626] flex items-center justify-center shadow-lg text-[#09090b]">
                <Scale className="w-8 h-8 stroke-[2.4]" />
              </div>
            </div>

            {/* Brand Title and Minimal Subtitle */}
            <div className="space-y-2">
              <h1 className="font-heading font-black text-4xl sm:text-5xl tracking-wide text-slate-100 uppercase">
                LAW<span className="text-[#c89d42]">HUB</span>
              </h1>
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#c89d42]/90">
                Legal Research &amp; Academic Repository
              </p>
            </div>

            {/* Loading Animation & Status */}
            <div className="max-w-xs mx-auto space-y-2.5 pt-2">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-[#c89d42] to-[#e6c26e] rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="truncate max-w-[220px]">{statusText}</span>
                <span className="font-bold text-[#c89d42]">{progress}%</span>
              </div>
            </div>

            {/* Immediate Enter Button */}
            <div className="pt-2">
              <button
                onClick={onEnter}
                className="px-8 py-3.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#09090b] font-heading font-black text-xs tracking-wider uppercase transition shadow-xl shadow-amber-950/30 flex items-center gap-2 mx-auto cursor-pointer group"
              >
                <span>Enter LawHub</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            </div>

            {/* Active Session Indicator if logged in */}
            {user && (
              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Signed in as <strong>{user.name}</strong> ({user.role})</span>
              </div>
            )}
          </div>
        ) : (
          /* Secure Account Selection Panel */
          <div className="bg-black/50 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-2xl text-left animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-heading font-extrabold text-xl text-slate-100">Verified Authentication</h2>
              <p className="text-xs text-slate-400">
                To safeguard student records and academic coursework, role access requires verified password authentication or Google Sign-In.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowQuickAuth(false);
                  if (onOpenAuth) onOpenAuth('login');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Account</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowQuickAuth(false);
                  if (onOpenAuth) onOpenAuth('signup');
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 font-semibold text-xs transition text-center cursor-pointer"
              >
                Create New Student Account
              </button>
            </div>

            <button
              onClick={() => setShowQuickAuth(false)}
              className="w-full py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 transition text-center cursor-pointer"
            >
              Back to Welcome Screen
            </button>
          </div>
        )}

      </main>

      {/* Minimal Bottom Legal Bar */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 text-center text-[10px] uppercase font-mono tracking-widest text-slate-300">
        Ugandan Constitutional, Statutory &amp; Judicial Precedent Platform
      </footer>

    </div>
  );
};
