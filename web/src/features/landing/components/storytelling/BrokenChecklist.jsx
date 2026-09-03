import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const BrokenChecklist = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, 100]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, -60]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [5, 30]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute top-[15%] right-[15%] w-56 bg-surface-secondary/50 border border-border-default p-4 rounded-xl shadow-lg backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3 opacity-50">
        <div className="w-4 h-4 rounded border border-red-500/50" />
        <div className="h-2 w-2/3 bg-text-heading/20 rounded" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 rounded border border-border-default" />
        <div className="h-2 w-1/2 bg-text-heading/40 rounded" />
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <div className="w-4 h-4 rounded border border-red-500/50" />
        <div className="h-2 w-3/4 bg-text-heading/20 rounded" />
      </div>
    </motion.div>
  );
};