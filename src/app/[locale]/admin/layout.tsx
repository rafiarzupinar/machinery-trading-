import AdminSidebar from '@/components/admin/AdminSidebar';
import { auth } from '@/auth';

export default async function AdminLayout({
      children,
      params,
}: {
      children: React.ReactNode;
      params: Promise<{ locale: string }>;
}) {
      const { locale } = await params;
      const session = await auth();

      return (
            <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
                  <AdminSidebar locale={locale} userName={session?.user?.name} />

                  {/* Main Content */}
                  <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
                        {children}
                  </main>
            </div>
      );
}
