import {
  LucideIcon,
  Monitor,
  MonitorCheck,
  Play,
  Presentation,
  Settings2,
  Smartphone,
  TabletSmartphone,
} from "lucide-react";

import { formatEnumLabel } from "./utils";
import {
  DashboardDataProps,
  ProjectsProps,
  RoleStatus,
  SkillsProps,
} from "./types";

type Status = "Planning" | "In Progress" | "Completed";

type RoleActivityDate = {
  role: string;
  date: string;
};

export const transformDashboardData = (
  projects: ProjectsProps[],
  skills: SkillsProps[],
  limit: number = 4,
): DashboardDataProps => {
  // Transform projects data
  const totalProjects = projects.length;

  // Project types based on enum values
  const projectTypes = [
    "Web_Development",
    "Mobile_Development",
    "Web_Testing",
    "Mobile_Testing",
    "API_Testing",
    "Others",
  ];

  // Calculate project distribution by type
  const projectDistribution = projectTypes.map((type) => {
    const displayName = formatEnumLabel(type);

    // Count projects that have at least one role with this type
    const count = projects.filter((p) =>
      p.roles.some((role) => role.type === type),
    ).length;
    return {
      name: displayName,
      count,
      percentage:
        projects.length > 0 ? Math.round((count / projects.length) * 100) : 0,
      color: getColorForProjectType(displayName),
    };
  });

  // Calculate project breakdown
  const projectBreakdown = {
    webDev: projects.filter((p) =>
      p.roles.some((role) => role.type === "Web_Development"),
    ).length,
    mobileDev: projects.filter((p) =>
      p.roles.some((role) => role.type === "Mobile_Development"),
    ).length,
    webTest: projects.filter((p) =>
      p.roles.some((role) => role.type === "Web_Testing"),
    ).length,
    mobileTest: projects.filter((p) =>
      p.roles.some((role) => role.type === "Mobile_Testing"),
    ).length,
    apiTest: projects.filter((p) =>
      p.roles.some((role) => role.type === "API_Testing"),
    ).length,
    others: projects.filter((p) =>
      p.roles.some((role) => role.type === "Others"),
    ).length,
  };

  // Get recent projects
  const recentProjects = projects
    .flatMap((project) => {
      const statuses = getProjectStatus(project);
      const activityDates = getActivityDate(project);

      return project.roles.map((role) => {
        const roleStatus =
          (statuses.find((s) => s.role === role.role)?.status as Status) ??
          ("Planning" as Status);

        const roleDate =
          activityDates.find((d) => d.role === role.role)?.date ??
          new Date().toISOString().split("T")[0];

        const roleType = role.type ? formatEnumLabel(role.type) : "Others";

        return {
          id: `${project.id}-${role.role}`,
          projectId: project.id,
          title: project.title,
          role: role.role,
          type: roleType,
          status: roleStatus,
          date: roleDate,
          icon: getIconForActivityType(roleType),
          progress: getProjectProgress(roleStatus),
        };
      });
    })
    // Sort by most recent role activity
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  // Transform skills data
  const totalSkills = skills.length;

  // Get Skill Categories
  const skillCategories = [
    "Programming_Language",
    "Framework",
    "Database",
    "Testing",
    "Core_Competencies",
    "Others",
  ];

  // Calculate skill categories data
  const skillCategoryData = skillCategories.map((category) => {
    const displayName = category.replace("_", " ");
    let count = 0;

    if (category === "Framework") {
      count = skills.filter(
        (s) => s.category === "Frontend" || s.category === "Backend",
      ).length;
    } else if (category === "Others") {
      count = skills.filter(
        (s) =>
          s.category !== "Programming_Language" &&
          s.category !== "Frontend" &&
          s.category !== "Backend" &&
          s.category !== "Database" &&
          s.category !== "Testing" &&
          s.category !== "Core_Competencies",
      ).length;
    } else {
      count = skills.filter((s) => s.category === category).length;
    }
    return {
      name: displayName,
      count,
      percentage:
        skills.length > 0 ? Math.round((count / skills.length) * 100) : 0,
      color: getColorForSkillCategory(category),
    };
  });

  // Calculate skil breakdown
  const skillBreakdown = {
    programmingSkills: skills.filter(
      (s) =>
        s.category === "Programming_Language" ||
        s.category === "Frontend" ||
        s.category === "Backend",
    ).length,
    testingSkills: skills.filter((s) => s.category === "Testing").length,
    databaseSkills: skills.filter((s) => s.category === "Database").length,
    others: skills.filter(
      (s) =>
        s.category !== "Programming_Language" &&
        s.category !== "Frontend" &&
        s.category !== "Backend" &&
        s.category !== "Database" &&
        s.category !== "Testing" &&
        s.category !== "Core_Competencies",
    ).length,
    hardSkills: skills.filter((s) => s.type === "Hard").length,
    softSkills: skills.filter((s) => s.type === "Soft").length,
    bothSkills: skills.filter((s) => s.type === "Soft").length,
  };

  return {
    keyMetricData: {
      totalProjects,
      totalSkills,
      portfolioViews: 1234, // Placeholder value
      clientInquiries: 5678, // Placeholder value
    },
    chartData: {
      projectDistribution: projectDistribution,
      skillCategories: skillCategoryData,
    },
    recentActivities: {
      activities: recentProjects.map((project) => ({
        id: project.id,
        projectId: project.id,
        title: project.title,
        role: project.role,
        type: project.type || "Others",
        status: project.status,
        date: project.date,
        icon: project.icon,
        progress: project.progress,
      })),
    },
    itemsBreakdown: {
      projectBreakdown: projectBreakdown,
      skillBreakdown: skillBreakdown,
    },
  };
};

