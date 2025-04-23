import React from 'react';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BookingActions from './BookingActions';
import { cn } from '@/lib/utils';

interface BookingConfirmationHeaderProps {
  reference: string;
  email: string;
  className?: string;
}

const BookingConfirmationHeader: React.FC<BookingConfirmationHeaderProps> = ({
  reference,
  email,
  className
}) => {
  return (
    <Card className={cn('text-center', className || '')}>
      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
        <FontAwesomeIcon icon={faCheck} className="text-4xl text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-xl text-gray-600 mb-4">Your tour is booked successfully</p>
      <div className="bg-blue-50 rounded-lg p-4 inline-block mb-6">
        <p className="text-gray-700">
          Booking Reference: <span className="font-bold text-blue-700">{reference}</span>
        </p>
      </div>
      <p className="text-gray-600 mb-8">
        A confirmation email has been sent to <span className="font-medium">{email}</span> with all the details.
      </p>
      <BookingActions
        onDownloadReceipt={() => console.log('Download Receipt clicked')}
        onDownloadVoucher={() => console.log('Download Voucher clicked')}
        onPrintReceipt={() => console.log('Print Receipt clicked')}
        onPrintVoucher={() => console.log('Print Voucher clicked')}
        onReturnHome={() => console.log('Return Home clicked')}
        className="justify-center"
      />
    </Card>
  );
};

export default BookingConfirmationHeader; 