import { logger } from '#common/logger/index.js';
import { insightScoring } from './insight.scoring.js';
import { insightExplanations } from './insight.explanations.js';

export const insightRecommendations = {
  build: (triggers, analysis) => {
    logger.debug({ action: 'AI_RECOMMENDATION_CREATED' }, 'Building structured recommendations');
    
    return triggers.map((trigger, i) => {
      const scores = insightScoring.score(trigger);
      const explanation = insightExplanations.build(trigger, analysis, scores);
      
      return {
        id: `rec_${Date.now()}_${i}`,
        type: 'structural_adjustment',
        priority: scores.priority,
        category: trigger.category,
        title: `Address ${trigger.rule}`,
        reasonCode: trigger.rule,
        confidence: scores.confidence,
        impact: scores.impact,
        estimatedTimeSaved: 30, // mins
        estimatedStressReduction: 'high',
        estimatedFocusGain: 'medium',
        relatedObjects: [],
        action: 'RESCHEDULE',
        explanation
      };
    });
  }
};
