import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faClock } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TicketDetails from '@/components/sections/TicketDetails';
import EventGallery from '@/components/sections/EventGallery';
import EventFaqs from '@/components/sections/EventFaqs';
import { TicketData, TicketService } from '@/lib/api/services/ticket';
import { ApiError } from '@/lib/api/types';
import Link from 'next/link';
import Script from 'next/script';
import { formatMoney } from '@/lib/money-format';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { CardSkeleton } from '@/components/common/SkeletonLoader';
import Image from 'next/image';

// Enable ISR for better performance - revalidate every 5 minutes
export const revalidate = 300; // 5 minutes

// Generate metadata for SEO - this runs on the server
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { 
  try {
    const { slug } = await params;
    
    // Fetch ticket data server-side for SEO
    const ticket = await TicketService.getTicketDetails(slug);
    
    if (!ticket) {
      return {
        title: 'Ticket Not Found',
        description: 'The requested ticket could not be found.',
      };
    }
    

    
    // Use API data for metadata
    const title = ticket.seo_data?.seo_title || ticket.title || undefined;
    const description = ticket.seo_data?.seo_desc || ticket.content || undefined;
    const image = ticket.seo_data?.seo_image || ticket.image?.file_path || undefined;
    
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
      title: title,
      description: description,
      keywords: [
        'Coral Island',
        'Pattaya', 
        'Thailand',
        'Event Ticket',
        'Adventure',
        'Beach Activities',
        'Island Event',
        'Event Booking',
        'Travel',
        'Vacation',
        'Ticket Booking',
        ticket.title
      ],
      openGraph: {
        title: title,
        description: description,
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
        title: title,
        description: description,
        images: image ? [image] : [],
      },
      alternates: {
        canonical: `/tickets/${ticket.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    // Fallback metadata for build failures
    return {
      title: 'Coral Island Event Ticket - Pattaya, Thailand',
      description: 'Book your ticket for the Coral Island Adventure Event. Experience the best of Thailand\'s beautiful island.',
    };
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const TicketDetailsPage: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  
  let ticket: TicketData | null = null;
  let error: string | null = null;

  try {
    const response = await TicketService.getTicketDetails(slug);
    if (!response) {
      error = 'Ticket data not found';
    } else {
      ticket = response;
    }
  } catch (err: any) {
    
    if (err instanceof ApiError) {
      error = err.message;
    } else if (err.message) {
      error = `API Error: ${err.message}`;
    } else {
      error = 'An unexpected error occurred while fetching ticket data';
    }
    
  }

  if (error || !ticket) {
    return null;
  }

  const basePrice = parseFloat(ticket.price);
  const salePrice = parseFloat(ticket.sale_price);
  const hasDiscount = salePrice < basePrice;

  const formatDuration = (duration: string) => {
    // Check if duration is just a number (minutes)
    if (/^\d+$/.test(duration)) {
      const minutes = parseInt(duration);
      if (minutes < 60) {
        return `${minutes}m`;
      } else if (minutes % 60 === 0) {
        return `${minutes / 60}h`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      }
    }
    
    // If it's already formatted (e.g., "2h 30m", "1.5h"), return as is
    return duration;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      {/* Structured Data Schema */}
      <Script
        id="ticket-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": ticket.seo_data?.seo_title || ticket.title,
            "description": ticket.seo_data?.seo_desc,
            "image": ticket.image?.file_path,
            "offers": {
              "@type": "Offer",
              "price": ticket.sale_price || ticket.price,
              "priceCurrency": "THB",
              "availability": "https://schema.org/InStock",
              "url": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets/${ticket.slug}`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1000"
            },
            "category": "Event Ticket",
            "brand": {
              "@type": "Brand",
              "name": process.env.NEXT_PUBLIC_PAGE_NAME
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Tickets",
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": ticket.title,
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets/${ticket.slug}`
              }
            ]
          })
        }}
      />

      {/* FAQ Schema */}
      {ticket.faqs && ticket.faqs.length > 0 && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": ticket.faqs.map(faq => ({
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

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            "name": ticket.seo_data?.seo_title || ticket.title,
            "description": ticket.seo_data?.seo_desc || process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_PATH}`,
            "image": ticket.seo_data?.seo_image || ticket.image?.file_path || undefined,
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

      <Header breadcrumbs={[
        { label: 'Tickets', href: '/tickets' },
        { label: ticket.title }
      ]} title={ticket.title || ''} />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-24 sm:pb-32 flex-1">

                <div className="mx-auto">
          {/* Ticket Header */}
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Image */}
              <div className="relative h-96">
                {ticket.image?.file_path && (
                  <Image
                    src={ticket.image.file_path}
                    alt={ticket.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    priority={true}
                  />
                )}
                {hasDiscount && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded">
                      SALE
                    </div>
                  )}
                {ticket.duration && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-blue-200 shadow-sm">
                      <FontAwesomeIcon icon={faClock} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {formatDuration(ticket.duration)}
                    </span>
                  </div>
                )}
                </div>

                {/* Ticket Info */}
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{ticket.title}</h1>

                  {ticket.content && (
                    <div>
                      <div className="text-sm sm:text-sm md:text-base text-gray-700 leading-relaxed" 
                          dangerouslySetInnerHTML={{ __html: ticket.content }} />
                    </div>
                  )}

                  {/* Highlights */}
                  {ticket.highlights && (() => {
                    const validHighlights = Object.entries(ticket.highlights)
                      .filter(([key, highlight]) => key !== '__number__' && highlight && highlight.title)
                      .map(([key, highlight]) => highlight as { title: string; icon_code: string });
                    
                    return validHighlights.length > 0 ? (
                      <div className="space-y-2 sm:space-y-3">
                        <h4 className="text-xs sm:text-sm font-semibold text-blue-700">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {validHighlights.map((highlight, index) => (
                            <span 
                              key={index} 
                              className="text-xs sm:text-sm text-blue-600 flex items-center"
                            >
                              <span className="mr-1">•</span>
                              {highlight.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
            
            {/* Gallery Section */}
            {ticket.gallery_images && ticket.gallery_images.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <EventGallery gallery={ticket.gallery_images} />
              </div>
            )}

            {/* Ticket Details */}
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
              <TicketDetails ticket={ticket} is_content={false} />
            </div>

            {/* FAQs Section */}
            {ticket.faqs && ticket.faqs.length > 0 && (
              <div className="mt-4 sm:mt-6">
                <EventFaqs faqs={ticket.faqs} />
              </div>
            )}
          </div>

        {/* Fixed Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 py-2 px-3 sm:py-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-row justify-between items-center">
              {/* Ticket Price Display */}
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-600">Ticket Price</span>
                {hasDiscount ? (
                  <div className="flex items-center space-x-1 sm:space-x-2">
                      <span className="text-lg font-bold text-red-600">{formatMoney(Number(salePrice))}</span>
                    <span className="text-sm sm:text-sm text-gray-500 line-through">{formatMoney(Number(basePrice))}</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-800">{formatMoney(Number(basePrice))}</span>  
                )}
              </div>

              <Link
                href={`/booking/${ticket.slug}`}
                className="px-10 sm:px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base sm:text-base"
              >
                <FontAwesomeIcon icon={faTicket} className="mr-1 sm:mr-2" />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketDetailsPage; 