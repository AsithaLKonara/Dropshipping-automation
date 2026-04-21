"use client";

import { Save, User, Key, Globe, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-slate-500">Configure your automation engine and API integrations.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="text-indigo-400 w-5 h-5" />
            <h3 className="text-lg font-bold">Admin Profile</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Username</label>
              <input type="text" value="AsithaLKonara" disabled className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2.5 px-4 text-slate-400" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email Address</label>
              <input type="email" value="admin@autodrop.io" disabled className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2.5 px-4 text-slate-400" />
            </div>
          </div>
        </section>

        {/* API Credentials */}
        <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Key className="text-purple-400 w-5 h-5" />
            <h3 className="text-lg font-bold">API Credentials</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Groq API Key</label>
              <input type="password" placeholder="sk-••••••••••••••••••••••••••••" className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">eBay Client ID</label>
                <input type="text" placeholder="Enter Client ID" className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Daraz App Key</label>
                <input type="text" placeholder="Enter App Key" className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-500/20">
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
