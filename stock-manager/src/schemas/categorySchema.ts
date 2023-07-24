import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter'),
  billboardId: z.string().uuid('ID inválido')
});

export type CategoryRequest = z.infer<typeof categorySchema>;
