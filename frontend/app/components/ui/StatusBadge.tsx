import { cn } from '~/lib/utils';

type StatusType = 'active' | 'pending' | 'critical' | 'inactive' | 'success' | 'warning' | 'error';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig: Record<StatusType, { color: string; defaultLabel: string }> = {
  active: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', defaultLabel: 'Active' },
  success: { color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', defaultLabel: 'Success' },
  pending: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', defaultLabel: 'Pending' },
  warning: { color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', defaultLabel: 'Warning' },
  critical: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', defaultLabel: 'Critical' },
  error: { color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', defaultLabel: 'Error' },
  inactive: { color: 'text-slate-400 bg-slate-700/50 border-slate-600', defaultLabel: 'Inactive' },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border', config.color)}>
      {label || config.defaultLabel}
    </span>
  );
}
