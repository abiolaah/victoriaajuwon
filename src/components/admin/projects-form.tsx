import { projectSchema, ProjectSchema } from "@/types/projectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormCard } from "./form-card";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChartCandlestick,
  CheckCircle,
  CircleUserIcon,
  Code2,
  Code2Icon,
  FileText,
  ImageIcon,
  ImagePlus,
  ImagesIcon,
  Lightbulb,
  LoaderCircle,
  Presentation,
  Rocket,
  Sparkles,
  SquareCheckBig,
  SquarePilcrow,
  Trash2Icon,
  Users,
  Video,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CgWebsite } from "react-icons/cg";
import { FaGamepad, FaGear, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { cn, createdId } from "@/lib/utils";
import { Role } from "@/types/role";
import { IoBarChart } from "react-icons/io5";
import { FaLaptopCode } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import DateInput from "./date-input";
import { ProjectImageUploader } from "./image-uploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TagInput from "./tag-input";
import { GrAchievement } from "react-icons/gr";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SkillsProps } from "@/lib/types";
import { ColorSlider } from "../color-slider";
import { format } from "date-fns";
import MultipleImageUpload from "./multi-image-upload";

interface ProjectsFormProps {
  onSubmit: (data: ProjectSchema) => void;
  skills: SkillsProps[];
  initialData?: Partial<ProjectSchema>;
  setIsModalOpen: (open: boolean) => void;
}

