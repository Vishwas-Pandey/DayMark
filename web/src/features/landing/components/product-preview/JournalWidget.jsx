import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const JournalWidget = ({ activeStepRaw }) => {
  const textProgress = useTransform(activeStepRaw, [1.8, 2.2], [0, 1]);
  const text = "Today was incredibly productive. I managed to finish the architecture review and team sync.";
  
  return (
    <div className="w-full max-w-lg bg-surface-secondary/50 border border-border-default rounded-xl overflow-hidden shadow-xl">
      <div className="h-10 bg-surface-primary border-b border-border-subtle flex items-center px-4">
        <span className="text-sm font-medium text-text-heading">Daily Reflection</span>
        <span className="ml-auto text-xs text-text-muted">June 26, 2026</span>
      </div>
      <div className="p-6 relative min-h-[150px]">
        <p className="text-text-heading text-lg font-serif leading-relaxed">
          <motion.span>{useTransform(textProgress, p => text.substring(0, Math.floor(p * text.length)))}</motion.span>
          <motion.span 
            className="inline-block w-[2px] h-[1.1em] bg-interactive-primary align-middle ml-[1px]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </p>
        
        <motion.div 
          className="absolute bottom-4 right-6 text-xs text-interactive-primary font-medium flex items-center gap-1"
          style={{ opacity: useTransform(textProgress, p => p === 1 ? 1 : 0) }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          Autosaved
        </motion.div>
      </div>
    </div>
  );
};