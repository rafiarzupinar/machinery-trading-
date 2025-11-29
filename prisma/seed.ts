import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
      const password = await hash('admin123', 12);
      const user = await prisma.user.upsert({
            where: { email: 'admin@azza.com' },
            update: {},
            create: {
                  email: 'admin@azza.com',
                  name: 'Admin',
                  password,
            },
      });
      console.log({ user });

      const categories = [
            { slug: 'excavators', nameEn: 'Excavators', nameTr: 'Ekskavatörler' },
            { slug: 'loaders', nameEn: 'Wheel Loaders', nameTr: 'Lastikli Yükleyiciler' },
            { slug: 'bulldozers', nameEn: 'Bulldozers', nameTr: 'Buldozerler' },
            { slug: 'rollers', nameEn: 'Soil Compactors', nameTr: 'Toprak Silindirleri' },
            { slug: 'cranes', nameEn: 'Cranes', nameTr: 'Vinçler' },
            { slug: 'backhoes', nameEn: 'Backhoe Loaders', nameTr: 'Kazıcı Yükleyiciler' },
            { slug: 'dump-trucks', nameEn: 'Dump Trucks', nameTr: 'Damperli Kamyonlar' },
      ];

      for (const cat of categories) {
            await prisma.category.upsert({
                  where: { slug: cat.slug },
                  update: {},
                  create: cat,
            });
      }
      console.log('Categories seeded');
}

main()
      .then(async () => {
            await prisma.$disconnect();
      })
      .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
      });
