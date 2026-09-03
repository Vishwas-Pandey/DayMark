import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { DeviceFrame } from './DeviceFrame';

const storySteps = [
  { id: 0, title: "Daily Planning", desc: "Start your day with absolute clarity. Drag, drop, and prioritize your most important work effortlessly." },
  { id: 1, title: "Habit Tracking", desc: "Build momentum that lasts. See your streaks grow and stay accountable with intelligent reminders." },
  { id: 2, title: "Journal Entry", desc: "Reflect on your progress. Capture thoughts seamlessly without ever leaving your workflow." },
  { id: 3, title: "Goal Progress", desc: "Break massive ambitions into daily actions. Visualize your trajectory and hit milestones faster." },
  { id: 4, title: "AI Insights", desc: "Let DayMark analyze your patterns. Receive personalized coaching to optimize your deep work." },
  { id: 5, title: "Analytics", desc: "Data that drives decisions. Measure your productivity score and uncover hidden trends." }
];

export const PreviewContainer = ({ scrollProgress }) => {
  // Map 0-1 scroll progress to 6 discrete steps (0 to 5)
  const activeStepRaw = useTransform(scrollProgress, [0, 1], [0, 5]);
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full py-24">
      {/* Left Column: Storytelling Text */}
      <div className="col-span-1 lg:col-span-4 flex flex-col justify-center h-full relative z-10">
        <div className="relative h-64">
          {storySteps.map((step, index) => (
            <StoryContent key={step.id} step={step} index={index} activeStepRaw={activeStepRaw} />
          ))}
        </div>
      </div>

      {/* Right Column: Interactive Device Frame */}
      <div className="col-span-1 lg:col-span-8 flex justify-center lg:justify-end items-center h-full relative z-20">
        <DeviceFrame activeStepRaw={activeStepRaw} />
      </div>
    </div>
  );
};

const StoryContent = ({ step, index, activeStepRaw }) => {
  const opacity = useTransform(activeStepRaw, 
    [index - 0.5, index, index + 0.5], 
    [0, 1, 0]
  );
  
  const y = useTransform(activeStepRaw, 
    [index - 0.5, index, index + 0.5], 
    [20, 0, -20]
  );

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y, pointerEvents: 'none' }} // Disable pointer events on hidden steps if needed
    >
      <div className="text-sm font-bold tracking-widest text-interactive-primary uppercase mb-4">Step 0{step.id + 1}</div>
      <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4 leading-tight">{step.title}</h2>
      <p className="text-lg text-text-muted leading-relaxed">{step.desc}</p>
    </motion.div>
  );
};