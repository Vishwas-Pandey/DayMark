import React from 'react';
import { motion } from 'framer-motion';
import { AITypingIndicator } from './AITypingIndicator';

export const AILearningCard = ({ step }) => {
  return (
    <div className="flex-1 bg-surface-primary border border-border-default rounded-2xl p-5 shadow-lg flex flex-col group">
      <div className="flex items-center gap-2 mb-3">
        <motion.div 
          className="w-2 h-2 rounded-full bg-interactive-primary"
          animate={{ scale: step === 0 ? [1, 1.5, 1] : 1, opacity: step === 0 ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs font-bold tracking-widest text-text-muted uppercase">Live Context</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center text-sm font-medium text-text-heading leading-relaxed">
        {step === 0 && (
          <div className="flex items-center gap-2 text-text-muted">
            <AITypingIndicator /> Scanning timeline...
          </div>
        )}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            Detected: Three consecutive deep work sessions completed this morning.
          </motion.div>
        )}
      </div>
    </div>
  );
};