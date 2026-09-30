// lib/actions/planets.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PublishStatus } from "@prisma/client";
import { getOrCreateMediaAssetId } from "./media";

function planetFieldsFrom(formData: FormData) {
  return {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    subtitle: (formData.get("subtitle") as string) || null,
    tagline: (formData.get("tagline") as string) || null,
    description: (formData.get("description") as string) || null,
    theme: (formData.get("theme") as string) || null,
    order: Number(formData.get("order") ?? 0),
    navSize: formData.get("navSize")
      ? Number(formData.get("navSize"))
      : undefined,
    navOffset: formData.get("navOffset")
      ? Number(formData.get("navOffset"))
      : undefined,
    status: (formData.get("status") as PublishStatus) ?? "DRAFT",
  };
}

export async function createPlanet(formData: FormData) {
  const fields = planetFieldsFrom(formData);
  const backgroundMediaId = await getOrCreateMediaAssetId(
    formData.get("backgroundUrl") as string,
    "IMAGE",
  );
  const navIconMediaId = await getOrCreateMediaAssetId(
    formData.get("navIconUrl") as string,
    "IMAGE",
  );

  await prisma.planet.create({
    data: { ...fields, backgroundMediaId, navIconMediaId },
  });

  revalidatePath("/admin/planets");
  redirect("/admin/planets");
}

export async function updatePlanet(id: string, formData: FormData) {
  const fields = planetFieldsFrom(formData);
  const backgroundMediaId = await getOrCreateMediaAssetId(
    formData.get("backgroundUrl") as string,
    "IMAGE",
  );
  const navIconMediaId = await getOrCreateMediaAssetId(
    formData.get("navIconUrl") as string,
    "IMAGE",
  );

  await prisma.planet.update({
    where: { id },
    data: { ...fields, backgroundMediaId, navIconMediaId },
  });

  revalidatePath("/admin/planets");
  revalidatePath(`/admin/planets/${id}`);
  redirect("/admin/planets");
}

export async function deletePlanet(id: string) {
  await prisma.planet.delete({ where: { id } });
  revalidatePath("/admin/planets");
}
