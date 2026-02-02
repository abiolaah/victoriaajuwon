"use client";

import { InfoModal } from "@/components/info-modal";
import useInfoModal from "@/hooks/useInfoModal";
import { Button } from "@/components/ui/button";
import { Projects, Skills } from "@/lib/data/test";
import { Role } from "@/types/role";
import Image from "next/image";

const TestPage = () => {
  const { isOpen, closeModal, openModal } = useInfoModal();

  // Sample triggers for testing different scenarios
  const handleOpenProject = (projectId: string, role?: Role) => {
    openModal(projectId, "project", role);
  };

  const handleOpenSkill = (skillId: string, role?: Role) => {
    openModal(skillId, "skill", role);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">InfoModal Test Page</h1>
          <p className="text-gray-400">
            Click on any button below to test different modal scenarios
          </p>
        </div>

        {/* Admin Project Views */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Admin Project Views (All Roles in Tabs)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Projects.slice(0, 6).map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900 rounded-lg p-4 space-y-3"
              >
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>
                <Button
                  onClick={() => handleOpenProject(project.id)}
                  className="w-full"
                  variant="default"
                >
                  Open as Admin
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Admin Project Views */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Non-Admin Project Views (Single Role)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Projects.slice(0, 3).map((project) => (
              <div
                key={`non-admin-${project.id}`}
                className="bg-zinc-900 rounded-lg p-4 space-y-3"
              >
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.roles.map((role) => (
                    <Button
                      key={role.id}
                      onClick={() => handleOpenProject(project.id, role.role)}
                      className="flex-1"
                      variant="secondary"
                      size="sm"
                    >
                      {role.role}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Skill Views */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Admin Skill Views (All Roles in Tabs)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Skills.slice(0, 8).map((skill) => (
              <div
                key={skill.id}
                className="bg-zinc-900 rounded-lg p-4 space-y-3 flex flex-col items-center"
              >
                <div className="w-16 h-16 relative">
                  <Image
                    src={skill.imageUrl}
                    alt={skill.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-center">
                  {skill.title}
                </h3>
                <Button
                  onClick={() => handleOpenSkill(skill.id)}
                  className="w-full"
                  variant="default"
                  size="sm"
                >
                  Open as Admin
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Admin Skill Views */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Non-Admin Skill Views (Single Role)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Skills.slice(0, 4).map((skill) => (
              <div
                key={`non-admin-${skill.id}`}
                className="bg-zinc-900 rounded-lg p-4 space-y-3 flex flex-col items-center"
              >
                <div className="w-16 h-16 relative">
                  <Image
                    src={skill.imageUrl}
                    alt={skill.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-center">
                  {skill.title}
                </h3>
                <div className="flex flex-col gap-2 w-full">
                  {skill.roles.slice(0, 2).map((role) => (
                    <Button
                      key={role.id}
                      onClick={() => handleOpenSkill(skill.id, role.role)}
                      className="w-full"
                      variant="secondary"
                      size="sm"
                    >
                      {role.role}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Test Scenarios */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Quick Test Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-lg p-6 space-y-3">
              <h3 className="text-white font-semibold">
                E-Commerce Platform (Multi-role)
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => handleOpenProject("1")}
                  className="w-full"
                  variant="default"
                >
                  Admin View (All Roles)
                </Button>
                <Button
                  onClick={() => handleOpenProject("1", Role.DEVELOPER)}
                  className="w-full"
                  variant="outline"
                >
                  Developer Role Only
                </Button>
                <Button
                  onClick={() => handleOpenProject("1", Role.TESTER)}
                  className="w-full"
                  variant="outline"
                >
                  Tester Role Only
                </Button>
                <Button
                  onClick={() => handleOpenProject("1", Role.PRODUCT_MANAGER)}
                  className="w-full"
                  variant="outline"
                >
                  Product Manager Role Only
                </Button>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6 space-y-3">
              <h3 className="text-white font-semibold">
                JavaScript Skill (Multi-role)
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => handleOpenSkill("1")}
                  className="w-full"
                  variant="default"
                >
                  Admin View (All Roles)
                </Button>
                <Button
                  onClick={() => handleOpenSkill("1", Role.DEVELOPER)}
                  className="w-full"
                  variant="outline"
                >
                  Developer Projects
                </Button>
                <Button
                  onClick={() => handleOpenSkill("1", Role.TESTER)}
                  className="w-full"
                  variant="outline"
                >
                  Tester Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Modal - Pass isAdmin based on whether role is provided */}
      <InfoModal
        visible={isOpen}
        isAdmin={!useInfoModal.getState().role}
        onClose={closeModal}
      />
    </div>
  );
};

export default TestPage;
