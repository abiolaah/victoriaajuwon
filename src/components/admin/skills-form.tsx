"use client";

import React, { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, SkillSchema } from "@/types/skillSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/admin/form-card";
import { SkillImageUploader } from "@/components/admin/image-uploader";
import { AnimatePresence, motion } from "motion/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Layers,
  Star,
  CheckCircle,
  Sparkles,
  Lightbulb,
  ImageIcon,
  Hammer,
  Lamp,
  Users,
  User2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RoleList } from "@/lib/constants";
import { Role } from "@/types/role";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { IoBarChart } from "react-icons/io5";
import { FaLaptopCode } from "react-icons/fa";
import { FaBug } from "react-icons/fa6";

const skillTypes = [
  { value: "Soft", label: "Soft Skills", icon: Brain, color: "bg-blue-500" },
  { value: "Hard", label: "Hard Skills", icon: Hammer, color: "bg-green-500" },
  { value: "Both", label: "Both", icon: Lamp, color: "bg-purple-500" },
];

const skillCategories = [
  {
    value: "Programming_Language",
    label: "Programming Language",
    icon: "📝",
    color: "bg-red-500",
  },
  { value: "Frontend", label: "Frontend", icon: "🎨", color: "bg-pink-500" },
  { value: "Backend", label: "Backend", icon: "⚙️", color: "bg-blue-500" },
  { value: "Database", label: "Database", icon: "🗄️", color: "bg-green-500" },
  { value: "Testing", label: "Testing", icon: "🧪", color: "bg-yellow-500" },
  {
    value: "Core_Competencies",
    label: "Core Competencies",
    icon: "💎",
    color: "bg-emerald-500",
  },
  {
    value: "Cloud_Devops",
    label: "Cloud/DevOps",
    icon: "🚀",
    color: "bg-orange-500",
  },
  {
    value: "Practices",
    label: "Practices",
    icon: "🏆",
    color: "bg-purple-500",
  },
  { value: "Tools", label: "Tools", icon: "🔧", color: "bg-gray-500" },
];

interface SkillFormProps {
  onSubmit: (data: SkillSchema) => void;
}

