import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="bg-slate-900 text-slate-50 font-sans antialiased h-screen overflow-hidden flex selection:bg-indigo-500 selection:text-white">
      {/* Left Panel (Brand) - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800 bg-slate-900">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/20 z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <iconify-icon icon="solar:chart-square-linear" width="24"></iconify-icon>
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">DataPulse</span>
        </div>

        {/* Center Visualization */}
        <div className="relative z-10 flex items-center justify-center flex-1">
          <div className="relative w-full max-w-md">
            {/* Main Card */}
            <div className="relative bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl animate-pulse">
              {/* Fake Header */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-700/50 pb-4">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                </div>
                <div className="h-1.5 w-16 bg-slate-700 rounded-full"></div>
              </div>

              {/* Fake Chart */}
              <div className="flex items-end gap-3 h-32 px-2 pb-2">
                <div className="w-full bg-indigo-500/20 rounded-t-sm h-[40%]"></div>
                <div className="w-full bg-indigo-500/20 rounded-t-sm h-[70%]"></div>
                <div className="w-full bg-indigo-500 rounded-t-sm h-[55%] shadow-[0_0_15px_-3px_rgba(99,102,241,0.5)] relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[10px] py-1 px-2 rounded text-white whitespace-nowrap">
                    $24,500
                  </div>
                </div>
                <div className="w-full bg-indigo-500/20 rounded-t-sm h-[85%]"></div>
                <div className="w-full bg-indigo-500/20 rounded-t-sm h-[60%]"></div>
              </div>
            </div>

            {/* Floating Badge Left */}
            <div className="absolute -left-8 bottom-12 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <iconify-icon icon="solar:bolt-circle-linear" width="20"></iconify-icon>
              </div>
              <div>
                <div className="h-1.5 w-12 bg-slate-600 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-8 bg-slate-700 rounded-full"></div>
              </div>
            </div>

            {/* Floating Badge Right */}
            <div className="absolute -right-4 top-8 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <iconify-icon icon="solar:pie-chart-2-linear" width="20"></iconify-icon>
              </div>
              <div>
                <div className="h-1.5 w-16 bg-slate-600 rounded-full mb-1.5"></div>
                <div className="h-1.5 w-10 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-3 leading-tight">
            Your data, unified <br /> and actionable.
          </h2>
          <div className="flex gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <iconify-icon icon="solar:check-circle-linear" className="text-indigo-500 text-lg"></iconify-icon>
              Real-time dashboards
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <iconify-icon icon="solar:check-circle-linear" className="text-indigo-500 text-lg"></iconify-icon>
              AI-powered alerts
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-900 relative">
        <Outlet />

        {/* Footer Legal */}
        <div className="absolute bottom-6 w-full text-center lg:px-6">
          <div className="flex justify-center gap-6 text-[10px] text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}