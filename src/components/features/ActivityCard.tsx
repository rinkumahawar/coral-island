import React from 'react';
import Card from '../base/Card';
import Button from '../base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';  

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
  onViewDetails,
}) => {
  return (
    <Card variant="activity" className="activity-card">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1 activity-name">{name}</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span><FontAwesomeIcon icon={faClock} className="mr-1" /> {duration}</span>
          <span className="font-medium">{price}</span>
        </div>
        <button
          onClick={onViewDetails}
          className="text-blue-600 hover:text-blue-800 text-sm mb-3 cursor-pointer"
        >
          See More Details
        </button>
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ActivityCard; 