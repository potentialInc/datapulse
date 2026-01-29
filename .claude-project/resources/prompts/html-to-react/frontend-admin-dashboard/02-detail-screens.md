---
frontend: "frontend-admin-dashboard"
port: 5174
category: "root"
html_files: 10
priority: "P1"
depends_on: "01-admin-screens.md"
---

# Detail Screens - React Conversion

## Context

Converting 10 detail/form HTML screens to React components. These are secondary pages for CRUD operations.

**Architecture:**
- React 19 + React Router v7
- Forms: React Hook Form + Zod
- UI: Tailwind CSS

**Reference:**
- Conversion: `.claude/react/skills/converters/html-to-react-converter.md`
- API: `.claude-project/docs/PROJECT_API.md`

---

## Screen 1: Add Connection

**HTML:** `add-connection.html`
**Target Component:** `app/pages/data-sources/add.tsx`
**Route:** `/data-sources/add`

**API Integration:**
- `POST /data-sources`
- `POST /data-sources/:id/test`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- NavLink

**New Components:**
- ConnectionForm
- DatabaseSelector

**Form Schema:**
```typescript
const connectionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['postgresql', 'mysql', 'mongodb', 'snowflake', 'bigquery', 'redshift']),
  host: z.string().min(1, 'Host is required'),
  port: z.number().min(1).max(65535),
  database: z.string().min(1, 'Database name is required'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  ssl: z.boolean().default(true),
});
```

---

## Screen 2: Create User

**HTML:** `create-user.html`
**Target Component:** `app/pages/users/create.tsx`
**Route:** `/users/create`

**API Integration:**
- `POST /users`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- NavLink

**New Components:**
- CreateUserForm

**Form Schema:**
```typescript
const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  role: z.enum(['business', 'analyst', 'ops_manager', 'admin']),
  sendInvite: z.boolean().default(true),
  temporaryPassword: z.string().min(8).optional(),
});
```

---

## Screen 3: User Details

**HTML:** `user-details.html`
**Target Component:** `app/pages/users/detail.tsx`
**Route:** `/users/:id`

**API Integration:**
- `GET /users/:id`
- `PATCH /users/:id`
- `GET /users/:id/activity`
- `PATCH /users/:id/status`
- `POST /users/:id/reset-password`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- UserAvatar
- StatusBadge
- NavLink

**New Components:**
- UserDetail
- UserActivityLog

**Implementation Notes:**
- User profile information
- Edit mode toggle
- Activity log timeline
- Quick actions: reset password, activate/deactivate
- Delete user (with confirmation)

---

## Screen 4: Data Source Details

**HTML:** `data-source-details.html`
**Target Component:** `app/pages/data-sources/detail.tsx`
**Route:** `/data-sources/:id`

**API Integration:**
- `GET /data-sources/:id`
- `GET /data-sources/:id/metadata`
- `POST /data-sources/:id/test`
- `POST /data-sources/:id/sync`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- StatusBadge
- NavLink

**New Components:**
- DataSourceDetail
- MetadataViewer

**Implementation Notes:**
- Connection details
- Schema/table browser
- Last sync status
- Test connection button
- Sync metadata button
- Edit/delete actions

---

## Screen 5: API Key Details

**HTML:** `api-key-details.html`
**Target Component:** `app/pages/api-keys/detail.tsx`
**Route:** `/api-keys/:id`

**API Integration:**
- `GET /api-keys`
- `PATCH /api-keys/:id`
- `DELETE /api-keys/:id`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- StatusBadge
- NavLink

**New Components:**
- ApiKeyDetail

**Implementation Notes:**
- Key details (masked)
- Usage statistics
- Permissions/scopes
- Last used timestamp
- Revoke action

---

## Screen 6: Generate API Key

**HTML:** `generate-api-key.html`
**Target Component:** `app/pages/api-keys/generate.tsx`
**Route:** `/api-keys/generate`

**API Integration:**
- `POST /api-keys`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- NavLink

**New Components:**
- GenerateApiKeyForm

**Form Schema:**
```typescript
const apiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  scopes: z.array(z.string()).min(1, 'Select at least one scope'),
  expiresAt: z.date().optional(),
});
```

**Implementation Notes:**
- Show generated key ONCE after creation
- Copy to clipboard functionality
- Warning about key visibility

---

## Screen 7: Audit Log Details

**HTML:** `audit-log-details.html`
**Target Component:** `app/pages/audit/detail.tsx`
**Route:** `/audit-logs/:id`

**API Integration:**
- `GET /audit-logs/:id`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- StatusBadge
- NavLink

**New Components:**
- AuditLogDetail

**Implementation Notes:**
- Full audit entry details
- User who performed action
- Timestamp
- Request/response payload
- Related resources links

---

## Screen 8: Invoice Details

**HTML:** `invoice-details.html`
**Target Component:** `app/pages/billing/invoice-detail.tsx`
**Route:** `/billing/invoices/:id`

**API Integration:**
- `GET /billing/invoices`
- `GET /billing/invoices/:id/download`

**Shared Components:**
- AdminSidebar
- PageHeader
- Breadcrumb
- StatusBadge
- NavLink

**New Components:**
- InvoiceDetail

**Implementation Notes:**
- Invoice line items
- Payment status
- Download PDF action
- Payment history

---

## Screen 9: Alert Details (Main Frontend)

**Note:** This screen belongs to the main frontend but is included here for completeness.

**HTML:** `alert-details.html`
**Target Frontend:** `frontend`
**Target Component:** `app/pages/alerts/detail.tsx`
**Route:** `/alerts/:id`

**API Integration:**
- `GET /alerts/:id`
- `POST /alerts/:id/snooze`
- `POST /alerts/:id/acknowledge`
- `POST /alerts/:id/resolve`

---

## Screen 10: Index (Duplicate)

**HTML:** `index.html`
**Note:** This is a duplicate of `auth/02-login.html`. Skip during conversion.

---

## Implementation Checklist

- [ ] Convert Screen 1: Add connection form
- [ ] Convert Screen 2: Create user form
- [ ] Convert Screen 3: User details
- [ ] Convert Screen 4: Data source details
- [ ] Convert Screen 5: API key details
- [ ] Convert Screen 6: Generate API key
- [ ] Convert Screen 7: Audit log details
- [ ] Convert Screen 8: Invoice details
- [ ] Set up routes with :id parameters
- [ ] Create mutation hooks
- [ ] Test form validations

## Post-Conversion Validation

```bash
rg "document\.(getElementById|querySelector)" frontend-admin-dashboard/app/pages/
rg "window\.location\.(href|replace)" frontend-admin-dashboard/app/pages/
```

---
