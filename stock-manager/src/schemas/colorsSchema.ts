import { z } from 'zod';

export const colorSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter'),
  value: z
    .string()
    .min(4, 'Mínimo de 4 caracteres')
    .regex(/^#[0-9A-F]{3,6}$/i, 'Cor inválida')
});

export type ColorRequest = z.infer<typeof colorSchema>;