export const ProjectsForm = ({
  onSubmit,
  skills,
  initialData,
  setIsModalOpen,
}: ProjectsFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [isRoleAdded, setIsRoleAdded] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [currentRoleConfig, setCurrentRoleConfig] = useState<{
    role: Role;
    type?:
      | "Web_Development"
      | "Mobile_Development"
      | "Web_Testing"
      | "Mobile_Testing"
      | "API_Testing"
      | "Others";
    startDate: string;
    status: "Planning" | "In_Progress" | "Completed";
    achievements: string[];
    skills: Array<{
      id: string;
      skillId: string;
      projectId: string;
      usageLevel: number;
    }>;
    techStack: Array<{
      id: string;
      skillId: string;
      projectId: string;
      usageLevel: number;
    }>;
  } | null>(null);

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      sourceLink: initialData?.sourceLink || "",
      demoLink: initialData?.demoLink || "",
      demoVideoLink: initialData?.demoVideoLink || "",
      endDate: initialData?.endDate || "",
      assetId: initialData?.assetId || "",
      images: initialData?.images || [],
      roles: initialData?.roles || [],
    },
  });

  const roleOptions = [
    { value: Role.PRODUCT_MANAGER, label: "Product Manager", icon: IoBarChart },
    { value: Role.DEVELOPER, label: "Developer", icon: FaLaptopCode },
    { value: Role.TESTER, label: "QA Tester", icon: FaBug },
  ];

  const statusOptions = [
    {
      value: "Planning",
      label: "Planning",
      icon: Presentation,
      color: "text-gray-300",
    },
    {
      value: "In_Progress",
      label: "In Progress",
      icon: LoaderCircle,
      color: "text-blue-500",
    },
    {
      value: "Completed",
      label: "Completed",
      icon: SquareCheckBig,
      color: "text-green-500",
    },
  ];

  // Helper function to get skill title
  const getSkillTitle = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId);
    return skill?.title || skillId;
  };

  const skillOptions = skills
    .filter((skill) => skill.category === "Core_Competencies")
    .map((skill) => ({
      value: skill.id,
      label: skill.title,
    }));

  const techStackOptions = skills
    .filter((skill) => skill.category !== "Core_Competencies")
    .map((skill) => ({
      value: skill.id,
      label: skill.title,
    }));

  const typeOptions = [
    { value: "Web_Development", label: "Web Development" },
    { value: "Mobile_Development", label: "Mobile Development" },
    { value: "Web_Testing", label: "Web Testing" },
    { value: "Mobile_Testing", label: "Mobile Testing" },
    { value: "API_Testing", label: "API Testing" },
    { value: "Others", label: "Others" },
  ];

  // Validation functions for each step
  const validateStep = async (step: number): Promise<boolean> => {
    setStepErrors([]);
    const errors: string[] = [];

    switch (step) {
      case 1: // Basic Information: Title, Description, Source Link, Demo Link, Demo Video Link (optional), End Date (optional)
        // Validate required fields
        const title = form.getValues("title");
        const description = form.getValues("description");
        const sourceLink = form.getValues("sourceLink");
        const demoLink = form.getValues("demoLink");

        if (!title || title.trim() === "") {
          errors.push("Project title is required");
        }
        if (!description || description.trim() === "") {
          errors.push("Project description is required");
        }
        if (!sourceLink || sourceLink.trim() === "") {
          errors.push("Source link is required");
        }
        if (!demoLink || demoLink.trim() === "") {
          errors.push("Demo link is required");
        }

        // Trigger validation for these fields to show inline errors
        await form.trigger(["title", "description", "sourceLink", "demoLink"]);

        if (errors.length > 0) {
          setStepErrors(errors);
          return false;
        }
        return true;

      case 2: // Project Image: imageUrl, assetId (required), and additional images (optional)
        const imageUrl = form.getValues("imageUrl");
        const assetId = form.getValues("assetId");

        if (!imageUrl || imageUrl.trim() === "") {
          errors.push("Project cover image is required");
        }
        if (!assetId || assetId.trim() === "") {
          errors.push("Image asset ID is required - please upload an image");
        }

        // Trigger validation
        await form.trigger(["imageUrl", "assetId"]);

        if (errors.length > 0) {
          setStepErrors(errors);
          return false;
        }
        return true;

      case 3: // Roles: At least one role must be added with all required fields
        const roles = form.getValues("roles");
        if (!roles || roles.length === 0) {
          errors.push("Please add at least one role to the project");
          setStepErrors(errors);
          return false;
        }

        // Validate each role has required fields
        roles.forEach((role, index) => {
          if (!role.role) {
            errors.push(`Role ${index + 1}: Role type is required`);
          }
          if (!role.startDate) {
            errors.push(`Role ${index + 1}: Start date is required`);
          }
          if (!role.skills || role.skills.length === 0) {
            errors.push(`Role ${index + 1}: At least one skill is required`);
          }
        });

        if (errors.length > 0) {
          setStepErrors(errors);
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // Navigation handlers with validation
  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      setStepErrors([]);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    setStepErrors([]);
  };

  // Helper function to toggle skills in currentRoleConfig
  const toggleSkillInConfig = (skillId: string) => {
    if (!currentRoleConfig) return;

    const currentSkills = currentRoleConfig.skills || [];
    const existingIndex = currentSkills.findIndex((s) => s.skillId === skillId);

    if (existingIndex >= 0) {
      // Remove skill
      setCurrentRoleConfig({
        ...currentRoleConfig,
        skills: currentSkills.filter((s) => s.skillId !== skillId),
      });
    } else {
      // Add skill with default values
      const tempId = createdId();
      setCurrentRoleConfig({
        ...currentRoleConfig,
        skills: [
          ...currentSkills,
          {
            id: `temp-${tempId}`,
            projectId: form.getValues("id") || "",
            skillId: skillId,
            usageLevel: 50,
          },
        ],
      });
    }
  };

  // Helper function to toggle tech stack in currentRoleConfig
  const toggleTechStackInConfig = (skillId: string) => {
    if (!currentRoleConfig) return;

    const currentTechStack = currentRoleConfig.techStack || [];
    const existingIndex = currentTechStack.findIndex(
      (t) => t.skillId === skillId,
    );

    if (existingIndex >= 0) {
      // Remove tech stack
      setCurrentRoleConfig({
        ...currentRoleConfig,
        techStack: currentTechStack.filter((t) => t.skillId !== skillId),
      });
    } else {
      // Add tech stack with default values
      const tempId = createdId();
      setCurrentRoleConfig({
        ...currentRoleConfig,
        techStack: [
          ...currentTechStack,
          {
            id: `temp-${tempId}`,
            projectId: form.getValues("id") || "",
            skillId: skillId,
            usageLevel: 50,
          },
        ],
      });
    }
  };

  // Helper function to update skill usage level in currentRoleConfig
  const updateSkillUsageLevelInConfig = (skillId: string, newLevel: number) => {
    if (!currentRoleConfig) return;

    const updatedSkills = currentRoleConfig.skills.map((skill) =>
      skill.skillId === skillId ? { ...skill, usageLevel: newLevel } : skill,
    );

    setCurrentRoleConfig({
      ...currentRoleConfig,
      skills: updatedSkills,
    });
  };

  // Helper function to update tech stack usage level in currentRoleConfig
  const updateTechStackUsageLevelInConfig = (
    skillId: string,
    newLevel: number,
  ) => {
    if (!currentRoleConfig) return;

    const updatedTechStack = currentRoleConfig.techStack.map((tech) =>
      tech.skillId === skillId ? { ...tech, usageLevel: newLevel } : tech,
    );

    setCurrentRoleConfig({
      ...currentRoleConfig,
      techStack: updatedTechStack,
    });
  };

  const addRole = () => {
    if (!currentRoleConfig) return;

    const errors: string[] = [];

    // Validate role configuration
    if (!currentRoleConfig.role) {
      errors.push("Please select a role");
    }
    if (!currentRoleConfig.type) {
      errors.push("Please select a project type");
    }
    if (!currentRoleConfig.startDate) {
      errors.push("Please select a start date");
    }
    if (!currentRoleConfig.status) {
      errors.push("Please select a status");
    }
    if (!currentRoleConfig.skills || currentRoleConfig.skills.length === 0) {
      errors.push("Please add at least one skill");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const tempId = createdId();
    const currentRoles = form.getValues("roles") || [];

    const newRole = {
      id: `temp-${tempId}`,
      ...currentRoleConfig, // Use the configured role data
    };
    form.setValue("roles", [...currentRoles, newRole]);
    setSelectedRoleIndex(currentRoles.length);

    // Reset the configuration for next role
    setCurrentRoleConfig(null);
    setIsRoleAdded(true);
  };

  const removeRole = (index: number) => {
    const currentRoles = form.getValues("roles") || [];
    const updatedRoles = currentRoles.filter((_, i) => i !== index);
    form.setValue("roles", updatedRoles);
    if (selectedRoleIndex >= updatedRoles.length) {
      setSelectedRoleIndex(Math.max(0, updatedRoles.length - 1));
    }
    if (updatedRoles.length === 0) {
      setIsRoleAdded(false);
    }
  };

  const handleSubmit = async (data: ProjectSchema) => {
    // Check if form is valid
    const isValid = form.trigger();
    console.log("Form valid:", isValid);
    if (!isValid) {
      console.log("Form validation failed");
      return;
    }
    const error = form.formState.errors;
    console.log({ error });
    try {
      await onSubmit(data);
      setShowSuccess(true);

      // Reset form only if adding new (not editing)
      if (!initialData?.id) {
        form.reset();
      }

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen?.(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Don't reset form or close modal on error
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  const watchedTitle = useWatch({ control: form.control, name: "title" });
  const watchedDescription = useWatch({
    control: form.control,
    name: "description",
  });
  const watchedSourceLink = useWatch({
    control: form.control,
    name: "sourceLink",
  });
  const watchedDemoLink = useWatch({ control: form.control, name: "demoLink" });
  const watchedDemoVideoLink = useWatch({
    control: form.control,
    name: "demoVideoLink",
  });
  const watchedEndDate = useWatch({ control: form.control, name: "endDate" });
  const watchedimageUrl = useWatch({ control: form.control, name: "imageUrl" });
  // const watchedAssetId = useWatch({ control: form.control, name: "assetId" });
  // const watchedImages = useWatch({ control: form.control, name: "images" });
  const watchedRoles = useWatch({ control: form.control, name: "roles" }) ?? [];

  const canSubmit = watchedRoles.length > 0 && !isSubmitting;

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <FormCard
          className="relative overflow-hidden"
          footer={
            <div className="flex flex-col gap-4 w-full">
              {/* Preview Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-4 w-full"
              >
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Preview
                </h3>
                <div className="space-y-4">
                  {/* Project Image */}
                  {watchedimageUrl && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={watchedimageUrl || "/placeholder.svg"}
                        alt="Project preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Project Title */}
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {watchedTitle || "Project Title"}
                    </h4>
                    {watchedEndDate && (
                      <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(watchedEndDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Project Description */}
                  {watchedDescription && (
                    <p className="text-sm text-zinc-300 line-clamp-3">
                      {watchedDescription}
                    </p>
                  )}

                  {/* Links */}
                  <div className="flex gap-2 flex-wrap">
                    {watchedSourceLink && (
                      <Badge
                        variant="secondary"
                        className="bg-green-700 text-white text-xs"
                      >
                        <FaGithub className="w-3 h-3 mr-1" />
                      </Badge>
                    )}
                    {watchedDemoLink && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-700 text-white text-xs"
                      >
                        <CgWebsite className="w-3 h-3 mr-1" />
                      </Badge>
                    )}
                    {watchedDemoVideoLink && (
                      <Badge
                        variant="secondary"
                        className="bg-red-700 text-white text-xs"
                      >
                        <Video className="w-3 h-3 mr-1" />
                      </Badge>
                    )}
                  </div>

                  {/* Roles */}
                  {watchedRoles.length > 0 && (
                    <div className="pt-3 border-t border-zinc-700">
                      <p className="text-xs text-zinc-400 mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Roles:
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {watchedRoles.map((role) => {
                          const roleOption = roleOptions.find(
                            (option) => option.value === role.role,
                          );
                          const IconComponent = roleOption?.icon;
                          return (
                            <Badge
                              key={role.role}
                              variant="secondary"
                              className="bg-zinc-700 text-white text-xs"
                            >
                              {IconComponent && (
                                <IconComponent className="w-3 h-3" />
                              )}
                              {role.role}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Submit Status */}
                  {watchedRoles.length === 0 && (
                    <div className="pt-3 border-t border-zinc-700">
                      <p className="text-xs text-yellow-400 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" />
                        Add at least one role to enable submission
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 w-full">
                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={handlePrevious}
                      variant="outline"
                      className="border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {currentStep < 3 && (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>

                {/* Submit Button and Success Message */}
                <div className="flex items-center gap-3">
                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2 text-green-400"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">
                          Project added successfully!
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {currentStep === 3 && (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className={cn(
                        "bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 min-w-35",
                        !canSubmit && "opacity-50 cursor-not-allowed",
                      )}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 mr-2" />
                          Add Project
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          }
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">
                {initialData?.id ? "Edit Project" : "Create New Project"}
              </h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <p className="text-zinc-400 text-sm">
              Showcase your amazing work and achievements
            </p>
          </div>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  <p
                    className={`text-xs mt-2 ${currentStep >= step ? "text-white" : "text-gray-500"}`}
                  >
                    {step === 1 ? "Basic Info" : step === 2 ? "Image" : "Roles"}
                  </p>
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 flex-1 transition-all ${currentStep > step ? "bg-indigo-600" : "bg-gray-700"}`}
                  />
                )}

                {/* Error Message */}
                {stepErrors.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-red-500 font-semibold mb-1">
                          Please fix the following errors:
                        </h3>
                        <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
                          {stepErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-blue-400" />
                    Basic Information
                  </h3>
                  {/* Project Title */}
                  <FieldGroup>
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-blue-400" />
                            Project Title
                          </FieldLabel>
                          <Input
                            className="border-zinc-700 bg-zinc-800/50 text-white focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/70 transition-all duration-200"
                            placeholder="My Awesome Project.."
                            {...field}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Project Description */}
                  <FieldGroup>
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                            <SquarePilcrow className="w-4 h-4 text-green-400" />
                            Description
                          </FieldLabel>
                          <Textarea
                            className="min-h-30 border-zinc-700 bg-zinc-800/50 text-white focus:border-green-500/70 focus:ring-1 focus:ring-green-500/70 transition-all duration-200"
                            placeholder="Describe your project, its features and what makes it special..."
                            {...field}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Project End Date */}
                  <FieldGroup>
                    <Controller
                      name="endDate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            End Date
                          </FieldLabel>
                          <DateInput
                            value={field.value ? new Date(field.value) : null}
                            onChange={(date) =>
                              field.onChange(date?.toISOString() || "")
                            }
                            placeholder="Select end Date"
                            variant="monthYear"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Project Source Link */}
                    <FieldGroup>
                      <Controller
                        name="sourceLink"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                              <FaGithub className="w-4 h-4" />
                              Source Link
                            </FieldLabel>
                            <Input
                              className="border-zinc-700 bg-zinc-800/50 text-white focus:border-green-500/70 focus:ring-1 focus:ring-green-500/70"
                              placeholder="https://github.com/..."
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>

                    {/* Project Demo Link */}
                    <FieldGroup>
                      <Controller
                        name="demoLink"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                              <CgWebsite className="w-4 h-4" />
                              Demo Link
                            </FieldLabel>
                            <Input
                              className="border-zinc-700 bg-zinc-800/50 text-white focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/70"
                              placeholder="https://demo.example.com"
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>

                    {/* Project Demo Video Link */}
                    <FieldGroup>
                      <Controller
                        name="demoVideoLink"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                              <Video className="w-4 h-4 text-red-400" />
                              Demo Video Link
                            </FieldLabel>
                            <Input
                              className="border-zinc-700 bg-zinc-800/50 text-white focus:border-red-500/70 focus:ring-1 focus:ring-red-500/70"
                              placeholder="https://youtube.com/..."
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>
                </div>
              )}

              {/* Step 2: Project Cover Image and Additional Images */}
              {currentStep === 2 && (
                <>
                  {/* Project Cover Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <ImagePlus className="w-5 h-5 text-yellow-400" />
                      Project Image
                    </h3>
                    {/* Image */}
                    <FieldGroup>
                      <Controller
                        name="imageUrl"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor="company"
                              className="text-sm font-medium text-white flex items-center gap-2"
                            >
                              <ImageIcon className="w-4 h-4 text-yellow-400" />
                              Project Cover Image
                            </FieldLabel>
                            <ProjectImageUploader
                              value={field.value || ""}
                              onChange={(url, assetId) => {
                                field.onChange(url);
                                form.setValue("assetId", assetId);
                              }}
                              onRemove={() => {
                                field.onChange("");
                                form.setValue("assetId", "");
                              }}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>

                  {/* Additional Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                      <ImagePlus className="w-5 h-5 text-yellow-400" />
                      Project Image
                    </h3>
                    {/* Images */}
                    <FieldGroup>
                      <Controller
                        name="images"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor="images"
                              className="text-sm font-medium text-white flex items-center gap-2"
                            >
                              <ImagesIcon className="w-4 h-4 text-purple-400" />
                              Project Images
                            </FieldLabel>
                            <MultipleImageUpload
                              value={field.value?.map((imag) => imag.url) || []}
                              onChange={(url, assetId, folder) => {
                                const currentImages = field.value || [];
                                if (
                                  !currentImages.some((img) => img.url === url)
                                ) {
                                  field.onChange([
                                    ...currentImages,
                                    {
                                      url,
                                      assetId: assetId || null,
                                      // id and projectId will be set by backend
                                    },
                                  ]);
                                }
                                console.log(
                                  "New Image Upload:",
                                  url,
                                  assetId,
                                  folder,
                                );
                              }}
                              onRemove={(url) => {
                                const currentImages = field.value || [];
                                field.onChange(
                                  currentImages.filter(
                                    (img) => img.url !== url,
                                  ),
                                );
                              }}
                              onRemoveError={(error) => {
                                console.error("Image upload error:", error);
                              }}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>
                </>
              )}

              {/* Step 3: Project Roles */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  <h3 className="text-lh font-semibold text-white flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-green-400" />
                    Project Roles & Details
                  </h3>
                  {/* Role & Type */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {/* Role */}
                    <FieldGroup>
                      <Controller
                        name="roles"
                        control={form.control}
                        render={({ fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="col-span-4"
                          >
                            <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                              <CircleUserIcon className="size-4 text-green-400" />
                              Roles
                            </FieldLabel>
                            <Select
                              onValueChange={(value) => {
                                setCurrentRoleConfig({
                                  role: value as Role,
                                  achievements: [],
                                  skills: [],
                                  techStack: [],
                                  startDate: new Date().toISOString(),
                                  status: "Planning" as const,
                                });
                              }}
                              value={currentRoleConfig?.role || ""}
                            >
                              <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70">
                                <SelectValue placeholder="Select a Role" />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-900 border-zinc-800">
                                {roleOptions.map((role) => {
                                  const IconComponent = role.icon;
                                  return (
                                    <SelectItem
                                      key={role.value}
                                      value={role.value}
                                      className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                                    >
                                      <div className="flex items-center gap-2">
                                        <IconComponent className="w-4 h-4" />
                                        {role.label}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>

                    {/* Type */}
                    <FieldGroup>
                      <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                        <FaGamepad className="size-4 text-cyan-400" />
                        Type
                      </FieldLabel>
                      <Select
                        onValueChange={(value) => {
                          if (currentRoleConfig) {
                            setCurrentRoleConfig({
                              ...currentRoleConfig,
                              type: value as
                                | "Web_Development"
                                | "Mobile_Development"
                                | "Web_Testing"
                                | "Mobile_Testing"
                                | "API_Testing"
                                | "Others",
                            });
                          }
                        }}
                        value={currentRoleConfig?.type || ""}
                      >
                        <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70">
                          <SelectValue placeholder="Select a Project Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {typeOptions.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                            >
                              <div className="flex items-center gap-2">
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                  </div>

                  {/* Start Date & Status */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Start Date */}
                    <FieldGroup>
                      <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        Start Date
                      </FieldLabel>
                      <DateInput
                        value={
                          currentRoleConfig?.startDate
                            ? typeof currentRoleConfig.startDate === "string"
                              ? new Date(currentRoleConfig.startDate)
                              : currentRoleConfig.startDate
                            : null
                        }
                        onChange={(date) => {
                          if (currentRoleConfig) {
                            setCurrentRoleConfig({
                              ...currentRoleConfig,
                              startDate: date ? format(date, "MMM yyyy") : "",
                            });
                          }
                        }}
                        placeholder="Select start date"
                        variant="monthYear"
                      />
                    </FieldGroup>

                    {/* Status */}
                    <FieldGroup>
                      <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                        <ChartCandlestick className="w-4 h-4 text-indigo-400" />
                        Status
                      </FieldLabel>
                      <Select
                        onValueChange={(value) => {
                          if (currentRoleConfig) {
                            setCurrentRoleConfig({
                              ...currentRoleConfig,
                              status: value as
                                | "Planning"
                                | "In_Progress"
                                | "Completed",
                            });
                          }
                        }}
                        value={currentRoleConfig?.status || ""}
                      >
                        <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          {statusOptions.map((status) => {
                            const Icon = status.icon;
                            return (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                                className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className={`w-4 h-4 ${status.color}`} />
                                  {status.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                  </div>

                  {/* Achievements */}
                  <FieldGroup>
                    <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                      <GrAchievement className="w-4 h-4 text-yellow-400" />
                      Key Achievements & Activities Achievements
                    </FieldLabel>
                    <TagInput
                      value={currentRoleConfig?.achievements || []}
                      onChange={(achievements) => {
                        if (currentRoleConfig) {
                          setCurrentRoleConfig({
                            ...currentRoleConfig,
                            achievements,
                          });
                        }
                      }}
                      placeholder="Add achievement and press Enter (e.g., Dean's List, Magna Cum Laude, Student Council President...)"
                    />
                  </FieldGroup>

                  {/* Skills */}
                  <FieldGroup>
                    <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                      Skills
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !currentRoleConfig?.skills.length &&
                              "text-muted-foreground",
                          )}
                        >
                          {currentRoleConfig?.skills &&
                          currentRoleConfig?.skills?.length > 0
                            ? `${currentRoleConfig.skills.length} skill${currentRoleConfig.skills.length > 1 ? "s" : ""} selected`
                            : "Select Skills"}
                          <FaGear className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-235 p-0 bg-gray-700"
                        align="start"
                      >
                        <div className="p-2">
                          {skillOptions.map((skill) => {
                            const isSelected = currentRoleConfig?.skills?.some(
                              (s) => s.skillId === skill.value,
                            );
                            return (
                              <div
                                key={skill.value}
                                role="button"
                                className={cn(
                                  "flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent",
                                  isSelected && "bg-accent",
                                )}
                                onClick={() => toggleSkillInConfig(skill.value)}
                              >
                                <div
                                  className={cn(
                                    "h-4 w-4 border rounded-sm flex items-center justify-center",
                                    isSelected && "bg-primary border-primary",
                                  )}
                                >
                                  {isSelected && (
                                    <CheckCircle className="size-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span>{skill.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {currentRoleConfig?.skills &&
                      currentRoleConfig?.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentRoleConfig.skills.map((skill) => (
                            <div
                              key={skill.id}
                              className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 w-220"
                            >
                              <Badge
                                //   variant="secondary"
                                //   className="gap-1 pr-0"
                                variant="secondary"
                                className="gap-1 shrink-0"
                              >
                                {getSkillTitle(skill.skillId)}
                                <Button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleSkillInConfig(skill.skillId);
                                  }}
                                  size="icon"
                                  variant="ghost"
                                  className="h-full pr-0 hover:bg-gray-200 rounded-sm cursor-pointer"
                                >
                                  <X className="size-3" />
                                </Button>
                              </Badge>
                              <div className="flex items-center gap-3 flex-1">
                                <ColorSlider
                                  value={[skill.usageLevel]}
                                  onValueChange={(value) =>
                                    updateSkillUsageLevelInConfig(
                                      skill.skillId,
                                      value[0],
                                    )
                                  }
                                  min={0}
                                  max={100}
                                  step={5}
                                  className="flex-1"
                                />
                                <span className="text-sm text-white font-medium min-w-[3ch] text-right">
                                  {skill.usageLevel}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </FieldGroup>

                  {/* Tech Stack */}
                  <FieldGroup>
                    <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-green-400" />
                      Tech Stacks
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !currentRoleConfig?.techStack?.length &&
                              "text-muted-foreground",
                          )}
                        >
                          {currentRoleConfig?.techStack &&
                          currentRoleConfig?.techStack?.length > 0
                            ? `${currentRoleConfig.techStack.length} Tech Stack Skill${currentRoleConfig.techStack.length > 1 ? "s" : ""} selected`
                            : "Select Tech Stack"}
                          <Code2Icon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-235 p-0 bg-gray-700"
                        align="start"
                      >
                        <div className="p-2">
                          {techStackOptions.map((tech) => {
                            const isSelected =
                              currentRoleConfig?.techStack?.some(
                                (s) => s.skillId === tech.value,
                              );
                            return (
                              <div
                                key={tech.value}
                                role="button"
                                className={cn(
                                  "flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent",
                                  isSelected && "bg-accent",
                                )}
                                onClick={() =>
                                  toggleTechStackInConfig(tech.value)
                                }
                              >
                                <div
                                  className={cn(
                                    "h-4 w-4 border rounded-sm flex items-center justify-center",
                                    isSelected && "bg-primary border-primary",
                                  )}
                                >
                                  {isSelected && (
                                    <CheckCircle className="size-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span>{tech.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {currentRoleConfig?.techStack &&
                      currentRoleConfig?.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentRoleConfig.techStack.map((tech) => (
                            <div
                              key={tech.id}
                              className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 w-220"
                            >
                              <Badge
                                //   variant="secondary"
                                //   className="gap-1 pr-0"
                                variant="secondary"
                                className="gap-1 shrink-0"
                              >
                                {getSkillTitle(tech.skillId)}
                                <Button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleTechStackInConfig(tech.skillId);
                                  }}
                                  size="icon"
                                  variant="ghost"
                                  className="h-full pr-0 hover:bg-gray-200 rounded-sm cursor-pointer"
                                >
                                  <X className="size-3" />
                                </Button>
                              </Badge>
                              <div className="flex items-center gap-3 flex-1">
                                <ColorSlider
                                  value={[tech.usageLevel]}
                                  onValueChange={(value) =>
                                    updateTechStackUsageLevelInConfig(
                                      tech.skillId,
                                      value[0],
                                    )
                                  }
                                  min={0}
                                  max={100}
                                  step={5}
                                  className="flex-1"
                                />
                                <span className="text-sm text-white font-medium min-w-[3ch] text-right">
                                  {tech.usageLevel}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </FieldGroup>

                  {/* Add Button */}
                  <Button
                    type="button"
                    onClick={() => {
                      console.log("Adding role...");
                      addRole();
                    }}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add This Role to Project
                  </Button>

                  {watchedRoles.length > 0 && isRoleAdded && (
                    <>
                      <div className="flex gap-2 flex-wrap mb-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                          Added Roles ({watchedRoles.length}){" "}
                        </h3>
                        <div className="space-y-3">
                          {watchedRoles.map((role, index) => (
                            <div
                              key={role.id}
                              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                            >
                              <div>
                                <span className="font-semibold text-gray-800">
                                  {role.role}
                                </span>
                                <span className="text-gray-500 mx-2">•</span>
                                <span className="text-gray-600">
                                  {role.type}
                                </span>
                                <span className="text-gray-500 mx-2">•</span>
                                <span className="text-sm text-gray-500">
                                  {role.status}
                                </span>
                              </div>
                              <Button
                                onClick={() => removeRole(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2Icon size={18} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </FormCard>
      </form>
    </div>
  );
};
