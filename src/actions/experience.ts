// lib/actions/experience.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ExperienceType, PublishStatus } from "@prisma/client";

function fieldsFrom(formData: FormData) {
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  return {
    type: (formData.get("type") as ExperienceType) ?? "WORK",
    organization: String(formData.get("organization")).trim(),
    title: (formData.get("title") as string) || null,
    location: (formData.get("location") as string) || null,
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    current: formData.get("current") === "on",
    description: (formData.get("description") as string) || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: (formData.get("status") as PublishStatus) ?? "PUBLISHED",
  };
}

export async function createExperience(formData: FormData) {
  await prisma.experience.create({ data: fieldsFrom(formData) });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.experience.update({ where: { id }, data: fieldsFrom(formData) });
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
}
