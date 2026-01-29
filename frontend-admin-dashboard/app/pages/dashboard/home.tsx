import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { StatCard, DashboardCard, ActivityItem } from '~/components/ui';

interface ActivityLog {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('today');

  const stats = [
    { icon: 'solar:users-group-rounded-linear', iconColor: 'text-indigo-400', value: '248', label: 'Total Users', change: '+12%', changeType: 'positive' as const },
    { icon: 'solar:monitor-smartphone-linear', iconColor: 'text-emerald-400', value: '142', label: 'Active Sessions', change: '+5%', changeType: 'positive' as const },
    { icon: 'solar:widget-linear', iconColor: 'text-purple-400', value: '89', label: 'Dashboards', change: '+8', changeType: 'positive' as const },
    { icon: 'solar:code-square-linear', iconColor: 'text-blue-400', value: '2,847', label: 'Queries Today', change: '+156', changeType: 'positive' as const },
    { icon: 'solar:bell-linear', iconColor: 'text-amber-400', value: '12', label: 'Alerts Triggered', change: '+3', changeType: 'negative' as const },
    { icon: 'solar:database-linear', iconColor: 'text-emerald-400', value: '5/5', label: 'Integrations OK', change: '', changeType: 'neutral' as const },
  ];

  const weeklyActivity = [
    { day: 'Mon', height: 60 },
    { day: 'Tue', height: 100 },
    { day: 'Wed', height: 80 },
    { day: 'Thu', height: 140 },
    { day: 'Fri', height: 120 },
    { day: 'Sat', height: 50 },
    { day: 'Sun', height: 45 },
  ];

  const userDistribution = [
    { label: 'Business Users', count: 156, percentage: 50, color: 'bg-blue-500' },
    { label: 'Data Analysts', count: 62, percentage: 25, color: 'bg-purple-500' },
    { label: 'Ops Managers', count: 24, percentage: 15, color: 'bg-amber-500' },
    { label: 'Admins', count: 6, percentage: 10, color: 'bg-pink-500' },
  ];

  const recentActivity: ActivityLog[] = [
    { id: '1', icon: 'solar:login-2-linear', iconColor: 'text-emerald-400', title: 'John Doe logged in', subtitle: 'IP: 192.168.1.105', time: '2 min ago' },
    { id: '2', icon: 'solar:widget-add-linear', iconColor: 'text-indigo-400', title: 'Sarah created dashboard "Q1 Revenue"', subtitle: 'Data Analyst', time: '15 min ago' },
    { id: '3', icon: 'solar:database-linear', iconColor: 'text-purple-400', title: 'Database connection updated', subtitle: 'Production Database', time: '1 hour ago' },
    { id: '4', icon: 'solar:bell-linear', iconColor: 'text-amber-400', title: 'Alert triggered: Revenue Drop', subtitle: 'Sales Dashboard', time: '2 hours ago' },
    { id: '5', icon: 'solar:user-plus-linear', iconColor: 'text-blue-400', title: 'New user created: Mike Chen', subtitle: 'Business User', time: '3 hours ago' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Platform-wide statistics and activity</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg p-1">
          <button onClick={() => setTimeRange('today')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === 'today' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white'}`}>Today</button>
          <button onClick={() => setTimeRange('7days')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === '7days' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white'}`}>7 days</button>
          <button onClick={() => setTimeRange('30days')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === '30days' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white'}`}>30 days</button>
          <button onClick={() => setTimeRange('custom')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === 'custom' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white'}`}>Custom</button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6 z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity */}
          <DashboardCard title="User Activity Trend">
            <div className="h-[200px] flex items-end justify-around gap-2">
              {weeklyActivity.map((item, index) => (
                <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-full rounded-t transition-all hover:bg-indigo-500 ${index === weeklyActivity.length - 1 ? 'bg-indigo-500' : 'bg-indigo-500/60'}`}
                    style={{ height: `${item.height}px` }}
                  />
                  <span className={`text-xs ${index === weeklyActivity.length - 1 ? 'text-slate-400 font-medium' : 'text-slate-500'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* User Distribution */}
          <DashboardCard title="User Distribution by Role">
            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="relative w-40 h-40 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="20" strokeDasharray="126 251.33" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="20" strokeDasharray="63 251.33" strokeDashoffset="-126" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="20" strokeDasharray="38 251.33" strokeDashoffset="-189" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EC4899" strokeWidth="20" strokeDasharray="24 251.33" strokeDashoffset="-227" />
                </svg>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {userDistribution.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-sm text-white font-medium">{item.count} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Recent Activity */}
        <DashboardCard
          title="Recent Activity"
          action={<Link to="/audit-log" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All</Link>}
        >
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
