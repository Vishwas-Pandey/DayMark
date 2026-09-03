import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { FloatingNotes } from './FloatingNotes';
import { BrokenChecklist } from './BrokenChecklist';
import { MissedReminders } from './MissedReminders';
import { ScatteredGoals } from './ScatteredGoals';
import { UnfinishedJournal } from './UnfinishedJournal';
import { CalendarConflicts } from './CalendarConflicts';
import { NotificationOverflow } from './NotificationOverflow';

export const ChaosScene = ({ scrollProgress }) => {
  // Fades out and translates apart as we approach transition (0 -> 0.4)
  const opacity = useTransform(scrollProgress, [0.2, 0.4], [1, 0]);
  const scale = useTransform(scrollProgress, [0.2, 0.4], [1, 1.2]);
  const pointerEvents = useTransform(opacity, o => o > 0.5 ? 'auto' : 'none');

  return (
    <motion.div 
      className="absolute inset-0"
      style={{ opacity, scale, pointerEvents }}
    >
      <div className="relative w-full h-full filter saturate-50 brightness-75">
        <FloatingNotes scrollProgress={scrollProgress} />
        <BrokenChecklist scrollProgress={scrollProgress} />
        <MissedReminders scrollProgress={scrollProgress} />
        <ScatteredGoals scrollProgress={scrollProgress} />
        <UnfinishedJournal scrollProgress={scrollProgress} />
        <CalendarConflicts scrollProgress={scrollProgress} />
        <NotificationOverflow scrollProgress={scrollProgress} />
      </div>
    </motion.div>
  );
};