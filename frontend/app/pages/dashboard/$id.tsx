import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { StatCard, DataTable, StatusBadge } from '~/components/ui';

interface Product {
  id: string;
  name: string;
  revenue: string;
  unitsSold: number;
  growth: string;
  status: 'active' | 'inactive' | 'warning';
}

const mockProducts: Product[] = [
  { id: '1', name: 'DataPulse Enterprise', revenue: '$124,500', unitsSold: 1204, growth: '+12%', status: 'active' },
  { id: '2', name: 'Analytics Pro', revenue: '$86,200', unitsSold: 892, growth: '+5.4%', status: 'active' },
  { id: '3', name: 'Cloud Starter', revenue: '$45,000', unitsSold: 2450, growth: '-2.1%', status: 'warning' },
  { id: '4', name: 'API Connector', revenue: '$32,800', unitsSold: 540, growth: '+18%', status: 'active' },
  { id: '5', name: 'Legacy Export Tool', revenue: '$12,100', unitsSold: 120, growth: '0%', status: 'inactive' },
];

const productColumns = [
  { key: 'name', header: 'Product', className: 'font-medium text-slate-200' },
  { key: 'revenue', header: 'Revenue', className: 'text-right text-white' },
  { key: 'unitsSold', header: 'Units Sold', className: 'text-right', render: (row: Product) => row.unitsSold.toLocaleString() },
  {
    key: 'growth',
    header: 'Growth',
    className: 'text-right',
    render: (row: Product) => (
      <span className={row.growth.startsWith('+') ? 'text-emerald-500' : row.growth.startsWith('-') ? 'text-rose-500' : 'text-slate-500'}>
        {row.growth}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    className: 'text-right',
    render: (row: Product) => <StatusBadge status={row.status} />,
  },
];

export default function DashboardView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
      {/* Top Toolbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <iconify-icon icon="solar:arrow-left-linear" width="24"></iconify-icon>
          </button>

          <div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <h1 className="text-lg font-semibold text-slate-50 tracking-tight group-hover:border-b border-dashed border-slate-500">
                Sales Performance
              </h1>
              <iconify-icon
                icon="solar:pen-linear"
                className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                width="16"
              ></iconify-icon>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Last updated: 2 min ago</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <div className="flex items-center gap-1 text-indigo-400">
                <iconify-icon icon="solar:refresh-circle-linear" className="animate-spin" style={{ animationDuration: '3s' }} width="14"></iconify-icon>
                <span>30s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range */}
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700/50 rounded-lg hover:bg-slate-700 hover:text-white transition-all shadow-sm">
            <iconify-icon icon="solar:calendar-linear" width="16"></iconify-icon>
            Last 30 Days
            <iconify-icon icon="solar:alt-arrow-down-linear" width="12" className="text-slate-500"></iconify-icon>
          </button>

          <div className="h-6 w-px bg-slate-800 mx-1"></div>

          {/* Actions */}
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Refresh">
            <iconify-icon icon="solar:refresh-linear" width="20"></iconify-icon>
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Full Screen">
            <iconify-icon icon="solar:maximize-square-linear" width="20"></iconify-icon>
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Export">
            <iconify-icon icon="solar:export-linear" width="20"></iconify-icon>
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Schedule Report">
            <iconify-icon icon="solar:calendar-linear" width="20"></iconify-icon>
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Create Alert">
            <iconify-icon icon="solar:bell-linear" width="20"></iconify-icon>
          </button>
          <button className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors" title="Share">
            <iconify-icon icon="solar:share-linear" width="20"></iconify-icon>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
          >
            <iconify-icon icon="solar:pen-new-square-linear" width="16"></iconify-icon>
            Edit
          </button>
        </div>
      </header>

      {/* Dashboard Canvas */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {/* KPI Cards */}
          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-400">Total Revenue</p>
              <iconify-icon icon="solar:dollar-minimalistic-linear" className="text-slate-500" width="20"></iconify-icon>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">$2.4M</h3>
                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-medium">
                  <iconify-icon icon="solar:trend-up-linear" width="14"></iconify-icon>
                  <span>12.5%</span>
                  <span className="text-slate-500 font-normal ml-1">vs last month</span>
                </div>
              </div>
              <svg className="w-16 h-8 text-emerald-500" viewBox="0 0 40 20">
                <path d="M0 15 L5 12 L10 14 L15 8 L20 10 L25 5 L30 8 L35 2 L40 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-400">Conversion Rate</p>
              <iconify-icon icon="solar:users-group-rounded-linear" className="text-slate-500" width="20"></iconify-icon>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">3.24%</h3>
                <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs font-medium">
                  <iconify-icon icon="solar:trend-down-linear" width="14"></iconify-icon>
                  <span>2.1%</span>
                  <span className="text-slate-500 font-normal ml-1">vs last month</span>
                </div>
              </div>
              <svg className="w-16 h-8 text-rose-500" viewBox="0 0 40 20">
                <path d="M0 5 L5 8 L10 4 L15 10 L20 12 L25 8 L30 14 L35 12 L40 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-400">Avg Deal Size</p>
              <iconify-icon icon="solar:bag-linear" className="text-slate-500" width="20"></iconify-icon>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">$45.2K</h3>
                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-medium">
                  <iconify-icon icon="solar:trend-up-linear" width="14"></iconify-icon>
                  <span>8.7%</span>
                  <span className="text-slate-500 font-normal ml-1">vs last month</span>
                </div>
              </div>
              <svg className="w-16 h-8 text-emerald-500" viewBox="0 0 40 20">
                <path d="M0 12 L5 14 L10 10 L15 12 L20 8 L25 6 L30 8 L35 4 L40 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-400">Win Rate</p>
              <iconify-icon icon="solar:cup-star-linear" className="text-slate-500" width="20"></iconify-icon>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">68%</h3>
                <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-medium">
                  <iconify-icon icon="solar:trend-up-linear" width="14"></iconify-icon>
                  <span>5.2%</span>
                  <span className="text-slate-500 font-normal ml-1">vs last month</span>
                </div>
              </div>
              <svg className="w-16 h-8 text-emerald-500" viewBox="0 0 40 20">
                <path d="M0 18 L10 16 L20 12 L30 8 L40 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>

          {/* Large Line Chart */}
          <div className="col-span-1 lg:col-span-3 bg-slate-800 border border-slate-700/50 rounded-xl p-6 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-white">Revenue Over Time</h3>
                <p className="text-xs text-slate-500">Comparing current period vs target</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-300">Revenue</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full border border-slate-500 border-dashed bg-transparent"></span>
                  <span className="text-slate-300">Target</span>
                </div>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="flex-1 bg-slate-900/50 rounded-lg flex items-center justify-center text-slate-500">
              <span className="text-sm">Chart: Revenue trend visualization</span>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-1 bg-slate-800 border border-slate-700/50 rounded-xl p-6 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-white">Revenue by Product</h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-slate-700 relative flex items-center justify-center">
                <div className="text-center">
                  <span className="text-sm text-slate-400 block">Total</span>
                  <span className="text-xl font-bold text-white">$668K</span>
                </div>
              </div>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                    <span className="text-slate-300">Enterprise</span>
                  </div>
                  <span className="font-medium text-slate-200">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-300">Pro Plan</span>
                  </div>
                  <span className="font-medium text-slate-200">35%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-slate-300">Starter</span>
                  </div>
                  <span className="font-medium text-slate-200">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sales by Region */}
          <div className="col-span-1 bg-slate-800 border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-white">Sales by Region</h3>
            </div>

            <div className="space-y-5">
              {[
                { name: 'North America', value: '$245K', percent: 85 },
                { name: 'Europe', value: '$189K', percent: 65 },
                { name: 'APAC', value: '$156K', percent: 55 },
                { name: 'LATAM', value: '$78K', percent: 30 },
              ].map((region) => (
                <div key={region.name} className="group">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{region.name}</span>
                    <span className="text-white font-medium">{region.value}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full group-hover:bg-indigo-400 transition-colors"
                      style={{ width: `${region.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="col-span-1 lg:col-span-4 bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Top Performing Products</h3>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>
            <DataTable columns={productColumns} data={mockProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
