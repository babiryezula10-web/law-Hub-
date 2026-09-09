import React from 'react';
import { Download, FileText, Scale, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { WatermarkBackground } from './WatermarkBackground';

export const DownloadsHub: React.FC = () => {
  const downloadItems = [
    {
      title: '1995 Constitution of Uganda (Annotated Full Text)',
      size: '2.4 MB',
      type: 'PDF Document',
      desc: 'Complete text of Chapters I to XXVIII with Constitutional Court precedent citations.'
    },
    {
      title: 'LDC Civil Procedure Rules & Orders Quick Guide',
      size: '1.8 MB',
      type: 'Revision Guide',
      desc: 'Summary of Civil Procedure Rules Cap 71, High Court execution rules, and motion templates.'
    },
    {
      title: 'Ugandan Law Examinations & Past Papers Bundle (2018 - 2024)',
      size: '12.5 MB',
      type: 'PDF Archive',
      desc: '120+ examination papers covering Constitutional, Criminal, Land, Contract & Commercial Law.'
    },
    {
      title: 'Ugandan Land Act Cap 227 & Marriage Act Statutory Compendium',
      size: '3.1 MB',
      type: 'Statute Book',
      desc: 'Full codified text of statutory consent provisions, customary tenure rules, and land registration regulations.'
    }
  ];

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="gavel" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />

      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
            <Download className="w-5 h-5" />
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-slate-100">
            LawHub Offline Downloads Hub
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Download essential Ugandan legal study materials, statutory compilations, and past paper bundles directly to your device for offline revision.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadItems.map((item, idx) => (
          <div key={idx} className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 hover:border-[#c89d42]/40 transition shadow-lg flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30 font-mono">
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.size}</span>
              </div>
              <h3 className="font-bold text-base text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>

            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(`${item.title}\n\nDownloaded from LawHub Uganda.\n${item.desc}`)}`}
              download={`${item.title.replace(/\s+/g, '_')}.txt`}
              className="w-full py-2.5 rounded-2xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md font-heading cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Material</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
