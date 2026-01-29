import { Outlet } from "react-router";
import { Sidebar } from "~/components/layout";

export default function DashboardLayout() {
  const navItems = [
    { to: "/", icon: "solar:chart-square-linear", label: "Dashboard" },
    { to: "/users", icon: "solar:users-group-rounded-linear", label: "All Users", section: "User Management" },
    { to: "/data-sources", icon: "solar:database-linear", label: "Data Sources", section: "Integrations" },
    { to: "/api-keys", icon: "solar:key-linear", label: "API Keys" },
    { to: "/branding", icon: "solar:palette-linear", label: "Branding", section: "System" },
    { to: "/system-health", icon: "solar:health-linear", label: "System Health" },
    { to: "/audit-log", icon: "solar:document-text-linear", label: "Audit Log" },
    { to: "/billing", icon: "solar:card-linear", label: "Billing", section: "Billing" },
  ];

  const user = {
    name: "Admin User",
    email: "admin@datapulse.com",
    role: "System Admin",
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-900">
      <Sidebar variant="admin" navItems={navItems} user={user} />
      <Outlet />
    </div>
  );
}