export const toGoalDTO = (goal) => {
  if (!goal) return null;
  const obj = typeof goal.toObject === 'function' ? goal.toObject() : goal;
  return {
    id: obj._id,
    title: obj.title,
    description: obj.description,
    type: obj.type,
    status: obj.status,
    priority: obj.priority,
    category: obj.category,
    progress: obj.progress,
    timeline: obj.timeline,
    color: obj.color,
    icon: obj.icon,
    tags: obj.tags,
    notes: obj.notes,
    taskIds: obj.taskIds,
    habitIds: obj.habitIds,
    archived: obj.archived,
    metadata: obj.metadata,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const toGoalSummaryDTO = (goal) => {
  if (!goal) return null;
  const obj = typeof goal.toObject === 'function' ? goal.toObject() : goal;
  return {
    id: obj._id,
    title: obj.title,
    status: obj.status,
    priority: obj.priority,
    category: obj.category,
    progressPercentage: obj.progress?.progressPercentage || 0,
    targetDate: obj.timeline?.targetDate,
    color: obj.color,
    icon: obj.icon
  };
};
