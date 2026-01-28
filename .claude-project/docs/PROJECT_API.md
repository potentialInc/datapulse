# API Reference: DataPulse

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.DataPulse.com`

## Authentication

All protected endpoints require JWT Bearer token:

```
Authorization: Bearer <token>
```

## API Overview

### Design Principles

DataPulse API follows RESTful conventions with:
- **Resource-based URLs** (`/dashboards`, `/alerts`, `/reports`)
- **Standard HTTP methods** (GET, POST, PATCH, DELETE)
- **JSON request/response format**
- **Stateless authentication via JWT**

### Authentication Flow

1. **Login** → `POST /auth/login` → Returns `accessToken` + `refreshToken`
2. **Authenticated Requests** → Include header: `Authorization: Bearer {accessToken}`
3. **Token Refresh** → `POST /auth/refresh` with `refreshToken` → New `accessToken`
4. **Logout** → `POST /auth/logout` → Invalidates tokens

**SSO Options:**
- Google OAuth: `GET /auth/google` → OAuth flow
- Okta SSO: `GET /auth/okta` → SAML integration

### Pagination

List endpoints support pagination via query parameters:
- `?page=1` - Page number (default: 1)
- `?limit=25` - Items per page (default: 25, max: 100)

**Response format:**
```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 25,
    "pages": 6
  }
}
```

### Filtering & Sorting

- **Filter**: `?status=active&role=analyst`
- **Sort**: `?sort=created_at:desc` (asc/desc)
- **Search**: `?search=dashboard+name`
- **Date Range**: `?from=2024-01-01&to=2024-12-31`

**Example:**
```
GET /dashboards?status=active&sort=updated_at:desc&limit=50
```

### Rate Limiting

- **Unauthenticated**: 100 requests/hour
- **Authenticated**: 1000 requests/hour
- **Admin**: 5000 requests/hour

**Response Headers:**
- `X-RateLimit-Limit`: Total requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Timestamp when limit resets

### Response Format

**Success (200-299):**
```json
{
  "data": {...},
  "message": "Success"
}
```

**Error (400-599):**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Endpoints

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/forgot-password` | Send password reset email | No |
| POST | `/auth/reset-password` | Reset password with token | No |
| POST | `/auth/refresh` | Refresh access token | Yes |
| POST | `/auth/logout` | Logout user | Yes |
| GET | `/auth/google` | Google OAuth redirect | No |
| GET | `/auth/okta` | Okta SSO redirect | No |

### Dashboards

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/dashboards` | List user's dashboards | Yes |
| POST | `/dashboards` | Create new dashboard | Yes (Analyst) |
| GET | `/dashboards/:id` | Get dashboard by ID | Yes |
| PATCH | `/dashboards/:id` | Update dashboard | Yes (Owner) |
| DELETE | `/dashboards/:id` | Delete dashboard | Yes (Owner) |
| POST | `/dashboards/:id/duplicate` | Duplicate dashboard | Yes |
| POST | `/dashboards/:id/share` | Share dashboard with users | Yes (Owner) |
| GET | `/dashboards/:id/widgets` | Get dashboard widgets | Yes |
| POST | `/dashboards/:id/widgets` | Add widget to dashboard | Yes (Analyst) |
| PATCH | `/dashboards/:id/widgets/:widgetId` | Update widget | Yes (Analyst) |
| DELETE | `/dashboards/:id/widgets/:widgetId` | Remove widget | Yes (Analyst) |

### Alerts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/alerts` | List user's alerts | Yes |
| POST | `/alerts` | Create new alert | Yes |
| GET | `/alerts/:id` | Get alert details | Yes |
| PATCH | `/alerts/:id` | Update alert config | Yes |
| DELETE | `/alerts/:id` | Delete alert | Yes |
| POST | `/alerts/:id/acknowledge` | Acknowledge triggered alert | Yes |
| POST | `/alerts/:id/snooze` | Snooze alert | Yes |
| POST | `/alerts/:id/resolve` | Resolve alert | Yes |

