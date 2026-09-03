import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDemoStore } from '../store/useDemoStore';

export const DemoWelcomeOverlay = () => {
  const { showWelcome, closeWelcome, isTransitioning } = useDemoStore();

  if (isTransitioning) return null;

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div 
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dimmed backdrop */}
          <motion.div 
            className="absolute inset-0 bg-surface-primary/40 backdrop-blur-sm"
            onClick={closeWelcome}
            exit={{ opacity: 0 }}
          />
          
          <motion.div 
            className="relative w-full max-w-lg bg-surface-primary border border-interactive-primary/30 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
            initial={{ y: 40, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.2 }}
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-interactive-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-xl bg-interactive-primary/20 text-interactive-primary flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
              </div>
              
              <h2 className="text-2xl font-bold text-text-heading mb-3">Welcome to DayMark Demo</h2>
              <p className="text-text-muted mb-6 leading-relaxed">
                Explore every feature. Play with the dashboard, complete tasks, and watch how the system reacts. 
                <br/><br/>
                <span className="text-text-heading font-medium">Note: Nothing you change will be saved.</span> Session resets on refresh.
              </p>
              
              <div className="flex w-full gap-3">
                <button 
                  aria-label="Skip Tour"
                  onClick={closeWelcome}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-surface-secondary text-text-heading hover:bg-border-default transition-colors border border-border-default focus-ring"
                >
                  Skip Tour
                </button>
                <button 
                  aria-label="Start Exploring"
                  onClick={closeWelcome}
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-interactive-primary text-text-heading hover:bg-interactive-primary/90 transition-colors shadow-lg shadow-interactive-primary/25 focus-ring"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};