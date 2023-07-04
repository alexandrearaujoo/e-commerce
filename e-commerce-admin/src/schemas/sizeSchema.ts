import { z } from 'zod';

export const sizeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.string().min(1, 'Name is required')
});

export type SizeRequest = z.infer<typeof sizeSchema>;
