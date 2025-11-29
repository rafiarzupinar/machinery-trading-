export interface Machine {
      id: string;
      name: string;
      category: "excavators" | "loaders" | "bulldozers" | "cranes" | "backhoes";
      brand: string;
      model: string;
      year: number;
      price: number;
      hours: number;
      weight?: number; // in kg
      power?: number; // in kW
      location: string;
      image: string;
      description: string;
      features: string[];
}

export const machines: Machine[] = [
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
            image: "/images/excavator.png", // Reusing excavator image
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
            image: "/images/loader.png", // Reusing loader image
            description: "Reliable workhorse. Engine and transmission rebuilt 1000 hours ago.",
            features: ["Load Weighing System", "High Lift", "3rd Valve", "Radial Tires"],
      },
];
