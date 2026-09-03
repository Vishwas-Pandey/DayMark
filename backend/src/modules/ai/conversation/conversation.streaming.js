import { logger } from '#common/logger/index.js';

export const conversationStreaming = {
  handleStream: (res, streamOptions) => {
    logger.info({ action: 'AI_STREAM_STARTED' }, 'Initializing response stream');
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Simulate streaming
    let count = 0;
    const interval = setInterval(() => {
      res.write(`data: ${JSON.stringify({ chunk: 'word ' + count })}\n\n`);
      count++;
      if (count > 5) {
        clearInterval(interval);
        res.write('data: [DONE]\n\n');
        res.end();
      }
    }, 100);
    
    req.on('close', () => {
      clearInterval(interval);
      logger.warn({ action: 'AI_CHAT_ABORTED' }, 'Stream aborted by client');
    });
  }
};
