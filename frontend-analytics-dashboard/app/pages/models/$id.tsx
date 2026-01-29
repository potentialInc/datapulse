import { Link } from "react-router";
// Using iconify-icon web component
import { useState } from "react";

interface Table {
  name: string;
  rowCount: string;
}

const availableTables: Table[] = [
  { name: "users", rowCount: "125,432 rows" },
  { name: "orders", rowCount: "892,156 rows" },
  { name: "products", rowCount: "2,456 rows" },
  { name: "order_items", rowCount: "2.1M rows" },
  { name: "categories", rowCount: "156 rows" },
  { name: "sessions", rowCount: "1.2M rows" },
  { name: "events", rowCount: "5.8M rows" },
];

export default function DataModelEditor() {
  const [modelName, setModelName] = useState("Sales Analytics Model");
  const [joinType, setJoinType] = useState<"left" | "inner" | "right">("inner");

  return (
    <div className="h-full flex overflow-hidden bg-slate-900">
      {/* Table Sidebar */}
      <aside className="w-[280px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/50">
          <Link
            to="/models/list"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <iconify-icon icon="solar:arrow-left-linear" width={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        {/* Data Source */}
        <div className="p-3 border-b border-slate-800">
          <label className="block text-xs font-medium text-slate-400 mb-2">Data Source</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
            <option>Production Database</option>
            <option>Analytics Database</option>
          </select>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <iconify-icon icon="solar:magnifer-linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              width={16}
            />
            <input
              type="text"
              placeholder="Search tables..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Available Tables */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Available Tables
          </h3>
          <div className="space-y-1">
            {availableTables.map((table) => (
              <div
                key={table.name}
                draggable
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/30 cursor-grab active:cursor-grabbing transition-all"
              >
                <iconify-icon icon="solar:table-linear" width={16} className="text-amber-400" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-300 block truncate">{table.name}</span>
                  <span className="text-xs text-slate-500">{table.rowCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
        {/* Top Toolbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="bg-transparent border-none text-lg font-semibold text-white focus:outline-none focus:ring-0 w-64"
              placeholder="Model Name"
            />
            <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
              <iconify-icon icon="solar:table-linear" width={12} />3 tables
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
              <iconify-icon icon="solar:link-linear" width={12} />2 joins
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Validate */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:check-circle-linear" width={18} />
              Validate
            </button>

            {/* Test Query */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:play-linear" width={18} />
              Test Query
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* Save */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
              <iconify-icon icon="solar:diskette-linear" width={18} />
              Save Model
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-8 relative bg-[linear-gradient(to_right,rgba(51,65,85,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,65,85,0.3)_1px,transparent_1px)] bg-[size:20px_20px]">
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 z-10">
            <button className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <iconify-icon icon="solar:add-circle-linear" width={18} />
            </button>
            <button className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <iconify-icon icon="solar:minus-circle-linear" width={18} />
            </button>
            <div className="border-t border-slate-700 my-1" />
            <button className="p-2 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <iconify-icon icon="solar:maximize-linear" width={18} />
            </button>
          </div>

          {/* ERD Diagram */}
          <div className="relative w-full h-full min-h-[600px]">
            {/* SVG for join lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
              {/* Join line 1: users -> orders */}
              <line x1="300" y1="120" x2="450" y2="120" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="300" cy="120" r="5" fill="#6366F1" />
              <circle cx="450" cy="120" r="5" fill="#6366F1" />

              {/* Join line 2: orders -> order_items */}
              <line x1="650" y1="200" x2="650" y2="320" stroke="#6366F1" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="650" cy="200" r="5" fill="#6366F1" />
              <circle cx="650" cy="320" r="5" fill="#6366F1" />
            </svg>

            {/* Table: users */}
            <div className="absolute left-[50px] top-[50px] w-[240px] bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-xl cursor-move hover:border-indigo-500/50 transition-all">
              <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:table-linear" width={16} className="text-amber-400" />
                  <span className="font-medium text-white">users</span>
                </div>
                <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-600 transition-all">
                  <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                </button>
              </div>
              <div className="p-2 max-h-[200px] overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <iconify-icon icon="solar:key-linear" width={12} className="text-amber-500" />
                  <span className="text-sm text-slate-300 flex-1">id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">email</span>
                  <span className="text-xs text-slate-500">varchar</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">name</span>
                  <span className="text-xs text-slate-500">varchar</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">created_at</span>
                  <span className="text-xs text-slate-500">timestamp</span>
                </div>
              </div>
            </div>

            {/* Table: orders */}
            <div className="absolute left-[450px] top-[50px] w-[240px] bg-slate-800 border border-indigo-500/50 rounded-xl overflow-hidden shadow-xl cursor-move">
              <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:table-linear" width={16} className="text-amber-400" />
                  <span className="font-medium text-white">orders</span>
                </div>
                <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-600 transition-all">
                  <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                </button>
              </div>
              <div className="p-2 max-h-[200px] overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <iconify-icon icon="solar:key-linear" width={12} className="text-amber-500" />
                  <span className="text-sm text-slate-300 flex-1">id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-indigo-500/10">
                  <iconify-icon icon="solar:link-linear" width={12} className="text-indigo-400" />
                  <span className="text-sm text-indigo-300 flex-1">user_id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">total_amount</span>
                  <span className="text-xs text-slate-500">decimal</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">status</span>
                  <span className="text-xs text-slate-500">varchar</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">created_at</span>
                  <span className="text-xs text-slate-500">timestamp</span>
                </div>
              </div>
            </div>

            {/* Table: order_items */}
            <div className="absolute left-[450px] top-[320px] w-[240px] bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-xl cursor-move hover:border-indigo-500/50 transition-all">
              <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <iconify-icon icon="solar:table-linear" width={16} className="text-amber-400" />
                  <span className="font-medium text-white">order_items</span>
                </div>
                <button className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-600 transition-all">
                  <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                </button>
              </div>
              <div className="p-2 max-h-[200px] overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <iconify-icon icon="solar:key-linear" width={12} className="text-amber-500" />
                  <span className="text-sm text-slate-300 flex-1">id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-indigo-500/10">
                  <iconify-icon icon="solar:link-linear" width={12} className="text-indigo-400" />
                  <span className="text-sm text-indigo-300 flex-1">order_id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">product_id</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">quantity</span>
                  <span className="text-xs text-slate-500">int</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700/50">
                  <span className="w-3" />
                  <span className="text-sm text-slate-300 flex-1">price</span>
                  <span className="text-xs text-slate-500">decimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Properties Panel */}
      <aside className="w-[320px] flex-shrink-0 border-l border-slate-800 bg-slate-900 flex flex-col h-full z-20">
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/50">
          <h3 className="font-medium text-white">Join Configuration</h3>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <iconify-icon icon="solar:close-circle-linear" width={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide">
          {/* Join Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Join Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(["left", "inner", "right"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setJoinType(type)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all border ${
                    joinType === type
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800 border-slate-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Source Table */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Source Table</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
              <option>users</option>
              <option>orders</option>
              <option>order_items</option>
            </select>
          </div>

          {/* Source Column */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Source Column</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
              <option>id</option>
              <option>email</option>
              <option>name</option>
              <option>created_at</option>
            </select>
          </div>

          {/* Target Table */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Table</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
              <option>orders</option>
              <option>users</option>
              <option>order_items</option>
            </select>
          </div>

          {/* Target Column */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Column</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
              <option>user_id</option>
              <option>id</option>
              <option>total_amount</option>
              <option>status</option>
            </select>
          </div>

          {/* Join Preview */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Join Preview
            </h4>
            <code className="text-xs text-slate-300 font-mono block">
              users.id <span className="text-indigo-400">=</span> orders.user_id
            </code>
          </div>

          {/* Additional Conditions */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Additional Conditions
            </label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none h-20 font-mono"
              placeholder="e.g., orders.status = 'completed'"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
            Apply Join
          </button>
          <button className="w-full px-4 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-medium">
            Remove Join
          </button>
        </div>
      </aside>
    </div>
  );
}
