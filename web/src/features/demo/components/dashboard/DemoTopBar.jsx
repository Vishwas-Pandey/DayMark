import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DemoTopBar = () => {
  const [greeting, setGreeting] = useState("Good Morning");
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-surface-primary/80 backdrop-blur-xl border-b border-border-default flex items-center justify-between px-6 lg:px-10">
      
      {/* Mobile Menu & Greeting */}
      <div className="flex items-center gap-4">
        <button aria-label="Open mobile menu" className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-secondary text-text-heading transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-text-heading">{greeting}, Alex.</h1>
          <p className="text-xs text-text-muted hidden sm:block">{today}</p>
        </div>
      </div>

      {/* Global Search & Actions */}
      <div className="flex items-center gap-4">
        {/* Cmd+K Search trigger */}
        <button aria-label="Open command palette"
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-surface-secondary border border-border-default rounded-xl text-sm text-text-muted hover:bg-surface-secondary/80 hover:border-interactive-primary/50 transition-all focus-ring group"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span className="w-32 text-left group-hover:text-text-heading transition-colors">Search anything...</span>
          <div className="flex items-center gap-1 text-[10px] font-bold bg-surface-primary px-2 py-1 rounded">
            <span>⌘</span><span>K</span>
          </div>
        </button>

        {/* Notifications */}
        <button aria-label="View notifications" className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary border border-border-default hover:bg-surface-secondary/80 transition-colors group focus-ring">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-heading group-hover:animate-[wiggle_0.3s_ease-in-out_infinite]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <motion.div 
            className="absolute top-2 right-2 w-2.5 h-2.5 bg-interactive-primary rounded-full border-2 border-surface-secondary"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </button>

        {/* Avatar */}
        <button aria-label="User profile" className="w-10 h-10 rounded-xl overflow-hidden border-2 border-border-default hover:border-interactive-primary transition-colors focus-ring cursor-pointer">
          <img src="https://ui-avatars.com/api/?name=Alex+M&background=3b82f6&color=fff" alt="User Avatar" className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};