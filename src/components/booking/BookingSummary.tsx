import React from 'react';
import { cn } from '@/lib/utils';
import Button from '../base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

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
  onProceedToCheckout: () => void;
  className?: string;
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
  onProceedToCheckout,
  className,
}) => {
  const [couponCode, setCouponCode] = React.useState('');
  const [couponError, setCouponError] = React.useState('');

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    onApplyCoupon(couponCode);
    setCouponCode('');
  };

  return (
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Coupon Code</label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="w-full sm:w-auto flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              onClick={handleApplyCoupon}
              variant="primary"
              size="md"
            >
              Apply
            </Button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-1">{couponError}</p>
          )}
          {couponDiscount > 0 && (
            <p className="text-green-500 text-sm mt-1">Coupon applied successfully!</p>
          )}
        </div>
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
            <span className="text-xl font-bold text-blue-600">฿{(subtotal - couponDiscount).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={onProceedToCheckout}
        variant="primary"
        size="md"
        fullWidth
        disabled={!date || !time}
      >
        Confirm Booking
      </Button>
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>No payment required now</p>
      </div>
    </div>
  );
};

export default BookingSummary; 