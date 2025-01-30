import { z } from "zod";

export const carFormSchema = z.object({
  fill: z.string(),
  carNumber: z.string().trim().min(1).max(8),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
