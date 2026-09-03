import { habitRepository } from './habit.repository.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const habitService = {
  createHabit: async (userId, data) => {
    const habit = await habitRepository.create({
      ...data,
      userId,
      createdBy: userId,
      updatedBy: userId
    });
    
    logger.info({ userId, habitId: habit._id, action: 'HABIT_CREATED' }, 'Habit created');
    return habit;
  },

  getHabitById: async (id, userId) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    return habit;
  },
  
  getHabits: async (userId, filters, pagination, sort) => {
    const query = { userId };
    
    if (filters.status) query.status = filters.status;
    if (filters.frequency) query.frequency = filters.frequency;
    if (filters.priority) query.priority = filters.priority;
    if (filters.difficulty) query.difficulty = filters.difficulty;
    if (filters.energy) query.energy = filters.energy;
    if (filters.type) query.type = filters.type;
    
    if (filters.archived === 'true') {
      query.archived = true;
    } else if (filters.archived === 'false') {
      query.archived = false;
    }
    
    const habits = await habitRepository.findAll(query, pagination, sort);
    const total = await habitRepository.count(query);
    
    return { habits, total };
  },

  updateHabit: async (id, userId, data) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    
    data.updatedBy = userId;
    const updated = await habitRepository.update(id, userId, data);
    logger.info({ userId, habitId: id, action: 'HABIT_UPDATED' }, 'Habit updated');
    return updated;
  },
  
  pauseHabit: async (id, userId) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    if (habit.status === 'paused') throw new AppError('Habit already paused', 400);
    
    const updated = await habitRepository.update(id, userId, { status: 'paused', updatedBy: userId });
    logger.info({ userId, habitId: id, action: 'HABIT_PAUSED' }, 'Habit paused');
    return updated;
  },

  resumeHabit: async (id, userId) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    if (habit.status !== 'paused') throw new AppError('Habit is not paused', 400);
    
    const updated = await habitRepository.update(id, userId, { status: 'active', updatedBy: userId });
    logger.info({ userId, habitId: id, action: 'HABIT_RESUMED' }, 'Habit resumed');
    return updated;
  },
  
  archiveHabit: async (id, userId) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    if (habit.status === 'archived') throw new AppError('Habit already archived', 400);
    
    const updated = await habitRepository.update(id, userId, { status: 'archived', archived: true, updatedBy: userId });
    logger.info({ userId, habitId: id, action: 'HABIT_ARCHIVED' }, 'Habit archived');
    return updated;
  },

  softDeleteHabit: async (id, userId) => {
    const habit = await habitRepository.softDelete(id, userId);
    if (!habit) throw new NotFoundError('Habit not found or already deleted');
    logger.info({ userId, habitId: id, action: 'HABIT_DELETED' }, 'Habit deleted');
    return true;
  },

  restoreHabit: async (id, userId) => {
    const habit = await habitRepository.restore(id, userId);
    if (!habit) throw new NotFoundError('Habit not found in trash');
    logger.info({ userId, habitId: id, action: 'HABIT_RESTORED' }, 'Habit restored');
    return habit;
  },
  
  completeHabit: async (id, userId, data) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    
    const dateToComplete = data.completedAt ? new Date(data.completedAt) : new Date();
    
    // Check if already completed today
    const start = startOfDay(dateToComplete);
    const end = endOfDay(dateToComplete);
    const existing = await habitRepository.findCompletionByDate(id, userId, start, end);
    
    if (existing) {
      // If targetCount > 1, maybe they are logging partial progress. For simplicity, just add it.
      // But if goal is 1, throw error.
      if (habit.goal.targetCount <= 1) {
         throw new AppError('Habit already completed for this period', 400);
      }
    }
    
    const completion = await habitRepository.completeHabit({
      habitId: id,
      userId,
      completedAt: dateToComplete,
      value: data.value || 1,
      notes: data.notes
    });
    
    // Naive Streak Engine (Placeholder for actual cron-based streak calculation)
    const newTotal = habit.tracking.totalCompletions + 1;
    let currentStreak = habit.tracking.currentStreak;
    let longestStreak = habit.tracking.longestStreak;
    
    if (!existing) {
      currentStreak += 1;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    }
    
    await habitRepository.update(id, userId, {
      'tracking.totalCompletions': newTotal,
      'tracking.currentStreak': currentStreak,
      'tracking.longestStreak': longestStreak,
      'metadata.lastCompleted': dateToComplete,
      updatedBy: userId
    });
    
    logger.info({ userId, habitId: id, action: 'HABIT_COMPLETED' }, 'Habit completed');
    return completion;
  },

  undoCompletion: async (id, completionId, userId) => {
    const completion = await habitRepository.removeCompletion(completionId, userId);
    if (!completion) throw new NotFoundError('Completion record not found');
    
    const habit = await habitRepository.findById(id, userId);
    if (habit) {
      const newTotal = Math.max(0, habit.tracking.totalCompletions - 1);
      const newStreak = Math.max(0, habit.tracking.currentStreak - 1);
      
      await habitRepository.update(id, userId, {
        'tracking.totalCompletions': newTotal,
        'tracking.currentStreak': newStreak,
        updatedBy: userId
      });
    }
    
    logger.info({ userId, habitId: id, action: 'HABIT_UNDONE' }, 'Habit completion undone');
    return true;
  },

  getHistory: async (id, userId, startDate, endDate) => {
    return habitRepository.getCompletionHistory(id, userId, startDate, endDate);
  },

  getStats: async (id, userId) => {
    const habit = await habitRepository.findById(id, userId);
    if (!habit) throw new NotFoundError('Habit not found');
    
    // In a real system, calculate completion rate based on creation date vs total days
    const daysSinceCreation = Math.max(1, Math.floor((new Date() - habit.createdAt) / (1000 * 60 * 60 * 24)));
    const completionRate = Math.min(100, Math.round((habit.tracking.totalCompletions / daysSinceCreation) * 100));
    
    return {
      currentStreak: habit.tracking.currentStreak,
      longestStreak: habit.tracking.longestStreak,
      totalCompletions: habit.tracking.totalCompletions,
      completionRate,
      lastCompleted: habit.metadata.lastCompleted,
      missedDays: Math.max(0, daysSinceCreation - habit.tracking.totalCompletions)
    };
  }
};
