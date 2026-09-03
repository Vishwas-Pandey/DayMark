export const toEventDTO = (event) => {
  if (!event) return null;
  const obj = typeof event.toObject === 'function' ? event.toObject() : event;
  return {
    id: obj._id,
    title: obj.title,
    description: obj.description,
    type: obj.type,
    status: obj.status,
    priority: obj.priority,
    time: obj.time,
    location: obj.location,
    relationships: obj.relationships,
    visual: obj.visual,
    metadata: obj.metadata,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const toEventSummaryDTO = (event) => {
  if (!event) return null;
  const obj = typeof event.toObject === 'function' ? event.toObject() : event;
  return {
    id: obj._id,
    title: obj.title,
    type: obj.type,
    status: obj.status,
    time: obj.time,
    color: obj.visual?.color
  };
};
