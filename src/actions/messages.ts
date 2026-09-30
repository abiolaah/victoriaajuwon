// lib/actions/messages.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { MessageStatus } from "@prisma/client";

export async function setMessageStatus(id: string, status: MessageStatus) {
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
