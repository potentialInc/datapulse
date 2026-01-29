import { Icon } from '@iconify/react';
import { SidebarNavLink } from '~/components/ui/NavLink';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  badge?: string | number;
  section?: string;
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
  admin: { label: 'Admin', color: 'text-rose-400 bg-rose-500/20' },
  analyst: { label: 'Analytics', color: 'text-indigo-400 bg-indigo-500/10' },
  ops: { label: 'Operations', color: 'text-emerald-400 bg-emerald-500/10' },
};

export function Sidebar({ variant, navItems, user }: SidebarProps) {
  const badge = variantBadges[variant];

  // Group nav items by section
  const groupedItems: { section: string | null; items: NavItem[] }[] = [];
  let currentSection: string | null = null;
  let currentItems: NavItem[] = [];

  navItems.forEach((item) => {
    if (item.section && item.section !== currentSection) {
      if (currentItems.length > 0) {
        groupedItems.push({ section: currentSection, items: currentItems });
      }
      currentSection = item.section;
      currentItems = [item];
    } else {
      currentItems.push(item);
    }
  });

  if (currentItems.length > 0) {
    groupedItems.push({ section: currentSection, items: currentItems });
  }

  return (
    <aside className="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-2 text-indigo-500">
          <Icon icon="solar:graph-new-up-linear" width={24} />
          <span className="text-lg font-semibold tracking-tight text-white">DataPulse</span>
          {badge && (
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${badge.color} ml-1`}>
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {groupedItems.map((group, index) => (
          <div key={index} className={group.section ? 'pt-4' : ''}>
            {group.section && (
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {group.section}
              </p>
            )}
            {group.items.map((item) => (
              <SidebarNavLink key={item.to} to={item.to} icon={item.icon} label={item.label} badge={item.badge} />
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
          <UserAvatar name={user.name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate group-hover:text-indigo-400 transition-colors">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.role}</p>
          </div>
          <Icon icon="solar:alt-arrow-right-linear" width={16} className="text-slate-600 group-hover:text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
