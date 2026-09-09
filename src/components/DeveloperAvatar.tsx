import React from 'react';
import developerPhoto from '../assets/images/developer_profile_portrait_1786648391041.jpg';

interface DeveloperAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DeveloperAvatar: React.FC<DeveloperAvatarProps> = ({
  size = 'md',
  showBadge = false,
  className = '',
  onClick
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 rounded-full',
    sm: 'w-8 h-8 rounded-full',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl',
    '2xl': 'w-32 h-32 sm:w-40 sm:h-40 rounded-[32px]'
  };

  const badgeSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6'
  };

  return (
    <div
      className={`relative inline-block select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div
        className={`p-0.5 bg-gradient-to-tr from-amber-500 via-sky-400 to-amber-300 shadow-lg shadow-amber-500/20 overflow-hidden transition-transform duration-300 hover:scale-105 ${sizeClasses[size]}`}
      >
        <div className="w-full h-full rounded-[inherit] overflow-hidden bg-slate-950">
          <img
            src={developerPhoto}
            alt="Babirye Zula - LawHub Founder & Developer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {showBadge && (
        <span
          className={`absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-slate-950 shadow-sm ${badgeSizes[size]}`}
          title="Verified Creator & Developer"
        />
      )}
    </div>
  );
};
