import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
      const t = useTranslations('NotFound');

      return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-9xl font-black text-gray-200 font-oswald">404</h1>
                  <div className="absolute">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                              {t('desc')}
                        </p>
                        <Link
                              href="/"
                              className="inline-block bg-primary text-white font-bold px-8 py-3 uppercase font-oswald tracking-widest hover:bg-[#111111] transition-colors rounded-lg"
                        >
                              {t('home')}
                        </Link>
                  </div>
            </div>
      );
}
