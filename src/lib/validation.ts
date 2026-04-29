import { z } from "zod";

export const promptSchema = z.object({
  title: z.string().min(5, "Минимум 5 символов"),
  description: z.string().min(10, "Минимум 10 символов"),
  content: z.string().min(20, "Минимум 20 символов"),
  category: z.enum(["marketing", "development", "education", "analysis"]),
  tags: z.string().min(2, "Укажите хотя бы один тег"),
  isFavorite: z.boolean().optional(),
});

export type PromptFormValues = z.infer<typeof promptSchema>;
