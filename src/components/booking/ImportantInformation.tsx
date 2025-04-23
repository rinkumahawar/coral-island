import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShuttleVan, 
  faSuitcase, 
  faPhoneAlt, 
  faCheck 
} from '@fortawesome/free-solid-svg-icons';

interface ImportantInformationProps {
  pickupDetails: {
    hotel: string;
    time: string;
  };
  itemsToBring: string[];
  contactInfo: {
    support: {
      phone: string;
      email: string;
    };
    emergency: {
      phone: string;
      available: string;
    };
  };
}

const ImportantInformation: React.FC<ImportantInformationProps> = ({
  pickupDetails,
  itemsToBring,
  contactInfo
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Important Information</h3>
      
      <div className="space-y-6">
        {/* Pick-up Details */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            <FontAwesomeIcon icon={faShuttleVan} className="mr-2" />
            Pick-up Details
          </h4>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="mb-2">
              Our driver will pick you up from <span className="font-medium">{pickupDetails.hotel}</span> at <span className="font-medium">{pickupDetails.time}</span> on the day of your tour.
            </p>
            <p>Please be ready in the hotel lobby 15 minutes before the scheduled pick-up time.</p>
          </div>
        </div>
        
        {/* What to Bring */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
            What to Bring
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {itemsToBring.map((item, index) => (
              <li key={index} className="flex items-center">
                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold text-blue-800 mb-2">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium mb-1">Customer Support</p>
              <p>{contactInfo.support.phone}</p>
              <p>{contactInfo.support.email}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="font-medium text-red-700 mb-1">Emergency Contact</p>
              <p>{contactInfo.emergency.phone}</p>
              <p className="text-sm text-gray-600">{contactInfo.emergency.available}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantInformation; 