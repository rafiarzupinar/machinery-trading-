import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
      const baseUrl = 'https://azzamachinery.com'; // Replace with actual domain

      // Static pages
      const routes = [
            '',
            '/machines',
            '/about',
            '/contact',
      ].map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
      }));

      // Dynamic machine pages
      const machines = await prisma.machine.findMany();
      const machineRoutes = machines.map((machine) => ({
            url: `${baseUrl}/machines/${machine.id}`,
            lastModified: machine.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
      }));

      return [...routes, ...machineRoutes];
}
