import { StatCard } from "@/components/admin/dashboard/stat-card";
import { KeyMetricsProps } from "@/lib/types";
import { Award, BriefcaseBusiness, Eye, Users } from "lucide-react";

export const KeyMetricsComponent = ({
  totalProjects,
  totalSkills,
  portfolioViews,
  clientInquiries,
}: KeyMetricsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={totalProjects ? totalProjects : 12}
        icon={BriefcaseBusiness}
        description="Active and completed"
        trend={{ value: 12, isPositive: true }}
        variant="featured"
      />
      <StatCard
        title="Total Skills"
        value={totalSkills ? totalSkills : 8}
        icon={Award}
        description="Technical expertise"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Portfolio Views"
        value={portfolioViews ? portfolioViews : "2,847"}
        icon={Eye}
        description="This month"
        trend={{ value: 23, isPositive: true }}
      />
      <StatCard
        title="Client Inquiries"
        value={clientInquiries ? clientInquiries : "18"}
        icon={Users}
        description="Pending responses"
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
};
