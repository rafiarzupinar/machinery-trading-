import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const oswald = Oswald({
      variable: "--font-oswald",
      subsets: ["latin"],
});

const roboto = Roboto({
      variable: "--font-roboto",
      subsets: ["latin"],
      weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
      title: {
            template: '%s | Azza Machinery',
            default: 'Azza Machinery - Heavy Equipment Trading',
      },
      description: "Premium heavy machinery for construction and industrial needs. Worldwide shipping available.",
      openGraph: {
            siteName: 'Azza Machinery',
            title: 'Azza Machinery - Heavy Equipment Trading',
            description: 'Premium heavy machinery for construction and industrial needs. Worldwide shipping available.',
            type: 'website',
            locale: 'en_US',
            images: [
                  {
                        url: '/images/excavator.png',
                        width: 1200,
                        height: 630,
                        alt: 'Azza Machinery',
                  },
            ],
      },
      twitter: {
            card: 'summary_large_image',
            title: 'Azza Machinery',
            description: 'Premium heavy machinery for construction and industrial needs.',
      },
      icons: {
            icon: '/favicon.ico',
      },
};

export default async function RootLayout({
      children,
      params
}: Readonly<{
      children: React.ReactNode;
      params: Promise<{ locale: string }>;
}>) {
      const { locale } = await params;

      // Ensure that the incoming `locale` is valid
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!routing.locales.includes(locale as any)) {
            notFound();
      }

      // Providing all messages to the client
      // side is the easiest way to get started
      const messages = await getMessages();

      return (
            <html lang={locale}>
                  <body
                        className={`${oswald.variable} ${roboto.variable} antialiased font-sans flex flex-col min-h-screen`}
                  >
                        <NextIntlClientProvider messages={messages}>
                              <Navbar />
                              <main className="flex-grow">{children}</main>
                              <Footer />
                        </NextIntlClientProvider>
                  </body>
            </html>
      );
}
