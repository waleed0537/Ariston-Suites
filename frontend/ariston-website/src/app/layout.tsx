import type { Metadata } from 'next';
import { inter, playfair } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ariston Suites - Luxury Boutique Hotel in Karachi',
  description:
    'Experience luxury and comfort at Ariston Suites, a boutique hotel in the heart of Karachi. Premium rooms, world-class amenities, and exceptional service.',
  keywords: [
    'Ariston Suites',
    'luxury hotel Karachi',
    'boutique hotel',
    'premium accommodation',
    'hotel in Karachi',
    'business hotel',
    'family hotel',
    'deluxe rooms',
  ],
  authors: [{ name: 'Ariston Suites' }],
  openGraph: {
    title: 'Ariston Suites - Luxury Boutique Hotel',
    description: 'Experience luxury and comfort at Ariston Suites',
    url: 'https://aristonsuites.com',
    siteName: 'Ariston Suites',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ariston Suites Hotel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ariston Suites - Luxury Boutique Hotel',
    description: 'Experience luxury and comfort at Ariston Suites',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
