"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  aboutStatement,
  AboutTabKey,
  aboutTabs,
  bannerBackgroundImages,
  imageTab,
  SummaryTabList,
} from "@/lib/constants";
import { BannerGifUploader } from "@/components/admin/image-uploader";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import {
  imageFormSchema,
  ImageFormSchema,
  summarySchema,
  SummarySchema,
} from "@/types/summarySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, KeyRound, Pencil, StickyNote, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export const SummaryView = () => {
  const [activeTab, setActiveTab] = useState<SummaryTabList>("all");
  const [isEditing, setIsEditing] = useState(false);

  const summaryForm = useForm<SummarySchema>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      type: "All",
      summaryText: "",
    },
  });
  const imageForm = useForm<ImageFormSchema>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      image: "",
      assetId: "",
    },
  });

  const aboutSummary = (type: AboutTabKey): string => {
    let statement = "";
    if (type === "all") {
      statement = aboutStatement.find((s) => s.all)?.all || "";
    }
    if (type === "general") {
      statement = aboutStatement.find((s) => s.general)?.general || "";
    }
    if (type === "developer") {
      statement = aboutStatement.find((s) => s.developer)?.developer || "";
    }
    if (type === "product") {
      statement = aboutStatement.find((s) => s.product)?.product || "";
    }
    if (type === "tester") {
      statement = aboutStatement.find((s) => s.tester)?.tester || "";
    }
    return statement;
  };

  // Submit handlers can be added here
  const handleSummarySubmit = (data: SummarySchema) => {
    console.log({ data });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    summaryForm.reset();
    setIsEditing(false);
  };

  const handleImageSubmit = (data: ImageFormSchema) => {
    console.log({ data });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as SummaryTabList);
    setIsEditing(false);
    // Reset forms when tab changes
    summaryForm.reset();
  };
  return (
    <div className="w-full px-10">
      <div className="flex flex-row justify-between items-center px-10 mt-3">
        <h1 className="text-5xl text-white uppercase font-bold mt-4 mb-8 text-center">
          Summary & Role Management
        </h1>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mx-auto"
      >
        {/* Tabs header */}
        <TabsList className="w-full flex flex-wrap items-center justify-start md:justify-center gap-2">
          {aboutTabs.map((about) => (
            <TabsTrigger
              key={about.key}
              value={about.key}
              className={`${activeTab === about.key && "border border-amber-800 bg-lime-400"}`}
            >
              {about.label}
            </TabsTrigger>
          ))}
          <TabsTrigger
            value={imageTab.key}
            className={`${activeTab === imageTab.key && "border border-amber-800 bg-lime-400"}`}
          >
            {imageTab.label}
          </TabsTrigger>
        </TabsList>

        {/* About Tab Content */}
        {aboutTabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            <form
              onSubmit={summaryForm.handleSubmit(handleSummarySubmit)}
              className="w-full"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{tab.label} Summary</CardTitle>
                  <CardDescription>
                    {isEditing
                      ? "Make changes to the summary. Click save when you're done."
                      : "View the current summary. Click edit to make changes."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* Type */}
                  <FieldGroup>
                    <Controller
                      name="type"
                      control={summaryForm.control}
                      render={({ fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="type"
                            className="text-sm font-medium text-white flex items-center gap-2"
                          >
                            <KeyRound className="w-4 h-4 text-blue-400" />
                            Type
                          </FieldLabel>
                          <Select defaultValue={activeTab}>
                            <SelectTrigger id="type" disabled>
                              <SelectValue placeholder="TYPE" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800">
                              {aboutTabs.map((about) => (
                                <SelectItem key={about.key} value={about.key}>
                                  {about.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Summary */}
                  <FieldGroup>
                    <Controller
                      name="summaryText"
                      control={summaryForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="summary"
                            className="text-sm font-medium text-white flex items-center gap-2"
                          >
                            <StickyNote className="w-4 h-4 text-blue-400" />
                            Summary
                          </FieldLabel>
                          {!isEditing ? (
                            <>
                              <div className="border border-zinc-700 bg-zinc-800/50 rounded-md p-3 text-white min-h-25 whitespace-pre-wrap">
                                {aboutSummary(tab.key) ||
                                  "No summary available"}
                              </div>
                              <Button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </Button>
                            </>
                          ) : (
                            <Textarea
                              {...field}
                              id="summary"
                              defaultValue={aboutSummary(tab.key)}
                              aria-invalid={fieldState.invalid}
                              className="border-zinc-700 bg-zinc-800/50 text-white focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/70 transition-all duration-200"
                              placeholder="Dedicated professional ......"
                              autoComplete="off"
                            />
                          )}
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {isEditing && (
                    <>
                      <Button
                        type="button"
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="rounded-md border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white px-4 py-2 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                      >
                        Save changes
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        ))}
        <TabsContent value="image">
          <form
            onSubmit={imageForm.handleSubmit(handleImageSubmit)}
            className="w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle>Image Slider Upload</CardTitle>
                <CardDescription>
                  Upload Image for the banner slider
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* List previously uploaded images */}
                <div className="flex gap-2">
                  {bannerBackgroundImages.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`banner image - ${index}`}
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
                <FieldGroup>
                  <Controller
                    name="image"
                    control={imageForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="company"
                          className="text-sm font-medium text-white flex items-center gap-2"
                        >
                          <ImageIcon className="w-4 h-4 text-cyan-400" />
                          Banner Image
                        </FieldLabel>
                        <BannerGifUploader
                          value={field.value || ""}
                          onChange={(url, assetId) => {
                            field.onChange(url);
                            imageForm.setValue("assetId", assetId);
                          }}
                          onRemove={() => {
                            field.onChange("");
                            imageForm.setValue("assetId", "");
                          }}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                  Apply
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};
