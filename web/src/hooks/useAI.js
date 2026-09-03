import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiApi } from '../api/ai';

export const useAI = () => {
  const queryClient = useQueryClient();

  const chatMutation = useMutation({
    mutationFn: aiApi.chat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'conversations'] });
    }
  });

  const executeMutation = useMutation({
    mutationFn: aiApi.execute
  });

  const previewMutation = useMutation({
    mutationFn: aiApi.preview
  });

  const confirmMutation = useMutation({
    mutationFn: aiApi.confirm
  });

  const conversationsQuery = useQuery({
    queryKey: ['ai', 'conversations'],
    queryFn: () => aiApi.listConversations().then(res => res.data)
  });

  const deleteConversationMutation = useMutation({
    mutationFn: aiApi.deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai', 'conversations'] });
    }
  });

  return {
    chat: chatMutation.mutateAsync,
    execute: executeMutation.mutateAsync,
    preview: previewMutation.mutateAsync,
    confirm: confirmMutation.mutateAsync,
    isProcessing: chatMutation.isPending || executeMutation.isPending || previewMutation.isPending || confirmMutation.isPending,
    // Resource-specific aliases used by the AI workspace page
    sendMessage: chatMutation,
    isGenerating: chatMutation.isPending,
    error: chatMutation.error,
    conversations: conversationsQuery.data,
    isLoadingConversations: conversationsQuery.isLoading,
    deleteConversation: deleteConversationMutation
  };
};
