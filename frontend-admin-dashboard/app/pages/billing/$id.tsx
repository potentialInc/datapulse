import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
import { Breadcrumb, DashboardCard } from '~/components/ui';

export default function InvoiceDetails() {
  const { id } = useParams();

  const invoice = {
    id: '1',
    invoiceNumber: 'INV-0001',
    date: 'Feb 1, 2024',
    dueDate: 'Feb 8, 2024',
    amount: '$499.00',
    status: 'paid',
    plan: 'Enterprise Plan',
    billingPeriod: 'Feb 1, 2024 - Mar 1, 2024',
  };

  const lineItems = [
    { description: 'Enterprise Plan - Monthly Subscription', quantity: 1, unitPrice: '$499.00', total: '$499.00' },
    { description: 'Additional Data Source (x2)', quantity: 2, unitPrice: '$50.00', total: '$100.00' },
    { description: 'Premium Support', quantity: 1, unitPrice: '$199.00', total: '$199.00' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'Billing', to: '/billing' },
              { label: invoice.invoiceNumber, to: `/billing/${id}` },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">Invoice Details</h1>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
          <Icon icon="solar:download-linear" width={18} />
          Download PDF
        </button>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <DashboardCard>
            {/* Invoice Header */}
            <div className="flex items-start justify-between mb-8 pb-8 border-b border-slate-700/50">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">DataPulse</h2>
                <p className="text-sm text-slate-400">123 Business St</p>
                <p className="text-sm text-slate-400">San Francisco, CA 94105</p>
                <p className="text-sm text-slate-400">USA</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-bold text-white mb-2">{invoice.invoiceNumber}</h3>
                <p className="text-sm text-slate-400">Issue Date: {invoice.date}</p>
                <p className="text-sm text-slate-400">Due Date: {invoice.dueDate}</p>
                <span className="inline-block mt-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase mb-2">Bill To</h3>
              <p className="text-sm text-white">Your Company Name</p>
              <p className="text-sm text-slate-400">456 Client Ave</p>
              <p className="text-sm text-slate-400">New York, NY 10001</p>
            </div>

            {/* Line Items */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Qty</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Unit Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {lineItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-white">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 text-right">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 text-right">{item.unitPrice}</td>
                      <td className="px-4 py-3 text-sm text-white font-medium text-right">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">$798.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax (0%)</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-700/50">
                  <span className="text-white">Total</span>
                  <span className="text-white">$798.00</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-8 pt-8 border-t border-slate-700/50">
              <p className="text-sm text-slate-400">
                Payment Method: •••• •••• •••• 4242
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Billing Period: {invoice.billingPeriod}
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
