'use client';

import React from 'react';
import TourScheduleCard from '../cards/TourScheduleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun,
  faUmbrellaBeach,
  faUtensils,
  faMoon,
  faClock,
  faShip,
  faMapMarkerAlt,
  faWater,
  faFish,
  faCamera,
  faHamburger,
  faCoffee,
  faUmbrella,
  faBuilding,
  faHotel
} from '@fortawesome/free-solid-svg-icons';

const TourScheduleSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Tour Schedule</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Plan your perfect day at Coral Island with our organized tour schedule.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TourScheduleCard
            icon={<FontAwesomeIcon icon={faSun} className="text-blue-600" />}
            title="Morning Departure"
            scheduleItems={[
              { icon: <FontAwesomeIcon icon={faClock} />, time: "10:00 - Hotel pickup" },
              { icon: <FontAwesomeIcon icon={faShip} />, time: "10:30 - Speedboat departure" },
              { icon: <FontAwesomeIcon icon={faMapMarkerAlt} />, time: "11:15 - Arrive at Coral Island" }
            ]}
          />
          <TourScheduleCard
            icon={<FontAwesomeIcon icon={faUmbrellaBeach} className="text-yellow-500" />}
            title="Activities"
            scheduleItems={[
              { icon: <FontAwesomeIcon icon={faWater} />, time: "11:30 - Water activities begin" },
              { icon: <FontAwesomeIcon icon={faFish} />, time: "13:00 - Snorkeling session" },
              { icon: <FontAwesomeIcon icon={faCamera} />, time: "14:00 - Photo opportunities" }
            ]}
          />
          <TourScheduleCard
            icon={<FontAwesomeIcon icon={faUtensils} className="text-red-500" />}
            title="Lunch Break"
            scheduleItems={[
              { icon: <FontAwesomeIcon icon={faHamburger} />, time: "14:30 - Buffet lunch" },
              { icon: <FontAwesomeIcon icon={faCoffee} />, time: "15:00 - Rest & refreshments" },
              { icon: <FontAwesomeIcon icon={faUmbrella} />, time: "15:30 - Beach relaxation" }
            ]}
          />
          <TourScheduleCard
            icon={<FontAwesomeIcon icon={faMoon} className="text-purple-600" />}
            title="Return Journey"
            scheduleItems={[
              { icon: <FontAwesomeIcon icon={faShip} />, time: "16:00 - Depart island" },
              { icon: <FontAwesomeIcon icon={faBuilding} />, time: "16:45 - Arrive at pier" },
              { icon: <FontAwesomeIcon icon={faHotel} />, time: "17:00 - Hotel drop-off" }
            ]}
          />
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">* Schedule may vary slightly based on weather conditions and season</p>
          <a
            href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
            data-readdy="true"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-button transition duration-300 whitespace-nowrap cursor-pointer"
          >
            Book This Tour
          </a>
        </div>
      </div>
    </section>
  );
};

export default TourScheduleSection; 