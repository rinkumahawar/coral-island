import React from 'react';
import Card from '../base/Card';

interface CancellationPolicyProps {
  onViewTerms: () => void;
}

const CancellationPolicy: React.FC<CancellationPolicyProps> = ({
  onViewTerms
}) => {
  return (
    <Card title="Cancellation Policy">
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
              <span className="font-medium text-green-700">Free cancellation</span> up to 72 hours before the scheduled tour
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base">50% charge for cancellations made within 48 hours of the tour</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base">No refund for no-shows or cancellations on the day of the tour</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-700 text-xs sm:text-sm lg:text-base">Full refund if tour is cancelled by operator due to weather conditions</p>
          </div>
        </div>

        <div className="pt-3 sm:pt-4 border-t border-gray-200">
          <button
            onClick={onViewTerms}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex items-center space-x-1 text-xs sm:text-sm lg:text-base"
          >
            <span>View full terms and conditions</span>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CancellationPolicy; 