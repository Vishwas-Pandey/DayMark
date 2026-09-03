import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const LoaderLogo = ({ isExiting }) => {
  const shouldReduceMotion = useReducedMotion();

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  };

  const fillVariants = {
    hidden: { fillOpacity: 0 },
    visible: {
      fillOpacity: 1,
      transition: { delay: 0.9, duration: 0.8, ease: 'easeOut' }
    }
  };

  const wrapperVariants = {
    hidden: { scale: 1, filter: 'drop-shadow(0 0 0px rgba(79, 70, 229, 0))', opacity: 1 },
    visible: {
      scale: [1, 1.02, 1],
      filter: [
        'drop-shadow(0 0 0px rgba(79, 70, 229, 0))', 
        'drop-shadow(0 0 16px rgba(79, 70, 229, 0.4))',
        'drop-shadow(0 0 8px rgba(79, 70, 229, 0.2))'
      ],
      transition: { delay: 1, duration: 3, ease: 'easeInOut', repeat: Infinity }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(8px) drop-shadow(0 0 0px rgba(79, 70, 229, 0))',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (shouldReduceMotion) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="relative z-10 text-text-heading"
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z"/>
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative z-10 text-text-heading"
      variants={wrapperVariants}
      initial="hidden"
      animate={isExiting ? "exit" : "visible"}
    >
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <motion.path 
          d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z"
          variants={pathVariants}
        />
        <motion.path 
          d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z"
          fill="currentColor"
          stroke="none"
          variants={fillVariants}
        />
      </svg>
    </motion.div>
  );
};