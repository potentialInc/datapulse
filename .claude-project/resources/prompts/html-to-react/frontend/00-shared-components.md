---
frontend: "frontend"
port: 5173
priority: "P0"
depends_on: null
---

# Shared Components - Create First

## Context

Before converting screens, create these shared components identified from HTML analysis. These components are used across multiple pages in the main frontend application.

**Target Directory:** `frontend/app/components/`
**Components to Create:** 12

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS + Shadcn/UI patterns
- Icons: iconify-icon

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- Architecture: `.claude-project/docs/PROJECT_KNOWLEDGE.md`

---

## Component: Sidebar

**Usage:** 35+ instances across all dashboard pages
**Path:** `app/components/layout/Sidebar.tsx`

**HTML Pattern:**
```html
<aside class="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
    <div class="h-16 flex items-center px-6 border-b border-slate-800/50">
        <!-- Logo -->
    </div>
    <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <!-- Navigation links -->
    </nav>
    <div class="p-4 border-t border-slate-800">
        <!-- User profile -->
    </div>
</aside>
```

**React Implementation:**

```tsx
// app/components/layout/Sidebar.tsx
import { NavLink } from 'react-router';
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

export function Sidebar({ variant, navItems, user }: SidebarProps) {
  return (
    <aside className="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <span className="text-xl font-bold text-white">DataPulse</span>
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
```

---

## Component: PageHeader

**Usage:** 30+ instances across all main pages
**Path:** `app/components/layout/PageHeader.tsx`

**HTML Pattern:**
```html
<header class="flex items-center justify-between px-8 py-6 z-10">
    <div>
        <h1 class="text-2xl font-semibold text-white tracking-tight">Title</h1>
        <p class="text-sm text-slate-400 mt-1">Subtitle</p>
    </div>
    <div class="flex items-center gap-4">
        <!-- Actions -->
    </div>
</header>
```

**React Implementation:**

```tsx
// app/components/layout/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-6 z-10">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
}
```

---

## Component: StatCard

**Usage:** 24+ instances across dashboard pages
**Path:** `app/components/ui/StatCard.tsx`

**HTML Pattern:**
```html
<div class="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all group shadow-sm">
    <div class="flex justify-between items-start mb-4">
        <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <iconify-icon icon="solar:chart-2-bold-duotone" width="20"></iconify-icon>
        </div>
        <span class="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
    </div>
    <h3 class="text-slate-400 text-sm font-medium">Label</h3>
    <p class="text-2xl font-semibold text-white mt-1">Value</p>
</div>
```

**React Implementation:**

```tsx
// app/components/ui/StatCard.tsx
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
```

---

## Component: NavLink

**Usage:** 40+ instances in sidebar navigations
**Path:** `app/components/ui/NavLink.tsx`

**React Implementation:**

```tsx
// app/components/ui/NavLink.tsx
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
```

---

## Component: UserAvatar

**Usage:** 20+ instances
**Path:** `app/components/ui/UserAvatar.tsx`

**React Implementation:**

```tsx
// app/components/ui/UserAvatar.tsx
import { cn } from '~/lib/utils';

interface UserAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'indigo' | 'purple' | 'amber' | 'emerald' | 'rose';
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

const colorMap = {
  indigo: 'from-indigo-500 to-purple-600 shadow-indigo-500/20',
  purple: 'from-purple-500 to-pink-600 shadow-purple-500/20',
  amber: 'from-amber-500 to-orange-600 shadow-amber-500/20',
  emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/20',
  rose: 'from-rose-500 to-pink-600 shadow-rose-500/20',
};

export function UserAvatar({ name, size = 'md', colorScheme = 'indigo' }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-lg',
        sizeMap[size],
        colorMap[colorScheme]
      )}
    >
      {initials}
    </div>
  );
}
```

---

## Component: StatusBadge

**Usage:** 25+ instances
**Path:** `app/components/ui/StatusBadge.tsx`

**React Implementation:**

```tsx
// app/components/ui/StatusBadge.tsx
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
```

---

## Component: DataTable

**Usage:** 8+ instances
**Path:** `app/components/ui/DataTable.tsx`

**React Implementation:**

```tsx
// app/components/ui/DataTable.tsx
import { cn } from '~/lib/utils';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700/50">
      <table className="w-full">
        <thead className="bg-slate-800/50 sticky top-0">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  'px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'hover:bg-slate-800/30 transition-colors',
                  onRowClick && 'cursor-pointer'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn('px-6 py-4', col.className)}>
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Component: ActivityItem

**Usage:** 8+ instances
**Path:** `app/components/ui/ActivityItem.tsx`

**React Implementation:**

```tsx
// app/components/ui/ActivityItem.tsx
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
```

---

## Component: Modal

**Usage:** 2+ instances
**Path:** `app/components/ui/Modal.tsx`

**React Implementation:**

```tsx
// app/components/ui/Modal.tsx
import { useEffect } from 'react';
import { cn } from '~/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
};

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className={cn('relative bg-slate-800 rounded-2xl border border-slate-700/50 w-full shadow-2xl z-10', sizeMap[size])}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <iconify-icon icon="solar:close-circle-linear" width="24"></iconify-icon>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Component: SearchInput

**Usage:** 10+ instances
**Path:** `app/components/ui/SearchInput.tsx`

**React Implementation:**

```tsx
// app/components/ui/SearchInput.tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcut?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search...', shortcut = 'K' }: SearchInputProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <iconify-icon icon="solar:magnifer-linear" className="text-slate-500 group-focus-within:text-indigo-400 transition-colors"></iconify-icon>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800/50 border border-slate-700 text-sm rounded-lg block w-64 pl-10 p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-slate-600 text-xs border border-slate-700 rounded px-1.5 py-0.5">{shortcut}</span>
      </div>
    </div>
  );
}
```

---

## Component: DashboardCard

**Usage:** 8+ instances
**Path:** `app/components/ui/DashboardCard.tsx`

**React Implementation:**

```tsx
// app/components/ui/DashboardCard.tsx
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
```

---

## Component: Breadcrumb

**Usage:** 5+ instances
**Path:** `app/components/ui/Breadcrumb.tsx`

**React Implementation:**

```tsx
// app/components/ui/Breadcrumb.tsx
import { Link } from 'react-router';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon>}
          {item.href ? (
            <Link to={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
```

---

## Validation Checklist

- [ ] All 12 shared components created
- [ ] Props interfaces defined with TypeScript
- [ ] cn() utility set up in `app/lib/utils.ts`
- [ ] iconify-icon registered for React
- [ ] Components exported from barrel file
- [ ] Basic usage tested

---

## Next Steps

After creating shared components:
1. Proceed to `01-auth-screens.md` for authentication pages
2. Then `02-business-user-screens.md` for dashboard pages
3. Continue with settings and modals
