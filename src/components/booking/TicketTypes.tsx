import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface Ticket {
    name: string;
    adultPrice: number;
    childPrice: number;
    description: string;
    inclusions: string[];
    exclusions: string[];
    itinerary: { time: string; activity: string; }[];
}

interface TicketTypesProps {
    tickets: { [key: string]: Ticket };
    selectedTicket: string;
    onTicketSelect: (ticketId: string) => void;
}

const TicketTypes: React.FC<TicketTypesProps> = ({ tickets, selectedTicket, onTicketSelect }) => {
    return (
        <section id="tourPackages" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Tour Package</h2>
            <div className="space-y-4">
                {Object.entries(tickets).map(([id, ticket]) => (
                    <div
                        key={id}
                        className={`border-2 rounded-lg p-4 transition cursor-pointer ${
                            selectedTicket === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => onTicketSelect(id)}
                    >
                        <div className="flex items-start">
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">{ticket.name}</h3>
                                <p className="text-gray-600 mt-1">{ticket.description}</p>
                                <div className="mt-3 flex space-x-6">
                                    <div>
                                        <span className="block text-sm text-gray-500">Adult</span>
                                        <span className="font-semibold text-blue-600">฿{ticket.adultPrice.toLocaleString()}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-gray-500">Child</span>
                                        <span className="font-semibold text-blue-600">฿{ticket.childPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-4 flex items-center h-full">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    selectedTicket === id ? 'border-blue-500' : 'border-gray-300'
                                }`}>
                                    {selectedTicket === id && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TicketTypes; 