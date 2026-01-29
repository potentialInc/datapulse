import { useState } from 'react';
import { Modal } from '~/components/ui';

interface ScheduleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ReportFormData) => void;
}

export interface ReportFormData {
  name: string;
  dashboard: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  deliveryTime: string;
  timezone: string;
  daysOfWeek: string[];
  recipients: string[];
  format: 'pdf' | 'excel';
  includeDataTables: boolean;
  sendPreview: boolean;
}

const dashboards = [
  'Sales Overview Dashboard',
  'Marketing Performance',
  'Operations Metrics',
  'Financial Summary',
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function ScheduleReportModal({ isOpen, onClose, onSubmit }: ScheduleReportModalProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    name: '',
    dashboard: '',
    frequency: 'daily',
    deliveryTime: '09:00',
    timezone: 'UTC',
    daysOfWeek: ['Mon', 'Fri'],
    recipients: ['john.doe@company.com', 'sarah.chen@company.com'],
    format: 'pdf',
    includeDataTables: true,
    sendPreview: false,
  });

  const [newRecipient, setNewRecipient] = useState('');

  const addRecipient = () => {
    if (newRecipient && newRecipient.includes('@')) {
      setFormData({ ...formData, recipients: [...formData.recipients, newRecipient] });
      setNewRecipient('');
    }
  };

  const removeRecipient = (email: string) => {
    setFormData({ ...formData, recipients: formData.recipients.filter((r) => r !== email) });
  };

  const toggleDay = (day: string) => {
    setFormData({
      ...formData,
      daysOfWeek: formData.daysOfWeek.includes(day)
        ? formData.daysOfWeek.filter((d) => d !== day)
        : [...formData.daysOfWeek, day],
    });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  const footer = (
    <>
      <button onClick={onClose} className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition">
        Cancel
      </button>
      <div className="flex gap-3">
        <button className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition flex items-center gap-2">
          <iconify-icon icon="solar:eye-linear" width="16"></iconify-icon>
          Preview
        </button>
        <button onClick={handleSubmit} className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition">
          Schedule Report
        </button>
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Report" footer={footer} size="lg">
      <div className="space-y-5">
        {/* Report Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Report Name</label>
          <input
            type="text"
            placeholder="e.g., Weekly Sales Summary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Dashboard Source */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Dashboard Source</label>
          <select
            value={formData.dashboard}
            onChange={(e) => setFormData({ ...formData, dashboard: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none cursor-pointer"
          >
            <option value="">Select a dashboard...</option>
            {dashboards.map((dashboard) => (
              <option key={dashboard} value={dashboard}>
                {dashboard}
              </option>
            ))}
          </select>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Delivery Frequency</label>
          <div className="grid grid-cols-3 gap-3">
            {(['daily', 'weekly', 'monthly'] as const).map((frequency) => (
              <label key={frequency} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  value={frequency}
                  checked={formData.frequency === frequency}
                  onChange={() => setFormData({ ...formData, frequency })}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-center peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition">
                  <iconify-icon
                    icon={
                      frequency === 'daily'
                        ? 'solar:calendar-linear'
                        : frequency === 'weekly'
                        ? 'solar:calendar-mark-linear'
                        : 'solar:calendar-minimalistic-linear'
                    }
                    width="20"
                    className="text-slate-400 mb-1"
                  ></iconify-icon>
                  <p className="text-sm font-medium text-white">{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Delivery Time</label>
            <input
              type="time"
              value={formData.deliveryTime}
              onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none cursor-pointer"
            >
              <option>UTC</option>
              <option>EST (UTC-5)</option>
              <option>PST (UTC-8)</option>
              <option>GMT (UTC+0)</option>
            </select>
          </div>
        </div>

        {/* Weekly Options */}
        {formData.frequency === 'weekly' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Days of Week</label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.daysOfWeek.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="peer sr-only"
                  />
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-400 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 peer-checked:text-indigo-400 transition block">
                    {day}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Recipients */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Recipients</label>
          <div className="flex gap-2 mb-3">
            <input
              type="email"
              placeholder="Enter email address"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRecipient()}
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
            <button
              onClick={addRecipient}
              className="px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {formData.recipients.map((email, index) => (
              <div key={index} className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-${index % 2 === 0 ? 'indigo' : 'emerald'}-500/20 flex items-center justify-center`}>
                    <span className={`text-xs font-medium text-${index % 2 === 0 ? 'indigo' : 'emerald'}-400`}>{getInitials(email)}</span>
                  </div>
                  <span className="text-sm text-slate-300">{email}</span>
                </div>
                <button onClick={() => removeRecipient(email)} className="text-slate-500 hover:text-rose-400 transition">
                  <iconify-icon icon="solar:close-circle-linear" width="16"></iconify-icon>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="format"
                value="pdf"
                checked={formData.format === 'pdf'}
                onChange={() => setFormData({ ...formData, format: 'pdf' })}
                className="peer sr-only"
              />
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition">
                <iconify-icon icon="solar:document-text-linear" width="24" className="text-rose-400"></iconify-icon>
                <div>
                  <p className="text-sm font-medium text-white">PDF</p>
                  <p className="text-xs text-slate-500">Best for printing</p>
                </div>
              </div>
            </label>
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="format"
                value="excel"
                checked={formData.format === 'excel'}
                onChange={() => setFormData({ ...formData, format: 'excel' })}
                className="peer sr-only"
              />
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition">
                <iconify-icon icon="solar:file-smile-linear" width="24" className="text-emerald-400"></iconify-icon>
                <div>
                  <p className="text-sm font-medium text-white">Excel</p>
                  <p className="text-xs text-slate-500">Best for analysis</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.includeDataTables}
              onChange={(e) => setFormData({ ...formData, includeDataTables: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
            />
            <span className="text-sm text-slate-300">Include data tables</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.sendPreview}
              onChange={(e) => setFormData({ ...formData, sendPreview: e.target.checked })}
              className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
            />
            <span className="text-sm text-slate-300">Send me a preview before delivery</span>
          </label>
        </div>
      </div>
    </Modal>
  );
}
