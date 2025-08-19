import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTable, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import TicketDetails from '../sections/TicketDetails';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface EventTicket {
    id: number;
    title: string;
    price: string;
    sale_price: string;
    image: {
        file_path: string;
        id: number;
    };
    rating?: number;
    reviewCount?: number;
    min_guest: number | 1;
    max_guest: number | 1;
    time_slots: Array<{
        id: number;
        time: string;
        adult_price: string;
        child_price: string;
    }>;
    guest_info: {
        adult: string;
        child: string;
    };
}

// Import TicketData from the API service
import { TicketData } from '@/lib/api/services/ticket';

interface TicketTypesProps {
    tickets: { [key: string]: TicketData };
    selectedTicket?: string | null;
    onTicketSelect?: (ticketId: string) => void;
}

const TicketTypes: React.FC<TicketTypesProps> = ({ tickets, selectedTicket, onTicketSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicketForModal, setSelectedTicketForModal] = useState<any>(null);

    const openModal = (ticket: any) => {
        setSelectedTicketForModal(ticket);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTicketForModal(null);
    };

    return (
        <>
            <section id="tourPackages" className="bg-white rounded-lg sm:shadow-md p-0 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-6 gap-2 sm:gap-0 px-3 sm:px-0">
                    <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800">Select Your Ticket</h2>
                </div>
                <div className="space-y-2 sm:space-y-4">   
                    {Object.entries(tickets).map(([id, ticket]) => (
                        <div
                            key={id}
                            onClick={() => onTicketSelect?.(id)}
                            className={`border-2 rounded-lg transition cursor-pointer ${selectedTicket === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            {/* Ticket Selection Area */}
                            <div className="p-2 sm:p-4">
                                <div className="flex items-start">
                                    <div className="flex-1">
                                        <h3 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-800">{ticket.title}</h3>
                                        <div className="mt-2 sm:mt-3 flex items-center space-x-4 lg:space-x-6">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs sm:text-sm text-gray-500">Adult:</span>
                                                <span className="font-semibold text-blue-600 text-xs sm:text-base">฿{ticket.sale_price}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs sm:text-sm text-gray-500">Child:</span>
                                                <span className="font-semibold text-blue-600 text-xs sm:text-base">฿{ticket.sale_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-2 sm:ml-4 flex items-center h-full">
                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center ${selectedTicket === id ? 'border-blue-500' : 'border-gray-300'
                                            }`}>
                                            {selectedTicket === id && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-blue-500"></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Read More Button */}
                            <div className="border-t border-gray-200 p-2">
                                <div className="flex justify-end">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(ticket);
                                        }}
                                        className="text-xs sm:text-base text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                                        aria-label={`Read more details about ${ticket.title}`}
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Single Responsive Modal for Package Details */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="flex min-h-full items-center justify-center p-4 md:p-6">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 md:translate-y-full"
                                enterTo="opacity-100 scale-100 md:translate-y-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100 md:translate-y-0"
                                leaveTo="opacity-0 scale-95 md:translate-y-full"
                            >
                                <Dialog.Panel className="w-full max-w-4xl bg-white shadow-xl transition-all flex flex-col md:rounded-2xl md:h-[80vh] h-[85vh] rounded-t-3xl">
                                    {/* Handle Bar - Mobile Only */}
                                    <div className="md:hidden flex justify-center pt-3 pb-2">
                                        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                                    </div>
                                    
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                                        <Dialog.Title as="h3" className="text-lg md:text-xl font-semibold text-gray-900">
                                            {selectedTicketForModal?.title} <span className="hidden md:inline">- Package Details</span>
                                        </Dialog.Title>
                                        <button
                                            onClick={closeModal}
                                            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                                            aria-label="Close modal"
                                        >
                                            <XMarkIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
                                        </button>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 overflow-y-auto p-4 md:p-6">
                                        {selectedTicketForModal && <TicketDetails ticket={selectedTicketForModal} is_content={true} />}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default TicketTypes; 