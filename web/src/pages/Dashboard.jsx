import React from 'react';
import { motion } from 'framer-motion';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { WelcomeCard } from '../features/dashboard/components/WelcomeCard';
import { TodaysFocus } from '../features/dashboard/components/TodaysFocus';

// Widgets
import { TasksWidget } from '../features/dashboard/components/TasksWidget';
import { HabitsWidget } from '../features/dashboard/components/HabitsWidget';
import { GoalsWidget } from '../features/dashboard/components/GoalsWidget';
import { CalendarWidget } from '../features/dashboard/components/CalendarWidget';
import { JournalWidget } from '../features/dashboard/components/JournalWidget';
import { AnalyticsWidget } from '../features/dashboard/components/AnalyticsWidget';

export const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto pb-12 space-y-6"
    >
      <ErrorBoundary>
        <WelcomeCard />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TodaysFocus />
      </ErrorBoundary>
      
      {/* 3-column masonry/grid layout for widgets on large screens, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
        <ErrorBoundary><TasksWidget /></ErrorBoundary>
        <ErrorBoundary><HabitsWidget /></ErrorBoundary>
        <ErrorBoundary><CalendarWidget /></ErrorBoundary>
        <ErrorBoundary><GoalsWidget /></ErrorBoundary>
        <ErrorBoundary><AnalyticsWidget /></ErrorBoundary>
        <ErrorBoundary><JournalWidget /></ErrorBoundary>
      </div>
    </motion.div>
  );
};

export default Dashboard;
