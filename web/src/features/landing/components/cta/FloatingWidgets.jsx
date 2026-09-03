import React from 'react';
import { motion } from 'framer-motion';

const WidgetBase = ({ children, className, style, initial, animate, transition }) => (
  <motion.div 
    initial={initial}
    animate={animate}
    transition={transition}
    style={style}
    className={`absolute p-4 rounded-2xl bg-surface-secondary/60 border border-border-default backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-none hidden md:flex flex-col ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-text-heading/5 to-transparent opacity-50" />
    <div className="relative z-10 w-full h-full">
      {children}
    </div>
  </motion.div>
);

export const FloatingWidgets = ({ mousePosition }) => {
  // Translate mouse position (-1 to 1) into subtle parallax shifts
  const shiftX = mousePosition.x * 20;
  const shiftY = mousePosition.y * 20;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      
      {/* 365 Day Streak - Top Left */}
      <WidgetBase
        className="top-[15%] left-[10%] w-[160px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: [-10 + shiftY * 0.5, 10 + shiftY * 0.5, -10 + shiftY * 0.5],
          x: [shiftX * 0.5, shiftX * 0.5],
          rotate: [-2, 2, -2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
              <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-text-heading">365</div>
            <div className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Day Streak</div>
          </div>
        </div>
      </WidgetBase>

      {/* AI Suggestion - Bottom Left */}
      <WidgetBase
        className="bottom-[20%] left-[15%] w-[220px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: [10 + shiftY * -0.3, -15 + shiftY * -0.3, 10 + shiftY * -0.3],
          x: [shiftX * -0.3, shiftX * -0.3],
          rotate: [1, -1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">AI Insight</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            You're most productive during the morning. Let's schedule Deep Work at 9 AM.
          </p>
        </div>
      </WidgetBase>

      {/* Today's Focus - Top Right */}
      <WidgetBase
        className="top-[25%] right-[10%] w-[180px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: [-15 + shiftY * 0.4, 15 + shiftY * 0.4, -15 + shiftY * 0.4],
          x: [shiftX * 0.4, shiftX * 0.4],
          rotate: [2, -2, 2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="flex flex-col gap-3">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Today's Focus</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-interactive-primary flex items-center justify-center bg-interactive-primary/20">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-interactive-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <span className="text-xs text-text-heading line-through opacity-50">Review PRs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-border-default" />
            <span className="text-xs text-text-heading">Ship Final CTA</span>
          </div>
        </div>
      </WidgetBase>

      {/* Productivity Score - Bottom Right */}
      <WidgetBase
        className="bottom-[30%] right-[12%] w-[140px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: [15 + shiftY * -0.6, -10 + shiftY * -0.6, 15 + shiftY * -0.6],
          x: [shiftX * -0.6, shiftX * -0.6],
          rotate: [-1, 2, -1]
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="flex flex-col items-center justify-center gap-2 text-center py-2">
          <div className="relative w-16 h-16 rounded-full border-4 border-surface-primary flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="26" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <circle cx="30" cy="30" r="26" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="163" strokeDashoffset="40" className="text-green-400" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-bold text-text-heading">94</span>
          </div>
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Score</span>
        </div>
      </WidgetBase>
    </div>
  );
};
