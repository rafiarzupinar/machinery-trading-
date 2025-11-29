'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
      error,
      reset,
}: {
      error: Error & { digest?: string };
      reset: () => void;
}) {
      const t = useTranslations('Error');

      useEffect(() => {
            console.error(error);
      }, [error]);

      return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                  <h1 className="text-9xl font-black text-gray-200 font-oswald">500</h1>
                  <div className="absolute">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                              {t('desc')}
                        </p>
                        <button
                              onClick={reset}
                              className="inline-block bg-primary text-white font-bold px-8 py-3 uppercase font-oswald tracking-widest hover:bg-[#111111] transition-colors rounded-lg"
                        >
                              {t('retry')}
                        </button>
                  </div>
            </div>
      );
}
