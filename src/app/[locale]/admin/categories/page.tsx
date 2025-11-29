import Link from "next/link";
import { getCategories } from "@/actions/categories";
import { getTranslations } from 'next-intl/server';
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage({
      params
}: {
      params: Promise<{ locale: string }>
}) {
      const { locale } = await params;
      const categories = await getCategories();
      const t = await getTranslations('Admin');

      return (
            <div className="space-y-6">
                  <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                        <Link
                              href={`/${locale}/admin/categories/new`}
                              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                              + Add Category
                        </Link>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name (EN)</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name (TR)</th>
                                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.map((category) => (
                                          <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.slug}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.nameEn}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.nameTr}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <Link
                                                            href={`/${locale}/admin/categories/${category.id}/edit`}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                      >
                                                            Edit
                                                      </Link>
                                                      <DeleteCategoryButton id={category.id} />
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
