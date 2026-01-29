import { type RouteConfig, layout } from "@react-router/dev/routes";
import { publicRoutes } from "./routes/public.routes";
import { authRoutes } from "./routes/auth.routes";
import { dashboardRoutes } from "./routes/dashboard.routes";

export default [
  layout("pages/layout.tsx", dashboardRoutes),
  layout("pages/auth/layout.tsx", authRoutes),
] satisfies RouteConfig;
