import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  billboardId: z.string().uuid()
});

export type CategoryRequest = z.infer<typeof categorySchema>;
