import { logger } from '#common/logger/index.js';

export const insightDetector = {
  detectPatterns: (analysis) => {
    logger.debug({ action: 'AI_PATTERN_DETECTED' }, 'Detecting behavioral patterns');
    
    const patterns = [];
    
    if (analysis.taskOverdueCount > 10) patterns.push('TASK_OVERLOAD');
    if (analysis.meetingCount > analysis.focusCount) patterns.push('FOCUS_FRAGMENTATION');
    if (analysis.habitStreaks.some(h => h.streak === 0)) patterns.push('DECLINING_STREAKS');
    
    const daysSinceJournal = analysis.lastJournalDate 
      ? (new Date().getTime() - new Date(analysis.lastJournalDate).getTime()) / (1000 * 3600 * 24)
      : Infinity;
      
    if (daysSinceJournal > 7) patterns.push('JOURNAL_INACTIVITY');
    
    return patterns;
  }
};
