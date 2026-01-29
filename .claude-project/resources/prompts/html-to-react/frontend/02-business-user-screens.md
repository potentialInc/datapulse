---
frontend: "frontend"
port: 5173
category: "business-user"
html_files: 6
priority: "P1"
depends_on: "00-shared-components.md"
---

# Business User Screens - React Conversion

## Context

Converting 6 business user HTML screens to React components. These are the core dashboard pages for business users.

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Business Home

**HTML:** `business-user/07-business-home.html`
**Target Component:** `app/pages/dashboard/home.tsx`
**Route:** `/dashboard`

**API Integration:**
- `GET /dashboards` - Recent dashboards
- `GET /alerts/active` - Active alerts

**Shared Components:**
- Sidebar (variant: 'business')
- PageHeader
- StatCard
- NavLink
- UserAvatar
- StatusBadge
- ActivityItem
- DashboardCard

**Implementation Notes:**
- Main dashboard overview for business users
- KPI cards at top (4 stat cards)
- Recent dashboards grid
- Activity feed
- Quick actions section

**TanStack Query Hooks:**
```typescript
// app/services/httpServices/queries/useDashboards.ts
export function useDashboards() {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: () => dashboardService.getAll(),
  });
}

export function useActiveAlerts() {
  return useQuery({
    queryKey: ['alerts', 'active'],
    queryFn: () => alertService.getActive(),
  });
}
```

---

## Screen 2: Dashboard List

**HTML:** `business-user/08-dashboard-list.html`
**Target Component:** `app/pages/dashboard/list.tsx`
**Route:** `/dashboards`

**API Integration:**
- `GET /dashboards`

**Shared Components:**
- Sidebar
- PageHeader
- SearchInput
- DashboardCard
- NavLink

**Implementation Notes:**
- Grid view of all dashboards
- Search/filter functionality
- Create new dashboard button (links to builder in analytics dashboard)
- Owned vs shared dashboard tabs

**State Management:**
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [filter, setFilter] = useState<'all' | 'owned' | 'shared'>('all');

const filteredDashboards = useMemo(() => {
  return dashboards.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'owned' && d.isOwner) ||
      (filter === 'shared' && !d.isOwner);
    return matchesSearch && matchesFilter;
  });
}, [dashboards, searchQuery, filter]);
```

---

## Screen 3: Dashboard View

**HTML:** `business-user/09-dashboard-view.html`
**Target Component:** `app/pages/dashboard/view.tsx`
**Route:** `/dashboards/:id`

**API Integration:**
- `GET /dashboards/:id`
- `GET /dashboards/:id/widgets`

**Shared Components:**
- Sidebar
- PageHeader
- Breadcrumb
- NavLink

**New Components:**
- DashboardViewer
- WidgetGrid

**Implementation Notes:**
- Read-only dashboard view
- Widget grid layout
- Date range filter
- Export/share actions
- Fullscreen mode

**Route Parameter:**
```typescript
import { useParams } from 'react-router';

const { id } = useParams<{ id: string }>();
const { data: dashboard } = useDashboard(id!);
const { data: widgets } = useDashboardWidgets(id!);
```

---

## Screen 4: Reports List

**HTML:** `business-user/10-reports-list.html`
**Target Component:** `app/pages/reports/list.tsx`
**Route:** `/reports`

**API Integration:**
- `GET /reports` - Scheduled reports
- `GET /reports/generated` - Generated reports

**Shared Components:**
- Sidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- ReportCard

**Implementation Notes:**
- Two tabs: Scheduled / Generated
- DataTable for scheduled reports
- Card grid for generated reports with download links
- Schedule new report action (opens modal)

---

## Screen 5: Alerts List

**HTML:** `business-user/11-alerts-list.html`
**Target Component:** `app/pages/alerts/list.tsx`
**Route:** `/alerts`

**API Integration:**
- `GET /alerts`
- `GET /alerts/active`

**Shared Components:**
- Sidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- AlertCard

**Implementation Notes:**
- Two tabs: Active / All
- Active alerts shown prominently
- Color-coded by severity (critical, warning, info)
- Quick actions: snooze, acknowledge, resolve
- Create alert button (opens modal)

---

## Screen 6: User Settings

**HTML:** `business-user/12-user-settings.html`
**Target Component:** `app/pages/settings/profile.tsx`
**Route:** `/settings/profile`

**API Integration:**
- `GET /users/me`
- `PATCH /users/:id`

**Shared Components:**
- Sidebar
- PageHeader
- NavLink
- UserAvatar

**New Components:**
- ProfileForm

**Implementation Notes:**
- Profile information form
- Avatar upload
- Password change section
- Settings navigation sidebar (profile, notifications, security, dashboard prefs)

**Form Implementation:**
```typescript
const { data: user } = useCurrentUser();
const updateUser = useUpdateUser();

const form = useForm<ProfileForm>({
  resolver: zodResolver(profileSchema),
  defaultValues: user,
});

const onSubmit = async (data: ProfileForm) => {
  await updateUser.mutateAsync({ id: user.id, ...data });
  toast.success('Profile updated');
};
```

---

## Layout Component

Create a dashboard layout that wraps all business user pages:

```tsx
// app/pages/dashboard/layout.tsx
import { Outlet } from 'react-router';
import { Sidebar } from '~/components/layout/Sidebar';

const businessNavItems = [
  { to: '/dashboard', icon: 'solar:home-2-bold-duotone', label: 'Home' },
  { to: '/dashboards', icon: 'solar:chart-2-bold-duotone', label: 'Dashboards' },
  { to: '/reports', icon: 'solar:document-bold-duotone', label: 'Reports' },
  { to: '/alerts', icon: 'solar:bell-bold-duotone', label: 'Alerts' },
  { to: '/settings/profile', icon: 'solar:settings-bold-duotone', label: 'Settings' },
];

export function DashboardLayout() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar
        variant="business"
        navItems={businessNavItems}
        user={user}
      />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Implementation Checklist

- [ ] Create dashboard layout component
- [ ] Convert Screen 1: Business home
- [ ] Convert Screen 2: Dashboard list
- [ ] Convert Screen 3: Dashboard view
- [ ] Convert Screen 4: Reports list
- [ ] Convert Screen 5: Alerts list
- [ ] Convert Screen 6: User settings (profile)
- [ ] Set up routes with layout
- [ ] Create TanStack Query hooks
- [ ] Test protected routes (auth required)

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend/app/pages/dashboard/
rg "window\.location\.(href|replace)" frontend/app/pages/dashboard/
rg "classList\.(add|remove|toggle)" frontend/app/pages/dashboard/
```

---
