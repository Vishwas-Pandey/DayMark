import { analyticsRepository } from './analytics.repository.js';
import { logger } from '#common/logger/index.js';

export const analyticsService = {
  getDashboardSummary: async (userId, start, end) => {
    const [tasks, habits, goals, journal, calendar] = await Promise.all([
      analyticsRepository.getTaskAnalytics(userId, start, end),
      analyticsRepository.getHabitAnalytics(userId, start, end),
      analyticsRepository.getGoalAnalytics(userId), // Goals are absolute, not always time bound
      analyticsRepository.getJournalAnalytics(userId, start, end),
      analyticsRepository.getCalendarAnalytics(userId, start, end)
    ]);
    
    logger.info({ userId, action: 'DASHBOARD_VIEWED' }, 'Dashboard summary generated');
    
    return {
      tasks: _formatTaskMetrics(tasks),
      habits: _formatHabitMetrics(habits),
      goals: _formatGoalMetrics(goals),
      journal: _formatJournalMetrics(journal),
      calendar: _formatCalendarMetrics(calendar),
      scores: _calculateScores(tasks, habits, journal, calendar)
    };
  },
  
  getHeatmapData: async (userId, start, end) => {
    const heatmap = await analyticsRepository.getHeatmapData(userId, start, end);
    logger.info({ userId, action: 'HEATMAP_GENERATED' }, 'Heatmap data generated');
    return heatmap.map(item => ({
      date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
      count: item.count
    }));
  },
  
  getSnapshot: async (userId, type) => {
    const snapshot = await analyticsRepository.getLatestSnapshot(userId, type);
    return snapshot;
  },
  
  // Future cron trigger would call this to freeze daily/weekly state
  saveSnapshot: async (userId, data) => {
    const snapshot = await analyticsRepository.saveSnapshot(data);
    logger.info({ userId, action: 'SNAPSHOT_CREATED' }, 'Analytics snapshot persisted');
    return snapshot;
  },

  getTrends: async (userId, start, end) => {
    logger.info({ userId, action: 'TREND_GENERATED' }, 'Trend data generated');
    // Placeholder for actual trend calculations
    return { trend: 'upward', velocity: 1.5 };
  }
};

// --- Internal Formatters ---
function _formatTaskMetrics(tasks) {
  let completed = 0, total = 0, overdue = 0;
  tasks.forEach(t => {
    total += t.count;
    if (t._id === 'completed') completed = t.count;
    if (t.overdue > 0) overdue += t.overdue;
  });
  return {
    total,
    completed,
    overdue,
    completionRate: total > 0 ? (completed / total) * 100 : 0
  };
}

function _formatHabitMetrics(habits) {
  const hData = habits.habits[0] || { totalActive: 0, avgStreak: 0, maxStreak: 0 };
  const comps = habits.completions[0] || { totalCompletions: 0 };
  return {
    activeHabits: hData.totalActive,
    avgStreak: hData.avgStreak,
    maxStreak: hData.maxStreak,
    totalCompletions: comps.totalCompletions
  };
}

function _formatGoalMetrics(goals) {
  let active = 0, completed = 0, avgProgress = 0;
  goals.forEach(g => {
    if (g._id === 'active') {
      active = g.count;
      avgProgress = g.avgProgress;
    }
    if (g._id === 'completed') completed = g.count;
  });
  return { active, completed, avgProgress };
}

function _formatJournalMetrics(journal) {
  const j = journal[0] || { totalEntries: 0, avgMood: 0, avgProductivity: 0, totalWords: 0 };
  return {
    entries: j.totalEntries,
    avgMood: j.avgMood,
    avgProductivity: j.avgProductivity,
    words: j.totalWords
  };
}

function _formatCalendarMetrics(calendar) {
  let focusTime = 0, meetingTime = 0, totalTime = 0;
  calendar.forEach(c => {
    totalTime += c.totalDuration;
    if (c._id === 'focus') focusTime = c.totalDuration;
    if (c._id === 'meeting') meetingTime = c.totalDuration;
  });
  return { focusTime, meetingTime, totalTime };
}

function _calculateScores(tasks, habits, journal, calendar) {
  // Simplistic placeholder scoring algorithms
  const tM = _formatTaskMetrics(tasks);
  const jM = _formatJournalMetrics(journal);
  
  const completionScore = Math.min(100, Math.round(tM.completionRate));
  const wellbeingScore = jM.avgMood ? Math.min(100, Math.round(jM.avgMood * 10)) : 50;
  const productivityScore = jM.avgProductivity ? Math.min(100, Math.round(jM.avgProductivity * 10)) : 50;
  
  return {
    productivityScore,
    focusScore: productivityScore, // mock
    consistencyScore: completionScore, // mock
    completionScore,
    wellbeingScore
  };
}
