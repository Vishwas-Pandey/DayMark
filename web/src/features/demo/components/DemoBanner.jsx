import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[90%] md:max-w-max"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, delay: 3 }}
        >
          <div className="bg-surface-secondary/80 backdrop-blur-xl border border-border-default rounded-full p-2 pr-4 shadow-2xl flex items-center justify-between md:justify-center gap-4">
            <div className="flex items-center gap-3 pl-3">
              <span className="w-2 h-2 rounded-full bg-interactive-primary animate-pulse" />
              <span className="text-sm font-medium text-text-heading">Exploring Demo Mode</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="text-xs font-semibold px-4 py-2 rounded-full bg-interactive-primary text-text-heading hover:bg-interactive-primary/90 transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Create Account
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-border-default transition-colors text-text-muted hover:text-text-heading"
                onClick={() => setIsVisible(false)}
                aria-label="Dismiss banner"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};