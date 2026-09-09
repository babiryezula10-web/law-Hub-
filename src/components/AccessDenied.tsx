import React from 'react';
import { ShieldAlert, KeyRound, ArrowLeft, Lock } from 'lucide-react';
import { UserRole } from '../types';

interface AccessDeniedProps {
  requiredRole: string;
  currentRole: UserRole;
  onOpenAuth: () => void;
  onReturnToDashboard: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  requiredRole,
  currentRole,
  onOpenAuth,
  onReturnToDashboard
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-black/50 border border-white/10 rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl backdrop-blur-2xl text-slate-100">
        
        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-950/20">
          <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title and Message */}
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            Access Restricted
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            This administrative area is restricted to authenticated <strong className="text-slate-200">{requiredRole}</strong> accounts.
          </p>
        </div>

        {/* Role Status Pill */}
        <div className="p-3 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            Your Current Role:
          </span>
          <span className="px-2.5 py-0.5 rounded-full font-mono font-bold bg-white/[0.06] text-[#c89d42] border border-[#c89d42]/30 text-[11px]">
            {currentRole}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#09090b] font-heading font-extrabold text-xs tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <KeyRound className="w-4 h-4 stroke-[2.5]" />
            <span>Sign In with {requiredRole} Account</span>
          </button>

          <button
            onClick={onReturnToDashboard}
            className="w-full py-2.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold text-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Student Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};
