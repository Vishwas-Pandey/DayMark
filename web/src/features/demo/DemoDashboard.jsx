import React from 'react';
import { DemoDashboardLayout } from './dashboard/DemoDashboardLayout';
import { TaskWidget, HabitWidget, ScoreWidget, JournalWidget } from './DashboardWidgets';
import { motion } from 'framer-motion';

export const DemoDashboard = () => {
  return (
    <DemoDashboardLayout>
      <div className="flex flex-col gap-8 pb-32">
        {/* Top Row: Important Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <TaskWidget />
          </div>
          <div className="md:col-span-4">
            <ScoreWidget />
          </div>
        </div>

        {/* Second Row: Habits and Journal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HabitWidget />
          <JournalWidget />
        </div>
      </div>
    </DemoDashboardLayout>
  );
};