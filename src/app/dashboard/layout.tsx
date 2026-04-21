"use client";

import { LayoutDashboard, Package, ShoppingCart, Search, Settings, Bell, Search as SearchIcon, Bot, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Package, label: "Products", href: "/dashboard/products" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
    { icon: Search, label: "Scraper", href: "/dashboard/scraper" },
    { icon: Bot, label: "AI Agent", href: "/dashboard/ai-agent" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AutoDrop</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products, orders..."
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-950" />
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-indigo-500/50 overflow-hidden shadow-lg shadow-indigo-500/10">
              <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="Admin" />
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
