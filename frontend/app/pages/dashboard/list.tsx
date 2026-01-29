import { useState } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { DashboardCard, SearchInput } from '~/components/ui';

interface Dashboard {
  id: string;
  title: string;
  description: string;
  owner: { name: string; initials: string; color: string };
  lastModified: string;
  isFavorite: boolean;
  chartType: 'line' | 'donut' | 'bar' | 'curve' | 'bars' | 'pie' | 'progress' | 'grid';
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
}

const mockDashboards: Dashboard[] = [
  {
    id: '1',
    title: 'Sales Performance',
    description: 'Q4 revenue and team targets overview',
    owner: { name: 'John Doe', initials: 'JD', color: 'indigo' },
    lastModified: '2h ago',
    isFavorite: true,
    chartType: 'line',
    color: 'indigo',
  },
  {
    id: '2',
    title: 'User Acquisition',
    description: 'Daily signup metrics across channels',
    owner: { name: 'Sarah M.', initials: 'SM', color: 'emerald' },
    lastModified: '5h ago',
    isFavorite: false,
    chartType: 'donut',
    color: 'emerald',
  },
  {
    id: '3',
    title: 'Inventory Status',
    description: 'Stock levels and reorder alerts',
    owner: { name: 'David K.', initials: 'DK', color: 'slate' },
    lastModified: '1d ago',
    isFavorite: false,
    chartType: 'bar',
    color: 'amber',
  },
  {
    id: '4',
    title: 'Revenue Trends',
    description: 'Year-over-year growth analysis',
    owner: { name: 'John Doe', initials: 'JD', color: 'indigo' },
    lastModified: '2d ago',
    isFavorite: true,
    chartType: 'curve',
    color: 'indigo',
  },
  {
    id: '5',
    title: 'Customer Analytics',
    description: 'Demographics and behavior flow',
    owner: { name: 'Alex L.', initials: 'AL', color: 'purple' },
    lastModified: '3d ago',
    isFavorite: false,
    chartType: 'bars',
    color: 'indigo',
  },
  {
    id: '6',
    title: 'Marketing ROI',
    description: 'Campaign spend vs attribution',
    owner: { name: 'Sarah M.', initials: 'SM', color: 'emerald' },
    lastModified: '4d ago',
    isFavorite: false,
    chartType: 'pie',
    color: 'rose',
  },
  {
    id: '7',
    title: 'Product Metrics',
    description: 'Feature usage and adoption rates',
    owner: { name: 'John Doe', initials: 'JD', color: 'indigo' },
    lastModified: '1w ago',
    isFavorite: true,
    chartType: 'progress',
    color: 'indigo',
  },
  {
    id: '8',
    title: 'Team KPIs',
    description: 'Weekly productivity scores',
    owner: { name: 'Mike R.', initials: 'MR', color: 'slate' },
    lastModified: '1w ago',
    isFavorite: false,
    chartType: 'grid',
    color: 'indigo',
  },
];

export default function DashboardList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'owned' | 'shared' | 'favorites'>('all');

  const tabs = [
    { key: 'all' as const, label: 'All' },
    { key: 'owned' as const, label: 'Owned' },
    { key: 'shared' as const, label: 'Shared with me' },
    { key: 'favorites' as const, label: 'Favorites' },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-8 border-b border-transparent">
        <h1 className="text-2xl font-semibold text-white tracking-tight">My Dashboards</h1>

        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search dashboards..."
          />

          {/* View Toggle */}
          <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700/50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <iconify-icon icon="solar:gallery-grid-linear" width="18"></iconify-icon>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <iconify-icon icon="solar:list-linear" width="18"></iconify-icon>
            </button>
          </div>
        </div>
      </header>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab.key
                    ? 'text-white bg-slate-800 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort & Filter Dropdowns */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white border border-transparent hover:border-slate-700 rounded-lg transition-all">
              <span>Sort by: Modified</span>
              <iconify-icon icon="solar:alt-arrow-down-linear" width="12"></iconify-icon>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-400 hover:text-white border border-slate-700/50 bg-slate-800/50 rounded-lg transition-all">
              <iconify-icon icon="solar:filter-linear" width="16"></iconify-icon>
              Filter
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockDashboards.map((dashboard) => (
            <Link key={dashboard.id} to={`/dashboard/${dashboard.id}`}>
              <DashboardCard
                title={dashboard.title}
                description={dashboard.description}
                owner={dashboard.owner}
                lastModified={dashboard.lastModified}
                isFavorite={dashboard.isFavorite}
                variant={dashboard.color}
                chartType={dashboard.chartType}
              />
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-300">1</span> to{' '}
            <span className="font-medium text-slate-300">8</span> of{' '}
            <span className="font-medium text-slate-300">24</span> dashboards
          </p>
          <nav className="flex items-center gap-1">
            <button
              disabled
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
            >
              <iconify-icon icon="solar:alt-arrow-left-linear" width="16"></iconify-icon>
            </button>
            <button className="px-3 py-1 text-sm font-medium rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-500/20">
              1
            </button>
            <button className="px-3 py-1 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              2
            </button>
            <button className="px-3 py-1 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              3
            </button>
            <span className="px-2 text-slate-600">...</span>
            <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
              <iconify-icon icon="solar:alt-arrow-right-linear" width="16"></iconify-icon>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
