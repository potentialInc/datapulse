# HTML Screens Analysis Report

Generated: 2026-01-29

---

## HTML File Inventory

**Total Files:** 45
**Source Path:** `.claude-project/resources/HTML/`

### By Category

| Category | Count | Files |
|----------|-------|-------|
| auth/ | 6 | 01-landing.html, 02-login.html, 03-signup.html, 04-forgot-password.html, 05-reset-password.html, 06-email-verification.html |
| business-user/ | 6 | 07-business-home.html, 08-dashboard-list.html, 09-dashboard-view.html, 10-reports-list.html, 11-alerts-list.html, 12-user-settings.html |
| data-analyst/ | 5 | 13-analyst-home.html, 14-dashboard-builder.html, 15-query-editor.html, 16-data-models.html, 17-data-model-editor.html |
| ops-manager/ | 5 | 18-ops-dashboard.html, 19-team-overview.html, 20-team-member-detail.html, 21-workflows.html, 22-sla-monitor.html |
| admin/ | 8 | 23-admin-dashboard.html, 24-user-management.html, 25-data-sources.html, 26-api-keys.html, 27-branding.html, 28-system-health.html, 29-audit-log.html, 30-billing.html |
| settings/ | 3 | settings-dashboard-prefs.html, settings-notifications.html, settings-security.html |
| modals/ | 2 | modal-create-alert.html, modal-schedule-report.html |
| root/ | 10 | add-connection.html, alert-details.html, api-key-details.html, audit-log-details.html, create-user.html, data-source-details.html, generate-api-key.html, index.html, invoice-details.html, user-details.html |

---

## Frontend Discovery

**Status:** No frontend directories exist yet

The project requires initial React application setup. Recommended structure based on HTML categories:

| Frontend App | Purpose | HTML Categories |
|--------------|---------|-----------------|
| frontend/ | Main user-facing app | auth/, business-user/, settings/ |
| frontend-admin-dashboard/ | Admin portal | admin/, root detail pages |
| frontend-operations-dashboard/ | Ops team dashboard | ops-manager/ |
| frontend-analytics-dashboard/ | Data analyst tools | data-analyst/ |

---

## Shared Component Candidates

### High Priority (P0 - 5+ instances)

#### 1. Sidebar
- **Usage:** 35+ instances
- **Used in:** All dashboard and main screens (business-user/, admin/, data-analyst/, ops-manager/, settings/)
- **Pattern:**
```html
<aside class="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-slate-800/50">...</div>
    <!-- Navigation -->
    <nav class="flex-1 px-3 py-6 space-y-1 overflow-y-auto">...</nav>
    <!-- User Profile -->
    <div class="p-4 border-t border-slate-800">...</div>
</aside>
```
- **Variants:** Business, Admin (with badge), Analyst, Ops Manager

#### 2. PageHeader
- **Usage:** 30+ instances
- **Used in:** All main pages
- **Pattern:**
```html
<header class="flex items-center justify-between px-8 py-6 z-10">
    <div>
        <h1 class="text-2xl font-semibold text-white tracking-tight">Title</h1>
        <p class="text-sm text-slate-400 mt-1">Subtitle</p>
    </div>
    <div class="flex items-center gap-4">...</div>
</header>
```

#### 3. StatCard / KPICard
- **Usage:** 24+ instances
- **Used in:** business-home, admin-dashboard, ops-dashboard
- **Pattern:**
```html
<div class="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all group shadow-sm">
    <div class="flex justify-between items-start mb-4">
        <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <iconify-icon icon="..." width="20"></iconify-icon>
        </div>
        <span class="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
    </div>
    <h3 class="text-slate-400 text-sm font-medium">Label</h3>
    <p class="text-2xl font-semibold text-white mt-1">Value</p>
</div>
```

#### 4. NavLink
- **Usage:** 40+ instances
- **Used in:** All sidebar navigations
- **Pattern (Inactive):**
```html
<a href="./page.html" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800 transition-all">
    <iconify-icon icon="..." width="20" class="text-slate-500 group-hover:text-slate-300 transition-colors"></iconify-icon>
    Label
</a>
```
- **Pattern (Active):**
```html
<a href="./page.html" class="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
    <iconify-icon icon="..." width="20"></iconify-icon>
    Label
</a>
```

