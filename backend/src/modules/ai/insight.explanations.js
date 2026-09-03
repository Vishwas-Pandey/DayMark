import { logger } from '#common/logger/index.js';

export const insightExplanations = {
  build: (trigger, analysis, scores) => {
    logger.debug({ action: 'AI_EXPLANATION_CREATED' }, 'Building XAI explanation');
    
    return {
      reasonCode: trigger.rule,
      metricsUsed: Object.keys(analysis),
      rulesTriggered: [trigger.rule],
      confidenceScore: scores.confidence,
      supportingEvidence: `Rule ${trigger.rule} triggered based on pattern detected.`,
      expectedOutcome: 'Improved workflow balance.'
    };
  }
};
