import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
import { Breadcrumb, DashboardCard, StatusBadge } from '~/components/ui';

export default function ApiKeyDetails() {
  const { id } = useParams();

  const apiKey = {
    id: '1',
    name: 'Production API',
    key: 'pk_live_51H7x8K2Jk9D3x2K',
    createdBy: 'Admin User',
    created: 'Jan 15, 2024',
    lastUsed: '5 min ago',
    requests: 2847,
    status: 'active' as const,
  };

  const usageData = [
    { date: '2024-02-01', requests: 342 },
    { date: '2024-02-02', requests: 478 },
    { date: '2024-02-03', requests: 521 },
    { date: '2024-02-04', requests: 412 },
    { date: '2024-02-05', requests: 594 },
    { date: '2024-02-06', requests: 321 },
    { date: '2024-02-07', requests: 179 },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'API Keys', to: '/api-keys' },
              { label: apiKey.name, to: `/api-keys/${id}` },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">API Key Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
            <Icon icon="solar:refresh-linear" width={18} />
            Regenerate Key
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium border border-rose-500/20 transition-all">
            <Icon icon="solar:trash-bin-minimalistic-linear" width={18} />
            Revoke
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Key Info Card */}
          <div className="col-span-1">
            <DashboardCard title="Key Information">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 uppercase mb-2 block">API Key</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                    <code className="flex-1 text-sm font-mono text-white truncate">{apiKey.key}</code>
                    <button className="p-1.5 rounded hover:bg-slate-700">
                      <Icon icon="solar:copy-linear" width={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-slate-700/50">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Name</span>
                    <span className="text-sm text-white">{apiKey.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Created By</span>
                    <span className="text-sm text-white">{apiKey.createdBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Created</span>
                    <span className="text-sm text-white">{apiKey.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Last Used</span>
                    <span className="text-sm text-white">{apiKey.lastUsed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Total Requests</span>
                    <span className="text-sm text-white">{apiKey.requests.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Status</span>
                    <StatusBadge status={apiKey.status} />
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Usage Stats */}
            <DashboardCard title="Usage Statistics (Last 7 Days)">
              <div className="h-[200px] flex items-end justify-around gap-2">
                {usageData.map((item, index) => {
                  const maxHeight = Math.max(...usageData.map(d => d.requests));
                  const height = (item.requests / maxHeight) * 180;
                  return (
                    <div key={item.date} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full bg-indigo-500/60 rounded-t transition-all hover:bg-indigo-500"
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-xs text-slate-500">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </DashboardCard>

            {/* Permissions */}
            <DashboardCard title="Permissions">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:database-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Read Data Sources</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:code-square-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Execute Queries</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:widget-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Create Dashboards</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:settings-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Admin Access</span>
                  </div>
                  <Icon icon="solar:close-circle-bold" width={20} className="text-slate-500" />
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </main>
  );
}
