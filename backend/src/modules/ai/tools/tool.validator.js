import { logger } from '#common/logger/index.js';
import { AppError } from '#common/errors/AppError.js';

export const toolValidator = {
  validateInput: (toolDef, inputArgs) => {
    // Real implementation would parse via toolDef.inputSchema
    return true;
  },
  validateOutput: (toolDef, outputResult) => {
    return true;
  }
};
