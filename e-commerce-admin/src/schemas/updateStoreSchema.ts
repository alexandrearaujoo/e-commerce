import { z } from 'zod';

export const updateStoreSchema = z.object({
  name: z.string().min(1)
});

export type UpdateStoreRequest = z.infer<typeof updateStoreSchema>;
