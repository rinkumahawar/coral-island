import React from 'react';
import Button from '../base/Button';

interface ScheduleItem {
  time: string;
  activity: string;
  location?: string;
}

interface ScheduleCardProps {
  date: string;
  dayNumber: number;
  scheduleItems: ScheduleItem[];
  onViewDetails: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  date,
  dayNumber,
  scheduleItems,
  onViewDetails
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Day {dayNumber}</h3>
          <p className="text-gray-600">{date}</p>
        </div>
        <Button
          variant="secondary"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
      <div className="space-y-4">
        {scheduleItems.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="w-20 flex-shrink-0">
              <span className="text-gray-600 font-medium">{item.time}</span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{item.activity}</p>
              {item.location && (
                <p className="text-sm text-gray-600">{item.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard; 