import React from 'react';

export const TaskFilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'week', label: 'This Week' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            currentFilter === filter.id 
              ? 'bg-text-heading text-surface-primary shadow-md' 
              : 'bg-surface-primary border border-border-default text-text-muted hover:bg-surface-secondary hover:text-text-heading shadow-sm'
          }`}
        >
          {filter.label}
        </button>
      ))}
      <div className="w-px h-6 bg-border-default mx-2 hidden sm:block" />
      <select className="px-3 py-1.5 rounded-full text-sm font-medium bg-surface-primary border border-border-default text-text-muted hover:bg-surface-secondary shadow-sm outline-none hidden sm:block cursor-pointer">
        <option>Sort: Priority</option>
        <option>Sort: Due Date</option>
        <option>Sort: Created</option>
        <option>Sort: Alphabetical</option>
      </select>
    </div>
  );
};
