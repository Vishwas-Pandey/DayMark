import { Task } from '../tasks/task.model.js';
import { Habit, HabitCompletion } from '../habits/habit.model.js';
import { Goal } from '../goals/goal.model.js';
import { JournalEntry } from '../journal/journal.model.js';
import { CalendarEvent } from '../calendar/calendar.model.js';
import { AnalyticsSnapshot } from './analytics.model.js';

const dateRange = (field, start, end) => {
  if (!start && !end) return null;
  const range = {};
  if (start) range.$gte = start;
  if (end) range.$lte = end;
  return { [field]: range };
};

export const analyticsRepository = {
  getComprehensiveTimeline: async (userId, timeRange) => {
    const [tasks, habits, goals] = await Promise.all([
      Task.aggregate([
        { $match: { userId, status: 'completed' } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } }, count: { $sum: 1 } } }
      ]),
      Habit.aggregate([
        { $match: { userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Goal.aggregate([
        { $match: { userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ])
    ]);

    return { tasks, habits, goals };
  },

  getTaskAnalytics: async (userId, start, end) => {
    const match = { userId, deletedAt: null, ...dateRange('createdAt', start, end) };
    const [statusCounts, overdueCount] = await Promise.all([
      Task.aggregate([
        { $match: match },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Task.countDocuments({ userId, deletedAt: null, status: { $ne: 'completed' }, dueDate: { $lt: new Date() } })
    ]);
    return [...statusCounts, { _id: '__overdue__', count: 0, overdue: overdueCount }];
  },

  getHabitAnalytics: async (userId, start, end) => {
    const completionMatch = { userId, ...dateRange('completedAt', start, end) };
    const [habitsAgg, completionsAgg] = await Promise.all([
      Habit.aggregate([
        { $match: { userId, deletedAt: null } },
        { $group: {
            _id: null,
            totalActive: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
            avgStreak: { $avg: '$tracking.currentStreak' },
            maxStreak: { $max: '$tracking.longestStreak' }
        } }
      ]),
      HabitCompletion.aggregate([
        { $match: completionMatch },
        { $group: { _id: null, totalCompletions: { $sum: 1 } } }
      ])
    ]);
    return { habits: habitsAgg, completions: completionsAgg };
  },

  getGoalAnalytics: async (userId) => {
    return Goal.aggregate([
      { $match: { userId, deletedAt: null } },
      { $group: { _id: '$status', count: { $sum: 1 }, avgProgress: { $avg: '$progress.progressPercentage' } } }
    ]);
  },

  getJournalAnalytics: async (userId, start, end) => {
    const match = { userId, deletedAt: null, ...dateRange('createdAt', start, end) };
    return JournalEntry.aggregate([
      { $match: match },
      { $group: {
          _id: null,
          totalEntries: { $sum: 1 },
          avgMood: { $avg: '$mood.score' },
          avgProductivity: { $avg: '$productivity' },
          totalWords: { $sum: '$metadata.wordCount' }
      } }
    ]);
  },

  getCalendarAnalytics: async (userId, start, end) => {
    const match = { userId, deletedAt: null, ...dateRange('time.start', start, end) };
    return CalendarEvent.aggregate([
      { $match: match },
      { $group: { _id: '$type', totalDuration: { $sum: '$time.durationMinutes' } } }
    ]);
  },

  getHeatmapData: async (userId, start, end) => {
    return Task.aggregate([
      { $match: { userId, status: 'completed', completedAt: { $gte: start, $lte: end } } },
      { $group: {
          _id: { year: { $year: '$completedAt' }, month: { $month: '$completedAt' }, day: { $dayOfMonth: '$completedAt' } },
          count: { $sum: 1 }
      } },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);
  },

  getLatestSnapshot: async (userId, type) => {
    const query = { userId };
    if (type) query[type] = true;
    return AnalyticsSnapshot.findOne(query).sort({ date: -1 });
  },

  saveSnapshot: async (data) => {
    return AnalyticsSnapshot.create(data);
  }
};
