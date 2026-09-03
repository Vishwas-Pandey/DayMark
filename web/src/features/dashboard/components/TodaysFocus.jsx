import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckSquare, Calendar, Activity, Clock } from 'lucide-react';
import { useTasks } from '../../../hooks/useTasks';
import { useGoals } from '../../../hooks/useGoals';
import { useCalendar } from '../../../hooks/useCalendar';
import { WidgetSkeleton } from '../../../components/common/Skeletons';

export const TodaysFocus = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: events, isLoading: eventsLoading } = useCalendar();

  const isLoading = tasksLoading || goalsLoading || eventsLoading;

  if (isLoading) return <WidgetSkeleton className="h-40 w-full rounded-2xl mb-6" />;

  const highPriorityTask = tasks?.find(t => t.priority === 'High' && t.status !== 'completed');
  const activeGoal = goals?.find(g => g.status === 'in-progress');
  const nextEvent = events?.find(e => new Date(e.startTime) > new Date()) || events?.[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-6 rounded-2xl bg-surface-secondary border border-border-default shadow-sm mb-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h2 className="text-lg font-bold text-text-heading flex items-center gap-2">
          <Target size={20} className="text-interactive-primary" /> Today's Focus
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 bg-interactive-primary/10 text-interactive-primary rounded-md flex items-center gap-1 w-fit">
          <Clock size={12} /> Est. Finish: 6:00 PM
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highest Priority Task */}
        <div className="flex items-start gap-3 bg-surface-primary p-4 rounded-xl border border-border-default hover:border-interactive-primary/50 transition-colors cursor-pointer group">
          <div className="p-2 rounded-lg bg-red-100 text-red-600 shrink-0">
            <CheckSquare size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-muted mb-1 uppercase tracking-wider">Top Priority</p>
            <h3 className="font-semibold text-text-heading text-sm truncate group-hover:text-interactive-primary transition-colors">
              {highPriorityTask?.title || 'No pending high priority tasks'}
            </h3>
          </div>
        </div>

        {/* Current Goal */}
        <div className="flex items-start gap-3 bg-surface-primary p-4 rounded-xl border border-border-default hover:border-interactive-primary/50 transition-colors cursor-pointer group">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600 shrink-0">
            <Target size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-muted mb-1 uppercase tracking-wider">Active Goal</p>
            <h3 className="font-semibold text-text-heading text-sm truncate group-hover:text-interactive-primary transition-colors">
              {activeGoal?.title || 'No active goals'}
            </h3>
          </div>
        </div>

        {/* Next Event */}
        <div className="flex items-start gap-3 bg-surface-primary p-4 rounded-xl border border-border-default hover:border-interactive-primary/50 transition-colors cursor-pointer group">
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600 shrink-0">
            <Calendar size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-text-muted mb-1 uppercase tracking-wider">Up Next</p>
            <h3 className="font-semibold text-text-heading text-sm truncate group-hover:text-interactive-primary transition-colors">
              {nextEvent?.title || 'No upcoming events'}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
