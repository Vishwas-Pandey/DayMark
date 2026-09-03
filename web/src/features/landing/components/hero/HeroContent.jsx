import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const HeroContent = () => {
  return (
    <div className="flex flex-col items-start text-left pt-10 lg:pt-0 z-10 relative">
      <HeroHeadline />
      <HeroSubheadline />
      <HeroCTAGroup />
      <SocialProof />
    </div>
  );
};

const HeroHeadline = () => {
  const lines = ["Own Every Day.", "Build Better Habits.", "Visualize Your Progress."];
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-heading mb-6 leading-[1.1]">
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden pb-2">
          <motion.span 
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 + idx * 0.15 }}
          >
            {line === "Visualize Your Progress." ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-interactive-primary to-[#38bdf8]">{line}</span>
            ) : line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

const HeroSubheadline = () => (
  <motion.p 
    className="text-lg sm:text-xl text-text-muted mb-10 max-w-xl leading-relaxed"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
  >
    Build better habits, organize your life, and visualize your progress beautifully with one intelligent productivity platform.
  </motion.p>
);

const HeroCTAGroup = () => (
  <motion.div 
    className="flex flex-col sm:flex-row items-center gap-4 mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.0 }}
  >
    <PrimaryCTA />
    <SecondaryCTA />
  </motion.div>
);

const PrimaryCTA = () => {
  const navigate = useNavigate();
  return (
    <motion.button 
      onClick={() => navigate('/signup')}
      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-text-heading text-surface-primary font-semibold shadow-[0_0_20px_rgba(var(--color-interactive-primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-interactive-primary-rgb),0.5)] transition-shadow relative overflow-hidden group focus-ring outline-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-r from-interactive-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        Get Started
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
    </motion.button>
  );
};

const SecondaryCTA = () => {
  const navigate = useNavigate();
  return (
    <motion.button 
      onClick={() => navigate('/demo')}
      className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-surface-secondary/50 backdrop-blur-sm border border-border-default text-text-heading font-medium hover:bg-surface-secondary transition-colors focus-ring outline-none"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      Watch Demo
    </motion.button>
  );
};

import { useState, useEffect } from 'react';
const Counter = ({ from, to, duration, format }) => {
  const [count, setCount] = useState(from);
  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * (to - from) + from);
      setCount(current);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    const timer = setTimeout(() => window.requestAnimationFrame(step), 2500); // Wait for sequence
    return () => clearTimeout(timer);
  }, [from, to, duration]);
  return <span>{format ? format(count) : count}</span>;
};

const SocialProof = () => (
  <motion.div 
    className="flex items-center gap-8 border-t border-border-subtle pt-8 w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 2.2 }}
  >
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-text-heading"><Counter from={0} to={10} duration={2000} format={(n) => `${n}K+`} /></span>
      <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Active Streaks</span>
    </div>
    <div className="w-[1px] h-8 bg-border-subtle"></div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-text-heading"><Counter from={0} to={50} duration={2000} format={(n) => `${n}K+`} /></span>
      <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Goals Reached</span>
    </div>
  </motion.div>
);