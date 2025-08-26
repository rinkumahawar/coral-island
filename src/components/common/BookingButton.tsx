'use client';

import Link from 'next/link';
import React from 'react';
import FormatMoney from '@/components/common/FormatMoney';

interface BookingButtonProps {
  price: string;
  className?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ price, className = "" }) => {
  return (
    <Link 
      href={`/tickets`}
      className={`bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 w-full cursor-pointer ${className}`}
    >
      Book Event - <FormatMoney amount={Number(price)} />
    </Link>
  );
};

export default BookingButton; 