import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const GoalWidget = ({ activeStepRaw }) => {
  const fillProgress = useTransform(activeStepRaw, [2.8, 3.2], [0.65, 0.85]);
  
  return (
    <div className="w-full max-w-sm bg-surface-secondary/50 border border-border-default rounded-xl p-6 shadow-xl flex flex-col items-center">
      <h3 className="text-lg font-semibold text-text-heading mb-6 w-full text-left">Ship Phase 1</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-default)" strokeWidth="8" opacity="0.3" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-interactive-primary)" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray="283"
            style={{ strokeDashoffset: useTransform(fillProgress, p => 283 - (283 * p)) }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <motion.span className="text-3xl font-bold text-text-heading">
            {useTransform(fillProgress, p => Math.floor(p * 100))}
          </motion.span>
          <span className="text-xs text-text-muted">% Complete</span>
        </div>
      </div>

      <div className="mt-6 w-full flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-heading font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-interactive-primary"/> Frontend</span>
          <span className="text-text-muted">100%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-heading font-medium flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#38bdf8]"/> Backend</span>
          <span className="text-text-muted">70%</span>
        </div>
      </div>
    </div>
  );
};