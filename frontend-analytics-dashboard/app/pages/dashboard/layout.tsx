import { Outlet } from "react-router";
import { Sidebar } from "~/components/layout/Sidebar";

const navItems = [
  {
    to: "/dashboard/home",
    icon: "solar:home-smile-linear",
    label: "Home",
  },
  {
    to: "/builder",
    icon: "solar:widget-linear",
    label: "Dashboard Builder",
  },
  {
    to: "/query/editor",
    icon: "solar:code-square-linear",
    label: "Query Editor",
  },
  {
    to: "/models/list",
    icon: "solar:database-linear",
    label: "Data Models",
  },
];

const user = {
  name: "Sarah Analyst",
  email: "sarah@datapulse.com",
  role: "Data Analyst",
};

export default function DashboardLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-900 text-slate-50">
      <Sidebar variant="analyst" navItems={navItems} user={user} />
      <Outlet />
    </div>
  );
}
