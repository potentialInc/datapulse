---
frontend: "frontend-admin-dashboard"
port: 5174
category: "admin"
html_files: 8
priority: "P1"
depends_on: "00-shared-components.md"
---

# Admin Screens - React Conversion

## Context

Converting 8 admin HTML screens to React components for the admin dashboard application.

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Admin Dashboard

**HTML:** `admin/23-admin-dashboard.html`
**Target Component:** `app/pages/dashboard/home.tsx`
**Route:** `/`

**API Integration:**
- `GET /admin/dashboard`
- `GET /admin/system-health`

**Shared Components:**
- AdminSidebar
- PageHeader
- StatCard
- NavLink
- UserAvatar
- StatusBadge
- ActivityItem

**Implementation Notes:**
- System overview with KPIs
- User statistics
- System health summary
- Recent activity feed
- Quick actions

---

## Screen 2: User Management

**HTML:** `admin/24-user-management.html`
**Target Component:** `app/pages/users/list.tsx`
**Route:** `/users`

**API Integration:**
- `GET /admin/users`
- `PATCH /users/:id/status`
- `DELETE /users/:id`

**Shared Components:**
- AdminSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- UserAvatar
- NavLink

**Implementation Notes:**
- DataTable with user list
- Filters: role, status, date joined
- Actions: view details, activate/deactivate, delete
- Create user button
- Bulk actions

**Table Columns:**
```typescript
const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'User',
    render: (row) => (
      <div className="flex items-center gap-3">
        <UserAvatar name={row.name} size="sm" />
        <div>
          <p className="text-sm font-medium text-slate-200">{row.name}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  { key: 'createdAt', header: 'Joined' },
  {
    key: 'actions',
    header: '',
    render: (row) => <UserActions user={row} />,
  },
];
```

---

## Screen 3: Data Sources

**HTML:** `admin/25-data-sources.html`
**Target Component:** `app/pages/data-sources/list.tsx`
**Route:** `/data-sources`

**API Integration:**
- `GET /data-sources`
- `POST /data-sources/:id/test`
- `POST /data-sources/:id/sync`

**Shared Components:**
- AdminSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- DataSourceCard

**Implementation Notes:**
- List of connected data sources
- Connection status indicators
- Test connection action
- Sync metadata action
- Add new connection button

---

## Screen 4: API Keys

**HTML:** `admin/26-api-keys.html`
**Target Component:** `app/pages/api-keys/list.tsx`
**Route:** `/api-keys`

**API Integration:**
- `GET /api-keys`
- `DELETE /api-keys/:id`

**Shared Components:**
- AdminSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- ApiKeyCard

**Implementation Notes:**
- List of API keys
- Masked key display
- Usage statistics
- Revoke action
- Generate new key button

---

## Screen 5: Branding

**HTML:** `admin/27-branding.html`
**Target Component:** `app/pages/settings/branding.tsx`
**Route:** `/branding`

**API Integration:**
- `PATCH /admin/branding`

**Shared Components:**
- AdminSidebar
- PageHeader
- NavLink

**New Components:**
- BrandingForm
- LogoUploader
- ColorPicker

**Implementation Notes:**
- Logo upload (light/dark variants)
- Primary color picker
- Company name
- Preview panel
- Save/reset actions

---

## Screen 6: System Health

**HTML:** `admin/28-system-health.html`
**Target Component:** `app/pages/system/health.tsx`
**Route:** `/system-health`

**API Integration:**
- `GET /admin/system-health`

**Shared Components:**
- AdminSidebar
- PageHeader
- StatCard
- StatusBadge
- NavLink

**New Components:**
- HealthMetrics
- ServiceStatus

**Implementation Notes:**
- Service status grid (API, Database, Cache, Queue)
- CPU/Memory/Disk metrics
- Response time charts
- Error rate metrics
- Auto-refresh with interval

---

## Screen 7: Audit Logs

**HTML:** `admin/29-audit-log.html`
**Target Component:** `app/pages/audit/list.tsx`
**Route:** `/audit-logs`

**API Integration:**
- `GET /audit-logs`
- `GET /audit-logs/export`

**Shared Components:**
- AdminSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**Implementation Notes:**
- DataTable with audit entries
- Filters: action type, user, date range
- Search by description
- Export to CSV action
- Click row to view details

---

## Screen 8: Billing

**HTML:** `admin/30-billing.html`
**Target Component:** `app/pages/billing/overview.tsx`
**Route:** `/billing`

**API Integration:**
- `GET /billing/subscription`
- `GET /billing/invoices`
- `POST /billing/payment-method`

**Shared Components:**
- AdminSidebar
- PageHeader
- StatCard
- DataTable
- StatusBadge
- NavLink

**New Components:**
- SubscriptionCard
- InvoiceList
- PaymentMethodCard

**Implementation Notes:**
- Current subscription plan
- Usage metrics
- Invoice history
- Payment method management
- Upgrade/downgrade actions

---

## Admin Layout

```tsx
// app/pages/layout.tsx
import { Outlet } from 'react-router';
import { AdminSidebar } from '~/components/layout/AdminSidebar';

export function AdminLayout() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="flex h-screen bg-slate-900">
      <AdminSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Implementation Checklist

- [ ] Create admin layout component
- [ ] Convert Screen 1: Admin dashboard
- [ ] Convert Screen 2: User management
- [ ] Convert Screen 3: Data sources
- [ ] Convert Screen 4: API keys
- [ ] Convert Screen 5: Branding
- [ ] Convert Screen 6: System health
- [ ] Convert Screen 7: Audit logs
- [ ] Convert Screen 8: Billing
- [ ] Set up routes
- [ ] Create TanStack Query hooks
- [ ] Test admin-only access

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend-admin-dashboard/app/pages/
rg "window\.location\.(href|replace)" frontend-admin-dashboard/app/pages/
```

---
