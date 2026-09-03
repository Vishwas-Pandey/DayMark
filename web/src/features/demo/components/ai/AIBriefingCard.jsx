import React from 'react';
import { motion } from 'framer-motion';

export const AIBriefingCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 rounded-2xl bg-surface-secondary/30 backdrop-blur-md border border-border-default overflow-hidden group hover:border-interactive-primary/50 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-interactive-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <h3 className="text-lg font-bold text-text-heading relative z-10 mb-4 flex items-center gap-2">
        Executive Briefing
        <span className="px-2 py-0.5 rounded text-[10px] bg-interactive-primary/20 text-interactive-primary font-bold uppercase tracking-wider">Live</span>
      </h3>
      
      <div className="space-y-4 relative z-10">
        <p className="text-sm text-text-muted leading-relaxed">
          <strong className="text-text-heading font-semibold">Good Morning Vishwas.</strong><br/>
          You slept 7h 42m. Your productivity is expected to peak between <span className="text-interactive-primary">9:10</span> and <span className="text-interactive-primary">11:20</span>.
        </p>
        <p className="text-sm text-text-muted leading-relaxed">
          Today's calendar contains one focus conflict. Completing your workout before 8:30 AM increases your completion probability by <strong className="text-text-heading">31%</strong>.
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-3 rounded-xl bg-surface-primary border border-border-subtle">
            <div className="text-xs text-text-muted font-medium mb-1">Productive Hours</div>
            <div className="text-2xl font-bold text-text-heading">5.8<span className="text-sm text-text-muted ml-1">est</span></div>
          </div>
          <div className="p-3 rounded-xl bg-surface-primary border border-border-subtle">
            <div className="text-xs text-text-muted font-medium mb-1">Daily Confidence</div>
            <div className="text-2xl font-bold text-green-400">92%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};