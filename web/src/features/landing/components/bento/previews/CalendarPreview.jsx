import React from 'react';
import { motion } from 'framer-motion';

export const CalendarPreview = ({ isHovered }) => {
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const activeDay = 26;

  return (
    <div className="absolute inset-x-8 bottom-8 top-0 mt-4 bg-surface-primary border border-border-default rounded-xl p-4 shadow-xl flex flex-col">
      <div className="text-sm font-semibold text-text-heading mb-4">June 2026</div>
      <div className="grid grid-cols-7 gap-2 flex-1">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={`dow-${i}`} className="text-[10px] text-text-muted text-center font-medium">{d}</div>
        ))}
        {/* Empty slots */}
        {[1,2].map(i => <div key={`e${i}`} />)}
        
        {days.map(d => {
          const isActive = d === activeDay;
          const hasMood = d % 3 === 0;
          return (
            <motion.div 
              key={d} 
              className={`relative rounded-md flex items-center justify-center text-xs font-medium ${isActive ? 'text-surface-primary' : 'text-text-muted'}`}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--color-surface-secondary-rgb), 1)' }}
            >
              {isActive && (
                <motion.div 
                  className="absolute inset-0 bg-interactive-primary rounded-md -z-10"
                  layoutId="activeDay"
                  animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                />
              )}
              {d}
              {hasMood && !isActive && (
                <motion.div 
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-[#38bdf8]"
                  animate={isHovered ? { y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.3, delay: (d%10) * 0.05 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};