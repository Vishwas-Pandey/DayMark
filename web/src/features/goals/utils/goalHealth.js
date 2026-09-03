// Derives on-track/at-risk/behind from real progress vs. elapsed time toward the
// target date. The backend goal model has no stored "health" field, so this is
// computed client-side from data that actually exists.
//
// Goal objects come in two shapes depending on the endpoint: the full detail DTO
// (nested `progress`/`timeline`) or the list-summary DTO (flat `progressPercentage`/
// `targetDate`). This reads either.
export const computeGoalHealth = (goal) => {
  const startDate = goal.timeline?.startDate;
  const targetDate = goal.timeline?.targetDate ?? goal.targetDate;
  const progressPct = goal.progress?.progressPercentage ?? goal.progressPercentage ?? 0;
  if (!targetDate) return 'on-track';

  const start = new Date(startDate || goal.createdAt).getTime();
  const end = new Date(targetDate).getTime();
  const now = Date.now();
  if (end <= start) return 'on-track';

  const elapsedPct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
  const delta = progressPct - elapsedPct;
  if (delta >= -10) return 'on-track';
  if (delta >= -30) return 'at-risk';
  return 'behind';
};
