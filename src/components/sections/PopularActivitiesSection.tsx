'use client';

import React from 'react';
import ActivityCard from '../cards/ActivityCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faStar } from '@fortawesome/free-solid-svg-icons';

interface ActivityType {
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  included: string[];
  safety: string[];
  requirements: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
  }[];
}

interface PopularActivitiesSectionProps {
  activityMap: { [key: string]: ActivityType };
  onViewDetails: (activity: string) => void;
}

const PopularActivitiesSection: React.FC<PopularActivitiesSectionProps> = ({
  activityMap,
  onViewDetails
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <FontAwesomeIcon icon={faWater} className="text-blue-600 text-4xl mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Popular Activities</h2>
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-4xl ml-4" />
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">Enhance your Coral Island experience with these exciting activities.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(activityMap).map(([name, activity]) => (
            <ActivityCard
              key={name}
              name={activity.name}
              duration={activity.duration}
              price={activity.price}
              image={activity.image}
              onViewDetails={() => onViewDetails(name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularActivitiesSection; 