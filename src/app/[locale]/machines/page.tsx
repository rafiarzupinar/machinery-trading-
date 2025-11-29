import { prisma } from "@/lib/prisma";
import MachineCard from "@/components/MachineCard";
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getCategories } from "@/actions/categories";

export const dynamic = 'force-dynamic';

export default async function MachinesPage({
      params,
      searchParams,
}: {
      params: Promise<{ locale: string }>;
      searchParams: Promise<{ category?: string }>;
}) {
      const { locale } = await params;
      const { category } = await searchParams;
      const t = await getTranslations('Machines');

      // Fetch categories from DB
      const dbCategories = await getCategories();

      // If category is selected, find the slug
      const selectedCategory = category && category !== 'all' ? category : undefined;

      const where = selectedCategory ? { category: selectedCategory } : {};

      const machines = await prisma.machine.findMany({
            where,
            orderBy: { createdAt: 'desc' },
      });

      const allMachines = await prisma.machine.findMany();

      // Map DB categories to the format needed for sidebar
      // We also need to count machines per category. 
      // Note: machine.category is currently storing the slug.
      const categoriesList = [
            { id: "all", name: t('items.all'), count: allMachines.length, slug: 'all' },
            ...dbCategories.map(cat => ({
                  id: cat.id,
                  name: locale === 'tr' ? cat.nameTr : cat.nameEn,
                  count: allMachines.filter(m => m.category === cat.slug).length,
                  slug: cat.slug
            }))
      ];

      return (
            <div className="bg-gray-50 min-h-screen">
                  <div className="container mx-auto px-4 py-12">
                        <div className="flex flex-col md:flex-row gap-8">
                              {/* Sidebar Filters */}
                              <aside className="w-full md:w-72 flex-shrink-0">
                                    <div className="bg-white p-6 shadow-md border-t-4 border-primary sticky top-24">
                                          <h2 className="font-oswald font-bold text-xl mb-6 uppercase tracking-wide border-b border-gray-100 pb-2">{t('categories')}</h2>
                                          <ul className="space-y-1">
                                                {categoriesList.map((cat) => (
                                                      <li key={cat.id}>
                                                            <Link
                                                                  href={cat.slug === "all" ? `/${locale}/machines` : `/${locale}/machines?category=${cat.slug}`}
                                                                  className={`flex justify-between items-center px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-l-2 ${(cat.slug === "all" && !category) || category === cat.slug
                                                                        ? "bg-gray-50 border-primary text-primary"
                                                                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-black hover:border-gray-300"
                                                                        }`}
                                                            >
                                                                  <span>{cat.name}</span>
                                                                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${(cat.slug === "all" && !category) || category === cat.slug
                                                                        ? "bg-primary text-white"
                                                                        : "bg-gray-100 text-gray-500"
                                                                        }`}>
                                                                        {cat.count}
                                                                  </span>
                                                            </Link>
                                                      </li>
                                                ))}
                                          </ul>
                                    </div>
                              </aside>

                              {/* Main Content */}
                              <div className="flex-grow">
                                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 shadow-sm border-l-4 border-black">
                                          <div>
                                                <h1 className="text-3xl font-oswald font-bold text-black uppercase tracking-wide">
                                                      {category
                                                            ? categoriesList.find(c => c.slug === category)?.name
                                                            : t('allMachines')}
                                                </h1>
                                                <p className="text-gray-500 mt-1 font-roboto">
                                                      {t('showingResults', { count: machines.length })}
                                                </p>
                                          </div>
                                    </div>

                                    {machines.length > 0 ? (
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {machines.map((machine) => (
                                                      <MachineCard key={machine.id} machine={machine} />
                                                ))}
                                          </div>
                                    ) : (
                                          <div className="text-center py-24 bg-white shadow-sm border border-gray-100">
                                                <div className="text-6xl mb-4">🔍</div>
                                                <p className="text-gray-500 text-xl font-oswald mb-4">{t('noResults')}</p>
                                                <Link href={`/${locale}/machines`} className="inline-block bg-primary text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-black transition-colors">
                                                      {t('viewAll')}
                                                </Link>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      );
}
