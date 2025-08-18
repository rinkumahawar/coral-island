import HomeHeader from '../components/layout/HomeHeader';
import HeroSection from '../components/sections/HeroSection';
import WhatsAppButton from '../components/common/WhatsAppButton';
import Footer from '@/components/layout/Footer';
import { EventService } from '@/lib/api/services/event';
import EventTickets from '../components/sections/FeaturedTourPackages';
import EventInformation from '@/components/sections/EventInformation';
import EventHighlights from '../components/sections/EventHighlights';
import EventGallery from '../components/sections/EventGallery';
import EventFaqs from '../components/sections/EventFaqs';
import SecurityTrustPanel from '@/components/sections/SecurityTrustPanel';
import EventExtraContent from '../components/sections/EventExtraContent';
import EventCustomerReviews from '../components/sections/EventCustomerReviews';
import EventReviewStats from '../components/sections/EventReviewStats';
import { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';
import BookingCTA from '@/components/sections/BookingCTA';
import Script from 'next/script';
import { Suspense } from 'react';
import { HeroSkeleton, CardSkeleton } from '@/components/common/SkeletonLoader';

// Enable ISR for better performance - revalidate every 5 minutes
export const revalidate = 300; // 5 minutes

// Generate metadata for SEO - this runs on the server
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch data server-side for SEO
    const data = await EventService.getEventDetails();
    const { event: eventData, meta_data: metaData } = data as any;



    // Use API data for metadata
    const title = metaData?.seo_title || eventData?.title || undefined;
    const description = metaData?.seo_desc || eventData?.description || undefined;
    const image = metaData?.seo_image || eventData?.banner_image?.file_path || undefined;

    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
      title: title,
      description: description,
      keywords: [
        'Coral Island',
        'Pattaya',
        'Thailand',
        'Event',
        'Adventure',
        'Beach Activities',
        'Island Event',
        'Event Management',
        'Travel',
        'Vacation'
      ],
      openGraph: {
        title: title,
        description: description,
        type: 'website',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [image],
      },
      alternates: {
        canonical: '/',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata for build failures
    return {
      title: 'Coral Island Adventure Event - Pattaya, Thailand',
      description: 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!',
    };
  }
}
// Server-side data fetching
async function getEventData() {
  try {
    // Force fresh data on every request
    const data = await EventService.getEventDetails();
    return {
      eventData: data.event,
      ticketData: data.tickets,
      seoData: data.seo_data,
      reviews: data.reviews,
      error: null
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
    return {
      eventData: null,
      ticketData: [],
      seoData: null,
      reviews: [],
      error: 'Failed to fetch event data'
    };
  }
}


// Main page component - now server-side rendered
export default async function HomePage() {
  const { eventData, ticketData, error, reviews, seoData } = await getEventData();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error loading data</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data Schema */}
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": seoData?.seo_title || eventData?.title,
            "description": seoData?.seo_desc || process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
            "image": seoData?.seo_image || undefined,
            "startDate": new Date().toISOString().split('T')[0] + "T08:00:00",
            "endDate": new Date().toISOString().split('T')[0] + "T16:00:00",
            "location": {
              "@type": "Place",
              "name": process.env.NEXT_PUBLIC_PAGE_NAME,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": process.env.NEXT_PUBLIC_PAGE_ADDRESS_LOCALITY,
                "addressCountry": process.env.NEXT_PUBLIC_PAGE_ADDRESS_COUNTRY,
                "addressRegion": process.env.NEXT_PUBLIC_PAGE_ADDRESS_REGION
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": process.env.NEXT_PUBLIC_PAGE_NAME,
              "url": process.env.NEXT_PUBLIC_SITE_URL
            },
            "offers": {
              "@type": "Offer",
              "price": eventData?.price || "1200",
              "priceCurrency": "THB",
              "availability": "https://schema.org/InStock",
              "url": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": eventData?.review_stats?.score_total || "4.9",
              "reviewCount": eventData?.review_stats?.total_review || "1000"
            },
            "category": "Adventure Event",
            "brand": {
              "@type": "Brand",
              "name": process.env.NEXT_PUBLIC_PAGE_NAME
            }
          })
        }}
      />

      {/* FAQ Schema */}
      {eventData?.faqs && eventData.faqs.length > 0 && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": eventData.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.title,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.content.replace(/<[^>]*>/g, '') // Remove HTML tags for clean text
                }
              }))
            })
          }}
        />
      )}

      {/* Review Schema */}
      {reviews && reviews.length > 0 && (
        <Script
          id="review-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": seoData?.seo_title || eventData?.title,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": eventData?.review_stats?.score_total || "4.9",
                "reviewCount": eventData?.review_stats?.total_review || reviews.length,
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": reviews.slice(0, 10).map(review => ({
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": review.rate_number || "5",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "author": {
                  "@type": "Person",
                  "name": review.title || "Anonymous Customer"
                },
                "reviewBody": review.content || "",
                "datePublished": review.created_at || new Date().toISOString()
              }))
            })
          }}
        />
      )}

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            "name": seoData?.seo_title || eventData?.title,
            "description": seoData?.seo_desc || process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_PATH}`,
            "image": seoData?.seo_image || undefined,
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
            }
          })
        }}
      />

      <HomeHeader />

      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection {...(eventData as any)} />
      </Suspense>

      {/* Event Details Sections */}
      {eventData ? (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <Suspense fallback={<CardSkeleton />}>
              <AboutSection content={eventData.content} images={eventData.gallery_images} />
            </Suspense>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Suspense fallback={<CardSkeleton />}>
                  <EventTickets tickets={ticketData as any} />
                </Suspense>
                {eventData.highlight_content && (
                  <Suspense fallback={<CardSkeleton />}>
                    <EventHighlights highlight={eventData.highlight_content} />
                  </Suspense>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                <Suspense fallback={<CardSkeleton />}>
                  <EventInformation event={eventData} />
                </Suspense>
                {eventData.review_stats && (
                  <Suspense fallback={<CardSkeleton />}>
                    <EventReviewStats stats={eventData.review_stats} />
                  </Suspense>
                )}
                <Suspense fallback={<CardSkeleton />}>
                  <BookingCTA price={eventData.sale_price} />
                </Suspense>
              </div>
            </div>

            {eventData.gallery_images && eventData.gallery_images.length > 0 && (
              <Suspense fallback={<CardSkeleton />}>
                <EventGallery gallery={eventData.gallery_images} />
              </Suspense>
            )}
            {eventData.extra_content && (
              <Suspense fallback={<CardSkeleton />}>
                <EventExtraContent extraContent={eventData.extra_content} maxWords={100} />
              </Suspense>
            )}

            {/* Security & Trust Panel and FAQs side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {eventData.faqs && eventData.faqs.length > 0 && (
                <Suspense fallback={<CardSkeleton />}>
                  <EventFaqs faqs={eventData.faqs} />
                </Suspense>
              )}
              <Suspense fallback={<CardSkeleton />}>
                <EventCustomerReviews reviews={reviews} />
              </Suspense>
            </div>
            <Suspense fallback={<CardSkeleton />}>
              <SecurityTrustPanel />
            </Suspense>
          </div>
        </section>
      ) : (
        <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CardSkeleton />
                <CardSkeleton />
              </div>
              <div className="space-y-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <WhatsAppButton phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''} />
    </div>
  );
}
