import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../context/AuthProvider';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { WidgetSkeleton } from '../../../components/common/Skeletons';

export const WelcomeCard = () => {
  const { user } = useAuthContext();
  const { data: analytics, isLoading } = useAnalytics('today');
  const score = analytics?.scores?.productivityScore;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalInsight = () => {
    if (!score) return "Either you run the day, or the day runs you.";
    if (score >= 80) return "You're on fire today! Keep the momentum going.";
    if (score >= 50) return "Steady progress. Focus on your highest priority next.";
    return "Every step counts. Let's tackle one thing at a time.";
  };

  if (isLoading) return <WidgetSkeleton className="h-32 w-full rounded-2xl mb-6" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-surface-primary border border-border-default shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-interactive-primary/10 text-interactive-primary flex items-center justify-center text-xl font-bold border border-interactive-primary/20 shrink-0">
          {user?.firstName?.[0]?.toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-heading mb-1">
            {getGreeting()}, {user?.firstName || 'there'}!
          </h1>
          <p className="text-text-muted text-sm sm:text-base">
            {getMotivationalInsight()}
          </p>
        </div>
      </div>
      
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start p-4 sm:p-0 bg-surface-secondary sm:bg-transparent rounded-xl sm:rounded-none">
        <span className="text-sm font-medium text-text-muted">Productivity Score</span>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-interactive-primary leading-none">
            {score || 0}
          </span>
          <span className="text-sm text-text-muted font-medium mb-1">/ 100</span>
        </div>
      </div>
    </motion.div>
  );
};
