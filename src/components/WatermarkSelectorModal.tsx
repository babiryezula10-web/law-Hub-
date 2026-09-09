import React from 'react';
import {
  X,
  Sparkles,
  Sliders,
  Check,
  Eye,
  Layers,
  Image as ImageIcon,
  Monitor,
  Maximize2
} from 'lucide-react';
import { WatermarkType, WATERMARK_THEMES } from './WatermarkBackground';

interface WatermarkSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWatermark: WatermarkType;
  onSelectWatermark: (type: WatermarkType) => void;
  opacity: number;
  onChangeOpacity: (val: number) => void;
  isAutoCycle: boolean;
  onToggleAutoCycle: () => void;
}

export const WatermarkSelectorModal: React.FC<WatermarkSelectorModalProps> = ({
  isOpen,
  onClose,
  currentWatermark,
  onSelectWatermark,
  opacity,
  onChangeOpacity,
  isAutoCycle,
  onToggleAutoCycle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn text-slate-100">
      <div
        className="relative w-full max-w-4xl bg-[#09090b]/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#c89d42]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-heading font-extrabold text-slate-100 flex items-center gap-2">
                  Legal Ambience Watermark Gallery
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#c89d42]/20 text-[#c89d42] border border-[#c89d42]/40">
                  ★ Corinthian Pillars Chosen as Best
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Select your preferred legal background watermark displayed across all LawHub pages.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectWatermark('classic_watermark')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-bold font-heading shadow-md transition cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Use Best Watermark</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls Bar: Opacity slider & Auto-Cycle toggle */}
        <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          {/* Opacity Control */}
          <div className="flex items-center gap-4 flex-1 min-w-[260px]">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#c89d42]" />
              Watermark Intensity:
            </span>
            <input
              type="range"
              min="0.03"
              max="0.30"
              step="0.01"
              value={opacity}
              onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
              className="flex-1 accent-[#c89d42] cursor-pointer h-2 bg-black/60 rounded-lg"
            />
            <span className="text-xs font-mono font-bold text-[#c89d42] min-w-[36px]">
              {Math.round(opacity * 100)}%
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {[
              { label: 'Subtle', val: 0.06 },
              { label: 'Standard', val: 0.12 },
              { label: 'Vivid', val: 0.20 },
              { label: 'Cinematic', val: 0.26 }
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => onChangeOpacity(p.val)}
                className={`px-2.5 py-1 text-[11px] rounded-xl border transition cursor-pointer backdrop-blur-sm ${
                  Math.abs(opacity - p.val) < 0.02
                    ? 'bg-[#c89d42] text-neutral-950 font-bold border-[#c89d42]'
                    : 'bg-black/30 text-slate-300 border-white/10 hover:border-[#c89d42]/50 hover:bg-white/[0.05]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Auto-cycle toggle */}
          <button
            onClick={onToggleAutoCycle}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition cursor-pointer backdrop-blur-sm ${
              isAutoCycle
                ? 'bg-white/[0.08] text-[#c89d42] border-[#c89d42]/50 font-bold'
                : 'bg-black/30 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {isAutoCycle ? 'Auto-Cycle Active (per tab)' : 'Enable Tab Auto-Cycle'}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 custom-scrollbar">
          {WATERMARK_THEMES.map((theme) => {
            const isSelected = currentWatermark === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectWatermark(theme.id);
                }}
                className={`relative group rounded-2xl overflow-hidden text-left border transition-all duration-300 flex flex-col justify-between p-3.5 cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'border-[#c89d42] bg-slate-900/70 ring-2 ring-[#c89d42]/40 shadow-lg shadow-amber-500/5 scale-[1.02]'
                    : 'border-white/10 bg-slate-950/40 hover:border-[#c89d42]/50 hover:bg-slate-900/50'
                }`}
              >
                {/* Thumbnail Preview */}
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-black/40 mb-3 flex items-center justify-center border border-white/10 group-hover:border-white/20">
                  {theme.src ? (
                    <img
                      src={theme.src}
                      alt={theme.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/30 text-[#c89d42]/60">
                      <Sparkles className="w-8 h-8" />
                    </div>
                  )}

                  {/* Best badge */}
                  {theme.isBest && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#c89d42] text-neutral-950 text-[9px] font-extrabold uppercase tracking-wider font-heading shadow-md z-10 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      <span>Best Choice</span>
                    </div>
                  )}

                  {/* Selected checkmark badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#c89d42] text-neutral-950 flex items-center justify-center shadow-md z-10">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <span className="absolute bottom-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded bg-black/80 text-[#c89d42] border border-[#c89d42]/30 uppercase backdrop-blur-sm">
                    {theme.category === 'image' ? 'HD Watermark' : 'Vector Emblem'}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-100 group-hover:text-[#c89d42] transition-colors line-clamp-1">
                    {theme.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between backdrop-blur-md">
          <span className="text-xs text-slate-400">
            Current active watermark: <span className="font-bold text-[#c89d42]">{WATERMARK_THEMES.find(t => t.id === currentWatermark)?.name}</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 text-xs font-heading font-bold transition cursor-pointer shadow-md"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
