import { HttpClient } from '../http-client';
import { API_CONFIG } from '../config';
import { ApiResponse } from '../types';

export interface TicketData {
  id: number;
  title: string;
  slug: string;
  highlight_content: string;
  content: string;
  price: string;
  sale_price: string;
  duration: number;
  exclude: Array<{
    title: string;
  }>;
  include: Array<{
    title: string;
  }>;
  image?: {
    file_path: string;
    id: number;
  } | null;
  gallery_images: Array<{
    id: number;
    url: string;
  }>;
}

export interface MetaData {
  id: number;
  seo_title: string | null;
  seo_desc: string | null;
  seo_image: string | null;
  seo_share: {
    facebook: {
      title: string | null;
      desc: string | null;
      image: string | null;
    };
    twitter: {
      title: string | null;
      desc: string | null;
      image: string | null;
    };
  };
}

export interface ReviewData {
  id: number;
  title: string;
  content: string;
  rate_number: number;
  created_at: string;
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  faqs: Array<{
    title: string;
    content: string;
  }>;
  extra_content: {
    [key: string]: {
      type: string;
      title: string;
      content: string;
    };
  };
  tabbed_content: {
    [key: string]: {
      type: string;
      title: string;
      content: string;
    };
  };
  location: {
    name: string;
  };
  content: string;
  highlight_content: string;
  address: string;
  map_lat: string | null;
  map_lng: string | null;
  is_featured: boolean | null;
  duration: number;
  duration_unit: string;
  start_time: string;
  end_time: string;
  price: string;
  sale_price: string;
  is_instant: boolean | null;
  review_score: string;
  location_id: number;
  banner_image_id: number;
  banner_image: {
    file_path: string;
    id: number;
  };
  reviews: any[];
  gallery_images: any[];
  review_stats: {
    score_total: number;
    total_review: number;
    review_text: string;
  };
  tickets: TicketData[];
  packages: {
    name: string;
    description: string;
    includes: string[];
    price: string;
    duration: string;
    highlights: string[];
  }[];
  testimonials: {
    name: string;
    country: string;
    rating: number;
    text: string;
    package: string;
    image: string;
  }[];
}

export interface EventResponse {
  event: EventData;
  tickets: TicketData[];
  seo_data: MetaData;
  reviews: ReviewData[];
}

export class EventService {
  public static async getEventDetails(): Promise<EventResponse> {
    const response = await HttpClient.post<ApiResponse<EventResponse>>(
      API_CONFIG.endpoints.event
    );
    return response.data.data;
  }
} 