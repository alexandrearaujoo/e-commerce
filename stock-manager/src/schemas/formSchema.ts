import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter')
});

export type FormValues = z.infer<typeof formSchema>;
