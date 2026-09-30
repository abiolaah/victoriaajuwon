// lib/actions/scene-objects.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type {
  InteractionType,
  PublishStatus,
  SceneObjectType,
} from "@prisma/client";

function fieldsFrom(formData: FormData) {
  return {
    name: String(formData.get("name")).trim(),
    slug: String(formData.get("slug")).trim(),
    type: (formData.get("type") as SceneObjectType) ?? "HOLOGRAM",
    interactionType:
      (formData.get("interactionType") as InteractionType) ?? "PANEL",
    description: (formData.get("description") as string) || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: (formData.get("status") as PublishStatus) ?? "PUBLISHED",
  };
}

export async function createSceneObject(planetId: string, formData: FormData) {
  await prisma.sceneObject.create({
    data: { ...fieldsFrom(formData), planetId },
  });
  revalidatePath(`/admin/planets/${planetId}`);
}

export async function updateSceneObject(
  planetId: string,
  id: string,
  formData: FormData,
) {
  await prisma.sceneObject.update({
    where: { id },
    data: fieldsFrom(formData),
  });
  revalidatePath(`/admin/planets/${planetId}`);
}

export async function deleteSceneObject(planetId: string, id: string) {
  await prisma.sceneObject.delete({ where: { id } });
  revalidatePath(`/admin/planets/${planetId}`);
}
