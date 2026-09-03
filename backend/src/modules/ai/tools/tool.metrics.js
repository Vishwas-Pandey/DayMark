import { logger } from '#common/logger/index.js';

export const toolMetrics = {
  recordExecution: (toolName, durationMs, success) => {
    logger.info({ action: 'AI_TOOL_METRIC', toolName, durationMs, success }, 'Tool execution metric');
  }
};
