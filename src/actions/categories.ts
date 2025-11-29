"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

async function checkAuth() {
      const session = await auth();
      if (!session) {
            throw new Error("Unauthorized");
      }
      return session;
}

export async function getCategories() {
      return await prisma.category.findMany({
            orderBy: { nameEn: 'asc' }
      });
}

export async function getCategory(id: string) {
      return await prisma.category.findUnique({
            where: { id }
      });
}

export async function createCategory(data: { slug: string; nameEn: string; nameTr: string }) {
      await checkAuth();

      await prisma.category.create({
            data
      });

      revalidatePath("/[locale]/admin/categories", "page");
      revalidatePath("/[locale]/machines", "page");
}

export async function updateCategory(id: string, data: { slug: string; nameEn: string; nameTr: string }) {
      await checkAuth();

      await prisma.category.update({
            where: { id },
            data
      });

      revalidatePath("/[locale]/admin/categories", "page");
      revalidatePath("/[locale]/machines", "page");
}

export async function deleteCategory(id: string) {
      await checkAuth();

      await prisma.category.delete({
            where: { id }
      });

      revalidatePath("/[locale]/admin/categories", "page");
      revalidatePath("/[locale]/machines", "page");
}
