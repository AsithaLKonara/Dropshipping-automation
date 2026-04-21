"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Terminal, Loader2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I am your AutoDrop AI Command Center. I can help you scrape products, list them to marketplaces, or check your stats. What would you like me to do?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-5) // Send last 5 messages for context
        })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Terminal className="text-indigo-500" />
          AI Command Center
        </h1>
        <p className="text-slate-500">Natural language automation for your entire dropshipping workflow.</p>
      </div>

      <div className="flex-1 bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden flex flex-col relative shadow-2xl">
        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                  msg.role === "assistant" 
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" 
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {msg.role === "assistant" ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "assistant" 
                    ? "bg-white/5 border border-white/10 text-slate-200" 
                    : "bg-indigo-600 text-white"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center animate-pulse text-white">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-slate-900/30">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Scrape 10 desk lamps from AliExpress..."
              className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-6 pr-24 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
          <div className="mt-4 flex gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Groq Engine Online</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-indigo-500" /> Function Calling Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
