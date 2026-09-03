import { habitService } from './habit.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toHabitDTO, toHabitSummaryDTO, toCompletionDTO } from './habit.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const habitController = {
  create: asyncHandler(async (req, res) => {
    const habit = await habitService.createHabit(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, toHabitDTO(habit), 'Habit created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const habit = await habitService.getHabitById(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      const order = req.query.order === 'asc' ? 1 : -1;
      sort = { [req.query.sort]: order };
    }

    const { habits, total } = await habitService.getHabits(req.user._id, req.query, { skip, limit }, sort);
    
    res.status(200).json(new ApiResponse(200, habits.map(toHabitSummaryDTO), 'Habits retrieved successfully', { 
      skip, limit, total 
    }));
  }),
  
  getToday: asyncHandler(async (req, res) => {
    // Simplified placeholder for proper schedule engine
    req.query.frequency = 'daily';
    req.query.status = 'active';
    req.query.archived = 'false';
    const { habits, total } = await habitService.getHabits(req.user._id, req.query, { skip: 0, limit: 100 }, { priority: -1 });
    res.status(200).json(new ApiResponse(200, habits.map(toHabitSummaryDTO), 'Today\'s habits retrieved successfully', { total }));
  }),

  getWeekly: asyncHandler(async (req, res) => {
    req.query.frequency = 'weekly';
    req.query.status = 'active';
    req.query.archived = 'false';
    const { habits, total } = await habitService.getHabits(req.user._id, req.query, { skip: 0, limit: 100 }, { priority: -1 });
    res.status(200).json(new ApiResponse(200, habits.map(toHabitSummaryDTO), 'Weekly habits retrieved successfully', { total }));
  }),

  getMonthly: asyncHandler(async (req, res) => {
    req.query.frequency = 'monthly';
    req.query.status = 'active';
    req.query.archived = 'false';
    const { habits, total } = await habitService.getHabits(req.user._id, req.query, { skip: 0, limit: 100 }, { priority: -1 });
    res.status(200).json(new ApiResponse(200, habits.map(toHabitSummaryDTO), 'Monthly habits retrieved successfully', { total }));
  }),

  update: asyncHandler(async (req, res) => {
    const habit = await habitService.updateHabit(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await habitService.softDeleteHabit(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Habit deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const habit = await habitService.restoreHabit(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit restored successfully'));
  }),

  archive: asyncHandler(async (req, res) => {
    const habit = await habitService.archiveHabit(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit archived successfully'));
  }),

  pause: asyncHandler(async (req, res) => {
    const habit = await habitService.pauseHabit(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit paused successfully'));
  }),
  
  resume: asyncHandler(async (req, res) => {
    const habit = await habitService.resumeHabit(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toHabitDTO(habit), 'Habit resumed successfully'));
  }),

  complete: asyncHandler(async (req, res) => {
    const completion = await habitService.completeHabit(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toCompletionDTO(completion), 'Habit logged successfully'));
  }),

  undoComplete: asyncHandler(async (req, res) => {
    await habitService.undoCompletion(req.params.id, req.params.completionId, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Habit log removed successfully'));
  }),

  getHistory: asyncHandler(async (req, res) => {
    const history = await habitService.getHistory(req.params.id, req.user._id, req.query.startDate, req.query.endDate);
    res.status(200).json(new ApiResponse(200, history.map(toCompletionDTO), 'History retrieved'));
  }),
  
  getStats: asyncHandler(async (req, res) => {
    const stats = await habitService.getStats(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, stats, 'Statistics retrieved'));
  })
};
