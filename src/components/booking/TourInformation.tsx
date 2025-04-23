import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClock, 
    faRoute, 
    faCheckCircle, 
    faGift, 
    faTimesCircle, 
    faBan, 
    faExclamationCircle, 
    faInfo, 
    faCalendarTimes, 
    faShieldAlt, 
    faCheck, 
    faTimes 
} from '@fortawesome/free-solid-svg-icons';

interface ItineraryItem {
    time: string;
    activity: string;
}

interface TourInformationProps {
    selectedTicket: {
        itinerary: ItineraryItem[];
        inclusions: string[];
        exclusions: string[];
    };
}

const TourInformation: React.FC<TourInformationProps> = ({ selectedTicket }) => {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Tour Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Itinerary Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-blue-800">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
                            Itinerary
                        </h3>
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faRoute} className="text-white text-lg" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {selectedTicket.itinerary.map((item, index) => (
                            <div key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                                <div className="w-24 font-medium text-blue-700 text-sm">{item.time}</div>
                                <div className="flex-1 text-gray-600 text-sm">{item.activity}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's Included Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-green-800">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                            What's Included
                        </h3>
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faGift} className="text-white text-lg" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {selectedTicket.inclusions.map((item, index) => (
                            <div key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                                <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2 mt-1" />
                                <span className="text-gray-600 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What's Not Included Card */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6 border border-red-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-red-800">
                            <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />
                            Not Included
                        </h3>
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faBan} className="text-white text-lg" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {selectedTicket.exclusions.map((item, index) => (
                            <div key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                                <FontAwesomeIcon icon={faTimes} className="text-red-500 mr-2 mt-1" />
                                <span className="text-gray-600 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Notes Card */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-6 border border-yellow-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-yellow-800">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mr-2" />
                            Important Notes
                        </h3>
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faInfo} className="text-white text-lg" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Tour schedule may change depending on weather conditions
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Children under 4 years can join for free (without extra services)
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Bring swimwear, towel, sunscreen, and a change of clothes
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Additional water activities require separate payment
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Please inform us of any medical conditions or dietary requirements
                        </div>
                    </div>
                </div>

                {/* Cancellation Policy Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-purple-800">
                            <FontAwesomeIcon icon={faCalendarTimes} className="text-purple-500 mr-2" />
                            Cancellation Policy
                        </h3>
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-white text-lg" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Free cancellation up to 24 hours before the scheduled tour
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • 50% charge for cancellations made within 24 hours
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • No refund for no-shows or cancellations on the day of the tour
                        </div>
                        <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-gray-600">
                            • Full refund if tour is cancelled by operator due to weather conditions
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TourInformation; 