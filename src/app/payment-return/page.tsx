'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PaymentService } from '@/lib/api/services/payment';  

const PaymentReturnContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [chargeId, setChargeId] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  useEffect(() => {
    const bookingCode = searchParams.get('code');
    setBookingCode(bookingCode || '');
    
    console.log('Payment return page params:', { bookingCode });

    checkPaymentStatus(bookingCode);
  }, [searchParams]);

  const checkPaymentStatus = async (bookingCode: string | null) => {
    if (!bookingCode) {
      setStatus('error');
      setMessage('Invalid payment reference.');
      return;
    }

    try {
      // Use the payment service directly
      const data = await PaymentService.confirmPaymentStatus(bookingCode);

      if (data.success) {
        setStatus('success');
        setMessage('Payment completed successfully!');
      } else {
        setStatus('error');
        setMessage(data.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('error');
      setMessage('Unable to verify payment status. Please contact support.');
    }
  };

  const handleContinue = () => {
    // Redirect to booking confirmation page instead of home
            router.push('/booking-confirmation?code=' + bookingCode || '');
  };

  const handleRetry = () => {
    router.push('/tickets');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            {status === 'loading' && (
              <div className="mb-6">
                <FontAwesomeIcon 
                  icon={faSpinner} 
                  className="text-blue-600 text-4xl animate-spin" 
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Verifying Payment
                </h2>
                <p className="mt-2 text-gray-600">
                  Please wait while we verify your payment...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="mb-6">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="text-green-600 text-4xl" 
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Payment Successful!
                </h2>
                <p className="mt-2 text-gray-600">
                  Your payment has been processed successfully.
                </p>
                {chargeId && (
                  <p className="mt-2 text-sm text-gray-500">
                    Reference: {chargeId}
                  </p>
                )}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6">
                <FontAwesomeIcon 
                  icon={faTimesCircle} 
                  className="text-red-600 text-4xl" 
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Payment Failed
                </h2>
                <p className="mt-2 text-gray-600">
                  {message}
                </p>
                {chargeId && (
                  <p className="mt-2 text-sm text-gray-500">
                    Reference: {chargeId}
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 space-y-4">
              {status === 'success' && (
                <button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Continue to Home
                </button>
              )}

              {status === 'error' && (
                <div className="space-y-3">
                  <button
                    onClick={handleRetry}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Go to Home
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>🔒 Secure payment processed by Omise</p>
              <p>SSL encrypted • PCI DSS compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentReturnPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentReturnContent />
    </Suspense>
  );
};

export default PaymentReturnPage; 