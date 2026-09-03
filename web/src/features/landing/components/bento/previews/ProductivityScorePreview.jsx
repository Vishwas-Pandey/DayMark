import React from 'react';
import { motion } from 'framer-motion';

export const ProductivityScorePreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        className="relative flex items-center justify-center"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        <svg viewBox="0 0 100 100" className="w-32 h-32 transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-default)" strokeWidth="6" opacity="0.3" strokeDasharray="4 4" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-interactive-primary)" 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: isHovered ? 40 : 180 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.1 }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <motion.span className="text-4xl font-bold text-text-heading">
            {isHovered ? "92" : "64"}
          </motion.span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted mt-1">Score</span>
        </div>
      </motion.div>
    </div>
  );
};