"use client";

import { SkillsProps } from "@/lib/types";
import { AdminCard } from "./admin-card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "./modal";
import SkillForm from "./skills-form";
import { SkillSchema } from "@/types/skillSchema";

interface AdminSkillViewProps {
  data: SkillsProps[]; // Add skills prop
}

export const SkillsView = ({ data }: AdminSkillViewProps) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingSkills, setEditingSkills] = useState<SkillsProps | null>(null);
  const handleAddNew = () => {
    // setEditingSkills(null);
    setIsModalOpen(true);
  };

  const handleSkillSubmit = (data: SkillSchema) => {
    console.log({ data });
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-row justify-between items-center px-4 mt-3">
          <h1 className="text-5xl text-white uppercase font-bold mt-4 mb-8 text-center">
            Skills Management
          </h1>
          <Button
            className="text-white bg-red-500 hover:bg-red-300 cursor-pointer w-45 flex items-center gap-2"
            onClick={handleAddNew}
          >
            <Plus className="h-4 w-4" />
            Add Skills
          </Button>
        </div>
        <div className="w-full justify-between">
          <div className="relative mt-3 mb-10 px-4">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-0.5 md:gap-2 px-2 md:px-4">
              {data.map((item) => (
                <div key={item.id} className="w-full mb-5">
                  <AdminCard
                    data={item}
                    dataType="skill"
                    role="ALL"
                    cardWidth="w-75"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal for adding skills */}
        <Modal
          title="Add Skills"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SkillForm onSubmit={handleSkillSubmit} />
        </Modal>
      </div>
    </>
  );
};
