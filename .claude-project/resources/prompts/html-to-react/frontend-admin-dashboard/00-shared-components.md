---
frontend: "frontend-admin-dashboard"
port: 5174
priority: "P0"
depends_on: null
---

# Shared Components - Admin Dashboard

## Context

The admin dashboard shares many components with the main frontend. This document outlines admin-specific components and variants.

**Target Directory:** `frontend-admin-dashboard/app/components/`

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS

**Note:** Most shared components (Sidebar, PageHeader, StatCard, etc.) follow the same patterns as the main frontend. Copy the base implementations and customize as needed.

---

## Admin-Specific Component: AdminSidebar

The admin sidebar has unique navigation items and an "Admin" badge.

**Path:** `app/components/layout/AdminSidebar.tsx`

**Navigation Items:**
```typescript
const adminNavItems = [
  { to: '/', icon: 'solar:home-2-bold-duotone', label: 'Dashboard' },
  { to: '/users', icon: 'solar:users-group-two-rounded-bold-duotone', label: 'Users' },
  { to: '/data-sources', icon: 'solar:database-bold-duotone', label: 'Data Sources' },
  { to: '/api-keys', icon: 'solar:key-bold-duotone', label: 'API Keys' },
  { to: '/branding', icon: 'solar:pallete-bold-duotone', label: 'Branding' },
  { to: '/system-health', icon: 'solar:server-bold-duotone', label: 'System Health' },
  { to: '/audit-logs', icon: 'solar:document-text-bold-duotone', label: 'Audit Logs' },
  { to: '/billing', icon: 'solar:card-bold-duotone', label: 'Billing' },
];
```

**Admin Badge:**
```tsx
<div className="h-16 flex items-center px-6 border-b border-slate-800/50">
  <span className="text-xl font-bold text-white">DataPulse</span>
  <span className="ml-2 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
    Admin
  </span>
</div>
```

---

## Shared Components to Copy

Copy these components from the main frontend with same implementation:

1. **PageHeader** - Same implementation
2. **StatCard** - Same implementation
3. **NavLink** - Same implementation
4. **UserAvatar** - Same implementation
5. **StatusBadge** - Same implementation
6. **DataTable** - Same implementation
7. **ActivityItem** - Same implementation
8. **SearchInput** - Same implementation
9. **Breadcrumb** - Same implementation
10. **Modal** - Same implementation

---

## Implementation Checklist

- [ ] Create AdminSidebar with admin navigation
- [ ] Copy shared components from main frontend
- [ ] Set up component barrel exports
- [ ] Configure Tailwind with same theme

---
