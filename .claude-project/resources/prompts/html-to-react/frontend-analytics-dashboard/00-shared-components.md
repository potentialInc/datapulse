---
frontend: "frontend-analytics-dashboard"
port: 5176
priority: "P0"
depends_on: null
---

# Shared Components - Analytics Dashboard

## Context

The analytics dashboard shares many components with other frontends. This document outlines analyst-specific components and variants.

**Target Directory:** `frontend-analytics-dashboard/app/components/`

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS
- Code Editor: Monaco Editor or CodeMirror

---

## Analyst-Specific Component: AnalystSidebar

The analyst sidebar has unique navigation items for query editing and data modeling.

**Path:** `app/components/layout/AnalystSidebar.tsx`

**Navigation Items:**
```typescript
const analystNavItems = [
  { to: '/', icon: 'solar:home-2-bold-duotone', label: 'Home' },
  { to: '/query', icon: 'solar:code-bold-duotone', label: 'Query Editor' },
  { to: '/builder', icon: 'solar:widget-bold-duotone', label: 'Dashboard Builder' },
  { to: '/models', icon: 'solar:database-bold-duotone', label: 'Data Models' },
];
```

**Analyst Badge:**
```tsx
<div className="h-16 flex items-center px-6 border-b border-slate-800/50">
  <span className="text-xl font-bold text-white">DataPulse</span>
  <span className="ml-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
    Analytics
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

- [ ] Create AnalystSidebar with analyst navigation
- [ ] Copy shared components from main frontend
- [ ] Set up Monaco Editor or CodeMirror for query editor
- [ ] Set up component barrel exports

---
