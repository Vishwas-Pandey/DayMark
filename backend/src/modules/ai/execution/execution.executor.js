import { logger } from '#common/logger/index.js';
import { executionTransaction } from './execution.transaction.js';
import { executionResult } from './execution.result.js';
import { executionMetrics } from './execution.metrics.js';
import { executionAudit } from './execution.audit.js';

export const executionExecutor = {
  executePlan: async (plan, context) => {
    logger.info({ action: 'AI_EXECUTION_STARTED', planId: plan.planId }, 'Starting execution plan');
    const start = Date.now();
    
    try {
      const results = await executionTransaction.executeSafely(plan, context);
      const duration = Date.now() - start;
      
      executionMetrics.recordExecution(duration, true);
      executionAudit.log({ planId: plan.planId, status: 'COMPLETED', duration, userId: context.userId });
      logger.info({ action: 'AI_EXECUTION_COMPLETED', planId: plan.planId }, 'Execution complete');
      
      return executionResult.build(plan.planId, 'COMPLETED', results, duration);
    } catch (err) {
      const duration = Date.now() - start;
      executionMetrics.recordExecution(duration, false);
      executionAudit.log({ planId: plan.planId, status: 'FAILED', error: err.message, userId: context.userId });
      
      return executionResult.build(plan.planId, 'FAILED', null, duration, err.message);
    }
  }
};
