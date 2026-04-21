"use client";

import { ShoppingBag, Truck, CheckCircle, Clock, ExternalLink } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-9281", item: "Mini Projector", date: "2 mins ago", status: "PENDING", price: 54.99 },
    { id: "ORD-9280", item: "Smart Night Light", date: "15 mins ago", status: "ORDERED", price: 18.20 },
    { id: "ORD-9279", item: "Wireless Earbuds", date: "1 hour ago", status: "SHIPPED", price: 32.50 },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'ORDERED': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'SHIPPED': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Order Fulfillment</h1>
          <p className="text-slate-500 text-sm">Monitor and automate your customer orders.</p>
        </div>
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
          <Clock className="w-5 h-5" />
          Sync History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400"><Clock className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-xs">Pending Orders</p><h4 className="text-xl font-bold">12</h4></div>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400"><Truck className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-xs">In Transit</p><h4 className="text-xl font-bold">24</h4></div>
        </div>
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><CheckCircle className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-xs">Completed</p><h4 className="text-xl font-bold">142</h4></div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Order ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Item</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Placed</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-5 font-mono text-sm text-slate-400">{order.id}</td>
                <td className="px-6 py-5 font-medium text-slate-200">{order.item}</td>
                <td className="px-6 py-5 text-slate-500 text-sm">{order.date}</td>
                <td className="px-6 py-5 text-slate-300 font-semibold">${order.price.toFixed(2)}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <button className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 text-sm font-semibold">
                    Details <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
