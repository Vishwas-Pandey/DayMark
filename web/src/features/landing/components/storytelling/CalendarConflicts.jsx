import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const CalendarConflicts = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, -80]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, -20]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [8, -15]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute top-[45%] left-[25%] w-56 h-32 bg-surface-secondary/30 border border-border-default rounded-xl shadow-lg backdrop-blur-md p-2 relative opacity-80"
    >
      <div className="absolute top-4 left-4 right-8 h-8 bg-blue-900/30 border border-blue-700/50 rounded flex items-center px-2 z-10 text-[10px] text-blue-400">Overlap</div>
      <div className="absolute top-8 left-8 right-4 h-8 bg-purple-900/30 border border-purple-700/50 rounded flex items-center px-2 z-20 text-[10px] text-purple-400">Conflict</div>
      <div className="absolute top-12 left-2 right-12 h-8 bg-red-900/30 border border-red-700/50 rounded flex items-center px-2 z-30 text-[10px] text-red-400">Missed</div>
    </motion.div>
  );
};