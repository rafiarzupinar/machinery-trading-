import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Plus, Pencil } from 'lucide-react';
import DeleteMachineButton from '@/components/admin/DeleteMachineButton';
import { Machine } from '@prisma/client';

export default async function AdminMachinesPage({
      params,
}: {
      params: Promise<{ locale: string }>;
}) {
      const { locale } = await params;
      const machines = await prisma.machine.findMany({
            orderBy: { createdAt: 'desc' },
      });

      return (
            <div>
                  <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Machines</h1>
                        <Link
                              href={`/${locale}/admin/machines/new`}
                              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                              <Plus size={20} />
                              <span>Add Machine</span>
                        </Link>
                  </div>

                  <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                    {machines.map((machine: Machine) => (
                                          <tr key={machine.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                      <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 relative">
                                                                  <Image
                                                                        src={machine.image}
                                                                        alt=""
                                                                        fill
                                                                        className="rounded-full object-cover"
                                                                  />
                                                            </div>
                                                            <div className="ml-4">
                                                                  <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                                                                  <div className="text-sm text-gray-500">{machine.brand} {machine.model}</div>
                                                            </div>
                                                      </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                                            {machine.category}
                                                      </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      ${machine.price.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      {machine.year}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <div className="flex justify-end gap-3">
                                                            <Link
                                                                  href={`/${locale}/admin/machines/${machine.id}/edit`}
                                                                  className="text-indigo-600 hover:text-indigo-900"
                                                                  title="Edit"
                                                            >
                                                                  <Pencil size={18} />
                                                            </Link>
                                                            <DeleteMachineButton id={machine.id} />
                                                      </div>
                                                </td>
                                          </tr>
                                    ))}
                                    {machines.length === 0 && (
                                          <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                      No machines found. Click "Add Machine" to create one.
                                                </td>
                                          </tr>
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}
