import { Goal } from './goal.model.js';

export const goalRepository = {
  create: async (goalData) => {
    return Goal.create(goalData);
  },
  
  findById: async (id, userId) => {
    return Goal.findOne({ _id: id, userId, deletedAt: null });
  },
  
  findAll: async (query, pagination = { skip: 0, limit: 50 }, sort = { 'timeline.targetDate': 1, createdAt: -1 }) => {
    return Goal.find({ ...query, deletedAt: null })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
  },
  
  update: async (id, userId, updateData) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  },
  
  softDelete: async (id, userId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date(), status: 'archived', archived: true } },
      { new: true }
    );
  },
  
  restore: async (id, userId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: { $ne: null } },
      { $set: { deletedAt: null, status: 'active', archived: false } },
      { new: true }
    );
  },
  
  exists: async (query) => {
    return Goal.exists({ ...query, deletedAt: null }).then(res => !!res);
  },

  count: async (query) => {
    return Goal.countDocuments({ ...query, deletedAt: null });
  },

  updateProgress: async (id, userId, progressData) => {
    const goal = await Goal.findOne({ _id: id, userId, deletedAt: null });
    if (!goal) return null;
    
    if (progressData.targetValue !== undefined) goal.progress.targetValue = progressData.targetValue;
    if (progressData.currentValue !== undefined) goal.progress.currentValue = progressData.currentValue;
    
    goal.metadata.lastUpdated = new Date();
    goal.updatedBy = userId;
    
    return goal.save(); // Triggers pre-save hook for percentage
  },

  attachTask: async (id, userId, taskId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $addToSet: { taskIds: taskId }, $set: { 'metadata.lastUpdated': new Date(), updatedBy: userId } },
      { new: true }
    );
  },

  detachTask: async (id, userId, taskId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $pull: { taskIds: taskId }, $set: { 'metadata.lastUpdated': new Date(), updatedBy: userId } },
      { new: true }
    );
  },

  attachHabit: async (id, userId, habitId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $addToSet: { habitIds: habitId }, $set: { 'metadata.lastUpdated': new Date(), updatedBy: userId } },
      { new: true }
    );
  },

  detachHabit: async (id, userId, habitId) => {
    return Goal.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $pull: { habitIds: habitId }, $set: { 'metadata.lastUpdated': new Date(), updatedBy: userId } },
      { new: true }
    );
  }
};
