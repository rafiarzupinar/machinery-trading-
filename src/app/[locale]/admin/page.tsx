import { prisma } from '@/lib/prisma';

export default async function AdminDashboard({
      params
}: {
      params: Promise<{ locale: string }>
}) {
      const { locale } = await params;
      const machineCount = await prisma.machine.count();

      return (
            <div>
                  <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                              <h3 className="text-gray-500 text-sm font-medium uppercase">Total Machines</h3>
                              <p className="text-4xl font-bold text-primary mt-2">{machineCount}</p>
                        </div>

                        {/* Add more stats here later */}
                  </div>

                  <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                        <div className="flex gap-4">
                              <a href={`/${locale}/admin/machines/new`} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                                    <span>+ Add Machine</span>
                              </a>
                              <a href={`/${locale}/admin/categories/new`} className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                    <span>+ Add Category</span>
                              </a>
                        </div>
                  </div>
            </div>
      );
}
