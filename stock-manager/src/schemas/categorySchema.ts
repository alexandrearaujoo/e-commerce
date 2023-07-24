import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter')
});

export type CategoryRequest = z.infer<typeof categorySchema>;
