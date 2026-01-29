import { route, index } from "@react-router/dev/routes";

export const dashboardRoutes = [
  index("pages/dashboard/home.tsx"),
  route("builder", "pages/builder/index.tsx"),
  route("query/editor", "pages/query/editor.tsx"),
  route("models/list", "pages/models/list.tsx"),
  route("models/:id", "pages/models/$id.tsx"),
];
