import { z } from 'zod';

export const updateStoreSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter')
});

export type UpdateStoreRequest = z.infer<typeof updateStoreSchema>;
