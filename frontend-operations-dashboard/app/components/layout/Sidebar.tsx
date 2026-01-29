import { SidebarNavLink } from '~/components/ui/NavLink';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  badge?: string | number;
}

interface SidebarProps {
  variant: 'business' | 'admin' | 'analyst' | 'ops';
  navItems: NavItem[];
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const variantBadges = {
  business: null,
  admin: { label: 'Admin', color: 'text-rose-400 bg-rose-500/10' },
  analyst: { label: 'Analytics', color: 'text-indigo-400 bg-indigo-500/10' },
  ops: { label: 'Operations', color: 'text-emerald-400 bg-emerald-500/10' },
};

export function Sidebar({ variant, navItems, user }: SidebarProps) {
  const badge = variantBadges[variant];

  return (
    <aside className="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <span className="text-xl font-bold text-white">DataPulse</span>
        {badge && (
          <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} {...item} />
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
