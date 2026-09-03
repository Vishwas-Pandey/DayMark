import React from 'react';
import { motion } from 'framer-motion';

export const AIDeepWorkTimeline = ({ step }) => {
  const blocks = [
    { time: "09:00", type: "deep", active: true },
    { time: "10:00", type: "deep", active: true },
    { time: "11:00", type: "deep", active: true },
    { time: "12:00", type: "break", active: false },
    { time: "13:00", type: "meeting", active: false },
    { time: "14:00", type: "open", active: false },
  ];

  return (
    <div className="w-1/3 bg-surface-primary border border-border-default rounded-2xl p-4 shadow-lg flex flex-col group">
      <div className="text-xs text-text-muted font-bold uppercase tracking-wider mb-4">Today's Flow</div>
      <div className="flex-1 flex flex-col gap-2 relative">
        <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border-subtle" />
        
        {blocks.map((b, i) => (
          <div key={i} className="flex items-center gap-3 z-10">
            <motion.div 
              className={`w-5 h-5 rounded-full border-[3px] border-surface-primary flex items-center justify-center ${b.active ? 'bg-interactive-primary' : 'bg-border-default'}`}
              animate={b.active && step >= 1 ? { scale: [1, 1.2, 1], boxShadow: "0 0 10px rgba(var(--color-interactive-primary-rgb), 0.5)" } : {}}
              transition={{ delay: i * 0.1 }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted">{b.time}</span>
              <motion.div 
                className={`text-xs font-semibold ${b.active ? 'text-text-heading' : 'text-text-muted'}`}
                animate={step === 2 && b.type === "open" ? { color: "var(--color-interactive-primary)" } : {}}
              >
                {step >= 2 && b.type === "open" ? "Scheduled Break" : b.type.charAt(0).toUpperCase() + b.type.slice(1)}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};