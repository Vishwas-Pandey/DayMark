import { logger } from '#common/logger/index.js';

export const plannerEstimator = {
  estimate: (task) => {
    logger.debug({ action: 'AI_DURATION_ESTIMATED', taskId: task._id }, 'Estimating task duration');
    
    let estimatedDuration = task.estimatedMinutes || 30; // base fallback
    let confidence = 0.8;
    
    if (task.difficulty === 'hard') estimatedDuration *= 1.5;
    if (task.priority === 'urgent') estimatedDuration *= 1.2;
    
    // Add buffer
    estimatedDuration = Math.ceil(estimatedDuration * 1.1);
    
    return {
      estimatedDuration,
      confidence
    };
  }
};
