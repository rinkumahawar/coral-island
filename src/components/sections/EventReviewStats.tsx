'use client';

import React from 'react';
import Card from '../base/Card';

interface EventReviewStatsProps {
  stats: any;
}

const EventReviewStats: React.FC<EventReviewStatsProps> = ({ stats }) => (
  <Card title="Customer Reviews" className="mb-8">
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl font-bold text-blue-700">{stats.score_total}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-5 h-5 ${i < Math.floor(parseFloat(stats.score_total)) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="text-gray-600">
          <p className="font-medium">{stats.total_review.toLocaleString()} reviews</p>
          <p className="text-sm text-gray-500 italic">{stats.review_text}</p>
        </div>
      </div>

      {/* Rating Breakdown */}
      {stats.rating_breakdown && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.rating_breakdown[rating] || 0;
              const percentage = stats.total_review > 0 ? (count / stats.total_review) * 100 : 0;
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </Card>
);

export default EventReviewStats; 