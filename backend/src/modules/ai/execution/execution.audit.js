import { logger } from '#common/logger/index.js';

export const executionAudit = {
  log: (auditRecord) => {
    logger.info({ action: 'AI_EXECUTION_AUDIT', ...auditRecord }, 'Execution audit record');
  }
};
