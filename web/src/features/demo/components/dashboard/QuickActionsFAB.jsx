import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickActionsFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const actions = [
    { name: "New Task", icon: "M12 5v14M5 12h14" },
    { name: "Log Mood", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" },
    { name: "Start Timer", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-end gap-4">
      <motion.button 
        aria-label="Quick actions"
        className="w-14 h-14 rounded-2xl bg-interactive-primary text-text-heading shadow-[0_0_30px_rgba(var(--color-interactive-primary-rgb),0.5)] flex items-center justify-center focus-ring outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col-reverse items-end gap-3 mb-2">
            {actions.map((action, i) => (
              <motion.button
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border-default shadow-xl hover:bg-surface-primary hover:border-interactive-primary group transition-colors"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: -5 }}
              >
                <span className="text-sm font-medium text-text-heading">{action.name}</span>
                <div className="w-8 h-8 rounded-lg bg-surface-primary flex items-center justify-center text-interactive-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={action.icon}></path></svg>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};