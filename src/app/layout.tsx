import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import '../lib/fontawesome';
import { BookingProvider } from '@/contexts/BookingContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import FontAwesomeProvider from '@/components/common/FontAwesomeProvider';
import Script from 'next/script';
import { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

// Metadata configuration for the entire app
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://coralislandtour.com'),
  title: {
    default: 'Coral Island Pattaya - Adventure Tours & Events',
    template: '%s | Coral Island Pattaya'
  },
  description: 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!',
  keywords: ['Coral Island', 'Pattaya', 'Thailand', 'Adventure', 'Beach Activities', 'Island Tours'],
  authors: [{ name: 'Coral Island Pattaya' }],
  creator: 'Coral Island Pattaya',
  publisher: 'Coral Island Pattaya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://coralislandtour.com',
    siteName: 'Coral Island Pattaya',
    title: 'Coral Island Pattaya - Adventure Tours & Events',
    description: 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!',
    images: [
      {
        url: process.env.NEXT_PUBLIC_LOGO_PATH || '/images/coralisland/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Coral Island Pattaya',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: process.env.NEXT_PUBLIC_TWITTER_URL || '@coralislandpattaya',
    creator: '@coralislandpattaya',
    title: 'Coral Island Pattaya - Adventure Tours & Events',
    description: 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!',
    images: [process.env.NEXT_PUBLIC_LOGO_PATH || '/images/coralisland/logo.jpg'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and Logo Links */}
        <link rel="icon" type="image/x-icon" href={process.env.NEXT_PUBLIC_FAVICON_ICO} />
        <link rel="icon" type="image/png" sizes="16x16" href={process.env.NEXT_PUBLIC_FAVICON_16X16} />
        <link rel="icon" type="image/png" sizes="32x32" href={process.env.NEXT_PUBLIC_FAVICON_32X32} />
        <link rel="apple-touch-icon" href={process.env.NEXT_PUBLIC_APPLE_TOUCH_ICON} />
        <link rel="manifest" href={process.env.NEXT_PUBLIC_SITE_WEBMANIFEST} />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Meta tags for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Coral Island Pattaya" />
        
        {/* Canonical Link */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {/* Global Organization Schema */}
        <Script
          id="global-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristInformationCenter",
              "name": "Coral Island Pattaya",
              "description": "Discover the hidden treasures of Thailand's most beautiful island with our Coral Island Adventure Event. Book your event today!",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_PATH}`,
              "image": process.env.NEXT_PUBLIC_LOGO_PATH,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": process.env.NEXT_PUBLIC_PAGE_ADDRESS_LOCALITY,
                "addressCountry": process.env.NEXT_PUBLIC_PAGE_ADDRESS_COUNTRY,
                "addressRegion": process.env.NEXT_PUBLIC_PAGE_ADDRESS_REGION
              },
              "telephone": process.env.NEXT_PUBLIC_PHONE_NUMBER,
              "email": process.env.NEXT_PUBLIC_EMAIL,
              "openingHours": "Mo-Su 08:00-18:00",
              "priceRange": "฿฿",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "10000"
              },
              "sameAs": [
                process.env.NEXT_PUBLIC_FACEBOOK_URL,
                process.env.NEXT_PUBLIC_TWITTER_URL,
                process.env.NEXT_PUBLIC_INSTAGRAM_URL,
                process.env.NEXT_PUBLIC_YOUTUBE_URL
              ].filter(Boolean)
            })
          }}
        />

        <FontAwesomeProvider>
          <BookingProvider>
            <CurrencyProvider>
              {children}
            </CurrencyProvider>
          </BookingProvider>
        </FontAwesomeProvider>
      </body>
    </html>
  );
}
