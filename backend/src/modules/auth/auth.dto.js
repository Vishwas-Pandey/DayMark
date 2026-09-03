import { toUserResponse } from '#modules/users/user.dto.js';

export const toAuthResponse = (user, accessToken) => {
  return {
    user: toUserResponse(user),
    accessToken
  };
};
