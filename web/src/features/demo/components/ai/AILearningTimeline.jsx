import React from 'react';
import { motion } from 'framer-motion';

export const AILearningTimeline = () => {
  const points = [
    { week: "Week 1", desc: "Establishing baseline focus habits", status: "complete" },
    { week: "Week 2", desc: "Reduced procrastination by 14%", status: "complete" },
    { week: "Week 3", desc: "Optimizing morning routine", status: "active" },
    { week: "Week 4", desc: "Deep work consolidation", status: "upcoming" }
  ];

  return (
    <div className="sticky top-28 p-6 rounded-2xl bg-surface-primary border border-border-default h-fit">
      <h3 className="text-sm font-bold text-text-heading mb-6 tracking-wide">LEARNING TIMELINE</h3>
      <div className="relative border-l border-border-subtle ml-2 space-y-8">
        {points.map((pt, i) => (
          <div key={i} className="relative pl-6">
            <motion.div 
              className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${pt.status === 'active' ? 'bg-interactive-primary ring-4 ring-interactive-primary/20' : pt.status === 'complete' ? 'bg-green-500' : 'bg-surface-secondary border border-border-default'}`} 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            />
            <div className={`text-xs font-bold mb-1 ${pt.status === 'active' ? 'text-interactive-primary' : 'text-text-heading'}`}>{pt.week}</div>
            <div className="text-xs text-text-muted">{pt.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};