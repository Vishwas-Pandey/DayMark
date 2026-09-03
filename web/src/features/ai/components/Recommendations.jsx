import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { useAIInsights } from '../../../hooks/useAIInsights';

const humanize = (title) => title?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const CATEGORY_STYLE = {
  Focus: { icon: AlertTriangle, colorClass: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  Productivity: { icon: AlertTriangle, colorClass: 'text-orange-500 bg-orange-500/10 border-orange-500/20' },
  Wellbeing: { icon: TrendingUp, colorClass: 'text-green-500 bg-green-500/10 border-green-500/20' },
};

export const Recommendations = () => {
  const { data, isLoading, error } = useAIInsights();
  const recommendations = data?.recommendations || [];

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-text-heading text-sm uppercase tracking-wide px-1">Smart Recommendations</h4>

      {isLoading && (
        <div className="space-y-2">
          {[...Array(2)].map((_, i) => <div key={i} className="h-14 rounded-xl bg-surface-primary/60 animate-pulse" />)}
        </div>
      )}

      {!isLoading && error && (
        <p className="text-xs text-text-muted px-1">Couldn't load recommendations right now.</p>
      )}

      {!isLoading && !error && recommendations.length === 0 && (
        <p className="text-xs text-text-muted px-1">Nothing to flag — you're on top of things.</p>
      )}

      <div className="space-y-2">
        {recommendations.map((rec) => {
          const style = CATEGORY_STYLE[rec.category] || { icon: Zap, colorClass: 'text-interactive-primary bg-interactive-primary/10 border-interactive-primary/20' };
          const Icon = style.icon;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -1, scale: 1.01 }}
              className="p-3 rounded-xl bg-surface-primary border border-border-default flex items-center gap-3 shadow-sm hover:shadow-md transition-all"
              title={rec.explanation?.supportingEvidence}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${style.colorClass}`}>
                <Icon size={14} />
              </div>
              <span className="text-sm font-medium text-text-heading">{humanize(rec.title)}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
