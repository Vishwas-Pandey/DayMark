import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const HabitWidget = ({ activeStepRaw }) => {
  // Animate the habit streak filling up during Step 1
  const progress = useTransform(activeStepRaw, [0.8, 1.2], [0, 1]);
  
  return (
    <div className="w-full max-w-md bg-surface-secondary/50 border border-border-default rounded-xl p-6 shadow-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-heading">Deep Work Streak</h3>
        <motion.div 
          className="px-3 py-1 bg-orange-500/10 text-orange-500 font-bold rounded-full text-sm flex items-center gap-1"
          style={{ scale: useTransform(progress, [0.8, 0.9, 1], [1, 1.2, 1]) }}
        >
          🔥 <motion.span>{useTransform(progress, p => Math.floor(12 + (p > 0.8 ? 1 : 0)))}</motion.span> Days
        </motion.div>
      </div>

      <div className="flex gap-2 justify-between">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
          const isToday = i === 4;
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-xs text-text-muted font-medium">{day}</div>
              <motion.div 
                className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: i < 4 
                    ? 'rgba(var(--color-interactive-primary-rgb), 0.2)' 
                    : isToday ? 'var(--color-surface-primary)' : 'rgba(var(--color-border-default-rgb), 0.5)',
                  border: isToday ? '2px solid rgba(var(--color-interactive-primary-rgb), 0.3)' : 'none'
                }}
              >
                {i < 4 && <div className="w-3 h-3 rounded-full bg-interactive-primary" />}
                {isToday && (
                  <motion.div 
                    className="absolute inset-0 bg-interactive-primary/20 origin-bottom"
                    style={{ scaleY: useTransform(progress, [0, 0.8], [0, 1]) }}
                  />
                )}
                {isToday && (
                  <motion.div 
                    className="absolute w-3 h-3 rounded-full bg-interactive-primary"
                    style={{ 
                      scale: useTransform(progress, [0.7, 0.9, 1], [0, 1.2, 1]),
                      opacity: useTransform(progress, [0.7, 0.8], [0, 1])
                    }}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};