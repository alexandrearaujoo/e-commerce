import { z } from 'zod';

export const billboardSchema = z.object({
  label: z.string().min(1, 'Mínimo de 1 caracter'),
  imgUrl: z.string().min(1, 'Mínimo de 1 caracter').url('Insira uma URL válida')
});

export type BillboardRequest = z.infer<typeof billboardSchema>;
