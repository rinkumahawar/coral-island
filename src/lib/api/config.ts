export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  endpoints: {
    event: `page/event/${process.env.NEXT_PUBLIC_PAGE_SLUG}`,
    tickets: `page/event/${process.env.NEXT_PUBLIC_PAGE_SLUG}/tickets`,
    ticketDetails: 'page/tickets/:slug',
    eventAvailability: 'events/load-dates',
    nationalities: 'nationalities',
    userSignup: 'vendor-signup',
    bookingCreate: 'booking/create',
    bookingDetails: 'booking/details/:id',
    token: 'token',
    charge: 'charge',
    chargeAuth: 'charge/auth',
    paymentCallback: 'payment/callback',
    paymentDetails: 'payment',
    paymentConfirm: 'payment/confirm',
    currencyRates: 'currency-rates/:currency',
    bookingVoucher: 'booking/voucher/:code',
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