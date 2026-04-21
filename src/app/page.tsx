import Link from "next/link";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-4">
          <Zap className="w-4 h-4 fill-indigo-400" />
          Powered by AutoDrop Engine
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Automate Your <br /> Dropshipping Empire.
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The all-in-one automation platform for product research, AI-powered listing optimization, and seamless order fulfillment.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <Link 
            href="/login" 
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-2xl shadow-indigo-500/25 transition-all hover:scale-105"
          >
            Enter Portal <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all"
          >
            View Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="p-6 text-left space-y-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl w-fit text-indigo-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Research</h3>
            <p className="text-slate-500">Scrape thousands of products from AliExpress in minutes.</p>
          </div>
          <div className="p-6 text-left space-y-4">
            <div className="p-3 bg-purple-500/10 rounded-xl w-fit text-purple-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">AI Optimization</h3>
            <p className="text-slate-500">Rewrite listings using Llama 3 for maximum conversion.</p>
          </div>
          <div className="p-6 text-left space-y-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl w-fit text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Safe Fulfillment</h3>
            <p className="text-slate-500">Automated ordering and tracking sync for your peace of mind.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
