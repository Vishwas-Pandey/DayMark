import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const ScatteredGoals = ({ scrollProgress }) => {
  const x = useTransform(scrollProgress, [0, 0.4], [0, 50]);
  const y = useTransform(scrollProgress, [0, 0.4], [0, 100]);
  const rotate = useTransform(scrollProgress, [0, 0.4], [15, 45]);

  return (
    <motion.div 
      style={{ x, y, rotate }}
      className="absolute bottom-[10%] right-[20%] w-32 h-32 bg-surface-secondary/40 border border-border-default rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center opacity-60"
    >
      <svg viewBox="0 0 100 100" className="w-24 h-24">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-border-default" strokeDasharray="50 200" />
      </svg>
    </motion.div>
  );
};