import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../../context/AuthProvider';

export const NavigationCTA = () => {
  let isAuthenticated = false;
  try {
    const auth = useAuthContext();
    isAuthenticated = auth?.isAuthenticated;
  } catch (e) {
    // Fallback
  }

  const targetPath = isAuthenticated ? '/dashboard' : '/signup';
  const label = isAuthenticated ? 'Dashboard' : 'Get Started';

  return (
    <Link to={targetPath} className="hidden sm:block focus-ring rounded-full">
      <motion.button 
        className="px-5 py-2 text-sm font-medium text-surface-primary bg-text-heading rounded-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-surface-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10">{label}</span>
      </motion.button>
    </Link>
  );
};
