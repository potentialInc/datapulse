import { Link } from "react-router";
// Using iconify-icon web component
import { useState } from "react";
import { StatCard } from "~/components/ui/StatCard";
import { SearchInput } from "~/components/ui/SearchInput";

interface Query {
  id: string;
  name: string;
  preview: string;
  duration: string;
  rows: number;
  color: "indigo" | "emerald" | "amber";
}

interface Dashboard {
  id: string;
  name: string;
  lastEdited: string;
  status: "active" | "inactive";
}

const mockQueries: Query[] = [
  {
    id: "1",
    name: "Monthly Revenue Analysis",
    preview: "SELECT date_trunc('month', created_at)...",
    duration: "1.2s",
    rows: 24521,
    color: "indigo",
  },
  {
    id: "2",
    name: "User Cohort Breakdown",
    preview: "WITH cohorts AS (SELECT user_id, ...",
    duration: "3.4s",
    rows: 8234,
    color: "emerald",
  },
  {
    id: "3",
    name: "Product Performance",
    preview: "SELECT p.name, SUM(o.quantity) as ...",
    duration: "0.8s",
    rows: 156,
    color: "amber",
  },
];

const mockDashboards: Dashboard[] = [
  { id: "1", name: "Sales Performance", lastEdited: "2h ago", status: "active" },
  { id: "2", name: "User Analytics", lastEdited: "1d ago", status: "active" },
  { id: "3", name: "Revenue Trends", lastEdited: "3d ago", status: "inactive" },
];

export default function AnalystHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900 relative">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Good morning, Sarah
          </h1>
          <p className="text-sm text-slate-400 mt-1">{currentDate}</p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search queries, models..."
          />

          {/* Notifications */}
          <button className="relative p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700">
            <iconify-icon icon="solar:bell-linear" width={20}></iconify-icon>
            <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8 z-10 scrollbar-hide">
        {/* Quick Actions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* New Query */}
          <Link
            to="/query/editor"
            className="group bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-all flex items-center gap-4"
          >
            <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
              <iconify-icon icon="solar:code-square-linear" width={24}></iconify-icon>
            </div>
            <div>
              <h3 className="text-white font-medium">New Query</h3>
              <p className="text-sm text-slate-400">Write SQL queries</p>
            </div>
            <iconify-icon icon="solar:arrow-right-linear"
              width={20}
              className="ml-auto text-slate-600 group-hover:text-indigo-400 transition-colors"
            ></iconify-icon>
          </Link>

          {/* New Dashboard */}
          <Link
            to="/builder"
            className="group bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500/40 transition-all flex items-center gap-4"
          >
            <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
              <iconify-icon icon="solar:widget-add-linear" width={24}></iconify-icon>
            </div>
            <div>
              <h3 className="text-white font-medium">New Dashboard</h3>
              <p className="text-sm text-slate-400">Build visualizations</p>
            </div>
            <iconify-icon icon="solar:arrow-right-linear"
              width={20}
              className="ml-auto text-slate-600 group-hover:text-emerald-400 transition-colors"
            ></iconify-icon>
          </Link>

          {/* New Data Model */}
          <Link
            to="/models/new"
            className="group bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/40 transition-all flex items-center gap-4"
          >
            <div className="p-3 bg-amber-500/20 rounded-lg text-amber-400 group-hover:bg-amber-500/30 transition-colors">
              <iconify-icon icon="solar:database-linear" width={24}></iconify-icon>
            </div>
            <div>
              <h3 className="text-white font-medium">New Data Model</h3>
              <p className="text-sm text-slate-400">Define relationships</p>
            </div>
            <iconify-icon icon="solar:arrow-right-linear"
              width={20}
              className="ml-auto text-slate-600 group-hover:text-amber-400 transition-colors"
            ></iconify-icon>
          </Link>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value="$2.4M"
            change={12.5}
            trend="up"
            icon="solar:dollar-linear"
          />
          <StatCard
            title="Queries This Week"
            value="156"
            change={24}
            trend="up"
            icon="solar:code-square-linear"
          />
          <StatCard
            title="Dashboards Created"
            value="12"
            change={3}
            trend="up"
            icon="solar:widget-linear"
          />
          <StatCard
            title="Data Models"
            value="8"
            icon="solar:database-linear"
            badge="Active"
          />
        </div>

        {/* Recent Queries Section */}
        <section className="bg-slate-800 border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Queries</h2>
            <Link
              to="/query/editor"
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
            >
              View All
              <iconify-icon icon="solar:arrow-right-linear" width={14}></iconify-icon>
            </Link>
          </div>

          <div className="space-y-3">
            {mockQueries.map((query) => (
              <Link
                key={query.id}
                to="/query/editor"
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 border border-slate-700/50 hover:border-indigo-500/30 transition-all group"
              >
                <div
                  className={`p-2 bg-${query.color}-500/10 rounded-lg text-${query.color}-400`}
                >
                  <iconify-icon icon="solar:code-square-linear" width={20}></iconify-icon>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {query.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono truncate">
                    {query.preview}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{query.duration}</p>
                  <p className="text-xs text-slate-500">
                    {query.rows.toLocaleString()} rows
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Dashboards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Dashboards
            </h2>
            <Link
              to="/builder"
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
            >
              View All
              <iconify-icon icon="solar:arrow-right-linear" width={14}></iconify-icon>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockDashboards.map((dashboard, index) => (
              <Link
                key={dashboard.id}
                to="/builder"
                className="group block bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="h-32 bg-slate-800 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      index === 0
                        ? "from-indigo-500/20 to-purple-500/5"
                        : index === 1
                        ? "from-emerald-500/20 to-teal-500/5"
                        : "from-amber-500/20 to-orange-500/5"
                    } opacity-50 group-hover:opacity-100 transition-opacity`}
                  />
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center px-4 pb-4">
                      <div className="w-full flex items-end gap-1 h-full opacity-60">
                        <div className="w-1/5 bg-indigo-500 h-[40%] rounded-t-sm" />
                        <div className="w-1/5 bg-indigo-400 h-[70%] rounded-t-sm" />
                        <div className="w-1/5 bg-indigo-600 h-[50%] rounded-t-sm" />
                        <div className="w-1/5 bg-indigo-500 h-[90%] rounded-t-sm" />
                        <div className="w-1/5 bg-indigo-300 h-[60%] rounded-t-sm" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3
                    className={`text-slate-200 font-medium text-sm group-hover:text-${
                      index === 0
                        ? "indigo"
                        : index === 1
                        ? "emerald"
                        : "amber"
                    }-400 transition-colors`}
                  >
                    {dashboard.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        dashboard.status === "active"
                          ? "bg-emerald-500"
                          : "bg-slate-600"
                      }`}
                    />
                    <p className="text-xs text-slate-500">
                      Edited {dashboard.lastEdited}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            {/* Create New Card */}
            <Link
              to="/builder"
              className="group flex flex-col items-center justify-center bg-slate-800/50 border border-dashed border-slate-700 rounded-xl h-[200px] hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300"
            >
              <div className="p-3 bg-slate-700/50 rounded-lg text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
                <iconify-icon icon="solar:add-circle-linear" width={24}></iconify-icon>
              </div>
              <p className="text-sm text-slate-400 mt-3 group-hover:text-slate-300 transition-colors">
                Create Dashboard
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
