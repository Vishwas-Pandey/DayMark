import React from 'react';

export const AIGoalAdvisor = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface-primary border border-border-default hover:border-interactive-primary/30 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-bold text-text-heading">Launch DayMark</h3>
          <span className="text-xs text-text-muted">Goal Advisor</span>
        </div>
        <div className="w-10 h-10 rounded-full border-4 border-interactive-primary/20 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="4" className="text-interactive-primary" strokeDasharray="100" strokeDashoffset="26" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-bold text-text-heading">74%</span>
        </div>
      </div>
      
      <div className="bg-interactive-primary/5 border border-interactive-primary/10 rounded-xl p-4 mt-2">
        <span className="text-[10px] font-bold text-interactive-primary uppercase tracking-wider block mb-1">AI Advice</span>
        <p className="text-sm text-text-heading leading-relaxed">
          Complete dashboard analytics before authentication to maximize recruiter impact.
        </p>
      </div>
    </div>
  );
};