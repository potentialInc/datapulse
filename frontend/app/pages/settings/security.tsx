import { useState } from 'react';
import { Link } from 'react-router';
import { SearchInput } from '~/components/ui';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: 'solar:user-circle-linear', path: '/settings' },
  { id: 'security', label: 'Security', icon: 'solar:shield-keyhole-linear', path: '/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: 'solar:bell-linear', path: '/settings/notifications' },
  { id: 'dashboard-prefs', label: 'Dashboard Preferences', icon: 'solar:widget-linear', path: '/settings/dashboard-preferences' },
];

const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'dp_live_****************************3f8k',
    created: 'Jan 15, 2024',
    icon: 'solar:key-linear',
    iconColor: 'indigo',
  },
  {
    id: 2,
    name: 'Development API Key',
    key: 'dp_test_****************************9h2m',
    created: 'Dec 20, 2023',
    icon: 'solar:key-linear',
    iconColor: 'amber',
  },
];

export default function Security() {
  const [searchQuery, setSearchQuery] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
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
                    tab.id === 'security'
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

          {/* Content Area: Security */}
          <div className="lg:col-span-9 space-y-6">
            {/* Password Section */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Password</h2>
                <p className="text-sm text-slate-400 mt-1">Update your password to keep your account secure.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Current Password</label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div></div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <iconify-icon icon="solar:info-circle-linear" width="18" className="text-slate-400 mt-0.5"></iconify-icon>
                  <div className="text-xs text-slate-400">
                    <p className="font-medium text-slate-300 mb-1">Password requirements:</p>
                    <ul className="space-y-0.5">
                      <li>• Minimum 8 characters</li>
                      <li>• At least one uppercase letter</li>
                      <li>• At least one number</li>
                      <li>• At least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Two-Factor Authentication</h2>
                <p className="text-sm text-slate-400 mt-1">Add an extra layer of security to your account.</p>
              </div>
              <div className="p-6 space-y-3">
                {/* Authenticator App */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <iconify-icon icon="solar:shield-check-linear" width="24"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Authenticator App</p>
                      <p className="text-xs text-slate-400 mt-0.5">Use an authenticator app to generate codes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Enabled
                    </span>
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      Configure
                    </button>
                  </div>
                </div>

                {/* SMS Verification */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-400">
                      <iconify-icon icon="solar:smartphone-linear" width="24"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">SMS Verification</p>
                      <p className="text-xs text-slate-400 mt-0.5">Receive codes via text message</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400 border border-slate-600/50">
                      Disabled
                    </span>
                    <button className="px-3 py-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">API Keys</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage your API keys for external integrations.</p>
                </div>
                <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:add-circle-linear" width="16"></iconify-icon>
                  Generate New Key
                </button>
              </div>
              <div className="p-6 space-y-3">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 group">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-${apiKey.iconColor}-500/10 flex items-center justify-center text-${apiKey.iconColor}-400`}
                      >
                        <iconify-icon icon={apiKey.icon} width="20"></iconify-icon>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{apiKey.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="text-xs text-slate-500 font-mono">{apiKey.key}</code>
                          <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                            <iconify-icon icon="solar:copy-linear" width="14"></iconify-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">Created {apiKey.created}</span>
                      <button className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                        <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">Active Sessions</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage devices where you're currently logged in.</p>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors">
                  Sign Out All Devices
                </button>
              </div>
              <div className="p-6 space-y-3">
                {/* Current Session */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <iconify-icon icon="solar:monitor-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">MacBook Pro - Chrome</p>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Current
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">New York, USA • Last active now</p>
                    </div>
                  </div>
                </div>

                {/* Other Session */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-400">
                      <iconify-icon icon="solar:smartphone-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">iPhone 15 Pro - Safari</p>
                      <p className="text-xs text-slate-400 mt-0.5">New York, USA • Last active 2 hours ago</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
