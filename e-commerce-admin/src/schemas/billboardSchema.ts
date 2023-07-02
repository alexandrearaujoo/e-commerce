import { z } from 'zod';

export const billboardSchema = z.object({
  label: z.string().min(1),
  imgUrl: z.string().min(1).url()
});

export type BillboardRequest = z.infer<typeof billboardSchema>;
