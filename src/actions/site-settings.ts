// lib/actions/site-settings.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function upsertSiteSetting(formData: FormData) {
  const key = String(formData.get("key")).trim();
  const rawValue = String(formData.get("value") ?? "");
  const description = (formData.get("description") as string) || null;

  // Value is stored as Json — accept plain text and wrap it, or real JSON if given.
  let value: unknown;
  try {
    value = JSON.parse(rawValue);
  } catch {
    value = rawValue;
  }

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: value as never, description },
    create: { key, value: value as never, description },
  });

  revalidatePath("/admin/settings");
}

export async function deleteSiteSetting(id: string) {
  await prisma.siteSetting.delete({ where: { id } });
  revalidatePath("/admin/settings");
}
