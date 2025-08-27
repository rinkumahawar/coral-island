import { MetadataRoute } from 'next';
import { TicketService } from '@/lib/api/services/ticket';

export const dynamic = 'force-static';

// Helper function to escape XML entities
function escapeXmlEntities(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://coralislandevents.com';
  
  // Base static URLs
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tickets`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  try {
    // Fetch dynamic ticket URLs
    const ticketData = await TicketService.getEventTickets();
    const tickets = ticketData?.tickets || [];
    
    const ticketUrls = tickets.map((ticket: any) => ({
      url: `${baseUrl}/tickets/${escapeXmlEntities(ticket.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticUrls, ...ticketUrls];
  } catch (error) {
    console.warn('Failed to fetch ticket data for sitemap:', error);
    return staticUrls;
  }
} 