import React from 'react';
import { motion } from 'framer-motion';

export const GoalProgressPreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <div className="w-full bg-surface-primary border border-border-default rounded-xl p-4 shadow-xl">
        <div className="flex justify-between items-end mb-3">
          <div className="text-sm font-semibold text-text-heading">Ship V1</div>
          <div className="text-xs font-bold text-interactive-primary">75%</div>
        </div>
        <div className="h-3 w-full bg-surface-secondary rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-interactive-primary rounded-full relative"
            initial={{ width: "30%" }}
            animate={{ width: isHovered ? "75%" : "30%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-text-heading/30" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-3 text-[10px] text-text-muted font-medium uppercase tracking-wider">
          <span>Sprint 1</span>
          <span>Sprint 2</span>
          <span>Launch</span>
        </div>
      </div>
    </div>
  );
};