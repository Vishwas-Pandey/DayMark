// Maps the backend's mood.score (1-10) to a representative emoji.
// entry.mood is { score, label } — never render it directly as a React child.
export const moodEmoji = (mood) => {
  const score = mood?.score;
  if (!score) return '📝';
  if (score <= 2) return '😞';
  if (score <= 4) return '😕';
  if (score <= 6) return '😐';
  if (score <= 8) return '🙂';
  return '😄';
};
