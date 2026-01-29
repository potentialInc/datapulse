---
frontend: "frontend-operations-dashboard"
port: 5175
priority: "P0"
depends_on: null
---

# Shared Components - Operations Dashboard

## Context

The operations dashboard shares many components with other frontends. This document outlines ops-specific components and variants.

**Target Directory:** `frontend-operations-dashboard/app/components/`

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS

---

## Ops-Specific Component: OpsSidebar

The ops sidebar has unique navigation items for team management and workflows.

**Path:** `app/components/layout/OpsSidebar.tsx`

**Navigation Items:**
```typescript
const opsNavItems = [
  { to: '/', icon: 'solar:home-2-bold-duotone', label: 'Dashboard' },
  { to: '/team', icon: 'solar:users-group-two-rounded-bold-duotone', label: 'Team' },
  { to: '/workflows', icon: 'solar:routing-bold-duotone', label: 'Workflows' },
  { to: '/sla', icon: 'solar:chart-2-bold-duotone', label: 'SLA Monitor' },
];
```

**Ops Badge:**
```tsx
<div className="h-16 flex items-center px-6 border-b border-slate-800/50">
  <span className="text-xl font-bold text-white">DataPulse</span>
  <span className="ml-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
    Operations
  </span>
</div>
```

---

## Shared Components to Copy

Copy these components from the main frontend:

1. **PageHeader** - Same implementation
2. **StatCard** - Same implementation
3. **NavLink** - Same implementation
4. **UserAvatar** - Same implementation
5. **StatusBadge** - Same implementation
6. **DataTable** - Same implementation
7. **ActivityItem** - Same implementation
8. **SearchInput** - Same implementation
9. **Breadcrumb** - Same implementation

---

## Implementation Checklist

- [ ] Create OpsSidebar with ops navigation
- [ ] Copy shared components from main frontend
- [ ] Set up component barrel exports

---
