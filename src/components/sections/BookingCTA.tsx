'use client';

import React from 'react';
import Card from '../base/Card';
import BookingButton from '../common/BookingButton';

interface BookingCTAProps {
  price?: string;
  title?: string;
  description?: string;
}

const BookingCTA: React.FC<BookingCTAProps> = ({ 
  price, 
  title = "Ready to Book?", 
  description = "Secure your spot on this amazing adventure!" 
}) => (
  <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-blue-100 mb-6">{description}</p>
      <BookingButton price={price || "0"} />
    </div>
  </Card>
);

export default BookingCTA; 