import React from 'react';
import { motion } from 'framer-motion';

export const AIInsightsPreview = ({ isHovered }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <motion.div 
        className="w-full bg-surface-primary border border-interactive-primary/30 rounded-xl p-4 shadow-[0_0_30px_rgba(var(--color-interactive-primary-rgb),0.1)] relative overflow-hidden"
        animate={{ y: isHovered ? -5 : 0 }}
      >
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-interactive-primary to-[#38bdf8]"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="flex items-center gap-3 mb-3">
          <div className="text-xl">✨</div>
          <div className="text-xs font-semibold text-interactive-primary">DayMark AI</div>
        </div>
        <p className="text-sm text-text-heading leading-relaxed">
          {isHovered ? (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              Your focus peaks between <strong>9AM and 11AM</strong>. Schedule deep work here tomorrow.
            </motion.span>
          ) : (
            <span className="text-text-muted">Analyzing your recent routine...</span>
          )}
        </p>
      </motion.div>
    </div>
  );
};