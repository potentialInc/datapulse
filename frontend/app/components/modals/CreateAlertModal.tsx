import { useState } from 'react';
import { Modal } from '~/components/ui';

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AlertFormData) => void;
}

export interface AlertFormData {
  name: string;
  metric: string;
  condition: 'above' | 'below' | 'change';
  threshold: string;
  frequency: string;
  severity: 'info' | 'warning' | 'critical';
  channels: {
    email: boolean;
    emailAddress?: string;
    slack: boolean;
    slackChannel?: string;
    sms: boolean;
  };
}

const metrics = [
  { value: 'revenue', label: 'Total Revenue', currentValue: '$2.4M' },
  { value: 'users', label: 'Active Users', currentValue: '48,234' },
  { value: 'conversion', label: 'Conversion Rate', currentValue: '3.2%' },
  { value: 'response_time', label: 'API Response Time', currentValue: '145ms' },
  { value: 'error_rate', label: 'Error Rate', currentValue: '0.8%' },
  { value: 'sla', label: 'SLA Compliance', currentValue: '99.2%' },
];

export function CreateAlertModal({ isOpen, onClose, onSubmit }: CreateAlertModalProps) {
  const [formData, setFormData] = useState<AlertFormData>({
    name: '',
    metric: '',
    condition: 'above',
    threshold: '',
    frequency: 'Every 5 minutes',
    severity: 'warning',
    channels: {
      email: true,
      emailAddress: 'team@company.com',
      slack: false,
      slackChannel: '#alerts',
      sms: false,
    },
  });

  const selectedMetric = metrics.find((m) => m.value === formData.metric);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  const footer = (
    <>
      <button onClick={onClose} className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition">
        Cancel
      </button>
      <div className="flex gap-3">
        <button className="px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition flex items-center gap-2">
          <iconify-icon icon="solar:test-tube-linear" width="16"></iconify-icon>
          Test Alert
        </button>
        <button onClick={handleSubmit} className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition">
          Create Alert
        </button>
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Alert" footer={footer} size="lg">
      <div className="space-y-5">
        {/* Alert Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Alert Name</label>
          <input
            type="text"
            placeholder="e.g., High Revenue Alert"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Metric Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Select Metric</label>
          <select
            value={formData.metric}
            onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none cursor-pointer"
          >
            <option value="">Choose a metric to monitor...</option>
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>

        {/* Current Value Preview */}
        {selectedMetric && (
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Current Value</span>
              <span className="text-lg font-semibold text-white">{selectedMetric.currentValue}</span>
            </div>
            <div className="mt-2 h-12 flex items-end gap-1">
              <div className="flex-1 bg-indigo-500/30 rounded-sm" style={{ height: '40%' }} />
              <div className="flex-1 bg-indigo-500/30 rounded-sm" style={{ height: '60%' }} />
              <div className="flex-1 bg-indigo-500/30 rounded-sm" style={{ height: '45%' }} />
              <div className="flex-1 bg-indigo-500/30 rounded-sm" style={{ height: '80%' }} />
              <div className="flex-1 bg-indigo-500/30 rounded-sm" style={{ height: '65%' }} />
              <div className="flex-1 bg-indigo-500 rounded-sm" style={{ height: '75%' }} />
            </div>
          </div>
        )}

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Alert Condition</label>
          <div className="grid grid-cols-3 gap-3">
            {(['above', 'below', 'change'] as const).map((condition) => (
              <label key={condition} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value={condition}
                  checked={formData.condition === condition}
                  onChange={() => setFormData({ ...formData, condition })}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-center peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 transition">
                  <iconify-icon
                    icon={
                      condition === 'above'
                        ? 'solar:arrow-up-linear'
                        : condition === 'below'
                        ? 'solar:arrow-down-linear'
                        : 'solar:transfer-vertical-linear'
                    }
                    width="20"
                    className={
                      condition === 'above'
                        ? 'text-emerald-400'
                        : condition === 'below'
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    }
                  ></iconify-icon>
                  <p className="text-sm font-medium text-white mt-1">
                    {condition === 'above' ? 'Above' : condition === 'below' ? 'Below' : 'Change %'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Threshold Value */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Threshold Value</label>
            <input
              type="number"
              placeholder="e.g., 100000"
              value={formData.threshold}
              onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Check Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm appearance-none cursor-pointer"
            >
              <option>Every 5 minutes</option>
              <option>Every 15 minutes</option>
              <option>Every hour</option>
              <option>Every day</option>
            </select>
          </div>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Alert Severity</label>
          <div className="grid grid-cols-3 gap-3">
            {(['info', 'warning', 'critical'] as const).map((severity) => (
              <label key={severity} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="severity"
                  value={severity}
                  checked={formData.severity === severity}
                  onChange={() => setFormData({ ...formData, severity })}
                  className="peer sr-only"
                />
                <div
                  className={`p-3 rounded-lg bg-slate-900 border border-slate-700 text-center peer-checked:border-${
                    severity === 'info' ? 'blue' : severity === 'warning' ? 'amber' : 'rose'
                  }-500 peer-checked:bg-${severity === 'info' ? 'blue' : severity === 'warning' ? 'amber' : 'rose'}-500/10 transition`}
                >
                  <iconify-icon
                    icon={
                      severity === 'info'
                        ? 'solar:info-circle-linear'
                        : severity === 'warning'
                        ? 'solar:danger-triangle-linear'
                        : 'solar:danger-circle-linear'
                    }
                    width="20"
                    className={`text-${severity === 'info' ? 'blue' : severity === 'warning' ? 'amber' : 'rose'}-400 mb-1`}
                  ></iconify-icon>
                  <p className="text-sm font-medium text-white">{severity === 'info' ? 'Info' : severity === 'warning' ? 'Warning' : 'Critical'}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Notification Channels</label>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.channels.email}
                  onChange={(e) => setFormData({ ...formData, channels: { ...formData.channels, email: e.target.checked } })}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
                />
                <iconify-icon icon="solar:letter-linear" width="20" className="text-slate-400"></iconify-icon>
                <span className="text-sm text-slate-300">Email</span>
              </div>
              <input
                type="email"
                value={formData.channels.emailAddress}
                onChange={(e) => setFormData({ ...formData, channels: { ...formData.channels, emailAddress: e.target.value } })}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs w-48 focus:outline-none focus:border-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.channels.slack}
                  onChange={(e) => setFormData({ ...formData, channels: { ...formData.channels, slack: e.target.checked } })}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
                />
                <iconify-icon icon="simple-icons:slack" width="20" className="text-slate-400"></iconify-icon>
                <span className="text-sm text-slate-300">Slack</span>
              </div>
              <select
                value={formData.channels.slackChannel}
                onChange={(e) => setFormData({ ...formData, channels: { ...formData.channels, slackChannel: e.target.value } })}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs w-48 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
              >
                <option>#alerts</option>
                <option>#general</option>
                <option>#engineering</option>
              </select>
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.channels.sms}
                  onChange={(e) => setFormData({ ...formData, channels: { ...formData.channels, sms: e.target.checked } })}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-800"
                />
                <iconify-icon icon="solar:smartphone-linear" width="20" className="text-slate-400"></iconify-icon>
                <span className="text-sm text-slate-300">SMS</span>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Critical only</span>
              </div>
            </label>
          </div>
        </div>

        {/* Alert Preview */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <iconify-icon icon="solar:bell-linear" width="20" className="text-amber-400 mt-0.5"></iconify-icon>
            <div>
              <p className="text-sm font-medium text-amber-400">Alert Preview</p>
              <p className="text-xs text-slate-400 mt-1">
                "{formData.name || 'Alert'}" will trigger when {selectedMetric?.label || 'metric'}{' '}
                {formData.condition === 'above' ? 'exceeds' : formData.condition === 'below' ? 'falls below' : 'changes by'}{' '}
                {formData.threshold || '...'}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
