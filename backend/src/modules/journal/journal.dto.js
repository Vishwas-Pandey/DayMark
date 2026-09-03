export const toJournalDTO = (entry) => {
  if (!entry) return null;
  const obj = typeof entry.toObject === 'function' ? entry.toObject() : entry;
  return {
    id: obj._id,
    title: obj.title,
    content: obj.content,
    excerpt: obj.excerpt,
    type: obj.type,
    mood: obj.mood,
    energy: obj.energy,
    productivity: obj.productivity,
    emotionTags: obj.emotionTags,
    tags: obj.tags,
    attachments: obj.attachments,
    weather: obj.weather,
    location: obj.location,
    relationships: obj.relationships,
    metadata: obj.metadata,
    favorite: obj.favorite,
    pinned: obj.pinned,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const toJournalSummaryDTO = (entry) => {
  if (!entry) return null;
  const obj = typeof entry.toObject === 'function' ? entry.toObject() : entry;
  return {
    id: obj._id,
    title: obj.title,
    excerpt: obj.excerpt,
    type: obj.type,
    mood: obj.mood,
    tags: obj.tags,
    favorite: obj.favorite,
    pinned: obj.pinned,
    createdAt: obj.createdAt,
    wordCount: obj.metadata?.wordCount || 0
  };
};
