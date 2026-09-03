import { AI_JOBS } from './ai.constants.js';
import { logger } from '#common/logger/index.js';

const jobRegistry = new Map();

export const aiJobs = {
  register: (jobName, cronExpression, handler) => {
    if (!Object.values(AI_JOBS).includes(jobName)) {
      throw new Error(`Invalid job name: ${jobName}`);
    }
    
    jobRegistry.set(jobName, { cronExpression, handler });
    logger.info({ jobName, cronExpression, action: 'AI_JOB_REGISTERED' }, 'AI Job Registered');
  },
  
  getRegistryStatus: () => {
    const status = {};
    for (const [key, val] of jobRegistry.entries()) {
      status[key] = val.cronExpression;
    }
    return status;
  }
};

// Initialize placeholders
Object.values(AI_JOBS).forEach(job => {
  aiJobs.register(job, '0 0 * * *', async () => {
    logger.debug({ job }, 'Placeholder job executed');
  });
});
