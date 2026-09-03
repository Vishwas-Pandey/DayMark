import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const AnalyticsWidget = ({ activeStepRaw }) => {
  const chartProgress = useTransform(activeStepRaw, [4.8, 5.2], [0, 1]);

  return (
    <div className="w-full max-w-lg bg-surface-secondary/50 border border-border-default rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-heading">Productivity Trend</h3>
        <select className="bg-surface-primary border border-border-subtle text-text-muted text-xs px-2 py-1 rounded">
          <option>This Week</option>
        </select>
      </div>
      
      <div className="h-40 relative flex items-end justify-between gap-2 border-b border-border-subtle pb-2">
        {/* Simple animated bar chart */}
        {[30, 45, 25, 60, 80, 50, 95].map((val, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
            <motion.div 
              className="w-full bg-interactive-primary/30 rounded-t-sm relative group-hover:bg-interactive-primary/50 transition-colors"
              style={{ 
                height: useTransform(chartProgress, p => `${val * p}%`),
                transformOrigin: 'bottom'
              }}
            >
              <div className="absolute -top-1 left-0 right-0 h-1 bg-interactive-primary rounded-t-sm" />
            </motion.div>
            <span className="text-[10px] text-text-muted font-medium">
              {['M','T','W','T','F','S','S'][i]}
            </span>
          </div>
        ))}
        
        {/* Gradient overlay to simulate area chart aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-secondary/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};