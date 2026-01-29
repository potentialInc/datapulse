import { useState } from 'react';
import { Link } from 'react-router';
import { SearchInput } from '~/components/ui';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: 'solar:user-circle-linear', path: '/settings' },
  { id: 'security', label: 'Security', icon: 'solar:shield-keyhole-linear', path: '/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: 'solar:bell-linear', path: '/settings/notifications' },
  { id: 'dashboard-prefs', label: 'Dashboard Preferences', icon: 'solar:widget-linear', path: '/settings/dashboard-preferences' },
];

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    warningAlerts: true,
    reportDelivery: true,
    dashboardSharing: false,
    browserNotifications: true,
    mobileNotifications: true,
    doNotDisturb: false,
  });
  const [digestFrequency, setDigestFrequency] = useState('weekly');

  const handleToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
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
                    tab.id === 'notifications'
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

          {/* Content Area: Notifications */}
          <div className="lg:col-span-9 space-y-6">
            {/* Email Notifications */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Email Notifications</h2>
                <p className="text-sm text-slate-400 mt-1">Choose what updates you receive via email.</p>
              </div>
              <div className="p-6 space-y-4">
                {/* Critical Alerts */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                      <iconify-icon icon="solar:danger-triangle-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Critical Alerts</p>
                      <p className="text-xs text-slate-400 mt-0.5">Get notified immediately for critical threshold breaches</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('criticalAlerts')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.criticalAlerts ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.criticalAlerts ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Warning Alerts */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <iconify-icon icon="solar:bell-bing-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Warning Alerts</p>
                      <p className="text-xs text-slate-400 mt-0.5">Receive emails for warning-level alerts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('warningAlerts')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.warningAlerts ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.warningAlerts ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Report Delivery */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <iconify-icon icon="solar:document-text-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Report Delivery</p>
                      <p className="text-xs text-slate-400 mt-0.5">Get notified when scheduled reports are ready</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('reportDelivery')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.reportDelivery ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.reportDelivery ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Dashboard Sharing */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <iconify-icon icon="solar:share-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Dashboard Sharing</p>
                      <p className="text-xs text-slate-400 mt-0.5">Get notified when someone shares a dashboard with you</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('dashboardSharing')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.dashboardSharing ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.dashboardSharing ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Push Notifications</h2>
                <p className="text-sm text-slate-400 mt-1">Configure in-app and browser push notifications.</p>
              </div>
              <div className="p-6 space-y-4">
                {/* Browser Notifications */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <iconify-icon icon="solar:monitor-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Browser Notifications</p>
                      <p className="text-xs text-slate-400 mt-0.5">Receive real-time notifications in your browser</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('browserNotifications')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.browserNotifications ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.browserNotifications ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Push */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <iconify-icon icon="solar:smartphone-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Mobile Push Notifications</p>
                      <p className="text-xs text-slate-400 mt-0.5">Get alerts on your mobile device</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('mobileNotifications')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.mobileNotifications ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.mobileNotifications ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Do Not Disturb */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-slate-400">
                      <iconify-icon icon="solar:moon-linear" width="20"></iconify-icon>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Do Not Disturb</p>
                      <p className="text-xs text-slate-400 mt-0.5">Pause all notifications except critical alerts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('doNotDisturb')}
                    className={`relative inline-block w-10 h-5 rounded-full transition-colors ${
                      notifications.doNotDisturb ? 'bg-indigo-500' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications.doNotDisturb ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Slack Integration */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Slack Integration</h2>
                <p className="text-sm text-slate-400 mt-1">Connect Slack to receive notifications in your workspace.</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#4A154B]/20 flex items-center justify-center">
                      <iconify-icon icon="simple-icons:slack" width="24" className="text-[#E01E5A]"></iconify-icon>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">Connected to Slack</p>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">Workspace: Acme Analytics • Channel: #datapulse-alerts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                      Configure
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Digest */}
            <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-700/50">
                <h2 className="text-base font-semibold text-white">Email Digest</h2>
                <p className="text-sm text-slate-400 mt-1">Receive a summary of activity instead of individual notifications.</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setDigestFrequency('daily')}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      digestFrequency === 'daily'
                        ? 'bg-indigo-500/10 border border-indigo-500/30'
                        : 'bg-slate-900/50 border border-slate-700/50 hover:border-indigo-500/30'
                    }`}
                  >
                    <iconify-icon
                      icon="solar:sun-linear"
                      width="24"
                      className={digestFrequency === 'daily' ? 'text-indigo-400' : 'text-slate-400'}
                    ></iconify-icon>
                    <p className={`text-sm font-medium mt-2 ${digestFrequency === 'daily' ? 'text-indigo-400' : 'text-slate-300'}`}>
                      Daily
                    </p>
                    <p className={`text-xs mt-0.5 ${digestFrequency === 'daily' ? 'text-indigo-400/70' : 'text-slate-500'}`}>
                      Every morning at 9 AM
                    </p>
                  </button>

                  <button
                    onClick={() => setDigestFrequency('weekly')}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      digestFrequency === 'weekly'
                        ? 'bg-indigo-500/10 border border-indigo-500/30'
                        : 'bg-slate-900/50 border border-slate-700/50 hover:border-indigo-500/30'
                    }`}
                  >
                    <iconify-icon
                      icon="solar:calendar-linear"
                      width="24"
                      className={digestFrequency === 'weekly' ? 'text-indigo-400' : 'text-slate-400'}
                    ></iconify-icon>
                    <p className={`text-sm font-medium mt-2 ${digestFrequency === 'weekly' ? 'text-indigo-400' : 'text-slate-300'}`}>
                      Weekly
                    </p>
                    <p className={`text-xs mt-0.5 ${digestFrequency === 'weekly' ? 'text-indigo-400/70' : 'text-slate-500'}`}>
                      Every Monday at 9 AM
                    </p>
                  </button>

                  <button
                    onClick={() => setDigestFrequency('off')}
                    className={`p-4 rounded-lg text-center transition-colors ${
                      digestFrequency === 'off'
                        ? 'bg-indigo-500/10 border border-indigo-500/30'
                        : 'bg-slate-900/50 border border-slate-700/50 hover:border-indigo-500/30'
                    }`}
                  >
                    <iconify-icon
                      icon="solar:close-circle-linear"
                      width="24"
                      className={digestFrequency === 'off' ? 'text-indigo-400' : 'text-slate-400'}
                    ></iconify-icon>
                    <p className={`text-sm font-medium mt-2 ${digestFrequency === 'off' ? 'text-indigo-400' : 'text-slate-300'}`}>
                      Off
                    </p>
                    <p className={`text-xs mt-0.5 ${digestFrequency === 'off' ? 'text-indigo-400/70' : 'text-slate-500'}`}>
                      No digest emails
                    </p>
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
