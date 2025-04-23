import React from 'react';
import { cn } from '@/lib/utils';

interface PackageCardProps {
  id: string;
  name: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  name,
  description,
  adultPrice,
  childPrice,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        'border-2 rounded-lg p-4 transition cursor-pointer',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
          <div className="mt-3 flex space-x-6">
            <div>
              <span className="block text-sm text-gray-500">Adult</span>
              <span className="font-semibold text-blue-600">฿{adultPrice.toLocaleString()}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-500">Child</span>
              <span className="font-semibold text-blue-600">฿{childPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center h-full">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'border-blue-500' : 'border-gray-300'
          }`}>
            {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard; 