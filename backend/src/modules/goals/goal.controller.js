import { goalService } from './goal.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toGoalDTO, toGoalSummaryDTO } from './goal.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const goalController = {
  create: asyncHandler(async (req, res) => {
    const goal = await goalService.createGoal(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, toGoalDTO(goal), 'Goal created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const goal = await goalService.getGoalById(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    let sort = { 'timeline.targetDate': 1, createdAt: -1 };
    if (req.query.sort) {
      const order = req.query.order === 'desc' ? -1 : 1;
      sort = { [req.query.sort]: order };
    }

    const { goals, total } = await goalService.getGoals(req.user._id, req.query, { skip, limit }, sort);
    
    res.status(200).json(new ApiResponse(200, goals.map(toGoalSummaryDTO), 'Goals retrieved successfully', { 
      skip, limit, total 
    }));
  }),

  update: asyncHandler(async (req, res) => {
    const goal = await goalService.updateGoal(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await goalService.softDeleteGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Goal deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const goal = await goalService.restoreGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal restored successfully'));
  }),

  archive: asyncHandler(async (req, res) => {
    const goal = await goalService.archiveGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal archived successfully'));
  }),

  pause: asyncHandler(async (req, res) => {
    const goal = await goalService.pauseGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal paused successfully'));
  }),
  
  resume: asyncHandler(async (req, res) => {
    const goal = await goalService.resumeGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal resumed successfully'));
  }),

  complete: asyncHandler(async (req, res) => {
    const goal = await goalService.completeGoal(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal completed successfully'));
  }),

  updateProgress: asyncHandler(async (req, res) => {
    const goal = await goalService.updateProgress(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Goal progress updated successfully'));
  }),
  
  attachTask: asyncHandler(async (req, res) => {
    const goal = await goalService.attachTask(req.params.id, req.user._id, req.body.taskId);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Task attached successfully'));
  }),

  detachTask: asyncHandler(async (req, res) => {
    const goal = await goalService.detachTask(req.params.id, req.user._id, req.params.taskId);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Task detached successfully'));
  }),

  attachHabit: asyncHandler(async (req, res) => {
    const goal = await goalService.attachHabit(req.params.id, req.user._id, req.body.habitId);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Habit attached successfully'));
  }),

  detachHabit: asyncHandler(async (req, res) => {
    const goal = await goalService.detachHabit(req.params.id, req.user._id, req.params.habitId);
    res.status(200).json(new ApiResponse(200, toGoalDTO(goal), 'Habit detached successfully'));
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await goalService.getStats(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, stats, 'Goal statistics retrieved'));
  })
};
