import { calendarService } from './calendar.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toEventDTO, toEventSummaryDTO } from './calendar.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const calendarController = {
  create: asyncHandler(async (req, res) => {
    const event = await calendarService.createEvent(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, toEventDTO(event), 'Event created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const event = await calendarService.getEventById(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    const { events, total } = await calendarService.getEvents(req.user._id, req.query, { skip, limit });
    res.status(200).json(new ApiResponse(200, events.map(toEventSummaryDTO), 'Events retrieved successfully', { skip, limit, total }));
  }),

  update: asyncHandler(async (req, res) => {
    const event = await calendarService.updateEvent(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await calendarService.softDeleteEvent(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const event = await calendarService.restoreEvent(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event restored successfully'));
  }),

  complete: asyncHandler(async (req, res) => {
    const event = await calendarService.completeEvent(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event completed successfully'));
  }),

  cancel: asyncHandler(async (req, res) => {
    const event = await calendarService.cancelEvent(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event cancelled successfully'));
  }),

  move: asyncHandler(async (req, res) => {
    const { start, end } = req.body;
    const event = await calendarService.moveEvent(req.params.id, req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event moved successfully'));
  }),

  resize: asyncHandler(async (req, res) => {
    const { start, end } = req.body;
    const event = await calendarService.resizeEvent(req.params.id, req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toEventDTO(event), 'Event resized successfully'));
  }),

  getToday: asyncHandler(async (req, res) => {
    const events = await calendarService.getToday(req.user._id);
    res.status(200).json(new ApiResponse(200, events.map(toEventDTO), 'Today\'s events retrieved'));
  }),

  getWeek: asyncHandler(async (req, res) => {
    const events = await calendarService.getWeek(req.user._id, req.query.date ? new Date(req.query.date) : new Date());
    res.status(200).json(new ApiResponse(200, events.map(toEventDTO), 'Weekly events retrieved'));
  }),

  getMonth: asyncHandler(async (req, res) => {
    const events = await calendarService.getMonth(req.user._id, req.query.date ? new Date(req.query.date) : new Date());
    res.status(200).json(new ApiResponse(200, events.map(toEventSummaryDTO), 'Monthly events retrieved'));
  }),

  getAgenda: asyncHandler(async (req, res) => {
    const start = req.query.startDate || new Date().toISOString();
    const end = req.query.endDate || new Date(Date.now() + 7*24*60*60*1000).toISOString();
    const events = await calendarService.getAgenda(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, events.map(toEventDTO), 'Agenda retrieved'));
  }),

  getUpcoming: asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const { events } = await calendarService.getUpcoming(req.user._id, limit);
    res.status(200).json(new ApiResponse(200, events.map(toEventSummaryDTO), 'Upcoming events retrieved'));
  }),

  getConflicts: asyncHandler(async (req, res) => {
    const start = req.query.startDate;
    const end = req.query.endDate;
    if (!start || !end) {
      return res.status(400).json(new ApiResponse(400, null, 'startDate and endDate required'));
    }
    const conflicts = await calendarService.detectConflicts(req.user._id, start, end, req.query.excludeEventId);
    res.status(200).json(new ApiResponse(200, conflicts.map(toEventSummaryDTO), 'Conflicts retrieved'));
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await calendarService.getStats(req.user._id, req.query.date ? new Date(req.query.date) : new Date());
    res.status(200).json(new ApiResponse(200, stats, 'Calendar statistics retrieved'));
  })
};
