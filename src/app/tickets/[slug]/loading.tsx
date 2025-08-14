import React from 'react';
import { CardSkeleton } from '@/components/common/SkeletonLoader';

export default function TicketDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="bg-gray-200 rounded-lg h-96"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-8 w-3/4"></div>
              <div className="bg-gray-200 rounded h-6 w-full"></div>
              <div className="bg-gray-200 rounded h-6 w-2/3"></div>
              <div className="bg-gray-200 rounded h-12 w-32"></div>
              <div className="bg-gray-200 rounded h-6 w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
          <div className="space-y-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
} 