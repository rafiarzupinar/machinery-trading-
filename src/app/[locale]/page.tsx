"use client";

import { Link } from '@/i18n/routing';
import Image from "next/image";
import { useState, useEffect } from "react";
import MachineCard from "@/components/MachineCard";
import { machines } from "@/data/machines";
import { useTranslations } from 'next-intl';

export default function Home() {
      const t = useTranslations();
      const [currentSlide, setCurrentSlide] = useState(0);

      const slides = [
            {
                  image: "/images/excavator.png",
                  title: t('Hero.slide1.title'),
                  subtitle: t('Hero.slide1.subtitle'),
                  desc: t('Hero.slide1.desc')
            },
            {
                  image: "/images/loader.png",
                  title: t('Hero.slide2.title'),
                  subtitle: t('Hero.slide2.subtitle'),
                  desc: t('Hero.slide2.desc')
            },
            {
                  image: "/images/bulldozer.png",
                  title: t('Hero.slide3.title'),
                  subtitle: t('Hero.slide3.subtitle'),
                  desc: t('Hero.slide3.desc')
            }
      ];

      useEffect(() => {
            const timer = setInterval(() => {
                  setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
            return () => clearInterval(timer);
      }, [slides.length]);

      return (
            <div className="flex flex-col font-roboto text-[#111111]">
                  {/* S1: Hero Slider */}
                  <section className="relative h-[80vh] min-h-[600px] bg-black overflow-hidden group">
                        {slides.map((slide, index) => (
                              <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
                              >
                                    <Image
                                          src={slide.image}
                                          alt={slide.title}
                                          fill
                                          className="object-cover opacity-70"
                                          priority={index === 0}
                                    />
                                    {/* Enhanced Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                              </div>
                        ))}

                        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
                              <div className="max-w-4xl pt-16 pl-4 md:pl-12 border-l-4 border-primary/20 backdrop-blur-sm bg-black/10 p-8 rounded-r-xl">
                                    <div className="flex items-center gap-4 mb-6 animate-fade-in">
                                          <div className="w-12 h-1 bg-primary"></div>
                                          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">{t('Hero.welcome')}</span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-oswald leading-tight tracking-tight animate-slide-up drop-shadow-2xl">
                                          {slides[currentSlide].title} <br />
                                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{slides[currentSlide].subtitle}</span>
                                    </h1>

                                    <p className="text-base md:text-lg text-gray-200 mb-10 max-w-2xl leading-relaxed animate-slide-up delay-100 font-light border-l-2 border-primary pl-6">
                                          {slides[currentSlide].desc}
                                    </p>

                                    <div className="flex gap-4 animate-slide-up delay-200">
                                          <Link
                                                href="/contact"
                                                className="inline-block bg-primary text-white font-bold px-8 py-3 uppercase font-oswald tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/50"
                                          >
                                                {t('Hero.contactUs')}
                                          </Link>
                                          <Link
                                                href="/machines"
                                                className="inline-block border-2 border-white text-white font-bold px-8 py-3 uppercase font-oswald tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1"
                                          >
                                                {t('Hero.viewInventory')}
                                          </Link>
                                    </div>
                              </div>
                        </div>

                        {/* Slider Indicators */}
                        <div className="absolute bottom-12 right-12 z-20 flex gap-3">
                              {slides.map((_, index) => (
                                    <button
                                          key={index}
                                          onClick={() => setCurrentSlide(index)}
                                          className={`h-1 transition-all duration-300 ${index === currentSlide ? "bg-primary w-12" : "bg-white/30 w-6 hover:bg-white/80"}`}
                                    />
                              ))}
                        </div>
                  </section>

                  {/* S2: Categories Section */}
                  <section className="py-20 bg-[#f9f9f9]">
                        <div className="container mx-auto px-6 md:px-20 lg:px-32">
                              <div className="text-center mb-12">
                                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{t('Categories.title')}</span>
                                    <h2 className="text-3xl md:text-4xl font-black font-oswald uppercase">{t('Categories.heading')}</h2>
                                    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                          { name: t('Categories.items.excavators'), image: "/images/excavator.png", key: "excavators" },
                                          { name: t('Categories.items.wheelLoaders'), image: "/images/loader.png", key: "wheelLoaders" },
                                          { name: t('Categories.items.bulldozers'), image: "/images/bulldozer.png", key: "bulldozers" },
                                          { name: t('Categories.items.rollers'), image: "/images/roller.png", key: "rollers" },
                                          { name: t('Categories.items.dumpTrucks'), image: "/images/loader.png", key: "dumpTrucks" },
                                          { name: t('Categories.items.cranes'), image: "/images/excavator.png", key: "cranes" },
                                    ].map((cat, idx) => (
                                          <Link
                                                key={idx}
                                                href={`/machines?category=${cat.key}`}
                                                className="group relative h-60 overflow-hidden block shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                          >
                                                <Image
                                                      src={cat.image}
                                                      alt={cat.name}
                                                      fill
                                                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-primary/90 group-hover:via-primary/40 transition-colors duration-300"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end h-full">
                                                      <h3 className="text-xl font-bold text-white font-oswald uppercase drop-shadow-md group-hover:scale-110 transition-transform duration-300">{cat.name}</h3>
                                                      <div className="w-0 h-0.5 bg-white mt-2 group-hover:w-12 transition-all duration-300"></div>
                                                </div>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </section>

                  {/* S3: Promo Banner Section */}
                  <section className="relative py-32">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                              <Image
                                    src="/images/excavator.png"
                                    alt="Promo Background"
                                    fill
                                    className="object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50"></div>
                        </div>

                        <div className="container mx-auto px-4 relative z-10">
                              <div className="bg-white p-12 max-w-2xl">
                                    <h2 className="text-4xl font-black font-oswald uppercase mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.raw('Promo.title') }}>
                                    </h2>
                                    <div className="w-12 h-1 bg-primary mb-6"></div>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                          {t('Promo.desc')}
                                    </p>
                                    <Link
                                          href="/contact"
                                          className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase font-oswald tracking-widest hover:bg-[#111111] transition-colors"
                                    >
                                          {t('Promo.contact')}
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* S4: Featured Products */}
                  <section className="py-24 bg-[#f9f9f9]">
                        <div className="container mx-auto px-6 md:px-20 lg:px-32">
                              <div className="text-center mb-16">
                                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{t('Featured.title')}</span>
                                    <h2 className="text-4xl md:text-5xl font-black font-oswald uppercase">{t('Featured.heading')}</h2>
                                    <div className="w-16 h-1 bg-primary mx-auto mt-6"></div>
                                    <p className="max-w-2xl mx-auto mt-6 text-gray-500">
                                          {t('Featured.desc')}
                                    </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {machines.slice(0, 3).map((machine) => (
                                          <MachineCard key={machine.id} machine={machine} />
                                    ))}
                              </div>

                              <div className="text-center mt-16">
                                    <Link
                                          href="/machines"
                                          className="inline-block bg-primary text-white font-bold px-10 py-4 uppercase font-oswald tracking-widest hover:bg-[#111111] transition-colors"
                                    >
                                          {t('Featured.viewAll')}
                                    </Link>
                              </div>
                        </div>
                  </section>

                  {/* S5: Services Section (Reasons to Choose Us) */}
                  <section className="relative py-24 bg-[#111111] text-white">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                              <Image
                                    src="/images/excavator.png"
                                    alt="Background"
                                    fill
                                    className="object-cover opacity-20"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/80 to-[#111111]/90"></div>
                        </div>

                        <div className="container mx-auto px-4 relative z-10">
                              {/* Section Header */}
                              <div className="text-center mb-16">
                                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{t('Services.reasonsTitle')}</span>
                                    <h2 className="text-4xl md:text-5xl font-black font-oswald uppercase leading-tight mb-6">
                                          {t('Services.reasonsHeading')}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2">
                                          <div className="w-12 h-1 bg-primary"></div>
                                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                                          <div className="w-12 h-1 bg-primary"></div>
                                    </div>
                              </div>

                              {/* Services Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Service 1: Quality Equipment */}
                                    <div className="bg-white text-black p-10 shadow-xl group hover:-translate-y-2 transition-transform duration-300">
                                          <div className="mb-8">
                                                {/* Bulldozer Icon */}
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M48 40H56V24H40V16H16V40H8V48H56" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M16 40H40V24" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <circle cx="20" cy="52" r="4" stroke="#E69B43" strokeWidth="4" />
                                                      <circle cx="44" cy="52" r="4" stroke="#E69B43" strokeWidth="4" />
                                                      <path d="M8 48L0 56" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" />
                                                </svg>
                                          </div>
                                          <h3 className="text-2xl font-bold font-oswald mb-4">{t('Services.quality.title')}</h3>
                                          <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                                                {t('Services.quality.desc')}
                                          </p>
                                          <Link href="/about" className="inline-block bg-[#111111] text-white text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-primary transition-colors">
                                                {t('Services.viewMore')}
                                          </Link>
                                    </div>

                                    {/* Service 2: Fast Service */}
                                    <div className="bg-white text-black p-10 shadow-xl group hover:-translate-y-2 transition-transform duration-300">
                                          <div className="mb-8">
                                                {/* Helmet Icon */}
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M32 8C18.7452 8 8 18.7452 8 32V48H56V32C56 18.7452 45.2548 8 32 8Z" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M8 32H56" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M32 8V32" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M20 12L24 32" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M44 12L40 32" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                          </div>
                                          <h3 className="text-2xl font-bold font-oswald mb-4">{t('Services.fast.title')}</h3>
                                          <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                                                {t('Services.fast.desc')}
                                          </p>
                                          <Link href="/services" className="inline-block bg-[#111111] text-white text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-primary transition-colors">
                                                {t('Services.viewMore')}
                                          </Link>
                                    </div>

                                    {/* Service 3: Support 24/7 */}
                                    <div className="bg-white text-black p-10 shadow-xl group hover:-translate-y-2 transition-transform duration-300">
                                          <div className="mb-8">
                                                {/* Headset Icon */}
                                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M32 8C18.745 8 8 18.745 8 32V48H20V32H12C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32H44V48H56V32C56 18.745 45.255 8 32 8Z" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <path d="M48 48V56H24" stroke="#E69B43" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                      <text x="32" y="44" textAnchor="middle" fill="#E69B43" fontSize="16" fontFamily="Arial" fontWeight="bold">24</text>
                                                </svg>
                                          </div>
                                          <h3 className="text-2xl font-bold font-oswald mb-4">{t('Services.support.title')}</h3>
                                          <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                                                {t('Services.support.desc')}
                                          </p>
                                          <Link href="/contact" className="inline-block bg-[#111111] text-white text-xs font-bold px-8 py-4 uppercase tracking-widest hover:bg-primary transition-colors">
                                                {t('Services.viewMore')}
                                          </Link>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* S6: About Section */}
                  <section className="py-24 bg-white">
                        <div className="container mx-auto px-4">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                    <div>
                                          <h2 className="text-4xl font-black font-oswald uppercase mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.raw('About.title') }}>
                                          </h2>
                                          <div className="w-16 h-1 bg-primary mb-8"></div>
                                          <p className="text-gray-600 mb-6 leading-relaxed">
                                                {t('About.desc')}
                                          </p>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                                <div>
                                                      <h4 className="text-xl font-bold font-oswald mb-2">{t('About.sub1.title')}</h4>
                                                      <p className="text-gray-500 text-sm">{t('About.sub1.desc')}</p>
                                                </div>
                                                <div>
                                                      <h4 className="text-xl font-bold font-oswald mb-2">{t('About.sub2.title')}</h4>
                                                      <p className="text-gray-500 text-sm">{t('About.sub2.desc')}</p>
                                                </div>
                                          </div>

                                          <Link
                                                href="/about"
                                                className="inline-block bg-primary text-white font-bold px-8 py-4 uppercase font-oswald tracking-widest hover:bg-[#111111] transition-colors mt-10"
                                          >
                                                {t('About.viewMore')}
                                          </Link>
                                    </div>
                                    <div className="relative h-[600px]">
                                          <Image
                                                src="/images/roller.png"
                                                alt="About Us"
                                                fill
                                                className="object-cover"
                                          />
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* S7: Testimonials */}
                  <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                              <Image src="/images/excavator.png" alt="bg" fill className="object-cover" />
                        </div>
                        <div className="container mx-auto px-4 relative z-10">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                    <div className="relative h-[500px] hidden lg:block">
                                          <Image
                                                src="/images/loader.png" // Placeholder for portrait
                                                alt="Testimonial"
                                                fill
                                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                          />
                                    </div>
                                    <div>
                                          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{t('Testimonials.title')}</span>
                                          <h2 className="text-4xl font-black font-oswald uppercase mb-8">{t('Testimonials.heading')}</h2>
                                          <div className="text-primary text-6xl font-serif mb-6">“</div>
                                          <p className="text-xl text-gray-300 leading-relaxed italic mb-8">
                                                {t('Testimonials.desc')}
                                          </p>
                                          <div>
                                                <h4 className="text-xl font-bold font-oswald">{t('Testimonials.author')}</h4>
                                                <span className="text-primary text-sm font-bold uppercase tracking-wider">{t('Testimonials.role')}</span>
                                          </div>

                                          <div className="flex gap-4 mt-12">
                                                <button className="w-12 h-12 border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">←</button>
                                                <button className="w-12 h-12 border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">→</button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      );
}
