import { type RouteConfig, index, route } from "@react-router/dev/routes";

export const dashboardRoutes: RouteConfig[] = [
  index("pages/dashboard/home.tsx"),

  // Users
  route("users", "pages/users/list.tsx"),
  route("users/create", "pages/users/create.tsx"),
  route("users/:id", "pages/users/$id.tsx"),

  // Data Sources
  route("data-sources", "pages/data-sources/list.tsx"),
  route("data-sources/create", "pages/data-sources/create.tsx"),
  route("data-sources/:id", "pages/data-sources/$id.tsx"),

  // API Keys
  route("api-keys", "pages/api-keys/list.tsx"),
  route("api-keys/create", "pages/api-keys/create.tsx"),
  route("api-keys/:id", "pages/api-keys/$id.tsx"),

  // System
  route("branding", "pages/branding/index.tsx"),
  route("system-health", "pages/system-health/index.tsx"),

  // Audit Log
  route("audit-log", "pages/audit-log/list.tsx"),
  route("audit-log/:id", "pages/audit-log/$id.tsx"),

  // Billing
  route("billing", "pages/billing/index.tsx"),
  route("billing/:id", "pages/billing/$id.tsx"),
];
