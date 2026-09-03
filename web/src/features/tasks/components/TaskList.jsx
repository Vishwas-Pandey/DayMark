import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { TaskRow } from './TaskRow';
import { EmptyState } from '../../../components/common/EmptyStates';
import { DashboardSkeleton } from '../../../components/common/Skeletons';

export const TaskList = ({ tasks, isLoading, error, onToggle, onClickTask, selectedIds, onSelectTask }) => {
  if (isLoading) return <DashboardSkeleton />;
  if (error) return <div className="p-8 rounded-2xl bg-red-50 border border-red-200 text-red-600">Failed to load tasks. Please try again.</div>;
  if (!tasks || tasks.length === 0) return (
    <div className="py-12 bg-surface-primary rounded-2xl border border-border-default flex items-center justify-center shadow-sm">
      <EmptyState title="No tasks found." message="Enjoy your free time or add a new task to get started." />
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {tasks.map(task => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onToggle={onToggle}
            onClick={() => onClickTask(task)}
            isSelected={selectedIds.includes(task.id)}
            onSelect={(e) => { e.stopPropagation(); onSelectTask(task.id); }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
