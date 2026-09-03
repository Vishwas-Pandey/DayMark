import React from 'react';
import { motion } from 'framer-motion';

export const AIDeepWorkPlanner = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-text-heading">Deep Work Planner</h3>
        <span className="text-xs text-text-muted bg-surface-secondary px-2 py-1 rounded">Drag ready</span>
      </div>
      <div className="space-y-3">
        {[
          { label: "Workout", time: "07:30 - 08:30", type: "health" },
          { label: "Deep Work (Code)", time: "09:30 - 11:30", type: "focus" },
          { label: "Sync Meeting", time: "11:30 - 12:00", type: "meeting" }
        ].map((block, i) => (
          <motion.div 
            key={i}
            className="flex items-center gap-4 p-3 rounded-xl bg-surface-secondary/50 border border-border-subtle cursor-grab hover:bg-surface-secondary group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99, cursor: "grabbing" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted/50"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            <div className={`w-2 h-8 rounded-full ${block.type === 'focus' ? 'bg-purple-500' : block.type === 'health' ? 'bg-green-500' : 'bg-blue-500'}`} />
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-text-heading">{block.label}</span>
              <span className="text-xs text-text-muted">{block.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};