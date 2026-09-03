import React from 'react';
import { motion } from 'framer-motion';

export const NavigationItem = ({ label, href, isActive, isHovered, onHover, onLeave, onClick }) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="relative px-4 py-2 text-sm font-medium rounded-md focus-ring outline-none group transition-colors duration-200"
      animate={{ color: isHovered || isActive ? 'var(--color-text-heading)' : 'var(--color-text-muted)' }}
      whileHover={{ y: -2 }} // lift 2px
      whileTap={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <span className="relative z-10">{label}</span>
      
      {/* Shared Layout Indicator */}
      {isHovered && (
        <motion.div
          layoutId="nav-hover-indicator"
          className="absolute inset-0 bg-surface-secondary/50 rounded-md -z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
      
      {/* Active Underline */}
      {isActive && (
        <motion.div
          layoutId="nav-active-indicator"
          className="absolute bottom-0 left-3 right-3 h-[2px] bg-interactive-primary rounded-t-full"
        />
      )}
    </motion.a>
  );
};