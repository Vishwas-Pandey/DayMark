import React from 'react';
import { Plus, Target, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { GoalProgressBar } from './GoalProgressBar';
import { computeGoalHealth } from '../utils/goalHealth';

export const GoalHeader = ({ goals, onOpenCreate }) => {
  const activeGoals = goals?.filter(g => g.status === 'active') || [];
  const completedGoals = goals?.filter(g => g.status === 'completed') || [];

  const avgProgress = activeGoals.length
    ? activeGoals.reduce((acc, g) => acc + (g.progress?.progressPercentage ?? g.progressPercentage ?? 0), 0) / activeGoals.length
    : 0;

  const atRiskGoals = activeGoals.filter(g => computeGoalHealth(g) === 'at-risk' || computeGoalHealth(g) === 'behind').length;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-text-heading mb-4">Goals & Projects</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <Target size={16} className="text-blue-500" />
            <span className="text-sm font-semibold text-text-heading">{activeGoals.length} <span className="text-text-muted font-medium">Active</span></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-secondary border border-border-default rounded-xl shadow-sm">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-sm font-semibold text-text-heading">{completedGoals.length} <span className="text-text-muted font-medium">Completed</span></span>
          </div>
          {atRiskGoals > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
              <AlertTriangle size={16} className="text-orange-500" />
              <span className="text-sm font-semibold text-orange-600">{atRiskGoals} <span className="text-orange-600/70 font-medium">At Risk</span></span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 bg-surface-primary p-4 rounded-2xl border border-border-default shadow-sm w-full md:w-[320px] shrink-0 justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Overall Progress</p>
            <p className="text-lg font-bold text-text-heading leading-none flex items-center gap-1">
              <TrendingUp size={16} className="text-interactive-primary" />
              {Math.round(avgProgress)}%
            </p>
          </div>
          <GoalProgressBar percentage={avgProgress} heightClass="h-2.5" />
        </div>
        
        <div className="w-px h-10 bg-border-default shrink-0 hidden md:block" />
        
        <button 
          onClick={onOpenCreate}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-interactive-primary text-white shadow-sm hover:shadow-md hover:bg-interactive-primary/90 transition-all shrink-0"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};
