import { executionRouter } from './execution.router.js';
import { executionExecutor } from './execution.executor.js';
import { executionPreview } from './execution.preview.js';
import { executionMetrics } from './execution.metrics.js';

export const executionEngine = {
  execute: executionRouter.routeRequest,
  preview: executionPreview.generatePreview,
  confirm: executionExecutor.executePlan,
  getMetrics: () => executionMetrics.stats
};
