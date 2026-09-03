import { logger } from '#common/logger/index.js';

export const automationTriggers = {
  detect: (eventName, payload) => {
    logger.debug({ action: 'AI_TRIGGER_FIRED', eventName }, 'Detecting automation triggers');
    
    // Simulate lookup of configured workflows for this trigger
    const matchedWorkflows = [];
    
    // Mock mapping for example purposes
    if (eventName === 'TASK_OVERDUE') {
      matchedWorkflows.push({ id: 'wf_1', trigger: 'TASK_OVERDUE' });
    }
    
    return matchedWorkflows;
  },
  
  SUPPORTED_TRIGGERS: [
    'TASK_CREATED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'TASK_UPDATED',
    'HABIT_COMPLETED', 'HABIT_STREAK_UPDATED',
    'GOAL_COMPLETED', 'GOAL_PROGRESS_UPDATED',
    'CALENDAR_EVENT_CREATED', 'CALENDAR_EVENT_COMPLETED',
    'JOURNAL_CREATED', 'JOURNAL_UPDATED',
    'LOGIN', 'MIDNIGHT', 'WEEKLY', 'MONTHLY', 'MANUAL'
  ]
};
