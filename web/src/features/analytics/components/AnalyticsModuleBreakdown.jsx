import React from 'react';
import { moodEmoji } from '../../journal/utils/mood';

export const AnalyticsModuleBreakdown = ({ data }) => {
  const modules = [
    {
      title: 'Task Analytics',
      metrics: [
        { label: 'Completed', value: data?.tasks?.completed || 0 },
        { label: 'Overdue', value: data?.tasks?.overdue || 0 },
        { label: 'Completion Rate', value: `${Math.round(data?.tasks?.completionRate || 0)}%` }
      ]
    },
    {
      title: 'Goal Analytics',
      metrics: [
        { label: 'Active', value: data?.goals?.active || 0 },
        { label: 'Completed', value: data?.goals?.completed || 0 },
        { label: 'Average Progress', value: `${Math.round(data?.goals?.avgProgress || 0)}%` }
      ]
    },
    {
      title: 'Journal Analytics',
      metrics: [
        { label: 'Entries', value: data?.journal?.entries || 0 },
        { label: 'Words Written', value: data?.journal?.words || 0 },
        { label: 'Avg Mood', value: moodEmoji({ score: data?.journal?.avgMood }) }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {modules.map((mod, i) => (
        <div key={i} className="bg-surface-primary rounded-2xl border border-border-default shadow-sm p-5">
          <h3 className="font-bold text-text-heading text-sm mb-4 pb-3 border-b border-border-default">{mod.title}</h3>
          <div className="space-y-4">
            {mod.metrics.map((metric, j) => (
              <div key={j} className="flex justify-between items-center">
                <span className="text-sm font-semibold text-text-muted">{metric.label}</span>
                <span className="text-sm font-bold text-text-heading">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
