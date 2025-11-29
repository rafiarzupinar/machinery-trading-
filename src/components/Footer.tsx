"use client";

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
      const t = useTranslations('Footer');

      return (
            <footer className="bg-[#111111] text-white font-roboto">
                  {/* Newsletter Section */}
                  <div className="border-b border-gray-800">
                        <div className="container mx-auto px-4 py-12">
                              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                          <h3 className="text-3xl font-oswald font-bold mb-2">{t('subscribeTitle')}</h3>
                                          <p className="text-gray-400">{t('newsletterDesc')}</p>
                                    </div>
                                    <div className="flex w-full md:w-auto gap-0">
                                          <input
                                                type="email"
                                                placeholder={t('emailPlaceholder')}
                                                className="bg-white text-black px-6 py-4 w-full md:w-80 focus:outline-none"
                                          />
                                          <button className="bg-primary text-white font-bold px-8 py-4 hover:bg-white hover:text-black transition-colors uppercase font-oswald tracking-wider">
                                                {t('subscribe')}
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Main Footer Content */}
                  <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                              {/* Column 1: About Us */}
                              <div>
                                    <h4 className="text-xl font-oswald font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-8 after:h-0.5 after:bg-primary">{t('about')}</h4>
                                    <ul className="space-y-4 text-gray-400 text-sm">
                                          <li><Link href="/about" className="hover:text-primary transition-colors">{t('about')}</Link></li>
                                          <li><Link href="/services" className="hover:text-primary transition-colors">{t('quickLinks')}</Link></li>
                                          <li><Link href="/contact" className="hover:text-primary transition-colors">{t('contact')}</Link></li>
                                    </ul>
                              </div>

                              {/* Column 2: About Company */}
                              <div>
                                    <h4 className="text-xl font-oswald font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-8 after:h-0.5 after:bg-primary">{t('aboutCompany')}</h4>
                                    <ul className="space-y-4 text-gray-400 text-sm">
                                          <li><Link href="/machines" className="hover:text-primary transition-colors">{t('ourShop')}</Link></li>
                                          <li><Link href="/machines" className="hover:text-primary transition-colors">{t('ourInventory')}</Link></li>
                                          <li><Link href="/machines" className="hover:text-primary transition-colors">{t('featureProducts')}</Link></li>
                                          <li><Link href="/machines" className="hover:text-primary transition-colors">{t('inventoryDetail')}</Link></li>
                                    </ul>
                              </div>

                              {/* Column 3: Our Network */}
                              <div>
                                    <h4 className="text-xl font-oswald font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-8 after:h-0.5 after:bg-primary">{t('ourNetwork')}</h4>
                                    <ul className="space-y-4 text-gray-400 text-sm">
                                          <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                                          <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                                          <li><a href="#" className="hover:text-primary transition-colors">Linkedin</a></li>
                                          <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                                    </ul>
                              </div>

                              {/* Column 4: Contact Info */}
                              <div>
                                    <h4 className="text-xl font-oswald font-bold mb-8 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-8 after:h-0.5 after:bg-primary">{t('contact')}</h4>
                                    <div className="space-y-6">
                                          <div>
                                                <p className="text-gray-400 text-sm mb-1">{t('needHelp')}</p>
                                                <p className="text-primary text-xl font-bold font-oswald">+90 532 169 60 98</p>
                                          </div>
                                          <p className="text-gray-400 text-sm" dangerouslySetInnerHTML={{ __html: t.raw('address') }}>
                                          </p>
                                          <p className="text-gray-400 text-sm">info@azzamachinery.com</p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Copyright */}
                  <div className="border-t border-gray-800 py-8">
                        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4">
                              <div className="flex items-center gap-2">
                                    <div className="relative w-10 h-10">
                                          <Image
                                                src="/logo.png"
                                                alt="Azza Machinery Logo"
                                                fill
                                                className="object-contain"
                                          />
                                    </div>
                                    <span className="font-oswald font-bold text-xl">AZZA MACHINERY</span>
                              </div>
                        </div>
                  </div>
            </footer>
      );
}
