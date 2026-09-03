import { logger } from '#common/logger/index.js';

export const executionConfirmation = {
  checkRequirement: (executionPlan) => {
    logger.debug({ action: 'AI_EXECUTION_CONFIRMATION_CHECK' }, 'Evaluating confirmation requirements');
    if (executionPlan.risk === 'HIGH') return 'REQUIRED';
    if (executionPlan.risk === 'LOW') return 'AUTO';
    return 'NEVER';
  }
};
