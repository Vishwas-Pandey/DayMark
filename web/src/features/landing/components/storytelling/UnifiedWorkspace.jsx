import React from 'react';
import { motion } from 'framer-motion';

export const UnifiedWorkspace = () => {
  return (
    <div className="w-full max-w-4xl aspect-[16/9] bg-surface-primary/80 backdrop-blur-xl border border-interactive-primary/30 rounded-2xl shadow-[0_0_80px_rgba(var(--color-interactive-primary-rgb),0.2)] overflow-hidden flex flex-col transform-gpu">
      {/* Top Bar */}
      <div className="h-12 border-b border-border-subtle bg-surface-secondary/50 flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-border-default" />
          <div className="w-3 h-3 rounded-full bg-border-default" />
          <div className="w-3 h-3 rounded-full bg-border-default" />
        </div>
        <div className="h-4 w-32 bg-border-default/50 rounded-full" />
        <div className="w-6 h-6 rounded-full bg-interactive-primary/20" />
      </div>
      
      {/* Content Grid */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-6">
        {/* Unified Layout representing clarity */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="flex-1 bg-surface-secondary/50 border border-border-subtle rounded-xl p-4 flex flex-col gap-3">
            <div className="h-4 w-24 bg-text-heading/20 rounded" />
            <div className="flex-1 border-l-2 border-interactive-primary pl-4 flex flex-col justify-center gap-2">
              <div className="h-3 w-full bg-text-muted/30 rounded" />
              <div className="h-3 w-3/4 bg-text-muted/30 rounded" />
            </div>
          </div>
          <div className="flex-1 bg-surface-secondary/50 border border-border-subtle rounded-xl p-4 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-interactive-primary/20 relative flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-interactive-primary rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
              <div className="text-xl font-bold text-interactive-primary">100%</div>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 bg-surface-secondary/50 border border-border-subtle rounded-xl p-6 relative overflow-hidden group">
          <div className="h-6 w-32 bg-text-heading/20 rounded mb-6" />
          <div className="flex flex-col gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-interactive-primary shadow-[0_0_10px_rgba(var(--color-interactive-primary-rgb),0.5)]" />
                <div className="flex-1 h-3 bg-text-muted/20 rounded" />
              </div>
            ))}
          </div>
          {/* Subtle breathing glow */}
          <motion.div 
            className="absolute bottom-0 right-0 w-64 h-64 bg-interactive-primary/10 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};