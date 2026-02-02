"use client";

import { transformDashboardData } from "@/lib/transformDashboardData";
import { ProjectsProps, SkillsProps } from "@/lib/types";
import { HeroSection } from "./hero-section";
import { KeyMetricsComponent } from "./key-metric";
import { DashboardChart } from "./dashboard-chart";
import { ItemsBreakdown } from "./items-breakdown";
import { RecentActivity } from "./recent-activity";

interface DashboardViewProps {
  projects: ProjectsProps[];
  skills: SkillsProps[];
}

export const DashboardView = ({ projects, skills }: DashboardViewProps) => {
  const dashboardData = transformDashboardData(projects, skills);
  const { keyMetricData, chartData, recentActivities, itemsBreakdown } =
    dashboardData;
  const { totalProjects, totalSkills } = keyMetricData;
  const { projectDistribution, skillCategories } = chartData;
  const { activities } = recentActivities;
  const { projectBreakdown, skillBreakdown } = itemsBreakdown;

  return (
    <>
      <div className="w-full">
        <HeroSection
          totalProjects={totalProjects}
          totalSkills={totalSkills}
          views={2847}
        />
        <div className="container mx-auto p-6 space-y-12 -mt-8 relative z-20">
          <KeyMetricsComponent
            totalProjects={totalProjects}
            totalSkills={totalSkills}
          />
          <DashboardChart
            projectDistribution={projectDistribution}
            skillCategories={skillCategories}
          />
          <ItemsBreakdown
            projectBreakdown={projectBreakdown}
            skillBreakdown={skillBreakdown}
          />
          <RecentActivity activities={activities} />
        </div>
      </div>
    </>
  );
};
