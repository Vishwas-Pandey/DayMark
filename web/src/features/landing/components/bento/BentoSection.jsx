import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BentoGrid } from './BentoGrid';

export const BentoSection = () => {
  return (
    <section className="relative w-full py-32 bg-surface-primary overflow-hidden">
      {/* Background continuous elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-interactive-primary/10 blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <SectionHeader />
        <BentoGrid />
        <SectionCTA />
      </div>
    </section>
  );
};

const SectionHeader = () => (
  <motion.div 
    className="text-center max-w-3xl mb-24"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading mb-6">
      Everything You Need.<br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-interactive-primary to-[#38bdf8]">One Beautiful Workspace.</span>
    </h2>
    <p className="text-lg md:text-xl text-text-muted leading-relaxed">
      Track habits, organize goals, journal your thoughts, understand your progress, and let AI help you build better days.
    </p>
  </motion.div>
);

const SectionCTA = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      className="mt-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <button 
        onClick={() => navigate('/demo')}
        className="px-8 py-3.5 rounded-lg bg-surface-secondary/50 backdrop-blur-md border border-border-default text-text-heading font-semibold hover:bg-surface-secondary transition-colors focus-ring outline-none"
      >
        Explore the Dashboard
      </button>
    </motion.div>
  );
};