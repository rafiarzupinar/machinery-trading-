import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import MachineForm from '@/components/admin/MachineForm';
import { updateMachine } from '@/actions/machines';
import { getCategories } from "@/actions/categories";

export default async function EditMachinePage({
      params,
}: {
      params: Promise<{ id: string; locale: string }>;
}) {
      const { id, locale } = await params;

      const machine = await prisma.machine.findUnique({
            where: { id },
      });

      if (!machine) {
            notFound();
      }

      const categories = await getCategories();

      // Parse features JSON string back to string (comma separated) for the form
      let featuresString = '';
      try {
            const featuresArray = JSON.parse(machine.features);
            if (Array.isArray(featuresArray)) {
                  featuresString = featuresArray.join(', ');
            }
      } catch (e) {
            featuresString = machine.features;
      }

      const initialData = {
            ...machine,
            features: featuresString,
            // Ensure optional fields are handled
            weight: machine.weight ?? undefined,
            power: machine.power ?? undefined,
      };

      async function handleSubmit(data: any) {
            "use server";
            await updateMachine(id, data);
            redirect(`/${locale}/admin/machines`);
      }

      return (
            <div className="max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Machine</h1>
                  <MachineForm
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        isEditing
                        categories={categories}
                  />
            </div>
      );
}
