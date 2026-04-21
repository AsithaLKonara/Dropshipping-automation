"use client";

import { useState } from "react";
import { Search, Filter, Plus, ExternalLink, MoreVertical } from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, title: "Wireless Bluetooth Earbuds", price: 12.50, orders: 1200, rating: 4.8, image: "https://picsum.photos/seed/p1/200" },
    { id: 2, title: "Portable Mini Projector", price: 45.00, orders: 850, rating: 4.6, image: "https://picsum.photos/seed/p2/200" },
    { id: 3, title: "Smart LED Night Light", price: 8.99, orders: 2300, rating: 4.9, image: "https://picsum.photos/seed/p3/200" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Product Library</h1>
          <p className="text-slate-500 text-sm">Manage and monitor your scraped products.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Filter products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <button className="bg-slate-900/50 border border-white/5 p-3 rounded-2xl text-slate-400 hover:text-white transition-colors">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Product</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Supplier Price</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Orders</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Rating</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <span className="font-medium text-slate-200">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-300">${product.price.toFixed(2)}</td>
                <td className="px-6 py-5 text-slate-300">{product.orders.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span>{product.rating}</span>
                    <span className="text-xs">★</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors">List on eBay</button>
                    <button className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
