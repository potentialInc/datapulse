import { Link, useParams } from 'react-router';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface Assignment {
  id: string;
  ticketId: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueIn: string;
  icon: string;
  iconColor: string;
}

interface ActivityLog {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  timestamp: string;
}

const assignments: Assignment[] = [
  {
    id: '1',
    ticketId: '#4521',
    title: 'Payment gateway timeout',
    priority: 'high',
    dueIn: '30m',
    icon: 'solar:danger-triangle-linear',
    iconColor: 'text-rose-400 bg-rose-500/10',
  },
  {
    id: '2',
    ticketId: '#4518',
    title: 'User login issues',
    priority: 'medium',
    dueIn: '2h',
    icon: 'solar:ticket-linear',
    iconColor: 'text-amber-400 bg-amber-500/10',
  },
  {
    id: '3',
    ticketId: '#4515',
    title: 'Password reset request',
    priority: 'low',
    dueIn: '4h',
    icon: 'solar:ticket-linear',
    iconColor: 'text-slate-400 bg-slate-600/50',
  },
];

const activityLogs: ActivityLog[] = [
  {
    id: '1',
    icon: 'solar:check-circle-linear',
    iconColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    title: 'Resolved ticket #4521',
    description: 'Payment gateway timeout issue fixed',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    icon: 'solar:chat-round-linear',
    iconColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    title: 'Added comment on #4518',
    description: 'Requested additional information',
    timestamp: '15 minutes ago',
  },
  {
    id: '3',
    icon: 'solar:check-circle-linear',
    iconColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    title: 'Resolved ticket #4517',
    description: 'Account verification issue',
    timestamp: '28 minutes ago',
  },
  {
    id: '4',
    icon: 'solar:arrow-up-linear',
    iconColor: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    title: 'Escalated ticket #4512',
    description: 'Requires Level 2 support',
    timestamp: '1 hour ago',
  },
  {
    id: '5',
    icon: 'solar:login-2-linear',
    iconColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    title: 'Started shift',
    description: 'Logged in at 8:00 AM',
    timestamp: '4 hours ago',
  },
];

const priorityConfig = {
  high: { label: 'High', color: 'text-rose-400' },
  medium: { label: 'Medium', color: 'text-amber-400' },
  low: { label: 'Low', color: 'text-slate-400' },
};

export default function TeamMemberDetail() {
  const { id } = useParams();

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-end">
      {/* Right Drawer */}
      <aside className="w-[480px] h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">Team Member</h2>
          <Link
            to="/team"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <iconify-icon icon="solar:close-circle-linear" width="20"></iconify-icon>
          </Link>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Profile Header */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="relative">
                <UserAvatar name="Alex Kim" size="lg" colorScheme="indigo" />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-3 border-slate-900"></span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Alex Kim</h3>
                <p className="text-sm text-slate-400 mt-0.5">Senior Support Agent</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Available
                  </span>
                  <span className="text-xs text-slate-500">Since 8:00 AM</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">42</p>
                <p className="text-xs text-slate-400 mt-1">Resolved Today</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-white">1.8h</p>
                <p className="text-xs text-slate-400 mt-1">Avg Resolution</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-emerald-400">98%</p>
                <p className="text-xs text-slate-400 mt-1">SLA Compliance</p>
              </div>
            </div>
          </div>

          {/* Current Assignments */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Current Assignments</h4>
              <button className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                <iconify-icon icon="solar:add-circle-linear" width="16"></iconify-icon>
                Assign New
              </button>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => {
                const priorityStyle = priorityConfig[assignment.priority];
                return (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className={`p-2 rounded-lg ${assignment.iconColor}`}>
                      <iconify-icon icon={assignment.icon} width="16"></iconify-icon>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{assignment.title}</p>
                      <p className="text-xs text-slate-500">Ticket {assignment.ticketId}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium ${priorityStyle.color}`}>
                        {priorityStyle.label}
                      </span>
                      <p className="text-xs text-slate-500">Due in {assignment.dueIn}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance */}
          <div className="p-6 border-b border-slate-800">
            <h4 className="font-medium text-white mb-4">Performance This Week</h4>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Tickets Resolved</span>
                  <span className="text-white">42 / 50 target</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Customer Satisfaction</span>
                  <span className="text-emerald-400">4.8 / 5.0</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">First Response Time</span>
                  <span className="text-white">&lt; 5 min avg</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Recent Activity</h4>
              <button className="text-sm text-slate-400 hover:text-white transition-colors">
                View All
              </button>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700"></div>

              <div className="space-y-4">
                {activityLogs.map((activity) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 z-10 ${activity.iconColor}`}
                    >
                      <iconify-icon icon={activity.icon} width="14"></iconify-icon>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
                      <p className="text-xs text-slate-600 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 text-sm text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all">
              Load More Activity
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
