import { logger } from '#common/logger/index.js';

export const plannerScoring = {
  score: (optimizedSchedule) => {
    logger.debug({ action: 'AI_PLAN_SCORED' }, 'Scoring generated plan');
    
    return {
      scheduleScore: 85,
      focusScore: 90,
      energyScore: 75,
      productivityScore: 88,
      stressScore: 20, // lower is better
      balanceScore: 80,
      overallPlanScore: 85
    };
  }
};