// Helper functions
const getColorForProjectType = (type: string): string => {
  const colors: Record<string, string> = {
    "Web Development": "from-red-500 to-red-600",
    "Mobile Development": "from-orange-500 to-red-500",
    "Web Testing": "from-purple-500 to-red-500",
    "Mobile Testing": "from-pink-500 to-red-500",
    "API Testing": "from-blue-500 to-red-500",
    Others: "from-gray-500 to-red-500",
  };
  return colors[type] || "from-gray-500 to-gray-600";
};

const getColorForSkillCategory = (category: string): string => {
  const colors: Record<string, string> = {
    "Programming Language": "from-blue-500 to-blue-600",
    Frontend: "from-indigo-500 to-indigo-600",
    Backend: "from-purple-500 to-purple-600",
    Database: "from-pink-500 to-pink-600",
    Testing: "from-red-500 to-red-600",
    "Cloud & Devops": "from-orange-500 to-orange-600",
    Practices: "from-yellow-500 to-yellow-600",
    "Core Competencies": "from-green-500 to-green-600",
  };
  return colors[category] || "from-gray-500 to-gray-600";
};

const getIconForActivityType = (type: string): LucideIcon => {
  // This should be imported from lucide-react
  const icons: Record<string, LucideIcon> = {
    "Web Development": Monitor,
    "Mobile Development": Smartphone,
    "Web Testing": MonitorCheck,
    "Mobile Testing": TabletSmartphone,
    "API Testing": Settings2,
    Others: Presentation,
  };
  return icons[type] || Play; // Default icon
};

const getProjectStatus = (project: ProjectsProps): RoleStatus[] => {
  return project.roles.map((role): RoleStatus => {
    let status: string;

    // Check if role has a status property (if you add it to the type later)
    if (role.status) {
      status = formatEnumLabel(role.status);
    } else {
      // Calculate status based on project dates
      if (project.endDate && new Date(project.endDate) <= new Date()) {
        status = "Completed";
      } else if (role.startDate && new Date(role.startDate) <= new Date()) {
        status = "In Progress";
      } else {
        status = "Planning";
      }
    }

    return {
      role: role.role,
      status: status,
    };
  });
};

const getActivityDate = (project: ProjectsProps): RoleActivityDate[] => {
  return project.roles.map((role) => {
    let date: string;

    // Completed
    if (project.endDate && new Date(project.endDate) <= new Date()) {
      date = new Date(project.endDate).toISOString().split("T")[0];
    }
    // In Progress
    else if (role.startDate && new Date(role.startDate) <= new Date()) {
      date = project.updatedAt
        ? new Date(project.updatedAt).toISOString().split("T")[0]
        : new Date(role.startDate).toISOString().split("T")[0];
    }
    // Planning
    else {
      date = role.startDate
        ? new Date(role.startDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
    }

    return {
      role: role.role,
      date,
    };
  });
};

const getProjectProgress = (status: Status): number => {
  switch (status) {
    case "Completed":
      return 100;
    case "In Progress":
      return 75;
    case "Planning":
      return 25;
    default:
      return 0;
  }
};
