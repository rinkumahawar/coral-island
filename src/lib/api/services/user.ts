import { HttpClient } from '../http-client';
import { ApiResponse } from '../types';

export interface VendorSignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  phonecode: string;
  phone: string;
}

export interface VendorSignupResponse {
  success: boolean;
  message: string;
  data?: any;
}

export class UserService {
  public static async vendorSignup(data: VendorSignupRequest): Promise<VendorSignupResponse> {
    try {
      const response = await HttpClient.post<ApiResponse<VendorSignupResponse>>(
        '/vendor-signup',
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
} 