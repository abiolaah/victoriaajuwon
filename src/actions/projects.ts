// lib/actions/projects.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublishStatus } from "@prisma/client";
import { getOrCreateMediaAssetId } from "./media";

function fieldsFrom(formData: FormData) {
  return {
    slug: String(formData.get("slug")).trim(),
    name: String(formData.get("name")).trim(),
    shortDescription: (formData.get("shortDescription") as string) || null,
    description: (formData.get("description") as string) || null,
    problem: (formData.get("problem") as string) || null,
    solution: (formData.get("solution") as string) || null,
    role: (formData.get("role") as string) || null,
    githubUrl: (formData.get("githubUrl") as string) || null,
    liveUrl: (formData.get("liveUrl") as string) || null,
    caseStudyUrl: (formData.get("caseStudyUrl") as string) || null,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: (formData.get("status") as PublishStatus) ?? "DRAFT",
    planetId: (formData.get("planetId") as string) || null,
  };
}

/** Comma-separated tech names -> Technology rows + ProjectTechnology links. */
async function syncTechnologies(projectId: string, raw: string | null) {
  const names = (raw ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  await prisma.projectTechnology.deleteMany({ where: { projectId } });

  for (const [index, name] of names.entries()) {
    const technology = await prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.projectTechnology.create({
      data: { projectId, technologyId: technology.id, sortOrder: index },
    });
  }
}

export async function createProject(formData: FormData) {
  const coverMediaId = await getOrCreateMediaAssetId(
    formData.get("coverUrl") as string,
    "IMAGE",
  );

  const project = await prisma.project.create({
    data: { ...fieldsFrom(formData), coverMediaId },
  });
  await syncTechnologies(project.id, formData.get("technologies") as string);

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const coverMediaId = await getOrCreateMediaAssetId(
    formData.get("coverUrl") as string,
    "IMAGE",
  );

  await prisma.project.update({
    where: { id },
    data: { ...fieldsFrom(formData), coverMediaId },
  });
  await syncTechnologies(id, formData.get("technologies") as string);

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}
