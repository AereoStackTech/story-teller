"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Users, 
  BarChart3, 
  Server, 
  Settings, 
  ArrowLeft,
  Activity,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-indigo-500/20 bg-slate-950 flex flex-col justify-between p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white">StoryTeller Admin</span>
              <Badge variant="default" className="text-[9px] block px-1.5 py-0 mt-0.5 bg-indigo-500/20 text-indigo-300">
                Enterprise v2.5
              </Badge>
            </div>
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/admin"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Activity className="h-4 w-4" />
              Executive Metrics
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 border border-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Writer Studio
          </Link>
        </div>
      </aside>

      {/* Admin Main Window */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
