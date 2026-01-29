import { Link } from "react-router";
import type { Route } from "../pages/+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DataPulse Analytics Dashboard" },
    { name: "description", content: "Analytics dashboard for data-driven insights" },
  ];
}

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">DataPulse Analytics</h1>
        <p className="text-slate-400 mb-8">Data-driven insights for your business</p>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/dashboard/home"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/login"
            className="text-slate-400 hover:text-white hover:underline text-sm"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
