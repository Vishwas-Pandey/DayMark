import { logger } from '#common/logger/index.js';

export const automationActions = {
  build: (actionDefinitions, payload) => {
    logger.debug({ action: 'AI_ACTION_BUILT' }, 'Building action execution payload');
    
    return actionDefinitions.map(def => ({
      ...def,
      resolvedPayload: { ...def.template, ...payload } // simplistic mapping
    }));
  },

  SUPPORTED_ACTIONS: [
    'CREATE_TASK', 'UPDATE_TASK', 'ARCHIVE_TASK',
    'CREATE_HABIT_REMINDER',
    'CREATE_CALENDAR_EVENT', 'MOVE_CALENDAR_EVENT',
    'CREATE_JOURNAL_PROMPT',
    'CREATE_NOTIFICATION',
    'TRIGGER_INSIGHT_REFRESH', 'TRIGGER_PLANNING_REFRESH',
    'TRIGGER_ANALYTICS_SNAPSHOT', 'TRIGGER_AI_PIPELINE'
  ]
};
