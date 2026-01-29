import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PageHeader } from '~/components/layout/PageHeader';
import { StatCard } from '~/components/ui/StatCard';
import { SearchInput } from '~/components/ui/SearchInput';
import { ActivityItem } from '~/components/ui/ActivityItem';
import { DashboardCard } from '~/components/ui/DashboardCard';

const kpiData = [
  { icon: 'solar:dollar-linear', label: 'Total Revenue', value: '$2.4M', trend: { value: 12.5, positive: true }, iconColor: 'indigo' as const },
  { icon: 'solar:users-group-rounded-linear', label: 'Active Users', value: '14,829', trend: { value: 8.2, positive: true }, iconColor: 'indigo' as const },
  { icon: 'solar:pie-chart-2-linear', label: 'Conversion Rate', value: '3.2%', trend: { value: 2.1, positive: false }, iconColor: 'indigo' as const },
  { icon: 'solar:chart-2-linear', label: 'Avg. Session', value: '4m 32s', trend: { value: 5.7, positive: true }, iconColor: 'indigo' as const },
];

const recentDashboards = [
  { id: '1', title: 'Sales Performance Q4', lastViewed: '2 hours ago', status: 'active' as const },
  { id: '2', title: 'Marketing Analytics', lastViewed: '1 day ago', status: 'active' as const },
  { id: '3', title: 'Customer Insights', lastViewed: '3 days ago', status: 'inactive' as const },
  { id: '4', title: 'Product Metrics', lastViewed: '1 week ago', status: 'inactive' as const },
];

const recentActivity = [
  { icon: 'solar:chart-2-linear', iconColor: 'indigo' as const, title: 'Dashboard Updated', description: 'Sales Performance Q4 was modified', timestamp: '10 minutes ago' },
  { icon: 'solar:bell-linear', iconColor: 'amber' as const, title: 'New Alert Triggered', description: 'Revenue threshold exceeded for North region', timestamp: '1 hour ago' },
  { icon: 'solar:document-text-linear', iconColor: 'emerald' as const, title: 'Report Generated', description: 'Weekly summary report is ready', timestamp: '2 hours ago' },
  { icon: 'solar:share-linear', iconColor: 'rose' as const, title: 'Dashboard Shared', description: 'Marketing Analytics shared with team', timestamp: '4 hours ago' },
];

export default function DashboardHome() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Good morning, John</h1>
          <p className="text-sm text-slate-400 mt-1">{today}</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search analytics..." />
          <button className="relative p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700">
            <iconify-icon icon="solar:bell-linear" width="20"></iconify-icon>
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 z-10">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <StatCard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Dashboards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Dashboards</h2>
              <button
                onClick={() => navigate('/dashboards')}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentDashboards.map((dashboard) => (
                <DashboardCard
                  key={dashboard.id}
                  title={dashboard.title}
                  lastViewed={dashboard.lastViewed}
                  status={dashboard.status}
                  onClick={() => navigate(`/dashboards/${dashboard.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 space-y-2">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/dashboards/new')}
              className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
            >
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <iconify-icon icon="solar:add-circle-linear" width="20"></iconify-icon>
              </div>
              <span className="text-sm font-medium text-slate-200">New Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
            >
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <iconify-icon icon="solar:document-add-linear" width="20"></iconify-icon>
              </div>
              <span className="text-sm font-medium text-slate-200">Schedule Report</span>
            </button>
            <button
              onClick={() => navigate('/alerts')}
              className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
            >
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                <iconify-icon icon="solar:bell-plus-linear" width="20"></iconify-icon>
              </div>
              <span className="text-sm font-medium text-slate-200">Create Alert</span>
            </button>
            <button
              onClick={() => navigate('/settings/profile')}
              className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all group"
            >
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 group-hover:bg-rose-500/20 transition-colors">
                <iconify-icon icon="solar:settings-linear" width="20"></iconify-icon>
              </div>
              <span className="text-sm font-medium text-slate-200">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
