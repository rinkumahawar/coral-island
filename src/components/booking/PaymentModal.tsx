import React, { useState } from 'react';
import OmiseCheckout from '../forms/OmiseCheckout';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentSuccess: (charge: any) => void;
  onPaymentError: (error: any) => void;
  bookingCode?: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  onPaymentSuccess,
  onPaymentError,
  bookingCode,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = (charge: any) => {
    setIsProcessing(false);
    onPaymentSuccess(charge);
  };

  const handlePaymentError = (error: any) => {
    setIsProcessing(false);
    onPaymentError(error);
  };

  const handleClose = () => {
    if (isProcessing) return; // Prevent closing during payment
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Payment Section */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">Secure Payment</h4>
          <OmiseCheckout
            amount={amount}
            isOpen={isOpen}
            onModalClose={onClose}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            buttonText="Pay Securely Now"
            buttonClassName="w-full bg-green-600 hover:bg-green-700"
            description="Coral Island Tour Booking"
            bookingCode={bookingCode}
          />
        </div>

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center">
          <p>🔒 Your payment is secured by Omise</p>
          <p>SSL encrypted • PCI DSS compliant • 256-bit encryption</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 