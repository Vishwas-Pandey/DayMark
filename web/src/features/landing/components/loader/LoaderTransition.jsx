import React from 'react';
import { motion } from 'framer-motion';
import { useLoader } from './LoaderProvider';

// The Hero/App content goes inside here. It preloads and opacity scales up.
export const LoaderTransition = ({ children }) => {
  const { isAppReady } = useLoader();

  return (
    <motion.div
      initial={{ opacity: 0.4, filter: 'blur(20px)', scale: 0.98 }}
      animate={isAppReady ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0.4, filter: 'blur(20px)', scale: 0.98 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-0 min-h-[100dvh]"
    >
      {children}
    </motion.div>
  );
};