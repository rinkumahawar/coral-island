import React from 'react';
import Button from '../base/Button';
import Image from 'next/image';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviewCount: number;
  onBookNow: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  description,
  price,
  image,
  rating,
  reviewCount,
  onBookNow
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="h-64 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <div className="text-yellow-400 flex">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star${i >= rating ? '-half-alt' : ''}`}></i>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">({reviewCount} reviews)</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-blue-600 font-bold">{price}</p>
          <Button
            variant="primary"
            onClick={onBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard; 