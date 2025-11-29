"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Helper to check authentication
async function checkAuth() {
      const session = await auth();
      if (!session) {
            throw new Error("Unauthorized");
      }
      return session;
}

export async function createMachine(data: any) {
      await checkAuth();

      const { features, ...rest } = data;

      // Convert features string to JSON array string if needed, or just store as is
      // The schema expects a string for features, but in the frontend we might want to split it
      // For now, let's just store it as a string or split it into a JSON string array

      // Actually, the Machine model defines features as String (JSON string).
      // Let's split the comma-separated string into an array and stringify it.
      const featuresArray = features.split(',').map((f: string) => f.trim()).filter((f: string) => f !== '');
      const featuresJson = JSON.stringify(featuresArray);

      await prisma.machine.create({
            data: {
                  ...rest,
                  features: featuresJson,
            },
      });

      revalidatePath("/[locale]/admin/machines", "page");
      revalidatePath("/[locale]/machines", "page");
}

export async function updateMachine(id: string, data: any) {
      await checkAuth();

      const { features, ...rest } = data;
      const featuresArray = features.split(',').map((f: string) => f.trim()).filter((f: string) => f !== '');
      const featuresJson = JSON.stringify(featuresArray);

      await prisma.machine.update({
            where: { id },
            data: {
                  ...rest,
                  features: featuresJson,
            },
      });

      revalidatePath("/[locale]/admin/machines", "page");
      revalidatePath("/[locale]/machines", "page");
      revalidatePath(`/[locale]/machines/${id}`, "page");
}

export async function deleteMachine(id: string) {
      await checkAuth();

      await prisma.machine.delete({
            where: { id },
      });

      revalidatePath("/[locale]/admin/machines", "page");
      revalidatePath("/[locale]/machines", "page");
}
