import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroDashboard = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const tiltX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const tiltY = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={ref} className="relative z-20 perspective-[2000px] h-full min-h-[500px] lg:min-h-[600px] w-full flex items-center justify-center">
      <motion.div 
        className="relative w-full max-w-[600px] aspect-[4/3] transform-gpu preserve-3d"
        style={{ rotateX: tiltX, rotateY: tiltY, y }}
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2.4 }}
      >
        <DashboardFrame />
      </motion.div>
    </div>
  );
};

const DashboardFrame = () => (
  <div className="absolute inset-0 bg-surface-primary/80 backdrop-blur-xl border border-border-default rounded-2xl shadow-2xl overflow-hidden flex flex-col">
    {/* Mac OS style header */}
    <div className="h-10 border-b border-border-subtle flex items-center px-4 gap-2 bg-surface-secondary/50">
      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
    </div>
    <div className="flex-1 p-6 grid grid-cols-12 gap-4">
      {/* Mock Widgets */}
      <Widget className="col-span-12 sm:col-span-8 row-span-2" delay={2.6}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="h-4 w-24 bg-border-default rounded mb-2"></div>
            <div className="h-8 w-48 bg-text-heading/10 rounded"></div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5,6,7].map(i => (
              <motion.div 
                key={i} 
                className="flex-1 h-16 bg-interactive-primary/20 rounded-md"
                initial={{ height: 10 }}
                animate={{ height: Math.random() * 40 + 20 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </Widget>
      
      <Widget className="col-span-12 sm:col-span-4 row-span-2 bg-gradient-to-br from-interactive-primary/10 to-transparent" delay={2.7}>
        <div className="h-full flex flex-col items-center justify-center">
          <motion.div 
            className="w-16 h-16 rounded-full border-4 border-interactive-primary flex items-center justify-center text-interactive-primary font-bold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            98
          </motion.div>
          <div className="mt-2 text-sm text-text-muted">Productivity</div>
        </div>
      </Widget>

      <Widget className="col-span-12 row-span-1 flex items-center gap-4" delay={2.8}>
        <motion.div className="w-6 h-6 rounded border-2 border-interactive-primary flex items-center justify-center bg-interactive-primary/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-interactive-primary">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </motion.div>
        <div className="flex-1">
          <div className="h-4 w-1/3 bg-text-heading/10 rounded mb-1"></div>
          <div className="h-3 w-1/4 bg-border-default rounded"></div>
        </div>
      </Widget>
      
      {/* Floating Overlays */}
      <FloatingJournal delay={3.0} />
      <FloatingNotification delay={3.2} />
    </div>
  </div>
);

const Widget = ({ children, className, delay }) => (
  <motion.div 
    className={`bg-surface-secondary/50 border border-border-subtle rounded-xl p-4 shadow-sm ${className}`}
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const FloatingJournal = ({ delay }) => (
  <motion.div 
    className="absolute -right-6 -bottom-6 w-48 bg-surface-primary border border-border-default rounded-xl p-4 shadow-2xl z-30"
    initial={{ opacity: 0, x: 20, rotate: 5 }}
    animate={{ opacity: 1, x: 0, rotate: -2, y: [-5, 5, -5] }}
    transition={{ 
      opacity: { duration: 0.6, delay },
      x: { duration: 0.6, delay },
      rotate: { duration: 0.6, delay },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <div className="text-xs font-semibold text-text-muted mb-2">Morning Journal</div>
    <div className="h-3 w-full bg-text-heading/10 rounded mb-1.5"></div>
    <div className="h-3 w-4/5 bg-text-heading/10 rounded mb-1.5"></div>
    <div className="h-3 w-2/3 bg-interactive-primary/20 rounded flex items-center">
      <motion.div 
        className="w-[2px] h-2 bg-interactive-primary ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  </motion.div>
);

const FloatingNotification = ({ delay }) => (
  <motion.div 
    className="absolute -left-8 top-16 w-40 bg-surface-primary border border-interactive-primary/30 rounded-full p-2 shadow-xl z-30 flex items-center gap-3"
    initial={{ opacity: 0, x: -20, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1, y: [5, -5, 5] }}
    transition={{ 
      opacity: { duration: 0.6, delay },
      x: { duration: 0.6, delay },
      scale: { type: "spring", delay },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <div className="w-8 h-8 rounded-full bg-interactive-primary/20 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-interactive-primary relative">
        <motion.div 
          className="absolute inset-0 rounded-full border border-interactive-primary"
          animate={{ scale: [1, 1.5, 2], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
    <div className="text-xs font-medium text-text-heading">Goal Reached!</div>
  </motion.div>
);