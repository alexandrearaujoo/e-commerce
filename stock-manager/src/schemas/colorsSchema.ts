import { z } from 'zod';

export const colorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z
    .string()
    .min(4)
    .regex(/^#[0-9A-F]{3}$/i, 'Invalid color')
});

export type ColorRequest = z.infer<typeof colorSchema>;
