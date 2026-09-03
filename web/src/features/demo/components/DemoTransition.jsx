import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';

export const DemoTransition = () => {
  const { isTransitioning, endTransition } = useDemoStore();

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        endTransition();
      }, 2500); // 2.5s cinematic transition
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, endTransition]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-primary/80 backdrop-blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div 
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Logo */}
            <div className="w-16 h-16 rounded-2xl bg-interactive-primary shadow-[0_0_40px_rgba(var(--color-interactive-primary-rgb),0.5)] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            
            {/* Loading text sequence */}
            <div className="h-6 relative overflow-hidden flex items-center justify-center min-w-[200px]">
              <motion.div
                className="absolute text-sm font-semibold tracking-widest text-text-muted uppercase"
                animate={{ y: ["100%", "0%", "0%", "-100%"] }}
                transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
              >
                Initializing Workspace
              </motion.div>
              <motion.div
                className="absolute text-sm font-semibold tracking-widest text-text-heading uppercase"
                initial={{ y: "100%" }}
                animate={{ y: ["100%", "100%", "0%", "0%"] }}
                transition={{ duration: 1.5, delay: 1, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
              >
                Loading Demo Data
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};