import React from 'react';
import { motion } from 'framer-motion';

export const AITypingIndicator = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 bg-interactive-primary rounded-full"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);