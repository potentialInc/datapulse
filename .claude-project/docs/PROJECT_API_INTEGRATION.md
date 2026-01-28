# API Integration Status: DataPulse

## Overview

This document tracks which frontend pages use which API endpoints. The mapping is organized by user type and functional area based on the PRD.

## Frontend Pages → API Mapping

### Authentication Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `auth/01-landing.html` | `/` | None (public) | Pending |
| `auth/02-login.html` | `/login` | `POST /auth/login`, `POST /auth/login/google`, `POST /auth/login/okta` | Pending |
| `auth/03-signup.html` | `/signup` | `POST /auth/register` | Pending |
| `auth/04-forgot-password.html` | `/forgot-password` | `POST /auth/forgot-password` | Pending |
| `auth/05-reset-password.html` | `/reset-password` | `POST /auth/reset-password` | Pending |
| `auth/06-email-verification.html` | `/verify-email` | `POST /auth/verify-email` | Pending |

### Business User Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `business-user/07-business-home.html` | `/home` | `GET /users/me`, `GET /dashboards?recent=true`, `GET /alerts/active` | Pending |
| `business-user/08-dashboard-list.html` | `/dashboards` | `GET /dashboards`, `POST /dashboards/:id/duplicate`, `GET /dashboards/:id/export` | Pending |
| `business-user/09-dashboard-view.html` | `/dashboards/:id` | `GET /dashboards/:id`, `GET /dashboards/:id/widgets`, `POST /widgets/:id/refresh`, `POST /reports` | Pending |
| `business-user/10-reports-list.html` | `/reports` | `GET /reports`, `GET /reports/generated`, `GET /reports/generated/:id/download`, `PATCH /reports/:id`, `DELETE /reports/:id` | Pending |
| `business-user/11-alerts-list.html` | `/alerts` | `GET /alerts`, `GET /alerts/active`, `POST /alerts`, `POST /alerts/:id/snooze`, `POST /alerts/:id/acknowledge`, `POST /alerts/:id/resolve` | Pending |
| `business-user/12-user-settings.html` | `/settings` | `GET /users/me`, `PATCH /users/:id`, `POST /auth/logout` | Pending |

### Data Analyst Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `data-analyst/13-analyst-home.html` | `/analyst/home` | `GET /users/me`, `GET /dashboards`, `GET /data-models`, `GET /queries/saved` | Pending |
| `data-analyst/14-dashboard-builder.html` | `/dashboards/builder` | `POST /dashboards`, `PATCH /dashboards/:id`, `POST /widgets`, `PATCH /widgets/:id`, `DELETE /widgets/:id`, `GET /data-sources`, `POST /dashboards/:id/share` | Pending |
| `data-analyst/15-query-editor.html` | `/query-editor` | `POST /queries/execute`, `POST /queries/explain`, `GET /queries/history`, `POST /queries/save`, `GET /queries/saved`, `DELETE /queries/saved/:id`, `POST /queries/export`, `GET /data-sources/:id/metadata` | Pending |
| `data-analyst/16-data-models.html` | `/data-models` | `GET /data-models`, `POST /data-models`, `PATCH /data-models/:id`, `DELETE /data-models/:id`, `GET /data-models/:id/dependencies` | Pending |
| `data-analyst/17-data-model-editor.html` | `/data-models/:id/edit` | `GET /data-models/:id`, `PATCH /data-models/:id`, `POST /data-models/:id/validate`, `GET /data-sources` | Pending |

### Operations Manager Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `ops-manager/18-ops-dashboard.html` | `/operations` | `GET /operations/dashboard`, `GET /operations/sla`, `GET /alerts/active` | Pending |
| `ops-manager/19-team-overview.html` | `/operations/team` | `GET /operations/team`, `POST /operations/team/:id/assign` | Pending |
| `ops-manager/20-team-member-detail.html` | `/operations/team/:id` | `GET /operations/team/:id`, `GET /users/:id/activity` | Pending |
| `ops-manager/21-workflows.html` | `/operations/workflows` | `GET /operations/workflows`, `POST /operations/workflows/:id/approve`, `POST /operations/workflows/:id/reject` | Pending |
| `ops-manager/22-sla-monitor.html` | `/operations/sla` | `GET /operations/sla`, `GET /operations/sla/at-risk` | Pending |

