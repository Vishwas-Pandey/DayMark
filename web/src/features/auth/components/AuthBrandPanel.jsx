import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { TESTIMONIALS, TRUST_STATS } from '../../landing/components/testimonials/TestimonialData';

const featuredQuote = TESTIMONIALS[1];
const activeUsers = TRUST_STATS[0];

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
        <p className="text-sm text-text-body leading-relaxed">&ldquo;{featuredQuote.quote}&rdquo;</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={featuredQuote.avatar}
              alt=""
              width={36}
              height={36}
              className="rounded-full border border-border-default"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-medium text-text-heading">{featuredQuote.name}</p>
              <p className="text-xs text-text-muted">{featuredQuote.occupation}</p>
            </div>
          </div>
          <p className="text-xs text-text-muted">
            <span className="text-text-heading font-semibold">{activeUsers.value.toLocaleString()}{activeUsers.suffix}</span> daily users
          </p>
        </div>
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
