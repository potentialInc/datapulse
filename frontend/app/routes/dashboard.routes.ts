import { route, index } from "@react-router/dev/routes";

export const dashboardRoutes = [
  index("pages/dashboard/home.tsx"),
  route("list", "pages/dashboard/list.tsx"),
  route(":id", "pages/dashboard/$id.tsx"),
];
