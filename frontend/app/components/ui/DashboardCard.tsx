import { useState } from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  owner: {
    name: string;
    initials: string;
    color: string;
  };
  lastModified: string;
  isFavorite?: boolean;
  variant?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
  chartType?: 'line' | 'donut' | 'bar' | 'curve' | 'bars' | 'pie' | 'progress' | 'grid';
  onClick?: () => void;
}

export function DashboardCard({
  title,
  description,
  owner,
  lastModified,
  isFavorite = false,
  variant = 'indigo',
  chartType = 'line',
  onClick,
}: DashboardCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const borderColors = {
    indigo: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
    emerald: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    amber: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    rose: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
    purple: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
  };

  const textColors = {
    indigo: 'group-hover:text-indigo-400',
    emerald: 'group-hover:text-emerald-400',
    amber: 'group-hover:text-amber-400',
    rose: 'group-hover:text-rose-400',
    purple: 'group-hover:text-purple-400',
  };

  const gradientColors = {
    indigo: 'from-indigo-500/10',
    emerald: 'from-emerald-500/10',
    amber: 'from-amber-500/10',
    rose: 'from-rose-500/10',
    purple: 'from-purple-500/10',
  };

  const chartColors = {
    indigo: 'text-indigo-500',
    emerald: 'text-emerald-500',
    amber: 'text-amber-500',
    rose: 'text-rose-500',
    purple: 'text-purple-500',
  };

  const avatarColors = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    purple: 'bg-purple-600',
    slate: 'bg-slate-600',
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <div className="absolute inset-0 flex items-end p-4 pb-0">
            <svg className={`w-full h-24 ${chartColors[variant]} drop-shadow-sm`} viewBox="0 0 100 40" preserveAspectRatio="none">
              <path d="M0 35 L10 32 L20 34 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 5 L100 8 V40 H0 Z" fill="currentColor" opacity="0.2"></path>
              <path d="M0 35 L10 32 L20 34 L30 25 L40 28 L50 20 L60 22 L70 15 L80 18 L90 5 L100 8" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            </svg>
          </div>
        );
      case 'donut':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full border-4 border-slate-700 border-t-${variant}-500 -rotate-45`}></div>
          </div>
        );
      case 'bar':
        return (
          <div className="absolute inset-0 flex items-end justify-center px-6 pb-4 gap-2">
            <div className="w-1/4 h-3/4 bg-slate-700/50 rounded-t-sm"></div>
            <div className="w-1/4 h-1/2 bg-slate-700/50 rounded-t-sm"></div>
            <div className={`w-1/4 h-full bg-${variant}-500/80 rounded-t-sm`}></div>
            <div className="w-1/4 h-2/3 bg-slate-700/50 rounded-t-sm"></div>
          </div>
        );
      case 'curve':
        return (
          <svg className={`absolute inset-0 w-full h-full p-4 ${chartColors[variant]}`} viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0 20 Q 25 35 50 20 T 100 20" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
            <path d="M0 20 Q 25 35 50 20 T 100 20 V 40 H 0 Z" fill="currentColor" opacity="0.1"></path>
          </svg>
        );
      case 'bars':
        return (
          <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-60">
            <div className={`w-3 h-8 bg-${variant}-400 rounded-sm`}></div>
            <div className={`w-3 h-12 bg-${variant}-500 rounded-sm`}></div>
            <div className={`w-3 h-6 bg-${variant}-300 rounded-sm`}></div>
            <div className={`w-3 h-10 bg-${variant}-600 rounded-sm`}></div>
          </div>
        );
      case 'pie':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full border-[10px] border-slate-700 border-r-${variant}-500/80 rotate-12`}></div>
          </div>
        );
      case 'progress':
        return (
          <div className="absolute inset-0 flex flex-col justify-center px-8 gap-2">
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full bg-${variant}-500 w-3/4`}></div>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full bg-${variant}-400 w-1/2`}></div>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full bg-${variant}-600 w-5/6`}></div>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-8 h-8 rounded bg-slate-700/50"></div>
              <div className={`w-8 h-8 rounded bg-${variant}-500/40`}></div>
              <div className={`w-8 h-8 rounded bg-${variant}-500/60`}></div>
              <div className="w-8 h-8 rounded bg-slate-700/50"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`group bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${borderColors[variant]}`}
      onClick={onClick}
    >
      {/* Chart Preview */}
      <div className={`h-36 bg-slate-800/50 relative overflow-hidden border-b border-slate-700/30`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[variant]} to-transparent`}></div>
        {renderChart()}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-white"
          >
            <iconify-icon icon="solar:menu-dots-linear" width="20"></iconify-icon>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`text-slate-200 font-semibold text-sm transition-colors ${textColors[variant]}`}>
            {title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFavorite(!favorite);
            }}
            className={favorite ? 'text-amber-500' : 'text-slate-600 hover:text-amber-500 transition-colors'}
          >
            <iconify-icon icon={favorite ? 'solar:star-bold' : 'solar:star-linear'} width="16"></iconify-icon>
          </button>
        </div>
        <p className="text-slate-500 text-xs truncate mb-4">{description}</p>

        <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full ${avatarColors[owner.color as keyof typeof avatarColors]} flex items-center justify-center text-[10px] text-white`}>
              {owner.initials}
            </div>
            <span className="text-xs text-slate-400">{owner.name}</span>
          </div>
          <span className="text-xs text-slate-500">{lastModified}</span>
        </div>
      </div>
    </div>
  );
}