### Admin Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `admin/23-admin-dashboard.html` | `/admin` | `GET /admin/dashboard`, `GET /admin/system-health`, `GET /users?status=pending` | Pending |
| `admin/24-user-management.html` | `/admin/users` | `GET /admin/users`, `POST /users`, `PATCH /users/:id`, `DELETE /users/:id`, `PATCH /users/:id/status`, `POST /admin/users/:id/approve`, `POST /users/:id/reset-password` | Pending |
| `admin/25-data-sources.html` | `/admin/data-sources` | `GET /data-sources`, `POST /data-sources`, `PATCH /data-sources/:id`, `DELETE /data-sources/:id`, `POST /data-sources/:id/test`, `POST /data-sources/:id/sync` | Pending |
| `admin/26-api-keys.html` | `/admin/api-keys` | `GET /api-keys`, `POST /api-keys`, `PATCH /api-keys/:id`, `DELETE /api-keys/:id` | Pending |
| `admin/27-branding.html` | `/admin/branding` | `GET /admin/branding`, `PATCH /admin/branding` | Pending |
| `admin/28-system-health.html` | `/admin/system-health` | `GET /admin/system-health`, `POST /admin/cache/clear`, `POST /admin/backup` | Pending |
| `admin/29-audit-log.html` | `/admin/audit-logs` | `GET /audit-logs`, `GET /audit-logs/:id`, `GET /audit-logs/export` | Pending |
| `admin/30-billing.html` | `/admin/billing` | `GET /billing/subscription`, `POST /billing/subscription/upgrade`, `POST /billing/subscription/downgrade`, `POST /billing/payment-method`, `GET /billing/invoices`, `GET /billing/invoices/:id/download` | Pending |

### Detail & Modal Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `index.html` | `/` | Redirects to appropriate home based on role | Pending |
| `alert-details.html` | `/alerts/:id` | `GET /alerts/:id`, `PATCH /alerts/:id`, `POST /alerts/:id/snooze`, `POST /alerts/:id/resolve` | Pending |
| `data-source-details.html` | `/admin/data-sources/:id` | `GET /data-sources/:id`, `PATCH /data-sources/:id`, `POST /data-sources/:id/test`, `GET /data-sources/:id/metadata` | Pending |
| `user-details.html` | `/admin/users/:id` | `GET /users/:id`, `PATCH /users/:id`, `GET /users/:id/activity`, `GET /dashboards?userId=:id` | Pending |
| `api-key-details.html` | `/admin/api-keys/:id` | `GET /api-keys/:id`, `PATCH /api-keys/:id`, `DELETE /api-keys/:id` | Pending |
| `audit-log-details.html` | `/admin/audit-logs/:id` | `GET /audit-logs/:id` | Pending |
| `invoice-details.html` | `/admin/billing/invoices/:id` | `GET /billing/invoices/:id`, `GET /billing/invoices/:id/download` | Pending |
| `create-user.html` | `/admin/users/create` | `POST /users` | Pending |
| `generate-api-key.html` | `/admin/api-keys/create` | `POST /api-keys` | Pending |
| `add-connection.html` | `/admin/data-sources/create` | `POST /data-sources`, `POST /data-sources/:id/test` | Pending |

### Modal Components

| HTML File | Purpose | API Endpoints | Status |
|-----------|---------|---------------|--------|
| `modals/modal-create-alert.html` | Create alert modal | `POST /alerts` | Pending |
| `modals/modal-schedule-report.html` | Schedule report modal | `POST /reports` | Pending |

