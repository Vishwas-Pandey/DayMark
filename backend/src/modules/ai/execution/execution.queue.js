import { logger } from '#common/logger/index.js';

export const executionQueue = {
  queue: new Map(),
  
  enqueue: (executionPlan, context) => {
    executionQueue.queue.set(executionPlan.planId, { plan: executionPlan, context, status: 'pending' });
    return executionPlan.planId;
  },
  
  dequeue: (planId) => {
    const item = executionQueue.queue.get(planId);
    if (item) item.status = 'running';
    return item;
  }
};
