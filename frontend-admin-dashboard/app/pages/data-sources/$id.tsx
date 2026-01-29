import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router';
import { Breadcrumb, DashboardCard, StatusBadge } from '~/components/ui';

export default function DataSourceDetails() {
  const { id } = useParams();

  const dataSource = {
    id: '1',
    name: 'Production Database',
    host: 'prod-db.company.com',
    port: 5432,
    database: 'production',
    username: 'db_user',
    type: 'PostgreSQL',
    status: 'connected',
    lastSync: '5 min ago',
    tables: 24,
    createdAt: 'Jan 10, 2024',
  };

  const tables = [
    { name: 'users', rows: 248, size: '2.4 MB' },
    { name: 'orders', rows: 1847, size: '8.2 MB' },
    { name: 'products', rows: 542, size: '1.8 MB' },
    { name: 'customers', rows: 3201, size: '12.5 MB' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'Data Sources', to: '/data-sources' },
              { label: dataSource.name, to: `/data-sources/${id}` },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">Data Source Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
            <Icon icon="solar:refresh-linear" width={18} />
            Test Connection
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
            <Icon icon="solar:pen-linear" width={18} />
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium border border-rose-500/20 transition-all">
            <Icon icon="solar:trash-bin-minimalistic-linear" width={18} />
            Delete
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Connection Info Card */}
          <div className="col-span-1">
            <DashboardCard title="Connection Info">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <Icon icon="simple-icons:postgresql" width={24} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{dataSource.type}</p>
                    <StatusBadge status={dataSource.status} className="mt-1" />
                  </div>
                </div>

                <div className="pt-4 space-y-3 border-t border-slate-700/50">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Host</span>
                    <span className="text-sm text-white font-mono">{dataSource.host}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Port</span>
                    <span className="text-sm text-white font-mono">{dataSource.port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Database</span>
                    <span className="text-sm text-white font-mono">{dataSource.database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Username</span>
                    <span className="text-sm text-white font-mono">{dataSource.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Tables</span>
                    <span className="text-sm text-white">{dataSource.tables}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Last Sync</span>
                    <span className="text-sm text-white">{dataSource.lastSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Created</span>
                    <span className="text-sm text-white">{dataSource.createdAt}</span>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Main Content */}
          <div className="col-span-2">
            <DashboardCard title="Tables">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Table Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Rows</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {tables.map((table) => (
                      <tr key={table.name} className="hover:bg-slate-800/30">
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-white font-mono">{table.name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">{table.rows.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{table.size}</td>
                        <td className="px-4 py-3">
                          <button className="text-sm text-indigo-400 hover:text-indigo-300">Preview</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </main>
  );
}
