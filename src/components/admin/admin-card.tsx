"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatEnumLabel, getProjectSkills } from "@/lib/utils";
import { ProjectsProps, SkillsProps } from "@/lib/types";
import { Role } from "@/types/role";
import { PencilIcon, Trash2Icon } from "lucide-react";
interface AdminCardProps {
  data: ProjectsProps | SkillsProps;
  dataType: "project" | "skill";
  role?: Role | "ALL";
  skills?: SkillsProps[];
  cardWidth?: string;
}
export const AdminCard = ({
  data,
  dataType,
  role,
  skills,
  cardWidth,
}: AdminCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // const handleOpenModal = () => {
  //   const itemType: "project" | "skill" =
  //     dataType === "project" ? "project" : "skill";
  //   // openModal(data?.id, itemType, role);
  //   // setIsHovered(false);
  // };

  // Type guard to check if data is ProjectsProps
  const isProject = (
    item: ProjectsProps | SkillsProps,
  ): item is ProjectsProps => {
    return dataType === "project";
  };

  const projectSkills =
    isProject(data) && skills ? getProjectSkills(data, skills, "ALL") : [];

  // Get tech stacks and skills count for project
  const getTechStackCount = () => {
    if (!isProject(data)) return 0;
    return projectSkills.filter((item) => item.type === "techstack").length;
  };

  const getSkillsCount = () => {
    if (!isProject(data)) return 0;
    return projectSkills.filter((item) => item.type === "skills").length;
  };

  // Get project type based on role
  const getProjectType = () => {
    if (!isProject(data)) return "";

    // If role is "all", return all project types
    if (role === ("ALL" as Role)) {
      return data.roles.map((r) => r.type);
    }

    // Otherwise, return the type for the specific role
    const roleEntry = data.roles.find((r) => r.role === role);
    return roleEntry ? roleEntry.type : "General";
  };

  // Render project type with proper handling
  const renderProjectType = () => {
    const projectType = getProjectType();

    if (Array.isArray(projectType)) {
      return projectType.map((type, index) => (
        <span key={index}>
          {index > 0 && " • "}
          {formatEnumLabel(type)}
        </span>
      ));
    }

    return formatEnumLabel(projectType);
  };

  return (
    <div
      className="relative h-full w-full group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className={`relative h-60 rounded-md overflow-hidden bg-zinc-900 shadow-lg transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        } ${cardWidth ? cardWidth : "w-65"}`}
      >
        {/* Image */}
        <div className="relative w-full h-[10vw]">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={(e) => {
              console.error(
                "Error loading image for",
                data.title,
                ":",
                data.imageUrl,
              );
              (e.target as HTMLImageElement).src =
                dataType === "project"
                  ? "https://res.cloudinary.com/dixwarqdb/image/upload/v1747763531/Screenshot_2025-05-20_at_11.52.00_peqzfi.png"
                  : "https://res.cloudinary.com/dixwarqdb/image/upload/v1747756662/javascript-logo_dfjsvh.svg";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative px-3 py-2 bg-zinc-900">
          {/* Title */}
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1">
            {data.title}
          </h3>

          {/* Skill-specific content */}
          {!isProject(data) && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between gap-2">
                <span className="text-white/60 text-xs">Type:</span>
                <span className="text-white/90 text-xs font-medium">
                  {data.type}
                </span>
              </div>
              {data.category && (
                <div className="flex justify-between gap-2">
                  <span className="text-white/60 text-xs">Category:</span>
                  <span className="text-white/90 text-xs font-medium line-clamp-1">
                    {formatEnumLabel(data.category)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Project-specific content */}
          {isProject(data) && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between gap-2">
                <span className="text-white/60 text-xs">Type:</span>
                <span className="text-white/90 text-xs font-medium">
                  {renderProjectType()}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-1">
                {/* Skills Count */}
                <div className="flex justify-between gap-2">
                  <span className="text-white/60 text-xs whitespace-nowrap">
                    Skills:
                  </span>
                  <span className="text-blue-400 text-xs font-semibold">
                    {getSkillsCount()}
                  </span>
                </div>
                {/* Tech Stack Count */}
                <div className="flex justify-between gap-2">
                  <span className="text-white/60 text-xs whitespace-nowrap">
                    Tech Stack:
                  </span>
                  <span className="text-purple-400 text-xs font-semibold">
                    {getTechStackCount()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button>
              <PencilIcon />
            </Button>
            <Button>
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
