import { executionPlanner } from './execution.planner.js';
import { executionPreview } from './execution.preview.js';
import { executionConfirmation } from './execution.confirmation.js';
import { executionPermissions } from './execution.permissions.js';
import { executionExecutor } from './execution.executor.js';

export const executionRouter = {
  routeRequest: async (toolCalls, context) => {
    const plan = executionPlanner.generatePlan(toolCalls, context);
    executionPermissions.validatePlan(plan, context);
    
    const confirmReq = executionConfirmation.checkRequirement(plan);
    
    if (confirmReq === 'AUTO') {
      return await executionExecutor.executePlan(plan, context);
    } else {
      const preview = executionPreview.generatePreview(plan);
      return { status: 'PENDING_CONFIRMATION', plan, preview };
    }
  }
};
