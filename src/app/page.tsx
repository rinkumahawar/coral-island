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
import BookingCTA from '../components/sections/BookingCTA';
import Script from 'next/script';

// Generate metadata for SEO - this runs on the server
export async function generateMetadata(): Promise<Metadata> { 
  try {
    const data = await EventService.getEventDetails();
    const { event: eventData, meta_data: metaData } = data as any;
    
    // Parse social media meta data - handle the actual JSON structure
    let socialData = {
      facebook: { title: null, desc: null, image: null },
      twitter: { title: null, desc: null, image: null    }
 };


    
    if (metaData?.seo_share) {
      try {
        // Handle both string and object formats
        const shareData = metaData.seo_share;
        socialData = shareData as any;
      } catch (e) {
        console.warn('Failed to parse SEO share data:', e);
      }
    }
    
    // Use meta data from API or fallback to event data
    const title = metaData?.seo_title || eventData?.title || 'Coral Island Adventure Event';
    const description = metaData?.seo_desc || eventData?.description || 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!';
    const image = metaData?.seo_image || eventData?.banner_image?.file_path || '/images/banner.jpg';
    
    return {
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
        title: socialData.facebook?.title || title,
        description: socialData.facebook?.desc || description,
        type: 'website',
        images: image ? [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: socialData.twitter?.title || title,
        description: socialData.twitter?.desc || description,
        images: socialData.twitter?.image || image ? [socialData.twitter?.image || image] : [],
      },
      alternates: {
        canonical: '/',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Coral Island Adventure Event - Pattaya, Thailand',
      description: 'Discover the hidden treasures of Thailand\'s most beautiful island with our Coral Island Adventure Event. Book your event today!',
    };
  }
}
// Server-side data fetching
async function getEventData() {
  try {
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
            "image": seoData?.seo_image || '/images/banner.jpg',
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
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
            "image": seoData?.seo_image || '/images/banner.jpg',
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
      <HeroSection {...(eventData as any)} />
      
      {/* Event Details Sections */}
      {eventData && (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            {/* Header */}
  
            <AboutSection content={eventData.content} images={eventData.gallery_images} />
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <EventTickets tickets={ticketData as any} />
                {eventData.highlight_content && <EventHighlights highlight={eventData.highlight_content} />}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                <EventInformation event={eventData} />
                {eventData.review_stats && <EventReviewStats stats={eventData.review_stats} />}
                <BookingCTA price={eventData.price} />
              </div>
            </div>
            
            {eventData.gallery_images && eventData.gallery_images.length > 0 && <EventGallery gallery={eventData.gallery_images} />}
                {eventData.extra_content && <EventExtraContent extraContent={eventData.extra_content} maxWords={100} />}
                
                {/* Security & Trust Panel and FAQs side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                  
                  {eventData.faqs && eventData.faqs.length > 0 && <EventFaqs faqs={eventData.faqs} />}
                  <EventCustomerReviews reviews={reviews} />
                </div>
                <SecurityTrustPanel />
                
          </div>
        </section>
      )}
      
      <Footer />
    
      <WhatsAppButton phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''} />
    </div>
  );
}
