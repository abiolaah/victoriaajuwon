/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Projects, Skills } from "@/lib/data/test";
import { ProjectsProps, SkillsProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Edit, Trash2, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";
import useInfoModal from "@/hooks/useInfoModal";
import Link from "next/link";
import { FaGithub, FaYoutube } from "react-icons/fa6";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Role } from "@/types/role";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CgWebsite } from "react-icons/cg";
import { CircularProgress } from "./circular-progress";

interface InfoModalProps {
  visible?: boolean;
  isAdmin?: boolean;
  onClose: () => void;
}

export const InfoModal = ({ visible, onClose, isAdmin }: InfoModalProps) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [isEditing, setIsEditing] = useState(false);

  const { itemId, type: storedType, role: storedRole } = useInfoModal();

  const skills = Skills;
  const projects = Projects;

  const [data, setData] = useState<SkillsProps | ProjectsProps | null>(null);

  const fetchData = useCallback(async () => {
    if (!itemId || !storedType) return;
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (storedType === "skill") {
        const skill = skills.find((s) => s.id === itemId);
        if (skill) {
          setData(skill);
        } else {
          setData(null);
        }
      } else if (storedType === "project") {
        const project = projects.find((p) => p.id === itemId);
        if (project) {
          setData(project);
        } else {
          setData(null);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [itemId, storedType, skills, projects]);

  // Fetch data when modal opens or itemId changes
  useEffect(() => {
    if (visible && itemId) {
      fetchData();
    }
  }, [visible, itemId, fetchData]);

  // Sync visibility with prop
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setIsEditing(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleDelete = (itemType: "skill" | "project") => {
    if (itemType === "skill") {
      const remainingSkills = skills.filter((s) => s.id !== data?.id);
      console.log(`Deleted ${itemType}:`, data?.id);
      console.log("Remaining Skills:", remainingSkills);
      toast.success(`${data?.title} Skill deleted successfully`);
    } else {
      const remainingProjects = projects.filter((p) => p.id !== data?.id);
      console.log(`Deleted ${itemType}:`, data?.id);
      console.log("Remaining Projects:", remainingProjects);
      toast.success(`${data?.title} Project with deleted successfully`);
    }
    handleClose();
  };

  // Type guard to check if data is ProjectsProps
  const isProject = (
    item: ProjectsProps | SkillsProps,
  ): item is ProjectsProps => {
    return storedType === "project";
  };

  // Get related projects for a skill
  const getProjectsWithSkill = (skillId: string): ProjectsProps[] => {
    return projects.filter((project) =>
      project.roles.some(
        (role) =>
          role.techStack?.some((t) => t.skillId === skillId) ||
          role.skills?.some((s) => s.skillId === skillId),
      ),
    );
  };

  // Get skills for a project (already included in project data)
  //   const getSkillsForProject = (
  //     projectRole: ProjectsProps["roles"][0]
  //   ): SkillsProps[] => {
  //     const allSkillIds = [
  //       ...projectRole.skills,
  //       ...(projectRole.techStack || []),
  //     ];
  //     // return skills.filter((skill) => allSkillIds.includes(skill.id));
  //     return skills.filter((skill) =>
  //       allSkillIds.some((as) => as.skillId === skill.id)
  //     );
  //   };

  const getRoleLabel = (role: Role): string => {
    const roleLabels: Record<Role, string> = {
      [Role.DEVELOPER]: "Developer",
      [Role.TESTER]: "Tester",
      [Role.PRODUCT_MANAGER]: "Product Manager",
    };
    return roleLabels[role] || role;
  };

  const getTypeLabel = (type?: string): string => {
    if (!type) return "N/A";
    return type.replace(/_/g, " ");
  };

  const getStatusBadgeColor = (status?: string): string => {
    switch (status) {
      case "Completed":
        return "bg-green-600";
      case "In_Progress":
        return "bg-blue-600";
      case "Planning":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  // Early return if not visible
  if (!visible) return null;
  //   if (!data) return null;
  if (!data) {
    return (
      <div className="z-50 transition duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
        <div className="relative w-300 rounded-lg overflow-hidden">
          <div className="relative bg-zinc-900 p-10 flex justify-center items-center ">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="text-white text-xl">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Get related data based on type
  const projectsWithSkill =
    storedType === "skill" ? getProjectsWithSkill(data.id) : [];

  //   const skillLevel = skillsUsage(projectsWithSkill, projects);

  // Render Project Role Details
  const renderProjectRoleDetails = (
    roleData: ProjectsProps["roles"][0],
  ): React.ReactNode => {
    return (
      <div className="space-y-4 p-6">
        {/* Type and Status */}
        <div className="flex gap-4 items-center justify-between">
          {/* Type */}
          <div>
            <h3 className="text-sm text-gray-400">Type</h3>
            <p className="text-white font-medium">
              {getTypeLabel(roleData.type)}
            </p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm text-gray-400">Status</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadgeColor(
                roleData.status,
              )}`}
            >
              {roleData.status?.replace(/_/g, " ")}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white">
              {formatDate(roleData.startDate)}
            </span>
          </div>
        </div>

        {/* Achievements */}
        {roleData.achievements && roleData.achievements.length > 0 && (
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Achievements</h3>
            <ul className="list-disc list-inside space-y-1">
              {roleData.achievements.map((achievement, idx) => (
                <li key={idx} className="text-white text-sm">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {roleData.techStack && roleData.techStack.length > 0 && (
          <div>
            <h3 className="flex flex-col gap-1">
              <span className="text-sm text-gray-400 mb2">Tech Stack</span>
              <span className="text-xs italic text-gray-400 mb-1">
                The percentage represnt how much of the skill was used for the
                project
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {roleData.techStack.map((tech) => {
                const skill = skills.find((s) => s.id === tech.skillId);
                return skill ? (
                  <div
                    key={tech.id}
                    className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg"
                  >
                    <CircularProgress
                      title={skill.title}
                      percentage={tech.usageLevel}
                      imageSrc={skill.imageUrl}
                      imageAlt={`Image for ${skill.title}`}
                      className=""
                      titleClassName=""
                      imageClassName=""
                      percentageClassName="absolute bottom-2"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Skills */}
        {roleData.skills && roleData.skills.length > 0 && (
          <div>
            <h3 className="flex flex-col gap-1">
              <span className="text-sm text-gray-400 mb2">Skills</span>
              <span className="text-xs italic text-gray-400 mb-1">
                The percentage represnt how much of the skill was used for the
                project
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {roleData.skills.map((skillRef) => {
                const skill = skills.find((s) => s.id === skillRef.skillId);
                return skill ? (
                  <div
                    key={skillRef.id}
                    className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-lg"
                  >
                    <CircularProgress
                      title={skill.title}
                      percentage={skillRef.usageLevel}
                      imageSrc={skill.imageUrl}
                      imageAlt={`Image for ${skill.title}`}
                      className=""
                      titleClassName=""
                      imageClassName=""
                      percentageClassName="absolute -bottom-1"
                    />
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Skill Role Projects
  const renderSkillRoleProjects = (role: Role): React.ReactNode => {
    const filteredProjects = projectsWithSkill.filter((project) =>
      project.roles.some((r) => r.role === role),
    );

    return (
      <div className="space-y-4 p-6">
        <h3 className="text-white font-semibold text-lg">
          Projects using {data.title} as {getRoleLabel(role)}
        </h3>
        {filteredProjects.length === 0 ? (
          <p className="text-gray-400">No projects found for this role.</p>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors"
              >
                <div className="flex gap-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {project.roles
                        .filter((r) => r.role === role)
                        .map((roleData) => (
                          <span
                            key={roleData.id}
                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusBadgeColor(
                              roleData.status,
                            )}`}
                          >
                            {roleData.status?.replace(/_/g, " ")}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="z-50 fixed inset-0 bg-black/80 flex justify-center overflow-y-auto">
      <div className="relative w-full max-w-225 my-8 rounded-lg overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-95"
          } transform duration-300 relative flex flex-col bg-linear-to-b from-zinc-900 to-zinc-950 drop-shadow-md max-h-[90vh] overflow-y-auto`}
        >
          {isAdmin && isEditing ? (
            <>
              <h3 className="">Admin Edit</h3>
            </>
          ) : (
            <>
              {/* Hero Section */}
              <div className="relative h-96 w-full shrink-0">
                <Image
                  src={data.imageUrl || "/placeholder.svg?height=400&width=800"}
                  alt={data.title}
                  fill
                  className="w-full object-cover h-full"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-zinc-900/40"></div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                  {isAdmin && (
                    <>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="cursor-pointer h-10 w-10 rounded-full bg-green-600/80 hover:bg-purple-600 flex items-center justify-center transition-colors"
                      >
                        <Edit className="text-white w-5" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(storedType)}
                        className="cursor-pointer h-10 w-10 rounded-full bg-red-600/80 hover:bg-red-600 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="text-white w-5" />
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handleClose}
                    className="cursor-pointer h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
                  >
                    <X className="text-white w-5" />
                  </Button>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-zinc-900 to-transparent">
                  <h1 className="text-white text-3xl font-bold">
                    {data.title}
                  </h1>
                  {isProject(data) ? (
                    <p className="text-white text-md">{data.description}</p>
                  ) : (
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-3">
                        <span className="font-bold">Type: </span>
                        <h3 className="text-blue-500 font-semibold text-md">
                          {data.type}
                        </h3>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-bold">Category: </span>
                        <h3 className="text-cyan-500 font-semibold text-md">
                          {getTypeLabel(data.category)}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              {isProject(data) && (
                <>
                  {/* Project General details */}
                  <div className="flex flex-col gap-3 p-4">
                    {/* Links and End date */}
                    <div className="flex justify-between gap-2">
                      {/* Links */}
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">Links</h3>
                        <div className="flex gap-3 justify-between">
                          {/* GitHub */}
                          <Link href={data.sourceLink}>
                            <FaGithub className="size-8" />
                          </Link>

                          {/* Website Demo Link */}
                          <Link href={data.demoLink}>
                            <CgWebsite className="size-8 text-purple-500" />
                          </Link>

                          {/* Demo Video Link */}
                          {data.demoVideoLink && (
                            <Link href={data.demoVideoLink}>
                              <FaYoutube className="size-8 text-red-600" />
                            </Link>
                          )}
                        </div>
                      </div>
                      {/* End Date */}
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">
                          Project End Date
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-white/80">
                          <Calendar className="size-8 text-cyan-500" />
                          <span className="text-md font-semibold">
                            {formatDate(data.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Images Carousel */}
                    {data.images && data.images.length !== 0 && (
                      <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold">
                          Project Screenshots
                        </h3>
                        <Carousel
                          className="w-full max-w-4xl mx-auto px-12 py-6"
                          opts={{
                            loop: true,
                            align: "center",
                          }}
                        >
                          <CarouselContent className="-ml-1">
                            {data.images.map((image, index) => (
                              <CarouselItem
                                key={image.id}
                                className="pl-1 md:basis-1/2 lg:basis-1/3"
                              >
                                <div className="p-1">
                                  <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                      <Image
                                        src={image.url}
                                        alt={`Image ${index + 1} for project ${data.title}`}
                                        objectFit="cover"
                                        width={500}
                                        height={500}
                                      />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="left-0" />
                          <CarouselNext className="right-0" />
                        </Carousel>
                      </div>
                    )}
                  </div>

                  {/* Project Role based details (isAddmin displays for all the roles) */}
                  <div className="px-6 pb-6">
                    {isAdmin ? (
                      // Admin View: Show tabs for all roles
                      <Tabs
                        defaultValue={data.roles[0]?.role || Role.DEVELOPER}
                      >
                        <TabsList className="w-full justify-start">
                          {data.roles.map((roleData) => (
                            <TabsTrigger
                              key={roleData.id}
                              value={roleData.role}
                              className={`
    text-gray-400 hover:text-white transition-colors
    ${roleData.status === "Completed" ? "data-[state=active]:bg-green-600" : ""}
    ${roleData.status === "In_Progress" ? "data-[state=active]:bg-blue-600" : ""}
    ${roleData.status === "Planning" ? "data-[state=active]:bg-yellow-600" : ""}
    data-[state=active]:text-white
  `}
                            >
                              {getRoleLabel(roleData.role)}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {data.roles.map((roleData) => (
                          <TabsContent key={roleData.id} value={roleData.role}>
                            {renderProjectRoleDetails(roleData)}
                          </TabsContent>
                        ))}
                      </Tabs>
                    ) : (
                      <>
                        {storedRole && (
                          <>
                            <h2 className="text-white text-xl font-bold mb-4">
                              {getRoleLabel(storedRole)} Details
                            </h2>
                            {data.roles
                              .filter((r) => r.role === storedRole)
                              .map((roleData) => (
                                <div key={roleData.id}>
                                  {renderProjectRoleDetails(roleData)}
                                </div>
                              ))}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Skill content */}
              {!isProject(data) && (
                <div className="px-6 pb-6">
                  {isAdmin ? (
                    <Tabs defaultValue={data.roles[0]?.role || Role.DEVELOPER}>
                      <TabsList className="w-full justify-start">
                        {data.roles.map((roleData) => (
                          <TabsTrigger
                            key={roleData.id}
                            value={roleData.role}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
                          >
                            {getRoleLabel(roleData.role)}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {data.roles.map((roleData) => (
                        <TabsContent key={roleData.id} value={roleData.role}>
                          {renderSkillRoleProjects(roleData.role)}
                        </TabsContent>
                      ))}
                    </Tabs>
                  ) : (
                    // Non-admin view: SHow only the selected role
                    <>
                      {storedRole && <>{renderSkillRoleProjects(storedRole)}</>}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
