import { logger } from '#common/logger/index.js';

export const llmMetrics = {
  stats: {
    totalRequests: 0,
    success: 0,
    failures: 0,
    fallbacks: 0,
    totalTokens: 0,
    estimatedCost: 0
  },
  
  record: (metricData) => {
    llmMetrics.stats.totalRequests++;
    if (metricData.success) {
      llmMetrics.stats.success++;
      llmMetrics.stats.totalTokens += (metricData.tokens || 0);
      llmMetrics.stats.estimatedCost += (metricData.cost || 0);
    } else {
      llmMetrics.stats.failures++;
    }
    
    if (metricData.fallback) {
      llmMetrics.stats.fallbacks++;
    }
    
    logger.info({ action: 'AI_METRICS_RECORDED', ...metricData }, 'LLM Metric recorded');
  },
  
  getStats: () => llmMetrics.stats
};
