import { logger } from '#common/logger/index.js';

export const executionMetrics = {
  stats: {
    totalExecutions: 0,
    successRate: 100,
    rollbackCount: 0,
    averageLatency: 0
  },
  
  recordExecution: (durationMs, success) => {
    executionMetrics.stats.totalExecutions++;
    if (!success) {
      executionMetrics.stats.successRate = 
        ((executionMetrics.stats.totalExecutions - 1) / executionMetrics.stats.totalExecutions) * 100;
    }
    executionMetrics.stats.averageLatency = 
      (executionMetrics.stats.averageLatency + durationMs) / 2; // naive average
  },
  
  recordRollback: () => {
    executionMetrics.stats.rollbackCount++;
  }
};
