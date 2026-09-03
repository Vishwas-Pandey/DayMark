import { journalService } from './journal.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toJournalDTO, toJournalSummaryDTO } from './journal.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const journalController = {
  create: asyncHandler(async (req, res) => {
    const entry = await journalService.createEntry(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, toJournalDTO(entry), 'Journal entry created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const entry = await journalService.getEntryById(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toJournalDTO(entry), 'Journal entry retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    const { entries, total } = await journalService.getEntries(req.user._id, req.query, { skip, limit });
    res.status(200).json(new ApiResponse(200, entries.map(toJournalSummaryDTO), 'Journal entries retrieved', { skip, limit, total }));
  }),

  getRecent: asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const entries = await journalService.getRecent(req.user._id, limit);
    res.status(200).json(new ApiResponse(200, entries.map(toJournalSummaryDTO), 'Recent entries retrieved'));
  }),

  search: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 50;
    
    const { entries, total } = await journalService.searchEntries(req.user._id, req.query.q, req.query, { skip, limit });
    res.status(200).json(new ApiResponse(200, entries.map(toJournalSummaryDTO), 'Search complete', { skip, limit, total }));
  }),

  update: asyncHandler(async (req, res) => {
    const entry = await journalService.updateEntry(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, toJournalDTO(entry), 'Journal entry updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await journalService.softDeleteEntry(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, null, 'Journal entry deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const entry = await journalService.restoreEntry(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toJournalDTO(entry), 'Journal entry restored successfully'));
  }),

  favorite: asyncHandler(async (req, res) => {
    const entry = await journalService.toggleFavorite(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toJournalDTO(entry), 'Journal entry favorite toggled'));
  }),

  pin: asyncHandler(async (req, res) => {
    const entry = await journalService.togglePin(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, toJournalDTO(entry), 'Journal entry pin toggled'));
  }),

  getStats: asyncHandler(async (req, res) => {
    const stats = await journalService.getStats(req.user._id);
    res.status(200).json(new ApiResponse(200, stats, 'Journal statistics retrieved'));
  })
};
