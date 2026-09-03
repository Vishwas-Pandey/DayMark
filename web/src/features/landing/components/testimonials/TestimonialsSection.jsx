import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialMarquee, TestimonialCarousel } from './TestimonialMarquee';
import { TrustCounters } from './TrustCounters';

export const TestimonialsSection = () => {
  return (
    <section className="relative w-full min-h-[100dvh] bg-surface-primary py-32 overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Theme-aware gradient fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-surface-primary to-surface-primary/0 z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-surface-primary to-surface-primary/0 z-10" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-interactive-primary/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-secondary/50 border border-border-default mb-8">
            <span className="w-2 h-2 rounded-full bg-interactive-primary shadow-[0_0_10px_rgba(var(--color-interactive-primary-rgb),0.8)]" />
            <span className="text-xs font-bold tracking-widest text-text-muted uppercase">Trusted Globally</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-heading mb-6">
            Loved by people <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-interactive-primary to-purple-400">building better days.</span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
            From students preparing for placements to founders managing startups, DayMark helps people stay consistent every single day.
          </p>
        </motion.div>

        {/* Stats */}
        <TrustCounters />

        {/* Marquee & Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full"
        >
          <TestimonialMarquee />
          <TestimonialCarousel />
        </motion.div>

      </div>
    </section>
  );
};
