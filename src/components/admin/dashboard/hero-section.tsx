import { Zap } from "lucide-react";

// HeroSection component for the Admin landing page
export const HeroSection = ({
  totalProjects,
  totalSkills,
  views,
}: {
  totalProjects: number | string;
  totalSkills: number | string;
  views: number | string;
}) => {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-black via-gray-900 to-black py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.05)_50%,transparent_75%)]" />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">
              Live Dashboard
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Portfolio
            <span className="block text-red-500">Command Center</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Monitor your development and testing projects, track skills
            progression, and manage your professional portfolio with cinematic
            precision.
          </p>

          <div className="flex items-center justify-center space-x-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {totalProjects ? totalProjects : `30+`}
              </div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {totalSkills ? totalSkills : `333+`}
              </div>
              <div className="text-sm text-gray-400">Skills</div>
            </div>
            <div className="w-px h-12 bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {views ? views : `2.8K`}
              </div>
              <div className="text-sm text-gray-400">Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
