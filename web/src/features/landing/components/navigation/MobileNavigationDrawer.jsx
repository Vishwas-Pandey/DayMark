import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { NavigationCTA } from './NavigationCTA';

import { scrollToSection } from '../../../../hooks/useActiveSection';
const links = [
  { label: 'Home', id: 'hero' },
  { label: 'Features', id: 'features' },
  { label: 'AI', id: 'ai' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'About', id: 'about' },
];

export const MobileNavigationDrawer = ({ isOpen, close }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => e.key === 'Escape' && close();
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, close]);

  if (typeof document === 'undefined') return null;

  let portalRoot = document.getElementById('drawer-portal');
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'drawer-portal';
    document.body.appendChild(portalRoot);
  }

  const containerVariants = {
    hidden: { x: '100%', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' },
    visible: { 
      x: 0, 
      borderTopLeftRadius: '0px', 
      borderBottomLeftRadius: '0px',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[55]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-surface-primary/60"
            onClick={close}
          />
          
          {/* Drawer */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-surface-primary border-l border-border-default shadow-floating flex flex-col p-6 overflow-y-auto"
          >
            {/* Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />
            
            <div className="mt-16 flex flex-col gap-6 relative z-10">
              <motion.div 
                className="flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
              >
                {links.map((link, idx) => (
                  <motion.a 
                    key={idx} 
                    href={`/#${link.id}`}
                    onClick={(e) => {
                      scrollToSection(e, link.id);
                      close();
                    }}
                    variants={itemVariants}
                    className="text-2xl font-medium text-text-muted hover:text-text-heading transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8 pt-8 border-t border-border-subtle flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <ThemeToggle />
                <NavigationCTA />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};