### Data Sources

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/data-sources` | List connected data sources | Yes (Admin) |
| POST | `/data-sources` | Add new data source | Yes (Admin) |
| GET | `/data-sources/:id` | Get data source details | Yes (Admin) |
| PATCH | `/data-sources/:id` | Update data source | Yes (Admin) |
| DELETE | `/data-sources/:id` | Remove data source | Yes (Admin) |
| POST | `/data-sources/:id/test` | Test connection | Yes (Admin) |
| POST | `/data-sources/:id/sync` | Sync metadata | Yes (Admin) |
| GET | `/data-sources/:id/tables` | List available tables | Yes |

### Reports

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/reports` | List scheduled reports | Yes |
| POST | `/reports` | Create scheduled report | Yes |
| GET | `/reports/:id` | Get report details | Yes |
| PATCH | `/reports/:id` | Update report schedule | Yes |
| DELETE | `/reports/:id` | Delete scheduled report | Yes |
| GET | `/reports/:id/history` | Get delivery history | Yes |
| POST | `/reports/:id/regenerate` | Regenerate report | Yes |

### Query Editor (Analyst)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/queries/execute` | Execute SQL query | Yes (Analyst) |
| GET | `/queries/history` | Get query history | Yes (Analyst) |
| POST | `/queries/save` | Save query | Yes (Analyst) |
| GET | `/queries/saved` | List saved queries | Yes (Analyst) |

### Data Models (Analyst)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/models` | List data models | Yes |
| POST | `/models` | Create data model | Yes (Analyst) |
| GET | `/models/:id` | Get model details | Yes |
| PATCH | `/models/:id` | Update model | Yes (Analyst) |
| DELETE | `/models/:id` | Delete model | Yes (Analyst) |
| POST | `/models/:id/validate` | Validate model | Yes (Analyst) |

### Operations (Ops Manager)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/ops/dashboard` | Get operations metrics | Yes (Ops) |
| GET | `/ops/team` | List team members | Yes (Ops) |
| GET | `/ops/team/:id` | Get team member details | Yes (Ops) |
| GET | `/ops/workflows` | List pending workflows | Yes (Ops) |
| POST | `/ops/workflows/:id/approve` | Approve workflow | Yes (Ops) |
| POST | `/ops/workflows/:id/reject` | Reject workflow | Yes (Ops) |
| GET | `/ops/sla` | Get SLA status | Yes (Ops) |

### Admin

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/admin/stats` | Get admin statistics | Yes (Admin) |
| GET | `/admin/users` | List all users | Yes (Admin) |
| POST | `/admin/users` | Create user | Yes (Admin) |
| GET | `/admin/users/:id` | Get user details | Yes (Admin) |
| PATCH | `/admin/users/:id` | Update user | Yes (Admin) |
| DELETE | `/admin/users/:id` | Delete user | Yes (Admin) |
| POST | `/admin/users/:id/reset-password` | Reset user password | Yes (Admin) |
| GET | `/admin/api-keys` | List API keys | Yes (Admin) |
| POST | `/admin/api-keys` | Generate API key | Yes (Admin) |
| DELETE | `/admin/api-keys/:id` | Revoke API key | Yes (Admin) |
| GET | `/admin/audit-log` | Get audit log | Yes (Admin) |
| GET | `/admin/health` | Get system health | Yes (Admin) |
| GET | `/admin/branding` | Get branding settings | Yes (Admin) |
| PATCH | `/admin/branding` | Update branding | Yes (Admin) |

### Billing

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/billing/subscription` | Get current subscription | Yes (Admin) |
| POST | `/billing/subscribe` | Subscribe to plan | Yes (Admin) |
| PATCH | `/billing/subscription` | Update subscription | Yes (Admin) |
| GET | `/billing/invoices` | List invoices | Yes (Admin) |
| GET | `/billing/invoices/:id` | Get invoice details | Yes (Admin) |

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
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Error Responses

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |
