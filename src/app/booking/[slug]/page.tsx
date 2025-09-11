'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faPlusCircle, 
  faCheckCircle, 
  faCheck, 
  faArrowLeft, 
  faArrowRight, 
  faCreditCard, 
  faExclamationCircle 
} from '@fortawesome/free-solid-svg-icons';
import DateTimeSelection from '@/components/booking/DateTimeSelection';
import { convertTo12HourFormat } from '@/utils/timeUtils';
import { EventService, AvailabilityItem } from '@/lib/api/services/event';
import PaxSelection from '@/components/booking/PaxSelection';
import AddOnSelection from '@/components/booking/AddOnSelection';
import BookingSummaryList from '@/components/booking/BookingSummaryList';
import { useBooking, BookingData } from '@/contexts/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EventData, TicketData, TicketService } from '@/lib/api/services/ticket';
import { ApiError } from '@/lib/api/types';
import FormatMoney from '@/components/common/FormatMoney';



interface TimeSlot {
  id: number;
  time: string;
  adult_price: string;
  child_price: string;
}

interface ExtraPrice {
  name: string;
  desc: string;
  price: number;
  type: string;
  available: boolean;
  image: string;
  selected: boolean;
  quantity: number;
  tickets: Array<string>;
}

interface SelectedTicket {
  id: number;
  title: string;
  adult_count: number;
  child_count: number;
  adult_price: number;
  child_price: number;
}

interface GuestInfo {
  adult: string;
  child: string;
}

type BookingStep = 'datetime' | 'addons' | 'summary';

const BookingPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [extraPrice, setExtraPrice] = useState<ExtraPrice[] | null>(null);
  const [addonOptions, setAddonOptions] = useState<ExtraPrice[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTimeObject, setSelectedTimeObject] = useState<TimeSlot | null>();
  const [timeSlots, setTimeSlots] = useState<Array<{ time: string; time_12: string }>>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [availabilityCache, setAvailabilityCache] = useState<Record<string, AvailabilityItem>>({});
  const [adultCount, setAdultCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);
  const [totalGuests, setTotalGuests] = useState<number>(0);
  const [selectedTicket, setSelectedTicket] = useState<SelectedTicket | null>(null);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const { setBookingData, updateBookingData } = useBooking();
  const [currentStep, setCurrentStep] = useState<BookingStep>('datetime');

  // Progress steps configuration
  const steps = [
    { id: 'datetime', label: 'Date, Time & Guests', icon: faCalendar },
    { id: 'addons', label: 'Add-ons', icon: faPlusCircle },
    { id: 'summary', label: 'Review', icon: faCheckCircle }
  ];

  // Filter steps based on available add-ons
  const getFilteredSteps = () => {
    if (!ticket || !addonOptions) return steps;
    
    const availableAddons = addonOptions.filter(addon => addon.tickets.includes(ticket.id.toString()));
    
    if (availableAddons.length === 0) {
      return steps.filter(step => step.id !== 'addons');
    }
    
    return steps;
  };

  const filteredSteps = getFilteredSteps();

  useEffect(() => {
    setTotalGuests(adultCount + childCount);
  }, [adultCount, childCount]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const ticketSlug = params['slug'] as string;
        const ticketResponse = await TicketService.getTicketDetails(ticketSlug);
        setEventData(ticketResponse?.event ?? null);
        
        // Find the ticket by slug
        if (ticketResponse) {
          setTicket(ticketResponse);
          if(ticketResponse.time_slots) {
            setTimeSlots(ticketResponse.time_slots.map(slot => {
              const converted = convertTo12HourFormat(slot.time);
              return converted;
            }));
          }
          setGuestInfo({
            adult: "Adult",
            child: "Child"
          });
          
          if (ticketResponse.event?.extra_price) {
            const extra_prices = ticketResponse.event.extra_price.map(item => ({
                ...item,
                selected: false,
                quantity: 0
            }));
            setExtraPrice(extra_prices as ExtraPrice[]);
            setAddonOptions(extra_prices as ExtraPrice[]);
          }
        } else {
          setError('Ticket not found');
        }
      } catch (err: any) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [params]);

  // Fetch availability for a given month range
  const fetchAvailabilityForMonth = async (dateInMonth: Date) => {
    if (!ticket) return;
    const year = dateInMonth.getFullYear();
    const month = dateInMonth.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    try {
      const data = await EventService.getAvailability({
        id: ticket.id,
        start: fmt(start),
        end: fmt(end)
      });
      const nextCache: Record<string, AvailabilityItem> = { ...availabilityCache };
      const nextDates: string[] = [...availableDates];
      const nextBlocked: string[] = [...blockedDates];
      data.forEach(item => {
        const key = item.start;
        nextCache[key] = item;
        if (item.active === 1) {
          if (!nextDates.includes(key)) nextDates.push(key);
        } else {
          const idx = nextDates.indexOf(key);
          if (idx !== -1) nextDates.splice(idx, 1);
          if (!nextBlocked.includes(key)) nextBlocked.push(key);
        }
      });
      setAvailabilityCache(nextCache);
      setAvailableDates(nextDates);
      setBlockedDates(nextBlocked);
    } catch (e) {
      // Non-blocking
      console.warn('Failed to load availability', e);
    }
  };

  // Initial availability load for the current month once ticket is set
  useEffect(() => {
    if (ticket) {
      fetchAvailabilityForMonth(new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setSelectedTimeObject(null);
    updateBookingData({ booking_date: date, timeslot: '' });

    // Populate time slots from availability if present
    const day = availabilityCache[date];
    if (day && day.ticket_types && day.ticket_types.length > 0) {
      const updatedTimeSlots = day.ticket_types.map(
        (t) => ({
          id: t.id,
          time: t.time_24,
          adult_price: String(t.adult_price),
          child_price: String(t.child_price)
        })
      );
      setTicket(prev => prev ? { ...prev, time_slots: updatedTimeSlots } : prev);
      const mapped = day.ticket_types
        .filter(t => !t.disabled)
        .map(t => ({ time: t.time_24, time_12: t.time }));
      setTimeSlots(mapped);
    } else if (ticket?.time_slots) {
      setTimeSlots(ticket.time_slots.map(slot => convertTo12HourFormat(slot.time)));
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    const timeSlot = ticket?.time_slots.find(slot => slot.time === time);
    setSelectedTimeObject(timeSlot);
    setAdultCount(ticket?.min_guest ?? 1);

    updateBookingData({ 
      timeslot: time,
      adult_count: ticket?.min_guest ?? 1
    });
  };

  const handleMonthChange = (visibleMonth: Date) => {
    fetchAvailabilityForMonth(visibleMonth);
  };

  const handlePaxIncrement = (type: 'adult' | 'child') => {
    const maxPax = ticket?.max_guest ?? 1;
    const totalGuests = adultCount + childCount;
    
    if (type === 'adult') {
      if (adultCount < maxPax) {
        const newCount = adultCount + 1;
        setAdultCount(newCount);
        updateBookingData({ adult_count: newCount });
      } else {
        setToastMessage(`Maximum ${maxPax} adults allowed`);
        setToastType('error');
        setShowToast(true);
      }
    } else if (type === 'child') {
      if (childCount < maxPax && totalGuests < maxPax) {
        const newCount = childCount + 1;
        setChildCount(newCount);
        updateBookingData({ child_count: newCount });
      } else {
        setToastMessage(`Maximum ${maxPax} total guests allowed`);
        setToastType('error');
        setShowToast(true);
      }
    }
  };

  const handlePaxDecrement = (type: 'adult' | 'child') => {
    const minPax = ticket?.min_guest ?? 1;
    
    if (type === 'adult') {
      if (adultCount > minPax) {
        const newCount = adultCount - 1;
        setAdultCount(newCount);
        updateBookingData({ adult_count: newCount });
      } else {
        setToastMessage(`Minimum ${minPax} adults required`);
        setToastType('error');
        setShowToast(true);
      }
    } else if (type === 'child') {
      if (childCount > 0) {
        const newCount = childCount - 1;
        setChildCount(newCount);
        updateBookingData({ child_count: newCount });
      } else {
        setToastMessage(`Children count cannot be less than 0`);
        setToastType('error');
        setShowToast(true);
      }
    }
  };

  const handleAddonToggle = (name: string) => {
    setAddonOptions(prev => prev?.map(item => 
      item.name === name ? { ...item, selected: !item.selected, quantity: 1 } : item
    ) ?? null);

    if (addonOptions) {
      const updatedAddons = addonOptions.map(item => 
        item.name === name ? { ...item, selected: !item.selected, quantity: 1 } : item
      );
      updateBookingData({ addons: updatedAddons });
    }
  };

  const handleAddonQuantityChange = (name: string, change: number) => {
    setAddonOptions(prev => prev?.map(item => {
      const quantity = Math.max(0, ((item.quantity || 0) + change));
      if(quantity > totalGuests) {
        setToastMessage(`Maximum ${totalGuests} guests allowed`);
        setToastType('error');
        setShowToast(true);
        return item;
      } else {
        return item.name === name ? { ...item, quantity: quantity, selected: quantity > 0 } : item;
      }
    }) ?? null);

    if (addonOptions) {
      const updatedAddons = addonOptions.map(item => {
        const quantity = Math.max(0, ((item.quantity || 0) + change));
        if(quantity > totalGuests) {
          return item;
        } else {
          return item.name === name ? { ...item, quantity: quantity, selected: quantity > 0 } : item;
        }
      });
      updateBookingData({ addons: updatedAddons });
    }
  };

  const handleNextStep = () => {
    const currentStepIndex = filteredSteps.findIndex(step => step.id === currentStep);
    if (currentStepIndex < filteredSteps.length - 1) {
      setCurrentStep(filteredSteps[currentStepIndex + 1].id as BookingStep);
    }
  };

  const handlePreviousStep = () => {
    const currentStepIndex = filteredSteps.findIndex(step => step.id === currentStep);
    if (currentStepIndex > 0) {
      setCurrentStep(filteredSteps[currentStepIndex - 1].id as BookingStep);
    }
  };

  const handleStepClick = (stepId: BookingStep) => {
    const currentStepIndex = filteredSteps.findIndex(step => step.id === currentStep);
    const targetStepIndex = filteredSteps.findIndex(step => step.id === stepId);
    
    if (targetStepIndex <= currentStepIndex) {
      setCurrentStep(stepId);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 'datetime':
        return selectedDate !== '' && selectedTime !== '' && adultCount > 0;
      case 'addons':
        if (!filteredSteps.find(step => step.id === 'addons')) {
          return true;
        }
        return true;
      case 'summary':
        return true;
      default:
        return false;
    }
  };

  const canNavigateToStep = (stepId: BookingStep) => {
    const currentStepIndex = filteredSteps.findIndex(step => step.id === currentStep);
    const targetStepIndex = filteredSteps.findIndex(step => step.id === stepId);
    
    if (targetStepIndex <= currentStepIndex) {
      return true;
    }
    
    if (targetStepIndex === currentStepIndex + 1) {
      return canProceedToNextStep();
    }
    
    return false;
  };

  const getStepValidationMessage = () => {
    switch (currentStep) {
      case 'datetime':
        if (!selectedDate) return 'Please select a date';
        if (!selectedTime) return 'Please select a time';
        if (adultCount === 0) return 'Please select at least one adult';
        return '';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (ticket && selectedTimeObject) {
      setSelectedTicket({
        id: ticket.id,
        title: ticket.title,
        adult_count: adultCount,
        child_count: childCount,
        adult_price: parseFloat(selectedTimeObject.adult_price || '0'),
        child_price: parseFloat(selectedTimeObject.child_price || '0')
      });
    }
  }, [ticket, adultCount, childCount, selectedTimeObject]);

  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTime || !selectedTicket || !ticket) {
      setToastMessage('Please complete all required selections to continue');
      setToastType('error');
      setShowToast(true);
      return;
    }
    const bookingData: BookingData = {
      event_id: eventData?.id ?? 1,
      booking_date: selectedDate,
      timeslot_id: selectedTimeObject?.id ?? 1,
      timeslot: selectedTime,
      ticket: ticket,
      adult_count: adultCount,
      child_count: childCount,
      adult_price: parseFloat(selectedTimeObject?.adult_price || '0'),
      child_price: parseFloat(selectedTimeObject?.child_price || '0'),
      addons: addonOptions?.filter(addon => addon.selected) || [],
      total_guests: adultCount + childCount
    };

    setBookingData(bookingData);
            router.push('/checkout');
  };

  const calculateTotalPrice = () => {
    if (!selectedTicket || !selectedTimeObject) return 0;
    
    const adultTotal = adultCount * parseFloat(selectedTimeObject.adult_price || '0');
    const childTotal = childCount * parseFloat(selectedTimeObject.child_price || '0');
    
    const addonTotal = addonOptions?.reduce((total, addon) => {
      if (addon.selected && addon.quantity > 0) {
        return total + (addon.price * addon.quantity);
      }
      return total;
    }, 0) || 0;
    
    return adultTotal + childTotal + addonTotal;
  };

  const calculateSubtotal = () => {
    if (!selectedTimeObject) return 0;
    
    const adultTotal = adultCount * parseFloat(selectedTimeObject.adult_price || '0');
    const childTotal = childCount * parseFloat(selectedTimeObject.child_price || '0');
    
    return adultTotal + childTotal;
  };

  const calculateAddonTotal = () => {
    return addonOptions?.reduce((total, addon) => {
      if (addon.selected && addon.quantity > 0) {
        return total + (addon.price * addon.quantity);
      }
      return total;
    }, 0) || 0;
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'datetime':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Date & Time Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Select Date & Time</h2>
                <p className="text-xs sm:text-base text-gray-600">Choose when you'd like to visit</p>
              </div>
              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                availableTimeSlots={timeSlots}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
                onMonthChange={handleMonthChange}
                availableDates={availableDates}
                blockedDates={blockedDates}
                selectedTicket={ticket as any}
                adultCount={adultCount}
                childCount={childCount}
              />
            </div>

            {/* Guest Selection Section */}
            <div className="space-y-4 sm:space-y-6">
              <PaxSelection
                adultCount={adultCount}
                childCount={childCount}
                adultPrice={parseFloat(selectedTimeObject?.adult_price || '0')}
                childPrice={parseFloat(selectedTimeObject?.child_price || '0')}
                onPaxIncrement={handlePaxIncrement}
                onPaxDecrement={handlePaxDecrement}
                disabled={!selectedTimeObject}
                guestInfo={guestInfo as GuestInfo}
              />
            </div>
          </div>
        );

      case 'addons':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Add-ons & Extras</h2>
              <p className="text-xs sm:text-base text-gray-600">Enhance your experience with additional services (optional)</p>
            </div>
            <AddOnSelection
              addons={addonOptions || []}
              selectedTicket={ticket?.id.toString() || ''}
              totalGuests={totalGuests}
              onAddonToggle={handleAddonToggle}
              onAddonQuantityChange={handleAddonQuantityChange}
              disabled={!selectedTimeObject}
            />
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Review Your Booking</h2>
              <p className="text-xs sm:text-base text-gray-600">Please review your selections before proceeding to checkout</p>
            </div>
            <BookingSummaryList 
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedTicket={selectedTicket as SelectedTicket}
              adultCount={adultCount}
              childCount={childCount}
              addons={addonOptions || []}
              couponDiscount={0}
              onApplyCoupon={() => {}}
              couponCode={''}
              onCouponChange={() => {}}
              couponError={''}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading booking options...</p>
        </div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket not found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested ticket could not be found.'}</p>
          <button 
            onClick={() => router.push('/tickets')} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/booking/${params['slug']}`} />
      </Head>
      {/* Toast Message */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 left-4 sm:left-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 animate-fade-in-out ${toastType === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white text-xs sm:text-sm`}
        >
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={toastType === 'error' ? faExclamationCircle : faCheck} 
              className="mr-2" 
            />
            {toastMessage}
          </div>
        </div>
      )}

      <Header />

      <main className="w-full px-2 sm:px-6 py-2 sm:py-6 lg:py-8">
        {/* Progress Steps */}
        <div className="mb-4 sm:mb-8 w-full">
          <div className="flex items-center justify-center space-x-4 sm:space-x-2 lg:space-x-4 mb-2 sm:mb-6 overflow-x-auto pb-2 w-full">
            {filteredSteps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = filteredSteps.findIndex(s => s.id === currentStep) > index;
              const isClickable = canNavigateToStep(step.id as BookingStep);

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleStepClick(step.id as BookingStep)}
                    disabled={!isClickable}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : isCompleted
                        ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
                        : isClickable
                        ? 'bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <FontAwesomeIcon icon={faCheck} className="text-base sm:text-lg lg:text-xl" />
                    ) : (
                      <FontAwesomeIcon icon={step.icon} className="text-base sm:text-lg lg:text-xl" />
                    )}
                  </button>
                  <button
                    onClick={() => handleStepClick(step.id as BookingStep)}
                    disabled={!isClickable}
                    className={`ml-1 sm:ml-2 lg:ml-3 text-xs sm:text-sm lg:text-base font-medium hidden sm:block transition-colors ${
                      isActive 
                        ? 'text-blue-600' 
                        : isCompleted 
                        ? 'text-green-600 hover:text-green-700 cursor-pointer' 
                        : isClickable
                        ? 'text-gray-500 hover:text-gray-700 cursor-pointer'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {step.label}
                  </button>
                  {index < filteredSteps.length - 1 && (
                    <div
                      className={`w-4 sm:w-6 lg:w-10 h-0.5 mx-1 sm:mx-2 lg:mx-3 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Message */}
        {getStepValidationMessage() && (
          <div className="w-full max-w-7xl mx-auto mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-2 text-sm sm:text-base" />
                <span className="text-red-700 text-sm sm:text-base font-medium">{getStepValidationMessage()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto pb-5 sm:pb-5">
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 lg:p-8">
            {renderCurrentStep()}
          </div>
        </div>

        {/* Fixed Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 py-2 sm:py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-row justify-between items-center">
              <button
                onClick={handlePreviousStep}
                disabled={currentStep === 'datetime'}
                className={`w-auto px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                  currentStep === 'datetime'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Previous
              </button>

              {currentStep === 'summary' ? (
                <button
                  onClick={handleProceedToCheckout}
                  className="w-auto px-4 sm:px-8 py-2 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-xs sm:text-base"
                >
                  <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  className={`w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                    canProceedToNextStep()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Price Calculation Section */}
        {(selectedTimeObject) && currentStep !== 'summary' && (
          <div className="w-full max-w-7xl mx-auto mt-4 sm:mt-6">
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Price Breakdown</h3>
              
              <div className="space-y-2 sm:space-y-3">
                {/* Ticket Prices */}
                {adultCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-base text-gray-600">
                      Adults ({adultCount} × <FormatMoney amount={Number(selectedTimeObject.adult_price)} />)
                    </span>
                    <span className="text-xs sm:text-base font-medium text-gray-800">
                      <FormatMoney amount={Number(adultCount * parseFloat(selectedTimeObject.adult_price || '0'))} />
                    </span>
                  </div>
                )}
                
                {childCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-base text-gray-600">
                      Children ({childCount} × <FormatMoney amount={Number(selectedTimeObject.child_price)} />)
                    </span>
                    <span className="text-xs sm:text-base font-medium text-gray-800">
                      <FormatMoney amount={Number(childCount * parseFloat(selectedTimeObject.child_price || '0'))} />
                    </span>
                  </div>
                )}

                {/* Add-ons */}
                {addonOptions?.map(addon => {
                  if (addon.selected && addon.quantity > 0) {
                    return (
                      <div key={addon.name} className="flex justify-between items-center">
                        <span className="text-xs sm:text-base text-gray-600">
                          {addon.name} ({addon.quantity} × <FormatMoney amount={Number(addon.price)} />)
                        </span>
                        <span className="text-xs sm:text-base font-medium text-gray-800">
                          <FormatMoney amount={Number(addon.price * addon.quantity)} />
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Subtotal */}
                {calculateSubtotal() > 0 && (
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-xs sm:text-base font-medium text-gray-700">Subtotal</span>
                                          <span className="text-xs sm:text-base font-medium text-gray-800">
                        <FormatMoney amount={Number(calculateSubtotal())} />
                      </span>
                  </div>
                )}

                {/* Add-ons Total */}
                {calculateAddonTotal() > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-base font-medium text-gray-700">Add-ons</span>
                                          <span className="text-xs sm:text-base font-medium text-gray-800">
                        <FormatMoney amount={Number(calculateAddonTotal())} />
                      </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center pt-2 sm:pt-3 border-t-2 border-gray-300">
                  <span className="text-base sm:text-xl font-bold text-gray-800">Total</span>
                  <span className="text-base sm:text-xl font-bold text-blue-600">
                    <FormatMoney amount={Number(calculateTotalPrice())} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>  
  );
};

export default BookingPage; 