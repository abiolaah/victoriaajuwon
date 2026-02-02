import { z } from "zod";
import { Role } from "./role";

export const SkillTypeEnum = z.enum(["Hard", "Soft", "Both"]);

export const SkillCategoryEnum = z.enum([
  "Programming_Language",
  "Frontend",
  "Backend",
  "Database",
  "Testing",
  "Core_Competencies",
  "Cloud_Devops",
  "Practices",
  "Tools",
]);

export const RoleEnum = z.enum(["Hard", "Soft", "Both"]);

const roleSkillSchema = z.object({
  id: z.string().optional(),
  role: z.enum(Role),
  isCustom: z.boolean(),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Skill name is required"),
  imageUrl: z.url("Invalid URL").or(z.literal("")),
  assetId: z.string().optional(),

  // Inline enums (no separate variables)
  type: SkillTypeEnum,

  category: SkillCategoryEnum,

  isCommon: z.boolean(),
  roles: z.array(roleSkillSchema),
});

export type SkillSchema = z.infer<typeof skillSchema>;
