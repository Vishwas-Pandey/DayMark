import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid } from 'lucide-react';
import { analyticsApi } from '../../../api/analytics';

const WEEKS = 12;
const DAYS_SHOWN = WEEKS * 7;

export const AnalyticsHeatmaps = () => {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (DAYS_SHOWN - 1));

  const { data: heatmap } = useQuery({
    queryKey: ['analytics', 'heatmap', WEEKS],
    queryFn: () => analyticsApi.getHeatmap({ startDate: start.toISOString(), endDate: end.toISOString() }).then((res) => res.data)
  });

  const countByDate = new Map((heatmap || []).map((h) => [h.date, h.count]));
  const dayCells = [...Array(DAYS_SHOWN)].map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return { date, count: countByDate.get(date.toISOString().slice(0, 10)) || 0 };
  });
  const maxCount = Math.max(1, ...dayCells.map((d) => d.count));
  const intensity = (count) => {
    if (count === 0) return 'bg-surface-secondary border border-border-default';
    const ratio = count / maxCount;
    if (ratio > 0.66) return 'bg-interactive-primary';
    if (ratio > 0.33) return 'bg-interactive-primary/60';
    return 'bg-interactive-primary/30';
  };

  return (
    <div className="bg-surface-primary rounded-2xl border border-border-default shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-surface-secondary text-text-muted rounded-lg"><Grid size={16} /></div>
          <h3 className="font-bold text-text-heading text-sm">Task Completion Heatmap</h3>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide pb-2">
        <div className="min-w-[700px] grid grid-flow-col grid-rows-7 gap-1.5">
          {dayCells.map(({ date, count }, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-sm ${intensity(count)}`}
              title={`${date.toLocaleDateString()}: ${count} completed`}
            />
          ))}
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
