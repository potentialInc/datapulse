import { useState } from 'react';
import { SearchInput } from '~/components/ui';
import { CreateAlertModal } from '~/components/modals';

interface Alert {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  currentValue: string;
  targetValue: string;
  dashboard: string;
  timeAgo: string;
  icon: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Revenue Below Threshold',
    severity: 'critical',
    currentValue: '$1.8M',
    targetValue: '$2.0M',
    dashboard: 'Sales Dashboard',
    timeAgo: '15 min ago',
    icon: 'solar:danger-triangle-linear',
  },
  {
    id: '2',
    title: 'Conversion Rate Declining',
    severity: 'warning',
    currentValue: '2.8%',
    targetValue: '3.0%',
    dashboard: 'Marketing Dashboard',
    timeAgo: '1 hour ago',
    icon: 'solar:graph-down-linear',
  },
  {
    id: '3',
    title: 'API Response Time High',
    severity: 'warning',
    currentValue: '450ms',
    targetValue: '200ms',
    dashboard: 'Performance Dashboard',
    timeAgo: '2 hours ago',
    icon: 'solar:stopwatch-linear',
  },
  {
    id: '4',
    title: 'New User Signups Spike',
    severity: 'info',
    currentValue: '150%',
    targetValue: 'above average',
    dashboard: 'User Analytics',
    timeAgo: '3 hours ago',
    icon: 'solar:users-group-rounded-linear',
  },
];

const severityConfig = {
  critical: {
    borderColor: 'bg-rose-500',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-500',
    badgeClasses: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    hoverBorder: 'hover:border-rose-500/30',
  },
  warning: {
    borderColor: 'bg-amber-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-500',
    badgeClasses: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/30',
  },
  info: {
    borderColor: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-500',
    badgeClasses: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/30',
  },
};

export default function AlertsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'active' | 'rules'>('active');
  const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Alerts</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor and manage your active alerts</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search alerts..."
          />

          <button
            onClick={() => setIsCreateAlertModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            <iconify-icon icon="solar:add-circle-linear" width="18"></iconify-icon>
            Add Alert
          </button>

          <CreateAlertModal
            isOpen={isCreateAlertModalOpen}
            onClose={() => setIsCreateAlertModalOpen(false)}
            onSubmit={(data) => {
              console.log('Alert created:', data);
              // Handle alert creation
            }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6 z-10 scrollbar-hide">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 border-b-2 text-sm font-medium flex items-center gap-2 transition-colors ${
              activeTab === 'active'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Active Alerts
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
              {mockAlerts.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'rules'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Alert Rules
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {mockAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            return (
              <div
                key={alert.id}
                className={`group relative bg-slate-800 rounded-xl border border-slate-700/50 shadow-sm overflow-hidden transition-colors ${config.hoverBorder}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.borderColor}`}></div>
                <div className="p-5 pl-7 flex flex-col md:flex-row md:items-center gap-5">
                  {/* Icon & Content */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center ${config.textColor} shrink-0 mt-1 md:mt-0`}>
                      <iconify-icon icon={alert.icon} width="22"></iconify-icon>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                          {alert.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${config.badgeClasses}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300">
                        Current value: <span className="font-medium text-white">{alert.currentValue}</span>{' '}
                        <span className="text-slate-500">vs</span> Target:{' '}
                        <span className="font-medium text-white">{alert.targetValue}</span>
                      </div>
                      <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <iconify-icon icon="solar:clock-circle-linear" width="14"></iconify-icon>
                          {alert.timeAgo}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                        <span className="flex items-center gap-1">
                          {alert.dashboard}
                          <iconify-icon icon="solar:arrow-right-up-linear" width="12"></iconify-icon>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 md:border-l md:border-slate-700 md:pl-5 pt-2 md:pt-0">
                    {alert.severity === 'critical' ? (
                      <>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-white transition-colors border border-slate-600">
                          Snooze
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-white transition-colors border border-slate-600">
                          Resolve
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors shadow-lg shadow-indigo-500/20">
                          Acknowledge
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-transparent hover:border-slate-600">
                          Options
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-medium text-white transition-colors border border-slate-600">
                          {alert.severity === 'info' ? 'Mark Read' : 'Acknowledge'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
