import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { analyticsApi } from '../../../api/analytics';
import { WidgetSkeleton } from '../../../components/common/Skeletons';

const DAYS = 7;

export const AnalyticsWidget = () => {
  const navigate = useNavigate();
  const { data: analytics, isLoading, error } = useAnalytics({ timeRange: 'week' });

  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - (DAYS - 1));

  const { data: heatmap } = useQuery({
    queryKey: ['analytics', 'heatmap', 'week'],
    queryFn: () => analyticsApi.getHeatmap({ startDate: start.toISOString(), endDate: end.toISOString() }).then((res) => res.data)
  });

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load analytics.</div>;

  const completionRate = Math.round(analytics?.tasks?.completionRate || 0);
  const deepWorkHours = Math.round(((analytics?.calendar?.focusTime || 0) / 60) * 10) / 10;

  const dayCells = [...Array(DAYS)].map((_, i) => {
    const date = new Date(end);
    date.setDate(end.getDate() - (DAYS - 1 - i));
    const key = date.toISOString().slice(0, 10);
    const count = heatmap?.find((h) => h.date === key)?.count || 0;
    return { date, count };
  });
  const maxCount = Math.max(1, ...dayCells.map((d) => d.count));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading">Weekly Overview</h3>
        <button
          onClick={() => navigate('/analytics')}
          className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors"
          aria-label="View full analytics"
        >
          <BarChart2 size={16} />
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase">Completion</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-text-heading">{completionRate}%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase">Deep Work</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-text-heading">{deepWorkHours}h</span>
          </div>
        </div>

        <div className="col-span-2 p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex items-end gap-1.5 h-full">
          {dayCells.map(({ date, count }, i) => (
            <div key={i} className="flex-1 bg-surface-primary rounded-t-sm relative group" style={{ height: '100%' }} title={`${date.toLocaleDateString(undefined, { weekday: 'short' })}: ${count} completed`}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(4, (count / maxCount) * 100)}%` }}
                className="absolute bottom-0 left-0 right-0 bg-interactive-primary/80 group-hover:bg-interactive-primary rounded-t-sm transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
