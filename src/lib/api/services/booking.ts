import { API_CONFIG } from '../config';
import { HttpClient } from '../http-client';
import { ApiResponse } from '../types';

export interface BookingRequest {
  event_id: number;
  ticket_id: number;
  start_date: string;
  timeslot_id: number;
  timeslot: string;
  adult_count: number;
  child_count: number;
  extra_price: Array<{ name: string; enable: string | boolean; number: number }>;
  grand_total: number;
  customer_id: number;
  customer: {
    name: string;
    email: string;
    phone: number;
    country_code: number;
    nationality: string;
    pickup_hotel_name: string;
    airport?: string; // Made optional
    messanger_type: string;
    messanger_country_code: number;
    messanger_type_no: number;
  };
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface VoucherResponse {
  success: boolean;
  message: string;
  data?: any;
  error: boolean;
  code: number;
}

export interface VoucherData {
  message: string;
  url: string;
  status: number;
}

export class BookingService {
  public static async createBooking(data: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await HttpClient.post<ApiResponse<BookingResponse>>(
        API_CONFIG.endpoints.bookingCreate,
        data
      );
      return response.data;
    } catch (error: any) {
      if (error?.data) {
        return error.data;
      }
      throw error;
    }
  }

  public static async getBooking(bookingId: string): Promise<BookingResponse> {
    try {
      const response = await HttpClient.get<ApiResponse<BookingResponse>>(
        API_CONFIG.endpoints.bookingDetails.replace(':id', bookingId),
      );
      return response.data;
    } catch (error: any) {
      if (error?.data) {
        return error.data;
      }
      throw error;
    }
  }

  public static async getBookingVoucher(code: string): Promise<VoucherResponse> {
    try {
      const response = await HttpClient.get<ApiResponse<VoucherData>>(
        `/booking/voucher/${code}`
      );
      return response.data;
    } catch (error: any) {
      if (error?.data) {
        return error.data;
      }
      throw error;
    }
  }
} 