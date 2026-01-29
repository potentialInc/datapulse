import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import { Breadcrumb } from '~/components/ui';

export default function CreateApiKey() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      readData: true,
      executeQueries: true,
      createDashboards: false,
      adminAccess: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/api-keys');
  };

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'API Keys', to: '/api-keys' },
              { label: 'Generate API Key', to: '/api-keys/create' },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">Generate New API Key</h1>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Key Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                  placeholder="Production API"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                  placeholder="Describe what this API key will be used for..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-4">
                  Permissions
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.readData}
                      onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, readData: e.target.checked } })}
                      className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Read Data Sources</p>
                      <p className="text-xs text-slate-400">Access to view data source connections</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.executeQueries}
                      onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, executeQueries: e.target.checked } })}
                      className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Execute Queries</p>
                      <p className="text-xs text-slate-400">Run queries against data sources</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.createDashboards}
                      onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, createDashboards: e.target.checked } })}
                      className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Create Dashboards</p>
                      <p className="text-xs text-slate-400">Create and modify dashboards</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.adminAccess}
                      onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, adminAccess: e.target.checked } })}
                      className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Admin Access</p>
                      <p className="text-xs text-slate-400">Full system access (use with caution)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => navigate('/api-keys')}
                  className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium"
                >
                  <Icon icon="solar:key-linear" width={18} />
                  Generate API Key
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
