'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PaymentService } from '@/lib/api/services/payment';

const ChargeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCharge = async () => {
      try {
        // Get form data from the request
        const formData = new FormData();
        const urlParams = new URLSearchParams(window.location.search);
        
        // Add all form fields to the request
        for (const [key, value] of urlParams.entries()) {
          formData.append(key, value);
        }

        // Get the omiseToken from the form
        const omiseToken = searchParams.get('omiseToken');
        if (!omiseToken) {
          throw new Error('Missing Omise token');
        }

        // Get other required fields
        const amount = searchParams.get('amount');
        const currency = searchParams.get('currency') || 'thb';
        const description = searchParams.get('description') || 'Coral Island Booking';
        const bookingCode = searchParams.get('booking_code');
        const customerId = searchParams.get('customer_id');
        
        // Use the payment service directly
        
        const data = await PaymentService.createPaymentWith3DS({
          token: omiseToken,
          amount: parseInt(amount || '0'),
          currency: currency.toUpperCase(),
          description: description,
          return_uri: `${window.location.origin}/payment-return?code=${bookingCode}`,
          customer_id: Number(customerId) || 0,
          booking_code: bookingCode || ''
        });

        if (data.requires_redirect && data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }

        if (data.success) {
          // Redirect back to success page
          router.push('/payment-return?status=success&charge_id=' + data.charge_id);
        } else {
          console.error('Payment failed:', data.message);
          router.push('/payment-return?status=error&message=' + encodeURIComponent(data.message || 'Payment failed'));
        }
      } catch (error) {
        console.error('Charge processing error:', error);
        setError('Payment processing error');
        router.push('/payment-return?status=error&message=' + encodeURIComponent('Payment processing error'));
      } finally {
        setIsProcessing(false);
      }
    };

    processCharge();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Payment Error</h3>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Processing Payment</h3>
          <p className="mt-2 text-sm text-gray-500">Please wait while we process your payment...</p>
        </div>
      </div>
    </div>
  );
}

export default function ChargePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChargeContent />
    </Suspense>
  );
} 