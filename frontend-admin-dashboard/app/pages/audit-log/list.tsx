import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { SearchInput } from '~/components/ui';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'failed';
  ipAddress: string;
}

export default function AuditLogList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('24h');

  const logs: AuditLog[] = [
    { id: '1', timestamp: '2024-02-07 14:32:15', user: 'John Doe', action: 'Login', resource: 'Authentication', status: 'success', ipAddress: '192.168.1.105' },
    { id: '2', timestamp: '2024-02-07 14:15:42', user: 'Sarah Analyst', action: 'Create', resource: 'Dashboard: Q1 Revenue', status: 'success', ipAddress: '192.168.1.112' },
    { id: '3', timestamp: '2024-02-07 13:48:23', user: 'Admin User', action: 'Update', resource: 'Data Source: Production DB', status: 'success', ipAddress: '192.168.1.100' },
    { id: '4', timestamp: '2024-02-07 13:22:11', user: 'Mike Chen', action: 'Delete', resource: 'Dashboard: Old Reports', status: 'success', ipAddress: '192.168.1.118' },
    { id: '5', timestamp: '2024-02-07 12:55:37', user: 'Unknown', action: 'Login', resource: 'Authentication', status: 'failed', ipAddress: '203.45.67.89' },
  ];

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return 'solar:login-2-linear';
      case 'create':
        return 'solar:add-circle-linear';
      case 'update':
        return 'solar:pen-linear';
      case 'delete':
        return 'solar:trash-bin-minimalistic-linear';
      default:
        return 'solar:document-text-linear';
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'create':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'update':
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'delete':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-700/50 border-slate-600';
    }
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="Audit Log"
        subtitle="Track all system activities and user actions"
        action={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700">
            <Icon icon="solar:export-linear" width={18} />
            Export Logs
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-8">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search logs by user, action, or resource..."
            className="flex-1"
          />

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Users</option>
            <option value="admins">Admins</option>
            <option value="analysts">Analysts</option>
            <option value="business">Business Users</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="custom">Custom range</option>
          </select>
        </div>

        {/* Audit Log Table */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Resource</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm text-white font-mono">{log.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">{log.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full border ${getActionColor(log.action)}`}>
                      <Icon icon={getActionIcon(log.action)} width={14} />
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{log.resource}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${log.status === 'success' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400 font-mono">{log.ipAddress}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/audit-log/${log.id}`} className="text-sm text-indigo-400 hover:text-indigo-300">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
