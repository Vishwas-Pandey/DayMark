import React from 'react';
import { motion } from 'framer-motion';

export const HabitTrackerPreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-x-8 bottom-0 top-0 mt-8 flex flex-col gap-4">
      {/* Main progress ring */}
      <div className="relative w-32 h-32 mx-auto mt-4 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border-default)" strokeWidth="8" opacity="0.3" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="var(--color-interactive-primary)" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: isHovered ? 60 : 120 }}
            transition={{ duration: 1, type: "spring", bounce: 0 }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <motion.span 
            className="text-3xl font-bold text-text-heading"
          >
            {isHovered ? "80%" : "57%"}
          </motion.span>
        </div>
      </div>
      
      {/* Weekly Heatmap Mock */}
      <div className="w-full bg-surface-primary border border-border-default rounded-xl p-4 mt-auto mb-8 shadow-xl flex justify-between items-end h-32 relative overflow-hidden">
        {/* Bars */}
        {[30, 45, 60, 40, 80, 50, 90].map((val, i) => (
          <div key={i} className="w-8 flex flex-col gap-2 items-center z-10">
            <motion.div 
              className="w-full bg-interactive-primary rounded-t-sm"
              initial={{ height: `${val * 0.5}%` }}
              animate={{ height: isHovered ? `${val}%` : `${val * 0.5}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
            <span className="text-[10px] text-text-muted font-medium">{['M','T','W','T','F','S','S'][i]}</span>
          </div>
        ))}
        {/* Confetti / Glow burst on hover */}
        <motion.div 
          className="absolute inset-0 bg-interactive-primary/10 rounded-xl filter blur-xl z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};