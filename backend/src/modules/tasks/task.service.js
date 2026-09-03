import { taskRepository } from './task.repository.js';
import { AppError, NotFoundError } from '#common/errors/AppError.js';
import { logger } from '#common/logger/index.js';

export const taskService = {
  createTask: async (userId, data) => {
    const task = await taskRepository.create({
      ...data,
      userId,
      createdBy: userId,
      updatedBy: userId
    });
    
    logger.info({ userId, taskId: task._id, action: 'TASK_CREATED' }, 'Task created');
    return task;
  },

  getTaskById: async (id, userId) => {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw new NotFoundError('Task not found');
    return task;
  },
  
  getTasks: async (userId, filters, pagination, sort) => {
    const query = { userId };
    
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.difficulty) query.difficulty = filters.difficulty;
    if (filters.energy) query.energy = filters.energy;
    if (filters.labels) query.labels = { $in: filters.labels.split(',') };
    if (filters.tags) query.tags = { $in: filters.tags.split(',') };
    
    if (filters.archived === 'true') {
      query.archived = true;
    } else {
      query.archived = false;
    }

    if (filters.dueToday === 'true') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: start, $lte: end };
    }

    if (filters.overdue === 'true') {
      query.dueDate = { $lt: new Date() };
      query.status = { $ne: 'completed' };
    }
    
    const tasks = await taskRepository.findAll(query, pagination, sort);
    const total = await taskRepository.count(query);
    
    return { tasks, total };
  },

  searchTasks: async (userId, searchTerm, pagination) => {
    if (!searchTerm) return { tasks: [], total: 0 };
    const tasks = await taskRepository.search(userId, searchTerm, pagination);
    return { tasks, total: tasks.length };
  },

  updateTask: async (id, userId, data) => {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw new NotFoundError('Task not found');

    data.updatedBy = userId;
    if (data.metadata) {
      data['metadata.lastEdited'] = new Date();
    }

    // Keep completedAt in sync when a generic update flips status, so it isn't
    // only set via the dedicated complete/reopen endpoints.
    if (data.status && data.status !== task.status) {
      if (data.status === 'completed' && data.completedAt === undefined) {
        data.completedAt = new Date();
      } else if (task.status === 'completed' && data.status !== 'completed' && data.completedAt === undefined) {
        data.completedAt = null;
      }
    }

    const updated = await taskRepository.update(id, userId, data);
    logger.info({ userId, taskId: id, action: 'TASK_UPDATED' }, 'Task updated');
    return updated;
  },

  completeTask: async (id, userId) => {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw new NotFoundError('Task not found');
    if (task.status === 'completed') throw new AppError('Task is already completed', 400);
    
    // State machine validation
    if (task.status === 'archived') throw new AppError('Cannot complete an archived task', 400);

    const updated = await taskRepository.update(id, userId, {
      status: 'completed',
      completedAt: new Date(),
      updatedBy: userId
    });
    
    logger.info({ userId, taskId: id, action: 'TASK_COMPLETED' }, 'Task completed');
    return updated;
  },

  reopenTask: async (id, userId) => {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw new NotFoundError('Task not found');
    if (task.status !== 'completed' && task.status !== 'archived') {
      throw new AppError('Task is not completed or archived', 400);
    }
    
    const updated = await taskRepository.update(id, userId, {
      status: 'todo',
      completedAt: null,
      archived: false,
      updatedBy: userId
    });
    
    logger.info({ userId, taskId: id, action: 'TASK_REOPENED' }, 'Task reopened');
    return updated;
  },
  
  archiveTask: async (id, userId) => {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw new NotFoundError('Task not found');
    if (task.status === 'archived') throw new AppError('Task is already archived', 400);
    
    const updated = await taskRepository.update(id, userId, {
      status: 'archived',
      archived: true,
      updatedBy: userId
    });
    
    logger.info({ userId, taskId: id, action: 'TASK_ARCHIVED' }, 'Task archived');
    return updated;
  },

  softDeleteTask: async (id, userId) => {
    const task = await taskRepository.softDelete(id, userId);
    if (!task) throw new NotFoundError('Task not found or already deleted');
    logger.info({ userId, taskId: id, action: 'TASK_DELETED' }, 'Task deleted');
    return true;
  },

  restoreTask: async (id, userId) => {
    const task = await taskRepository.restore(id, userId);
    if (!task) throw new NotFoundError('Task not found in trash');
    logger.info({ userId, taskId: id, action: 'TASK_RESTORED' }, 'Task restored');
    return task;
  },

  bulkUpdate: async (userId, taskIds, data) => {
    if (!taskIds || taskIds.length === 0) throw new AppError('No task IDs provided', 400);
    data.updatedBy = userId;
    const result = await taskRepository.bulkUpdate(userId, taskIds, data);
    logger.info({ userId, action: 'TASKS_BULK_UPDATED', count: taskIds.length }, 'Tasks bulk updated');
    return result;
  },

  bulkDelete: async (userId, taskIds) => {
    if (!taskIds || taskIds.length === 0) throw new AppError('No task IDs provided', 400);
    const result = await taskRepository.bulkDelete(userId, taskIds);
    logger.info({ userId, action: 'TASKS_BULK_DELETED', count: taskIds.length }, 'Tasks bulk deleted');
    return result;
  }
};
