import React from 'react';
import { motion } from 'framer-motion';

export const AIActionQueue = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default">
      <h3 className="text-sm font-bold text-text-heading mb-4">Action Queue</h3>
      <div className="space-y-3">
        {[
          { label: "Finish deep work module", impact: "High", time: "45m", conf: 98 },
          { label: "Review sprint goals", impact: "Med", time: "15m", conf: 85 },
          { label: "Log journal reflection", impact: "Low", time: "5m", conf: 70 }
        ].map((act, i) => (
          <motion.div key={i} className="p-3 rounded-xl bg-surface-secondary/50 border border-border-subtle group hover:bg-surface-secondary transition-colors cursor-pointer" whileHover={{ y: -2 }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-text-heading">{act.label}</span>
              <span className="text-[10px] font-bold text-text-muted bg-surface-primary px-1.5 py-0.5 rounded">{act.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-surface-primary rounded-full overflow-hidden">
                <div className="h-full bg-interactive-primary" style={{ width: `${act.conf}%` }} />
              </div>
              <span className="text-[10px] font-bold text-interactive-primary">{act.conf}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};