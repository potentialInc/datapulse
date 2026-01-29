import { Link } from "react-router";
// Using iconify-icon web component
import { useState } from "react";
import { SearchInput } from "~/components/ui/SearchInput";

interface DataModel {
  id: string;
  name: string;
  description: string;
  tableCount: number;
  joinCount: number;
  color: "indigo" | "emerald" | "amber" | "purple" | "rose";
  author: string;
  lastUpdated: string;
}

const mockModels: DataModel[] = [
  {
    id: "1",
    name: "Sales Analytics",
    description: "Orders, products, and customer data joined for sales analysis",
    tableCount: 5,
    joinCount: 4,
    color: "indigo",
    author: "SA",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    name: "User Engagement",
    description: "User sessions, events, and profile data for engagement metrics",
    tableCount: 4,
    joinCount: 3,
    color: "emerald",
    author: "MJ",
    lastUpdated: "1 day ago",
  },
  {
    id: "3",
    name: "Inventory Status",
    description: "Products, warehouses, and stock levels for inventory tracking",
    tableCount: 3,
    joinCount: 2,
    color: "amber",
    author: "SA",
    lastUpdated: "3 days ago",
  },
  {
    id: "4",
    name: "Marketing Funnel",
    description: "Campaign, leads, and conversion data for marketing analysis",
    tableCount: 6,
    joinCount: 5,
    color: "purple",
    author: "JD",
    lastUpdated: "5 days ago",
  },
  {
    id: "5",
    name: "Customer Support",
    description: "Tickets, agents, and customer data for support analytics",
    tableCount: 4,
    joinCount: 3,
    color: "rose",
    author: "KL",
    lastUpdated: "1 week ago",
  },
];

export default function DataModelsList() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900 relative">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 z-10">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Data Models</h1>
          <p className="text-sm text-slate-400 mt-1">
            Define table relationships and reusable data structures
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search models..."
          />

          {/* New Model Button */}
          <Link
            to="/models/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium"
          >
            <iconify-icon icon="solar:add-circle-linear" width={18} />
            New Model
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 z-10 scrollbar-hide">
        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockModels.map((model) => (
            <div
              key={model.id}
              className="bg-slate-800 border border-slate-700/50 rounded-xl p-5 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 bg-${model.color}-500/10 rounded-lg text-${model.color}-400`}>
                  <iconify-icon icon="solar:database-linear" width={22} />
                </div>
                <div className="relative">
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all opacity-0 group-hover:opacity-100">
                    <iconify-icon icon="solar:menu-dots-bold" width={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">{model.name}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{model.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <iconify-icon icon="solar:table-linear" width={14} />
                  {model.tableCount} tables
                </span>
                <span className="flex items-center gap-1.5">
                  <iconify-icon icon="solar:link-linear" width={14} />
                  {model.joinCount} joins
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
                <div
                  className={`w-6 h-6 rounded-full bg-gradient-to-br ${
                    model.color === "indigo"
                      ? "from-purple-500 to-indigo-600"
                      : model.color === "emerald"
                      ? "from-emerald-500 to-teal-600"
                      : model.color === "amber"
                      ? "from-purple-500 to-indigo-600"
                      : model.color === "purple"
                      ? "from-blue-500 to-indigo-600"
                      : "from-rose-500 to-pink-600"
                  } flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {model.author}
                </div>
                <span className="text-xs text-slate-400">Updated {model.lastUpdated}</span>
              </div>
            </div>
          ))}

          {/* Create New Card */}
          <Link
            to="/models/new"
            className="flex flex-col items-center justify-center bg-slate-800/30 border border-dashed border-slate-700 rounded-xl p-8 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group min-h-[200px]"
          >
            <div className="p-3 bg-slate-700/50 rounded-lg text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
              <iconify-icon icon="solar:add-circle-linear" width={28} />
            </div>
            <p className="text-sm text-slate-400 mt-4 group-hover:text-slate-300 transition-colors">
              Create New Model
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
