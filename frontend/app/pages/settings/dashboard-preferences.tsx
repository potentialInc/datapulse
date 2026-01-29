import { useState } from 'react';
import { Link } from 'react-router';
import { SearchInput } from '~/components/ui';

const chartThemes = [
  { id: 'indigo', name: 'Indigo', colors: ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-fuchsia-500'] },
  { id: 'ocean', name: 'Ocean', colors: ['bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500'] },
  { id: 'sunset', name: 'Sunset', colors: ['bg-amber-500', 'bg-orange-500', 'bg-red-500', 'bg-rose-500'] },
  { id: 'monochrome', name: 'Monochrome', colors: ['bg-slate-400', 'bg-slate-500', 'bg-slate-600', 'bg-slate-700'] },
];

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: 'solar:user-circle-linear', path: '/settings' },
  { id: 'security', label: 'Security', icon: 'solar:shield-keyhole-linear', path: '/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: 'solar:bell-linear', path: '/settings/notifications' },
  { id: 'dashboard-prefs', label: 'Dashboard Preferences', icon: 'solar:widget-linear', path: '/settings/dashboard-preferences' },
];

export default function DashboardPreferences() {
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState({
    defaultDashboard: 'Sales Performance',
    autoRefresh: true,
    refreshInterval: '1 minute',
    animations: true,
    compactMode: false,
    chartTheme: 'indigo',
    numberFormat: '1,234.56 (US)',
    currency: 'USD ($)',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour (AM/PM)',
  });

  const handleToggle = (field: string) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search settings..."
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 z-10 scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    tab.id === 'dashboard-prefs'
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <iconify-icon icon={tab.icon} width="20"></iconify-icon>
                    {tab.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Content Area: Dashboard Preferences */}
          <div className="lg:col-span-9 space-y-6">
            {/* Default Dashboard */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Default Dashboard</h2>
                <p className="text-sm text-slate-400 mt-1">Choose which dashboard to show when you log in.</p>
              </div>
              <div className="p-6">
                <div className="relative">
                  <select
                    value={settings.defaultDashboard}
                    onChange={(e) => handleSelectChange('defaultDashboard', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                  >
                    <option>Home Dashboard</option>
                    <option>Sales Performance</option>
                    <option>User Acquisition</option>
                    <option>Inventory Status</option>
                    <option>Quarterly Goals</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Display Settings</h2>
                <p className="text-sm text-slate-400 mt-1">Customize how dashboards are displayed.</p>
              </div>
              <div className="p-6 space-y-4">
                {/* Auto-Refresh */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <iconify-icon icon="solar:refresh-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Auto-Refresh</p>
                      <p className="text-xs text-slate-400 mt-0.5">Automatically refresh dashboard data</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('autoRefresh')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      settings.autoRefresh ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.autoRefresh ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Refresh Interval */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <iconify-icon icon="solar:clock-circle-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Refresh Interval</p>
                      <p className="text-xs text-slate-400 mt-0.5">How often to refresh data</p>
                    </div>
                  </div>
                  <div className="relative w-32">
                    <select
                      value={settings.refreshInterval}
                      onChange={(e) => handleSelectChange('refreshInterval', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                    >
                      <option>30 seconds</option>
                      <option>1 minute</option>
                      <option>5 minutes</option>
                      <option>15 minutes</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <iconify-icon icon="solar:alt-arrow-down-linear" width="14"></iconify-icon>
                    </div>
                  </div>
                </div>

                {/* Animations */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <iconify-icon icon="solar:bolt-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Animations</p>
                      <p className="text-xs text-slate-400 mt-0.5">Enable chart animations and transitions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('animations')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      settings.animations ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.animations ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Compact Mode */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <iconify-icon icon="solar:maximize-square-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Compact Mode</p>
                      <p className="text-xs text-slate-400 mt-0.5">Show more widgets in less space</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('compactMode')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      settings.compactMode ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        settings.compactMode ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Chart Theme */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Chart Color Theme</h2>
                <p className="text-sm text-slate-400 mt-1">Choose a color palette for your charts.</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {chartThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectChange('chartTheme', theme.id)}
                      className={`p-4 rounded-lg text-center group transition-colors ${
                        settings.chartTheme === theme.id
                          ? 'bg-indigo-500/10 border border-indigo-500/30'
                          : 'bg-slate-900/50 border border-slate-700/50 hover:border-indigo-500/30'
                      }`}
                    >
                      <div className="flex justify-center gap-1 mb-3">
                        {theme.colors.map((color, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full ${color}`} />
                        ))}
                      </div>
                      <p
                        className={`text-xs font-medium ${
                          settings.chartTheme === theme.id ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                        }`}
                      >
                        {theme.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Display */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Data Display</h2>
                <p className="text-sm text-slate-400 mt-1">Configure how data values are displayed.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Number Format */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Number Format</label>
                    <div className="relative">
                      <select
                        value={settings.numberFormat}
                        onChange={(e) => handleSelectChange('numberFormat', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                      >
                        <option>1,234.56 (US)</option>
                        <option>1.234,56 (EU)</option>
                        <option>1 234,56 (SI)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                      </div>
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Currency</label>
                    <div className="relative">
                      <select
                        value={settings.currency}
                        onChange={(e) => handleSelectChange('currency', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                      >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                      </div>
                    </div>
                  </div>

                  {/* Date Format */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Date Format</label>
                    <div className="relative">
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSelectChange('dateFormat', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                      </div>
                    </div>
                  </div>

                  {/* Time Format */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Time Format</label>
                    <div className="relative">
                      <select
                        value={settings.timeFormat}
                        onChange={(e) => handleSelectChange('timeFormat', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 outline-none"
                      >
                        <option>12-hour (AM/PM)</option>
                        <option>24-hour</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                  <iconify-icon icon="solar:disk-linear" width="18"></iconify-icon>
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
