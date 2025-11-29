"use client";

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

const machineSchema = z.object({
      name: z.string().min(1, "Name is required"),
      category: z.string().min(1, "Category is required"),
      brand: z.string().min(1, "Brand is required"),
      model: z.string().min(1, "Model is required"),
      year: z.coerce.number().min(1900, "Invalid year"),
      price: z.coerce.number().min(0, "Price must be positive"),
      hours: z.coerce.number().min(0, "Hours must be positive"),
      weight: z.coerce.number().optional(),
      power: z.coerce.number().optional(),
      location: z.string().min(1, "Location is required"),
      image: z.string().min(1, "Image URL is required"),
      description: z.string().min(1, "Description is required"),
      features: z.string(), // We'll handle features as a comma-separated string for simplicity
});

type MachineFormData = z.infer<typeof machineSchema>;

interface Category {
      id: string;
      slug: string;
      nameEn: string;
      nameTr: string;
}

interface MachineFormProps {
      initialData?: MachineFormData & { id?: string };
      onSubmit: (data: MachineFormData) => Promise<void>;
      isEditing?: boolean;
      categories: Category[];
}

export default function MachineForm({ initialData, onSubmit, isEditing = false, categories }: MachineFormProps) {
      const router = useRouter();
      const [loading, setLoading] = useState(false);
      const [uploading, setUploading] = useState(false);
      const [error, setError] = useState('');
      const [featureInput, setFeatureInput] = useState('');
      const [featuresList, setFeaturesList] = useState<string[]>(() => {
            if (!initialData?.features) return [];
            return initialData.features.split(',').map(f => f.trim()).filter(f => f !== '');
      });

      const handleAddFeature = () => {
            if (!featureInput.trim()) return;
            const newFeatures = [...featuresList, featureInput.trim()];
            setFeaturesList(newFeatures);
            setValue('features', newFeatures.join(', '));
            setFeatureInput('');
      };

      const handleRemoveFeature = (index: number) => {
            const newFeatures = featuresList.filter((_, i) => i !== index);
            setFeaturesList(newFeatures);
            setValue('features', newFeatures.join(', '));
      };

      const {
            register,
            handleSubmit,
            setValue,
            watch,
            formState: { errors },
      } = useForm<MachineFormData>({
            resolver: zodResolver(machineSchema),
            defaultValues: initialData || {
                  name: '',
                  category: 'excavators',
                  brand: '',
                  model: '',
                  year: new Date().getFullYear(),
                  price: 0,
                  hours: 0,
                  location: '',
                  image: '/images/placeholder.png',
                  description: '',
                  features: '',
            },
      });

      const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                  const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                  });
                  const data = await res.json();
                  if (data.success) {
                        setValue('image', data.url);
                  } else {
                        setError('Upload failed: ' + data.error);
                  }
            } catch (err) {
                  console.error('Upload failed', err);
                  setError('Image upload failed');
            } finally {
                  setUploading(false);
            }
      };

      const onFormSubmit = async (data: MachineFormData) => {
            setLoading(true);
            setError('');
            try {
                  await onSubmit(data);
                  router.refresh();
                  if (!isEditing) {
                        // Redirect or clear form
                  }
            } catch (err) {
                  setError('An error occurred. Please try again.');
                  console.error(err);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>

                              <div className="grid grid-cols-1 gap-4">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Name</label>
                                          <input {...register('name')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" placeholder="e.g. CAT 320D Excavator" />
                                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                                <input {...register('brand')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" placeholder="e.g. Caterpillar" />
                                                {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">Model</label>
                                                <input {...register('model')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" placeholder="e.g. 320D" />
                                                {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Category</label>
                                          <select {...register('category')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2 bg-white">
                                                {categories.map((cat) => (
                                                      <option key={cat.id} value={cat.slug}>
                                                            {cat.nameEn} / {cat.nameTr}
                                                      </option>
                                                ))}
                                          </select>
                                          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Location</label>
                                          <input {...register('location')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" placeholder="e.g. Istanbul, Turkey" />
                                          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                                    </div>
                              </div>
                        </div>

                        {/* Technical Specs */}
                        <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Technical Specifications</h3>

                              <div className="grid grid-cols-2 gap-4">
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Year</label>
                                          <input type="number" {...register('year')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                                          {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>}
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                                          <input type="number" {...register('price')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                                          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Hours</label>
                                          <input type="number" {...register('hours')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                                          {errors.hours && <p className="text-red-500 text-xs mt-1">{errors.hours.message}</p>}
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                          <input type="number" {...register('weight')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-700">Power (kW)</label>
                                          <input type="number" {...register('power')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Details & Media</h3>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">Image</label>
                              <div className="mt-1 flex items-center space-x-4">
                                    {watch('image') && (
                                          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                                                <Image
                                                      src={watch('image')}
                                                      alt="Preview"
                                                      fill
                                                      className="object-cover"
                                                />
                                          </div>
                                    )}
                                    <div className="flex-1">
                                          <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                          />
                                          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                                          <input type="hidden" {...register('image')} />
                                    </div>
                              </div>
                              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea {...register('description')} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2" />
                              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div>
                              <label className="block text-sm font-medium text-gray-700">Features</label>
                              <div className="mt-1 flex gap-2">
                                    <input
                                          type="text"
                                          value={featureInput}
                                          onChange={(e) => setFeatureInput(e.target.value)}
                                          onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                      e.preventDefault();
                                                      handleAddFeature();
                                                }
                                          }}
                                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-2"
                                          placeholder="Add a feature (e.g. GPS)"
                                    />
                                    <button
                                          type="button"
                                          onClick={handleAddFeature}
                                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                          Add
                                    </button>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                    {featuresList.map((feature, index) => (
                                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {feature}
                                                <button
                                                      type="button"
                                                      onClick={() => handleRemoveFeature(index)}
                                                      className="ml-2 text-blue-600 hover:text-blue-800"
                                                >
                                                      ×
                                                </button>
                                          </span>
                                    ))}
                              </div>
                              <input type="hidden" {...register('features')} />
                              {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features.message}</p>}
                        </div>
                  </div>

                  {error && <div className="text-red-500 text-sm">{error}</div>}

                  <div className="flex justify-end">
                        <button
                              type="submit"
                              disabled={loading}
                              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                              {loading ? 'Saving...' : isEditing ? 'Update Machine' : 'Create Machine'}
                        </button>
                  </div>
            </form>
      );
}
