import { useState } from 'react';
import { Link } from 'react-router';
import { SearchInput } from '~/components/ui';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const settingsTabs: SettingsTab[] = [
  { id: 'profile', label: 'Profile', icon: 'solar:user-circle-linear', path: '/settings' },
  { id: 'security', label: 'Security', icon: 'solar:shield-keyhole-linear', path: '/settings/security' },
  { id: 'notifications', label: 'Notifications', icon: 'solar:bell-linear', path: '/settings/notifications' },
  { id: 'dashboard-prefs', label: 'Dashboard Preferences', icon: 'solar:widget-linear', path: '/settings/dashboard-preferences' },
];

export default function UserSettings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@datapulse.com',
    department: 'Analytics',
    phone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                    tab.id === 'profile'
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

          {/* Content Area: Profile */}
          <div className="lg:col-span-9 space-y-6">
            {/* Profile Card */}
                <div className="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-6 py-5 border-b border-slate-700/50">
                    <h2 className="text-base font-semibold text-white">Public Profile</h2>
                    <p className="text-sm text-slate-400 mt-1">
                      This information will be displayed on your public profile.
                    </p>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-slate-900 shadow-xl shadow-indigo-500/20">
                        JD
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-3">
                          <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium rounded-lg border border-slate-600 transition-colors">
                            Upload Photo
                          </button>
                          <button className="px-3 py-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 text-xs font-medium rounded-lg transition-colors">
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 2MB.</p>
                      </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            readOnly
                            className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-800 border border-slate-700/50 text-slate-400 shadow-sm cursor-not-allowed"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <iconify-icon icon="solar:check-circle-linear" width="12"></iconify-icon>
                            Verified
                          </div>
                        </div>
                      </div>

                      {/* Department */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Department</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.department}
                            readOnly
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-slate-800 border border-slate-700/50 text-slate-400 shadow-sm cursor-not-allowed"
                          />
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 flex items-center">
                            <iconify-icon icon="solar:users-group-rounded-linear" width="16"></iconify-icon>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                        />
                      </div>

                      {/* Timezone */}
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">Timezone</label>
                        <div className="relative">
                          <select
                            value={formData.timezone}
                            onChange={(e) => handleInputChange('timezone', e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg text-sm bg-slate-900 border border-slate-700 text-slate-50 shadow-sm appearance-none cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                          >
                            <option value="America/Los_Angeles">Pacific Time (US & Canada) (GMT-08:00)</option>
                            <option value="America/New_York">America/New_York (EST) (GMT-05:00)</option>
                            <option value="Europe/London">London (GMT+00:00)</option>
                            <option value="Asia/Tokyo">Tokyo (GMT+09:00)</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center">
                            <iconify-icon icon="solar:alt-arrow-down-linear" width="16"></iconify-icon>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Your dashboards and reports will align with this timezone.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                      <iconify-icon icon="solar:disk-linear" width="18"></iconify-icon>
                      Save Changes
                    </button>
                  </div>
                </div>

            {/* Additional Context */}
            <div className="p-4 rounded-lg bg-slate-800/50 border border-dashed border-slate-700 text-center">
              <p className="text-xs text-slate-500">
                Looking for API Keys? Check the{' '}
                <Link to="/settings/security" className="text-indigo-400 hover:text-indigo-300">
                  Security
                </Link>{' '}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
