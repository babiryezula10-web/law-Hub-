import React from 'react';
import developerPhoto from '../assets/images/developer_profile_portrait_1786648391041.jpg';
import {
  ShieldCheck,
  GraduationCap,
  Scale,
  Sparkles,
  Target,
  Compass,
  Mail,
  Building2,
  Server,
  Code,
  CheckCircle2,
  Layers,
  Database,
  Lock
} from 'lucide-react';

export const AdminPlatformInfo: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-slate-100">
      
      {/* Header Banner */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[#c89d42]">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-[#c89d42]/30 font-mono backdrop-blur-sm">
            Confidential Administrative Information
          </span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-100">
          Platform Architecture & Engineering Credentials
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl">
          Platform stewardship, developer credentials, institutional affiliation, and system architecture specifications. Restricted exclusively to authenticated administrators.
        </p>
      </div>

      {/* Developer & Founder Profile Card */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/10 text-center sm:text-left">
          
          {/* Portrait with Gold Border */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#c89d42] via-[#dfb858] to-[#997328] shadow-xl shrink-0">
            <img
              src={developerPhoto}
              alt="Babirye Zula - LawHub Creator"
              className="w-full h-full object-cover object-top rounded-[inherit]"
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[11px] font-bold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder & Lead Developer</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-slate-100">Babirye Zula</h3>
            <p className="text-xs font-semibold text-slate-300">
              Law Student &bull; LegalTech Innovator &bull; Creator of LawHub
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-[#c89d42]" />
                <strong>Institution:</strong> Gulu University Faculty of Law
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-[#c89d42]" />
                <strong>Contact:</strong> babiryezula10@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Biography */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/30 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <h4 className="font-heading font-bold text-sm text-slate-100">Background & Platform Genesis</h4>
          <p>
            <strong className="text-slate-100">Babirye Zula</strong> is a law student at <strong className="text-[#c89d42]">Gulu University</strong> with a focus on constitutional law, civil litigation, and the integration of artificial intelligence into legal scholarship.
          </p>
          <p>
            LawHub was conceived and engineered to eliminate the fragmentation of primary Ugandan legal sources and empower students with structured IRAC exam methodology, instant statutory access, and faculty coursework collaboration.
          </p>
          <p className="text-[#c89d42] font-medium">
            Her vision is to leverage modern educational technology to democratize legal education across Uganda and the East African Community.
          </p>
        </div>

        {/* Strategic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#c89d42] font-bold">
              <Compass className="w-4 h-4" />
              <span>Core Mission</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Simplify legal research and exam preparation by bridging primary constitutional sources with AI-assisted learning.
            </p>
          </div>

          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Target className="w-4 h-4 text-[#c89d42]" />
              <span>Academic Ownership</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Designed as an open, standardized legal education platform for university law faculties and judicial research.
            </p>
          </div>
        </div>
      </div>

      {/* System & Architecture Specifications */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 text-slate-100 font-heading font-extrabold text-lg">
          <Server className="w-5 h-5 text-[#c89d42]" />
          <span>System & Technology Specifications</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Backend Engine</span>
            <span className="font-bold text-slate-200">Express + Vite SSR (Port 3000)</span>
            <p className="text-[11px] text-slate-400">RESTful coursework and role endpoints</p>
          </div>

          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Intelligence</span>
            <span className="font-bold text-[#c89d42]">@google/genai (Gemini 2.5)</span>
            <p className="text-[11px] text-slate-400">IRAC legal reasoning & ratio extraction</p>
          </div>

          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Access Control</span>
            <span className="font-bold text-slate-200">Role-Based Access Control</span>
            <p className="text-[11px] text-slate-400">Student &bull; Lecturer &bull; Administrator</p>
          </div>
        </div>

        <div className="p-4 bg-black/30 rounded-2xl border border-white/10 text-xs text-slate-400 space-y-1 backdrop-blur-sm">
          <p className="font-bold text-slate-200">Administrative Privacy Enforcement:</p>
          <p>
            This section is protected and accessible only inside the Administrator portal. All public screens, student workspaces, and lecturer dashboards operate in an authoritative, neutral institutional design.
          </p>
        </div>
      </div>

    </div>
  );
};

