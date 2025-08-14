import React from 'react';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import BookingActions from './BookingActions';
import { cn } from '@/lib/utils';

interface BookingConfirmationHeaderProps {
  voucherUrl?: string;
  reference: string;
  email: string;
  className?: string;
  status?: 'paid' | 'unpaid' | 'failed';
}

const BookingConfirmationHeader: React.FC<BookingConfirmationHeaderProps> = ({
  voucherUrl,
  reference,
  email,
  className,
  status = 'paid',
}) => {
  let icon = faCheck;
  let iconColor = 'text-green-500';
  let title = 'Booking Confirmed!';
  let subtitle = 'Your event is booked successfully';
  let bgColor = 'bg-green-100';
  let showEmail = true;

  if (status === 'unpaid') {
    icon = faClock;
    iconColor = 'text-yellow-500';
    title = 'Payment Pending';
    subtitle = 'Your booking is pending payment. Please complete payment to confirm.';
    bgColor = 'bg-yellow-100';
    showEmail = false;
  } else if (status === 'failed') {
    icon = faTimesCircle;
    iconColor = 'text-red-500';
    title = 'Payment Failed';
    subtitle = 'Your payment was not successful. Please try again or contact support.';
    bgColor = 'bg-red-100';
    showEmail = false;
  }

  // Handle voucher download
  const handleDownloadVoucher = () => {
    if (voucherUrl) {
      const link = document.createElement('a');
      link.href = voucherUrl;
      link.download = `voucher-${reference}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle voucher print
  const handlePrintVoucher = () => {
    if (voucherUrl) {
      window.open(voucherUrl, '_blank');
    }
  };

  return (
    <Card className={cn('text-center', className || '')}>
      <div className={`w-20 h-20 mx-auto ${bgColor} rounded-full flex items-center justify-center mb-6`}>
        <FontAwesomeIcon icon={icon} className={`text-4xl ${iconColor}`} />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-xl text-gray-600 mb-4">{subtitle}</p>
      <div className="bg-blue-50 rounded-lg p-4 inline-block mb-6">
        <p className="text-gray-700">
          Booking Reference: <span className="font-bold text-blue-700">{reference}</span>
        </p>
      </div>
      {showEmail && (
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to <span className="font-medium">{email}</span> with all the details.
        </p>
      )}
      {status === 'paid' && (
        <BookingActions
          onDownloadReceipt={() => {}}
          onDownloadVoucher={handleDownloadVoucher}
          onPrintReceipt={() => {}}
          onPrintVoucher={handlePrintVoucher}
          onReturnHome={() => {}}
          className="justify-center"
        />
      )}
    </Card>
  );
};

export default BookingConfirmationHeader; 