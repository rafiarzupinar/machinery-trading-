import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
      datasources: {
            db: {
                  url: 'file:./dev.db',
            },
      },
});

async function main() {
      const user = await prisma.user.findUnique({
            where: {
                  email: 'admin@azza.com',
            },
      });

      if (user) {
            console.log('User found:', user);
            console.log('Password hash:', user.password);
      } else {
            console.log('User NOT found');
      }

      await prisma.$disconnect();
}

main()
      .catch((e) => {
            console.error(e);
            process.exit(1);
      });
