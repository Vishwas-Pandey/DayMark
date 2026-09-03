import { Task } from './task.model.js';

export const taskRepository = {
  create: async (taskData) => {
    return Task.create(taskData);
  },
  
  findById: async (id, userId) => {
    return Task.findOne({ _id: id, userId, deletedAt: null });
  },
  
  findAll: async (query, pagination = { skip: 0, limit: 50 }, sort = { position: 1, createdAt: -1 }) => {
    return Task.find({ ...query, deletedAt: null })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit);
  },
  
  search: async (userId, searchTerm, pagination = { skip: 0, limit: 50 }) => {
    return Task.find({
      userId,
      deletedAt: null,
      $text: { $search: searchTerm }
    })
    .sort({ score: { $meta: 'textScore' } })
    .skip(pagination.skip)
    .limit(pagination.limit);
  },
  
  count: async (query) => {
    return Task.countDocuments({ ...query, deletedAt: null });
  },
  
  update: async (id, userId, updateData) => {
    return Task.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  },
  
  bulkUpdate: async (userId, taskIds, updateData) => {
    return Task.updateMany(
      { _id: { $in: taskIds }, userId, deletedAt: null },
      { $set: updateData }
    );
  },
  
  bulkDelete: async (userId, taskIds) => {
    return Task.updateMany(
      { _id: { $in: taskIds }, userId, deletedAt: null },
      { $set: { deletedAt: new Date(), status: 'archived' } }
    );
  },
  
  softDelete: async (id, userId) => {
    return Task.findOneAndUpdate(
      { _id: id, userId, deletedAt: null },
      { $set: { deletedAt: new Date(), status: 'archived' } },
      { new: true }
    );
  },
  
  restore: async (id, userId) => {
    return Task.findOneAndUpdate(
      { _id: id, userId, deletedAt: { $ne: null } },
      { $set: { deletedAt: null, status: 'todo' } },
      { new: true }
    );
  },
  
  exists: async (query) => {
    const res = await Task.exists({ ...query, deletedAt: null });
    return !!res;
  }
};
