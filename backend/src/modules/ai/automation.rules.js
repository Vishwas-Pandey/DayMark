import { logger } from '#common/logger/index.js';

export const automationRules = {
  // Pre-configured "Smart Rules" that users can toggle
  SMART_RULES: [
    {
      id: 'rule_1',
      description: 'IF task overdue -> move to tomorrow',
      trigger: 'TASK_OVERDUE',
      conditions: [],
      actions: [{ type: 'UPDATE_TASK', template: { moveDate: '+1d' } }]
    },
    {
      id: 'rule_2',
      description: 'IF habit streak broken -> schedule recovery block',
      trigger: 'HABIT_STREAK_BROKEN',
      conditions: [],
      actions: [{ type: 'CREATE_CALENDAR_EVENT', template: { title: 'Habit Recovery' } }]
    }
  ]
};
