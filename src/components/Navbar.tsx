"use client";

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ChangeEvent, useTransition, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
      const t = useTranslations('Navbar');
      const locale = useLocale();
      const router = useRouter();
      const pathname = usePathname();
      const [isPending, startTransition] = useTransition();
      const [isOpen, setIsOpen] = useState(false);

      const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
            const nextLocale = e.target.value;
            startTransition(() => {
                  router.replace(pathname, { locale: nextLocale });
            });
      };

      return (
            <nav className="bg-white text-black shadow-sm sticky top-0 z-50 border-b border-gray-100 font-oswald">
                  <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center h-20 lg:h-24 relative">
                              {/* Logo */}
                              <Link href="/" className="flex items-center gap-3 group relative z-10">
                                    <div className="relative w-12 h-12 lg:w-16 lg:h-16">
                                          <Image
                                                src="/logo.png"
                                                alt="Azza Machinery Logo"
                                                fill
                                                className="object-contain"
                                                priority
                                          />
                                    </div>
                                    <div className="hidden lg:flex flex-col justify-center">
                                          <span className="text-black font-bold text-xl lg:text-2xl leading-none tracking-tight">AZZA</span>
                                          <span className="text-primary text-xs lg:text-sm font-medium tracking-[0.2em] leading-none group-hover:text-black transition-colors duration-300">MACHINERY</span>
                                    </div>
                              </Link>

                              {/* Mobile Centered Text */}
                              <Link href="/" className="lg:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-0">
                                    <span className="text-black font-bold text-xl leading-none tracking-tight">AZZA</span>
                                    <span className="text-primary text-xs font-medium tracking-[0.2em] leading-none">MACHINERY</span>
                              </Link>

                              {/* Desktop Navigation */}
                              <div className="hidden lg:flex items-center space-x-10 font-bold text-sm tracking-wide uppercase">
                                    <Link href="/" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
                                          {t('home')}
                                    </Link>
                                    <Link href="/machines" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
                                          {t('machines')}
                                    </Link>
                                    <Link href="/about" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
                                          {t('about')}
                                    </Link>
                                    <Link href="/contact" className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full">
                                          {t('contact')}
                                    </Link>
                              </div>

                              {/* Icons & CTA (Desktop) */}
                              <div className="hidden lg:flex items-center gap-8">
                                    <div className="flex items-center gap-4 border-r border-gray-200 pr-8">
                                          <div className="text-right hidden xl:block">
                                                <span className="block text-xs text-gray-500 font-roboto">{t('needHelp')}</span>
                                                <span className="block text-lg font-bold text-primary">+90 532 169 60 98</span>
                                          </div>
                                    </div>

                                    <div className="flex items-center gap-5">
                                          {/* Language Switcher */}
                                          <select
                                                defaultValue={locale}
                                                onChange={onSelectChange}
                                                disabled={isPending}
                                                className="bg-transparent font-bold text-sm uppercase focus:outline-none cursor-pointer hover:text-primary transition-colors"
                                          >
                                                <option value="en">EN</option>
                                                <option value="tr">TR</option>
                                          </select>

                                          <button className="hover:text-primary transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                          </button>
                                          <Link href="/contact" className="relative">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-primary transition-colors">
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                          </Link>
                                    </div>
                              </div>

                              {/* Mobile Menu Button */}
                              <button
                                    className="lg:hidden text-black hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(!isOpen)}
                              >
                                    {isOpen ? (
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                    ) : (
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                          </svg>
                                    )}
                              </button>
                        </div>
                  </div>

                  {/* Mobile Menu Drawer */}
                  {isOpen && (
                        <div className="lg:hidden absolute top-24 left-0 w-full bg-white border-t border-gray-100 shadow-lg py-6 px-4 flex flex-col gap-6">
                              <div className="flex flex-col gap-4 font-bold text-lg uppercase tracking-wide">
                                    <Link href="/" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>{t('home')}</Link>
                                    <Link href="/machines" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>{t('machines')}</Link>
                                    <Link href="/about" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>{t('about')}</Link>
                                    <Link href="/contact" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>{t('contact')}</Link>
                              </div>

                              <div className="border-t border-gray-100 pt-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                          <span className="font-bold text-sm uppercase">Language</span>
                                          <select
                                                defaultValue={locale}
                                                onChange={onSelectChange}
                                                disabled={isPending}
                                                className="bg-gray-50 border border-gray-200 rounded px-2 py-1 font-bold text-sm uppercase focus:outline-none"
                                          >
                                                <option value="en">English</option>
                                                <option value="tr">Türkçe</option>
                                          </select>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                          <span className="text-xs text-gray-500 font-roboto">{t('needHelp')}</span>
                                          <a href="tel:+905321696098" className="text-lg font-bold text-primary">+90 532 169 60 98</a>
                                    </div>
                              </div>
                        </div>
                  )}
            </nav>
      );
}
