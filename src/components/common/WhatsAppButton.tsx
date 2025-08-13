'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = `Hello! I'm interested in ${process.env.NEXT_PUBLIC_PAGE_NAME}.` 
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={handleClick}
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
      </button>
    </div>
  );
};

export default WhatsAppButton; 