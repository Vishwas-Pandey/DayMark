import React from 'react';
import { Plus, Search, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const TaskHeader = ({ tasks, onOpenCreate, onSearch }) => {
  const completedToday = tasks?.filter(t => t.status === 'completed' && t.completedAt && new Date(t.completedAt).toDateString() === new Date().toDateString()).length || 0;
  const overdueCount = tasks?.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length || 0;
  const total = tasks?.length || 0;
  const completionRate = total ? Math.round((tasks.filter(t => t.status === 'completed').length / total) * 100) : 0;

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading mb-3">All Tasks</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-secondary rounded-full text-text-muted font-medium border border-border-default shadow-sm">
            <span>{total} Total</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full font-medium border border-green-500/20 shadow-sm">
            <CheckCircle2 size={14} /> {completedToday} Completed Today
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-600 rounded-full font-medium border border-red-500/20 shadow-sm">
            <Clock size={14} /> {overdueCount} Overdue
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-interactive-primary/10 text-interactive-primary rounded-full font-medium border border-interactive-primary/20 shadow-sm">
            <span>{completionRate}% Done</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative group hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-text-heading transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-48 lg:w-64 pl-9 pr-4 py-2 bg-surface-primary border border-border-default rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:border-transparent transition-all shadow-sm hover:shadow-md"
          />
        </div>
        
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-2 px-4 py-2 bg-interactive-primary text-white font-semibold rounded-xl hover:bg-interactive-primary/90 transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>
    </div>
  );
};
