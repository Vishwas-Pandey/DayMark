import { aiService } from './ai.service.js';
import { ApiResponse } from '#common/responses/ApiResponse.js';
import { toAIStatusDTO, toChatResponseDTO, toConversationDTO, toInsightDTO, toMessageDTO } from './ai.dto.js';
import { asyncHandler } from '#common/utils/asyncHandler.js';
import { NotFoundError } from '#common/errors/AppError.js';

export const aiController = {
  getStatus: asyncHandler(async (req, res) => {
    const status = aiService.getStatus();
    res.status(200).json(new ApiResponse(200, toAIStatusDTO(status), 'AI Infrastructure Status'));
  }),

  generateInsights: asyncHandler(async (req, res) => {
    const insights = await aiService.generateInsights(req.user._id, req.query);
    res.status(200).json(new ApiResponse(200, toInsightDTO(insights), 'AI Insights Generated'));
  }),

  chat: asyncHandler(async (req, res) => {
    const response = await aiService.chat(req.user._id, req.body.message, req.body.conversationId, req.body.template);
    res.status(200).json(new ApiResponse(200, toChatResponseDTO(response), 'Chat Response'));
  }),

  listConversations: asyncHandler(async (req, res) => {
    const convs = aiService.listConversations(req.user._id);
    res.status(200).json(new ApiResponse(200, convs.map(toConversationDTO), 'Conversations List'));
  }),

  getConversation: asyncHandler(async (req, res) => {
    const history = aiService.getConversation(req.params.id, req.user._id);
    if (!history) throw new NotFoundError('Conversation not found');
    res.status(200).json(new ApiResponse(200, history.map(toMessageDTO), 'Conversation History'));
  }),

  deleteConversation: asyncHandler(async (req, res) => {
    const ok = aiService.deleteConversation(req.params.id, req.user._id);
    if (!ok) throw new NotFoundError('Conversation not found');
    res.status(200).json(new ApiResponse(200, null, 'Conversation Deleted'));
  })
};
