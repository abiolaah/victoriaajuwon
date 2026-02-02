"use client";

import { EducationProps, ExperienceProps } from "@/lib/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Briefcase, GraduationCap, Plus } from "lucide-react";
import { TimelineCard } from "@/components/timeline-card";
import { formatDate } from "@/lib/utils";
import { Modal } from "@/components/admin/modal";
import { FormSwitch } from "@/components/admin/form-switch";
import { EducationForm } from "@/components/admin/education-form";
import ExperienceForm from "@/components/admin/experience-form";
import { ExperienceSchema } from "@/types/experienceSchema";
import { EducationSchema } from "@/types/educationSchema";

interface AdminHistoryViewProps {
  experiences: ExperienceProps[];
  education: EducationProps[];
}

export const HistoryView = ({
  experiences,
  education,
}: AdminHistoryViewProps) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [editingExperience, setEditingExperience] =
    useState<ExperienceProps | null>(null);
  const [editingEducation, setEditingEducation] =
    useState<EducationProps | null>(null);

  const convertDatesToDateObjects = <
    T extends { startDate: Date | string; endDate: Date | string },
  >(
    data: T,
  ): T & { startDate: Date; endDate: Date } => {
    return {
      ...data,
      startDate:
        typeof data.startDate === "string"
          ? new Date(data.startDate)
          : data.startDate,
      endDate:
        typeof data.endDate === "string"
          ? new Date(data.endDate)
          : data.endDate,
    };
  };

  // Handle opening the modal for adding new item
  const handleAddNew = () => {
    setEditingExperience(null);
    setEditingEducation(null);
    setIsEducation(false);
    setIsModalOpen(true);
  };

  // Handle opening the modal for editing
  const handleEdit = (id: string, type: "work" | "education") => {
    console.log(`${type}'s ID: ${id}`);
    if (type === "work") {
      const experienceToEdit = experiences.find((exp) => exp.id === id) || null;
      setEditingExperience(experienceToEdit);
      setEditingEducation(null);
      setIsEducation(false);
    } else {
      const educationToEdit = education.find((edu) => edu.id === id) || null;
      setEditingEducation(educationToEdit);
      setEditingExperience(null);
      setIsEducation(true);
    }
    setIsModalOpen(true);
  };

  // Handle form switch toggle
  const handleFormToggle = (isEdu: boolean) => {
    setIsEducation(isEdu);
    // Clear editing state when switching forms
    if (isEdu) {
      setEditingExperience(null);
    } else {
      setEditingEducation(null);
    }
  };

  // Handle experience submission
  const handleExperienceSubmit = (data: ExperienceSchema) => {
    console.log("Received experience data:", data);
    if (editingExperience) {
      console.log("Updating experience:", editingExperience.id);
    } else {
      console.log("Adding new experience");
    }
    setIsModalOpen(false);
  };

  // Handle education submission
  const handleEducationSubmit = (data: EducationSchema) => {
    console.log("Received education data:", data);
    if (editingEducation) {
      console.log("Updating education:", editingEducation.id);
    } else {
      console.log("Adding new education");
    }
    setIsModalOpen(false);
  };

  // Handle delete
  const handleDelete = (id: string, type: "work" | "education") => {
    if (type === "work") {
      console.log(`Handle delete experience with ${id}`);
    } else {
      console.log(`Handle delete education with ${id}`);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full px-10">
        <div className="flex flex-row justify-between items-center px-10 mt-3">
          <h1 className="text-5xl text-white uppercase font-bold mt-4 mb-8 text-center">
            Professional Details Management
          </h1>
          <Button
            className="text-white bg-red-500 hover:bg-red-300 cursor-pointer w-45 flex items-center gap-2"
            onClick={handleAddNew}
          >
            <Plus className="h-4 w-4" />
            Add Professional
          </Button>
        </div>
        <div className="mt-10">
          <div className="relative w-full">
            {/* Timeline line */}
            <div className="absolute left-5 md:left-7.5 top-0 bottom-0 w-0.5 bg-gray-500"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((experience) => (
                <div
                  key={`work-${experience.id}`}
                  className="flex items-start gap-6 md:gap-10 relative"
                >
                  <div className="bg-blue-500 rounded-full p-2 z-10 mt-2">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <TimelineCard
                    id={experience.id}
                    title={experience.role}
                    subtitle={experience.company}
                    achievements={experience.description}
                    startDate={formatDate(experience.startDate)}
                    endDate={formatDate(experience.endDate)}
                    icon={<Briefcase />}
                    type={"work"}
                    isAdmin={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    imageUrl={
                      experience.imageUrl ||
                      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg"
                    }
                  />
                </div>
              ))}

              {education.map((education) => (
                <div
                  key={`edu-${education.id}`}
                  className="flex items-start gap-6 md:gap-10 relative"
                >
                  <div className="bg-pink-400 rounded-full p-2 z-10 mt-2">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <TimelineCard
                    id={education.id}
                    title={education.institution}
                    subtitle={education.degree}
                    achievements={education.description}
                    startDate={formatDate(education.startDate)}
                    endDate={formatDate(education.endDate)}
                    icon={<Briefcase />}
                    type={"education"}
                    isAdmin={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    imageUrl={
                      education.imageUrl ||
                      "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg"
                    }
                  />
                </div>
              ))}

              {/* Final dot */}
              <div className="flex items-center gap-6 md:gap-10 relative">
                <div className="bg-green-500 rounded-full p-2 z-10">
                  <div className="w-5 h-5 text-white flex items-center justify-center">
                    ⭐
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for adding/editing */}
        <Modal
          title={
            editingExperience
              ? "Edit Work Experience"
              : editingEducation
                ? "Edit Education"
                : "Add Professional Details"
          }
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {!editingExperience && !editingEducation && (
            <FormSwitch isEducation={isEducation} onToggle={handleFormToggle} />
          )}
          {isEducation ? (
            <EducationForm
              initialData={
                editingEducation
                  ? convertDatesToDateObjects(editingEducation)
                  : undefined
              }
              onSubmit={handleEducationSubmit}
              onDelete={
                editingEducation
                  ? () => handleDelete(editingEducation.id, "education")
                  : undefined
              }
              setIsModalOpen={setIsModalOpen}
            />
          ) : (
            <ExperienceForm
              initialData={
                editingExperience
                  ? convertDatesToDateObjects(editingExperience)
                  : undefined
              }
              onSubmit={handleExperienceSubmit}
              onDelete={
                editingExperience
                  ? () => handleDelete(editingExperience.id, "work")
                  : undefined
              }
            />
          )}
        </Modal>
      </div>
    </>
  );
};
