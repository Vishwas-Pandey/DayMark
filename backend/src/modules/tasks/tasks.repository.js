import { Task } from './task.model.js';

export const tasksRepository = {
  findWithAdvancedFilters: async (userId, filters, pagination) => {
    const { status, priority, search, startDate, endDate, labels } = filters;
    const { page = 1, limit = 20, sortBy = 'dueDate', sortOrder = 'asc' } = pagination;
    
    const query = { user: userId };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (labels?.length) query.labels = { $in: labels };
    if (startDate || endDate) {
      query.dueDate = {};
      if (startDate) query.dueDate.$gte = new Date(startDate);
      if (endDate) query.dueDate.$lte = new Date(endDate);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;
    
    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .populate('subtasks')
        .lean(),
      Task.countDocuments(query)
    ]);
    
    return { tasks, total, page, limit, pages: Math.ceil(total / limit) };
  }
};
