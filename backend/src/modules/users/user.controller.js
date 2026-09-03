import { userService } from './user.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toUserResponse } from './user.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';

export const userController = {
  create: asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, toUserResponse(user), 'User created successfully'));
  }),

  getById: asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, toUserResponse(user), 'User retrieved successfully'));
  }),
  
  getAll: asyncHandler(async (req, res) => {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const users = await userService.getUsers({}, { skip, limit });
    res.status(200).json(new ApiResponse(200, users.map(toUserResponse), 'Users retrieved successfully', { skip, limit }));
  }),

  update: asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(new ApiResponse(200, toUserResponse(user), 'User updated successfully'));
  }),

  remove: asyncHandler(async (req, res) => {
    await userService.softDeleteUser(req.params.id);
    res.status(200).json(new ApiResponse(200, null, 'User deleted successfully'));
  }),

  restore: asyncHandler(async (req, res) => {
    const user = await userService.restoreUser(req.params.id);
    res.status(200).json(new ApiResponse(200, toUserResponse(user), 'User restored successfully'));
  })
};
