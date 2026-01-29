import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { StatusBadge } from '~/components/ui';

interface DataSource {
  id: string;
  name: string;
  host: string;
  type: string;
  status: 'connected' | 'error' | 'warning';
  lastSync: string;
  tables: number;
}

export default function DataSourcesList() {
  const dataSources: DataSource[] = [
    { id: '1', name: 'Production Database', host: 'prod-db.company.com', type: 'PostgreSQL', status: 'connected', lastSync: '5 min ago', tables: 24 },
    { id: '2', name: 'Analytics Warehouse', host: 'analytics.company.com', type: 'PostgreSQL', status: 'connected', lastSync: '2 hours ago', tables: 18 },
    { id: '3', name: 'Legacy System', host: 'legacy-db.company.com', type: 'PostgreSQL', status: 'error', lastSync: 'Failed', tables: 0 },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="Data Source Connections"
        subtitle="Manage database connections"
        action={
          <Link to="/data-sources/create" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium">
            <Icon icon="solar:add-circle-linear" width={18} />
            Add Connection
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-8">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Connection Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Last Sync</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Tables</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {dataSources.map((source) => (
              <tr key={source.id} className="hover:bg-slate-800/30 cursor-pointer" onClick={() => window.location.href = `/data-sources/${source.id}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${source.status === 'error' ? 'bg-rose-500/10' : 'bg-blue-500/10'}`}>
                      <Icon icon="simple-icons:postgresql" width={20} className={source.status === 'error' ? 'text-rose-400' : 'text-blue-400'} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{source.name}</p>
                      <p className="text-xs text-slate-500">{source.host}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{source.type}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={source.status} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{source.lastSync}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{source.tables || '-'}</td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm rounded-lg text-slate-400 hover:bg-slate-700">Test</button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700">
                      <Icon icon="solar:pen-linear" width={16} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700">
                      <Icon icon="solar:trash-bin-minimalistic-linear" width={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
