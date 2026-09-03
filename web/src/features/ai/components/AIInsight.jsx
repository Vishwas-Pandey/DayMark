import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useAIInsights } from '../../../hooks/useAIInsights';

export const AIInsight = () => {
  const { data, isLoading, error } = useAIInsights();

  const insightText = isLoading
    ? 'Analyzing your day...'
    : error
      ? "Couldn't load your insight right now."
      : data?.summary && data?.positiveSignals?.[0]
        ? data.positiveSignals[0]
        : "No standout patterns yet — keep using DayMark and insights will show up here.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-5 rounded-2xl bg-gradient-to-br from-surface-primary to-surface-secondary border border-interactive-primary/20 shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 text-interactive-primary transition-opacity group-hover:opacity-100">
        <Sparkles size={40} strokeWidth={1} />
      </div>

      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className="w-6 h-6 rounded-full bg-interactive-primary/10 flex items-center justify-center text-interactive-primary">
          <Sparkles size={12} />
        </div>
        <h4 className="font-bold text-text-heading text-sm uppercase tracking-wide">Daily Insight</h4>
      </div>

      <p className="text-sm text-text-heading leading-relaxed relative z-10 font-medium">
        {insightText}
      </p>

      {!isLoading && data?.scores?.overallInsightHealth != null && (
        <p className="text-xs text-text-muted mt-3 relative z-10">
          Insight health: <span className="font-semibold text-text-heading">{data.scores.overallInsightHealth}/100</span>
        </p>
      )}
    </motion.div>
  );
};
