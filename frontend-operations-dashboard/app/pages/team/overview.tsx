import { Link } from 'react-router';
import { PageHeader } from '~/components/layout/PageHeader';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'busy' | 'away';
  active: number;
  resolved: number;
  score: number;
  colorScheme: 'indigo' | 'emerald' | 'amber' | 'purple' | 'rose';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Kim',
    role: 'Senior Support Agent',
    status: 'available',
    active: 8,
    resolved: 42,
    score: 98,
    colorScheme: 'indigo',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Support Agent',
    status: 'available',
    active: 5,
    resolved: 38,
    score: 95,
    colorScheme: 'emerald',
  },
  {
    id: '3',
    name: 'Mike Chen',
    role: 'Support Agent',
    status: 'busy',
    active: 12,
    resolved: 35,
    score: 92,
    colorScheme: 'amber',
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    role: 'Support Agent',
    status: 'available',
    active: 4,
    resolved: 31,
    score: 96,
    colorScheme: 'purple',
  },
  {
    id: '5',
    name: 'James Davis',
    role: 'Support Agent',
    status: 'away',
    active: 0,
    resolved: 28,
    score: 91,
    colorScheme: 'indigo',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    role: 'Senior Support Agent',
    status: 'busy',
    active: 10,
    resolved: 45,
    score: 97,
    colorScheme: 'rose',
  },
  {
    id: '7',
    name: 'Ryan Patel',
    role: 'Support Agent',
    status: 'available',
    active: 3,
    resolved: 22,
    score: 89,
    colorScheme: 'indigo',
  },
  {
    id: '8',
    name: 'Nina Okonkwo',
    role: 'Support Agent',
    status: 'available',
    active: 6,
    resolved: 33,
    score: 94,
    colorScheme: 'purple',
  },
];

const statusConfig = {
  available: {
    label: 'Available',
    dotColor: 'bg-emerald-500',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  busy: {
    label: 'Busy',
    dotColor: 'bg-amber-500',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  away: {
    label: 'Away',
    dotColor: 'bg-slate-500',
    badgeColor: 'text-slate-400 bg-slate-700/50 border-slate-600',
  },
};

export default function TeamOverview() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PageHeader
        title="Team Overview"
        breadcrumbs={[{ label: 'Team' }]}
        description="Manage and monitor team members"
        actions={
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <iconify-icon icon="solar:magnifer-linear" className="text-slate-500 group-focus-within:text-indigo-400 transition-colors"></iconify-icon>
              </div>
              <input
                type="text"
                className="bg-slate-800/50 border border-slate-700 text-sm rounded-lg block w-64 pl-10 p-2.5 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                placeholder="Search team members..."
              />
            </div>
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
              <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                All
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-white transition-colors">
                Available
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-white transition-colors">
                Busy
              </button>
              <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-white transition-colors">
                Away
              </button>
            </div>
          </div>
        }
      />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers.map((member) => {
            const statusStyle = statusConfig[member.status];
            return (
              <Link
                key={member.id}
                to={`/team/${member.id}`}
                className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <UserAvatar name={member.name} size="lg" colorScheme={member.colorScheme} />
                    <span
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-800 ${statusStyle.dotColor}`}
                    ></span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${statusStyle.badgeColor}`}
                  >
                    {statusStyle.label}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-indigo-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">{member.role}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{member.active}</p>
                    <p className="text-xs text-slate-500">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-emerald-400">{member.resolved}</p>
                    <p className="text-xs text-slate-500">Resolved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{member.score}%</p>
                    <p className="text-xs text-slate-500">Score</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
