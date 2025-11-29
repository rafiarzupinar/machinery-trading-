import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
      const { id } = await params;
      const machine = await prisma.machine.findUnique({
            where: { id },
      });

      if (!machine) {
            return {
                  title: 'Machine Not Found - Azza Machinery',
            };
      }

      return {
            title: `${machine.name} | Azza Machinery`,
            description: `For Sale: ${machine.year} ${machine.brand} ${machine.model}. ${machine.description.substring(0, 150)}...`,
            openGraph: {
                  title: `${machine.name} | Azza Machinery`,
                  description: `For Sale: ${machine.year} ${machine.brand} ${machine.model}`,
                  images: [machine.image],
            },
      };
}

export default async function MachineDetailPage({
      params,
}: {
      params: Promise<{ id: string }>;
}) {
      const { id } = await params;
      const machine = await prisma.machine.findUnique({
            where: { id },
      });

      if (!machine) {
            notFound();
      }

      let featuresList: string[] = [];
      try {
            featuresList = machine.features ? JSON.parse(machine.features) : [];
      } catch (e) {
            // Fallback for legacy data or plain strings
            featuresList = machine.features ? machine.features.split(',').map(f => f.trim()) : [];
      }

      return (
            <div className="container mx-auto px-4 py-8">
                  {/* Breadcrumb */}
                  <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link href="/machines" className="hover:text-primary">Machines</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{machine.name}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Images & Description */}
                        <div className="lg:col-span-2 space-y-8">
                              {/* Main Image */}
                              <div className="bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center relative">
                                    <Image
                                          src={machine.image}
                                          alt={machine.name}
                                          fill
                                          className="object-cover"
                                    />
                              </div>

                              {/* Description */}
                              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                          {machine.description}
                                    </p>
                              </div>

                              {/* Features */}
                              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-4">Features & Equipment</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {featuresList.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-gray-700">
                                                      <span className="text-primary">✓</span> {feature}
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        </div>

                        {/* Right Column: Key Specs & Contact */}
                        <div className="space-y-6">
                              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                    <h1 className="text-2xl font-bold mb-2">{machine.name}</h1>
                                    <div className="text-xl font-bold text-primary mb-6">
                                          Contact for Price
                                    </div>

                                    <div className="space-y-4 mb-8">
                                          <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Make</span>
                                                <span className="font-medium">{machine.brand}</span>
                                          </div>
                                          <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Model</span>
                                                <span className="font-medium">{machine.model}</span>
                                          </div>
                                          <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Year</span>
                                                <span className="font-medium">{machine.year}</span>
                                          </div>
                                          <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Hours</span>
                                                <span className="font-medium">{machine.hours} hrs</span>
                                          </div>
                                          <div className="flex justify-between border-b border-gray-100 pb-2">
                                                <span className="text-gray-500">Location</span>
                                                <span className="font-medium">{machine.location}</span>
                                          </div>
                                    </div>

                                    <div className="space-y-3">
                                          <a
                                                href={`https://wa.me/905321696098?text=I'm interested in ${machine.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                          >
                                                <span>💬</span> WhatsApp Inquiry
                                          </a>
                                          <Link href="/contact" className="w-full block text-center bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-accent transition-colors">
                                                Contact Seller
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
