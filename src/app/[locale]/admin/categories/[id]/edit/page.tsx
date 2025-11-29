import CategoryForm from "@/components/admin/CategoryForm";
import { getCategory, updateCategory } from "@/actions/categories";
import { notFound, redirect } from "next/navigation";

export default async function EditCategoryPage({
      params
}: {
      params: Promise<{ id: string; locale: string }>
}) {
      const { id, locale } = await params;
      const category = await getCategory(id);

      if (!category) {
            notFound();
      }

      async function handleSubmit(data: any) {
            "use server";
            await updateCategory(id, data);
            redirect(`/${locale}/admin/categories`);
      }

      return (
            <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
                  <CategoryForm initialData={category} onSubmit={handleSubmit} isEditing />
            </div>
      );
}
