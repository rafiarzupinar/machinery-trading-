import { useTranslations } from 'next-intl';


export default function AboutPage() {
      const t = useTranslations('AboutPage');

      return (
            <div className="bg-white">
                  {/* Hero Section */}
                  <div className="relative bg-[#111111] text-white py-24">
                        <div className="container mx-auto px-4">
                              <h1 className="text-5xl font-oswald font-bold mb-4">{t('title')}</h1>
                              <p className="text-xl text-gray-400 max-w-2xl">{t('subtitle')}</p>
                        </div>
                  </div>

                  {/* Main Content */}
                  <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                              <div>
                                    <h2 className="text-3xl font-oswald font-bold mb-6 text-black relative after:content-[''] after:absolute after:bottom-[-10px] after:left-0 after:w-16 after:h-1 after:bg-primary">
                                          {t('mission.title')}
                                    </h2>
                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                          {t('desc')}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                          <div className="bg-gray-50 p-6 border-l-4 border-primary">
                                                <h3 className="text-xl font-oswald font-bold mb-2">{t('mission.title')}</h3>
                                                <p className="text-gray-600">{t('mission.desc')}</p>
                                          </div>
                                          <div className="bg-gray-50 p-6 border-l-4 border-primary">
                                                <h3 className="text-xl font-oswald font-bold mb-2">{t('vision.title')}</h3>
                                                <p className="text-gray-600">{t('vision.desc')}</p>
                                          </div>
                                    </div>
                              </div>

                              <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                                    {/* Placeholder for an image - using a solid color for now or a generic placeholder if available */}
                                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 font-oswald text-2xl">
                                          ABOUT IMAGE
                                    </div>
                              </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-gray-100 pt-16">
                              <div className="text-center">
                                    <span className="block text-6xl font-oswald font-bold text-primary mb-2">15+</span>
                                    <span className="text-gray-600 font-medium uppercase tracking-wider">{t('stats.years')}</span>
                              </div>
                              <div className="text-center">
                                    <span className="block text-6xl font-oswald font-bold text-primary mb-2">50+</span>
                                    <span className="text-gray-600 font-medium uppercase tracking-wider">{t('stats.countries')}</span>
                              </div>
                              <div className="text-center">
                                    <span className="block text-6xl font-oswald font-bold text-primary mb-2">1000+</span>
                                    <span className="text-gray-600 font-medium uppercase tracking-wider">{t('stats.machines')}</span>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
