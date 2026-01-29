import { type RouteConfig, layout } from "@react-router/dev/routes";
import { authRoutes } from "./routes/auth.routes";
import { dashboardRoutes } from "./routes/dashboard.routes";

export default [
  layout("pages/auth/layout.tsx", authRoutes),
  layout("pages/layout.tsx", dashboardRoutes),
] satisfies RouteConfig;
