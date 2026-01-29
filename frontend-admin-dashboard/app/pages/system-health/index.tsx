import { Icon } from '@iconify/react';
import { PageHeader } from '~/components/layout';
import { DashboardCard, StatusBadge } from '~/components/ui';

export default function SystemHealth() {
  const services = [
    { name: 'API Server', status: 'active' as const, uptime: '99.99%', responseTime: '45ms' },
    { name: 'Database', status: 'active' as const, uptime: '100%', responseTime: '12ms' },
    { name: 'Cache Server', status: 'active' as const, uptime: '99.95%', responseTime: '2ms' },
    { name: 'Queue System', status: 'warning' as const, uptime: '98.5%', responseTime: '125ms' },
  ];

  const metrics = [
    { label: 'CPU Usage', value: '42%', status: 'healthy' as const },
    { label: 'Memory', value: '64%', status: 'healthy' as const },
    { label: 'Disk Space', value: '31%', status: 'healthy' as const },
    { label: 'Network', value: '18%', status: 'healthy' as const },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="System Health"
        subtitle="Monitor system status and performance"
        action={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700">
            <Icon icon="solar:refresh-linear" width={18} />
            Refresh
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Overall Status */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{metric.label}</span>
                <span className="text-xs font-medium text-emerald-400">Healthy</span>
              </div>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Services Status */}
        <DashboardCard title="Services">
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${service.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                  <div>
                    <p className="text-sm font-medium text-white">{service.name}</p>
                    <p className="text-xs text-slate-400">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Response Time</p>
                    <p className="text-sm font-medium text-white">{service.responseTime}</p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Recent Incidents */}
        <DashboardCard title="Recent Incidents">
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
              <Icon icon="solar:danger-triangle-linear" width={20} className="text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white">Queue System Degradation</p>
                <p className="text-xs text-slate-400 mt-1">Response times elevated due to high load</p>
                <p className="text-xs text-slate-500 mt-2">2 hours ago</p>
              </div>
              <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Investigating
              </span>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
              <Icon icon="solar:check-circle-linear" width={20} className="text-emerald-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white">Database Maintenance Completed</p>
                <p className="text-xs text-slate-400 mt-1">Scheduled maintenance completed successfully</p>
                <p className="text-xs text-slate-500 mt-2">1 day ago</p>
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Resolved
              </span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
