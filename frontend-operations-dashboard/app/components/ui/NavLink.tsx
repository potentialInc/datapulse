import { NavLink as RouterNavLink } from 'react-router';
import { cn } from '~/lib/utils';

interface NavLinkProps {
  to: string;
  icon: string;
  label: string;
  badge?: string | number;
}

export function SidebarNavLink({ to, icon, label, badge }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all',
          isActive
            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10'
            : 'text-slate-400 hover:text-slate-50 hover:bg-slate-800'
        )
      }
    >
      <iconify-icon icon={icon} width="20" className="text-current"></iconify-icon>
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </RouterNavLink>
  );
}
