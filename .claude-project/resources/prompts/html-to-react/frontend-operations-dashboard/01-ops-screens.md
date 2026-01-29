---
frontend: "frontend-operations-dashboard"
port: 5175
category: "ops-manager"
html_files: 5
priority: "P1"
depends_on: "00-shared-components.md"
---

# Operations Manager Screens - React Conversion

## Context

Converting 5 operations manager HTML screens to React components for the operations dashboard application.

**Architecture:**
- React 19 + React Router v7
- State: Redux Toolkit + TanStack Query
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Ops Dashboard

**HTML:** `ops-manager/18-ops-dashboard.html`
**Target Component:** `app/pages/dashboard/home.tsx`
**Route:** `/`

**API Integration:**
- `GET /operations/dashboard`
- `GET /operations/sla/at-risk`

**Shared Components:**
- OpsSidebar
- PageHeader
- StatCard
- NavLink
- UserAvatar
- StatusBadge
- ActivityItem

**New Components:**
- OpsSidebar

**Implementation Notes:**
- Team performance KPIs
- At-risk SLA items
- Pending approvals count
- Recent activity feed
- Quick actions

---

## Screen 2: Team Overview

**HTML:** `ops-manager/19-team-overview.html`
**Target Component:** `app/pages/team/overview.tsx`
**Route:** `/team`

**API Integration:**
- `GET /operations/team`

**Shared Components:**
- OpsSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- UserAvatar
- NavLink

**New Components:**
- TeamMemberCard

**Implementation Notes:**
- Team member grid or list view
- Status indicators (available, busy, offline)
- Current workload per member
- Click to view member details
- Filter by status

---

## Screen 3: Team Member Detail

**HTML:** `ops-manager/20-team-member-detail.html`
**Target Component:** `app/pages/team/detail.tsx`
**Route:** `/team/:id`

**API Integration:**
- `GET /operations/team/:id`
- `POST /operations/team/:id/assign`

**Shared Components:**
- OpsSidebar
- PageHeader
- Breadcrumb
- UserAvatar
- StatusBadge
- NavLink

**New Components:**
- TeamMemberProfile
- TaskList

**Implementation Notes:**
- Member profile information
- Current tasks assigned
- Performance metrics
- Assign new task action
- Activity timeline

---

## Screen 4: Workflows

**HTML:** `ops-manager/21-workflows.html`
**Target Component:** `app/pages/workflows/list.tsx`
**Route:** `/workflows`

**API Integration:**
- `GET /operations/workflows`
- `POST /operations/workflows/:id/approve`
- `POST /operations/workflows/:id/reject`

**Shared Components:**
- OpsSidebar
- PageHeader
- SearchInput
- DataTable
- StatusBadge
- NavLink

**New Components:**
- WorkflowCard
- ApprovalActions

**Implementation Notes:**
- Pending workflows list
- Filter by type, requester, date
- Approve/reject actions inline
- Bulk approve capability
- Workflow details modal

**Approval Actions Component:**
```tsx
interface ApprovalActionsProps {
  workflowId: string;
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalActions({ workflowId, onApprove, onReject }: ApprovalActionsProps) {
  const approve = useApproveWorkflow();
  const reject = useRejectWorkflow();

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-emerald-400 hover:bg-emerald-500/10"
        onClick={() => approve.mutate(workflowId)}
        disabled={approve.isPending}
      >
        <iconify-icon icon="solar:check-circle-bold" width="16" />
        Approve
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="text-rose-400 hover:bg-rose-500/10"
        onClick={() => reject.mutate(workflowId)}
        disabled={reject.isPending}
      >
        <iconify-icon icon="solar:close-circle-bold" width="16" />
        Reject
      </Button>
    </div>
  );
}
```

---

## Screen 5: SLA Monitor

**HTML:** `ops-manager/22-sla-monitor.html`
**Target Component:** `app/pages/sla/monitor.tsx`
**Route:** `/sla`

**API Integration:**
- `GET /operations/sla`
- `GET /operations/sla/at-risk`

**Shared Components:**
- OpsSidebar
- PageHeader
- StatCard
- DataTable
- StatusBadge
- NavLink

**New Components:**
- SLAChart
- AtRiskItems

**Implementation Notes:**
- SLA compliance percentage cards
- At-risk items highlighted
- Timeline chart showing SLA trends
- Filter by category
- Drill-down to specific SLA items

**At-Risk Items Component:**
```tsx
interface AtRiskItem {
  id: string;
  name: string;
  deadline: Date;
  timeRemaining: string;
  assignee: User;
  priority: 'high' | 'medium' | 'low';
}

export function AtRiskItems({ items }: { items: AtRiskItem[] }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">At Risk Items</h3>
      {items.map(item => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
              <iconify-icon icon="solar:danger-triangle-bold" width="20" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{item.name}</p>
              <p className="text-xs text-rose-400">{item.timeRemaining} remaining</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserAvatar name={item.assignee.name} size="sm" />
            <Button size="sm" variant="ghost">
              Take Action
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## Ops Layout

```tsx
// app/pages/layout.tsx
import { Outlet } from 'react-router';
import { OpsSidebar } from '~/components/layout/OpsSidebar';

export function OpsLayout() {
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="flex h-screen bg-slate-900">
      <OpsSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Implementation Checklist

- [ ] Create ops layout component
- [ ] Convert Screen 1: Ops dashboard
- [ ] Convert Screen 2: Team overview
- [ ] Convert Screen 3: Team member detail
- [ ] Convert Screen 4: Workflows with approval actions
- [ ] Convert Screen 5: SLA monitor
- [ ] Set up routes
- [ ] Create TanStack Query hooks
- [ ] Create mutation hooks for approve/reject
- [ ] Test ops manager-only access

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend-operations-dashboard/app/pages/
rg "window\.location\.(href|replace)" frontend-operations-dashboard/app/pages/
```

---
