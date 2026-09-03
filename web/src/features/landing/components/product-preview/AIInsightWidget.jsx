import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const AIInsightWidget = ({ activeStepRaw }) => {
  const opacity = useTransform(activeStepRaw, [3.8, 4.0], [0, 1]);
  const y = useTransform(activeStepRaw, [3.8, 4.0], [20, 0]);
  const glow = useTransform(activeStepRaw, [4.0, 4.2], [0, 1]);
  
  return (
    <motion.div 
      className="w-full max-w-md bg-surface-secondary/80 backdrop-blur-md border border-interactive-primary/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
      style={{ opacity, y }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-interactive-primary/20 to-transparent pointer-events-none"
        style={{ opacity: glow }}
      />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-interactive-primary/20 border border-interactive-primary flex items-center justify-center shrink-0">
          <span className="text-lg">✨</span>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-base font-semibold text-text-heading">Pattern Identified</h4>
          <p className="text-sm text-text-muted leading-relaxed">
            I noticed you've completed your focus sessions <strong>three days in a row</strong>. Keep your momentum by scheduling tomorrow's deep work block right now.
          </p>
          <button className="mt-2 self-start px-4 py-2 bg-interactive-primary text-text-heading text-xs font-semibold rounded-lg hover:bg-interactive-primary/90 transition-colors">
            Schedule Block
          </button>
        </div>
      </div>
    </motion.div>
  );
};