import { HttpClient } from '../http-client';
import { API_CONFIG } from '../config';
import { ApiResponse } from '../types';
import { MetaData } from './event';


export interface EventData {
  id: number;
  title: string;
  faqs: Array<{
    title: string;
    content: string;
  }>;
  meta_data: MetaData;
  extra_price: Array<object> | null;
}


export interface TicketData {
  id: number;
  slug: string;
  title: string;
  content: string;
  highlight_content: string;
  price: string;
  sale_price: string;
  image: {
    file_path: string;
    id: number;
  };
  gallery_images: Array<{
    id: number;
    url: string;
  }>;
  time_slots: Array<{
    id: number;
    time: string;
    adult_price: string;
    child_price: string;
  }>;
  guest_info: {
    adult: string;
    child: string;
  };
  rating?: number;
  reviewCount?: number;
  duration?: string;
  min_guest: number;
  max_guest: number;
  highlights?: {
    [key: string]: {
      title: string | null;
      icon_code: string | null;
    } | null;
  };
  exclude: Array<{
    title: string;
  }>;
  include: Array<{
    title: string;
  }>;
  faqs: Array<{
    title: string;
    content: string;
  }>;
  event: EventData | null;
  meta_data: MetaData;
}

export interface TicketResponse {
  event: EventData | null;
  tickets: TicketData[];
}

  
  export class TicketService {
    public static async getEventTickets(): Promise<TicketResponse> {
      const response = await HttpClient.post<ApiResponse<TicketResponse>>(
        API_CONFIG.endpoints.tickets,
      );
      
      return response.data.data;
    }

    public static async getTicketDetails(slug: string): Promise<TicketData | null> {
      try {
        const response = await HttpClient.post<ApiResponse<TicketData>>(
          API_CONFIG.endpoints.ticketDetails.replace(':slug', slug),
          { type: process.env.NEXT_PUBLIC_PAGE_SLUG },
        );
        return response.data.data;
      } catch (error: any) {
        // If the API returns a 404 or similar error, return null to indicate ticket not found
        if (error.status === 404 || error.code === 404) {
          return null;
        }
        // Re-throw other errors to be handled by the calling code
        throw error;
      }
    }
  }
  