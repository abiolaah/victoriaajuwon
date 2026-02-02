import {
  BookOpen,
  Code,
  Monitor,
  MonitorCheck,
  Presentation,
  Settings2,
  Smartphone,
  TabletSmartphone,
  TestTubes,
  Wrench,
} from "lucide-react";
import { ItemsBreakdownProps } from "@/lib/types";
import { StatCard } from "./stat-card";

export const ItemsBreakdown = ({
  projectBreakdown,
  skillBreakdown,
}: ItemsBreakdownProps) => {
  return (
    <>
      {/* Projects Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-linear-to-b from-red-500 to-red-600 rounded-full" />
          <h2 className="text-2xl font-bold text-white">Project Categories</h2>
          <div className="flex-1 h-px bg-linear-to-r from-red-500/50 to-transparent" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Web Development"
            value={projectBreakdown.webDev}
            icon={Monitor}
            description="Frontend & Backend"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Mobile Development"
            value={projectBreakdown.mobileDev}
            icon={Smartphone}
            description="iOS & Android"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Web Testing"
            value={projectBreakdown.webTest}
            icon={MonitorCheck}
            description="Automated & Manual"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Mobile Testing"
            value={projectBreakdown.mobileTest}
            icon={TabletSmartphone}
            description="Device & Performance"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="API Testing"
            value={projectBreakdown.apiTest}
            icon={Settings2}
            description="REST & GraphQL"
            trend={{ value: 20, isPositive: true }}
          />
          <StatCard
            title="Other Projects"
            value={projectBreakdown.others}
            icon={Presentation}
            description="Consulting & Research"
            trend={{ value: 3, isPositive: false }}
          />
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-linear-to-b from-red-500 to-red-600 rounded-full" />
          <h2 className="text-2xl font-bold text-white">Skills Mastery</h2>
          <div className="flex-1 h-px bg-linear-to-r from-red-500/50 to-transparent" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Programming Skills"
            value={skillBreakdown.programmingSkills}
            icon={Code}
            description="Languages & Frameworks"
            trend={{ value: 10, isPositive: true }}
            variant="featured"
          />
          <StatCard
            title="Testing Skills"
            value={skillBreakdown.testingSkills}
            icon={TestTubes}
            description="Tools & Methodologies"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Hard Skills"
            value={skillBreakdown.hardSkills}
            icon={Wrench}
            description="Technical abilities"
            trend={{ value: 7, isPositive: true }}
          />
          <StatCard
            title="Soft Skills"
            value={skillBreakdown.softSkills}
            icon={BookOpen}
            description="Communication & Leadership"
            trend={{ value: 12, isPositive: true }}
          />
        </div>
      </div>
    </>
  );
};
