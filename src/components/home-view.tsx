"use client";
import { useState } from "react";
import Banner from "./banner";
import { ProjectsProps, SkillsProps } from "@/lib/types";
import RolesSection from "./role-section";

interface HomeViewProps {
  projects: ProjectsProps[];
  skills: SkillsProps[];
}

export const HomeView = ({ projects, skills }: HomeViewProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("default");
  return (
    <>
      <Banner onRoleSelect={setSelectedRole} />
      {/* Roles Section with anchor for smooth scrolling */}
      <div id="roles-section">
        <RolesSection
          selectedRole={selectedRole}
          skills={skills}
          projects={projects}
        />
      </div>
    </>
  );
};
