import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const MissedReminders = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, -150]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, 80]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [-8, -25]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute bottom-[20%] left-[5%] w-40 bg-red-900/20 border border-red-900/50 p-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center text-red-500 text-xs">!</div>
      <div className="flex flex-col gap-1 w-full">
        <div className="h-2 w-full bg-red-700/50 rounded" />
        <div className="h-2 w-1/2 bg-red-700/30 rounded" />
      </div>
    </motion.div>
  );
};