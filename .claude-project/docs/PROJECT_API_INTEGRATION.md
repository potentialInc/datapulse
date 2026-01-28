# API Integration Status: DataPulse

## Overview

This document tracks which frontend pages use which API endpoints and provides integration guidelines for the DataPulse frontend.

## Service Layer Architecture

DataPulse frontend uses a three-tier service layer for API integration:

### Layer 1: HTTP Orchestrator (`httpService.ts`)

Central Axios instance with:
- Base URL configuration (`http://localhost:3000/api` or production URL)
- Request/response interceptors
- Global error handling
- Token management (attach JWT to requests)

### Layer 2: HTTP Method Factories (`httpMethods/`)

Factory functions for each HTTP method:
- `get.ts` - GET requests with query params
- `post.ts` - POST requests with body
- `patch.ts` - PATCH requests for updates
- `delete.ts` - DELETE requests
- `put.ts` - PUT requests for replacements

**Interceptors:**
- `requestInterceptor.ts` - Adds auth token to headers
- `responseInterceptor.ts` - Handles errors and token refresh

### Layer 3: Domain Services (`httpServices/`)

Feature-specific services using method factories:
- `authService.ts` - Authentication endpoints
- `dashboardService.ts` - Dashboard CRUD
- `alertService.ts` - Alert management
- `reportService.ts` - Report scheduling
- `queryService.ts` - SQL query execution
- `dataSourceService.ts` - Data source management
- `userService.ts` - User management
- `adminService.ts` - Admin operations
- `billingService.ts` - Subscription billing

### Request Flow

```
Component
  ↓
Service Method (dashboardService.getDashboards)
  ↓
HTTP Method Factory (get)
  ↓
Request Interceptor (add auth token)
  ↓
Axios → Backend API
  ↓
Response Interceptor (handle errors, refresh token)
  ↓
Component (update state)
```

## Integration Guidelines

### Creating a New Service

1. **Create service file:** `app/services/httpServices/featureService.ts`
2. **Import HTTP methods:** `import { get, post, patch, del } from '../httpMethods'`
3. **Define service methods:**

```typescript
export const featureService = {
  getItems: () => get('/items'),
  getItem: (id: string) => get(`/items/${id}`),
  createItem: (data) => post('/items', data),
  updateItem: (id: string, data) => patch(`/items/${id}`, data),
  deleteItem: (id: string) => del(`/items/${id}`)
};
```

4. **Use in components:**

```typescript
import { featureService } from '~/services/httpServices/featureService';

const Component = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await featureService.getItems();
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return <div>{/* render data */}</div>;
};
```

### Error Handling Pattern

All services automatically handle errors via response interceptor:

- **401 Unauthorized** → Redirect to login, clear tokens
- **403 Forbidden** → Show permission error toast
- **404 Not Found** → Show not found error
- **429 Rate Limit** → Show rate limit warning
- **500 Server Error** → Show generic error message

**Custom error handling:**
```typescript
try {
  await dashboardService.createDashboard(data);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Handle validation errors
    error.details.forEach(err => {
      showFieldError(err.field, err.message);
    });
  } else if (error.code === 'CONFLICT') {
    // Handle conflict
    showError('Dashboard with this name already exists');
  }
}
```

### Loading & Error States

