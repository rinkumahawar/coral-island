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
  seo_data: MetaData;
  extra_price: Array<object> | null;
}


export interface TicketData {
  id: number;
  slug: string;
  title: string;
  short_desc: string | null;
  content: string;
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
  seo_data: MetaData;
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

    public static async getTicketDetails(slug: string): Promise<TicketData> {
      const response = await HttpClient.post<ApiResponse<TicketData>>(
        API_CONFIG.endpoints.ticketDetails.replace(':slug', slug),
        { slug },
      );
      return response.data.data;
    }
  }
  