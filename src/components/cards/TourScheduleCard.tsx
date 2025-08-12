'use client';

import React from 'react';

interface ScheduleItem {
  icon: React.ReactNode;
  time: string;
}

interface TourScheduleCardProps {
  icon: React.ReactNode;
  title: string;
  scheduleItems: ScheduleItem[];
}

const TourScheduleCard: React.FC<TourScheduleCardProps> = ({
  icon,
  title,
  scheduleItems
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-3">
        {scheduleItems.map((item, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <div className="mr-3">
              {item.icon}
            </div>
            <span>{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourScheduleCard; 