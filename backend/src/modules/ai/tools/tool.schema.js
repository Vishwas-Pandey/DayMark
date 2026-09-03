import { z } from 'zod';

export const toolRegistrySchema = z.object({
  name: z.string(),
  description: z.string(),
  inputSchema: z.record(z.any()),
  outputSchema: z.record(z.any()),
  permissions: z.array(z.string()),
  version: z.string()
});
