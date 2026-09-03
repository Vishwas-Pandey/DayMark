import React from 'react';
import { motion } from 'framer-motion';

export const LoaderOverlay = ({ children }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-surface-primary"
      role="alert"
      aria-live="polite"
      aria-label="Loading DayMark"
      initial={{ opacity: 1, backdropFilter: 'blur(0px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(24px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Sync with Hero fade
    >
      {children}
    </motion.div>
  );
};