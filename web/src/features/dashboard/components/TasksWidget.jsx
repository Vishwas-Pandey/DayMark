import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Plus } from 'lucide-react';
import { useTasks } from '../../../hooks/useTasks';
import { WidgetSkeleton } from '../../../components/common/Skeletons';
import { EmptyState } from '../../../components/common/EmptyStates';

export const TasksWidget = () => {
  const { data: tasks, isLoading, error, updateTask } = useTasks();

  const handleToggle = (task) => {
    updateTask.mutate({ id: task.id, data: { status: task.status === 'completed' ? 'todo' : 'completed' } });
  };

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load tasks.</div>;
  
  const pendingTasks = tasks?.filter(t => t.status !== 'completed') || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading flex items-center gap-2">
          Tasks <span className="bg-surface-secondary text-text-muted px-2 py-0.5 rounded-full text-xs font-semibold">{pendingTasks.length}</span>
        </h3>
        <button className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-1">
        {pendingTasks.length === 0 ? (
          <EmptyState title="All caught up!" message="You have no pending tasks today." />
        ) : (
          pendingTasks.map((task) => (
            <div key={task.id} className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-secondary transition-colors border border-transparent hover:border-border-default">
              <button 
                onClick={() => handleToggle(task)}
                className="mt-0.5 text-text-muted hover:text-interactive-primary shrink-0 transition-colors"
              >
                <Circle size={18} />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text-heading truncate">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  {task.priority === 'High' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600 uppercase tracking-wider">High</span>
                  )}
                  {task.dueDate && (
                    <span className="text-[11px] text-text-muted flex items-center gap-1">
                      <Clock size={10} /> {new Date(task.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};
