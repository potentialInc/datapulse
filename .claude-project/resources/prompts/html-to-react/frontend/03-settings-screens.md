---
frontend: "frontend"
port: 5173
category: "settings"
html_files: 3
priority: "P2"
depends_on: "02-business-user-screens.md"
---

# Settings Screens - React Conversion

## Context

Converting 3 settings HTML screens to React components. These extend the user settings section.

**Architecture:**
- React 19 + React Router v7
- Forms: React Hook Form + Zod
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Dashboard Preferences

**HTML:** `settings/settings-dashboard-prefs.html`
**Target Component:** `app/pages/settings/dashboard-prefs.tsx`
**Route:** `/settings/dashboard`

**API Integration:**
- `GET /users/me`
- `PATCH /users/:id`

**Shared Components:**
- Sidebar
- PageHeader
- NavLink

**New Components:**
- DashboardPrefsForm

**Implementation Notes:**
- Default dashboard selection
- Widget density preferences
- Auto-refresh interval
- Theme preferences (dark/light)
- Date format preferences

---

## Screen 2: Notification Settings

**HTML:** `settings/settings-notifications.html`
**Target Component:** `app/pages/settings/notifications.tsx`
**Route:** `/settings/notifications`

**API Integration:**
- `GET /users/me`
- `PATCH /users/:id`

**Shared Components:**
- Sidebar
- PageHeader
- NavLink

**New Components:**
- NotificationPrefsForm

**Implementation Notes:**
- Email notification toggles
- Push notification toggles
- Notification frequency (immediate, daily digest, weekly)
- Alert severity filters
- Report delivery preferences

**Form Structure:**
```typescript
const notificationSchema = z.object({
  emailNotifications: z.object({
    alerts: z.boolean(),
    reports: z.boolean(),
    systemUpdates: z.boolean(),
    weeklyDigest: z.boolean(),
  }),
  pushNotifications: z.object({
    criticalAlerts: z.boolean(),
    mentions: z.boolean(),
  }),
  alertSeverity: z.array(z.enum(['critical', 'warning', 'info'])),
  digestFrequency: z.enum(['daily', 'weekly', 'none']),
});
```

---

## Screen 3: Security Settings

**HTML:** `settings/settings-security.html`
**Target Component:** `app/pages/settings/security.tsx`
**Route:** `/settings/security`

**API Integration:**
- `GET /users/me`
- `PATCH /users/:id`

**Shared Components:**
- Sidebar
- PageHeader
- NavLink

**New Components:**
- SecuritySettingsForm
- TwoFactorSetup

**Implementation Notes:**
- Change password form
- Two-factor authentication setup
- Active sessions list
- Login history
- API key management link

**Password Change Form:**
```typescript
const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

---

## Settings Layout

Create a settings layout with sidebar navigation:

```tsx
// app/pages/settings/layout.tsx
import { Outlet, NavLink } from 'react-router';
import { Sidebar } from '~/components/layout/Sidebar';

const settingsNavItems = [
  { to: '/settings/profile', icon: 'solar:user-bold-duotone', label: 'Profile' },
  { to: '/settings/dashboard', icon: 'solar:chart-2-bold-duotone', label: 'Dashboard' },
  { to: '/settings/notifications', icon: 'solar:bell-bold-duotone', label: 'Notifications' },
  { to: '/settings/security', icon: 'solar:shield-bold-duotone', label: 'Security' },
];

export function SettingsLayout() {
  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar variant="business" navItems={businessNavItems} user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="flex">
          {/* Settings Sub-navigation */}
          <aside className="w-64 border-r border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
            <nav className="space-y-1">
              {settingsNavItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <iconify-icon icon={item.icon} width="20" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Settings Content */}
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## Implementation Checklist

- [ ] Create settings layout with sub-navigation
- [ ] Convert Screen 1: Dashboard preferences
- [ ] Convert Screen 2: Notification settings
- [ ] Convert Screen 3: Security settings
- [ ] Set up nested routes under /settings
- [ ] Test form submissions
- [ ] Test validation

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend/app/pages/settings/
rg "window\.location\.(href|replace)" frontend/app/pages/settings/
```

---
