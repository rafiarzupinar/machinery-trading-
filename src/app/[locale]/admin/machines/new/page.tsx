import MachineForm from "@/components/admin/MachineForm";
import { createMachine } from "@/actions/machines";
import { getCategories } from "@/actions/categories";
import { redirect } from "next/navigation";

export default async function NewMachinePage({
      params
}: {
      params: Promise<{ locale: string }>
}) {
      const { locale } = await params;
      const categories = await getCategories();

      async function handleSubmit(data: any) {
            "use server";
            await createMachine(data);
            redirect(`/${locale}/admin/machines`);
      }

      return (
            <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900">Add New Machine</h1>
                  <MachineForm onSubmit={handleSubmit} categories={categories} />
            </div>
      );
}
