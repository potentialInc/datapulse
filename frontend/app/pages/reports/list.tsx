import { useState } from 'react';
import { SearchInput, StatusBadge } from '~/components/ui';
import { ScheduleReportModal } from '~/components/modals';

interface Report {
  id: string;
  name: string;
  dashboard: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextDelivery: string;
  recipients: number;
  status: 'active' | 'inactive';
  icon: string;
  iconColor: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Weekly Sales Summary',
    dashboard: 'Sales Dashboard',
    frequency: 'weekly',
    nextDelivery: 'Jan 28, 9:00 AM',
    recipients: 8,
    status: 'active',
    icon: 'solar:document-text-linear',
    iconColor: 'indigo',
  },
  {
    id: '2',
    name: 'Daily Revenue Report',
    dashboard: 'Revenue Trends',
    frequency: 'daily',
    nextDelivery: 'Tomorrow, 6:00 AM',
    recipients: 3,
    status: 'active',
    icon: 'solar:graph-up-linear',
    iconColor: 'blue',
  },
  {
    id: '3',
    name: 'Monthly KPI Report',
    dashboard: 'Executive KPIs',
    frequency: 'monthly',
    nextDelivery: 'Feb 1, 8:00 AM',
    recipients: 12,
    status: 'active',
    icon: 'solar:pie-chart-2-linear',
    iconColor: 'emerald',
  },
  {
    id: '4',
    name: 'Inventory Alerts',
    dashboard: 'Inventory Status',
    frequency: 'daily',
    nextDelivery: 'Tomorrow, 7:00 AM',
    recipients: 5,
    status: 'inactive',
    icon: 'solar:box-minimalistic-linear',
    iconColor: 'orange',
  },
  {
    id: '5',
    name: 'Customer Analytics',
    dashboard: 'Customer Analytics',
    frequency: 'weekly',
    nextDelivery: 'Jan 29, 10:00 AM',
    recipients: 6,
    status: 'active',
    icon: 'solar:chart-2-linear',
    iconColor: 'purple',
  },
];

const iconColorClasses = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  blue: 'bg-blue-500/10 text-blue-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  orange: 'bg-orange-500/10 text-orange-400',
  purple: 'bg-purple-500/10 text-purple-400',
};

const frequencyColorClasses = {
  daily: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  weekly: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  monthly: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function ReportsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'scheduled' | 'generated'>('scheduled');
  const [isScheduleReportModalOpen, setIsScheduleReportModalOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your scheduled and generated reports</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search reports..."
          />

          <button
            onClick={() => setIsScheduleReportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            <iconify-icon icon="solar:add-circle-linear" width="18"></iconify-icon>
            Schedule Report
          </button>

          <ScheduleReportModal
            isOpen={isScheduleReportModalOpen}
            onClose={() => setIsScheduleReportModalOpen(false)}
            onSubmit={(data) => {
              console.log('Report scheduled:', data);
              // Handle report scheduling
            }}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6 z-10 scrollbar-hide">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'scheduled'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Scheduled Reports
          </button>
          <button
            onClick={() => setActiveTab('generated')}
            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'generated'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Generated Reports
          </button>
        </div>

        {/* Reports Table */}
        <div className="bg-slate-800 border border-slate-700/50 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/30 border-b border-slate-700">
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Report Name
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Dashboard
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Frequency
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Next Delivery
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Recipients
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Status
                  </th>
                  <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {mockReports.map((report) => (
                  <tr key={report.id} className="bg-slate-800 hover:bg-slate-700/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${iconColorClasses[report.iconColor as keyof typeof iconColorClasses]}`}>
                          <iconify-icon icon={report.icon} width="18"></iconify-icon>
                        </div>
                        <span className="text-sm font-medium text-white">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-400">{report.dashboard}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${frequencyColorClasses[report.frequency]}`}>
                        {report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-400">{report.nextDelivery}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm text-slate-400">
                        <iconify-icon icon="solar:users-group-rounded-linear" width="16"></iconify-icon>
                        {report.recipients} recipients
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={report.status === 'active' ? 'active' : 'inactive'}
                        label={report.status === 'active' ? 'Active' : 'Paused'}
                      />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition-colors">
                          <iconify-icon icon="solar:pen-linear" width="18"></iconify-icon>
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded transition-colors">
                          <iconify-icon icon="solar:trash-bin-trash-linear" width="18"></iconify-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
