import React from 'react';
import { PreviewToolbar } from './PreviewToolbar';
import { DemoInteractionLayer } from './DemoInteractionLayer';
import { TaskWidget } from './TaskWidget';
import { HabitWidget } from './HabitWidget';
import { JournalWidget } from './JournalWidget';
import { GoalWidget } from './GoalWidget';
import { AIInsightWidget } from './AIInsightWidget';
import { AnalyticsWidget } from './AnalyticsWidget';

export const PreviewWorkspace = ({ activeStepRaw }) => {
  return (
    <div className="flex-1 flex flex-col bg-surface-primary relative overflow-hidden">
      <PreviewToolbar />
      <div className="flex-1 p-6 relative">
        <DemoInteractionLayer activeStepRaw={activeStepRaw} />
        
        {/* The workspace crossfades widgets based on active step */}
        <WorkspaceView stepId={0} activeStepRaw={activeStepRaw}><TaskWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
        <WorkspaceView stepId={1} activeStepRaw={activeStepRaw}><HabitWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
        <WorkspaceView stepId={2} activeStepRaw={activeStepRaw}><JournalWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
        <WorkspaceView stepId={3} activeStepRaw={activeStepRaw}><GoalWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
        <WorkspaceView stepId={4} activeStepRaw={activeStepRaw}><AIInsightWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
        <WorkspaceView stepId={5} activeStepRaw={activeStepRaw}><AnalyticsWidget activeStepRaw={activeStepRaw} /></WorkspaceView>
      </div>
    </div>
  );
};

import { motion, useTransform } from 'framer-motion';
const WorkspaceView = ({ stepId, activeStepRaw, children }) => {
  const opacity = useTransform(activeStepRaw, [stepId - 0.5, stepId, stepId + 0.5], [0, 1, 0]);
  const scale = useTransform(activeStepRaw, [stepId - 0.5, stepId, stepId + 0.5], [0.95, 1, 1.05]);
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? 'auto' : 'none');
  
  return (
    <motion.div 
      className="absolute inset-6 flex items-center justify-center"
      style={{ opacity, scale, pointerEvents }}
    >
      {children}
    </motion.div>
  );
};