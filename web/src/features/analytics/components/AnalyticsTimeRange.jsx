import React from 'react';
import { Calendar } from 'lucide-react';

export const AnalyticsTimeRange = ({ currentRange, onRangeChange }) => {
  const ranges = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'this-quarter', label: 'This Quarter' },
    { id: 'this-year', label: 'This Year' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-surface-primary p-2 rounded-2xl border border-border-default shadow-sm">
      <div className="flex items-center gap-2 px-3 text-text-muted font-semibold text-sm">
        <Calendar size={18} />
        <span className="hidden sm:inline">Time Range</span>
      </div>

      <div className="flex items-center bg-surface-secondary p-1 rounded-xl border border-border-default w-full sm:w-auto overflow-x-auto scrollbar-hide">
        {ranges.map(range => (
          <button
            key={range.id}
            onClick={() => onRangeChange(range.id)}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              currentRange === range.id 
                ? 'bg-surface-primary text-text-heading shadow-sm' 
                : 'text-text-muted hover:text-text-heading hover:bg-surface-primary/50'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};
