export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  endpoints: {
    event: 'page/event/coral-island-tour-tickets-unforgettable-day-trip-from-pattaya',
    tickets: 'page/event/coral-island-tour-tickets-unforgettable-day-trip-from-pattaya/tickets',
    ticketDetails: 'page/tickets/:slug',
    nationalities: 'nationalities',
    token: 'token',
    charge: 'charge',
    chargeAuth: 'charge/auth',
    paymentCallback: 'payment/callback',
    paymentDetails: 'payment',
    paymentConfirm: 'payment/confirm',
  },    
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  auth: {
    token: process.env.NEXT_PUBLIC_API_TOKEN || '',
  },
  timeout: 30000, // 30 seconds
} as const;

export type ApiEndpoint = keyof typeof API_CONFIG.endpoints; 