#### 5. UserAvatar
- **Usage:** 20+ instances
- **Used in:** Sidebars, tables, profile cards
- **Pattern:**
```html
<div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">JD</div>
```
- **Variants:** Different gradient colors per role (blue/indigo, purple/pink, amber/orange, emerald/teal, rose/pink)

#### 6. StatusBadge
- **Usage:** 25+ instances
- **Used in:** Tables, cards, lists
- **Patterns:**
```html
<!-- Success/Active -->
<span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Active</span>

<!-- Warning/Pending -->
<span class="text-xs font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">Pending</span>

<!-- Error/Critical -->
<span class="text-xs font-medium text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">Critical</span>

<!-- Neutral/Disabled -->
<span class="text-xs font-medium text-slate-400 bg-slate-700/50 px-2.5 py-1 rounded-full border border-slate-600">Inactive</span>
```

### Medium Priority (P1 - 3-4 instances)

#### 7. DataTable
- **Usage:** 5+ instances
- **Used in:** user-management, audit-log, billing, alerts-list
- **Pattern:**
```html
<table class="w-full">
    <thead class="bg-slate-800/50 sticky top-0">
        <tr>
            <th class="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Column</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-slate-800">
        <tr class="hover:bg-slate-800/30 transition-colors">...</tr>
    </tbody>
</table>
```

#### 8. ActivityItem
- **Usage:** 8+ instances
- **Used in:** business-home, admin-dashboard, ops-dashboard
- **Pattern:**
```html
<div class="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors border border-transparent hover:border-slate-700/50">
    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
        <iconify-icon icon="..." width="20"></iconify-icon>
    </div>
    <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-0.5">
            <p class="text-sm font-medium text-slate-200">Title</p>
            <span class="text-xs text-slate-500">2 min ago</span>
        </div>
        <p class="text-sm text-slate-400 truncate">Description</p>
    </div>
</div>
```

#### 9. Modal
- **Usage:** 2+ instances
- **Used in:** modal-create-alert, modal-schedule-report
- **Pattern:**
```html
<!-- Backdrop -->
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm" onclick="window.history.back()"></div>

<!-- Modal Dialog -->
<div class="relative bg-slate-800 rounded-2xl border border-slate-700/50 w-full max-w-xl shadow-2xl z-10">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">...</div>
    <!-- Content -->
    <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">...</div>
    <!-- Footer -->
    <div class="flex items-center justify-between px-6 py-4 border-t border-slate-700/50 bg-slate-800/50">...</div>
</div>
```

#### 10. SearchInput
- **Usage:** 10+ instances
- **Used in:** Dashboards, management pages
- **Pattern:**
```html
<div class="relative group">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <iconify-icon icon="solar:magnifer-linear" class="text-slate-500 group-focus-within:text-indigo-400 transition-colors"></iconify-icon>
    </div>
    <input type="text" class="bg-slate-800/50 border border-slate-700 text-sm rounded-lg block w-64 pl-10 p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" placeholder="Search...">
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span class="text-slate-600 text-xs border border-slate-700 rounded px-1.5 py-0.5">⌘K</span>
    </div>
</div>
```

#### 11. DashboardCard
- **Usage:** 8+ instances
- **Used in:** business-home, dashboard-list
- **Pattern:**
```html
<a href="#" class="group block bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
    <div class="h-32 bg-slate-800 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <!-- Chart visualization -->
    </div>
    <div class="p-4">
        <h3 class="text-slate-200 font-medium text-sm group-hover:text-indigo-400 transition-colors">Title</h3>
        <div class="flex items-center gap-2 mt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <p class="text-xs text-slate-500">Viewed 2h ago</p>
        </div>
    </div>
</a>
```

