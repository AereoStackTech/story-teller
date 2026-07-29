"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sparkles, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Story Studio", href: "/stories", icon: BookOpen },
    { name: "Character Bible", href: "/characters", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between p-4">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              StoryTeller<span className="text-indigo-400">.ai</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : ""}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-purple-300 bg-purple-950/30 border border-purple-500/20 hover:bg-purple-900/40"
          >
            <Shield className="h-3.5 w-3.5" /> Switch to Admin Portal
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                EA
              </div>
              <div className="truncate">
                <p className="font-semibold text-slate-200 truncate">Elena Author</p>
                <p className="text-[10px] text-slate-500">Pro Plan (2,500 cr)</p>
              </div>
            </div>
            <Link href="/login" className="text-slate-500 hover:text-slate-300">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
