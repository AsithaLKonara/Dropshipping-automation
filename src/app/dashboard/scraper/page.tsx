"use client";

import { useState } from "react";
import { Search, Play, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function ScraperPage() {
  const [keyword, setKeyword] = useState("");
  const [isScraping, setIsScraping] = useState(false);

  const handleStart = () => {
    if (!keyword) return;
    setIsScraping(true);
    // Simulate API call
    setTimeout(() => setIsScraping(false), 3000);
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Product Scraper</h1>
        <p className="text-slate-500">Automate your product research by scraping AliExpress in real-time.</p>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-400">Search Keyword</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="e.g. ergonomic office chair"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3.5 px-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-400">Result Limit</label>
            <select className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-3.5 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-300">
              <option>10 Products</option>
              <option>20 Products</option>
              <option>50 Products</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-indigo-300 text-sm">Smart Filtering Enabled</h4>
              <p className="text-slate-500 text-sm">Products with less than 4.5 stars or 500 orders will be automatically skipped.</p>
            </div>
          </div>

          <button 
            onClick={handleStart}
            disabled={isScraping || !keyword}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              isScraping 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
            }`}
          >
            {isScraping ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Initializing Automation Engine...
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current" />
                Start Research Automation
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-slate-950/50 border border-white/5 rounded-3xl p-8 border-dashed">
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-white/5">
            <AlertCircle className="w-8 h-8 text-slate-700" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-400">No active tasks</h3>
            <p className="text-slate-600 text-sm">Start a new scrape to see live progress here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
