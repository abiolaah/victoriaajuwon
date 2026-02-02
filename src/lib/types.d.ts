import { Role } from "@/types/role";

interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
}

interface ProfileDetailsProps {
  id: string;
  profileId: string;
  summary: string;
  aboutSummary?: string;
  resume: string;
  bannerUrl: string;
}

interface ProfilesDetailsProps {
  id: string;
  name: string;
  avatar: string;
  isAdmin: boolean;
  assetId?: string | null;
  details?: {
    id: string;
    profileId: string;
    summary?: string | null;
    resume?: string | null;
    bannerUrl?: string | null;
    assetId?: string | null;
  } | null;
}

type SkillDisplayItem = {
  title: string;
  type: "skills" | "techstack";
};

type ProjectCardDisplay = SkillDisplayItem[];

interface RoleStatus {
  role: Role;
  status: string;
}

export type SkillType = "Hard" | "Soft" | "Both";

export type SkillCategory =
  | "Programming_Language"
  | "Frontend"
  | "Backend"
  | "Database"
  | "Testing"
  | "Core_Competencies"
  | "Cloud_Devops"
  | "Practices"
  | "Tools";

interface SkillsProps {
  id: string;
  title: string;
  imageUrl: string;
  type: "Hard" | "Soft" | "Both";
  assetId?: string; // Optional field for asset management
  isCommon?: boolean;
  category?:
    | "Programming_Language"
    | "Frontend"
    | "Backend"
    | "Database"
    | "Testing"
    | "Core_Competencies"
    | "Cloud_Devops"
    | "Practices"
    | "Tools";
  roles: RoleSkillProps[];
}

interface RoleSkillProps {
  id: string;
  role: Role;
  isCustom: boolean;
}

interface ProjectsProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceLink: string;
  demoLink: string;
  demoVideoLink?: string;
  roles: ProjectRoleProps[];
  endDate?: Date | string;
  images?: ProjectMediaProps[];

  createdAt?: string;
  updatedAt?: string;

  assetId: string; // Optional field for asset management
}

interface ProjectRoleProps {
  id: string;
  role: Role;

  achievements?: string[];

  type?:
    | "Web_Development"
    | "Mobile_Development"
    | "Web_Testing"
    | "Mobile_Testing"
    | "API_Testing"
    | "Others";

  skills: ProjectSkills[];
  techStack?: ProjectSkills[];

  startDate: Date | string;
  status: "Planning" | "In_Progress" | "Completed";
}

interface ProjectMediaProps {
  id: string;
  projectId?: string;
  url: string;
  assetId?: string | null; // Optional field for asset management
}

interface ProjectSkills {
  id: string;
  projectId?: string;
  skillId: string;
  usageLevel: number;
}

type Items = (ProjectsProps | SkillsProps) & {
  variant: "project" | "skill";
};

interface EducationProps {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startDate: Date | string;
  endDate: Date | string;
  assetId?: string; // Optional field for asset management
  imageUrl: string;
  description: string[];
  isCommon?: boolean;
}

interface ExperienceProps {
  id: string;
  company: string;
  role: string;
  startDate: Date | string;
  endDate: Date | string;
  assetId?: string; // Optional field for asset management
  description: string[];
  imageUrl: string;
  isCommon?: boolean;
}

// Dashboard Specific Type definitions
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "featured";
}

interface KeyMetricsProps {
  totalProjects: number | string;
  totalSkills: number | string;
  portfolioViews?: number | string;
  clientInquiries?: number | string;
}

interface DashboardChartProps {
  projectDistribution: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  skillCategories: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
}

interface ActivityProps {
  id: string;
  projectId?: string;
  title: string;
  role: Role;
  type: string;
  status: string;
  date: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  progress: number;
}

interface RecentActivityProps {
  activities: ActivityProps[];
}

interface ProjectBreakdownProps {
  webDev: number;
  mobileDev: number;
  webTest: number;
  mobileTest: number;
  apiTest: number;
  others: number;
}

interface SkillBreakdownProps {
  softSkills: number;
  hardSkills: number;
  programmingSkills: number;
  testingSkills: number;
}

interface ItemsBreakdownProps {
  projectBreakdown: ProjectBreakdownProps;
  skillBreakdown: SkillBreakdownProps;
}

interface DashboardDataProps {
  keyMetricData: KeyMetricsProps;
  chartData: DashboardChartProps;
  recentActivities: RecentActivityProps;
  itemsBreakdown: ItemsBreakdownProps;
}
