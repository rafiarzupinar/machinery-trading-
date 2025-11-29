"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const categorySchema = z.object({
      slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with dashes"),
      nameEn: z.string().min(1, "English Name is required"),
      nameTr: z.string().min(1, "Turkish Name is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
      initialData?: CategoryFormData & { id?: string };
      onSubmit: (data: CategoryFormData) => Promise<void>;
      isEditing?: boolean;
}

export default function CategoryForm({ initialData, onSubmit, isEditing = false }: CategoryFormProps) {
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<CategoryFormData>({
            resolver: zodResolver(categorySchema),
            defaultValues: initialData || {
                  slug: '',
                  nameEn: '',
                  nameTr: '',
            },
      });

      const onFormSubmit = async (data: CategoryFormData) => {
            setLoading(true);
            setError('');
            try {
                  await onSubmit(data);
                  router.refresh();
                  if (!isEditing) {
                        router.back();
                  }
            } catch (err) {
                  setError('An error occurred. Please try again.');
                  console.error(err);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm max-w-2xl">
                  <div className="space-y-4">
                        <div>
                              <label className="block text-sm font-medium text-gray-700">Slug (URL identifier)</label>
                              <input
                                    {...register('slug')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                    placeholder="e.g. wheel-loaders"
                              />
                              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">English Name</label>
                              <input
                                    {...register('nameEn')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                    placeholder="e.g. Wheel Loaders"
                              />
                              {errors.nameEn && <p className="text-red-500 text-xs mt-1">{errors.nameEn.message}</p>}
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">Turkish Name</label>
                              <input
                                    {...register('nameTr')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                    placeholder="e.g. Lastikli Yükleyiciler"
                              />
                              {errors.nameTr && <p className="text-red-500 text-xs mt-1">{errors.nameTr.message}</p>}
                        </div>
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <div className="flex justify-end gap-2">
                        <button
                              type="button"
                              onClick={() => router.back()}
                              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                              Cancel
                        </button>
                        <button
                              type="submit"
                              disabled={loading}
                              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                              {loading ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
                        </button>
                  </div>
            </form>
      );
}
