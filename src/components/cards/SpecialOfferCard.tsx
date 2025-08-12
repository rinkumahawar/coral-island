'use client';

import React from 'react';

interface SpecialOfferCardProps {
  discount: string;
  discountBgColor: string;
  discountTextColor: string;
  borderColor: string;
  title: string;
  description: string;
  validity: string;
  code: string;
}

const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({
  discount,
  discountBgColor,
  discountTextColor,
  borderColor,
  title,
  description,
  validity,
  code
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg min-w-[300px] flex-shrink-0 overflow-hidden border-t-4 border-${borderColor}`}>
      <div className="p-6">
        <div className={`bg-${discountBgColor} text-${discountTextColor} font-bold py-1 px-3 rounded-full text-sm inline-block mb-4`}>
          {discount}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-gray-500 mb-4">{validity}</p>
        <div className="flex items-center justify-between">
          <div className="bg-gray-100 px-3 py-1 rounded text-gray-600 text-sm">
            Code: <span className="font-bold">{code}</span>
          </div>
          <a
            href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
            data-readdy="true"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferCard; 