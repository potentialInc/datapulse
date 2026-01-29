import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router';
import { Breadcrumb } from '~/components/ui';

export default function CreateUser() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'business',
    department: '',
    sendWelcome: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/users');
  };

  const steps = [
    { number: 1, title: 'Basic Info', subtitle: 'Name and email' },
    { number: 2, title: 'Role & Access', subtitle: 'Permissions' },
    { number: 3, title: 'Review', subtitle: 'Confirm details' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'Users', to: '/users' },
              { label: 'Create New User', to: '/users/create' },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">Create New User</h1>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s.number ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {s.number}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${step >= s.number ? 'text-white' : 'text-slate-400'}`}>{s.title}</p>
                    <p className={`text-xs ${step >= s.number ? 'text-slate-400' : 'text-slate-500'}`}>{s.subtitle}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${step > s.number ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
              {step === 1 && (
                <>
                  <h2 className="text-lg font-semibold text-white mb-6">Basic Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          First Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Last Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        placeholder="john.doe@company.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Department <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                        required
                      >
                        <option value="">Select department</option>
                        <option value="engineering">Engineering</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="operations">Operations</option>
                        <option value="analytics">Analytics</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-lg font-semibold text-white mb-6">Role & Access</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">Select Role</label>
                      <div className="space-y-3">
                        {[
                          { value: 'business', label: 'Business User', description: 'View and create dashboards' },
                          { value: 'analyst', label: 'Data Analyst', description: 'Full access to analytics tools' },
                          { value: 'ops', label: 'Operations Manager', description: 'Monitor operations and metrics' },
                          { value: 'admin', label: 'Administrator', description: 'Full system access' },
                        ].map((role) => (
                          <label
                            key={role.value}
                            className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.role === role.value ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-slate-600'}`}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role.value}
                              checked={formData.role === role.value}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              className="text-indigo-500 focus:ring-indigo-500/20"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{role.label}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{role.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-lg font-semibold text-white mb-6">Review & Confirm</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Name</p>
                      <p className="text-white font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Email</p>
                      <p className="text-white font-medium">{formData.email}</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Department</p>
                      <p className="text-white font-medium capitalize">{formData.department}</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Role</p>
                      <p className="text-white font-medium capitalize">{formData.role}</p>
                    </div>

                    <label className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sendWelcome}
                        onChange={(e) => setFormData({ ...formData, sendWelcome: e.target.checked })}
                        className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">Send welcome email</p>
                        <p className="text-xs text-slate-400">User will receive login credentials via email</p>
                      </div>
                    </label>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={() => step > 1 ? setStep(step - 1) : navigate('/users')}
                  className="px-4 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
                >
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                  type={step === 3 ? 'submit' : 'button'}
                  onClick={() => step < 3 && setStep(step + 1)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium"
                >
                  {step === 3 ? 'Create User' : 'Continue'}
                  <Icon icon="solar:alt-arrow-right-linear" width={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