### Settings Pages

| HTML File | Route | API Endpoints | Status |
|-----------|-------|---------------|--------|
| `settings/settings-dashboard-prefs.html` | `/settings/dashboard-preferences` | `GET /users/me`, `PATCH /users/:id` | Pending |
| `settings/settings-notifications.html` | `/settings/notifications` | `GET /users/me`, `PATCH /users/:id` | Pending |
| `settings/settings-security.html` | `/settings/security` | `GET /users/me`, `PATCH /users/:id`, `POST /auth/reset-password` | Pending |

## API Service Files Structure

Recommended service layer organization:

| Service | Location | Endpoints Covered | Dependencies |
|---------|----------|-------------------|--------------|
| AuthService | `frontend/app/services/httpServices/authService.ts` | All `/auth/*` endpoints | httpService |
| UserService | `frontend/app/services/httpServices/userService.ts` | All `/users/*` endpoints | httpService |
| DashboardService | `frontend/app/services/httpServices/dashboardService.ts` | All `/dashboards/*` and `/widgets/*` endpoints | httpService |
| AlertService | `frontend/app/services/httpServices/alertService.ts` | All `/alerts/*` endpoints | httpService |
| DataSourceService | `frontend/app/services/httpServices/dataSourceService.ts` | All `/data-sources/*` endpoints | httpService |
| ReportService | `frontend/app/services/httpServices/reportService.ts` | All `/reports/*` endpoints | httpService |
| QueryService | `frontend/app/services/httpServices/queryService.ts` | All `/queries/*` endpoints | httpService |
| DataModelService | `frontend/app/services/httpServices/dataModelService.ts` | All `/data-models/*` endpoints | httpService |
| OperationsService | `frontend/app/services/httpServices/operationsService.ts` | All `/operations/*` endpoints | httpService |
| AdminService | `frontend/app/services/httpServices/adminService.ts` | All `/admin/*` endpoints | httpService |
| AuditLogService | `frontend/app/services/httpServices/auditLogService.ts` | All `/audit-logs/*` endpoints | httpService |
| ApiKeyService | `frontend/app/services/httpServices/apiKeyService.ts` | All `/api-keys/*` endpoints | httpService |
| BillingService | `frontend/app/services/httpServices/billingService.ts` | All `/billing/*` endpoints | httpService |

## Integration Checklist

### Core Setup
- [ ] Set up Axios instance with base URL in `httpService.ts`
- [ ] Configure cookie-based auth interceptors (request/response)
- [ ] Implement request interceptor for credentials inclusion (withCredentials: true)
- [ ] Implement response interceptor for 401/403 handling
- [ ] Configure error handling middleware
- [ ] Add loading state management
- [ ] Add error state management

### Service Layer
- [ ] Create all service files listed above
- [ ] Implement service methods using HTTP method factories
- [ ] Add TypeScript types for all request/response DTOs
- [ ] Add JSDoc comments for all service methods

### Testing
- [ ] Test all authentication flows
- [ ] Test all CRUD operations
- [ ] Test error scenarios (network, validation, auth)
- [ ] Test file uploads (exports, branding assets)
- [ ] Test pagination and filtering
- [ ] Verify role-based access controls

### Integration by User Type
- [ ] Business User flows (dashboards, reports, alerts)
- [ ] Data Analyst flows (query editor, data models, dashboard builder)
- [ ] Operations Manager flows (team management, workflows, SLA)
- [ ] Admin flows (user management, integrations, system config)

## Notes

- All endpoints require httpOnly cookie authentication except public auth endpoints
- Authentication cookies are automatically sent by the browser with `withCredentials: true`
- Role-based access control is enforced at the API level
- File uploads (exports, branding) use multipart/form-data
- Large exports are streamed using proper content-disposition headers
- Real-time data uses polling (30s interval) - no WebSocket required for MVP
