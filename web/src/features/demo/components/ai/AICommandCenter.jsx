import React from 'react';
import { motion } from 'framer-motion';
import { AIBriefingCard } from './AIBriefingCard';
import { AIEnergyForecast } from './AIEnergyForecast';
import { AIDeepWorkPlanner } from './AIDeepWorkPlanner';
import { AIReasoningPanel } from './AIReasoningPanel';
import { AIActionQueue } from './AIActionQueue';
import { AIGoalAdvisor } from './AIGoalAdvisor';
import { AIHabitCoach } from './AIHabitCoach';
import { AIJournalReflection } from './AIJournalReflection';
import { AILearningTimeline } from './AILearningTimeline';

export const AICommandCenter = () => {
  return (
    <div className="flex flex-col gap-8 pb-32 max-w-[1400px] mx-auto w-full">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-text-heading flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-interactive-primary"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Command Center
        </h2>
        <p className="text-text-muted mt-2">Your intelligent operating system for productivity.</p>
      </div>

      {/* Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Timeline (Desktop) */}
        <div className="hidden lg:block lg:col-span-3">
          <AILearningTimeline />
        </div>
        
        {/* Center Column: Core Workspace */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <AIBriefingCard />
          <AIEnergyForecast />
          <AIDeepWorkPlanner />
          <AIReasoningPanel />
        </div>
        
        {/* Right Column: Context & Actions */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          <AIActionQueue />
          <AIGoalAdvisor />
          <AIHabitCoach />
          <AIJournalReflection />
        </div>

      </div>
    </div>
  );
};