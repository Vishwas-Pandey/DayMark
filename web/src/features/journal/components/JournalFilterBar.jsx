import React from 'react';
import { Search, Filter } from 'lucide-react';

export const JournalFilterBar = ({ currentFilter, onFilterChange, onSearch }) => {
  const filters = [
    { id: 'all', label: 'All Entries' },
    { id: 'recent', label: 'Recent' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'pinned', label: 'Pinned' },
    { id: 'insights', label: 'AI Insights' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto">
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
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative group w-full sm:w-64 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-text-heading transition-colors" />
          <input 
            type="text" 
            placeholder="Search entries..." 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface-primary border border-border-default rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-interactive-primary focus:border-transparent transition-all shadow-sm"
          />
        </div>
        <button className="p-2 bg-surface-primary border border-border-default text-text-muted hover:text-text-heading rounded-xl shadow-sm hover:shadow-md transition-all">
          <Filter size={20} />
        </button>
      </div>
    </div>
  );
};
