import React from 'react';
import { DemoDashboardLayout } from './dashboard/DemoDashboardLayout';
import { TaskWidget, HabitWidget, ScoreWidget, JournalWidget } from './DashboardWidgets';
import { AICommandCenter } from './ai/AICommandCenter';
import { useDemoStore } from '../store/useDemoStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TasksView, HabitsView, CalendarView, JournalView, GoalsView, AnalyticsView, SettingsView } from './DemoViews';

const VIEWS = {
  Tasks: TasksView,
  Habits: HabitsView,
  Calendar: CalendarView,
  Journal: JournalView,
  Goals: GoalsView,
  Analytics: AnalyticsView,
  Settings: SettingsView,
};

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

export const DemoDashboard = () => {
  const activeTab = useDemoStore(state => state.activeTab);

  return (
    <DemoDashboardLayout>
      <AnimatePresence mode="wait">
        {activeTab === 'Dashboard' && <DashboardHome key="dashboard" />}
        {activeTab === 'AI Coach' && <AICommandCenter key="ai" />}
        {VIEWS[activeTab] && React.createElement(VIEWS[activeTab], { key: activeTab })}
      </AnimatePresence>
    </DemoDashboardLayout>
  );
};