import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CTAStats } from './CTAStats';
import { FloatingWidgets } from './FloatingWidgets';

export const CTASection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Normalize mouse position between -1 and 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative w-full min-h-[100dvh] bg-surface-primary overflow-hidden flex flex-col items-center justify-center py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Deep Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full bg-interactive-primary/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[20%] right-[20%] w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[150px] mix-blend-screen" />
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        {/* Subtle animated mesh lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] pointer-events-none" />
      </div>

      <FloatingWidgets mousePosition={mousePosition} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center px-6">
        
        <CTAStats />

        <motion.div 
          className="text-center max-w-3xl mt-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-heading mb-6 leading-tight">
            Ready to Own <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-heading via-text-heading to-text-heading/40">Every Day?</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            Join thousands of people building better habits, organizing their life, and making every day count with DayMark.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-text-heading text-surface-primary font-bold text-lg overflow-hidden flex items-center justify-center gap-3 transition-shadow hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] focus-ring"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-interactive-primary/10 via-interactive-primary/10 to-interactive-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-surface-primary/40 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
            <Link to="/signup" className="absolute inset-0" aria-label="Start Your Journey" />
            <span className="relative z-10 pointer-events-none">Start Your Journey</span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-surface-secondary/50 border border-border-default backdrop-blur-xl text-text-heading font-bold text-lg overflow-hidden flex items-center justify-center gap-3 transition-colors hover:bg-surface-secondary hover:border-interactive-primary/50 focus-ring"
          >
            <Link to="/demo" className="absolute inset-0 z-20" aria-label="Explore Demo" />
            <span className="relative z-10 pointer-events-none">Explore Demo</span>
            <motion.svg 
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="relative z-10 transition-transform group-hover:translate-x-1 text-text-muted group-hover:text-text-heading pointer-events-none"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
