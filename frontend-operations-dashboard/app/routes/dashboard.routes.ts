import { route, index } from "@react-router/dev/routes";

export const dashboardRoutes = [
  index("pages/dashboard/home.tsx"),
  route("team", "pages/team/overview.tsx"),
  route("team/:id", "pages/team/$id.tsx"),
  route("workflows", "pages/workflows/index.tsx"),
  route("sla", "pages/sla/index.tsx"),
];
