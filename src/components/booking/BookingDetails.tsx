import React from 'react';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faCalendarAlt, 
  faClock, 
  faUsers, 
  faUser, 
  faEnvelope, 
  faPhoneAlt, 
  faHotel,
  faParachuteBox,
  faWater,
  faShip,
  faUtensils,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

interface BookingDetailsProps {
  tourDetails: {
    package: string;
    date: string;
    time: string;
    adults: number;
    children: number;
    addons: Array<{
      name: string;
      price: number;
      count: number;
    }>;
  };
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    hotel: string;
    country: string;
  };
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  tourDetails,
  customerDetails
}) => {
  return (
    <Card title="Booking Details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Tour Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faBox} />
              </div>
              <div>
                <p className="text-gray-600">Package</p>
                <p className="font-medium">{tourDetails.package}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{tourDetails.date}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-medium">{tourDetails.time}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <p className="text-gray-600">Guests</p>
                <p className="font-medium">{tourDetails.adults} Adults, {tourDetails.children} Children</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Customer Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-medium">{customerDetails.name}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{customerDetails.email}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faPhoneAlt} />
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{customerDetails.phone}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faHotel} />
              </div>
              <div>
                <p className="text-gray-600">Hotel</p>
                <p className="font-medium">{customerDetails.hotel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Add-ons & Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tourDetails.addons.map((addon, index) => (
            <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                <FontAwesomeIcon icon={
                  index % 5 === 0 ? faParachuteBox :
                  index % 5 === 1 ? faWater :
                  index % 5 === 2 ? faShip :
                  index % 5 === 3 ? faUtensils :
                  faShieldAlt
                } />
              </div>
              <div className="flex-1">
                <p className="font-medium">{addon.name}</p>
                <p className="text-sm text-gray-600">{addon.count} × ฿{addon.price.toLocaleString()}</p>
              </div>
              <div className="font-bold text-blue-700">
                ฿{(addon.price * addon.count).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BookingDetails; 