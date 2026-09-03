import React from 'react';
import { motion } from 'framer-motion';

export const AIProductivityScore = ({ step }) => {
  const score = step >= 3 ? 94 : 88;
  const offset = step >= 3 ? 40 : 80;

  return (
    <div className="w-1/3 bg-surface-primary border border-border-default rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center relative group">
      <motion.div 
        className="absolute inset-0 bg-interactive-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-2">Score</div>
      
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-default)" strokeWidth="6" opacity="0.3" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-interactive-primary)" 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray="283"
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
        <motion.div className="absolute text-2xl font-bold text-text-heading">
          {score}
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-3 text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full flex items-center gap-1"
        initial={false}
        animate={{ scale: step === 3 ? [1, 1.1, 1] : 1 }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
        Top 5%
      </motion.div>
    </div>
  );
};