const SkillForm = ({ onSubmit }: SkillFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const roleOptions = [
    { value: Role.PRODUCT_MANAGER, label: "Product Manager", icon: IoBarChart },
    { value: Role.DEVELOPER, label: "Developer", icon: FaLaptopCode },
    { value: Role.TESTER, label: "QA Tester", icon: FaBug },
  ];

  const form = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
      type: undefined,
      category: undefined,
      isCommon: false, // Added isCommon field
      roles: RoleList.map((role) => ({
        role,
        isCustom: false,
      })),
    },
  });

  const watchedType = useWatch({ control: form.control, name: "type" });
  const watchedCategory = useWatch({ control: form.control, name: "category" });
  const watchedIsCommon = useWatch({ control: form.control, name: "isCommon" });

  const selectedType = skillTypes.find((type) => type.value === watchedType);
  const selectedCategory = skillCategories.find(
    (cat) => cat.value === watchedCategory,
  );

  const watchedRoles = useWatch({ control: form.control, name: "roles" }) ?? [];
  const watchedTitle = useWatch({ control: form.control, name: "title" });
  const watchedImage = useWatch({ control: form.control, name: "imageUrl" });

  const toggleRole = (role: Role) => {
    const currentRoles = form.getValues("roles") ?? [];
    const isCommon = form.getValues("isCommon");

    const exists = currentRoles.find((r) => r.role === role);

    if (exists) {
      form.setValue(
        "roles",
        currentRoles.filter((r) => r.role !== role),
      );
    } else {
      form.setValue("roles", [
        ...currentRoles,
        {
          role,
          isCustom: !isCommon,
        },
      ]);
    }
  };

  const handleSubmit = async (data: SkillSchema) => {
    try {
      await onSubmit(data);
      setShowSuccess(true);
      form.reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <FormCard
          className="relative overflow-hidden"
          footer={
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
                    <span className="text-sm">Skill added successfully!</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 min-w-30"
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
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Add Skill
                  </>
                )}
              </Button>
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
              <h2 className="text-2xl font-bold text-white">Add New Skill</h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <p className="text-zinc-400 text-sm">
              Showcase your expertise and capabilities
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* Skill Name */}
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldGroup data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-400" />
                        Skill Name
                      </FieldLabel>
                      <Input
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/70 transition-all duration-200"
                        placeholder="e.g., React, JavaScript, Communication..."
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldGroup>
                  )}
                />
              </FieldGroup>
              {/* Type and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Types */}
                <FieldGroup>
                  <Controller
                    name="type"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FieldGroup data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-purple-400" />
                          Skill Type
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800">
                            {skillTypes.map((type) => {
                              const Icon = type.icon;
                              return (
                                <SelectItem
                                  key={type.value}
                                  value={type.value}
                                  className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-3 h-3 rounded-full ${type.color}`}
                                    />
                                    <Icon className="w-4 h-4" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldGroup>
                    )}
                  />
                </FieldGroup>

                {/* Category */}
                <FieldGroup>
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FieldGroup data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          Category
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-yellow-500/70 focus:ring-1 focus:ring-yellow-500/70">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-zinc-800 max-h-60">
                            {skillCategories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                                className="text-white hover:bg-zinc-800 focus:bg-zinc-800"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">
                                    {category.icon}
                                  </span>
                                  {category.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldGroup>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* Add isCommon field to the form */}
              <FieldGroup>
                <Controller
                  name="isCommon"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FieldGroup data-invalid={fieldState.invalid}>
                      <div className="space-y-0.5">
                        <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                          <Users className="size-4 text-cyan-400" />
                          {field.value ? "Common Skill" : "Custom Skill"}
                        </FieldLabel>
                        <p className="text-xs text-zinc-400">
                          {field.value
                            ? "Available to all specified profiles"
                            : "Specific to a single profile"}
                        </p>
                      </div>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          // Clear profiles when switching
                          form.setValue("roles", []);
                        }}
                        className="bg-white data-[state=checked]:bg-cyan-500"
                        thumbClassName="bg-cyan-500 data-[state=checked]:bg-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldGroup>
                  )}
                />
              </FieldGroup>

              {/* Roles */}
              <div className="space-y-4">
                {watchedIsCommon ? (
                  <FieldGroup>
                    <Controller
                      name="roles"
                      control={form.control}
                      render={({ fieldState }) => (
                        <FieldGroup
                          data-invalid={fieldState.invalid}
                          className="col-span-4"
                        >
                          <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                            <Users className="w-4 h-4 text-green-400" />
                            Roles
                          </FieldLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !watchedRoles.length &&
                                    "text-muted-foreground",
                                )}
                              >
                                {watchedRoles.length > 0
                                  ? `${watchedRoles.length} role${watchedRoles.length > 1 ? "s" : ""} selected`
                                  : "Select Roles"}
                                <User2 className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-full p-0"
                              //   className="w-full p-0 bg-zinc-900 border-zinc-800"
                              align="start"
                            >
                              <div
                                className="p-2"
                                //   className="p-2 max-h-60 overflow-y-auto"
                              >
                                {roleOptions.map((option) => {
                                  const isSelected = watchedRoles.some(
                                    (p) => p.role === option.value,
                                  );
                                  const IconComponent = option.icon;
                                  return (
                                    <div
                                      key={option.value}
                                      role="button"
                                      className={cn(
                                        "flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm cursor-pointer hover:bg-accent",
                                        isSelected && "bg-accent",
                                      )}
                                      onClick={() => toggleRole(option.value)}
                                    >
                                      <div
                                        className={cn(
                                          "h-4 w-4 border rounded-sm flex items-center justify-center",
                                          isSelected &&
                                            "bg-primary border-primary",
                                        )}
                                      >
                                        {isSelected && (
                                          <CheckCircle className="size-3 text-primary-foreground" />
                                        )}
                                      </div>
                                      <IconComponent className="w-4 h-4" />
                                      <span>{option.label}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </PopoverContent>
                          </Popover>
                          {watchedRoles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {watchedRoles.map((role) => {
                                const option = roleOptions.find(
                                  (o) => o.value === role.role,
                                );
                                const label = option?.label ?? role.role;
                                const IconComponent = option?.icon;
                                return (
                                  <div
                                    key={role.id}
                                    className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
                                  >
                                    <Badge
                                      //   variant="secondary"
                                      //   className="gap-1 pr-0"
                                      //   className="gap-2 pr-1 bg-zinc-700 text-white"
                                      variant="secondary"
                                      className="gap-1 shrink-0"
                                    >
                                      {IconComponent && (
                                        <IconComponent className="w-4 h-4" />
                                      )}{" "}
                                      {/* Conditionally render */}
                                      {label}
                                      <Button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          toggleRole(role.role);
                                        }}
                                        size="icon"
                                        variant="ghost"
                                        //   className="h-4 w-4 p-0 hover:bg-zinc-600 rounded-sm"
                                        className="h-full pr-0 hover:bg-gray-200 rounded-sm cursor-pointer"
                                      >
                                        <X className="size-3" />
                                      </Button>
                                    </Badge>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldGroup>
                      )}
                    />
                  </FieldGroup>
                ) : (
                  <FieldGroup>
                    <Controller
                      name="roles"
                      control={form.control}
                      render={({ fieldState }) => (
                        <FieldGroup
                          data-invalid={fieldState.invalid}
                          className="col-span-4"
                        >
                          <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                            <Users className="size-4 text-green-400" />
                            Roles
                          </FieldLabel>
                          <Select
                            onValueChange={(value) => {
                              const isCommon = form.getValues("isCommon");
                              form.setValue("roles", [
                                {
                                  id: `temp-${Date.now()}`,
                                  role: value as Role,
                                  isCustom: !isCommon,
                                },
                              ]);
                            }}
                            value={watchedRoles[0]?.role || ""}
                          >
                            <SelectTrigger className="border-zinc-700 bg-zinc-800/50 text-white focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/70">
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
                        </FieldGroup>
                      )}
                    />
                  </FieldGroup>
                )}
              </div>
            </div>

            {/* Right Column - Image Upload & Preview */}
            <div className="space-y-6">
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
                        Skill Icon/Logo
                      </FieldLabel>
                      <SkillImageUploader
                        value={field.value || ""}
                        onChange={field.onChange}
                        onRemove={() => field.onChange("")}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Preview Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-4"
              >
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Preview
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {watchedImage && (
                      <Image
                        src={watchedImage || "/placeholder.svg"}
                        alt="Skill icon"
                        className="w-8 h-8 rounded object-cover"
                        width={32}
                        height={32}
                      />
                    )}
                    <span className="text-white font-medium">
                      {watchedTitle || "Skill Name"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {/* Type */}
                    {selectedType && (
                      <Badge
                        variant="secondary"
                        className="bg-zinc-700 text-white"
                      >
                        {selectedType.label}
                      </Badge>
                    )}

                    {/* Category */}
                    {selectedCategory && (
                      <Badge
                        variant="secondary"
                        className="bg-zinc-700 text-white"
                      >
                        <span className="mr-1">{selectedCategory.icon}</span>
                        {selectedCategory.label}
                      </Badge>
                    )}

                    {/* Common/Custom Badge */}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-white",
                        watchedIsCommon ? "bg-green-700" : "bg-orange-700",
                      )}
                    >
                      {watchedIsCommon ? "Common" : "Custom"}
                    </Badge>
                  </div>

                  {/* Show assigned profile */}
                  {watchedRoles.length > 0 && (
                    <div className="pt-2 border-t border-zinc-700">
                      <p className="text-xs text-zinc-400 mb-2">Assigned to:</p>
                      <div className="flex gap-2 flex-wrap">
                        {watchedRoles.map((r) => {
                          const option = roleOptions.find(
                            (o) => o.value === r.role,
                          );
                          const label = option?.label ?? r.role;
                          const IconComponent = option?.icon;
                          return (
                            <div
                              key={r.role}
                              className="flex items-center gap-2 bg-zinc-700 rounded-full px-2 py-1"
                            >
                              {IconComponent && (
                                <IconComponent className="w-3 h-3" />
                              )}{" "}
                              {/* Conditionally render */}
                              <span className="text-xs text-white">
                                {label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </FormCard>
      </form>
    </div>
  );
};

export default SkillForm;
