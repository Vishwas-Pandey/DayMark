export const toTaskDTO = (task) => {
  if (!task) return null;
  const obj = typeof task.toObject === 'function' ? task.toObject() : task;
  return {
    id: obj._id,
    title: obj.title,
    description: obj.description,
    status: obj.status,
    priority: obj.priority,
    difficulty: obj.difficulty,
    energy: obj.energy,
    estimatedMinutes: obj.estimatedMinutes,
    actualMinutes: obj.actualMinutes,
    startDate: obj.startDate,
    dueDate: obj.dueDate,
    completedAt: obj.completedAt,
    reminderAt: obj.reminderAt,
    labels: obj.labels,
    tags: obj.tags,
    notes: obj.notes,
    parentTask: obj.parentTask,
    subTasks: obj.subTasks,
    position: obj.position,
    repeat: obj.repeat,
    attachments: obj.attachments,
    metadata: obj.metadata,
    archived: obj.archived,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const toTaskSummaryDTO = (task) => {
  if (!task) return null;
  const obj = typeof task.toObject === 'function' ? task.toObject() : task;
  return {
    id: obj._id,
    title: obj.title,
    status: obj.status,
    priority: obj.priority,
    dueDate: obj.dueDate,
    labels: obj.labels,
    tags: obj.tags
  };
};
