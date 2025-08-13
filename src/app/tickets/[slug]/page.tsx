import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
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

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Return empty array - pages will be generated on-demand
  return [];
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
    ticket = response;
  } catch (err: any) {
    if (err instanceof ApiError) {
      error = err.message;
    } else {
      error = 'An unexpected error occurred';
    }
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested ticket could not be found.'}</p>
          <Link 
            href="/tickets"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  const basePrice = parseFloat(ticket.price);
  const salePrice = parseFloat(ticket.sale_price);
  const hasDiscount = salePrice < basePrice;

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
              <div className="relative">
                {ticket.image?.file_path && (
                  <img
                    src={ticket.image.file_path}
                    alt={ticket.title}
                    className="w-full object-cover rounded-lg"
                  />
                )}
                {hasDiscount && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>

              {/* Ticket Info */}
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">{ticket.title}</h1>
                
                {ticket.short_desc && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600">{ticket.short_desc}</p>
                )}

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
                    <div className="space-y-1 sm:space-y-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-blue-700">Highlights</h4>
                      <ul className="list-disc list-inside space-y-0.5 sm:space-y-1">
                        {validHighlights.map((highlight, index) => (
                          <li key={index} className="text-xs sm:text-sm text-gray-600">
                            {highlight.title}
                          </li>
                        ))}
                      </ul>
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
            <TicketDetails ticket={ticket} />
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