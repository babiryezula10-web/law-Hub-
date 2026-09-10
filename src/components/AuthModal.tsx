import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  AlertCircle,
  RefreshCw,
  KeyRound,
  BookOpen,
  ArrowRight,
  Scale,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { WatermarkBackground } from './WatermarkBackground';
import { UserProfile, UserRole } from '../types';
import { authService } from '../services/authService';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Student');
  const [institution, setInstitution] = useState('Faculty of Law');
  const [securityCode, setSecurityCode] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorNotification, setErrorNotification] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDemoGuide, setShowDemoGuide] = useState<boolean>(false);
  const [showGoogleDialog, setShowGoogleDialog] = useState<boolean>(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // Keep mode synchronized with prop changes
  useEffect(() => {
    setMode(initialMode);
    setErrorNotification(null);
    setNotification(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Safe testing credentials list (Only populates the input fields, does NOT bypass authentication)
  const demoPresets = [
    {
      role: 'Student' as UserRole,
      title: 'Law Student Scholar',
      email: 'student@lawhub.ug',
      pass: 'Student@2025!',
      desc: 'Standard LLB student research & quizzes',
      badge: 'Student'
    },
    {
      role: 'Lecturer' as UserRole,
      title: 'Faculty Lecturer (Dr. Mukasa)',
      email: 'apollo.mukasa@lawhub.ug',
      pass: 'Faculty@2025!',
      desc: 'Coursework grading & publishing',
      badge: 'Faculty'
    },
    {
      role: 'Administrator' as UserRole,
      title: 'Chief Legal Administrator',
      email: 'admin@lawhub.ug',
      pass: 'Admin@LawHub2025!',
      desc: 'System oversight & security management',
      badge: 'Admin'
    }
  ];

  const handleFillCredentials = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    setErrorNotification(null);
    setNotification('Credentials filled into login form. Click "Sign In to Account" to authenticate.');
  };

  const handleGoogleSignInClick = () => {
    setErrorNotification(null);
    // Check if Google Client ID is configured for automated Google GIS One-Tap
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const gWindow = window as any;

    if (googleClientId && gWindow.google?.accounts?.id) {
      try {
        gWindow.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            if (response.credential) {
              setIsLoading(true);
              const result = await authService.loginWithGoogle({ credential: response.credential });
              if (result.success && result.user) {
                onLogin(result.user.email, result.user.name, result.user.role);
                setNotification(`Welcome, ${result.user.name}! Authenticated with Google.`);
                setTimeout(() => {
                  setNotification(null);
                  onClose();
                }, 600);
              } else {
                setErrorNotification(result.error || 'Google authentication failed.');
              }
              setIsLoading(false);
            }
          }
        });
        gWindow.google.accounts.id.prompt();
        return;
      } catch (err) {
        console.warn('Google GIS prompt failed, opening fallback dialog:', err);
      }
    }

    // Default seamless Google sign-in dialog
    setGoogleEmail(user.email && user.email.includes('@gmail.com') ? user.email : 'student.scholar@gmail.com');
    setGoogleName(user.name && user.name !== 'Student Scholar' ? user.name : 'Legal Scholar');
    setShowGoogleDialog(true);
  };

  const handleConfirmGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setErrorNotification('Please provide a valid Google email.');
      return;
    }

    setIsLoading(true);
    setErrorNotification(null);
    try {
      const result = await authService.loginWithGoogle({
        profile: {
          email: googleEmail.trim().toLowerCase(),
          name: googleName.trim() || googleEmail.split('@')[0],
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
        }
      });

      if (result.success && result.user) {
        setShowGoogleDialog(false);
        onLogin(result.user.email, result.user.name, result.user.role);
        setNotification(`Signed in with Google as ${result.user.name}.`);
        setTimeout(() => {
          setNotification(null);
          onClose();
        }, 600);
      } else {
        setErrorNotification(result.error || 'Google Sign-In failed.');
      }
    } catch (err) {
      setErrorNotification('Network error during Google authentication.');
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
          setErrorNotification('Please enter your email address.');
          setIsLoading(false);
          return;
        }

        if (!password) {
          setErrorNotification('Please enter your password.');
          setIsLoading(false);
          return;
        }

        const result = await authService.login(email, password);

        if (result.success && result.user) {
          onLogin(result.user.email, result.user.name, result.user.role);
          setNotification(`Welcome back, ${result.user.name}! Verified ${result.user.role} role.`);
          setTimeout(() => {
            setNotification(null);
            onClose();
          }, 600);
        } else {
          setErrorNotification(result.error || 'Authentication failed. Please verify your credentials.');
        }
      } else if (mode === 'signup') {
        if (!name.trim() || !email.trim()) {
          setErrorNotification('Please provide both your full name and email address.');
          setIsLoading(false);
          return;
        }

        if (!password || password.length < 8) {
          setErrorNotification('Password must be at least 8 characters in length.');
          setIsLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setErrorNotification('Passwords do not match. Please re-enter your password.');
          setIsLoading(false);
          return;
        }

        if (role === 'Administrator') {
          setErrorNotification('Administrator accounts cannot be registered publicly.');
          setIsLoading(false);
          return;
        }

        if (role === 'Lecturer' && !securityCode.trim()) {
          setErrorNotification('Faculty Verification Key is required for Lecturer accounts (Use FACULTY-2025).');
          setIsLoading(false);
          return;
        }

        const result = await authService.register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          securityCode: securityCode.trim(),
          institution: institution.trim() || 'Faculty of Law'
        });

        if (result.success && result.user) {
          onSignUp({
            name: result.user.name,
            email: result.user.email,
            institution: result.user.institution,
            role: result.user.role
          });
          setNotification(`Account provisioned successfully with verified ${result.user.role} role! Redirecting...`);
          setTimeout(() => {
            setNotification(null);
            onClose();
          }, 700);
        } else {
          setErrorNotification(result.error || 'Registration failed.');
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
      setErrorNotification('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#141418]/95 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-100 max-h-[92vh] overflow-y-auto overflow-hidden backdrop-blur-2xl">
        <WatermarkBackground type="cyber_scales" opacity={0.15} blendMode="normal" withVignette={false} withGradientOverlay={false} />
        
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
          <div className="w-13 h-13 rounded-2xl bg-[#c89d42] mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10 text-neutral-950">
            <Scale className="w-6 h-6 stroke-[2.4]" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            {mode === 'login' && 'Sign In to LawHub'}
            {mode === 'signup' && 'Create LawHub Account'}
            {mode === 'edit_profile' && 'Account Credentials & Profile'}
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {mode === 'login' && 'Enter your credentials or continue with Google to access your legal workspace.'}
            {mode === 'signup' && 'Register your verified academic profile for legal research and coursework.'}
            {mode === 'edit_profile' && 'Manage your verified institutional credentials and platform settings.'}
          </p>
        </div>

        {/* Continue with Google Sign-In Button (For Login and Signup) */}
        {mode !== 'edit_profile' && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignInClick}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/30 text-slate-100 font-semibold text-xs transition flex items-center justify-center gap-3 cursor-pointer shadow-sm group disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                <span className="bg-[#141418] px-3">or continue with email</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {notification && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {errorNotification && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center gap-2 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorNotification}</span>
          </div>
        )}

        {/* Primary Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {(mode === 'signup' || mode === 'edit_profile') && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Full Legal Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user.name || 'e.g. Babirye Zula'}
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
                placeholder="e.g. student@lawhub.ug"
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
              />
            </div>
          </div>

          {mode !== 'edit_profile' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300">Password *</label>
                {mode === 'signup' && (
                  <span className="text-[10px] text-slate-400">Min 8 characters</span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-black/30 border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-slate-100 focus:outline-none focus:border-[#c89d42] backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#c89d42] absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

              {/* Security Key requirement for Faculty Lecturer */}
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
                    Faculty key protects lecturer grading, student evaluation, and publishing controls.
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
                  placeholder="e.g. Faculty of Law, Makerere University"
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
                  {user.role === 'Administrator' ? 'Full administrative & platform privileges' :
                   user.role === 'Lecturer' ? 'Faculty review & grading privileges' :
                   'Student research & learning privileges'}
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

        {/* Expandable Testing Credentials Guide (Non-bypass, fills inputs for secure verification) */}
        {mode === 'login' && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowDemoGuide(!showDemoGuide)}
              className="w-full text-[11px] text-slate-400 hover:text-[#c89d42] flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#c89d42]" />
                <span>Testing credentials guide</span>
              </div>
              {showDemoGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDemoGuide && (
              <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-[11px] animate-fadeIn">
                <p className="text-[10px] text-slate-400">
                  Select a test account below to populate credentials into the login form. Real password verification will be performed:
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {demoPresets.map((acc) => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleFillCredentials(acc.email, acc.pass)}
                      className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#c89d42]/40 text-left flex items-center justify-between transition cursor-pointer group"
                    >
                      <div>
                        <div className="font-bold text-slate-200 flex items-center gap-2">
                          <span>{acc.title}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-[#c89d42] border border-[#c89d42]/20 font-mono">
                            {acc.badge}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">{acc.email}</div>
                      </div>
                      <span className="text-[10px] text-[#c89d42] group-hover:underline">Fill Form</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer Mode Switching */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
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
              <span>Already registered?</span>
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
              onClick={async () => {
                await authService.logout();
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

      {/* Google Sign-In Confirmation Dialog */}
      {showGoogleDialog && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181c] border border-white/15 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <h3 className="font-bold text-sm text-slate-100">Sign in with Google</h3>
              </div>
              <button
                onClick={() => setShowGoogleDialog(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Continue to LawHub with your Google account:
            </p>

            <form onSubmit={handleConfirmGoogleAuth} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-300">Google Account Name</label>
                <input
                  type="text"
                  required
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full mt-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300">Google Email Address</label>
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full mt-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleDialog(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Authorize Google Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
