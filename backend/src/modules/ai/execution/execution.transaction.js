import { logger } from '#common/logger/index.js';
import { executionRollback } from './execution.rollback.js';
import { toolManager } from '../tools/tool.manager.js';

export const executionTransaction = {
  executeSafely: async (plan, context) => {
    const results = [];
    for (const step of plan.steps) {
      try {
        const res = await toolManager.executeTool(step.name, step.args, context);
        results.push(res);
      } catch (err) {
        logger.error({ action: 'AI_EXECUTION_FAILED', planId: plan.planId }, 'Transaction step failed, initiating rollback');
        await executionRollback.rollbackPlan(plan, context);
        throw err;
      }
    }
    return results;
  }
};
