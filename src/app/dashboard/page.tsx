import { Package, TrendingUp, ShoppingBag, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Products", value: "1,284", icon: Package, trend: "+12%", color: "indigo" },
    { label: "Total Profit", value: "$4,290.00", icon: TrendingUp, trend: "+8%", color: "green" },
    { label: "Active Orders", value: "48", icon: ShoppingBag, trend: "+5%", color: "orange" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-slate-500">Real-time performance metrics for your automation engine.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:border-indigo-500/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${
                stat.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400' : 
                stat.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 
                'bg-orange-500/10 text-orange-400'
              }`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                {stat.trend}
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Recent Scrapes</h3>
            <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">View All</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i}/200`} alt="Product" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-200 line-clamp-1">Premium Wireless Earbuds Pro</h4>
                    <p className="text-slate-500 text-xs">Electronics • $24.99 supplier</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-sm font-medium">★ 4.8</p>
                  <p className="text-slate-600 text-xs">1.2k orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Active Orders</h3>
            <button className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors">Monitor</button>
          </div>
          
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-white/5 rounded-2xl">
            <p className="text-slate-600 text-sm">No recent activity found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
