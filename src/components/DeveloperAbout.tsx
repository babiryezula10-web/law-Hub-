import React from 'react';
import { DeveloperAvatar } from './DeveloperAvatar';
import {
  Award,
  Sparkles,
  Globe,
  Mail,
  Linkedin,
  Github,
  CheckCircle2,
  Scale,
  GraduationCap,
  Target,
  Compass,
  Lock
} from 'lucide-react';
import { WatermarkBackground } from './WatermarkBackground';

export const DeveloperAbout: React.FC = () => {
  return (
    <div className="relative max-w-4xl mx-auto space-y-10 pb-16 text-slate-100">
      <WatermarkBackground type="cyber_scales" opacity={0.16} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* Hero Banner */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        <div className="flex items-center justify-center gap-2 text-[#c89d42]">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/[0.05] px-3 py-0.5 rounded-full border border-[#c89d42]/30 font-mono backdrop-blur-sm">
            Confidential Administrative Profile
          </span>
        </div>

        <div className="flex justify-center">
          <DeveloperAvatar size="2xl" showBadge={true} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#c89d42] bg-white/[0.05] px-4 py-1.5 rounded-full border border-[#c89d42]/30 font-mono backdrop-blur-sm">
            Founder & Lead Developer of LawHub
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-100">
            Babirye Zula
          </h1>
          <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
            Law Student &bull; LegalTech Innovator &bull; Founder & System Architect
          </p>
          <div className="pt-1 flex items-center justify-center gap-1.5 text-xs text-[#c89d42] font-semibold">
            <GraduationCap className="w-4 h-4 text-[#c89d42]" />
            <span>Gulu University Faculty of Law</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-left bg-black/30 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <p>
            Babirye Zula is a law student at Gulu University with an interest in the intersection between law, technology, and artificial intelligence.
          </p>
          <p>
            LawHub was conceived and engineered to eliminate the fragmentation of primary Ugandan legal sources and empower students with structured IRAC exam methodology, instant statutory access, and faculty coursework collaboration.
          </p>
          <p className="text-[#c89d42] font-semibold pt-1">
            Her vision is to leverage modern educational technology to democratize legal education across Uganda and the East African Community.
          </p>
        </div>

        {/* Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="mailto:babiryezula10@gmail.com"
            className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 hover:text-[#c89d42] hover:border-[#c89d42]/40 text-xs font-semibold transition flex items-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <Mail className="w-4 h-4 text-[#c89d42]" />
            <span>babiryezula10@gmail.com</span>
          </a>
          <div className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-sm">
            <GraduationCap className="w-4 h-4 text-[#c89d42]" />
            <span>Gulu University Faculty of Law</span>
          </div>
        </div>
      </div>

      {/* Profile Card Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Vision */}
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Vision Statement</h3>
              <p className="text-[11px] text-[#c89d42] font-semibold">Transforming Legal Access</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            To use technology to improve access to legal knowledge and empower the next generation of legal professionals in Uganda and beyond through intelligent digital research and structured learning.
          </p>
        </div>

        {/* Card 2: Mission */}
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 text-slate-200 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Platform Mission</h3>
              <p className="text-[11px] text-slate-400 font-semibold">AI Legal Research & Analysis</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            To simplify legal education and research by combining artificial intelligence with verified legal learning resources, helping students understand complex legal concepts and revise effectively in one organized space.
          </p>
        </div>

        {/* Card 3: Educational Background */}
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Educational Background</h3>
              <p className="text-[11px] text-[#c89d42] font-semibold">Gulu University Law Faculty</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Law student at Gulu University focused on constitutional law, civil procedure, land law, and legal artificial intelligence integration.
          </p>
        </div>

        {/* Card 4: Role & Leadership */}
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">Role & Platform Stewardship</h3>
              <p className="text-[11px] text-[#c89d42] font-semibold">Founder and Lead Developer</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            Sole creator, system architect, and legal researcher leading the development of LawHub's AI tutor engine, statutory database indexing, and student examination preparation suite.
          </p>
        </div>

      </div>

    </div>
  );
};

