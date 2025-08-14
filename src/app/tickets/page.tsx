import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTicket, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EventData, TicketData, TicketService } from '@/lib/api/services/ticket';
import { ApiError } from '@/lib/api/types';
import Script from 'next/script';
import { formatMoney } from '@/lib/money-format';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TicketCardSkeleton } from '@/components/common/SkeletonLoader';

// Enable ISR for better performance - revalidate every 5 minutes
export const revalidate = 300; // 5 minutes

// Generate metadata for SEO - this runs on the server
export async function generateMetadata(): Promise<Metadata> { 
  try {
    const data = await TicketService.getEventTickets();
    const { event: eventData, tickets: ticketsData } = data as any;
    
    // Parse social media meta data - handle the actual JSON structure
    let socialData = {
      facebook: { title: null, desc: null, image: null },
      twitter: { title: null, desc: null, image: null }
    };
    
    if (eventData?.seo_data?.seo_share) {
      try {
        // Handle both string and object formats
        const shareData = eventData.seo_data.seo_share;
        socialData = shareData as any;
      } catch (e) {
        console.warn('Failed to parse SEO share data:', e);
      }
    }
    
    // Use meta data from API or fallback to event data
    const title = process.env.NEXT_PUBLIC_PAGE_NAME + " - Tickets";
    const description = process.env.NEXT_PUBLIC_PAGE_DESCRIPTION;
    const image = process.env.NEXT_PUBLIC_LOGO_PATH;
    
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://coralislandtour.com'),
      title: title,
      description: description,
      keywords: [
        'Coral Island',
        'Pattaya', 
        'Thailand',
        'Event Tickets',
        'Adventure',
        'Beach Activities',
        'Island Event',
        'Event Booking',
        'Travel',
        'Vacation',
        'Ticket Booking'
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
        images: process.env.NEXT_PUBLIC_LOGO_PATH ? [process.env.NEXT_PUBLIC_LOGO_PATH] : [],
      },
      alternates: {
        canonical: '/tickets',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Coral Island Event Tickets - Pattaya, Thailand',
      description: 'Book your tickets for the Coral Island Adventure Event. Choose from our selection of exciting packages and experiences.',
    };
  }
}

interface TicketCardProps {
  ticket: TicketData;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const basePrice = parseFloat(ticket.price);
  const salePrice = parseFloat(ticket.sale_price);
  const hasDiscount = salePrice < basePrice;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {ticket.image?.file_path && (
          <Link href={`/tickets/${ticket.slug}`} className="block w-full h-full">
            <img
              src={ticket.image.file_path}
              alt={ticket.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
        )}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          <Link href={`/tickets/${ticket.slug}`} className="hover:text-blue-600 transition-colors cursor-pointer">
            {ticket.title}
          </Link>
        </h3>
        
        {ticket.short_desc && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ticket.short_desc}</p>
        )}

        {/* Price */}
        <div className="mb-4">
          {hasDiscount ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-red-600">{formatMoney(Number(salePrice))}</span>
              <span className="text-sm text-gray-500 line-through">{formatMoney(Number(basePrice))}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">{formatMoney(Number(basePrice))}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/tickets/${ticket.slug}`}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faEye} className="mr-1" />
            View Details
          </Link>
          <Link
            href={`/booking/${ticket.slug}`}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTicket} className="mr-1" />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const TicketsPage: React.FC = async () => {
  let eventData: EventData | null = null;
  let ticketsData: TicketData[] = [];
  let error: string | null = null;

  try {
    const response = await TicketService.getEventTickets();
    eventData = response.event;
    ticketsData = response.tickets;
  } catch (err: any) {
    if (err instanceof ApiError) {
      error = err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }



  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/tickets"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data Schema */}
      <Script
        id="tickets-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `${eventData?.title || process.env.NEXT_PUBLIC_PAGE_NAME}`,
            "description": eventData?.seo_data?.seo_desc,
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets`,
            "numberOfItems": ticketsData.length,
            "itemListElement": ticketsData.map((ticket, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": ticket.seo_data?.seo_title || ticket.title,
                "description": ticket.seo_data?.seo_desc,
                "image": ticket.image?.file_path,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/tickets/${ticket.slug}`,
                "offers": {
                  "@type": "Offer",
                  "price": ticket.sale_price || ticket.price,
                  "priceCurrency": "THB",
                  "availability": "https://schema.org/InStock"
                },
                "category": "Event Ticket",
                "brand": {
                  "@type": "Brand",
                  "name": process.env.NEXT_PUBLIC_PAGE_NAME
                }
              }
            }))
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
              }
            ]
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

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            "name": eventData?.seo_data?.seo_title || eventData?.title,
            "description": eventData?.seo_data?.seo_desc || process.env.NEXT_PUBLIC_PAGE_DESCRIPTION,
            "url": process.env.NEXT_PUBLIC_SITE_URL,
            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_LOGO_PATH || '/images/coralisland/logo.jpg'}`,
            "image": eventData?.seo_data?.seo_image || '/images/banner.jpg',
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
        { label: 'Tickets' },
      ]} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {eventData?.title || 'Available Tickets'}
          </h1>
          <p className="text-gray-600">Choose your perfect experience</p>
        </div>

        {/* Tickets Grid */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <TicketCardSkeleton key={index} />
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ticketsData.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
              />
            ))}
          </div>

          {ticketsData.length === 0 && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-gray-400 text-4xl mb-4" />
              <p className="text-gray-600">No tickets available at the moment.</p>
            </div>
          )}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default TicketsPage;
