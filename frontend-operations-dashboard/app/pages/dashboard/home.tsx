import { Link } from 'react-router';
import { PageHeader } from '~/components/layout/PageHeader';
import { StatCard } from '~/components/ui/StatCard';
import { ActivityItem } from '~/components/ui/ActivityItem';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface Activity {
  id: string;
  icon: string;
  iconColor: 'emerald' | 'amber' | 'indigo' | 'rose';
  title: string;
  description: string;
  timestamp: string;
}

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  tickets: number;
  progress: number;
  colorScheme: 'indigo' | 'emerald' | 'amber' | 'purple';
}

interface IssueCategory {
  name: string;
  percentage: number;
  color: string;
}

const activities: Activity[] = [
  {
    id: '1',
    icon: 'solar:check-circle-linear',
    iconColor: 'emerald',
    title: 'Ticket #4521 resolved by Alex',
    description: 'Payment processing issue',
    timestamp: 'Just now',
  },
  {
    id: '2',
    icon: 'solar:arrow-up-linear',
    iconColor: 'amber',
    title: 'Ticket #4518 escalated to Level 2',
    description: 'API timeout errors',
    timestamp: '2m ago',
  },
  {
    id: '3',
    icon: 'solar:user-plus-linear',
    iconColor: 'indigo',
    title: 'Sarah joined the shift',
    description: 'Available for assignments',
    timestamp: '5m ago',
  },
  {
    id: '4',
    icon: 'solar:danger-triangle-linear',
    iconColor: 'rose',
    title: 'SLA breach warning on #4502',
    description: '15 minutes remaining',
    timestamp: '8m ago',
  },
  {
    id: '5',
    icon: 'solar:check-circle-linear',
    iconColor: 'emerald',
    title: 'Ticket #4519 resolved by Mike',
    description: 'Login authentication issue',
    timestamp: '12m ago',
  },
];

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Alex Kim', initials: 'AK', tickets: 42, progress: 92, colorScheme: 'indigo' },
  { id: '2', name: 'Sarah Johnson', initials: 'SJ', tickets: 38, progress: 84, colorScheme: 'emerald' },
  { id: '3', name: 'Mike Chen', initials: 'MC', tickets: 35, progress: 78, colorScheme: 'amber' },
  { id: '4', name: 'Emma Rodriguez', initials: 'ER', tickets: 31, progress: 70, colorScheme: 'purple' },
];

const issueCategories: IssueCategory[] = [
  { name: 'Technical', percentage: 35, color: 'bg-indigo-500' },
  { name: 'Billing', percentage: 25, color: 'bg-emerald-500' },
  { name: 'Account', percentage: 20, color: 'bg-amber-500' },
  { name: 'Other', percentage: 20, color: 'bg-pink-500' },
];

const weeklyResolutionData = [
  { day: 'Mon', height: 80 },
  { day: 'Tue', height: 120 },
  { day: 'Wed', height: 90 },
  { day: 'Thu', height: 140 },
  { day: 'Fri', height: 100 },
  { day: 'Sat', height: 60 },
  { day: 'Sun', height: 70 },
];

export default function OperationsDashboard() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PageHeader
        title="Operations Dashboard"
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-sm text-slate-400">Last updated: 30 seconds ago</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <iconify-icon icon="solar:calendar-linear" className="text-slate-400" width="18"></iconify-icon>
              <span className="text-sm text-white">Last 24 hours</span>
              <iconify-icon icon="solar:alt-arrow-down-linear" className="text-slate-400" width="16"></iconify-icon>
            </div>
            <button className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-slate-700">
              <iconify-icon icon="solar:refresh-linear" width="20"></iconify-icon>
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6">
        {/* Real-Time Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-rose-500/30 rounded-xl p-5 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                <iconify-icon icon="solar:danger-triangle-linear" width="20"></iconify-icon>
              </div>
              <span className="flex items-center text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">
                Critical
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Active Issues</h3>
            <p className="text-3xl font-bold text-rose-400 mt-1">12</p>
            <p className="text-xs text-slate-500 mt-2">3 critical, 9 warning</p>
          </div>

          <StatCard
            icon="solar:ticket-linear"
            iconColor="indigo"
            label="Open Tickets"
            value={156}
          />

          <StatCard
            icon="solar:users-group-rounded-linear"
            iconColor="emerald"
            label="Team Availability"
            value="18/24"
          />

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <iconify-icon icon="solar:verified-check-linear" width="20"></iconify-icon>
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/10">
                <iconify-icon icon="solar:arrow-right-up-linear" className="mr-1"></iconify-icon>
                +2.3%
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">SLA Compliance</h3>
            <p className="text-3xl font-bold text-emerald-400 mt-1">96.4%</p>
            <p className="text-xs text-slate-500 mt-2">Target: 95%</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Activity Feed */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-lg font-semibold text-white">Live Activity</h2>
              </div>
              <Link to="/activities" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View All
              </Link>
            </div>

            <div className="space-y-3 max-h-[320px] overflow-y-auto scrollbar-hide">
              {activities.map((activity) => (
                <ActivityItem key={activity.id} {...activity} />
              ))}
            </div>
          </div>

          {/* Resolution Time Chart */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Ticket Resolution Time</h2>
              <span className="text-sm text-slate-400">Avg: 2.4 hours</span>
            </div>

            <div className="h-[280px] flex items-end justify-around px-4">
              {weeklyResolutionData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 rounded-t transition-all hover:bg-indigo-500 ${
                      index === weeklyResolutionData.length - 1 ? 'bg-indigo-500' : 'bg-indigo-500/60'
                    }`}
                    style={{ height: `${data.height}px` }}
                  ></div>
                  <span
                    className={`text-xs ${
                      index === weeklyResolutionData.length - 1 ? 'text-slate-400 font-medium' : 'text-slate-500'
                    }`}
                  >
                    {data.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Productivity */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Team Productivity</h2>
              <Link to="/team" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View Team
              </Link>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-4">
                  <UserAvatar name={member.name} size="sm" colorScheme={member.colorScheme} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">{member.name}</span>
                      <span className="text-sm text-slate-400">{member.tickets} tickets</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${member.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Category Breakdown */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Issue Categories</h2>
            </div>

            <div className="flex items-center gap-8">
              {/* Pie Chart (simplified visual) */}
              <div className="relative w-40 h-40 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366F1" strokeWidth="20" strokeDasharray="88 251.33"></circle>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="20" strokeDasharray="63 251.33" strokeDashoffset="-88"></circle>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="20" strokeDasharray="50 251.33" strokeDashoffset="-151"></circle>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EC4899" strokeWidth="20" strokeDasharray="50 251.33" strokeDashoffset="-201"></circle>
                </svg>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-3">
                {issueCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                      <span className="text-sm text-slate-300">{category.name}</span>
                    </div>
                    <span className="text-sm text-white font-medium">{category.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
