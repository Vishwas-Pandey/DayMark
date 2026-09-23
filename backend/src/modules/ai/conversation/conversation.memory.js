import { logger } from '#common/logger/index.js';
import { Task } from '#modules/tasks/task.model.js';
import { Habit } from '#modules/habits/habit.model.js';
import { Goal } from '#modules/goals/goal.model.js';

const LIMIT = 10;

const formatDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : null);

// Summarizes the user's current workload as plain text for the LLM prompt.
export const conversationMemory = {
  fetchRelevantContext: async (userId) => {
    const [tasks, habits, goals] = await Promise.all([
      Task.find({ userId, status: { $in: ['todo', 'in_progress'] } })
        .sort({ dueDate: 1, createdAt: -1 })
        .limit(LIMIT)
        .select('title status priority dueDate')
        .lean(),
      Habit.find({ userId, status: 'active' })
        .limit(LIMIT)
        .select('title frequency tracking.currentStreak')
        .lean(),
      Goal.find({ userId, status: 'active' })
        .limit(LIMIT)
        .select('title progress.progressPercentage timeline.targetDate')
        .lean()
    ]);

    logger.debug({ action: 'AI_CONTEXT_LOADED', tasks: tasks.length, habits: habits.length, goals: goals.length });

    const lines = [];
    lines.push(`Open tasks (${tasks.length}):`);
    for (const t of tasks) {
      const due = formatDate(t.dueDate);
      lines.push(`- ${t.title} [${t.status}, ${t.priority ?? 'no'} priority${due ? `, due ${due}` : ''}]`);
    }
    lines.push(`Active habits (${habits.length}):`);
    for (const h of habits) {
      lines.push(`- ${h.title} [${h.frequency ?? 'daily'}, streak ${h.tracking?.currentStreak ?? 0}]`);
    }
    lines.push(`Active goals (${goals.length}):`);
    for (const g of goals) {
      const target = formatDate(g.timeline?.targetDate);
      lines.push(`- ${g.title} [${g.progress?.progressPercentage ?? 0}% done${target ? `, target ${target}` : ''}]`);
    }
    return lines.join('\n');
  }
};
