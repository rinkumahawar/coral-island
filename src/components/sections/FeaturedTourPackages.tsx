'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faUsers, faBaby, faClock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Card from '../base/Card';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TicketDetails from './TicketDetails';
import '../../styles/html-content.css';
import { TicketData } from '@/lib/api/services/ticket';
import { formatMoney } from '@/lib/money-format';
import Image from 'next/image';



interface EventTicketsProps {
  tickets: TicketData[];
}

// Individual Ticket Card Component
const TicketCard: React.FC<{ ticket: TicketData }> = ({ ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const calculateDiscountPercentage = (originalPrice: string, salePrice: string) => {
    const original = parseFloat(originalPrice);
    const sale = parseFloat(salePrice);
    if (original > sale) {
      return Math.round(((original - sale) / original) * 100);
    }
    return 0;
  };

  const formatDuration = (duration: string) => {
    // Check if duration is just a number (minutes)
    if (/^\d+$/.test(duration)) {
      const minutes = parseInt(duration);
      if (minutes < 60) {
        return `${minutes}m`;
      } else if (minutes % 60 === 0) {
        return `${minutes / 60}h`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      }
    }
    
    // If it's already formatted (e.g., "2h 30m", "1.5h"), return as is
    return duration;
  };

  const renderStars = (rating: number, hasHalfStar?: boolean) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = hasHalfStar || rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faStar} 
          className="text-yellow-400"
        />
      );
    }

    if (hasHalf) {
      stars.push(
        <FontAwesomeIcon 
          key="half" 
          icon={faStarHalfAlt} 
          className="text-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <Card variant="default" className="p-0 [&>div:last-child]:p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/3 h-48 lg:h-60 overflow-hidden p-0 relative">
            <Link href={`/tickets/${ticket.slug}`} className="block w-full h-full">
              <Image
                src={ticket.image?.file_path || '/images/banner.jpg'}
                alt={ticket.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
            {ticket.price && ticket.sale_price && ticket.price !== ticket.sale_price && (
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-bold shadow-lg">
                  -{calculateDiscountPercentage(ticket.price, ticket.sale_price)}% OFF
                </span>
              </div>
            )}
            {ticket.duration && (
              <div className="absolute bottom-2 right-2 z-10">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium border border-blue-200 shadow-sm">
                  <FontAwesomeIcon icon={faClock} className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  {formatDuration(ticket.duration)}
                </span>
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="p-2 lg:p-3 flex-1 flex flex-col justify-between">
            <div>
              {/* Header with Title */}
              <div className="mb-2 lg:mb-1">
                <h3 className="text-base lg:text-xl font-semibold text-gray-800 leading-tight">{ticket.title}</h3>
              </div>
              
              {/* Rating Section */}
              {ticket.rating && (
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-2">
                    {renderStars(ticket.rating)}
                  </div>
                  <span className="text-xs lg:text-sm text-gray-600">
                    {ticket.rating} ({ticket.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
              
              {/* Includes and Excludes */}
              <div className="mb-1">
                <div className="flex flex-col lg:flex-row gap-2 relative">
                  {ticket.include && ticket.include.length > 0 && (
                    <div className="flex-1">
                      <h4 className="text-xs lg:text-sm font-semibold text-green-700 mb-2 flex items-center">
                        <span className="mr-1">✓</span> Includes:
                      </h4>
                      <div className="relative">
                        <div className="max-h-20 overflow-hidden">
                          <ul className="text-xs text-gray-600 space-y-1">
                            {ticket.include.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-green-500 mr-2 mt-0.5">•</span>
                                <span>{item.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {ticket.exclude && ticket.exclude.length > 0 && (
                    <div className="flex-1">
                      <h4 className="text-xs lg:text-sm font-semibold text-red-700 mb-2 flex items-center">
                        <span className="mr-1">✗</span> Excludes:
                      </h4>
                      <div className="relative">
                        <div className="max-h-20 overflow-hidden">
                          <ul className="text-xs text-gray-600 space-y-1">
                            {ticket.exclude.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-500 mr-2 mt-0.5">•</span>
                                <span>{item.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Gradient overlay for the entire flex container */}
                  {((ticket.include && ticket.include.length > 3) || (ticket.exclude && ticket.exclude.length > 3)) && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  )}
                </div>
                
                {/* Read More button after both sections */}
                  <div className="w-full sm:max-w-lg flex justify-end mt-1">
                    <button 
                      onClick={openModal}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      aria-label={`Read more details about ${ticket.title}`}
                    >
                      Read More
                    </button>
                  </div>
              </div>
            </div>
            
            {/* Bottom Section with Guest Info and Pricing */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              {/* Guest Info */}
              {ticket.guest_info && (
                <div className="flex flex-row gap-2 lg:gap-3 text-xs">
                  <div className="flex items-center bg-blue-50 px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
                    <FontAwesomeIcon icon={faUsers} className="mr-1 lg:mr-2 text-blue-600" />
                    <span className="text-gray-700"><strong>Adult:</strong> {ticket.guest_info.adult}</span>
                  </div>
                  <div className="flex items-center bg-green-50 px-2 py-1 lg:px-3 lg:py-2 rounded-lg">
                    <FontAwesomeIcon icon={faBaby} className="mr-1 lg:mr-2 text-green-600" />
                    <span className="text-gray-700"><strong>Child:</strong> {ticket.guest_info.child}</span>
                  </div>
                </div>
              )}
              
              {/* Pricing and Book Now Button */}
              <div className="flex flex-row sm:flex-col lg:flex-row sm:items-center gap-3 lg:gap-4 w-full sm:w-auto">
                <div className="flex flex-col items-start sm:items-end flex-1 sm:flex-none">
                  {ticket.price && ticket.sale_price && ticket.price !== ticket.sale_price && (
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="text-xs lg:text-sm text-gray-400 line-through">
                          {formatMoney(Number(ticket.price))}
                        </span>
                        <span className="text-xl lg:text-2xl font-bold text-green-600">
                          {formatMoney(Number(ticket.sale_price))}
                        </span>
                      </div>
                    </div>
                  )}
                  {(!ticket.sale_price || ticket.price === ticket.sale_price) && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl lg:text-2xl font-bold text-blue-600">
                        {formatMoney(Number(ticket.price))}
                      </span>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                  )}
                </div>
                <Link
                  href={`/booking/${ticket.slug}`}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 lg:py-3 lg:px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer text-center text-lg lg:text-base flex-1 sm:flex-none"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>

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
            <div className="flex min-h-full items-end md:items-center justify-center p-0 md:p-4 md:p-6">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel className="w-full bg-white shadow-xl transition-all flex flex-col md:max-w-4xl md:rounded-2xl md:h-[80vh] h-[85vh] rounded-t-3xl">
                  {/* Handle Bar - Mobile Only */}
                  <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                    <Dialog.Title as="h3" className="text-lg md:text-xl font-semibold text-gray-900">
                      {ticket.title} <span className="hidden md:inline">- Package Details</span>
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
                    <TicketDetails ticket={ticket} is_content={true} />
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

const EventTickets: React.FC<EventTicketsProps> = ({ tickets }) => {
  return (
    <section>
      <div className="container">
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center lg:text-left">{process.env.NEXT_PUBLIC_PAGE_NAME} Tickets</h2>
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-6">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventTickets; 