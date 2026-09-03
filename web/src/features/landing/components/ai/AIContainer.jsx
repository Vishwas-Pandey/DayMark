import React from 'react';
import { motion } from 'framer-motion';
import { AIBackground } from './AIBackground';
import { AIAnimationLayer } from './AIAnimationLayer';
import { AICTA } from './AICTA';

export const AIContainer = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <AIBackground />
      
      {/* Left Column: Storytelling */}
      <div className="col-span-1 lg:col-span-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-sm font-bold tracking-widest text-interactive-primary uppercase mb-4">Intelligent Companion</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading mb-6 leading-tight">
            Meet Your Personal<br/>Productivity Coach.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            DayMark doesn't just record your day. It learns your routines, understands your habits, and helps you make better decisions every day.
          </p>
          
          <ul className="space-y-4 mb-12">
            {[
              "Proactive schedule optimization",
              "Pattern detection and coaching",
              "Automated deep work scheduling"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-text-heading font-medium">
                <div className="w-5 h-5 rounded-full bg-interactive-primary/20 flex items-center justify-center text-interactive-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
          
          <AICTA />
        </motion.div>
      </div>

      {/* Right Column: AI Workspace */}
      <div className="col-span-1 lg:col-span-7 relative z-10">
        <AIAnimationLayer />
      </div>
    </div>
  );
};