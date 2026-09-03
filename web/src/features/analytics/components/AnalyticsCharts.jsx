import React from 'react';
import { BarChart2, TrendingUp, PieChart } from 'lucide-react';

const ChartPlaceholder = ({ title, icon: Icon, height = 'h-64' }) => (
  <div className="bg-surface-primary rounded-2xl border border-border-default shadow-sm p-5 flex flex-col h-full">
    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border-default">
      <div className="p-1.5 bg-surface-secondary text-text-muted rounded-lg"><Icon size={16} /></div>
      <h3 className="font-bold text-text-heading text-sm">{title}</h3>
    </div>
    <div className={`flex-1 ${height} w-full flex items-center justify-center bg-surface-secondary/30 rounded-xl border border-dashed border-border-default relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')] opacity-20" />
      <div className="flex flex-col items-center gap-2 z-10">
        <BarChart2 size={32} className="text-text-muted/30" />
        <span className="text-sm font-semibold text-text-muted">Chart Visualization Render</span>
      </div>
    </div>
  </div>
);

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <ChartPlaceholder title="Productivity Trend" icon={TrendingUp} />
      <ChartPlaceholder title="Time Allocation" icon={PieChart} />
      <ChartPlaceholder title="Task Completion Velocity" icon={BarChart2} />
      <ChartPlaceholder title="Habit Consistency" icon={TrendingUp} />
    </div>
  );
};
