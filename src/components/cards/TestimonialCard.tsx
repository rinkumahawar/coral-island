import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

interface TestimonialCardProps {
  name: string;
  country: string;
  rating: number;
  text: string;
  package: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  country,
  rating,
  text,
  package: packageName,
  image
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 relative">
      <div className="absolute top-4 right-4 text-blue-600">
        <FontAwesomeIcon icon={faQuoteRight} className="text-4xl opacity-20" />
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="text-yellow-400 flex mb-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon 
                key={i} 
                icon={i >= rating ? faStarHalfAlt : faStar} 
                className="mr-1"
              />
            ))}
          </div>
          <p className="text-gray-600 italic mb-4">{text}</p>
          <div>
            <p className="font-bold text-gray-800">{name}</p>
            <p className="text-gray-500 text-sm">{country} • {packageName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 