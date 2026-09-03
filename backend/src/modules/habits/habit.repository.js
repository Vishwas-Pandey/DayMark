import { Habit, HabitCompletion } from './habit.model.js';

export const habitRepository = {
  create: async (habitData) => {
    return Habit.create(habitData);
  },

  findById: async (id, userId) => {
    return Habit.findOne({ _id: id, userId, deletedAt: null });
  },

  findAll: async (query, pagination = { skip: 0, limit: 50 }, sort = { priority: -1 }) => {
    return Habit.find({ ...query, deletedAt: null })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
  },

  update: async (id, userId, updateData) => {
    return Habit.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  },

  softDelete: async (id, userId) => {
    return Habit.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date(), status: 'archived', archived: true } },
      { new: true }
    );
  },

  restore: async (id, userId) => {
    return Habit.findOneAndUpdate(
      { _id: id, userId, deletedAt: { $ne: null } },
      { $set: { deletedAt: null, status: 'active', archived: false } },
      { new: true }
    );
  },

  count: async (query) => {
    return Habit.countDocuments({ ...query, deletedAt: null });
  },

  calculateStreaks: async (userId, habitId) => {
    const habit = await Habit.findOne({ _id: habitId, userId }).lean();
    if (!habit) return null;

    return {
      currentStreak: habit.tracking?.currentStreak || 0,
      longestStreak: habit.tracking?.longestStreak || 0,
      completionRate: habit.metadata?.completionRate || 0,
      missedDays: 0
    };
  },

  findCompletionByDate: async (habitId, userId, start, end) => {
    return HabitCompletion.findOne({
      habitId,
      userId,
      completedAt: { $gte: start, $lte: end }
    });
  },

  completeHabit: async ({ habitId, userId, completedAt, value, notes }) => {
    return HabitCompletion.create({ habitId, userId, completedAt, value, notes });
  },

  removeCompletion: async (completionId, userId) => {
    return HabitCompletion.findOneAndDelete({ _id: completionId, userId });
  },

  getCompletionHistory: async (habitId, userId, startDate, endDate) => {
    const query = { habitId, userId };
    if (startDate || endDate) {
      query.completedAt = {};
      if (startDate) query.completedAt.$gte = new Date(startDate);
      if (endDate) query.completedAt.$lte = new Date(endDate);
    }
    return HabitCompletion.find(query).sort({ completedAt: -1 });
  }
};
