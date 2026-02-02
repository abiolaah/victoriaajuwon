import { z } from "zod";

export const educationSchema = z
  .object({
    id: z.string().optional(),
    institution: z.string().min(1, "Institution name is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    // Required start date but accept string from the form
    startDate: z.date({ error: "Start date is required" }),
    // Optional end date (allows ongoing education) and accepts string
    endDate: z.date().optional(),
    imageUrl: z.url("Invalid image URL"),
    assetId: z.string().optional(),
    isCommon: z.boolean(),
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

export type EducationSchema = z.infer<typeof educationSchema>;
