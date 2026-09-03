import { logger } from '#common/logger/index.js';
import { automationTriggers } from './automation.triggers.js';
import { automationConditions } from './automation.conditions.js';
import { automationActions } from './automation.actions.js';
import { automationExecutor } from './automation.executor.js';

export const automationEngine = {
  triggerEvent: async (userId, eventName, payload) => {
    logger.info({ userId, eventName }, 'Automation engine received event');
    
    // 1. Detect matching workflows
    const workflows = automationTriggers.detect(eventName, payload);
    
    const executions = [];
    
    for (const workflow of workflows) {
      // 2. Evaluate conditions
      if (automationConditions.evaluate(workflow.conditions, payload)) {
        // 3. Build action templates
        const resolvedActions = automationActions.build(workflow.actions || [], payload);
        const executableWorkflow = { ...workflow, actions: resolvedActions };
        
        // 4. Execute
        const result = await automationExecutor.executeWorkflow(executableWorkflow, { userId, payload });
        executions.push(result);
      }
    }
    
    return executions;
  },

  getAvailableTriggers: () => automationTriggers.SUPPORTED_TRIGGERS,
  getAvailableActions: () => automationActions.SUPPORTED_ACTIONS,
  
  testWorkflow: async (userId, workflowDef, mockPayload) => {
    return automationExecutor.executeWorkflow(workflowDef, { userId, payload: mockPayload });
  }
};
