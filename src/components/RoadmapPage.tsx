import React from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  MapPin,
  Mic,
  Camera,
  WifiOff,
  Gavel,
  BrainCircuit,
  Languages,
  Sparkles,
  Clock
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const modules = [
    {
      title: 'Voice AI Legal Lecturer (Audio Tutor)',
      desc: 'Interactive real-time voice conversations with the AI Law Tutor in English and Luganda for hands-free study while commuting.',
      icon: Mic,
      status: 'In Development',
      badge: 'Q3 2025'
    },
    {
      title: 'OCR Legal Document Scanner',
      desc: 'Upload photo scans or PDFs of physical court judgments or textbook pages to extract text, summarize facts, and find cited precedents automatically.',
      icon: Camera,
      status: 'Testing Phase',
      badge: 'Q3 2025'
    },
    {
      title: '100% Offline Progressive Web App (PWA)',
      desc: 'Cache the entire 1995 Constitution, 150 statutes, and personal notes locally so you can research anywhere without active internet data.',
      icon: WifiOff,
      status: 'Ready for Rollout',
      badge: 'Q4 2025'
    },
    {
      title: 'AI Moot Court & Bench Simulator',
      desc: 'Simulate high court and appellate court oral arguments. Receive instant real-time questioning from AI High Court Judges based on your submissions.',
      icon: Gavel,
      status: 'Planned',
      badge: '2026'
    },
    {
      title: 'Bar Exam Question Predictor',
      desc: 'Machine-learning analytics trained on 15 years of Ugandan law school and bar examination past papers to predict high-probability topics.',
      icon: BrainCircuit,
      status: 'Planned',
      badge: '2026'
    },
    {
      title: 'Luganda & Multi-lingual Legal Translator',
      desc: 'Translate complex constitutional rights, land laws, and court procedures into Luganda, Runyankole, Acholi, and Ateso for community paralegal work.',
      icon: Languages,
      status: 'Planned',
      badge: '2026'
    }
  ];

  return (
    <div className="relative space-y-8 pb-12 overflow-hidden text-slate-100">
      <WatermarkBackground type="scales" opacity={0.16} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
            <MapPin className="w-5 h-5" />
          </span>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-100 tracking-wide">
              Future Innovation Roadmap
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              LawHub is continuously expanding with cutting-edge legal technology features designed specifically for the East African legal ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Roadmap Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {modules.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 shadow-lg flex flex-col justify-between group backdrop-blur-md hover:bg-slate-900/50"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 text-[#c89d42] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-[#c89d42]/30">
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">{m.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#c89d42]" /> {m.status}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#c89d42] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Module
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

