import React from 'react';
import legalIconSrc from '../assets/images/lawhub_legal_icon_1786648056843.jpg';

interface AppLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  textVariant?: 'standard' | 'stacked' | 'minimal';
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showText = false,
  textVariant = 'standard',
  subtitle = 'LEGAL PLATFORM',
  className = '',
  onClick
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 rounded-lg',
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
    '2xl': 'w-24 h-24 sm:w-28 sm:h-28 rounded-[28px]'
  };

  const glowClasses = {
    xs: 'shadow-sm shadow-amber-500/10',
    sm: 'shadow-md shadow-amber-500/20',
    md: 'shadow-lg shadow-amber-500/25',
    lg: 'shadow-xl shadow-amber-500/30',
    xl: 'shadow-2xl shadow-amber-500/35',
    '2xl': 'shadow-[0_0_50px_rgba(243,186,66,0.35)]'
  };

  const content = (
    <div
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 flex-shrink-0 transition-transform duration-300 hover:scale-105 ${sizeClasses[size]} ${glowClasses[size]}`}
      >
        <div className="w-full h-full rounded-[inherit] overflow-hidden bg-slate-950 flex items-center justify-center">
          <img
            src={legalIconSrc}
            alt="LawHub Official Legal Icon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          {textVariant === 'stacked' ? (
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-slate-100 leading-tight">
                  LAW<span className="text-amber-400">HUB</span>
                </span>
              </div>
              {subtitle && (
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          ) : (
            <div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-slate-100">
                LAW<span className="text-amber-400">HUB</span>
              </span>
              {subtitle && (
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-medium -mt-1 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return content;
};
