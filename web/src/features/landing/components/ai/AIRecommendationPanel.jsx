import React from 'react';
import { motion } from 'framer-motion';

export const AIRecommendationPanel = ({ step }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="absolute w-full max-w-sm bg-surface-primary/90 backdrop-blur-xl border border-border-default rounded-2xl p-6 shadow-2xl flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold text-text-heading text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-interactive-primary" />
          Suggestion
        </div>
        <div className="text-[10px] font-bold text-interactive-primary bg-interactive-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
          High Impact
        </div>
      </div>
      
      <p className="text-text-heading text-lg font-medium leading-tight">
        Schedule a 45-minute recovery walk at 14:00.
      </p>
      
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <span>Confidence:</span>
        <div className="flex-1 h-1.5 bg-border-default rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-interactive-primary"
            initial={{ width: 0 }}
            animate={{ width: "95%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <span className="font-semibold text-text-heading">95%</span>
      </div>

      <motion.button 
        className={`mt-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${step === 3 ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-interactive-primary text-text-heading hover:bg-interactive-primary/90'}`}
        animate={step === 3 ? { scale: [1, 1.05, 1] } : {}}
      >
        {step === 3 ? "Timeline Updated" : "Apply to Timeline"}
      </motion.button>
    </motion.div>
  );
};