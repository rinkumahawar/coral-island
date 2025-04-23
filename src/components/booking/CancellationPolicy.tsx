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
      <div className="text-gray-600 space-y-3">
        <div className="flex items-start">
          <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
          <p><span className="font-medium">Free cancellation</span> up to 24 hours before the scheduled tour</p>
        </div>
        <div className="flex items-start">
          <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
          <p>50% charge for cancellations made within 24 hours of the tour</p>
        </div>
        <div className="flex items-start">
          <i className="fas fa-times-circle text-red-500 mt-1 mr-3"></i>
          <p>No refund for no-shows or cancellations on the day of the tour</p>
        </div>
        <div className="flex items-start">
          <i className="fas fa-cloud-sun-rain text-purple-500 mt-1 mr-3"></i>
          <p>Full refund if tour is cancelled by operator due to weather conditions</p>
        </div>
        <div className="pt-2">
          <button
            onClick={onViewTerms}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            View full terms and conditions
          </button>
        </div>
      </div>
    </Card>
  );
};

export default CancellationPolicy; 