import { cn } from '~/lib/utils';

interface StatCardProps {
  icon: string;
  iconColor?: 'indigo' | 'emerald' | 'amber' | 'rose';
  label: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  onClick?: () => void;
}

const colorMap = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400',
  rose: 'bg-rose-500/10 text-rose-400',
};

export function StatCard({ icon, iconColor = 'indigo', label, value, trend, onClick }: StatCardProps) {
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
        {trend && (
          <span className={cn(
            'flex items-center text-xs font-medium px-2 py-1 rounded-full',
            trend.positive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
          )}>
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-semibold text-white mt-1">{value}</p>
    </div>
  );
}
