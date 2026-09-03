import { logger } from '#common/logger/index.js';
import { plannerConstraints } from './planner.constraints.js';
import { plannerScheduler } from './planner.scheduler.js';
import { plannerOptimizer } from './planner.optimizer.js';
import { plannerScoring } from './planner.scoring.js';
import { aiContext } from './ai.context.js'; // to get context

export const plannerEngine = {
  buildPlan: async (userId, customConstraints = {}) => {
    logger.info({ userId, action: 'AI_PLAN_GENERATED' }, 'Executing AI Planning Pipeline');
    
    // 1. Collect Context
    const context = await aiContext.buildContext(userId, 'PLANNING_CONTEXT');
    
    // 2. Apply Constraints
    const { filteredContext, appliedConstraints } = plannerConstraints.apply(context, customConstraints);
    
    // 3. Schedule
    const rawSchedule = plannerScheduler.schedule(filteredContext, appliedConstraints);
    
    // 4. Optimize
    const optimizedSchedule = plannerOptimizer.optimize(rawSchedule, context);
    
    // 5. Score
    const scores = plannerScoring.score(optimizedSchedule);
    
    // 6. Assemble Plan Object
    return {
      userId,
      date: new Date(),
      plan: {
        morningBlock: [],
        afternoonBlock: optimizedSchedule.blocks, // mock mapping
        eveningBlock: [],
        deepWork: [],
        meetings: [],
        habits: [],
        breaks: [],
        bufferTime: 30
      },
      warnings: [],
      recommendations: ['Take a walk at 2pm'],
      metrics: scores,
      appliedConstraints
    };
  }
};
