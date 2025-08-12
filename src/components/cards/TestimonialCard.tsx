'use client';

import React from 'react';

interface TestimonialCardProps {
  name: string;
  country: string;
  rating: number;
  text: string;
  package: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  country,
  rating,
  text,
  package: packageName,
  image
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-gray-600">{country}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          ></i>
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div className="bg-blue-50 rounded-lg p-3 inline-block">
        <span className="text-blue-600 font-semibold">{packageName}</span>
      </div>
    </div>
  );
};

export default TestimonialCard; 