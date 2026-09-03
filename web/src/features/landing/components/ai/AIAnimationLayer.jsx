import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AIInsightCard } from './AIInsightCard';
import { AIDeepWorkTimeline } from './AIDeepWorkTimeline';
import { AIProductivityScore } from './AIProductivityScore';
import { AIRecommendationPanel } from './AIRecommendationPanel';
import { AILearningCard } from './AILearningCard';

// Master orchestration of the AI demo loop
export const AIAnimationLayer = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 0: Deep Work Detected
    // 1: AI Thinking / Insight Appears
    // 2: Recommendation Appears & Timeline Optimizes
    // 3: Score Updates & Learning complete
    const interval = setInterval(() => {
      setStep(s => (s + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3] bg-surface-secondary/30 border border-interactive-primary/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4 overflow-hidden transform-gpu">
      
      {/* Top Row */}
      <div className="flex gap-4 h-1/3">
        <AIProductivityScore step={step} />
        <AILearningCard step={step} />
      </div>

      {/* Middle/Bottom Row */}
      <div className="flex flex-1 gap-4 relative">
        <AIDeepWorkTimeline step={step} />
        
        <div className="flex-1 relative flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && <WaitingState key="waiting" />}
            {step === 1 && <AIInsightCard key="insight" />}
            {(step === 2 || step === 3) && <AIRecommendationPanel key="recommendation" step={step} />}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Scanning laser effect */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-interactive-primary/50 blur-[1px] z-50"
        animate={{ y: ["0%", "400%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const WaitingState = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center text-text-muted gap-4"
  >
    <div className="w-12 h-12 rounded-full border-2 border-dashed border-border-default flex items-center justify-center animate-spin-slow">
      <div className="w-6 h-6 rounded-full bg-interactive-primary/20" />
    </div>
    <span className="text-sm font-medium">Analyzing patterns...</span>
  </motion.div>
);