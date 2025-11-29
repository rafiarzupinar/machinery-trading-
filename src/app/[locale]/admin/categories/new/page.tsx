import CategoryForm from "@/components/admin/CategoryForm";
import { createCategory } from "@/actions/categories";
import { redirect } from "next/navigation";

export default async function NewCategoryPage({
      params
}: {
      params: Promise<{ locale: string }>
}) {
      const { locale } = await params;

      async function handleSubmit(data: any) {
            "use server";
            await createCategory(data);
            redirect(`/${locale}/admin/categories`);
      }

      return (
            <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
                  <CategoryForm onSubmit={handleSubmit} />
            </div>
      );
}
