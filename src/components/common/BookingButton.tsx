'use client';

import { formatMoney } from '@/lib/money-format';
import Link from 'next/link';
import React from 'react';

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
      Book Event - {formatMoney(Number(price))}
    </Link>
  );
};

export default BookingButton; 