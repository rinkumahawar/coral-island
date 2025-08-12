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
  eventDetails: {
    event: string;
    ticketType: string;
    date: string;
    time: string;
    adults: number;
    children: number;
    extraPrice: Array<{
      name: string;
      price: number;
      type: string;
      number: number;
      total: number;
      enable: string;
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
  eventDetails,
  customerDetails
}) => {
  return (
    <Card title="Booking Details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Event Information</h3>
          <div className="space-y-3">
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faBox} />
              </div>
              <div>
                <p className="text-gray-600">Ticket Type</p>
                <p className="font-medium">{eventDetails.ticketType}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-medium">{eventDetails.date}</p>
              </div>
            </div>
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-medium">{eventDetails.time}</p>
              </div>
            </div>
           
            <div className="flex">
              <div className="w-8 text-blue-600">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div>
                <p className="text-gray-600">Guests</p>
                <p className="font-medium">{eventDetails.adults} Adults, {eventDetails.children} Children</p>
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
      <h3 className="text-lg font-semibold mb-4 text-blue-800">Add-ons & Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventDetails.extraPrice.map((addon, index) => (
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
                <p className="text-sm text-gray-600">{addon.number} × ฿{addon.price.toLocaleString()}</p>
              </div>
              <div className="font-bold text-blue-700">
                ฿{addon.total.toLocaleString()}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default BookingDetails; 