import { logger } from '#common/logger/index.js';

export const insightRules = {
  evaluate: (patterns) => {
    logger.debug({ action: 'AI_RULE_TRIGGERED' }, 'Evaluating insight rules');
    
    const triggers = [];
    
    if (patterns.includes('TASK_OVERLOAD')) {
      triggers.push({ rule: 'HIGH_PRIORITY_ALERT', category: 'Productivity' });
    }
    
    if (patterns.includes('FOCUS_FRAGMENTATION')) {
      triggers.push({ rule: 'FOCUS_WARNING', category: 'Focus' });
    }
    
    if (patterns.includes('JOURNAL_INACTIVITY')) {
      triggers.push({ rule: 'REFLECTION_REMINDER', category: 'Wellbeing' });
    }
    
    return triggers;
  }
};
