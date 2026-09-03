import React from 'react';
import { motion } from 'framer-motion';

export const JournalPreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-x-8 bottom-0 top-4 bg-surface-primary border border-border-default rounded-t-xl p-5 shadow-xl flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded bg-green-500/20 text-green-500 flex items-center justify-center text-xs">🌿</div>
        <span className="text-xs font-medium text-text-muted">Morning Entry</span>
      </div>
      <div className="flex-1 border-l-2 border-border-subtle pl-4 relative">
        <p className="text-sm text-text-heading leading-relaxed">
          I'm feeling incredibly focused today. The new architecture is finally coming together.
        </p>
        <motion.div 
          className="absolute -left-[5px] top-0 w-2 h-0 bg-interactive-primary rounded-full"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};