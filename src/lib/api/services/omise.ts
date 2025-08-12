import { HttpClient } from '../http-client';
import { API_CONFIG } from '../config';
import { ApiResponse } from '../types';

// Token creation - call your Node.js API
export const createOmiseToken = async (card: {
  name: string;
  number: string;
  expiration_month: string;
  expiration_year: string;
  security_code: string;
  city?: string;
  postal_code?: string;
}): Promise<{ id: string }> => {
  try {
    // Call your Node.js API for token creation
    const response = await HttpClient.post<ApiResponse<{ token: string }>>(
      API_CONFIG.endpoints.token,
      { card }
    );

    return { id: response.data.data.token };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create token');
  }
};

// New payment service functions
export interface PaymentRequest {
  token: string;
  amount: number;
  currency: string;
  booking_code: string;
  customer_id: number;
  description?: string;
  return_uri?: string;
}

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
  user_id: number;
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



export const createImmediatePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
  try {
    const { token, amount, currency, description = 'Payment for tour booking' } = paymentData;

    // Validate inputs
    if (!token || !amount || !currency) {
      return {
        success: false,
        message: 'Missing required fields: token, amount, currency',
        error: true,
        code: 400
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        message: 'Amount must be a positive number',
        error: true,
        code: 400
      };
    }

    // Call your Node.js API for immediate payment
    const response = await HttpClient.post<ApiResponse<PaymentResponse>>(
      API_CONFIG.endpoints.charge,
      {
        token,
        amount,
        currency,
        description
      }
    );

    return response.data.data;
  } catch (error: any) {
    return {
      success: false,
      message: `Payment failed: ${error.message}`,
      error: true,
      code: 400
    };
  }
};

export const createPaymentWith3DS = async (paymentData: PaymentRequest & { return_uri?: string }): Promise<PaymentResponse> => {
  try {
    const { token, amount, currency, description = 'Payment for tour booking', return_uri, booking_code, customer_id } = paymentData;

    // Validate inputs
    if (!token || !amount || !currency) {
      return {
        success: false,
        message: 'Missing required fields: token, amount, currency',
        error: true,
        code: 400
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        message: 'Amount must be a positive number',
        error: true,
        code: 400
      };
    }

    // Call your Node.js API for 3DS payment
    const response = await HttpClient.post<ApiResponse<PaymentResponse>>(
      API_CONFIG.endpoints.chargeAuth,
      {
        token,
        amount,
        currency,
        description,
        return_uri,
        booking_code,
        customer_id
      }
    );

    return response.data.data;
  } catch (error: any) {
    return {
      success: false,
      message: `Payment failed: ${error.message}`,
      error: true,
      code: 400
    };
  }
};

export const handle3DSCallback = async (chargeId: string, paymentId: number): Promise<PaymentResponse> => {
  try {
    // Call your Node.js API for 3DS callback
    const response = await HttpClient.get<ApiResponse<PaymentResponse>>(
      `${API_CONFIG.endpoints.paymentCallback}?charge_id=${chargeId}&payment_id=${paymentId}`
    );

    return response.data.data;
  } catch (error: any) {
    return {
      success: false,
      message: `Payment callback failed: ${error.message}`,
      error: true,
      code: 500
    };
  }
};


export const getPaymentDetails = async (paymentId: number): Promise<PaymentResponse> => {
  try {
    // Call your Node.js API for payment details
    const response = await HttpClient.get<ApiResponse<PaymentResponse>>(
      `${API_CONFIG.endpoints.paymentDetails}/${paymentId}`
    );

    return response.data.data;
  } catch (error: any) {
    return {
      success: false,
      message: `Failed to retrieve payment details: ${error.message}`,
      error: true,
      code: 500
    };
  }
};

/**
 * Confirms the payment status for a booking by checking the Omise charge and updates the booking and payment records accordingly.
 * Calls POST /api/payment/confirm with the booking code.
 * @param code - The booking code to confirm payment for
 * @returns The API response with payment/booking status
 */
export const confirmPaymentStatus = async (code: string): Promise<ApiResponse<any>> => {
  try {
    const response = await HttpClient.post<ApiResponse<any>>(
      API_CONFIG.endpoints.paymentConfirm,
      { code }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to confirm payment status');
  }
};