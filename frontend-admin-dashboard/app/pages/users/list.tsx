import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import { PageHeader } from '~/components/layout';
import { DataTable, StatusBadge, UserAvatar, SearchInput } from '~/components/ui';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Business User' | 'Data Analyst' | 'Ops Manager' | 'Admin';
  department: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
}

export default function UserManagement() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@company.com', role: 'Business User', department: 'Sales', status: 'Active', lastLogin: '2 hours ago' },
    { id: '2', name: 'Sarah Analyst', email: 'sarah.analyst@company.com', role: 'Data Analyst', department: 'Analytics', status: 'Active', lastLogin: '5 min ago' },
    { id: '3', name: 'Ops Manager', email: 'ops.manager@company.com', role: 'Ops Manager', department: 'Operations', status: 'Active', lastLogin: '1 hour ago' },
    { id: '4', name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Business User', department: 'Marketing', status: 'Pending', lastLogin: 'Never' },
    { id: '5', name: 'James Davis', email: 'james.davis@company.com', role: 'Business User', department: 'Engineering', status: 'Inactive', lastLogin: '30 days ago' },
  ];

  const roleColors = {
    'Business User': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Data Analyst': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    'Ops Manager': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Admin': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
      <PageHeader
        title="User Management"
        subtitle="Manage all user accounts"
        action={
          <Link to="/users/create" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
            <Icon icon="solar:user-plus-linear" width={18} />
            Create User
          </Link>
        }
      />

      {/* Tabs & Filters */}
      <div className="px-8 py-4 border-b border-slate-800 space-y-4">
        {/* Tabs */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSelectedTab('all')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedTab === 'all' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            All Users
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${selectedTab === 'all' ? 'bg-indigo-500/20' : 'text-slate-500'}`}>248</span>
          </button>
          <button onClick={() => setSelectedTab('business')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedTab === 'business' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            Business Users
            <span className="ml-2 text-xs text-slate-500">156</span>
          </button>
          <button onClick={() => setSelectedTab('analyst')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedTab === 'analyst' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            Data Analysts
            <span className="ml-2 text-xs text-slate-500">62</span>
          </button>
          <button onClick={() => setSelectedTab('ops')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${selectedTab === 'ops' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            Ops Managers
            <span className="ml-2 text-xs text-slate-500">24</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, email, department..."
            className="flex-1 max-w-md"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50 sticky top-0">
            <tr>
              <th className="w-12 px-6 py-4 text-left">
                <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20" />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={user.name} size="md" />
                    <div>
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{user.department}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status.toLowerCase() as 'active' | 'inactive' | 'pending'} />
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link to={`/users/${user.id}`} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                      <Icon icon="solar:eye-linear" width={16} />
                    </Link>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                      <Icon icon="solar:pen-linear" width={16} />
                    </button>
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-all">
                      <Icon icon="solar:trash-bin-minimalistic-linear" width={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-8 py-4 border-t border-slate-800 flex items-center justify-between">
        <p className="text-sm text-slate-400">Showing 1-5 of 248 users</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">Previous</button>
          <button className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm">1</button>
          <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">2</button>
          <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">3</button>
          <span className="text-slate-500">...</span>
          <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">50</button>
          <button className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">Next</button>
        </div>
      </div>
    </main>
  );
}
