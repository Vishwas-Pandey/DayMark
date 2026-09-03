import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const TaskWidget = ({ activeStepRaw }) => {
  // Animate the checkbox being clicked as the user scrolls through Step 0
  const progress = useTransform(activeStepRaw, [0, 0.5], [0, 1]);
  const isChecked = useTransform(progress, v => v > 0.6);
  const pathLength = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <div className="w-full max-w-md bg-surface-secondary/50 border border-border-default rounded-xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-text-heading mb-4">Today's Focus</h3>
      
      <div className="flex flex-col gap-3">
        <TaskItem title="Finalize Q3 Roadmap" checked={true} />
        
        <motion.div 
          className="flex items-center gap-3 p-3 rounded-lg bg-surface-primary border border-border-subtle relative overflow-hidden"
          whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        >
          <motion.div 
            className="w-5 h-5 rounded-md border-2 border-border-default flex items-center justify-center"
            style={{ 
              borderColor: useTransform(isChecked, c => c ? 'var(--color-interactive-primary)' : 'var(--color-border-default)'),
              backgroundColor: useTransform(isChecked, c => c ? 'var(--color-interactive-primary)' : 'transparent')
            }}
          >
            <motion.svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
              <motion.path d="M20 6L9 17l-5-5" style={{ pathLength }} />
            </motion.svg>
          </motion.div>
          <motion.span 
            className="text-sm font-medium"
            style={{ 
              color: useTransform(isChecked, c => c ? 'var(--color-text-muted)' : 'var(--color-text-heading)'),
              textDecoration: useTransform(isChecked, c => c ? 'line-through' : 'none')
            }}
          >
            Review architectural designs
          </motion.span>
          <motion.div 
            className="absolute inset-0 bg-interactive-primary/10 pointer-events-none"
            style={{ opacity: useTransform(progress, [0.6, 0.8, 1], [0, 1, 0]) }}
          />
        </motion.div>
        
        <TaskItem title="Prepare team sync" checked={false} />
      </div>
    </div>
  );
};

const TaskItem = ({ title, checked }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:bg-surface-secondary transition-colors">
    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${checked ? 'bg-interactive-primary border-interactive-primary' : 'border-border-default'}`}>
      {checked && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>}
    </div>
    <span className={`text-sm font-medium ${checked ? 'text-text-muted line-through' : 'text-text-heading'}`}>{title}</span>
  </div>
);