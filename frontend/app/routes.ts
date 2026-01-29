import { type RouteConfig, layout, prefix, route, index } from "@react-router/dev/routes";
import { publicRoutes } from "./routes/public.routes";
import { authRoutes } from "./routes/auth.routes";
import { dashboardRoutes } from "./routes/dashboard.routes";

export default [
  layout("pages/layout.tsx", publicRoutes),
  ...prefix("auth", [layout("pages/auth/layout.tsx", authRoutes)]),
  layout("pages/dashboard/layout.tsx", [
    ...prefix("dashboard", dashboardRoutes),
    route("reports", "pages/reports/list.tsx"),
    route("alerts", "pages/alerts/list.tsx"),
    route("settings", "pages/settings/index.tsx"),
    route("settings/security", "pages/settings/security.tsx"),
    route("settings/notifications", "pages/settings/notifications.tsx"),
    route("settings/dashboard-preferences", "pages/settings/dashboard-preferences.tsx"),
  ]),
] satisfies RouteConfig;
