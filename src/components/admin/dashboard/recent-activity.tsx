import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentActivityProps } from "@/lib/types";
import { Activity, Calendar } from "lucide-react";

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="bg-linear-to-br from-gray-900/50 to-black border-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-red-500" />
          <CardTitle className="text-white text-xl">Recent Activity</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Latest updates on your development pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="group relative overflow-hidden rounded-lg border border-gray-800 bg-linear-to-r from-gray-900/30 to-transparent p-4 hover:border-red-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-r from-red-500/20 to-red-600/20 group-hover:from-red-500/30 group-hover:to-red-600/30 transition-all duration-300">
                <activity.icon className="h-6 w-6 text-red-400" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white group-hover:text-red-100 transition-colors">
                    {activity.title}
                  </p>
                  <Badge
                    variant="outline"
                    className={`
                      border-gray-700 text-xs
                      ${
                        activity.status === "Completed"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : activity.status === "In Progress"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                      }
                    `}
                  >
                    {activity.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800/50 text-gray-300 text-xs"
                    >
                      {activity.type}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {activity.date}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-800 rounded-full h-1">
                      <div
                        className="bg-linear-to-r from-red-500 to-red-600 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-red-400 font-medium">
                      {activity.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
