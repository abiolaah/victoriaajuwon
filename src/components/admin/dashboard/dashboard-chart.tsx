import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardChartProps } from "@/lib/types";

export const DashboardChart = ({
  projectDistribution,
  skillCategories,
}: DashboardChartProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-liner-to-br from-gray-900/50 to-black border-gray-800 hover:border-red-500/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            Project Distribution
          </CardTitle>
          <CardDescription className="text-gray-400">
            Breakdown of projects by development type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {projectDistribution.map((type) => (
            <div key={type.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-200">{type.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">{type.count}</span>
                  <span className="text-gray-400 text-sm">projects</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`bg-linear-to-r ${type.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
                <div className="absolute right-0 -top-4 text-xs text-red-400 font-medium">
                  {type.percentage}%
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-linear-to-br from-gray-900/50 to-black border-gray-800 hover:border-red-500/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-white text-xl">Skills Mastery</CardTitle>
          <CardDescription className="text-gray-400">
            Technical expertise distribution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-200">
                  {category.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold">{category.count}</span>
                  <span className="text-gray-400 text-sm">skills</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`bg-linear-to-r ${category.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="absolute right-0 -top-4 text-xs text-red-400 font-medium">
                  {category.percentage}%
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
