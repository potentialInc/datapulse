# API Reference: DataPulse

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.DataPulse.com`

## Authentication

All protected endpoints use httpOnly cookie authentication.

Authentication cookies are automatically included in requests by the browser.
Backend sets secure, httpOnly cookies on successful login.

## Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user (email/password) | No |
| POST | `/auth/login/google` | Google OAuth login | No |
| POST | `/auth/login/okta` | Okta SSO login | No |
| POST | `/auth/refresh` | Refresh access token | Yes |
| POST | `/auth/logout` | Logout user | Yes |
| POST | `/auth/forgot-password` | Send password reset link | No |
| POST | `/auth/reset-password` | Reset password with token | No |
| POST | `/auth/verify-email` | Verify email address | No |

### Users

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/users` | List all users | Yes | Admin |
| GET | `/users/:id` | Get user by ID | Yes | Any |
| GET | `/users/me` | Get current user | Yes | Any |
| POST | `/users` | Create new user | Yes | Admin |
| PATCH | `/users/:id` | Update user | Yes | Admin/Self |
| DELETE | `/users/:id` | Delete user | Yes | Admin |
| PATCH | `/users/:id/status` | Activate/Deactivate user | Yes | Admin |
| POST | `/users/:id/reset-password` | Admin reset user password | Yes | Admin |
| GET | `/users/:id/activity` | Get user activity log | Yes | Admin/Ops Manager |

### Dashboards

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/dashboards` | List all dashboards (owned + shared) | Yes | Any |
| GET | `/dashboards/:id` | Get dashboard by ID | Yes | Any |
| POST | `/dashboards` | Create new dashboard | Yes | Analyst |
| PATCH | `/dashboards/:id` | Update dashboard | Yes | Owner/Analyst |
| DELETE | `/dashboards/:id` | Delete dashboard | Yes | Owner/Analyst |
| POST | `/dashboards/:id/duplicate` | Duplicate dashboard | Yes | Analyst |
| GET | `/dashboards/:id/widgets` | Get all widgets for dashboard | Yes | Any |
| POST | `/dashboards/:id/share` | Share dashboard with users | Yes | Owner/Analyst |
| DELETE | `/dashboards/:id/share/:userId` | Revoke dashboard access | Yes | Owner/Analyst |
| GET | `/dashboards/:id/export` | Export dashboard (PDF/PNG) | Yes | Any |

### Widgets

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/widgets/:id` | Get widget by ID | Yes | Any |
| POST | `/widgets` | Create new widget | Yes | Analyst |
| PATCH | `/widgets/:id` | Update widget | Yes | Analyst |
| DELETE | `/widgets/:id` | Delete widget | Yes | Analyst |
| POST | `/widgets/:id/refresh` | Refresh widget data | Yes | Any |

### Alerts

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/alerts` | List all alerts | Yes | Any |
| GET | `/alerts/:id` | Get alert by ID | Yes | Any |
| POST | `/alerts` | Create new alert | Yes | Any |
| PATCH | `/alerts/:id` | Update alert | Yes | Owner |
| DELETE | `/alerts/:id` | Delete alert | Yes | Owner |
| POST | `/alerts/:id/snooze` | Snooze alert | Yes | Any |
| POST | `/alerts/:id/acknowledge` | Acknowledge alert | Yes | Any |
| POST | `/alerts/:id/resolve` | Resolve alert | Yes | Any |
| GET | `/alerts/active` | Get active triggered alerts | Yes | Any |

### Data Sources

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/data-sources` | List all data sources | Yes | Admin/Analyst |
| GET | `/data-sources/:id` | Get data source by ID | Yes | Admin/Analyst |
| POST | `/data-sources` | Create new data source | Yes | Admin |
| PATCH | `/data-sources/:id` | Update data source | Yes | Admin |
| DELETE | `/data-sources/:id` | Delete data source | Yes | Admin |
| POST | `/data-sources/:id/test` | Test connection | Yes | Admin |
| POST | `/data-sources/:id/sync` | Sync metadata | Yes | Admin |
| GET | `/data-sources/:id/metadata` | Get tables/schemas | Yes | Analyst |

