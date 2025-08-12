'use client';

import React from 'react';
import SpecialOfferCard from '../cards/SpecialOfferCard';

const SpecialOffersSection: React.FC = () => {
  const offers = [
    {
      discount: "SAVE 20%",
      discountBgColor: "yellow-100",
      discountTextColor: "yellow-800",
      borderColor: "yellow-500",
      title: "Early Bird Special",
      description: "Book at least 7 days in advance and get 20% off on any tour package.",
      validity: "Valid until April 30, 2025",
      code: "EARLY20"
    },
    {
      discount: "FAMILY DEAL",
      discountBgColor: "green-100",
      discountTextColor: "green-800",
      borderColor: "green-500",
      title: "Family Package",
      description: "Kids under 6 years go free with two paying adults. Includes lunch for everyone.",
      validity: "Valid for all bookings in 2025",
      code: "FAMILY"
    },
    {
      discount: "GROUP DISCOUNT",
      discountBgColor: "purple-100",
      discountTextColor: "purple-800",
      borderColor: "purple-500",
      title: "Group Booking",
      description: "Book for 10 or more people and get 15% off the total price plus free hotel pickup.",
      validity: "Valid for bookings made before May 31, 2025",
      code: "GROUP15"
    },
    {
      discount: "LAST MINUTE",
      discountBgColor: "red-100",
      discountTextColor: "red-800",
      borderColor: "red-500",
      title: "Last Minute Deal",
      description: "25% off for bookings made within 48 hours of departure. Subject to availability.",
      validity: "Limited spots available daily",
      code: "LAST25"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Special Offers</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Take advantage of our limited-time offers and save on your next Coral Island adventure.</p>
        </div>
        <div className="flex overflow-x-auto pb-6 space-x-6">
          {offers.map((offer, index) => (
            <SpecialOfferCard
              key={index}
              {...offer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection; 