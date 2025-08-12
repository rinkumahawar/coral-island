'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTag } from '@fortawesome/free-solid-svg-icons';

interface ActivityCardProps {
  name: string;
  duration: string;
  price: string;
  image: string;
  onViewDetails: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  duration,
  price,
  image,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FontAwesomeIcon icon={faClock} className="mr-2" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <FontAwesomeIcon icon={faTag} className="mr-2" />
          <span>{price}</span>
        </div>
        <button
          onClick={onViewDetails}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-button transition duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ActivityCard; 