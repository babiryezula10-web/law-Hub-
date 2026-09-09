import React from 'react';

// Photographic Legal Watermark Assets
import academicHeroImg from '../assets/images/law_academic_hero_1786740467472.jpg';
import lawhubIconImg from '../assets/images/lawhub_legal_icon_1786648056843.jpg';
import classicWatermarkImg from '../assets/images/classic_legal_watermark_1788970407288.jpg';
import goldenTomeImg from '../assets/images/golden_tome_scales_1788970425018.jpg';
import cyberTechScalesImg from '../assets/images/cyber_tech_scales_1788970444766.jpg';
import minimalCourtScalesImg from '../assets/images/minimal_court_scales_1788970486986.jpg';

export type WatermarkType =
  | 'classic_watermark'
  | 'golden_tome'
  | 'cyber_tech_scales'
  | 'minimal_court_scales'
  | 'academic_hero'
  | 'justice_icon'
  | 'cyber_scales'
  | 'scales'
  | 'courthouse'
  | 'constitution'
  | 'books'
  | 'ai_balance'
  | 'seal'
  | 'gavel';

export interface WatermarkBackgroundProps {
  type?: WatermarkType;
  opacity?: number;
  className?: string;
  withVignette?: boolean;
  withGradientOverlay?: boolean;
  blendMode?: 'normal' | 'screen' | 'overlay' | 'lighten' | 'soft-light' | 'luminosity';
  fixed?: boolean;
  scale?: number;
  position?: 'center' | 'top' | 'bottom' | 'right' | 'left';
}

export const WATERMARK_THEMES: {
  id: WatermarkType;
  name: string;
  description: string;
  category: 'image' | 'vector';
  isBest?: boolean;
  src?: string;
}[] = [
  {
    id: 'classic_watermark',
    name: 'Corinthian Pillars & Lady Justice',
    description: 'The Ultimate Legal Watermark: Classical pillars, Lady Justice scales, and quill signing parchment',
    category: 'image',
    isBest: true,
    src: classicWatermarkImg
  },
  {
    id: 'golden_tome',
    name: 'Golden Scales & Open Law Tome',
    description: 'Luminous golden scales of justice balanced atop an open legal treatise in executive chambers',
    category: 'image',
    src: goldenTomeImg
  },
  {
    id: 'cyber_tech_scales',
    name: 'Cybercrime & Digital Law Scales',
    description: 'Bronze scales of justice on reflective circuit board traces symbolizing cyber and technology law',
    category: 'image',
    src: cyberTechScalesImg
  },
  {
    id: 'minimal_court_scales',
    name: 'Solemn Judicial Scales in Light',
    description: 'Dramatic architectural scales on law books illuminated by a diagonal shaft of light',
    category: 'image',
    src: minimalCourtScalesImg
  },
  {
    id: 'academic_hero',
    name: 'Academic Law Library',
    description: 'Classical legal library pillars and jurisprudential archives',
    category: 'image',
    src: academicHeroImg
  },
  {
    id: 'justice_icon',
    name: 'LawHub Golden Crest',
    description: 'Polished gold emblem of constitutional rule of law',
    category: 'image',
    src: lawhubIconImg
  },
  {
    id: 'cyber_scales',
    name: 'Scales of Justice & Equity',
    description: 'Crisp judicial scales emblem watermark',
    category: 'vector'
  },
  {
    id: 'scales',
    name: 'Classic Scales of Justice',
    description: 'Pure geometric vector scales of equity',
    category: 'vector'
  },
  {
    id: 'courthouse',
    name: 'Supreme Court & High Court Facade',
    description: 'Neoclassical courthouse pillars and justice pediment',
    category: 'vector'
  },
  {
    id: 'constitution',
    name: '1995 Constitution Parchment',
    description: 'Ugandan constitutional preamble scroll and seal',
    category: 'vector'
  },
  {
    id: 'books',
    name: 'Law Reports & Judicial Volumes',
    description: 'Classical legal library treatises and law reports stack',
    category: 'vector'
  },
  {
    id: 'ai_balance',
    name: 'Judicial Tech & Neural Balance',
    description: 'AI neural nodes interconnected with judicial balance',
    category: 'vector'
  },
  {
    id: 'seal',
    name: 'Judicial Seal & Crest',
    description: 'Official court seal with laurel wreath',
    category: 'vector'
  },
  {
    id: 'gavel',
    name: 'Judicial Gavel & Sound Block',
    description: 'Authoritative judge gavel and bench sound block',
    category: 'vector'
  }
];

