export const toUserResponse = (user) => {
  if (!user) return null;
  const obj = typeof user.toObject === 'function' ? user.toObject() : user;
  return {
    id: obj._id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    displayName: obj.displayName || `${obj.firstName} ${obj.lastName}`.trim(),
    email: obj.email,
    avatar: obj.avatar,
    timezone: obj.timezone,
    locale: obj.locale,
    onboardingCompleted: obj.onboardingCompleted,
    onboardingStep: obj.onboardingStep,
    preferences: obj.preferences,
    settings: obj.settings,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};
