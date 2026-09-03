import React from 'react';
import { RefreshCw, Activity, Target, Zap, LayoutDashboard, HeartPulse } from 'lucide-react';

export const AnalyticsHeader = ({ data, isRefetching, onRefetch }) => {
  const getScore = (val) => Math.round(val || 0);
  
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-heading mb-4">Analytics & Insights</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-interactive-primary/10 border border-interactive-primary/20 rounded-xl shadow-sm">
            <Activity size={16} className="text-interactive-primary" />
            <span className="text-sm font-semibold text-text-heading">{getScore(data?.scores?.productivityScore)} <span className="text-text-muted font-medium">Productivity</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-xl shadow-sm">
            <Zap size={16} className="text-purple-500" />
            <span className="text-sm font-semibold text-text-heading">{getScore(data?.scores?.focusScore)} <span className="text-text-muted font-medium">Focus</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
            <LayoutDashboard size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-text-heading">{getScore(data?.scores?.consistencyScore)} <span className="text-text-muted font-medium">Consistency</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <Target size={16} className="text-green-500" />
            <span className="text-sm font-semibold text-text-heading">{getScore(data?.scores?.completionScore)} <span className="text-text-muted font-medium">Completion</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 border border-pink-200 rounded-xl shadow-sm">
            <HeartPulse size={16} className="text-pink-500" />
            <span className="text-sm font-semibold text-text-heading">{getScore(data?.scores?.wellbeingScore)} <span className="text-text-muted font-medium">Wellbeing</span></span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={onRefetch}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-secondary text-text-muted border border-border-default shadow-sm hover:text-text-heading hover:bg-surface-primary transition-all"
        >
          <RefreshCw size={18} className={isRefetching ? 'animate-spin text-interactive-primary' : ''} />
        </button>
      </div>
    </div>
  );
};
