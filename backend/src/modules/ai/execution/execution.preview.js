import { logger } from '#common/logger/index.js';

export const executionPreview = {
  generatePreview: (executionPlan) => {
    logger.debug({ action: 'AI_EXECUTION_PREVIEWED' }, 'Generating preview of execution plan');
    return {
      planId: executionPlan.planId,
      objectsAffected: 1,
      beforeState: {},
      afterState: {},
      summary: 'Mock execution preview',
      warnings: [],
      riskLevel: executionPlan.risk,
      estimatedDuration: executionPlan.estimatedTime
    };
  }
};
