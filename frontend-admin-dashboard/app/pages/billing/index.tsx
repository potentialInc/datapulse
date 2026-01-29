import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { DashboardCard } from '~/components/ui';

export default function Billing() {
  const invoices = [
    { id: '1', date: 'Feb 1, 2024', amount: '$499.00', status: 'paid' as const },
    { id: '2', date: 'Jan 1, 2024', amount: '$499.00', status: 'paid' as const },
    { id: '3', date: 'Dec 1, 2023', amount: '$499.00', status: 'paid' as const },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="Billing & Subscription"
        subtitle="Manage your subscription plan and payment methods"
        action={
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium">
            <Icon icon="solar:arrow-up-linear" width={18} />
            Upgrade Plan
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Current Plan */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/20 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="text-xs font-medium text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-full">Current Plan</span>
                <h2 className="text-2xl font-bold text-white mt-3">Enterprise Plan</h2>
                <p className="text-sm text-slate-400 mt-1">Unlimited users, priority support, custom integrations</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">$499</p>
                <p className="text-sm text-slate-400">/month</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Users</p>
                <p className="text-lg font-semibold text-white">48 / Unlimited</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Data Sources</p>
                <p className="text-lg font-semibold text-white">12 / 25</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">API Calls</p>
                <p className="text-lg font-semibold text-white">842K / 1M</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-xs text-slate-400 mb-1">Storage</p>
                <p className="text-lg font-semibold text-white">156 GB / 500 GB</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Payment Method</h3>
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Icon icon="solar:card-linear" width={24} className="text-indigo-400" />
              <div className="flex-1">
                <p className="text-sm text-white">•••• •••• •••• 4242</p>
                <p className="text-xs text-slate-400">Expires 12/2025</p>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Billing History */}
        <DashboardCard
          title="Billing History"
          action={
            <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Invoice</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-white font-mono">INV-{invoice.id.padStart(4, '0')}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{invoice.date}</td>
                    <td className="px-4 py-3 text-sm text-white font-medium">{invoice.amount}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Paid
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/billing/${invoice.id}`} className="text-sm text-indigo-400 hover:text-indigo-300">
                          View
                        </Link>
                        <button className="text-sm text-slate-400 hover:text-white">
                          Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
