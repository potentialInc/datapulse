import { PageHeader } from '~/components/layout/PageHeader';
import { UserAvatar } from '~/components/ui/UserAvatar';

interface WorkflowRequest {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  submittedBy: {
    name: string;
    role: string;
    colorScheme: 'indigo' | 'emerald' | 'purple' | 'rose';
  };
  timestamp: string;
  details?: {
    [key: string]: string;
  };
}

const workflowRequests: WorkflowRequest[] = [
  {
    id: '1',
    priority: 'high',
    title: 'Database Access Request',
    description: 'Request for production database read access for analytics team',
    submittedBy: {
      name: 'Sarah Analyst',
      role: 'Data Analyst',
      colorScheme: 'indigo',
    },
    timestamp: '15 minutes ago',
    details: {
      Database: 'analytics_db',
      'Access Level': 'Read Only',
      Duration: '90 days',
      Justification: 'Q1 revenue analysis project',
    },
  },
  {
    id: '2',
    priority: 'medium',
    title: 'Budget Increase Request',
    description: 'Requesting additional $5,000 for Q1 marketing campaign',
    submittedBy: {
      name: 'Mike Johnson',
      role: 'Marketing Manager',
      colorScheme: 'emerald',
    },
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    priority: 'medium',
    title: 'New Integration Request',
    description: 'Request to enable Slack integration for alert notifications',
    submittedBy: {
      name: 'Emma Rodriguez',
      role: 'Support Lead',
      colorScheme: 'purple',
    },
    timestamp: '2 hours ago',
  },
  {
    id: '4',
    priority: 'low',
    title: 'Dashboard Sharing Request',
    description: 'Request to share Sales Performance dashboard with external stakeholders',
    submittedBy: {
      name: 'John Doe',
      role: 'Sales Manager',
      colorScheme: 'indigo',
    },
    timestamp: '4 hours ago',
  },
  {
    id: '5',
    priority: 'low',
    title: 'Report Schedule Change',
    description: 'Request to change weekly report delivery from Monday to Friday',
    submittedBy: {
      name: 'Lisa Wang',
      role: 'Finance Analyst',
      colorScheme: 'rose',
    },
    timestamp: '6 hours ago',
  },
];

const priorityConfig = {
  high: {
    label: 'High Priority',
    borderColor: 'border-rose-500',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  },
  medium: {
    label: 'Medium Priority',
    borderColor: 'border-amber-500',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  low: {
    label: 'Low Priority',
    borderColor: 'border-slate-500',
    badgeColor: 'text-slate-400 bg-slate-700/50 border-slate-600',
  },
};

export default function Workflows() {
  return (
    <div className="min-h-screen bg-slate-900">
      <PageHeader
        title="Workflows"
        breadcrumbs={[{ label: 'Workflows' }]}
        description="Approve or reject pending requests"
      />

      <div className="p-8">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Pending Approvals
            <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            History
          </button>
        </div>

        {/* Pending Approvals List */}
        <div className="space-y-4">
          {workflowRequests.map((request) => {
            const priorityStyle = priorityConfig[request.priority];
            return (
              <div
                key={request.id}
                className={`bg-slate-800 border-l-4 ${priorityStyle.borderColor} rounded-xl p-5`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full border ${priorityStyle.badgeColor}`}
                      >
                        {priorityStyle.label}
                      </span>
                      <span className="text-xs text-slate-500">Submitted {request.timestamp}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white">{request.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{request.description}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <UserAvatar
                        name={request.submittedBy.name}
                        size="sm"
                        colorScheme={request.submittedBy.colorScheme}
                      />
                      <div>
                        <p className="text-sm text-white">{request.submittedBy.name}</p>
                        <p className="text-xs text-slate-500">{request.submittedBy.role}</p>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {request.details && (
                      <div className="mt-4 p-4 bg-slate-700/30 rounded-lg border border-slate-700/50">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Request Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(request.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-slate-400">{key}:</span>
                              <span className="text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all text-sm font-medium min-w-[100px]">
                      <iconify-icon icon="solar:check-circle-linear" width="16"></iconify-icon>
                      Approve
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all text-sm font-medium">
                      <iconify-icon icon="solar:close-circle-linear" width="16"></iconify-icon>
                      Reject
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all text-sm">
                      <iconify-icon icon="solar:chat-round-linear" width="16"></iconify-icon>
                      Request Info
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
