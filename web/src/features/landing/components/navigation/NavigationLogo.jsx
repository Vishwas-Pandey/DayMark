import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const NavigationLogo = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 50], [1, 0.96]);

  return (
    <motion.a 
      href="/"
      className="relative flex items-center gap-2 focus-ring rounded-md p-1 outline-none group"
      style={{ scale }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div className="relative text-text-heading">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z"/>
        </svg>
        {/* Soft glow on hover */}
        <motion.div 
          className="absolute inset-0 bg-interactive-primary rounded-full blur-md -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
        />
      </motion.div>
      <span className="font-semibold text-lg tracking-tight text-text-heading group-hover:tracking-normal transition-all duration-300">DayMark</span>
    </motion.a>
  );
};