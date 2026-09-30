// lib/actions/media.ts
"use server";

import { prisma } from "@/lib/db";
import type { MediaType } from "@prisma/client";

/**
 * The admin forms below take a plain image/video URL instead of a full
 * media-library picker. This finds or creates the matching MediaAsset row
 * so Planet/Project relations still point at a real MediaAsset id.
 * Swap this out once you build a real upload/library UI.
 */
export async function getOrCreateMediaAssetId(
  url: string | null,
  type: MediaType,
): Promise<string | null> {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  const existing = await prisma.mediaAsset.findFirst({
    where: { url: trimmed },
  });
  if (existing) return existing.id;

  const created = await prisma.mediaAsset.create({
    data: { url: trimmed, name: trimmed.split("/").pop() ?? trimmed, type },
  });
  return created.id;
}
