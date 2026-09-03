export const toHabitDTO = (habit) => {
  if (!habit) return null;
  const obj = typeof habit.toObject === 'function' ? habit.toObject() : habit;
  return {
    id: obj._id,
    title: obj.title,
    description: obj.description,
    type: obj.type,
    status: obj.status,
    frequency: obj.frequency,
    schedule: obj.schedule,
    goal: obj.goal,
    tracking: obj.tracking,
    difficulty: obj.difficulty,
    energy: obj.energy,
    priority: obj.priority,
    color: obj.color,
    icon: obj.icon,
    notes: obj.notes,
    tags: obj.tags,
    archived: obj.archived,
    metadata: obj.metadata,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const toHabitSummaryDTO = (habit) => {
  if (!habit) return null;
  const obj = typeof habit.toObject === 'function' ? habit.toObject() : habit;
  return {
    id: obj._id,
    title: obj.title,
    type: obj.type,
    status: obj.status,
    frequency: obj.frequency,
    currentStreak: obj.tracking?.currentStreak || 0,
    longestStreak: obj.tracking?.longestStreak || 0,
    lastCompleted: obj.metadata?.lastCompleted || null,
    color: obj.color,
    icon: obj.icon,
    tags: obj.tags
  };
};

export const toCompletionDTO = (completion) => {
  if (!completion) return null;
  const obj = typeof completion.toObject === 'function' ? completion.toObject() : completion;
  return {
    id: obj._id,
    habitId: obj.habitId,
    completedAt: obj.completedAt,
    value: obj.value,
    notes: obj.notes
  };
};
