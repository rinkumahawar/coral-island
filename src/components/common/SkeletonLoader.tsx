import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  lines = 1, 
  height = "h-4" 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 rounded ${height} mb-2 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
    <div className="bg-gray-200 rounded h-48 mb-4"></div>
    <div className="bg-gray-200 rounded h-6 mb-2 w-3/4"></div>
    <div className="bg-gray-200 rounded h-4 mb-2 w-1/2"></div>
    <div className="bg-gray-200 rounded h-4 mb-4 w-2/3"></div>
    <div className="bg-gray-200 rounded h-10 w-full"></div>
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="bg-gray-200 rounded-lg h-96 animate-pulse flex items-center justify-center">
    <div className="text-center">
      <div className="bg-gray-300 rounded h-12 w-64 mb-4"></div>
      <div className="bg-gray-300 rounded h-6 w-96 mb-4"></div>
      <div className="bg-gray-300 rounded h-10 w-32"></div>
    </div>
  </div>
);

export const TicketCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-48"></div>
    <div className="p-4">
      <div className="bg-gray-200 rounded h-6 mb-2 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 mb-2 w-1/2"></div>
      <div className="bg-gray-200 rounded h-8 w-24"></div>
    </div>
  </div>
); 