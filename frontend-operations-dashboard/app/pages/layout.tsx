import { Outlet } from "react-router";
import { Sidebar } from "~/components/layout/Sidebar";

const navItems = [
  {
    to: "/",
    icon: "solar:chart-square-linear",
    label: "Dashboard",
  },
  {
    to: "/team",
    icon: "solar:users-group-rounded-linear",
    label: "Team",
  },
  {
    to: "/workflows",
    icon: "solar:routing-linear",
    label: "Workflows",
    badge: 5,
  },
  {
    to: "/sla",
    icon: "solar:clock-circle-linear",
    label: "SLA Monitor",
  },
];

const user = {
  name: "Ops Manager",
  email: "ops@datapulse.com",
  role: "Operations",
};

export default function BaseLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-900">
      <Sidebar variant="ops" navItems={navItems} user={user} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}