import { logger } from '#common/logger/index.js';

export const contextCollector = {
  collect: async (userId) => {
    logger.debug({ userId, action: 'AI_CONTEXT_COLLECTED' }, 'Collecting raw domain context');
    
    // In a real implementation, this would fetch from repositories.
    // For now, we return mock structures matching the spec.
    return {
      user: { _id: userId, timezone: 'UTC' },
      tasks: [
        { _id: 't1', title: 'Finish Phase 3', status: 'in_progress', priority: 'high', dueDate: new Date() },
        { _id: 't2', title: 'Old Task', status: 'completed', priority: 'low', completedAt: new Date(Date.now() - 86400000) }
      ],
      habits: [
        { _id: 'h1', title: 'Drink Water', streak: 5, completedToday: false }
      ],
      goals: [
        { _id: 'g1', title: 'Launch App', progress: 80, status: 'active' }
      ],
      calendar: [
        { _id: 'c1', title: 'Sync Meeting', type: 'meeting', start: new Date(), end: new Date(Date.now() + 3600000) }
      ],
      journal: [
        { _id: 'j1', content: 'Feeling productive', moodScore: 8, createdAt: new Date() }
      ],
      analytics: {
        productivityScore: 85,
        completionScore: 90
      },
      memory: []
    };
  }
};
