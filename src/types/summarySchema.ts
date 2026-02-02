import { z } from "zod";

export const TypeEnum = z.enum([
  "All",
  "General",
  "Product",
  "Developer",
  "Tester",
]);

export const summarySchema = z.object({
  id: z.string().optional(),
  type: TypeEnum,
  summaryText: z.string().min(10, "Summary text is required"),
});

export type SummarySchema = z.infer<typeof summarySchema>;

export const imageFormSchema = z.object({
  image: z.string().url(),
  assetId: z.string().optional(),
});

export type ImageFormSchema = z.infer<typeof imageFormSchema>;
