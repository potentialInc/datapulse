import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader } from '~/components/layout';
import { DashboardCard } from '~/components/ui';

export default function BrandingSettings() {
  const [formData, setFormData] = useState({
    companyName: 'DataPulse',
    primaryColor: '#6366F1',
    accentColor: '#8B5CF6',
    logoUrl: '',
    faviconUrl: '',
    customDomain: 'app.datapulse.com',
  });

  const handleSave = () => {
    // Handle save
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      <PageHeader
        title="Branding Settings"
        subtitle="Customize your DataPulse instance"
        action={
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium"
          >
            <Icon icon="solar:diskette-linear" width={18} />
            Save Changes
          </button>
        }
      />

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Company Info */}
          <DashboardCard title="Company Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="url"
                    value={formData.faviconUrl}
                    onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Colors */}
          <DashboardCard title="Brand Colors">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Custom Domain */}
          <DashboardCard title="Custom Domain">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Domain
              </label>
              <input
                type="text"
                value={formData.customDomain}
                onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-400 mt-2">
                Configure your custom domain to match your brand
              </p>
            </div>
          </DashboardCard>

          {/* Preview */}
          <DashboardCard title="Preview">
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.companyName.charAt(0)}
                </div>
                <span className="text-lg font-semibold text-white">{formData.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  Accent Button
                </button>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
