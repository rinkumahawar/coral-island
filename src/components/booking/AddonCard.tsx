import React from 'react';
import { cn } from '@/lib/utils';

interface AddonCardProps {
  id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  available: boolean;
  isSelected: boolean;
  quantity: number;
  onToggle: () => void;
  onQuantityChange: (change: number) => void;
  maxQuantity: number;
  isDisabled?: boolean;
  className?: string;
}

const AddonCard: React.FC<AddonCardProps> = ({
  name,
  price,
  duration,
  image,
  available,
  isSelected,
  quantity,
  onToggle,
  onQuantityChange,
  maxQuantity,
  isDisabled = false,
  className,
}) => {
  return (
    <div
      className={cn( 
        'border rounded-lg transition-all duration-300 overflow-hidden',
        isDisabled ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg',
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200',
        className
      )}
      onClick={() => !isDisabled && onToggle()}
    >
      <div className="relative h-32 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">{name}</h3>
          <div className="flex items-center text-gray-500 text-xs mb-2">
            <i className="far fa-clock mr-1"></i>
            {duration}
          </div>
          <div className="text-blue-600 font-bold text-sm mb-2">
            ฿{price.toLocaleString()}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDisabled) onQuantityChange(-1);
                }}
                className={cn(
                  'w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors',
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
                )}
                disabled={isDisabled || quantity <= 0}
              >
                <i className="fas fa-minus text-xs"></i>
              </button>
              <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDisabled) onQuantityChange(1);
                }}
                className={cn(
                  'w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors',
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'
                )}
                disabled={isDisabled || quantity >= maxQuantity}
              >
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {isSelected && <i className="fas fa-check text-white text-[8px]"></i>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddonCard; 