import { Link } from "react-router";
// Using iconify-icon web component
import { useState } from "react";

interface Widget {
  id: string;
  icon: string;
  label: string;
  color: string;
}

const widgets: Widget[] = [
  { id: "line", icon: "solar:chart-linear", label: "Line Chart", color: "indigo" },
  { id: "bar", icon: "solar:chart-2-linear", label: "Bar Chart", color: "emerald" },
  { id: "pie", icon: "solar:pie-chart-2-linear", label: "Pie Chart", color: "amber" },
  { id: "area", icon: "solar:graph-up-linear", label: "Area Chart", color: "purple" },
  { id: "table", icon: "solar:list-linear", label: "Table", color: "blue" },
  { id: "metric", icon: "solar:hashtag-square-linear", label: "Metric", color: "rose" },
  { id: "text", icon: "solar:text-linear", label: "Text", color: "slate" },
  { id: "image", icon: "solar:gallery-linear", label: "Image", color: "slate" },
];

const savedWidgets = [
  { id: "1", icon: "solar:chart-linear", label: "Revenue Trend", color: "indigo" },
  { id: "2", icon: "solar:pie-chart-2-linear", label: "User Distribution", color: "amber" },
  { id: "3", icon: "solar:hashtag-square-linear", label: "Total Users KPI", color: "emerald" },
];

