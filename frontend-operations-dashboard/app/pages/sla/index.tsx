import { PageHeader } from '~/components/layout/PageHeader';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface SLADefinition {
  id: string;
  name: string;
  targetMetric: string;
  currentPerformance: string;
  status: 'on-track' | 'at-risk' | 'breached';
}

interface AtRiskItem {
  id: string;
  ticketId: string;
  title: string;
  type: string;
  target: string;
  timeRemaining: string;
  isCritical: boolean;
  assignedTo: {
    name: string;
    colorScheme: 'indigo' | 'emerald' | 'amber' | 'purple';
  };
}

const slaDefinitions: SLADefinition[] = [
  {
    id: '1',
    name: 'First Response Time',
    targetMetric: '< 15 minutes',
    currentPerformance: '8.2 minutes',
    status: 'on-track',
  },
  {
    id: '2',
    name: 'Resolution Time (High)',
    targetMetric: '< 4 hours',
    currentPerformance: '3.2 hours',
    status: 'on-track',
  },
  {
    id: '3',
    name: 'Resolution Time (Medium)',
    targetMetric: '< 24 hours',
    currentPerformance: '18.5 hours',
    status: 'at-risk',
  },
  {
    id: '4',
    name: 'Resolution Time (Low)',
    targetMetric: '< 72 hours',
    currentPerformance: '48 hours',
    status: 'on-track',
  },
  {
    id: '5',
    name: 'Customer Satisfaction',
    targetMetric: '> 4.5 / 5.0',
    currentPerformance: '4.7 / 5.0',
    status: 'on-track',
  },
];

const atRiskItems: AtRiskItem[] = [
  {
    id: '1',
    ticketId: '#4521',
    title: 'Payment Gateway Error',
    type: 'Resolution Time (High)',
    target: '4 hours',
    timeRemaining: '0:15:32',
    isCritical: true,
    assignedTo: {
      name: 'Alex Kim',
      colorScheme: 'indigo',
    },
  },
  {
    id: '2',
    ticketId: '#4518',
    title: 'User Login Issues',
    type: 'Resolution Time (High)',
    target: '4 hours',
    timeRemaining: '0:45:18',
    isCritical: false,
    assignedTo: {
      name: 'Sarah Johnson',
      colorScheme: 'emerald',
    },
  },
  {
    id: '3',
    ticketId: '#4502',
    title: 'API Response Timeout',
    type: 'Resolution Time (High)',
    target: '4 hours',
    timeRemaining: '1:22:45',
    isCritical: false,
    assignedTo: {
      name: 'Mike Chen',
      colorScheme: 'amber',
    },
  },
  {
    id: '4',
    ticketId: '#4495',
    title: 'Dashboard Loading Slow',
    type: 'Resolution Time (Medium)',
    target: '24 hours',
    timeRemaining: '4:15:00',
    isCritical: false,
    assignedTo: {
      name: 'Emma Rodriguez',
      colorScheme: 'purple',
    },
  },
];

const statusConfig = {
  'on-track': {
    label: 'On Track',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  'at-risk': {
    label: 'At Risk',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  breached: {
    label: 'Breached',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
};

export default function SLAMonitor() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PageHeader
        title="SLA Monitor"
        breadcrumbs={[{ label: 'SLA Monitor' }]}
        description="Track SLA compliance and at-risk items"
        actions={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <iconify-icon icon="solar:calendar-linear" className="text-slate-400" width="18"></iconify-icon>
              <span className="text-sm text-white">Last 7 days</span>
              <iconify-icon icon="solar:alt-arrow-down-linear" className="text-slate-400" width="16"></iconify-icon>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm border border-slate-700">
              <iconify-icon icon="solar:download-linear" width="18"></iconify-icon>
              Export
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6">
        {/* SLA Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Compliance Rate */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-sm text-slate-400 font-medium mb-3">Current Compliance Rate</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#334155" strokeWidth="3"></circle>
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray="96.4 100"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-400">96.4%</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Target: 95%</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                  <iconify-icon icon="solar:arrow-right-up-linear" width="12"></iconify-icon>
                  +1.2% vs last week
                </span>
              </div>
            </div>
          </div>

          {/* At-Risk Items */}
          <div className="bg-slate-800 border border-amber-500/30 rounded-xl p-5">
            <h3 className="text-sm text-slate-400 font-medium mb-3">At-Risk Items</h3>
            <p className="text-4xl font-bold text-amber-400">8</p>
            <p className="text-xs text-slate-400 mt-2">Approaching SLA breach</p>
          </div>

          {/* Breached Items */}
          <div className="bg-slate-800 border border-rose-500/30 rounded-xl p-5">
            <h3 className="text-sm text-slate-400 font-medium mb-3">Breached Items</h3>
            <p className="text-4xl font-bold text-rose-400">3</p>
            <p className="text-xs text-slate-400 mt-2">Require immediate action</p>
          </div>

          {/* Trend */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5">
            <h3 className="text-sm text-slate-400 font-medium mb-3">Weekly Trend</h3>
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:arrow-right-up-linear" width="24" className="text-emerald-400"></iconify-icon>
              <span className="text-2xl font-bold text-white">Improving</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">12 fewer breaches vs last week</p>
          </div>
        </div>

        {/* SLA Definitions Table */}
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-semibold text-white">SLA Definitions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    SLA Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Target Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Current Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {slaDefinitions.map((sla) => {
                  const statusStyle = statusConfig[sla.status];
                  return (
                    <tr key={sla.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">{sla.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{sla.targetMetric}</td>
                      <td className="px-6 py-4 text-sm text-white">{sla.currentPerformance}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle.color}`}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-slate-400 hover:text-white transition-colors">
                          <iconify-icon icon="solar:pen-linear" width="16"></iconify-icon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* At-Risk Items Section */}
        <div className="bg-slate-800 border border-amber-500/30 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:danger-triangle-linear" width="20" className="text-amber-400"></iconify-icon>
              <h2 className="text-lg font-semibold text-white">Items Approaching SLA Breach</h2>
            </div>
            <span className="text-sm text-amber-400">8 items require attention</span>
          </div>

          <div className="divide-y divide-slate-700/50">
            {atRiskItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-700/20 transition-colors">
                <div
                  className={`p-2 rounded-lg ${
                    item.isCritical ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  <iconify-icon icon="solar:ticket-linear" width="20"></iconify-icon>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">
                    Ticket {item.ticketId} - {item.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.type} - Target: {item.target}
                  </p>
                </div>
                <div className="text-center">
                  <p
                    className={`text-lg font-bold ${
                      item.isCritical ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                    }`}
                  >
                    {item.timeRemaining}
                  </p>
                  <p className="text-xs text-slate-500">remaining</p>
                </div>
                <div className="flex items-center gap-3">
                  <UserAvatar name={item.assignedTo.name} size="sm" colorScheme={item.assignedTo.colorScheme} />
                  <button
                    className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-all ${
                      item.isCritical
                        ? 'bg-rose-500 hover:bg-rose-600'
                        : 'bg-amber-500 hover:bg-amber-600'
                    }`}
                  >
                    Escalate
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-3 bg-slate-700/30 text-center">
            <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
              View All 8 At-Risk Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
