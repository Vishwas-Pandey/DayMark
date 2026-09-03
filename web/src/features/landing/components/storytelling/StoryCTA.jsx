import React from 'react';
import { motion, useTransform } from 'framer-motion';

export const StoryCTA = ({ scrollProgress }) => {
  const op = useTransform(scrollProgress, [0.8, 0.9], [0, 1]);
  const y = useTransform(scrollProgress, [0.8, 0.9], [10, 0]);
  const pointerEvents = useTransform(scrollProgress, p => p > 0.8 ? 'auto' : 'none');

  return (
    <motion.div style={{ opacity: op, y, pointerEvents }} className="flex flex-col items-center">
      <p className="text-text-muted mb-6">Ready to take control of your day?</p>
      <button className="px-8 py-3.5 rounded-lg bg-text-heading text-surface-primary font-semibold shadow-lg hover:scale-105 transition-transform focus-ring outline-none">
        Start Building Better Days
      </button>
    </motion.div>
  );
};