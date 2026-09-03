import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Preparing your workspace...",
  "Loading your journey...",
  "Organizing your future...",
  "Building momentum...",
  "Almost ready..."
];

export const LoaderText = ({ isExiting }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isExiting) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); // 3 seconds per message is very comfortable to read
    return () => clearInterval(interval);
  }, [isExiting]);

  return (
    <div className="absolute bottom-16 left-0 right-0 h-6 flex justify-center items-center pointer-events-none">
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.p
            key={index}
            className="text-text-muted text-sm font-medium tracking-wide"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {messages[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};