"use client";

import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, ExperienceSchema } from "@/types/experienceSchema";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/admin/form-card";
import TagInput from "@/components/admin/tag-input";
import DateInput from "@/components/admin/date-input";
import { ProfessionalUploader } from "@/components/admin/image-uploader";

import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  ImageIcon,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

interface ExperienceFormProps {
  initialData?: Partial<ExperienceSchema>;
  onSubmit: (data: ExperienceSchema) => void;
  onDelete?: () => void;
  setIsModalOpen?: (open: boolean) => void;
}

export function ExperienceForm({
  initialData,
  onSubmit,
  onDelete,
  setIsModalOpen,
}: ExperienceFormProps) {
  const [showSuccess, setShowSuccess] = React.useState(false);

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: initialData?.role || "",
      company: initialData?.company || "",
      startDate: initialData?.startDate || undefined,
      endDate: initialData?.endDate || undefined,
      description: initialData?.description || [],
      imageUrl: initialData?.imageUrl || "",
      assetId: initialData?.assetId || "",
    },
  });

  const handleFormSubmit = async (data: ExperienceSchema) => {
    console.log("Submitting experience data:", data);
    try {
      await onSubmit({
        ...data,
        startDate: data.startDate,
        endDate: data.endDate,
        assetId: data.assetId || "",
      });

      setShowSuccess(true);

      // Reset form only if adding new (not editing)
      if (!initialData?.id) {
        form.reset();
      }

      // Hide success message and close modal after delay
      setTimeout(() => {
        setShowSuccess(false);
        setIsModalOpen?.(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Don't reset form or close modal on error
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  const watchedRole = useWatch({ control: form.control, name: "role" });
  const watchedCompany = useWatch({ control: form.control, name: "company" });
  const watchedStartDate = useWatch({
    control: form.control,
    name: "startDate",
  });
  const watchedEndDate = useWatch({ control: form.control, name: "endDate" });
  const watchedImageUrl = useWatch({ control: form.control, name: "imageUrl" });

  const formatDateRange = () => {
    if (!watchedStartDate) return "Date Range";
    const start = formatDate(watchedStartDate);
    const end =
      watchedEndDate === undefined ? "Present" : formatDate(watchedEndDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="relative">
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-full">
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
                      Experience added successfully!
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
                  className="bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 min-w-35"
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
                      <Briefcase className="w-4 h-4 mr-2" />
                      {initialData?.role
                        ? "Update Experience"
                        : "Add Experience"}
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
                {initialData?.role ? "Edit Experience" : "Add Work Experience"}
              </h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <p className="text-zinc-400 text-sm">
              Document your professional journey and accomplishments
            </p>
          </div>

          {/* Form Section: Company, roles, date, image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Role */}
              <FieldGroup>
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="role"
                        className="text-sm font-medium text-white flex items-center gap-2"
                      >
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        Job Title / Role
                      </FieldLabel>
                      <Input
                        {...field}
                        id="role"
                        aria-invalid={fieldState.invalid}
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/70 transition-all duration-200"
                        placeholder="Software Engineer, Product Manager, etc."
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Company */}
              <FieldGroup>
                <Controller
                  name="company"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="company"
                        className="text-sm font-medium text-white flex items-center gap-2"
                      >
                        <Building className="w-4 h-4 text-green-400" />
                        Company / Organization
                      </FieldLabel>
                      <Input
                        {...field}
                        id="company"
                        aria-invalid={fieldState.invalid}
                        className="border-zinc-700 bg-zinc-800/50 text-white focus:border-green-500/70 focus:ring-1 focus:ring-green-500/70 transition-all duration-200"
                        placeholder="Google, Microsoft, Startup Inc., etc."
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
                          onChange={(date) =>
                            field.onChange(date ? format(date, "MMM yyyy") : "")
                          }
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
                          onChange={(date) =>
                            field.onChange(date ? format(date, "MMM yyyy") : "")
                          }
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
              {/* Organization Logo */}
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
                        <ImageIcon className="w-4 h-4 text-cyan-400" />
                        Company Logo
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
                        alt="Company logo"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <h4 className="text-white font-medium">
                        {watchedRole || "Job Title"}
                      </h4>
                      <p className="text-zinc-400 text-sm">
                        {watchedCompany || "Company Name"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-zinc-700 text-white"
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDateRange()}
                    </Badge>
                    {watchedEndDate === undefined && (
                      <Badge
                        variant="secondary"
                        className="bg-green-600 text-white"
                      >
                        Current Position
                      </Badge>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Other Form Section: Achievements */}
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
}
export default ExperienceForm;
