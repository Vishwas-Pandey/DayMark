import React from 'react';
import { BentoCard } from './BentoCard';
import { 
  HabitTrackerPreview, JournalPreview, CalendarPreview, 
  TaskManagerPreview, GoalProgressPreview, AnalyticsPreview,
  AIInsightsPreview, ProductivityScorePreview 
} from './previews';

export const BentoGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(280px,auto)]">
      
      {/* Large Hero Card: Habit Tracker */}
      <BentoCard 
        className="md:col-span-2 lg:col-span-2 lg:row-span-2"
        title="Habit Tracking"
        description="Build momentum that lasts with intelligent streak tracking and daily heatmaps."
        badge="Core"
        preview={<HabitTrackerPreview />}
        delay={0.1}
      />

      {/* Tall Card: Calendar */}
      <BentoCard 
        className="md:col-span-1 lg:col-span-1 lg:row-span-2"
        title="Smart Calendar"
        description="Sync your life. Overlays moods, habits, and tasks on your daily schedule."
        preview={<CalendarPreview />}
        delay={0.2}
      />

      {/* Standard Card: AI Insights */}
      <BentoCard 
        className="md:col-span-1 lg:col-span-1 lg:row-span-1"
        title="AI Insights"
        description="Personalized coaching based on your unique productivity patterns."
        badge="Pro"
        preview={<AIInsightsPreview />}
        delay={0.3}
      />

      {/* Standard Card: Productivity Score */}
      <BentoCard 
        className="md:col-span-1 lg:col-span-1 lg:row-span-1"
        title="Productivity Score"
        description="Quantify your daily effort with a unified metrics engine."
        preview={<ProductivityScorePreview />}
        delay={0.4}
      />

      {/* Wide Card: Task Manager */}
      <BentoCard 
        className="md:col-span-2 lg:col-span-2 lg:row-span-1"
        title="Task Management"
        description="Prioritize your most important work with a frictionless daily checklist."
        preview={<TaskManagerPreview />}
        delay={0.2}
      />

      {/* Standard Card: Goal Progress */}
      <BentoCard 
        className="md:col-span-1 lg:col-span-1 lg:row-span-1"
        title="Goal Trajectory"
        description="Break massive ambitions into daily actionable milestones."
        preview={<GoalProgressPreview />}
        delay={0.3}
      />

      {/* Standard Card: Daily Journal */}
      <BentoCard 
        className="md:col-span-1 lg:col-span-1 lg:row-span-1"
        title="Daily Journal"
        description="Reflect seamlessly with distraction-free markdown support."
        preview={<JournalPreview />}
        delay={0.4}
      />
      
      {/* Wide Card: Analytics (Spans across the bottom) */}
      <BentoCard 
        className="md:col-span-2 lg:col-span-4 lg:row-span-1 min-h-[350px]"
        title="Deep Analytics"
        description="Measure what matters. Uncover hidden trends across habits, mood, and tasks to optimize your routine."
        preview={<AnalyticsPreview />}
        delay={0.5}
      />
      
    </div>
  );
};