**Using React State:**
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const result = await service.getData();
    setData(result.data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

**Using TanStack Query (Recommended for data fetching):**
```typescript
import { useQuery } from '@tanstack/react-query';

const useDashboards = () => {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: () => dashboardService.getDashboards(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// In component:
const { data, isLoading, error } = useDashboards();
```

## Performance Optimization

### Caching Strategy

Use TanStack Query for server state caching:

- **Dashboards**: 5 minutes cache time
- **Alerts**: 1 minute cache time
- **Reports**: 10 minutes cache time
- **Static data**: 1 hour cache time

```typescript
const useDashboards = () => {
  return useQuery({
    queryKey: ['dashboards'],
    queryFn: () => dashboardService.getDashboards(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};
```

### Request Batching

Combine multiple API calls when possible:

```typescript
const [dashboards, alerts, reports] = await Promise.all([
  dashboardService.getDashboards(),
  alertService.getAlerts(),
  reportService.getReports()
]);
```

### Debouncing

Debounce search/filter inputs to avoid excessive API calls:

```typescript
import { debounce } from 'lodash';

const debouncedSearch = useCallback(
  debounce((query: string) => {
    searchService.search(query);
  }, 300),
  []
);

// In input handler:
const handleSearchChange = (e) => {
  debouncedSearch(e.target.value);
};
```

### Request Cancellation

Cancel requests when component unmounts:

```typescript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const data = await service.getData({ signal: controller.signal });
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, []);
```

## Frontend Pages → API Mapping

### Auth Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| 01-landing.html | `/` | - | Pending |
| 02-login.html | `/login` | POST /auth/login | Pending |
| 03-signup.html | `/signup` | POST /auth/register | Pending |
| 04-forgot-password.html | `/forgot-password` | POST /auth/forgot-password | Pending |
| 05-reset-password.html | `/reset-password` | POST /auth/reset-password | Pending |
| 06-email-verification.html | `/verify-email` | POST /auth/verify-email | Pending |

### Business User Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| 07-business-home.html | `/home` | GET /dashboards/recent, GET /alerts/active | Pending |
| 08-dashboard-list.html | `/dashboards` | GET /dashboards | Pending |
| 09-dashboard-view.html | `/dashboards/:id` | GET /dashboards/:id, GET /widgets | Pending |
| 10-reports-list.html | `/reports` | GET /reports | Pending |
| 11-alerts-list.html | `/alerts` | GET /alerts | Pending |
| 12-user-settings.html | `/settings` | GET /users/me, PATCH /users/me | Pending |
| alert-details.html | `/alerts/:id` | GET /alerts/:id | Pending |
| modal-create-alert.html | - | POST /alerts | Pending |
| modal-schedule-report.html | - | POST /reports | Pending |

### Data Analyst Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| 13-analyst-home.html | `/analyst` | GET /dashboards, GET /models | Pending |
| 14-dashboard-builder.html | `/builder/:id` | GET/POST/PATCH dashboards, widgets | Pending |
| 15-query-editor.html | `/query` | POST /queries/execute, GET /queries/history | Pending |
| 16-data-models.html | `/models` | GET /models | Pending |
| 17-data-model-editor.html | `/models/:id` | GET/PATCH /models/:id | Pending |

### Operations Manager Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| 18-ops-dashboard.html | `/ops` | GET /ops/dashboard | Pending |
| 19-team-overview.html | `/team` | GET /ops/team | Pending |
| 20-team-member-detail.html | `/team/:id` | GET /ops/team/:id | Pending |
| 21-workflows.html | `/workflows` | GET /ops/workflows | Pending |
| 22-sla-monitor.html | `/sla` | GET /ops/sla | Pending |

### Admin Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| 23-admin-dashboard.html | `/admin` | GET /admin/stats | Pending |
| 24-user-management.html | `/admin/users` | GET /admin/users | Pending |
| user-details.html | `/admin/users/:id` | GET /admin/users/:id | Pending |
| create-user.html | `/admin/users/new` | POST /admin/users | Pending |
| 25-data-sources.html | `/admin/sources` | GET /data-sources | Pending |
| data-source-details.html | `/admin/sources/:id` | GET /data-sources/:id | Pending |
| add-connection.html | `/admin/sources/new` | POST /data-sources | Pending |
| 26-api-keys.html | `/admin/keys` | GET /admin/api-keys | Pending |
| api-key-details.html | `/admin/keys/:id` | GET /admin/api-keys/:id | Pending |
| generate-api-key.html | `/admin/keys/new` | POST /admin/api-keys | Pending |
| 27-branding.html | `/admin/branding` | GET/PATCH /admin/branding | Pending |
| 28-system-health.html | `/admin/health` | GET /admin/health | Pending |
| 29-audit-log.html | `/admin/audit` | GET /admin/audit-log | Pending |
| audit-log-details.html | `/admin/audit/:id` | GET /admin/audit-log/:id | Pending |
| 30-billing.html | `/admin/billing` | GET /billing/subscription | Pending |
| invoice-details.html | `/admin/billing/invoices/:id` | GET /billing/invoices/:id | Pending |

### Settings Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| settings-dashboard-prefs.html | `/settings/dashboard` | GET/PATCH /users/me/preferences | Pending |
| settings-notifications.html | `/settings/notifications` | GET/PATCH /users/me/notifications | Pending |
| settings-security.html | `/settings/security` | PATCH /users/me/password | Pending |

## API Service Files

| Service | Location | Endpoints |
|---------|----------|-----------|
| AuthService | `app/services/httpServices/authService.ts` | login, register, logout, forgotPassword, resetPassword |
| DashboardService | `app/services/httpServices/dashboardService.ts` | getDashboards, createDashboard, updateDashboard, deleteDashboard |
| AlertService | `app/services/httpServices/alertService.ts` | getAlerts, createAlert, updateAlert, acknowledgeAlert |
| ReportService | `app/services/httpServices/reportService.ts` | getReports, scheduleReport, regenerateReport |
| QueryService | `app/services/httpServices/queryService.ts` | executeQuery, saveQuery, getQueryHistory |
| DataSourceService | `app/services/httpServices/dataSourceService.ts` | getDataSources, testConnection, syncMetadata |
| UserService | `app/services/httpServices/userService.ts` | getUsers, getUser, updateUser, deleteUser |
| AdminService | `app/services/httpServices/adminService.ts` | getStats, getAuditLog, updateBranding |
| BillingService | `app/services/httpServices/billingService.ts` | getSubscription, updateSubscription, getInvoices |

## Integration Checklist

- [ ] Set up Axios instance with base URL
- [ ] Configure auth interceptors
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Add error states
- [ ] Test all endpoints
