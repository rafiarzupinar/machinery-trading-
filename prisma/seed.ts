import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const machines = [
      {
            id: "1",
            name: "Caterpillar 320D Excavator",
            category: "excavators",
            brand: "Caterpillar",
            model: "320D",
            year: 2018,
            price: 85000,
            hours: 4500,
            weight: 21500,
            power: 103,
            location: "Istanbul, Turkey",
            image: "/images/excavator.png",
            description: "Excellent condition Caterpillar 320D excavator. Regular maintenance history available. Ready for immediate work.",
            features: ["Air Conditioning", "Auxiliary Hydraulics", "Rear Camera", "New Tracks"],
      },
      {
            id: "2",
            name: "Komatsu WA380 Wheel Loader",
            category: "loaders",
            brand: "Komatsu",
            model: "WA380-6",
            year: 2019,
            price: 92000,
            hours: 3200,
            weight: 18500,
            power: 142,
            location: "Ankara, Turkey",
            image: "/images/loader.png",
            description: "Powerful wheel loader with high bucket capacity. Low hours and very clean cabin.",
            features: ["Ride Control", "Auto-Lube System", "Heated Seat", "Quick Coupler"],
      },
      {
            id: "3",
            name: "Komatsu D155A Bulldozer",
            category: "bulldozers",
            brand: "Komatsu",
            model: "D155A-5",
            year: 2015,
            price: 110000,
            hours: 6800,
            weight: 41000,
            power: 239,
            location: "Izmir, Turkey",
            image: "/images/bulldozer.png",
            description: "Heavy duty bulldozer for major earthmoving projects. Undercarriage at 80%.",
            features: ["Ripper", "Blade Tilt", "ROPS Cabin", "Air Conditioning"],
      },
      {
            id: "4",
            name: "Hitachi ZX210LC-5B",
            category: "excavators",
            brand: "Hitachi",
            model: "ZX210LC-5B",
            year: 2020,
            price: 95000,
            hours: 2100,
            weight: 22000,
            power: 122,
            location: "Bursa, Turkey",
            image: "/images/excavator.png",
            description: "Late model excavator with very low hours. Fuel efficient and precise hydraulic control.",
            features: ["GPS Ready", "Hammer Lines", "Safety Valves", "Rear & Side Cameras"],
      },
      {
            id: "5",
            name: "Caterpillar 966H Wheel Loader",
            category: "loaders",
            brand: "Caterpillar",
            model: "966H",
            year: 2014,
            price: 78000,
            hours: 8500,
            weight: 24000,
            power: 195,
            location: "Antalya, Turkey",
            image: "/images/loader.png",
            description: "Reliable workhorse. Engine and transmission rebuilt 1000 hours ago.",
            features: ["Load Weighing System", "High Lift", "3rd Valve", "Radial Tires"],
      },
];

const categories = [
      { slug: "excavators", nameEn: "Excavators", nameTr: "Ekskavatörler" },
      { slug: "loaders", nameEn: "Wheel Loaders", nameTr: "Lastikli Yükleyiciler" },
      { slug: "bulldozers", nameEn: "Bulldozers", nameTr: "Buldozerler" },
      { slug: "rollers", nameEn: "Rollers", nameTr: "Silindirler" },
      { slug: "cranes", nameEn: "Cranes", nameTr: "Vinçler" },
      { slug: "dumpTrucks", nameEn: "Dump Trucks", nameTr: "Kamyonlar" },
      { slug: "backhoes", nameEn: "Backhoe Loaders", nameTr: "Kazıcı Yükleyiciler" },
];

async function main() {
      console.log('Start seeding ...');

      // Create Admin User
      const password = await hash('admin123', 12);
      const user = await prisma.user.upsert({
            where: { email: 'admin@azzamachinery.com' },
            update: {},
            create: {
                  email: 'admin@azzamachinery.com',
                  name: 'Admin',
                  password,
            },
      });
      console.log(`Created user with id: ${user.id}`);

      // Create Categories
      for (const cat of categories) {
            await prisma.category.upsert({
                  where: { slug: cat.slug },
                  update: {},
                  create: {
                        slug: cat.slug,
                        nameEn: cat.nameEn,
                        nameTr: cat.nameTr,
                  },
            });
      }
      console.log('Categories seeded.');

      // Create Machines
      for (const machine of machines) {
            await prisma.machine.upsert({
                  where: { id: machine.id },
                  update: {},
                  create: {
                        id: machine.id,
                        name: machine.name,
                        category: machine.category,
                        brand: machine.brand,
                        model: machine.model,
                        year: machine.year,
                        price: machine.price,
                        hours: machine.hours,
                        weight: machine.weight,
                        power: machine.power,
                        location: machine.location,
                        image: machine.image,
                        description: machine.description,
                        features: JSON.stringify(machine.features),
                  },
            });
      }
      console.log('Machines seeded.');
      console.log('Seeding finished.');
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
