import { logger } from '#common/logger/index.js';

export const contextRanker = {
  rank: (collectedData) => {
    logger.debug({ action: 'AI_CONTEXT_RANKED' }, 'Ranking context items');
    
    const rankItem = (item, type) => {
      let importanceScore = 50;
      let relevanceScore = 50;
      let priorityScore = 50;

      if (type === 'task') {
        if (item.priority === 'high' || item.priority === 'urgent') importanceScore += 30;
        if (item.status === 'in_progress') relevanceScore += 20;
      }

      if (type === 'habit' && item.streak > 3) importanceScore += 20;
      
      return { ...item, _ranking: { importanceScore, relevanceScore, priorityScore } };
    };

    return {
      ...collectedData,
      tasks: collectedData.tasks.map(t => rankItem(t, 'task')),
      habits: collectedData.habits.map(h => rankItem(h, 'habit')),
      goals: collectedData.goals.map(g => rankItem(g, 'goal')),
      calendar: collectedData.calendar.map(c => rankItem(c, 'calendar')),
      journal: collectedData.journal.map(j => rankItem(j, 'journal')),
    };
  }
};
