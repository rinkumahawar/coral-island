'use client';

import React from 'react';

interface BookingButtonProps {
  price: string;
  className?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ price, className = "" }) => {
  const handleBookingClick = () => {
    // Navigate to booking page
    window.location.href = '/tickets';
  };

  return (
    <button 
      onClick={handleBookingClick}
      className={`bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 w-full cursor-pointer ${className}`}
    >
      Book Event - {price}
    </button>
  );
};

export default BookingButton; 