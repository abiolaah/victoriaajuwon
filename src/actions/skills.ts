// lib/actions/skills.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublishStatus } from "@prisma/client";

function fieldsFrom(formData: FormData) {
  return {
    name: String(formData.get("name")).trim(),
    category: String(formData.get("category")).trim(),
    description: (formData.get("description") as string) || null,
    proficiency: formData.get("proficiency")
      ? Number(formData.get("proficiency"))
      : null,
    icon: (formData.get("icon") as string) || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: (formData.get("status") as PublishStatus) ?? "PUBLISHED",
  };
}

export async function createSkill(formData: FormData) {
  await prisma.skill.create({ data: fieldsFrom(formData) });
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({ where: { id }, data: fieldsFrom(formData) });
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
}