#### 12. Breadcrumb
- **Usage:** 5+ instances
- **Used in:** user-details, data-source-details, other detail pages
- **Pattern:**
```html
<div class="flex items-center gap-2 text-sm text-slate-400 mb-2">
    <a href="./parent.html" class="hover:text-white transition-colors">Parent</a>
    <iconify-icon icon="solar:alt-arrow-right-linear" width="14"></iconify-icon>
    <span class="text-white">Current Page</span>
</div>
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `slate-900` | #0F172A | Background |
| `slate-800` | #1E293B | Surface / Cards |
| `slate-700` | #334155 | Borders |
| `slate-600` | #475569 | Muted text |
| `slate-400` | #94A3B8 | Secondary text |
| `slate-300` | #CBD5E1 | Light text |
| `slate-50` | #F8FAFC | Primary text |
| `indigo-400` | #818CF8 | Light primary |
| `indigo-500` | #6366F1 | Primary color |
| `indigo-600` | #4F46E5 | Primary hover |
| `emerald-500` | #10B981 | Success |
| `amber-500` | #F59E0B | Warning |
| `rose-500` | #EF4444 | Error |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Code Font:** JetBrains Mono (query editor only)
- **Weights Used:** 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Features:** `font-feature-settings: "cv02", "cv03", "cv04", "cv11"`

### Text Sizes

| Class | Usage |
|-------|-------|
| `text-xs` | Badges, labels, timestamps |
| `text-sm` | Body text, navigation items |
| `text-base` | Section headers |
| `text-lg` | Card titles |
| `text-xl` | Page subtitles |
| `text-2xl` | Page titles, large values |
| `text-3xl` | Hero text |

### Spacing

| Category | Values |
|----------|--------|
| Padding | p-2, p-3, p-4, p-5, p-6, p-8, px-3, px-6, px-8, py-2, py-4, py-6 |
| Gaps | gap-1, gap-2, gap-3, gap-4, gap-6, gap-8 |
| Margins | mt-1, mt-2, mt-4, mb-2, mb-4, mb-6 |

### Border Radius

| Class | Usage |
|-------|-------|
| `rounded` | Small elements |
| `rounded-lg` | Buttons, inputs |
| `rounded-xl` | Cards |
| `rounded-2xl` | Modals, large cards |
| `rounded-full` | Avatars, badges |

### Layout Constants

- **Sidebar Width:** 240px (`w-[240px]`)
- **Header Height:** ~80px (`py-6 px-8`)
- **Card Padding:** 20px (`p-5`) or 24px (`p-6`)

---

## Interactive Patterns

### Forms

| Pattern | Files |
|---------|-------|
| Login form (email + password) | 02-login.html, index.html |
| Signup form (multi-field) | 03-signup.html |
| Password with visibility toggle | All auth forms |
| Select dropdown | 03-signup.html, query-editor.html, modal-create-alert.html |
| Checkbox groups | 03-signup.html, modal-create-alert.html |
| Radio button groups | modal-create-alert.html |
| Search inputs | Most dashboard pages |

### Navigation

| Pattern | Implementation |
|---------|----------------|
| Internal links | `<a href="./page.html">` |
| Back navigation | `onclick="window.history.back()"` |
| Breadcrumbs | Detail pages |
| Active nav state | `bg-indigo-500/10 text-indigo-400 border-indigo-500/10` |

### Toggle/Visibility

| Pattern | Files |
|---------|-------|
| Password show/hide | 02-login.html, 03-signup.html, index.html |
| Modal open/close | modal-create-alert.html, modal-schedule-report.html |
| Dropdown menu | Various (class="hidden" toggle) |
| Metric preview | modal-create-alert.html |

---

## JavaScript Event Handlers

### Anti-Pattern Summary

| Pattern | Total Count | React Equivalent |
|---------|-------------|------------------|
| `document.getElementById()` | 25+ | `useRef()` or controlled inputs |
| `window.location.href` | 6+ | `useNavigate()` hook |
| `window.history.back()` | 3+ | `useNavigate(-1)` |
| `classList.add/remove/toggle` | 8+ | Conditional className with state |
| `element.innerHTML =` | 4+ | JSX with state |
| `element.value` | 10+ | Controlled input with `useState` |
| `sessionStorage.setItem/getItem` | 4+ | Redux or Context + persistence hook |
| `setAttribute()` | 4+ | Props or state-driven attributes |

### Event Handlers by File

#### auth/02-login.html

| Function | Purpose | Anti-Patterns | React Strategy |
|----------|---------|---------------|----------------|
| `togglePassword()` | Toggle password visibility | `getElementById(2x)`, `setAttribute` | `useState<boolean>` for visibility |
| `fillCredentials(email, password)` | Auto-fill demo credentials | `getElementById(2x)` | Controlled inputs with `setValue()` from React Hook Form |
| Form `onsubmit` IIFE | Validate credentials, route by role | `getElementById(4x)`, `window.location`, `sessionStorage` | React Hook Form + `useNavigate()` + Redux auth slice |

#### auth/03-signup.html

| Function | Purpose | Anti-Patterns | React Strategy |
|----------|---------|---------------|----------------|
| `togglePassword(inputId, iconId)` | Toggle password visibility (parameterized) | `getElementById(2x)`, `setAttribute` | `useState<Record<string, boolean>>` for multiple fields |
| `checkStrength(password)` | Password strength indicator | `getElementById(4x)`, `className` manipulation | `useState` with computed strength, conditional classes |

#### modals/modal-create-alert.html

| Function | Purpose | Anti-Patterns | React Strategy |
|----------|---------|---------------|----------------|
| `updateMetricPreview()` | Show/hide metric preview | `getElementById(3x)`, `classList` | `useState` for selected metric, conditional rendering |
| `createAlert()` | Create alert and navigate | `window.location`, `alert()` | Form submission handler + `useNavigate()` + toast notification |

#### index.html

| Function | Purpose | Anti-Patterns | React Strategy |
|----------|---------|---------------|----------------|
| `handleLogin(event)` | Full login handler with routing | `getElementById(4x)`, `sessionStorage`, `window.location`, `classList` | React Hook Form + Redux + `useNavigate()` |
| `showError(message)` | Display error message | `getElementById`, `innerHTML`, `classList` | Error state + conditional rendering with error component |
| `togglePassword()` | Toggle password visibility | `getElementById(2x)`, `setAttribute` | `useState<boolean>` |
| `fillCredentials(email, password)` | Fill demo credentials | `getElementById(2x)` | `setValue()` from React Hook Form |

---

## React Conversion Checklist

### Pre-Conversion Setup

- [ ] Initialize React 19 + Vite project
- [ ] Install dependencies: react-router-dom, react-hook-form, zod, @tanstack/react-query
- [ ] Configure Tailwind CSS with custom colors
- [ ] Set up Redux Toolkit for auth state
- [ ] Configure iconify-icon for React

### Component Priorities

**Phase 1: Shared Components (P0)**
1. [ ] Sidebar (with variants)
2. [ ] PageHeader
3. [ ] StatCard
4. [ ] NavLink
5. [ ] UserAvatar
6. [ ] StatusBadge

**Phase 2: Common Components (P1)**
1. [ ] DataTable
2. [ ] ActivityItem
3. [ ] Modal
4. [ ] SearchInput
5. [ ] DashboardCard
6. [ ] Breadcrumb

**Phase 3: Page Conversions**
1. [ ] Auth pages (login, signup, forgot-password)
2. [ ] Business user pages
3. [ ] Admin pages
4. [ ] Data analyst pages
5. [ ] Ops manager pages
6. [ ] Settings pages
7. [ ] Modal pages

### Post-Conversion Validation

Run these commands after each screen conversion (should return 0 results):

```bash
# Anti-pattern detection
rg "document\.(getElementById|querySelector)" src/
rg "window\.location\.(href|replace)" src/
rg "classList\.(add|remove|toggle)" src/
rg "innerHTML\s*=" src/

# Verify React patterns are present
rg "useForm|useNavigate|useState" src/  # Should find matches
```

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total HTML files | 45 |
| Categories | 8 (including root) |
| P0 Shared Components | 6 |
| P1 Components | 6 |
| Files with JavaScript | 4 |
| Anti-pattern occurrences | 25+ |
| Unique colors | 13 |
| Font families | 2 (Inter, JetBrains Mono) |

---

## Next Steps

1. Run `/html-to-react --map` to generate mapping.json
2. Run `/html-to-react --prompts` to create conversion prompts
3. Review prompts in output directory
4. Execute conversions following prompt instructions
5. Run design QA after each conversion
