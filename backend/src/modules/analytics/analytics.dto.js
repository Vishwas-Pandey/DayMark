export const toDashboardDTO = (data) => {
  if (!data) return null;
  return {
    tasks: data.tasks,
    habits: data.habits,
    goals: data.goals,
    journal: data.journal,
    calendar: data.calendar,
    scores: data.scores
  };
};

export const toHeatmapDTO = (data) => {
  return data; // Already formatted as [{ date: 'YYYY-MM-DD', count: N }]
};

export const toSnapshotDTO = (snapshot) => {
  if (!snapshot) return null;
  const obj = typeof snapshot.toObject === 'function' ? snapshot.toObject() : snapshot;
  return {
    id: obj._id,
    date: obj.date,
    scores: {
      productivity: obj.productivityScore,
      focus: obj.focusScore,
      consistency: obj.consistencyScore,
      completion: obj.completionScore,
      wellbeing: obj.wellbeingScore
    },
    metrics: {
      tasks: obj.taskMetrics,
      habits: obj.habitMetrics,
      goals: obj.goalMetrics,
      journal: obj.journalMetrics,
      calendar: obj.calendarMetrics
    }
  };
};
