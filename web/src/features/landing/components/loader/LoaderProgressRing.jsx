import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const LoaderProgressRing = ({ isExiting }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isExiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.svg width="140" height="140" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-border-default)" strokeWidth="1" opacity="0.1" />
        
        {/* Continuous sweep animation instead of precise progress */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="46" 
          fill="none" 
          stroke="url(#gradient)" 
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0.1, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-interactive-primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-interactive-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Subtle pulse glow for the ring */}
      <motion.div 
        className="absolute w-[140px] h-[140px] rounded-full border border-interactive-primary"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.2, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  );
};