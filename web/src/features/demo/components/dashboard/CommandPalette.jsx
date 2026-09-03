import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAiAction = (action) => {
    setQuery(action);
    setIsAiProcessing(true);
    setTimeout(() => {
      setIsAiProcessing(false);
      setQuery("");
      setIsOpen(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
          <motion.div 
            className="absolute inset-0 bg-surface-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div 
            className="relative w-full max-w-2xl bg-surface-primary border border-border-default rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* AI Aurora Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              <div className={`absolute -top-[100px] left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-interactive-primary/20 blur-[80px] transition-opacity duration-500 ${isAiProcessing ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            <div className="flex items-center px-4 py-4 border-b border-border-default relative z-10 bg-surface-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <input 
                type="text" 
                autoFocus 
                className="w-full bg-transparent border-none outline-none text-lg text-text-heading px-4 placeholder:text-text-muted"
                placeholder="Ask AI to plan tomorrow, summarize your week..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isAiProcessing}
              />
              <span className="text-xs font-bold text-text-muted bg-surface-secondary px-2 py-1 rounded">ESC</span>
            </div>
            
            <div className="p-2 max-h-[60vh] overflow-y-auto relative z-10 bg-surface-primary/95">
              {isAiProcessing ? (
                <div className="p-8 flex flex-col items-center justify-center text-text-muted">
                  <motion.svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                    className="text-interactive-primary mb-4"
                    animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </motion.svg>
                  <span className="text-sm">Synthesizing context...</span>
                </div>
              ) : (
                <>
                  <div className="px-3 py-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">AI Actions</div>
                  {[
                    { name: "Plan tomorrow", icon: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18" },
                    { name: "Summarize my week", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
                    { name: "Optimize my calendar", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
                  ].map((cmd, i) => (
                    <button 
                      aria-label={cmd.name}
                      key={i} 
                      onClick={() => handleAiAction(cmd.name)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-secondary text-text-heading group transition-colors focus-ring"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-interactive-primary opacity-70 group-hover:opacity-100 transition-opacity"><path d={cmd.icon}></path></svg>
                      <span className="font-medium text-sm">{cmd.name}</span>
                    </button>
                  ))}
                  <div className="px-3 py-2 text-[10px] font-bold text-text-muted uppercase tracking-wider mt-2">Standard Commands</div>
                  {[
                    { name: "Create new task", icon: "M12 5v14M5 12h14" },
                    { name: "Log mood entry", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
                  ].map((cmd, i) => (
                    <button 
                      aria-label={cmd.name}
                      key={'std'+i} 
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-secondary text-text-heading group transition-colors focus-ring"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted group-hover:text-text-heading"><path d={cmd.icon}></path></svg>
                      <span className="font-medium text-sm text-text-muted group-hover:text-text-heading">{cmd.name}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};