export const WatermarkBackground: React.FC<WatermarkBackgroundProps> = ({
  type = 'classic_watermark',
  opacity = 0.16,
  className = '',
  withVignette = false,
  withGradientOverlay = false,
  blendMode = 'normal',
  fixed = false,
  scale = 1,
  position = 'center'
}) => {
  // Map photographic watermark image sources
  const getImageSource = (t: WatermarkType): string | null => {
    switch (t) {
      case 'classic_watermark':
        return classicWatermarkImg;
      case 'golden_tome':
        return goldenTomeImg;
      case 'cyber_tech_scales':
        return cyberTechScalesImg;
      case 'minimal_court_scales':
        return minimalCourtScalesImg;
      case 'academic_hero':
        return academicHeroImg;
      case 'justice_icon':
        return lawhubIconImg;
      default:
        return null;
    }
  };

  const imageSrc = getImageSource(type);

  // Position mapping
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center',
    bottom: 'items-end justify-center',
    right: 'items-center justify-end',
    left: 'items-center justify-start'
  }[position];

  // Tailor filter based on image characteristics
  const getImageFilter = (t: WatermarkType): string => {
    switch (t) {
      case 'classic_watermark':
        // Warm classical parchment with Lady Justice and Corinthian pillars
        return 'grayscale(25%) contrast(115%) sepia(20%) brightness(92%)';
      case 'golden_tome':
        // Radiant golden scales atop open leather law tome
        return 'grayscale(20%) contrast(120%) brightness(94%)';
      case 'cyber_tech_scales':
        // Bronze scales on reflective digital circuits
        return 'grayscale(35%) contrast(120%) brightness(88%)';
      case 'minimal_court_scales':
        // Dramatic architectural black & white scales in light beam
        return 'grayscale(100%) contrast(130%) brightness(88%)';
      case 'academic_hero':
        return 'grayscale(70%) contrast(110%) brightness(85%)';
      case 'justice_icon':
        return 'grayscale(40%) contrast(115%) brightness(90%)';
      default:
        return 'grayscale(70%) contrast(110%) brightness(90%)';
    }
  };

  return (
    <div
      className={`pointer-events-none ${
        fixed ? 'fixed' : 'absolute'
      } inset-0 overflow-hidden select-none z-0 ${positionClasses} ${className}`}
      aria-hidden="true"
    >
      {/* 1. Photographic Image Watermark */}
      {imageSrc ? (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out"
          style={{ opacity }}
        >
          <img
            src={imageSrc}
            alt="Legal Watermark"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            style={{
              transform: `scale(${scale * 1.05})`,
              mixBlendMode: blendMode,
              filter: getImageFilter(type)
            }}
          />
        </div>
      ) : null}

      {/* 2. Vector Legal Watermarks */}
      {(!imageSrc || type === 'cyber_scales' || type === 'scales' || type === 'courthouse' || type === 'constitution' || type === 'books' || type === 'ai_balance' || type === 'seal' || type === 'gavel') && (
        <div
          className="flex items-center justify-center transition-opacity duration-700"
          style={{
            opacity: imageSrc ? 0 : opacity,
            transform: `scale(${scale})`
          }}
        >
          {(type === 'cyber_scales' || type === 'scales') && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[540px] h-[540px] text-[#c89d42]"
            >
              <line x1="300" y1="90" x2="300" y2="480" strokeWidth="12" />
              <path d="M120 180 L480 180" strokeWidth="10" />
              <circle cx="300" cy="90" r="22" strokeWidth="8" fill="currentColor" fillOpacity="0.2" />
              <path d="M120 180 L80 320" strokeWidth="4" />
              <path d="M120 180 L160 320" strokeWidth="4" />
              <path d="M70 320 Q120 370 170 320 Z" strokeWidth="6" fill="currentColor" fillOpacity="0.2" />
              <path d="M480 180 L440 320" strokeWidth="4" />
              <path d="M480 180 L520 320" strokeWidth="4" />
              <path d="M430 320 Q480 370 530 320 Z" strokeWidth="6" fill="currentColor" fillOpacity="0.2" />
              <path d="M220 480 L380 480 L340 450 L260 450 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.3" />
              <line x1="180" y1="520" x2="420" y2="520" strokeWidth="14" />
            </svg>
          )}

          {type === 'courthouse' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[520px] h-[520px] text-[#c89d42]"
            >
              <path d="M100 220 L300 110 L500 220 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.15" />
              <line x1="80" y1="230" x2="520" y2="230" strokeWidth="10" />
              <line x1="140" y1="230" x2="140" y2="440" strokeWidth="12" />
              <line x1="220" y1="230" x2="220" y2="440" strokeWidth="12" />
              <line x1="300" y1="230" x2="300" y2="440" strokeWidth="12" />
              <line x1="380" y1="230" x2="380" y2="440" strokeWidth="12" />
              <line x1="460" y1="230" x2="460" y2="440" strokeWidth="12" />
              <path d="M100 440 L500 440 L520 480 L80 480 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.25" />
              <line x1="60" y1="510" x2="540" y2="510" strokeWidth="14" />
            </svg>
          )}

          {type === 'constitution' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[500px] h-[500px] text-[#c89d42]"
            >
              <rect x="140" y="100" width="320" height="420" rx="18" strokeWidth="8" fill="currentColor" fillOpacity="0.15" />
              <line x1="180" y1="170" x2="420" y2="170" strokeWidth="6" />
              <line x1="180" y1="220" x2="420" y2="220" strokeWidth="6" />
              <line x1="180" y1="270" x2="420" y2="270" strokeWidth="6" />
              <line x1="180" y1="320" x2="380" y2="320" strokeWidth="6" />
              <circle cx="300" cy="420" r="36" strokeWidth="6" fill="currentColor" fillOpacity="0.3" />
            </svg>
          )}

          {type === 'books' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[520px] h-[520px] text-[#c89d42]"
            >
              <path d="M140 460 C220 430 380 430 460 460 L460 380 C380 350 220 350 140 380 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.2" />
              <path d="M140 380 C220 350 380 350 460 380 L460 300 C380 270 220 270 140 300 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.2" />
              <path d="M300 240 C220 180 140 200 100 210 L100 120 C140 110 220 90 300 150 C380 90 460 110 500 120 L500 210 C460 200 380 180 300 240 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.15" />
              <line x1="300" y1="150" x2="300" y2="240" strokeWidth="8" />
              <line x1="80" y1="490" x2="520" y2="490" strokeWidth="12" />
            </svg>
          )}

          {type === 'ai_balance' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[520px] h-[520px] text-[#c89d42]"
            >
              <circle cx="300" cy="180" r="16" fill="currentColor" />
              <circle cx="200" cy="120" r="10" fill="currentColor" />
              <circle cx="400" cy="120" r="10" fill="currentColor" />
              <path d="M140 280 L460 280" strokeWidth="10" />
              <line x1="300" y1="180" x2="300" y2="480" strokeWidth="10" />
              <path d="M90 390 Q140 420 190 390 Z" strokeWidth="6" fill="currentColor" fillOpacity="0.2" />
              <path d="M410 390 Q460 420 510 390 Z" strokeWidth="6" fill="currentColor" fillOpacity="0.2" />
            </svg>
          )}

          {type === 'seal' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[500px] h-[500px] text-[#c89d42]"
            >
              <circle cx="300" cy="300" r="250" strokeWidth="10" />
              <circle cx="300" cy="300" r="230" strokeWidth="4" strokeDasharray="8 8" />
              <circle cx="300" cy="300" r="210" strokeWidth="6" />
              <g transform="rotate(-35 300 300)">
                <rect x="230" y="160" width="140" height="70" rx="12" strokeWidth="8" fill="currentColor" fillOpacity="0.2" />
                <line x1="300" y1="230" x2="300" y2="440" strokeWidth="16" />
                <circle cx="300" cy="450" r="14" fill="currentColor" />
              </g>
              <path d="M180 430 L420 430 L390 460 L210 460 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.3" />
            </svg>
          )}

          {type === 'gavel' && (
            <svg
              viewBox="0 0 600 600"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[500px] h-[500px] text-[#c89d42]"
            >
              <g transform="rotate(-25 300 300)">
                <rect x="220" y="150" width="160" height="80" rx="14" strokeWidth="10" fill="currentColor" fillOpacity="0.25" />
                <line x1="250" y1="150" x2="250" y2="230" strokeWidth="6" />
                <line x1="350" y1="150" x2="350" y2="230" strokeWidth="6" />
                <line x1="300" y1="230" x2="300" y2="450" strokeWidth="18" />
                <circle cx="300" cy="460" r="16" fill="currentColor" />
              </g>
              <path d="M160 450 L440 450 L400 490 L200 490 Z" strokeWidth="8" fill="currentColor" fillOpacity="0.3" />
            </svg>
          )}
        </div>
      )}

      {/* Optional subtle vignette */}
      {withVignette && (
        <div className="absolute inset-0 bg-radial from-transparent to-[#09090b]/40 pointer-events-none" />
      )}
    </div>
  );
};
