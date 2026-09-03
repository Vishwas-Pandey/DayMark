import { logger } from '#common/logger/index.js';

export const contextTimeline = {
  build: (compressedData) => {
    logger.debug({ action: 'AI_TIMELINE_GENERATED' }, 'Generating chronological timeline');
    
    const now = Date.now();
    
    return {
      past: compressedData.tasks.filter(t => t.completedAt && new Date(t.completedAt).getTime() < now),
      present: compressedData.calendar.filter(c => new Date(c.start).getTime() <= now && new Date(c.end).getTime() >= now),
      upcoming: compressedData.calendar.filter(c => new Date(c.start).getTime() > now),
      future: compressedData.goals
    };
  }
};
