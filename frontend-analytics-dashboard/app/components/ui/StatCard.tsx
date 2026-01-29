import { cn } from '~/lib/utils';

interface StatCardProps {
  icon: string;
  iconColor?: 'indigo' | 'emerald' | 'amber' | 'rose';
  title?: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  badge?: string;
  onClick?: () => void;
}

const colorMap = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400',
  rose: 'bg-rose-500/10 text-rose-400',
};

export function StatCard({
  icon,
  iconColor = 'indigo',
  title,
  value,
  change,
  trend,
  badge,
  onClick
}: StatCardProps) {
  return (
    <div
      className={cn(
        'bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all group shadow-sm',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn('p-2 rounded-lg', colorMap[iconColor])}>
          <iconify-icon icon={icon} width="20"></iconify-icon>
        </div>
        {change !== undefined && trend && (
          <span className={cn(
            'flex items-center text-xs font-medium px-2 py-1 rounded-full border',
            trend === 'up'
              ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/10'
              : 'text-rose-500 bg-rose-500/10 border-rose-500/10'
          )}>
            <iconify-icon icon={trend === 'up' ? 'solar:arrow-right-up-linear' : 'solar:arrow-right-down-linear'} className="mr-1"></iconify-icon>
            {change}%
          </span>
        )}
        {badge && (
          <span className="flex items-center text-xs font-medium text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full border border-slate-700">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-1">
        <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
        <svg className="w-16 h-8 text-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 60 20">
          <path stroke="currentColor" strokeWidth="2" d="M0 15 Q10 18 20 10 T40 12 T60 5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
    </div>
  );
}
