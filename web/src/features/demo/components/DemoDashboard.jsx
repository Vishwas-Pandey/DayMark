import React from 'react';
import { DemoDashboardLayout } from './dashboard/DemoDashboardLayout';
import { TaskWidget, HabitWidget, ScoreWidget, JournalWidget } from './DashboardWidgets';
import { AICommandCenter } from './ai/AICommandCenter';
import { useDemoStore } from '../store/useDemoStore';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardHome = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
    className="flex flex-col gap-8 pb-32"
  >
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8">
        <TaskWidget />
      </div>
      <div className="md:col-span-4">
        <ScoreWidget />
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HabitWidget />
      <JournalWidget />
    </div>
  </motion.div>
);

const PlaceholderView = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center h-96 text-text-muted"
  >
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
    <h2 className="text-xl font-medium">{title}</h2>
    <p className="text-sm mt-2 opacity-70">This feature is in development.</p>
  </motion.div>
);

export const DemoDashboard = () => {
  const activeTab = useDemoStore(state => state.activeTab);

  return (
    <DemoDashboardLayout>
      <AnimatePresence mode="wait">
        {activeTab === 'Dashboard' && <DashboardHome key="dashboard" />}
        {activeTab === 'AI Coach' && <AICommandCenter key="ai" />}
        {activeTab !== 'Dashboard' && activeTab !== 'AI Coach' && <PlaceholderView key="placeholder" title={activeTab} />}
      </AnimatePresence>
    </DemoDashboardLayout>
  );
};