import { z } from "zod";
import { Role } from "./role";

// --- ENUMS ---
export const ProjectTypeEnum = z.enum([
  "Web_Development",
  "Mobile_Development",
  "Web_Testing",
  "Mobile_Testing",
  "API_Testing",
  "Others",
]);

export const ProjectStatusEnum = z.enum([
  "Planning",
  "In_Progress",
  "Completed",
]);

// --- NESTED SCHEMAS ---

// Skill and TechStack entry
const projectSkillSchema = z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  skillId: z.string().min(1, "Skill ID is required"),
  usageLevel: z.number().int().min(1, "Usage level must be at least 1"),
  // projectId will be added by backend, so we omit it here
});

// Media entry (image)
const projectMediaSchema = z.object({
  id: z.string().optional(),
  projectId: z.string().optional(),
  url: z.url("Invalid image URL"),
  assetId: z.string().nullable(),
  // projectId will be added by backend, so we omit it here
});

// Role inside project
const projectRoleSchema = z.object({
  id: z.string().optional(),
  role: z.enum(Role),

  achievements: z.array(z.string().optional()),

  type: ProjectTypeEnum.optional(),

  skills: z.array(projectSkillSchema).min(1, "At least one skill is required"),

  techStack: z.array(projectSkillSchema).optional(),

  startDate: z.union([z.date(), z.string()]),
  status: ProjectStatusEnum,
});

// --- MAIN FORM SCHEMA ---
export const projectSchema = z
  .object({
    id: z.string().optional(),

    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Project description is required"),

    // Image is uploaded via Cloudinary; allow empty during draft entry
    imageUrl: z.url("Invalid image URL"),
    assetId: z.string().min(1, "AssetId is required"),

    // Links are optional; validate only when provided
    sourceLink: z.url("Invalid source link URL"),
    demoLink: z.url("Invalid demo link URL"),
    demoVideoLink: z
      .union([z.literal(""), z.url("Invalid demo video link")])
      .optional(),

    roles: z.array(projectRoleSchema).min(1, "At least one role is required"),

    endDate: z.union([z.date(), z.string()]).optional(),

    images: z.array(projectMediaSchema).optional(),
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;

      const end = new Date(data.endDate);
      const earliestStart = data.roles
        .map((r) => new Date(r.startDate))
        .sort((a, b) => a.getTime() - b.getTime())[0];

      return end >= earliestStart;
    },
    {
      message: "End date must be after role start date",
      path: ["endDate"],
    },
  );

// --- TYPE INFERENCE ---
export type ProjectSchema = z.infer<typeof projectSchema>;
