import { Outlet } from 'react-router';
import { Sidebar } from '~/components/layout/Sidebar';

const businessNavItems = [
  { to: '/dashboard', icon: 'solar:home-smile-linear', label: 'Home' },
  { to: '/dashboard/list', icon: 'solar:widget-linear', label: 'My Dashboards' },
  { to: '/reports', icon: 'solar:document-text-linear', label: 'Reports' },
  { to: '/alerts', icon: 'solar:bell-linear', label: 'Alerts', badge: 4 },
  { to: '/settings', icon: 'solar:settings-linear', label: 'Settings' },
];

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Business User',
};

export default function DashboardLayout() {
  return (
    <div className="bg-slate-900 text-slate-50 font-sans antialiased h-screen flex overflow-hidden">
      <Sidebar variant="business" navItems={businessNavItems} user={mockUser} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900 relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

        <Outlet />
      </main>
    </div>
  );
}
