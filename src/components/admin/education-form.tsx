"use client";

import { educationSchema, EducationSchema } from "@/types/educationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  School,
  Sparkles,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import { FormCard } from "@/components/admin/form-card";
import DateInput from "@/components/admin/date-input";
import { ProfessionalUploader } from "@/components/admin/image-uploader";
import TagInput from "@/components/admin/tag-input";
import { useState } from "react";

interface EducationFormProps {
  initialData?: Partial<EducationSchema>;
  onSubmit: (data: EducationSchema) => void;
  onDelete?: () => void;
  setIsModalOpen: (open: boolean) => void;
}

export const EducationForm = ({
  initialData,
  onSubmit,
  onDelete,
  setIsModalOpen,
}: EducationFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<EducationSchema>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: initialData?.degree || "",
      institution: initialData?.institution || "",
      fieldOfStudy: initialData?.fieldOfStudy || "",
      startDate: initialData?.startDate || undefined,
      endDate: initialData?.endDate || undefined,
      description: initialData?.description || [],
      imageUrl: initialData?.imageUrl || "",
      assetId: initialData?.assetId || "",
      isCommon: initialData?.isCommon || false,
    },
  });

  const handleFormSubmit = async (data: EducationSchema) => {
    try {
      await onSubmit(data);
      setShowSuccess(true);

      // Reset form only if adding new (not editing)
      if (!initialData?.id) {
        form.reset();
      }

      // Close modal after a brief delay to show success message
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Don't reset form or close modal on error
    }
  };

  const watchedDegree = useWatch({ control: form.control, name: "degree" });
  const watchedInstitution = useWatch({
    control: form.control,
    name: "institution",
  });
  const watchedFieldOfStudy = useWatch({
    control: form.control,
    name: "fieldOfStudy",
  });
  const watchedImageUrl = useWatch({ control: form.control, name: "imageUrl" });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
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
                    <span className="text-sm">
                      Education added successfully!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                {onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 min-w-35 cursor-pointer"
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
                      <GraduationCap className="w-4 h-4 mr-2" />
                      {initialData?.degree
                        ? "Update Education"
                        : "Add Education"}
                    </>
                  )}
                </Button>
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
                {initialData?.degree ? "Edit Education" : "Add Education"}
              </h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <p className="text-zinc-400 text-sm">
              Document your academic achievements and qualifications
            </p>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Degree */}
              <FieldGroup>
                <Controller
                  name="degree"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="education-degree"
                        className="text-sm font-medium text-white flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-400" />
                        Degree
                      </FieldLabel>
                      <Input
                        {...field}
                        id="education-degree"
                        aria-invalid={fieldState.invalid}
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/70 transition-all duration-200"
                        placeholder="Bachelor of Science, Master of Arts, etc."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Institution */}
              <FieldGroup>
                <Controller
                  name="institution"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="education-institution"
                        className="text-sm font-medium text-white flex items-center gap-2"
                      >
                        <School className="w-4 h-4 text-green-400" />
                        Institution
                      </FieldLabel>
                      <Input
                        {...field}
                        id="education-institution"
                        aria-invalid={fieldState.invalid}
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-green-500/70 focus:ring-1 focus:ring-green-500/70 transition-all duration-200"
                        placeholder="University of Technology, Harvard University, etc."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Field of Study */}
              <FieldGroup>
                <Controller
                  name="fieldOfStudy"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fieldOfStudy"
                        className="text-sm font-medium text-white flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        Field of Study
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fieldOfStudy"
                        aria-invalid={fieldState.invalid}
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/70 transition-all duration-200"
                        placeholder="Computer Science, Business Administration, etc."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <FieldGroup>
                  <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          Start Date
                        </FieldLabel>
                        <DateInput
                          {...field}
                          aria-invalid={fieldState.invalid}
                          value={field.value ? new Date(field.value) : null}
                          // onChange={(date) =>
                          //   field.onChange(date ? format(date, "MMM yyyy") : "")
                          // }
                          onChange={(date) => field.onChange(date || undefined)}
                          placeholder="Select start date"
                          variant="monthYear"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>

                {/* End Date */}
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
                          {...field}
                          aria-invalid={fieldState.invalid}
                          value={field.value ? new Date(field.value) : null}
                          // onChange={(date) =>
                          //   field.onChange(date ? format(date, "MMM yyyy") : "")
                          // }
                          onChange={(date) => field.onChange(date || undefined)}
                          placeholder="Select end date"
                          variant="monthYear"
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

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image */}
              <FieldGroup>
                <Controller
                  name="imageUrl"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                        <School className="w-4 h-4 text-cyan-400" />
                        Institution Logo
                      </FieldLabel>
                      <ProfessionalUploader
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
                    {watchedImageUrl && (
                      <Image
                        src={
                          watchedImageUrl ||
                          "https://res.cloudinary.com/dixwarqdb/image/upload/v1743796014/samples/man-on-a-street.jpg"
                        }
                        alt="Institution Logo"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <h4 className="text-white font-medium">
                        {watchedDegree || "Degree Name"}
                      </h4>
                      <p className="text-zinc-400 text-sm">
                        {watchedInstitution || "Institution Name"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-zinc-700 text-white"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {watchedFieldOfStudy || "Field of Study"}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-8">
            <FieldGroup>
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-medium text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      Key Achievements & Activities
                    </FieldLabel>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Add achievement and press Enter (e.g., Dean's List, Magna Cum Laude, Student Council President...)"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </FormCard>
      </form>
    </div>
  );
};
