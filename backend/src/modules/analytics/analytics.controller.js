import { analyticsService } from './analytics.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toDashboardDTO, toHeatmapDTO, toSnapshotDTO } from './analytics.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const analyticsController = {
  getDashboard: asyncHandler(async (req, res) => {
    const start = req.query.startDate ? new Date(req.query.startDate) : null;
    const end = req.query.endDate ? new Date(req.query.endDate) : null;
    
    const summary = await analyticsService.getDashboardSummary(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Dashboard summary retrieved'));
  }),
  
  getDaily: asyncHandler(async (req, res) => {
    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(); end.setHours(23,59,59,999);
    
    const summary = await analyticsService.getDashboardSummary(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Daily summary retrieved'));
  }),
  
  getWeekly: asyncHandler(async (req, res) => {
    const end = new Date();
    const start = new Date(end); start.setDate(end.getDate() - 7);
    
    const summary = await analyticsService.getDashboardSummary(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Weekly summary retrieved'));
  }),

  getMonthly: asyncHandler(async (req, res) => {
    const end = new Date();
    const start = new Date(end); start.setMonth(end.getMonth() - 1);
    
    const summary = await analyticsService.getDashboardSummary(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Monthly summary retrieved'));
  }),

  getYearly: asyncHandler(async (req, res) => {
    const end = new Date();
    const start = new Date(end); start.setFullYear(end.getFullYear() - 1);
    
    const summary = await analyticsService.getDashboardSummary(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Yearly summary retrieved'));
  }),

  getHeatmap: asyncHandler(async (req, res) => {
    const start = req.query.startDate ? new Date(req.query.startDate) : new Date(Date.now() - 365*24*60*60*1000);
    const end = req.query.endDate ? new Date(req.query.endDate) : new Date();
    
    const heatmap = await analyticsService.getHeatmapData(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, toHeatmapDTO(heatmap), 'Heatmap data retrieved'));
  }),
  
  getTrends: asyncHandler(async (req, res) => {
    const start = req.query.startDate ? new Date(req.query.startDate) : null;
    const end = req.query.endDate ? new Date(req.query.endDate) : null;
    
    const trends = await analyticsService.getTrends(req.user._id, start, end);
    res.status(200).json(new ApiResponse(200, trends, 'Trend data retrieved'));
  }),

  getSnapshot: asyncHandler(async (req, res) => {
    const snapshot = await analyticsService.getSnapshot(req.user._id, req.query.type);
    res.status(200).json(new ApiResponse(200, toSnapshotDTO(snapshot), 'Latest snapshot retrieved'));
  }),

  // Global sub-metrics mapped to dashboard for now
  getProductivity: asyncHandler(async (req, res) => {
    const summary = await analyticsService.getDashboardSummary(req.user._id);
    res.status(200).json(new ApiResponse(200, { scores: summary.scores }, 'Productivity scores retrieved'));
  }),
  
  getSummary: asyncHandler(async (req, res) => {
    const summary = await analyticsService.getDashboardSummary(req.user._id);
    res.status(200).json(new ApiResponse(200, toDashboardDTO(summary), 'Summary retrieved'));
  })
};