### Reports

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/reports` | List scheduled reports | Yes | Any |
| GET | `/reports/:id` | Get report by ID | Yes | Any |
| POST | `/reports` | Create scheduled report | Yes | Any |
| PATCH | `/reports/:id` | Update report schedule | Yes | Owner |
| DELETE | `/reports/:id` | Delete scheduled report | Yes | Owner |
| POST | `/reports/:id/run` | Manually generate report | Yes | Owner |
| GET | `/reports/:id/history` | Get report delivery history | Yes | Owner |
| GET | `/reports/generated` | List generated reports | Yes | Any |
| GET | `/reports/generated/:id/download` | Download generated report | Yes | Any |

### Query Editor (Data Analyst only)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/queries/execute` | Execute SQL query | Yes | Analyst |
| POST | `/queries/explain` | Explain query execution | Yes | Analyst |
| GET | `/queries/history` | Get query history | Yes | Analyst |
| POST | `/queries/save` | Save query | Yes | Analyst |
| GET | `/queries/saved` | List saved queries | Yes | Analyst |
| DELETE | `/queries/saved/:id` | Delete saved query | Yes | Analyst |
| POST | `/queries/export` | Export query results (CSV/JSON) | Yes | Analyst |

### Data Models (Data Analyst only)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/data-models` | List all data models | Yes | Analyst |
| GET | `/data-models/:id` | Get data model by ID | Yes | Analyst |
| POST | `/data-models` | Create new data model | Yes | Analyst |
| PATCH | `/data-models/:id` | Update data model | Yes | Analyst |
| DELETE | `/data-models/:id` | Delete data model | Yes | Analyst |
| POST | `/data-models/:id/validate` | Validate data model | Yes | Analyst |
| GET | `/data-models/:id/dependencies` | Get model dependencies | Yes | Analyst |

### Operations (Ops Manager only)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/operations/dashboard` | Get operations metrics | Yes | Ops Manager |
| GET | `/operations/team` | List team members | Yes | Ops Manager |
| GET | `/operations/team/:id` | Get team member details | Yes | Ops Manager |
| POST | `/operations/team/:id/assign` | Assign task to team member | Yes | Ops Manager |
| GET | `/operations/workflows` | List pending workflows | Yes | Ops Manager |
| POST | `/operations/workflows/:id/approve` | Approve workflow | Yes | Ops Manager |
| POST | `/operations/workflows/:id/reject` | Reject workflow | Yes | Ops Manager |
| GET | `/operations/sla` | Get SLA dashboard | Yes | Ops Manager |
| GET | `/operations/sla/at-risk` | Get at-risk items | Yes | Ops Manager |

### Admin

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/admin/dashboard` | Get admin dashboard stats | Yes | Admin |
| GET | `/admin/users` | List all users with filters | Yes | Admin |
| POST | `/admin/users/:id/approve` | Approve new user account | Yes | Admin |
| GET | `/admin/integrations` | List all integrations | Yes | Admin |
| PATCH | `/admin/branding` | Update white-label branding | Yes | Admin |
| GET | `/admin/system-health` | Get system health metrics | Yes | Admin |
| POST | `/admin/backup` | Trigger system backup | Yes | Admin |
| POST | `/admin/restore` | Restore from backup | Yes | Admin |
| POST | `/admin/cache/clear` | Clear system cache | Yes | Admin |

### Audit Logs

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/audit-logs` | List audit logs with filters | Yes | Admin |
| GET | `/audit-logs/:id` | Get audit log details | Yes | Admin |
| GET | `/audit-logs/export` | Export audit logs (CSV) | Yes | Admin |

### API Keys

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api-keys` | List user's API keys | Yes | Any |
| POST | `/api-keys` | Generate new API key | Yes | Any |
| PATCH | `/api-keys/:id` | Update API key | Yes | Owner |
| DELETE | `/api-keys/:id` | Revoke API key | Yes | Owner |

### Billing (Stripe Integration)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/billing/subscription` | Get current subscription | Yes | Admin |
| POST | `/billing/subscription/upgrade` | Upgrade subscription | Yes | Admin |
| POST | `/billing/subscription/downgrade` | Downgrade subscription | Yes | Admin |
| POST | `/billing/payment-method` | Update payment method | Yes | Admin |
| GET | `/billing/invoices` | List invoices | Yes | Admin |
| GET | `/billing/invoices/:id/download` | Download invoice | Yes | Admin |

## Request/Response Examples

### Login

**Request:**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "Business User"
  }
}
```

**Note:** Authentication is handled via httpOnly cookies set in the response headers. The cookies include:
- `access_token` - Secure, httpOnly cookie for API authentication
- `refresh_token` - Secure, httpOnly cookie for token refresh

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |
