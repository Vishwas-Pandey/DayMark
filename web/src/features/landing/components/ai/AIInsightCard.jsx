import React from 'react';
import { motion } from 'framer-motion';

export const AIInsightCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="absolute w-full max-w-sm bg-surface-primary/90 backdrop-blur-xl border border-interactive-primary/40 rounded-2xl p-6 shadow-[0_10px_40px_rgba(var(--color-interactive-primary-rgb),0.2)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-interactive-primary/20 flex items-center justify-center text-lg">✨</div>
        <div className="font-semibold text-text-heading text-sm">Pattern Identified</div>
      </div>
      <p className="text-text-muted text-sm leading-relaxed">
        You've completed <strong>100%</strong> of your planned focus time this morning. Your mood generally dips if you don't take a prolonged break after intense sessions.
      </p>
    </motion.div>
  );
};