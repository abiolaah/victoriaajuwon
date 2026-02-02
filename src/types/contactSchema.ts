// types/contactSchema.ts
import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }).max(50),
  email: z.email("Valid email is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(12)
    .optional(),
  subject: z.string().min(2, "Subject is required").max(100),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
