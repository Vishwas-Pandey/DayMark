import React from 'react';
import { Grid } from 'lucide-react';

export const AnalyticsHeatmaps = () => {
  return (
    <div className="bg-surface-primary rounded-2xl border border-border-default shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-surface-secondary text-text-muted rounded-lg"><Grid size={16} /></div>
          <h3 className="font-bold text-text-heading text-sm">Activity Heatmap</h3>
        </div>
        <select className="bg-surface-secondary border border-border-default text-text-heading text-xs font-semibold rounded-lg px-2 py-1 outline-none">
          <option>Tasks</option>
          <option>Habits</option>
          <option>Focus</option>
        </select>
      </div>

      <div className="overflow-x-auto scrollbar-hide pb-2">
        <div className="min-w-[700px] h-32 flex items-center justify-center bg-surface-secondary/30 rounded-xl border border-dashed border-border-default">
           <span className="text-sm font-semibold text-text-muted">Heatmap Matrix Render</span>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-surface-secondary border border-border-default" />
        <div className="w-3 h-3 rounded-sm bg-interactive-primary/30" />
        <div className="w-3 h-3 rounded-sm bg-interactive-primary/60" />
        <div className="w-3 h-3 rounded-sm bg-interactive-primary" />
        <span>More</span>
      </div>
    </div>
  );
};
