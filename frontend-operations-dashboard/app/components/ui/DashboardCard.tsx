import { cn } from '~/lib/utils';

interface DashboardCardProps {
  title: string;
  lastViewed?: string | Date;
  status?: 'active' | 'inactive';
  thumbnail?: React.ReactNode;
  onClick: () => void;
}

export function DashboardCard({ title, lastViewed, status = 'active', thumbnail, onClick }: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="h-32 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
        {thumbnail}
      </div>
      <div className="p-4">
        <h3 className="text-slate-200 font-medium text-sm group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        {lastViewed && (
          <div className="flex items-center gap-2 mt-2">
            <span className={cn('w-2 h-2 rounded-full', status === 'active' ? 'bg-emerald-500' : 'bg-slate-500')} />
            <p className="text-xs text-slate-500">Viewed {typeof lastViewed === 'string' ? lastViewed : 'recently'}</p>
          </div>
        )}
      </div>
    </button>
  );
}
