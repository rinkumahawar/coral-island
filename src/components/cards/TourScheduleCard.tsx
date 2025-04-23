import React from 'react';
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

// Map of icon names to Font Awesome icons
const iconMap: { [key: string]: any } = {
  'fas fa-sun': faSun,
  'fas fa-umbrella-beach': faUmbrellaBeach,
  'fas fa-utensils': faUtensils,
  'fas fa-moon': faMoon,
  'far fa-clock': faClock,
  'fas fa-ship': faShip,
  'fas fa-map-marker-alt': faMapMarkerAlt,
  'fas fa-water': faWater,
  'fas fa-fish': faFish,
  'fas fa-camera': faCamera,
  'fas fa-hamburger': faHamburger,
  'fas fa-coffee': faCoffee,
  'fas fa-umbrella': faUmbrella,
  'fas fa-building': faBuilding,
  'fas fa-hotel': faHotel
};

interface TourScheduleCardProps {
  icon: string;
  iconColor: string;
  title: string;
  scheduleItems: {
    icon: string;
    time: string;
  }[];
}

const TourScheduleCard: React.FC<TourScheduleCardProps> = ({
  icon,
  iconColor,
  title,
  scheduleItems
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className={`text-${iconColor} mb-4`}>
        <FontAwesomeIcon icon={iconMap[icon]} className="text-4xl" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <ul className="space-y-3 text-gray-600">
        {scheduleItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <FontAwesomeIcon icon={iconMap[item.icon]} className="mr-2" />
            <span>{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourScheduleCard; 