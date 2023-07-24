import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Mínimo de 1 caracter'),
  images: z.object({ url: z.string().url('Insira uma URL válida') }).array(),
  price: z.coerce.number().min(1, 'Mínimo de 1 caracter'),
  categoryId: z.string().min(1, 'Mínimo de 1 caracter').uuid('ID inválido'),
  colorId: z.string().min(1, 'Mínimo de 1 caracter').uuid('ID inválido'),
  sizeId: z.string().min(1, 'Mínimo de 1 caracter').uuid('ID inválido'),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});

export type ProductRequest = z.infer<typeof productSchema>;
