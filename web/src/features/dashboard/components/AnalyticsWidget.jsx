import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp } from 'lucide-react';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { WidgetSkeleton } from '../../../components/common/Skeletons';

export const AnalyticsWidget = () => {
  const { data: analytics, isLoading, error } = useAnalytics({ timeRange: 'week' });

  if (isLoading) return <WidgetSkeleton />;
  if (error) return <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 h-full">Failed to load analytics.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-5 rounded-xl border border-border-default bg-surface-primary shadow-sm h-[320px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-text-heading">Weekly Overview</h3>
        <button className="p-1.5 text-text-muted hover:text-text-heading hover:bg-surface-secondary rounded-md transition-colors">
          <BarChart2 size={16} />
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase">Completion</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-text-heading">{analytics?.completionRate || 0}%</span>
            <span className="text-xs text-green-500 font-medium mb-1 flex items-center"><TrendingUp size={12}/> 5%</span>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex flex-col justify-between">
          <span className="text-xs font-bold text-text-muted uppercase">Deep Work</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-text-heading">{analytics?.deepWorkHours || 0}h</span>
          </div>
        </div>

        <div className="col-span-2 p-4 rounded-xl bg-surface-secondary/50 border border-border-default flex items-end gap-1.5 h-full">
          {/* Mock mini-bar chart representing days of week for visual completeness of widget without huge charting lib */}
          {[40, 60, 30, 80, 50, 90, 70].map((val, i) => (
             <div key={i} className="flex-1 bg-surface-primary rounded-t-sm relative group" style={{ height: '100%' }}>
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${val}%` }} 
                  className="absolute bottom-0 left-0 right-0 bg-interactive-primary/80 group-hover:bg-interactive-primary rounded-t-sm transition-colors"
                />
             </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
