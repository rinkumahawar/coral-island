import React from 'react';
import { cn } from '@/lib/utils';
import Button from '../base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import PaymentModal from './PaymentModal';
import { UserService } from '@/lib/api/services/user';
import { BookingService } from '@/lib/api/services/booking';

declare global {
  interface Window {
    Omise: any;
  }
}

interface BookingSummaryProps {
  packageName: string;
  date: string;
  time: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  addons: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  couponDiscount: number;
  onApplyCoupon: (code: string) => void;
  onConfirmBooking: () => void;
  className?: string;
  isProcessing?: boolean;
  error?: string | null;
  paymentMethod?: 'omise';
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  packageName,
  date,
  time,
  adultCount,
  childCount,
  adultPrice,
  childPrice,
  addons,
  subtotal,
  couponDiscount,
  onApplyCoupon,
  onConfirmBooking,
  className,
  isProcessing = false,
  error = null,
  paymentMethod,
}) => {
  const [couponCode, setCouponCode] = React.useState('');
  const [couponError, setCouponError] = React.useState('');

  const totalAmount = subtotal - couponDiscount;
  const totalPax = adultCount + childCount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    onApplyCoupon(couponCode);
    setCouponCode('');
  };

  return (
    <>
      <div className={cn('bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-6', className)}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>
        {(!date || !time) ? (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please select a date and time to continue.
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Package:</span>
            <span className="font-medium">{packageName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{time || 'Not selected'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Adults:</span>
            <span className="font-medium">{adultCount} × ฿{adultPrice.toLocaleString()}</span>
          </div>
          {childCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Children:</span>
              <span className="font-medium">{childCount} × ฿{childPrice.toLocaleString()}</span>
            </div>
          )}
          {addons.length > 0 && (
            <div className="pt-2">
              <span className="text-gray-600 font-medium">Selected Add-ons:</span>
              <ul className="mt-2 space-y-2">
                {addons.map((addon, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">- {addon.name} (x{addon.quantity})</span>
                    <span className="font-medium">฿{(addon.price * addon.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-800">Subtotal:</span>
              <span className="text-lg text-gray-800">฿{subtotal.toLocaleString()}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Discount:</span>
                <span>-฿{couponDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-blue-600">฿{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
        <Button
          onClick={onConfirmBooking}
          variant="primary"
          size="md"
          fullWidth
          disabled={!date || !time || isProcessing}
        >
          {isProcessing ? (
            <>
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
              Processing...
            </>
          ) : (
            'Confirm Booking'
          )}
        </Button>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>{paymentMethod === 'omise' ? 'Secure payment with Omise' : 'No payment required now'}</p>
        </div>
      </div>
    </>
  );
};

export default BookingSummary; 