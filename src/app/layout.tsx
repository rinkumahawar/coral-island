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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  description: process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
  keywords: process.env.NEXT_PUBLIC_PAGE_KEYWORDS ? process.env.NEXT_PUBLIC_PAGE_KEYWORDS : [],
  authors: [{ name: process.env.NEXT_PUBLIC_PAGE_NAME }],
  creator: process.env.NEXT_PUBLIC_PAGE_NAME,
  publisher: process.env.NEXT_PUBLIC_PAGE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_PAGE_NAME,
    title: process.env.NEXT_PUBLIC_PAGE_NAME,
    description: process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
    images: [
      {
        url: process.env.NEXT_PUBLIC_LOGO_PATH || 'http://localhost:3000/images/coralisland/logo.jpg',
        width: 1200,
        height: 630,
        alt: process.env.NEXT_PUBLIC_PAGE_NAME,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: process.env.NEXT_PUBLIC_TWITTER_URL,
    creator: process.env.NEXT_PUBLIC_TWITTER_URL,
    title: process.env.NEXT_PUBLIC_PAGE_NAME,
    description: process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
    images: [
      {
        url: process.env.NEXT_PUBLIC_LOGO_PATH || 'http://localhost:3000/images/coralisland/logo.jpg',
        width: 1200,
        height: 630,
        alt: process.env.NEXT_PUBLIC_PAGE_NAME,
      }
    ],
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
        <meta name="apple-mobile-web-app-title" content={process.env.NEXT_PUBLIC_PAGE_NAME} />  
        
        {/* Canonical Link */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true,
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
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
