import { logger } from '#common/logger/index.js';

export const insightScoring = {
  score: (recommendationBase) => {
    logger.debug({ action: 'AI_RECOMMENDATION_SCORED' }, 'Scoring recommendation');
    
    const confidence = 0.85;
    const impact = recommendationBase.category === 'Focus' ? 'high' : 'medium';
    const urgency = recommendationBase.category === 'Productivity' ? 'high' : 'low';
    const severity = 3;
    const priority = 80;
    
    return {
      confidence,
      impact,
      urgency,
      severity,
      priority,
      score: 85
    };
  }
};
