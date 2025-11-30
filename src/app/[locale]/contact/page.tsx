import { useTranslations } from 'next-intl';

export default function ContactPage() {
      const t = useTranslations('ContactPage');

      return (
            <div className="bg-white">
                  {/* Hero Section */}
                  <div className="relative bg-[#111111] text-white py-24">
                        <div className="container mx-auto px-4">
                              <h1 className="text-5xl font-oswald font-bold mb-4">{t('title')}</h1>
                              <p className="text-xl text-gray-400 max-w-2xl">{t('subtitle')}</p>
                        </div>
                  </div>

                  <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                              {/* Contact Info */}
                              <div className="lg:col-span-1 space-y-8">
                                    <div>
                                          <h3 className="text-2xl font-oswald font-bold mb-6 text-black">{t('info.address')}</h3>
                                          <p className="text-gray-600 text-lg">
                                                Nuripaşa Mah. Bekirsubaşı Sokak No:23B<br />
                                                Zeytinburnu İstanbul
                                          </p>
                                    </div>

                                    <div>
                                          <h3 className="text-2xl font-oswald font-bold mb-6 text-black">{t('info.phone')}</h3>
                                          <p className="text-primary text-2xl font-bold font-oswald">+90 532 169 60 98</p>
                                          <p className="text-gray-500 mt-1">Mon - Fri, 9am - 6pm</p>
                                    </div>

                                    <div>
                                          <h3 className="text-2xl font-oswald font-bold mb-6 text-black">{t('info.email')}</h3>
                                          <p className="text-gray-600 text-lg">info@azzamachinery.com</p>
                                    </div>
                              </div>

                              {/* Contact Form */}
                              <div className="lg:col-span-2 bg-gray-50 p-8 rounded-sm">
                                    <h3 className="text-2xl font-oswald font-bold mb-8 text-black">{t('desc')}</h3>
                                    <form className="space-y-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('form.name')}</label>
                                                      <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:outline-none transition-colors" />
                                                </div>
                                                <div>
                                                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('form.email')}</label>
                                                      <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:outline-none transition-colors" />
                                                </div>
                                          </div>

                                          <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('form.subject')}</label>
                                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:outline-none transition-colors" />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{t('form.message')}</label>
                                                <textarea rows={6} className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-primary focus:outline-none transition-colors"></textarea>
                                          </div>

                                          <button type="submit" className="bg-primary text-white font-bold px-10 py-4 hover:bg-black transition-colors uppercase font-oswald tracking-wider">
                                                {t('form.send')}
                                          </button>
                                    </form>
                              </div>
                        </div>

                        {/* Map Section */}
                        <div className="mt-16 w-full h-[400px] bg-gray-200 rounded-sm overflow-hidden shadow-lg">
                              <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.650490013064!2d28.90086307655516!3d40.98913997135316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3c00000000001%3A0x0!2zNDDCsDU5JzIwLjkiTiAyOMKwNTQnMTIuNCJF!5e0!3m2!1sen!2str!4v1701380000000!5m2!1sen!2str"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                        </div>
                  </div>
            </div>
      );
}
