import { z } from "zod";

export const carFormSchema = z.object({
  fill: z.string(),
  carNumber: z.string().trim().min(1).max(7),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
