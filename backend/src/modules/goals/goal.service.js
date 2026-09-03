import { goalRepository } from './goal.repository.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

export const goalService = {
  createGoal: async (userId, data) => {
    const goal = await goalRepository.create({
      ...data,
      userId,
      createdBy: userId,
      updatedBy: userId
    });
    
    logger.info({ userId, goalId: goal._id, action: 'GOAL_CREATED' }, 'Goal created');
    return goal;
  },

  getGoalById: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    return goal;
  },
  
  getGoals: async (userId, filters, pagination, sort) => {
    const query = { userId };
    
    if (filters.status) query.status = filters.status;
    if (filters.type) query.type = filters.type;
    if (filters.priority) query.priority = filters.priority;
    if (filters.category) query.category = filters.category;
    if (filters.tags) query.tags = { $in: filters.tags.split(',') };
    
    if (filters.archived === 'true') {
      query.archived = true;
    } else if (filters.archived === 'false') {
      query.archived = false;
    }
    
    const goals = await goalRepository.findAll(query, pagination, sort);
    const total = await goalRepository.count(query);
    
    return { goals, total };
  },

  updateGoal: async (id, userId, data) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    
    data.updatedBy = userId;
    data['metadata.lastUpdated'] = new Date();
    
    const updated = await goalRepository.update(id, userId, data);
    logger.info({ userId, goalId: id, action: 'GOAL_UPDATED' }, 'Goal updated');
    return updated;
  },
  
  pauseGoal: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    if (goal.status !== 'active') throw new AppError('Only active goals can be paused', 400);
    
    const updated = await goalRepository.update(id, userId, { status: 'paused', updatedBy: userId, 'metadata.lastUpdated': new Date() });
    logger.info({ userId, goalId: id, action: 'GOAL_PAUSED' }, 'Goal paused');
    return updated;
  },

  resumeGoal: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    if (goal.status !== 'paused') throw new AppError('Only paused goals can be resumed', 400);
    
    const updated = await goalRepository.update(id, userId, { status: 'active', updatedBy: userId, 'metadata.lastUpdated': new Date() });
    logger.info({ userId, goalId: id, action: 'GOAL_RESUMED' }, 'Goal resumed');
    return updated;
  },
  
  archiveGoal: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    if (goal.status === 'archived') throw new AppError('Goal already archived', 400);
    if (goal.status !== 'completed') throw new AppError('Only completed goals can be archived', 400);
    
    const updated = await goalRepository.update(id, userId, { status: 'archived', archived: true, updatedBy: userId, 'metadata.lastUpdated': new Date() });
    logger.info({ userId, goalId: id, action: 'GOAL_ARCHIVED' }, 'Goal archived');
    return updated;
  },

  completeGoal: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    if (goal.status === 'completed') throw new AppError('Goal already completed', 400);
    if (goal.status === 'archived') throw new AppError('Cannot complete archived goal', 400);
    
    const updated = await goalRepository.update(id, userId, { 
      status: 'completed', 
      'progress.currentValue': goal.progress.targetValue,
      'progress.progressPercentage': 100,
      'timeline.completedAt': new Date(),
      'metadata.lastUpdated': new Date(),
      updatedBy: userId 
    });
    logger.info({ userId, goalId: id, action: 'GOAL_COMPLETED' }, 'Goal completed');
    return updated;
  },

  softDeleteGoal: async (id, userId) => {
    const goal = await goalRepository.softDelete(id, userId);
    if (!goal) throw new NotFoundError('Goal not found or already deleted');
    logger.info({ userId, goalId: id, action: 'GOAL_DELETED' }, 'Goal deleted');
    return true;
  },

  restoreGoal: async (id, userId) => {
    const goal = await goalRepository.restore(id, userId);
    if (!goal) throw new NotFoundError('Goal not found in trash');
    logger.info({ userId, goalId: id, action: 'GOAL_RESTORED' }, 'Goal restored');
    return goal;
  },
  
  updateProgress: async (id, userId, progressData) => {
    const goal = await goalRepository.updateProgress(id, userId, progressData);
    if (!goal) throw new NotFoundError('Goal not found');
    logger.info({ userId, goalId: id, action: 'GOAL_PROGRESS_UPDATED' }, 'Goal progress updated');
    return goal;
  },

  attachTask: async (id, userId, taskId) => {
    const goal = await goalRepository.attachTask(id, userId, taskId);
    if (!goal) throw new NotFoundError('Goal not found');
    logger.info({ userId, goalId: id, action: 'TASK_ATTACHED_TO_GOAL' }, 'Task attached to goal');
    return goal;
  },

  detachTask: async (id, userId, taskId) => {
    const goal = await goalRepository.detachTask(id, userId, taskId);
    if (!goal) throw new NotFoundError('Goal not found');
    logger.info({ userId, goalId: id, action: 'TASK_DETACHED_FROM_GOAL' }, 'Task detached from goal');
    return goal;
  },

  attachHabit: async (id, userId, habitId) => {
    const goal = await goalRepository.attachHabit(id, userId, habitId);
    if (!goal) throw new NotFoundError('Goal not found');
    logger.info({ userId, goalId: id, action: 'HABIT_ATTACHED_TO_GOAL' }, 'Habit attached to goal');
    return goal;
  },

  detachHabit: async (id, userId, habitId) => {
    const goal = await goalRepository.detachHabit(id, userId, habitId);
    if (!goal) throw new NotFoundError('Goal not found');
    logger.info({ userId, goalId: id, action: 'HABIT_DETACHED_FROM_GOAL' }, 'Habit detached from goal');
    return goal;
  },

  getStats: async (id, userId) => {
    const goal = await goalRepository.findById(id, userId);
    if (!goal) throw new NotFoundError('Goal not found');
    
    const now = new Date();
    const start = new Date(goal.timeline.startDate);
    const target = goal.timeline.targetDate ? new Date(goal.timeline.targetDate) : null;
    
    let daysElapsed = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
    let remainingDays = null;
    let velocity = 0; // value per day
    let estimatedCompletionDate = null;
    let health = 'on_track'; // on_track, at_risk, behind
    
    if (target) {
      remainingDays = Math.max(0, Math.floor((target - now) / (1000 * 60 * 60 * 24)));
    }
    
    if (daysElapsed > 0 && goal.progress.currentValue > 0) {
      velocity = goal.progress.currentValue / daysElapsed;
    }
    
    const remainingValue = Math.max(0, goal.progress.targetValue - goal.progress.currentValue);
    
    if (velocity > 0) {
      const daysToComplete = remainingValue / velocity;
      estimatedCompletionDate = new Date(now.getTime() + daysToComplete * 24 * 60 * 60 * 1000);
      
      if (target) {
        if (estimatedCompletionDate > target) {
          health = (estimatedCompletionDate.getTime() - target.getTime()) > (7 * 24 * 60 * 60 * 1000) ? 'behind' : 'at_risk';
        }
      }
    } else if (remainingDays !== null && remainingDays < 7 && remainingValue > 0) {
       health = 'behind';
    }
    
    return {
      progressPercentage: goal.progress.progressPercentage,
      remainingPercentage: 100 - goal.progress.progressPercentage,
      remainingValue,
      remainingDays,
      daysElapsed,
      velocity: Number(velocity.toFixed(2)),
      estimatedCompletionDate,
      health,
      status: goal.status
    };
  }
};
