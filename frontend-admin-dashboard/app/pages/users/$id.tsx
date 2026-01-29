import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router';
import { Breadcrumb, DashboardCard, ActivityItem, StatusBadge, UserAvatar } from '~/components/ui';

export default function UserDetails() {
  const { id } = useParams();

  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Business User',
    department: 'Sales',
    status: 'Active',
    joined: 'Jan 15, 2024',
    lastLogin: '2 hours ago',
    dashboards: 12,
    queries: 847,
  };

  const recentActivity = [
    { id: '1', icon: 'solar:login-2-linear', iconColor: 'text-emerald-400', title: 'Logged in', subtitle: 'IP: 192.168.1.105', time: '2 hours ago' },
    { id: '2', icon: 'solar:widget-linear', iconColor: 'text-indigo-400', title: 'Created dashboard', subtitle: 'Q1 Revenue Analysis', time: '5 hours ago' },
    { id: '3', icon: 'solar:code-square-linear', iconColor: 'text-blue-400', title: 'Ran query', subtitle: 'Sales by Region', time: '6 hours ago' },
    { id: '4', icon: 'solar:chart-linear', iconColor: 'text-purple-400', title: 'Viewed dashboard', subtitle: 'Monthly Performance', time: '1 day ago' },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
        <div>
          <Breadcrumb
            items={[
              { label: 'Users', to: '/users' },
              { label: user.name, to: `/users/${id}` },
            ]}
          />
          <h1 className="text-2xl font-semibold text-white mt-2">User Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all">
            <Icon icon="solar:pen-linear" width={18} />
            Edit User
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm font-medium border border-rose-500/20 transition-all">
            <Icon icon="solar:trash-bin-minimalistic-linear" width={18} />
            Delete
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="col-span-1 space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
              <div className="flex flex-col items-center text-center">
                <UserAvatar name={user.name} size="xl" className="mb-4" />
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <p className="text-sm text-slate-400 mt-1">{user.email}</p>
                <span className="mt-3 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                  {user.role}
                </span>
                <StatusBadge status={user.status.toLowerCase() as 'active'} className="mt-2" />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Department</span>
                  <span className="text-sm text-white">{user.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Joined</span>
                  <span className="text-sm text-white">{user.joined}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Last Login</span>
                  <span className="text-sm text-white">{user.lastLogin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Dashboards</span>
                  <span className="text-sm text-white">{user.dashboards}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Queries Run</span>
                  <span className="text-sm text-white">{user.queries}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="solar:widget-linear" width={20} className="text-indigo-400" />
                  <span className="text-2xl font-bold text-white">{user.dashboards}</span>
                </div>
                <p className="text-sm text-slate-400">Dashboards Created</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Icon icon="solar:code-square-linear" width={20} className="text-blue-400" />
                  <span className="text-2xl font-bold text-white">{user.queries}</span>
                </div>
                <p className="text-sm text-slate-400">Queries Executed</p>
              </div>
            </div>

            {/* Recent Activity */}
            <DashboardCard title="Recent Activity">
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </DashboardCard>

            {/* Permissions */}
            <DashboardCard title="Permissions">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:eye-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">View Dashboards</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:pen-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Create Dashboards</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:share-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Share with Team</span>
                  </div>
                  <Icon icon="solar:check-circle-bold" width={20} className="text-emerald-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="solar:settings-linear" width={18} className="text-slate-400" />
                    <span className="text-sm text-white">Admin Access</span>
                  </div>
                  <Icon icon="solar:close-circle-bold" width={20} className="text-slate-500" />
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </main>
  );
}
