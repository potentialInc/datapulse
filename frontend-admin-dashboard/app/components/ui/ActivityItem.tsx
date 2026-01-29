import { cn } from '~/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItemProps {
  icon: string;
  iconColor?: 'amber' | 'indigo' | 'emerald' | 'rose';
  title: string;
  description: string;
  timestamp: string | Date;
}

const colorMap = {
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
  rose: 'bg-rose-500/10 border-rose-500/20 text-rose-500',
};

export function ActivityItem({ icon, iconColor = 'amber', title, description, timestamp }: ActivityItemProps) {
  const timeAgo = typeof timestamp === 'string'
    ? timestamp
    : formatDistanceToNow(timestamp, { addSuffix: true });

  return (
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors border border-transparent hover:border-slate-700/50">
      <div className={cn('flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center', colorMap[iconColor])}>
        <iconify-icon icon={icon} width="20"></iconify-icon>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm font-medium text-slate-200">{title}</p>
          <span className="text-xs text-slate-500">{timeAgo}</span>
        </div>
        <p className="text-sm text-slate-400 truncate">{description}</p>
      </div>
    </div>
  );
}
