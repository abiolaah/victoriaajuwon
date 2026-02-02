"use client";

import { ProjectsProps, SkillsProps } from "@/lib/types";
import { AdminCard } from "./admin-card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ProjectSchema } from "@/types/projectSchema";
import { Modal } from "./modal";
import { ProjectsForm } from "./projects-form";

interface AdminProjectViewProps {
  data: ProjectsProps[]; // Add skills prop
  skills: SkillsProps[]; // Add skills prop
}

export const ProjectView = ({ data, skills }: AdminProjectViewProps) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddNew = () => {
    setIsModalOpen(true);
  };
  const handleProjectSubmit = (data: ProjectSchema) => {
    console.log("Received project data:", data);
    console.log("Number of roles:", data.roles?.length);
    console.log("Roles detail:", data.roles);
  };
  return (
    <>
      <div className="w-full px-10">
        <div className="flex flex-row justify-between items-center px-10 mt-3">
          <h1 className="text-5xl text-white uppercase font-bold mt-4 mb-8 text-center">
            Project Management
          </h1>
          <Button
            className="text-white bg-red-500 hover:bg-red-300 cursor-pointer w-45 flex items-center gap-2"
            onClick={handleAddNew}
          >
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>
        <div className="w-220 flex flex-col justify-between">
          <div className="relative mt-8 list-container">
            <div className="grid grid-cols-3 gap-2 sm:gap-0.5 md:gap-2 px-4 md:px-12">
              {data.map((item) => (
                <div key={item.id} className="w-full card-container">
                  <AdminCard
                    data={item}
                    dataType="project"
                    role="ALL"
                    skills={skills}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal for adding skills */}
        <Modal
          title="Add Project"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ProjectsForm
            onSubmit={handleProjectSubmit}
            skills={skills}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      </div>
    </>
  );
};
