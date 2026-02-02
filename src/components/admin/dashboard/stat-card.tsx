import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

/* StatCard component for displaying statistics in the Admin dashboard*/
export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: StatCardProps) => {
  return (
    <Card
      className={`
      group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl
      ${
        variant === "featured"
          ? "bg-linear-to-br from-red-900/20 to-black border-red-500/30 hover:border-red-400"
          : "bg-linear-to-br from-gray-900/50 to-black border-gray-800 hover:border-red-500/50"
      }
    `}
    >
      <div className="absolute inset-0 bg-linear-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        <div
          className={`
          p-2 rounded-lg transition-colors duration-300
          ${
            variant === "featured"
              ? "bg-red-500/20 text-red-400 group-hover:bg-red-500/30"
              : "bg-gray-800/50 text-gray-400 group-hover:bg-red-500/20 group-hover:text-red-400"
          }
        `}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        {description && (
          <p className="text-xs text-gray-400 mb-2">{description}</p>
        )}
        {trend && (
          <div className="flex items-center space-x-1">
            <div
              className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${trend.isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
            `}
            >
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
            </div>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
