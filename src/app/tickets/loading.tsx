import React from 'react';
import { TicketCardSkeleton } from '@/components/common/SkeletonLoader';

export default function TicketsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="bg-gray-200 rounded h-10 w-64 mx-auto mb-2 animate-pulse"></div>
          <div className="bg-gray-200 rounded h-6 w-48 mx-auto animate-pulse"></div>
        </div>

        {/* Tickets Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <TicketCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
} 