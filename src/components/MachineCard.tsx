"use client";

import { Link } from '@/i18n/routing';
import Image from "next/image";
import { useTranslations } from 'next-intl';
interface MachineCardProps {
      machine: {
            id: string;
            name: string;
            image: string;
            weight?: number | null;
            power?: number | null;
            year: number;
            hours: number;
      };
}

export default function MachineCard({ machine }: MachineCardProps) {
      const t = useTranslations('MachineCard');

      return (
            <div className="bg-white shadow-lg group hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                  {/* Header: Title & Actions */}
                  <div className="p-6 flex justify-between items-start">
                        <h3 className="text-xl font-bold font-oswald uppercase text-black line-clamp-2 h-14">{machine.name}</h3>
                        <div className="flex gap-2 flex-shrink-0">
                              <button className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                          <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                              </button>
                              <button className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M7 10h10"></path>
                                          <path d="M7 14h10"></path>
                                          <path d="M12 4l-5 5 5 5"></path>
                                          <path d="M12 20l5-5-5-5"></path>
                                    </svg>
                              </button>
                              <button className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <line x1="12" y1="5" x2="12" y2="19"></line>
                                          <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                              </button>
                        </div>
                  </div>

                  {/* Image Section with Ribbon */}
                  <div className="relative h-56 w-full bg-gray-50">
                        <Image
                              src={machine.image}
                              alt={machine.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Diagonal Ribbon */}
                        <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none">
                              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-8 py-1 transform rotate-45 translate-x-[30%] translate-y-[40%] shadow-md uppercase tracking-wider w-full text-center">
                                    {t('forSale')}
                              </div>
                        </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="p-6 grid grid-cols-2 gap-y-6 border-b border-gray-100">
                        <div>
                              <div className="text-black font-bold text-lg">{machine.weight ? `${(machine.weight / 1000).toFixed(1)} t` : 'N/A'}</div>
                              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{t('weight')}</div>
                        </div>
                        <div>
                              <div className="text-black font-bold text-lg">{machine.power ? `${machine.power} kW` : 'N/A'}</div>
                              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{t('power')}</div>
                        </div>
                        <div>
                              <div className="text-black font-bold text-lg">{machine.year}</div>
                              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{t('year')}</div>
                        </div>
                        <div>
                              <div className="text-black font-bold text-lg">{machine.hours}</div>
                              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{t('hours')}</div>
                        </div>
                  </div>

                  {/* Footer: Button Only */}
                  <div className="p-6 mt-auto bg-white">
                        <Link
                              href={`/machines/${machine.id}`}
                              className="block w-full bg-primary text-white text-sm font-bold py-3 text-center uppercase tracking-widest hover:bg-black transition-colors"
                        >
                              {t('viewMore')}
                        </Link>
                  </div>
            </div>
      );
}
