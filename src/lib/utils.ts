import { Role } from "@/types/role";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ProjectCardDisplay,
  ProjectSkills,
  ProjectsProps,
  SkillDisplayItem,
  SkillsProps,
} from "./types";
import { init } from "@paralleldrive/cuid2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date?: string | Date) => {
  if (!date) return "Present";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const formatSkillTitle = (value: string): string => {
  return value
    .replace(/_/g, value === "Cloud_Devops" ? " & " : " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getSkillsTitle = (
  skills?: SkillsProps[],
  skill?: string,
  skillId?: string
): string => {
  // 1. Highest priority: skillId lookup
  if (skillId && skills?.length) {
    const foundSkill = skills.find((s) => s.id === skillId);
    if (foundSkill) return foundSkill.title;
  }

  // 2. Fallback: format skill string
  if (skill) {
    return formatSkillTitle(skill);
  }

  // 3. Final fallback
  return "";
};

export const skillsUsage = (
  profileSkillProjects: ProjectsProps[],
  roleProjects: ProjectsProps[]
): number => {
  let percentage = 0;
  if (profileSkillProjects.length === 0 || roleProjects.length === 0) {
    percentage += 0;
  }
  // TODO: Get all the project in the profile
  const totalProjects = roleProjects.length;
  // TODO: Get how many of the project uses the skill
  const projectsUsingSkills = profileSkillProjects.length;
  // return the percentage
  percentage += Math.round((projectsUsingSkills / totalProjects) * 100);

  return percentage;
};

export const proficiencyLevels = [
  {
    min: 0,
    max: 25,
    label: "Beginner",
    color: "text-red-400",
    bgColor: "bg-red-500",
  },
  {
    min: 26,
    max: 50,
    label: "Novice",
    color: "text-orange-400",
    bgColor: "bg-orange-500",
  },
  {
    min: 51,
    max: 75,
    label: "Intermediate",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500",
  },
  {
    min: 76,
    max: 90,
    label: "Advanced",
    color: "text-blue-400",
    bgColor: "bg-blue-500",
  },
  {
    min: 91,
    max: 100,
    label: "Expert",
    color: "text-green-400",
    bgColor: "bg-green-500",
  },
];

export const getCurrentProficiency = (level: number) => {
  return (
    proficiencyLevels.find((p) => level >= p.min && level <= p.max) ||
    proficiencyLevels[0]
  );
};

export const getProjectSkills = (
  project: ProjectsProps,
  skills: SkillsProps[],
  role?: Role | "ALL"
): ProjectCardDisplay => {
  if (!role) return [];

  const resolveTitle = (skillId: string): string => {
    const skill = skills.find((s) => s.id === skillId);
    return skill ? skill.title : formatSkillTitle(skillId);
  };

  let projectSkills: ProjectSkills[] = [];
  let projectTechStack: ProjectSkills[] = [];

  if (role === "ALL") {
    projectSkills = project.roles.flatMap((r) => r.skills);
    projectTechStack = project.roles.flatMap((r) => r.techStack || []);
  } else {
    const roleData = project.roles.find((r) => r.role === role);
    if (!roleData) return [];

    projectSkills = roleData.skills;
    projectTechStack = roleData.techStack || [];
  }

  const uniqueSkills = Array.from(
    new Set(projectSkills.map((s) => s.skillId))
  ).map(resolveTitle);

  const uniqueTechStack = Array.from(
    new Set(projectTechStack.map((s) => s.skillId))
  ).map(resolveTitle);

  const skillDisplayItems: SkillDisplayItem[] = [];

  if (uniqueSkills.length) {
    skillDisplayItems.push({
      title: uniqueSkills.join(", "),
      type: "skills",
    });
  }

  if (uniqueTechStack.length) {
    skillDisplayItems.push({
      title: uniqueTechStack.join(", "),
      type: "techstack",
    });
  }

  return skillDisplayItems;
};

const normalizeRole = (value: string): string =>
  value.toLowerCase().replace(/[_\-]/g, " ");

export const resolveRoleFromString = (
  selectedRole: string
): Role | undefined => {
  const normalized = normalizeRole(selectedRole);

  if (normalized.includes("product") || normalized.includes("manager")) {
    return Role.PRODUCT_MANAGER;
  }

  if (normalized.includes("developer") || normalized.includes("web")) {
    return Role.DEVELOPER;
  }

  if (
    normalized.includes("qa") ||
    normalized.includes("tester") ||
    normalized.includes("test")
  ) {
    return Role.TESTER;
  }

  return undefined;
};

type FormattableValue = string | undefined;

const specialCases: string[] = ["Cloud_Devops", "AI_ML"];

export function formatEnumLabel(value: FormattableValue): string {
  if (!value) return "";

  if (specialCases.includes(value)) {
    return value.replace(/_/g, " & ");
  }

  const words = value.split("_").map((word) => {
    // Normalize Devops → DevOps (generic word-level rule)
    if (word.toLowerCase() === "devops") {
      return "DevOps";
    }

    // Capitalize normally
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return words.join(" ");
}

export const createdId = init({
  random: Math.random,
  length: 8,
});
