import { Link } from "react-router";
// Using iconify-icon web component
import { useState } from "react";

interface Table {
  name: string;
  rowCount: string;
  isExpanded: boolean;
  columns?: { name: string; type: string; isPrimary?: boolean }[];
}

const mockTables: Table[] = [
  {
    name: "users",
    rowCount: "125k",
    isExpanded: true,
    columns: [
      { name: "id", type: "int", isPrimary: true },
      { name: "email", type: "varchar" },
      { name: "name", type: "varchar" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  { name: "orders", rowCount: "892k", isExpanded: false },
  { name: "products", rowCount: "2.4k", isExpanded: false },
  { name: "sessions", rowCount: "1.2M", isExpanded: false },
  { name: "events", rowCount: "5.8M", isExpanded: false },
];

const mockResults = [
  { month: "2026-01-01", revenue: "$2,456,789.00", customers: "12,345", order_count: "45,678" },
  { month: "2025-12-01", revenue: "$2,234,567.00", customers: "11,234", order_count: "42,156" },
  { month: "2025-11-01", revenue: "$2,189,432.00", customers: "10,987", order_count: "40,234" },
  { month: "2025-10-01", revenue: "$2,045,678.00", customers: "10,456", order_count: "38,912" },
  { month: "2025-09-01", revenue: "$1,987,234.00", customers: "9,876", order_count: "36,789" },
  { month: "2025-08-01", revenue: "$1,876,543.00", customers: "9,234", order_count: "34,567" },
  { month: "2025-07-01", revenue: "$1,765,432.00", customers: "8,765", order_count: "32,456" },
  { month: "2025-06-01", revenue: "$1,654,321.00", customers: "8,234", order_count: "30,123" },
];

const sqlQuery = `-- Monthly Revenue Analysis
SELECT
    date_trunc('month', o.created_at) AS month,
    SUM(o.total_amount) AS revenue,
    COUNT(DISTINCT o.user_id) AS customers,
    COUNT(*) AS order_count
FROM orders o
WHERE o.created_at >= '2025-01-01'
GROUP BY 1
ORDER BY 1 DESC;`;

export default function QueryEditor() {
  const [queryName, setQueryName] = useState("Monthly Revenue Analysis");
  const [tables, setTables] = useState(mockTables);
  const [activeTab, setActiveTab] = useState<"results" | "history">("results");

  const toggleTableExpand = (tableName: string) => {
    setTables(
      tables.map((table) =>
        table.name === tableName ? { ...table, isExpanded: !table.isExpanded } : table
      )
    );
  };

  return (
    <div className="h-full flex overflow-hidden bg-slate-900">
      {/* Schema Sidebar */}
      <aside className="w-[240px] flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20">
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

        {/* Data Source Selector */}
        <div className="p-3 border-b border-slate-800">
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
            <option>Production Database</option>
            <option>Analytics Database</option>
            <option>Data Warehouse</option>
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

        {/* Schema Tree */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          <div className="space-y-1">
            {/* Database */}
            <div className="mb-3">
              <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-slate-300 font-medium">
                <iconify-icon icon="solar:database-linear" width={16} className="text-indigo-400" />
                analytics_db
              </div>

              {/* Tables */}
              <div className="ml-4 space-y-0.5">
                {tables.map((table) => (
                  <div key={table.name} className="group">
                    <div
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                      onClick={() => toggleTableExpand(table.name)}
                    >
                      <iconify-icon icon={
                          table.isExpanded
                            ? "solar:alt-arrow-down-linear"
                            : "solar:alt-arrow-right-linear"
                        }
                        width={14}
                        className="text-slate-500"
                      />
                      <iconify-icon icon="solar:table-linear" width={14} className="text-amber-400" />
                      <span className="text-sm text-slate-300">{table.name}</span>
                      <span className="ml-auto text-xs text-slate-600">{table.rowCount}</span>
                    </div>
                    {table.isExpanded && table.columns && (
                      <div className="ml-6 space-y-0.5">
                        {table.columns.map((column) => (
                          <div
                            key={column.name}
                            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Double-click to insert"
                          >
                            {column.isPrimary ? (
                              <iconify-icon icon="solar:key-linear" width={12} className="text-amber-500" />
                            ) : (
                              <span className="w-3" />
                            )}
                            <span className="text-xs text-slate-400">{column.name}</span>
                            <span className="ml-auto text-xs text-slate-600">{column.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
        {/* Top Toolbar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-slate-400">Query Editor</h1>
            <span className="text-slate-600">/</span>
            <input
              type="text"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-white focus:outline-none focus:ring-0 w-64"
              placeholder="Untitled Query"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Run Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all text-sm font-medium">
              <iconify-icon icon="solar:play-bold" width={16} />
              Run
              <span className="text-xs text-indigo-200 ml-1">⌘↵</span>
            </button>

            {/* Explain */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:info-circle-linear" width={18} />
              Explain
            </button>

            {/* Format */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:code-linear" width={18} />
              Format
            </button>

            <div className="w-px h-6 bg-slate-700 mx-1" />

            {/* Save */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:diskette-linear" width={18} />
              Save
            </button>

            {/* Share */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
              <iconify-icon icon="solar:share-linear" width={18} />
              Share
            </button>
          </div>
        </header>

        {/* Query Editor Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor */}
          <div className="h-[300px] border-b border-slate-800 overflow-hidden flex">
            {/* Line Numbers */}
            <div className="w-12 bg-slate-800/50 py-4 text-right pr-3 select-none">
              {sqlQuery.split("\n").map((_, idx) => (
                <div key={idx} className="text-xs text-slate-600 font-mono leading-6">
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div className="flex-1 p-4 overflow-auto font-mono text-sm leading-6">
              <pre className="text-slate-300">
                <span className="text-slate-500 italic">-- Monthly Revenue Analysis</span>
                {"\n"}
                <span className="text-purple-400">SELECT</span>
                {"\n    "}
                <span className="text-blue-400">date_trunc</span>
                {"("}
                <span className="text-green-400">'month'</span>
                {", o.created_at) "}
                <span className="text-purple-400">AS</span>
                {" month,\n    "}
                <span className="text-blue-400">SUM</span>
                {"(o.total_amount) "}
                <span className="text-purple-400">AS</span>
                {" revenue,\n    "}
                <span className="text-blue-400">COUNT</span>
                {"("}
                <span className="text-purple-400">DISTINCT</span>
                {" o.user_id) "}
                <span className="text-purple-400">AS</span>
                {" customers,\n    "}
                <span className="text-blue-400">COUNT</span>
                {"(*) "}
                <span className="text-purple-400">AS</span>
                {" order_count\n"}
                <span className="text-purple-400">FROM</span>
                {" orders o\n"}
                <span className="text-purple-400">WHERE</span>
                {" o.created_at >= "}
                <span className="text-green-400">'2025-01-01'</span>
                {"\n"}
                <span className="text-purple-400">GROUP BY</span>
                {" "}
                <span className="text-orange-400">1</span>
                {"\n"}
                <span className="text-purple-400">ORDER BY</span>
                {" "}
                <span className="text-orange-400">1</span>
                {" "}
                <span className="text-purple-400">DESC</span>
                {";"}
              </pre>
            </div>
          </div>

          {/* Results Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Results Tabs */}
            <div className="h-10 flex items-center border-b border-slate-800 px-4 gap-4">
              <button
                onClick={() => setActiveTab("results")}
                className={`text-sm font-medium pb-2 -mb-px transition-colors ${
                  activeTab === "results"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Results
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`text-sm font-medium pb-2 -mb-px transition-colors ${
                  activeTab === "history"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Query History
              </button>
              <div className="flex-1" />
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-400">24,521 rows</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">1.2s</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
                  <iconify-icon icon="solar:download-linear" width={16} />
                  Export
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm">
                  <iconify-icon icon="solar:chart-linear" width={16} />
                  Visualize
                </button>
              </div>
            </div>

            {/* Results Table */}
            {activeTab === "results" && (
              <div className="flex-1 overflow-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 sticky top-0">
                    <tr>
                      {["month", "revenue", "customers", "order_count"].map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            {header}
                            <iconify-icon icon="solar:sort-vertical-linear"
                              width={12}
                              className="text-slate-600"
                            />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {mockResults.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-300 font-mono">{row.month}</td>
                        <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                          {row.revenue}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                          {row.customers}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                          {row.order_count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
