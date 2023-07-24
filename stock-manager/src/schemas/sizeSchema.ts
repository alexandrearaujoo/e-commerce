import { z } from 'zod';

export const sizeSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter'),
  value: z.string().min(1, 'Mínimo de 1 caracter')
});

export type SizeRequest = z.infer<typeof sizeSchema>;
