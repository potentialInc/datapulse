import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
import { Breadcrumb, DashboardCard } from '~/components/ui';

export default function AuditLogDetails() {
  const { id } = useParams();

  const log = {
    id: '1',
    timestamp: '2024-02-07 14:32:15',
    user: 'John Doe',
    userEmail: 'john.doe@company.com',
    action: 'Login',
    resource: 'Authentication',
    status: 'success',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'New York, USA',
    metadata: {
      sessionId: 'sess_1234567890',
      duration: '45 minutes',
      mfaUsed: true,
    },
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'Audit Log', to: '/audit-log' },
              { label: 'Log Details', to: `/audit-log/${id}` },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">Audit Log Details</h1>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
          <Icon icon="solar:export-linear" width={18} />
          Export
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Event Information */}
          <DashboardCard title="Event Information">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Timestamp</label>
                <p className="text-sm text-white font-mono">{log.timestamp}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Status</label>
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${log.status === 'success' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border-rose-500/20'}`}>
                  {log.status}
                </span>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Action</label>
                <p className="text-sm text-white">{log.action}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Resource</label>
                <p className="text-sm text-white">{log.resource}</p>
              </div>
            </div>
          </DashboardCard>

          {/* User Information */}
          <DashboardCard title="User Information">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">User</label>
                <p className="text-sm text-white">{log.user}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Email</label>
                <p className="text-sm text-white">{log.userEmail}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">IP Address</label>
                <p className="text-sm text-white font-mono">{log.ipAddress}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Location</label>
                <p className="text-sm text-white">{log.location}</p>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-400 uppercase mb-1 block">User Agent</label>
                <p className="text-sm text-white font-mono break-all">{log.userAgent}</p>
              </div>
            </div>
          </DashboardCard>

          {/* Metadata */}
          <DashboardCard title="Additional Metadata">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Session ID</label>
                <p className="text-sm text-white font-mono">{log.metadata.sessionId}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">Duration</label>
                <p className="text-sm text-white">{log.metadata.duration}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase mb-1 block">MFA Used</label>
                <p className="text-sm text-white">{log.metadata.mfaUsed ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
