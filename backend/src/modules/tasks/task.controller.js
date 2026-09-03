import { taskService } from './task.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toTaskDTO, toTaskSummaryDTO } from './task.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const taskController = {
  create: asyncHandler(async (req, res) => {
    const task = await taskService.createTask(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, toTaskDTO(task), 'Task created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    let sort = { position: 1, createdAt: -1 };
    if (req.query.sort) {
      const order = req.query.order === 'desc' ? -1 : 1;
      sort = { [req.query.sort]: order };
    }

    const { tasks, total } = await taskService.getTasks(req.user._id, req.query, { skip, limit }, sort);
    
    res.status(200).json(new ApiResponse(200, tasks.map(toTaskSummaryDTO), 'Tasks retrieved successfully', { 
      skip, limit, total 
    }));
  }),
  
  search: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    const { tasks, total } = await taskService.searchTasks(req.user._id, req.query.q, { skip, limit });
    res.status(200).json(new ApiResponse(200, tasks.map(toTaskSummaryDTO), 'Search completed', { skip, limit, total }));
  }),

  update: asyncHandler(async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await taskService.softDeleteTask(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Task deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const task = await taskService.restoreTask(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task restored successfully'));
  }),

  archive: asyncHandler(async (req, res) => {
    const task = await taskService.archiveTask(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task archived successfully'));
  }),
  
  complete: asyncHandler(async (req, res) => {
    const task = await taskService.completeTask(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task completed successfully'));
  }),
  
  reopen: asyncHandler(async (req, res) => {
    const task = await taskService.reopenTask(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toTaskDTO(task), 'Task reopened successfully'));
  }),

  bulkUpdate: asyncHandler(async (req, res) => {
    const { taskIds, updateData } = req.body;
    await taskService.bulkUpdate(req.user._id, taskIds, updateData);
    res.status(200).json(new ApiResponse(200, null, `${taskIds.length} tasks updated successfully`));
  }),

  bulkDelete: asyncHandler(async (req, res) => {
    const { taskIds } = req.body;
    await taskService.bulkDelete(req.user._id, taskIds);
    res.status(200).json(new ApiResponse(200, null, `${taskIds.length} tasks deleted successfully`));
  })
};
