import { z } from "zod";

export const experienceSchema = z
  .object({
    id: z.string().optional(),
    company: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    startDate: z.date({ error: "Start date is required" }),
    // Optional end date (allows ongoing positions) and accepts string
    endDate: z.date().optional(),
    imageUrl: z.url("Invalid image URL"),
    assetId: z.string().optional(),
    description: z
      .array(z.string().min(1, "Description entries cannot be empty."))
      .min(1, { message: "At least one description is required." }),
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date cannot be earlier than start date.",
        path: ["endDate"],
      });
    }
  });

export type ExperienceSchema = z.infer<typeof experienceSchema>;
