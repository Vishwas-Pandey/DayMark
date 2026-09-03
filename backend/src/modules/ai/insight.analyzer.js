import { logger } from '#common/logger/index.js';

export const insightAnalyzer = {
  analyze: (context) => {
    logger.debug({ action: 'AI_CONTEXT_ANALYZED' }, 'Analyzing context for insights');
    // Extracts specific vectors for pattern detection
    return {
      taskOverdueCount: context.tasks?.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length || 0,
      habitStreaks: context.habits?.map(h => ({ id: h._id, streak: h.streak })) || [],
      meetingCount: context.calendar?.filter(c => c.type === 'meeting').length || 0,
      focusCount: context.calendar?.filter(c => c.type === 'focus').length || 0,
      lastJournalDate: context.journal?.[0]?.createdAt || null,
      productivityTrend: context.analytics?.productivityScore > 80 ? 'improving' : 'declining'
    };
  }
};
