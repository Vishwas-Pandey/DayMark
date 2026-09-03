import React from 'react';
import { motion } from 'framer-motion';

export const GoalProgressBar = ({ percentage, colorClass = 'bg-interactive-primary', heightClass = 'h-2' }) => {
  return (
    <div className={`w-full bg-surface-secondary rounded-full overflow-hidden ${heightClass}`}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full rounded-full ${colorClass}`}
      />
    </div>
  );
};