export default function DashboardBuilder() {
  const [dashboardName, setDashboardName] = useState("Untitled Dashboard");
  const [activeTab, setActiveTab] = useState<"data" | "style" | "settings">("data");

  return (
    <div className="h-full flex overflow-hidden bg-slate-900">
      {/* Widget Sidebar */}
      <aside className="w-[280px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/50">
          <Link
            to="/dashboard/home"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <iconify-icon icon="solar:arrow-left-linear" width={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        {/* Widgets Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Widgets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  draggable
                  className="p-3 bg-slate-800 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 cursor-grab active:cursor-grabbing transition-all group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-2 bg-${widget.color}-500/10 rounded-lg text-${widget.color}-400 group-hover:bg-${widget.color}-500/20 transition-colors`}>
                      <iconify-icon icon={widget.icon} width={20} />
                    </div>
                    <span className="text-xs text-slate-300">{widget.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Widgets */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Saved Widgets
            </h3>
            <div className="space-y-2">
              {savedWidgets.map((widget) => (
                <div
                  key={widget.id}
                  draggable
                  className="p-3 bg-slate-800 border border-slate-700/50 rounded-lg hover:border-indigo-500/50 cursor-grab transition-all"
                >
                  <div className="flex items-center gap-3">
                    <iconify-icon icon={widget.icon} width={16} className={`text-${widget.color}-400`} />
                    <span className="text-sm text-slate-300">{widget.label}</span>
                  </div>
                </div>
              ))}
            </div>
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
              value={dashboardName}
              onChange={(e) => setDashboardName(e.target.value)}
              className="bg-transparent border-none text-lg font-semibold text-white focus:outline-none focus:ring-0 w-64"
              placeholder="Dashboard Name"
            />
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto-saved
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Undo/Redo */}
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <iconify-icon icon="solar:undo-left-linear" width={18} />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <iconify-icon icon="solar:undo-right-linear" width={18} />
            </button>

            <div className="w-px h-6 bg-slate-700 mx-2" />

            {/* Preview */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:eye-linear" width={18} />
              Preview
            </button>

            {/* Share */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:share-linear" width={18} />
              Share
            </button>

            {/* Save */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
              <iconify-icon icon="solar:diskette-linear" width={18} />
              Save
            </button>

            {/* More */}
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <iconify-icon icon="solar:menu-dots-bold" width={18} />
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-6 bg-[linear-gradient(to_right,rgba(71,85,105,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.1)_1px,transparent_1px)] bg-[size:40px_40px]">
          <div className="min-h-full">
            {/* Placed Widgets Grid */}
            <div className="grid grid-cols-12 gap-4 auto-rows-[120px]">
              {/* Metric Widgets */}
              {[
                { title: "Total Revenue", value: "$2.4M", change: "+12.5%" },
                { title: "Active Users", value: "14,829", change: "+8.2%" },
                { title: "Conversion Rate", value: "3.24%", change: "-2.1%" },
                { title: "Avg Order Value", value: "$156", change: "+5.7%" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="col-span-3 row-span-1 bg-slate-800 border border-slate-700/50 rounded-xl p-4 relative group hover:border-indigo-500/50 transition-all cursor-move"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="p-1 rounded bg-slate-700 text-slate-400 hover:text-white">
                      <iconify-icon icon="solar:pen-linear" width={14} />
                    </button>
                    <button className="p-1 rounded bg-slate-700 text-slate-400 hover:text-rose-400">
                      <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={14} />
                    </button>
                  </div>
                  <h4 className="text-xs text-slate-400 font-medium">{metric.title}</h4>
                  <p className="text-2xl font-bold text-white mt-2">{metric.value}</p>
                  <span className={`text-xs ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {metric.change}
                  </span>
                </div>
              ))}

              {/* Line Chart Widget */}
              <div className="col-span-8 row-span-3 bg-slate-800 border border-slate-700/50 rounded-xl p-5 relative group hover:border-indigo-500/50 transition-all cursor-move">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 rounded bg-slate-700 text-slate-400 hover:text-white">
                    <iconify-icon icon="solar:pen-linear" width={16} />
                  </button>
                  <button className="p-1.5 rounded bg-slate-700 text-slate-400 hover:text-rose-400">
                    <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={16} />
                  </button>
                </div>
                <h4 className="text-sm text-white font-medium mb-4">Revenue Over Time</h4>
                {/* Chart Placeholder */}
                <div className="h-full flex items-end justify-around px-4 pb-8">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, idx) => (
                    <div key={month} className="flex flex-col items-center gap-2">
                      <div
                        className="w-8 bg-indigo-500/60 rounded-t"
                        style={{ height: `${60 + idx * 15}px` }}
                      />
                      <span className="text-xs text-slate-500">{month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart Widget */}
              <div className="col-span-4 row-span-3 bg-slate-800 border border-slate-700/50 rounded-xl p-5 relative group hover:border-indigo-500/50 transition-all cursor-move">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 rounded bg-slate-700 text-slate-400 hover:text-white">
                    <iconify-icon icon="solar:pen-linear" width={16} />
                  </button>
                  <button className="p-1.5 rounded bg-slate-700 text-slate-400 hover:text-rose-400">
                    <iconify-icon icon="solar:trash-bin-minimalistic-linear" width={16} />
                  </button>
                </div>
                <h4 className="text-sm text-white font-medium mb-4">Traffic Sources</h4>
                <div className="flex items-center justify-center h-[calc(100%-80px)]">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#6366F1"
                        strokeWidth="20"
                        strokeDasharray="100.53 251.33"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="20"
                        strokeDasharray="75.40 251.33"
                        strokeDashoffset="-100.53"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#F59E0B"
                        strokeWidth="20"
                        strokeDasharray="50.27 251.33"
                        strokeDashoffset="-175.93"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#EC4899"
                        strokeWidth="20"
                        strokeDasharray="25.13 251.33"
                        strokeDashoffset="-226.2"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs mt-4">
                  {[
                    { label: "Direct", color: "indigo" },
                    { label: "Organic", color: "emerald" },
                    { label: "Referral", color: "amber" },
                    { label: "Social", color: "pink" },
                  ].map((item) => (
                    <span key={item.label} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Drop Zone */}
              <div className="col-span-12 row-span-2 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center bg-slate-800/20 hover:border-indigo-500/50 hover:bg-slate-800/40 transition-all">
                <div className="text-center">
                  <iconify-icon icon="solar:add-circle-linear" width={32} className="text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-500 mt-2">Drag widgets here to add them</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Configuration Panel */}
      <aside className="w-[320px] flex-shrink-0 border-l border-slate-800 bg-slate-900 flex flex-col h-full z-20">
        <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800/50">
          <h3 className="font-medium text-white">Widget Settings</h3>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <iconify-icon icon="solar:close-circle-linear" width={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Tabs */}
          <div className="flex border-b border-slate-800">
            {(["data", "style", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Data Tab Content */}
          {activeTab === "data" && (
            <div className="p-4 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Data Source
                </label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                  <option>Production Database</option>
                  <option>Analytics Database</option>
                  <option>Data Warehouse</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Visual
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
                  SQL
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  X-Axis
                </label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                  <option>created_at (date)</option>
                  <option>month (string)</option>
                  <option>category (string)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Y-Axis
                </label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                  <option>SUM(revenue)</option>
                  <option>COUNT(orders)</option>
                  <option>AVG(order_value)</option>
                </select>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-all text-sm font-medium">
                <iconify-icon icon="solar:play-linear" width={18} />
                Preview Data
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <button className="w-full px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
            Apply Changes
          </button>
        </div>
      </aside>
    </div>
  );
}
