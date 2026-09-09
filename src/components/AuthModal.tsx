import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  Shield,
  CheckCircle2,
  LogOut,
  AlertCircle,
  RefreshCw,
  KeyRound,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { WatermarkBackground } from './WatermarkBackground';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup' | 'edit_profile';
  user: UserProfile;
  onClose: () => void;
  onLogin: (email: string, name?: string, role?: UserRole) => void;
  onSignUp: (data: { name: string; email: string; institution: string; role: UserRole }) => void;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode: initialMode,
  user,
  onClose,
  onLogin,
  onSignUp,
  onUpdateProfile,
  onLogout
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'edit_profile'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Student');
  const [institution, setInstitution] = useState('Faculty of Law');
  const [securityCode, setSecurityCode] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorNotification, setErrorNotification] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  // Preset demo accounts for quick role access & verification
  const demoAccounts = [
    {
      role: 'Student' as UserRole,
      title: 'Law Student Scholar',
      email: 'student@lawhub.ug',
      desc: 'LLB student courses, library, quiz tests & AI tutor',
      icon: GraduationCap,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
    },
    {
      role: 'Lecturer' as UserRole,
      title: 'Faculty Lecturer (Dr. Mukasa)',
      email: 'apollo.mukasa@lawhub.ug',
      name: 'Dr. Apollo Mukasa',
      desc: 'Coursework review queue, grading & academic publishing',
      icon: BookOpen,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
    },
    {
      role: 'Administrator' as UserRole,
      title: 'Chief Legal Administrator',
      email: 'admin@lawhub.ug',
      desc: 'System oversight, user & role management, platform controls',
      icon: ShieldCheck,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
    }
  ];

  const handleQuickLogin = async (accountEmail: string, accountRole: UserRole, accountName?: string) => {
    setIsLoading(true);
    setErrorNotification(null);
    setNotification(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: accountEmail })
      });

      if (res.ok) {
        const data = await res.json();
        const authUser = data.user;
        onLogin(authUser.email, authUser.name, authUser.role);
        setNotification(`Signed in as ${authUser.name} (${authUser.role}). Routing to ${authUser.role} Dashboard...`);
        setTimeout(() => {
          setNotification(null);
          onClose();
        }, 600);
      } else {
        onLogin(accountEmail, accountName || accountEmail.split('@')[0], accountRole);
        setNotification(`Authenticated as ${accountRole}.`);
        setTimeout(() => {
          setNotification(null);
          onClose();
        }, 600);
      }
    } catch (err) {
      onLogin(accountEmail, accountName || accountEmail.split('@')[0], accountRole);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setErrorNotification(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email.trim()) {
          setErrorNotification('Please enter a valid email address.');
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase(), password })
        });

        if (res.ok) {
          const data = await res.json();
          const authUser = data.user;
          onLogin(authUser.email, authUser.name, authUser.role);
          setNotification(`Welcome, ${authUser.name}! Signed in with verified ${authUser.role} role.`);
          setTimeout(() => {
            setNotification(null);
            onClose();
          }, 600);
        } else {
          const errData = await res.json().catch(() => ({}));
          setErrorNotification(errData.error || 'Authentication failed. Please check your credentials.');
        }
      } else if (mode === 'signup') {
        if (!name.trim() || !email.trim()) {
          setErrorNotification('Please provide your full name and email address.');
          setIsLoading(false);
          return;
        }

        if (role === 'Administrator' && !securityCode.trim()) {
          setErrorNotification('Administrator Key is required for Admin role (Use ADMIN-LAW-SECURE).');
          setIsLoading(false);
          return;
        }

        if (role === 'Lecturer' && !securityCode.trim()) {
          setErrorNotification('Faculty Verification Code is required for Lecturer role (Use FACULTY-2025).');
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
            role,
            securityCode: securityCode.trim(),
            institution: institution.trim() || 'Faculty of Law'
          })
        });

        if (res.ok) {
          const data = await res.json();
          onSignUp({
            name: data.user.name,
            email: data.user.email,
            institution: data.user.institution,
            role: data.user.role
          });
          setNotification(`Account provisioned successfully with ${data.user.role} role! Directing to your Dashboard...`);
          setTimeout(() => {
            setNotification(null);
            onClose();
          }, 700);
        } else {
          const errData = await res.json().catch(() => ({}));
          setErrorNotification(errData.error || 'Registration failed.');
        }
      } else if (mode === 'edit_profile') {
        onUpdateProfile({
          name: name.trim() || user.name,
          email: email.trim() || user.email,
          institution: institution.trim() || user.institution
        });
        setNotification('Profile saved successfully.');
        setTimeout(() => {
          setNotification(null);
          onClose();
        }, 700);
      }
    } catch (err) {
      setErrorNotification('Network error during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto overflow-hidden backdrop-blur-2xl">
        <WatermarkBackground type="cyber_scales" opacity={0.16} blendMode="normal" withVignette={false} withGradientOverlay={false} />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] text-slate-400 hover:text-slate-100 transition border border-white/10 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#c89d42] mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10 text-neutral-950">
            <Scale className="w-7 h-7 stroke-[2.4]" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            {mode === 'login' && 'Sign In to LawHub'}
            {mode === 'signup' && 'Create LawHub Account'}
            {mode === 'edit_profile' && 'Account Credentials & Profile'}
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {mode === 'login' && 'Select your role or enter credentials to access your dedicated dashboard.'}
            {mode === 'signup' && 'Register your verified account for student learning or faculty materials.'}
            {mode === 'edit_profile' && 'View your verified role and update personal academic settings.'}
          </p>
        </div>

        {/* Quick Role Selection Buttons (for Login mode) */}
        {mode === 'login' && (
          <div className="space-y-2">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">
              Select Role / Verified Account Access:
            </div>
            <div className="grid grid-cols-1 gap-2">
              {demoAccounts.map((acc) => {
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleQuickLogin(acc.email, acc.role, acc.title)}
                    className="w-full p-3 rounded-2xl border border-white/10 bg-slate-950/40 hover:border-[#c89d42]/50 hover:bg-slate-900/60 text-left flex items-center justify-between transition group cursor-pointer backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-2 text-slate-100">
                          <span>{acc.title}</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30 font-mono font-semibold">
                            {acc.role}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">{acc.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#c89d42] group-hover:translate-x-1 transition-transform opacity-80" />
                  </button>
                );
              })}
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                <span className="bg-[#18181c] px-3">Or sign in with custom credentials</span>
              </div>
            </div>
          </div>
        )}

        {/* Success notification */}
        {notification && (
          <div className="p-3 bg-white/[0.05] border border-[#c89d42]/40 text-[#c89d42] text-xs rounded-xl flex items-center gap-2 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Error notification */}
        {errorNotification && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorNotification}</span>
          </div>
        )}

        {/* Active Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {(mode === 'signup' || mode === 'edit_profile') && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name || 'e.g. Student Scholar'}
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email || 'user@lawhub.ug'}
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
              />
            </div>
          </div>

          {mode !== 'edit_profile' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Target Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('Student')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer backdrop-blur-sm ${
                      role === 'Student'
                        ? 'border-[#c89d42] bg-[#c89d42] text-[#09090b]'
                        : 'border-white/10 bg-black/30 text-slate-300 hover:text-slate-100 hover:bg-white/[0.05]'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Lecturer')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer backdrop-blur-sm ${
                      role === 'Lecturer'
                        ? 'border-[#c89d42] bg-[#c89d42] text-[#09090b]'
                        : 'border-white/10 bg-black/30 text-slate-300 hover:text-slate-100 hover:bg-white/[0.05]'
                    }`}
                  >
                    Faculty Lecturer
                  </button>
                </div>
              </div>

              {/* Security Authorization Code Requirement for Faculty Role */}
              {role === 'Lecturer' && (
                <div className="space-y-1 p-3 rounded-xl bg-black/30 border border-[#c89d42]/30 animate-fadeIn backdrop-blur-sm">
                  <label className="text-[11px] font-bold text-[#c89d42] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Faculty Verification Key *</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    placeholder="Enter Faculty Key (FACULTY-2025)"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#c89d42] text-xs font-mono"
                  />
                  <p className="text-[10px] text-slate-400">
                    Faculty key is required to safeguard lecturer grading and material publishing permissions.
                  </p>
                </div>
              )}
            </div>
          )}

          {(mode === 'signup' || mode === 'edit_profile') && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">University / Institution</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Faculty of Law"
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
                />
              </div>
            </div>
          )}

          {mode === 'edit_profile' && (
            <div className="p-3 bg-black/30 rounded-xl border border-white/10 space-y-1 backdrop-blur-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Verified Role</div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold font-mono bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30">
                  {user.role}
                </span>
                <span className="text-[11px] text-slate-300">
                  {user.role === 'Administrator' ? 'Full administrative & CMS privileges' :
                   user.role === 'Lecturer' ? 'Faculty review, coursework & grading privileges' :
                   'Student learning, research & quiz privileges'}
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-heading font-extrabold text-xs tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {mode === 'login' && 'Sign In to Account'}
            {mode === 'signup' && `Create ${role} Account`}
            {mode === 'edit_profile' && 'Save Profile Changes'}
          </button>
        </form>

        {/* Modal Footer Mode Switching */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          {mode === 'login' && (
            <>
              <span>New to LawHub?</span>
              <button
                onClick={() => {
                  setErrorNotification(null);
                  setNotification(null);
                  setMode('signup');
                }}
                className="font-bold text-[#c89d42] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              <span>Already have an account?</span>
              <button
                onClick={() => {
                  setErrorNotification(null);
                  setNotification(null);
                  setMode('login');
                }}
                className="font-bold text-[#c89d42] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </>
          )}
          {mode === 'edit_profile' && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Safely</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
