import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
const HIGHLIGHTS = [
  'Tasks, habits, goals and a daily journal in one place',
  'Streaks and a heatmap built from your own history',
  'An AI chat that can read your tasks and habits for context',
];

export const AuthBrandPanel = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full w-full overflow-hidden bg-surface-secondary p-12 xl:p-16">
      <BrandBackground reduceMotion={reduceMotion} />

      <Link to="/" className="relative z-10 flex items-center gap-2 w-fit focus-ring rounded-md p-1 outline-none group">
        <div className="relative text-text-heading">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l7.5 14h-15L12 6.5z" />
          </svg>
          <div className="absolute inset-0 bg-interactive-primary rounded-full blur-md -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
        <span className="font-semibold text-lg tracking-tight text-text-heading">DayMark</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-md"
      >
        <h2 className="text-3xl xl:text-4xl font-semibold tracking-tight text-text-heading leading-[1.15]">
          Build momentum,
          <br />
          one day at a time.
        </h2>
        <p className="mt-4 text-base text-text-muted leading-relaxed">
          Tasks, habits, journaling, and an AI coach that actually pays attention — all in one calm, focused workspace.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        className="relative z-10 rounded-2xl border border-border-default bg-surface-primary/60 backdrop-blur-xl p-6 shadow-floating"
      >
        <ul className="space-y-3">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-body leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-interactive-primary" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const BrandBackground = ({ reduceMotion }) => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute -top-[10%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-interactive-primary/20 blur-[120px]"
      animate={reduceMotion ? {} : { x: [0, 40, 0], y: [0, 30, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-interactive-secondary/20 blur-[120px]"
      animate={reduceMotion ? {} : { x: [0, -30, 0], y: [0, -20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
      }}
    />
  </div>
);
