import { HttpClient } from '../http-client';
import { API_CONFIG } from '../config';
import { ApiResponse } from '../types';
import { 
  createOmiseToken, 
  createImmediatePayment, 
  createPaymentWith3DS, 
  handle3DSCallback, 
  getPaymentDetails, 
  PaymentRequest as OmisePaymentRequest,
  confirmPaymentStatus
} from './omise';

export interface PaymentRequest extends OmisePaymentRequest {}

export interface PaymentResponse {
  success: boolean;
  message: string;
  payment_id?: number;
  charge_id?: string;
  amount?: number;
  currency?: string;
  status?: string;
  paid?: boolean;
  paid_at?: string;
  requires_redirect?: boolean;
  redirect_url?: string;
  error: boolean;
  code: number;
}

export interface PaymentDetails {
  id: number;
  userId: number;
  omise_charge_id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  payment_method: string;
  metadata: any;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export class PaymentService {
  public static async createImmediatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      return await createImmediatePayment(paymentData);
    } catch (error: any) {
      throw new Error(error.message || 'Payment failed');
    }
  }

  public static async createPaymentWith3DS(paymentData: PaymentRequest & { return_uri?: string }): Promise<PaymentResponse> {
    try {
      return await createPaymentWith3DS(paymentData);
    } catch (error: any) {
      throw new Error(error.message || 'Payment failed');
    }
  }

  public static async getPaymentDetails(paymentId: number): Promise<PaymentResponse> {
    try {
      return await getPaymentDetails(paymentId);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get payment details');
    }
  }

  public static async handle3DSCallback(chargeId: string, paymentId: number): Promise<PaymentResponse> {
    try {
      return await handle3DSCallback(chargeId, paymentId);
    } catch (error: any) {
      throw new Error(error.message || 'Payment callback failed');
    }
  }

  // Helper method to create Omise token from card details
  public static async createOmiseToken(card: {
    name: string;
    number: string;
    expiration_month: string;
    expiration_year: string;
    security_code: string;
    city?: string;
    postal_code?: string;
  }): Promise<string> {
    try {
      const token = await createOmiseToken(card) as { id: string };
      return token.id;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create token');
    }
  }

  public static async confirmPaymentStatus(code: string): Promise<ApiResponse<any>> {
    try {
      return await confirmPaymentStatus(code);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to confirm payment status');
    }
  }
} 