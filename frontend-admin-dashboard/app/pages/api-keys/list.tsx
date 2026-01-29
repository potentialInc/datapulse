import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { StatusBadge } from '~/components/ui';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdBy: string;
  created: string;
  lastUsed: string;
  requests: number;
  status: 'active' | 'inactive';
}

export default function ApiKeysList() {
  const apiKeys: ApiKey[] = [
    { id: '1', name: 'Production API', key: 'pk_live_51H...3x2K', createdBy: 'Admin User', created: 'Jan 15, 2024', lastUsed: '5 min ago', requests: 2847, status: 'active' },
    { id: '2', name: 'Development API', key: 'pk_test_51H...9K7L', createdBy: 'Dev Team', created: 'Feb 1, 2024', lastUsed: '2 hours ago', requests: 542, status: 'active' },
    { id: '3', name: 'Legacy Integration', key: 'pk_live_41G...2M4N', createdBy: 'Admin User', created: 'Dec 10, 2023', lastUsed: 'Never', requests: 0, status: 'inactive' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="API Keys"
        subtitle="Manage API access keys"
        action={
          <Link to="/api-keys/create" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium">
            <Icon icon="solar:add-circle-linear" width={18} />
            Generate API Key
          </Link>
        }
      />

      <div className="flex-1 overflow-auto p-8">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">API Key</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Created By</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Last Used</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Requests</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {apiKeys.map((key) => (
              <tr key={key.id} className="hover:bg-slate-800/30 cursor-pointer" onClick={() => window.location.href = `/api-keys/${key.id}`}>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">{key.name}</span>
                </td>
                <td className="px-6 py-4">
                  <code className="text-sm font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">{key.key}</code>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{key.createdBy}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{key.lastUsed}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{key.requests.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={key.status} />
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-700">
                      <Icon icon="solar:copy-linear" width={16} />
                    </button>
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
