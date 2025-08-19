'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomerForm from '@/components/forms/CustomerForm';
import PaymentMethodSelector from '@/components/forms/PaymentMethodSelector';
import CancellationPolicy from '@/components/booking/CancellationPolicy';
import BookingSummaryList from '@/components/booking/BookingSummaryList';
import ProgressBar from '@/components/common/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useBooking } from '@/contexts/BookingContext';
import { UserService } from '@/lib/api/services/user';
import { BookingService } from '@/lib/api/services/booking';
import { EventService } from '@/lib/api/services/event';
import PaymentModal from '@/components/booking/PaymentModal';
import { useForm, UseFormReturn } from 'react-hook-form';
import Toast from '@/components/base/Toast';
import { formatDateYMD } from '@/utils/timeUtils';

interface BookingDetails {
    title: string;
    date: string;
    time: string;
    adult_count: number; 
    adult_price: number;
    child_count: number;
    child_price: number;
    addons: Array<{
        name: string;
        price: number;
        quantity: number;
    }>;
}

const CheckoutPage: React.FC = () => {
    const router = useRouter();
    const { bookingData, clearBookingData } = useBooking();
    
    // Form state
    const [paymentMethod, setPaymentMethod] = useState<'omise'>('omise');
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [bookingCode, setBookingCode] = useState<string>('');
    const [processing, setProcessing] = useState(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);

    // Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('error');

    // React Hook Form instance in parent
    const form = useForm({ mode: 'all' });

    // Get booking details from context
    const [bookingDetails, setBookingDetails] = useState<BookingDetails | undefined>(undefined);
    const [loadingEvent, setLoadingEvent] = useState(false);

    // Loading states for API calls
    const [isCreatingBooking, setIsCreatingBooking] = useState(false);

    // Utility function to decode base64 customer ID
    const decodeCustomerId = (encodedId: any): number | undefined => {
        if (!encodedId) return undefined;
        
        try {
            // Check if it's already a number
            if (typeof encodedId === 'number') {
                return encodedId;
            }
            
            // Check if it's a string that might be base64 encoded
            if (typeof encodedId === 'string') {
                // Try to decode base64
                const decoded = atob(encodedId);
                const parsed = parseInt(decoded, 10);
                if (!isNaN(parsed)) {
                    return parsed;
                }
                
                // If base64 decode fails, try parsing as number directly
                const directParsed = parseInt(encodedId, 10);
                if (!isNaN(directParsed)) {
                    return directParsed;
                }
            }
            
            return undefined;
        } catch (error) {
            console.warn('Failed to decode customer ID:', encodedId, error);
            return undefined;
        }
    };

    // Fetch event details
    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoadingEvent(true);
            try {
                await EventService.getEventDetails();
            } catch (error) {
                console.error('Error fetching event details:', error);
                setToastMessage('Failed to load event details');
                setToastType('error');
                setShowToast(true);
            } finally {
                setLoadingEvent(false);
            }
        };

        fetchEventDetails();
    }, []);

    // Update booking details from context
    useEffect(() => {
        if (bookingData) {
            setBookingDetails({
                title: bookingData.ticket?.title || "",
                date: new Date(bookingData.booking_date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                time: bookingData.timeslot,
                adult_count: bookingData.adult_count,
                adult_price: bookingData.adult_price,
                child_count: bookingData.child_count,
                child_price: bookingData.child_price,
                addons: bookingData.addons
                    .filter(addon => addon.selected)
                    .map(addon => ({
                        name: addon.name,
                        price: addon.price,
                        quantity: addon.quantity
                    }))
            });
        } else {
            // If no booking data, redirect back to tickets page
            router.push('/tickets');
        }
    }, [bookingData, router]);

    // Calculate totals
    const adultTotal = (bookingDetails?.adult_count || 0) * (bookingDetails?.adult_price || 0);
    const childTotal = (bookingDetails?.child_count || 0) * (bookingDetails?.child_price || 0);
    const addonTotal = bookingDetails?.addons.reduce((total, addon) => total + (addon.price * addon.quantity), 0) || 0;
    const subtotal = adultTotal + childTotal + addonTotal;

    // Event handlers
    const handleConfirmBooking = async () => {
        setSummaryError(null);
        setProcessing(true);
        setIsCreatingBooking(true);
        
        const valid = await form.trigger();
        if (!valid) {
            setProcessing(false);
            setIsCreatingBooking(false);
            setToastMessage('Please fill in all required customer details.');
            setToastType('error');
            setShowToast(true);
            return;
        }
        
        // Additional manual validation for phone field
        const phoneValue = form.getValues('phone');
        if (!phoneValue || phoneValue.trim() === '') {
            form.setError('phone', { type: 'required', message: 'Phone number is required' });
            setProcessing(false);
            setIsCreatingBooking(false);
            setToastMessage('Please fill in all required customer details.');
            setToastType('error');
            setShowToast(true);
            return;
        }
        
        const formData = form.getValues();
        try {
            // 1. Call vendor signup API
            const [firstName, ...lastNameParts] = formData.name.trim().split(' ');
            const lastName = lastNameParts.join(' ') || '-';
            const signupRes = await UserService.vendorSignup({
                first_name: firstName,
                last_name: lastName,
                email: formData.email,
                phonecode: formData.phoneCountryCode || '+66',
                phone: formData.phone
            });
            let customerId: number | undefined = undefined;
            if (signupRes.success && signupRes.data && signupRes.data.id) {
                customerId = decodeCustomerId(signupRes.data.id);
            }
            
            // 2. Call booking create API
            const bookingRes = await BookingService.createBooking({
                event_id: Number(bookingData?.event_id) || 1,
                ticket_id: bookingData?.ticket?.id || 1,
                start_date: formatDateYMD(bookingData?.booking_date || ''),
                timeslot_id: bookingData?.timeslot_id || 1,
                timeslot: bookingData?.timeslot || '',
                adult_count: bookingData?.adult_count || 0,
                child_count: bookingData?.child_count || 0,
                extra_price: (bookingData?.addons || []).map(addon => ({
                    name: addon.name,
                    enable: addon.selected ? 'true' : 'false',
                    number: addon.quantity || 0
                })),
                grand_total: adultTotal + childTotal + addonTotal,
                customer_id: customerId || 0,
                customer: {
                    name: formData.name,
                    email: formData.email,
                    phone: Number(formData.phone) || 0,
                    country_code: Number(formData.phoneCountryCode?.replace('+', '') || '66'),
                    nationality: formData.nationality,
                    pickup_hotel_name: formData.hotelName,
                    airport: formData.airport || '',
                    messanger_type: 'whatsapp',
                    messanger_country_code: Number(formData.phoneCountryCode?.replace('+', '') || '66'),
                    messanger_type_no: Number(formData.phone) || 0
                }
            });
            
            if (!bookingRes.success) {
                setSummaryError(bookingRes.message || 'Booking creation failed.');
                setProcessing(false);
                setIsCreatingBooking(false);
                return;
            }
            
            setBookingCode(bookingRes.data?.booking_code);
            setIsCreatingBooking(false);
            setShowPaymentModal(true);
        } catch (err: any) {
            setSummaryError(err.message || 'Booking flow error.');
            setIsCreatingBooking(false);
        } finally {
            setProcessing(false);
        }
    };

    const handleOmiseError = (error: any) => {
        setPaymentError(error.message || 'Payment error.');
    };

    const handleBackToBooking = () => {
        // Clear booking data when going back
        clearBookingData();
        router.push('/tickets');
    };

    const steps = [
        { number: 1, label: 'Ticket Selection', status: 'completed' as const },
        { number: 2, label: 'Checkout', status: 'current' as const },
        { number: 3, label: 'Confirmation', status: 'upcoming' as const }
    ];

    if (!bookingDetails) return null;

    // Show loading state while fetching event details
    if (loadingEvent) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading event details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                    duration={3000}
                />
            )}
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12 pb-20 sm:pb-24">
                <ProgressBar steps={steps} currentStep={2} />   

                {/* Error Messages - Moved to top */}
                {summaryError && (
                    <div className="w-full max-w-7xl mx-auto mb-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                            <div className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-2 text-sm sm:text-base" />
                                <span className="text-red-700 text-sm sm:text-base font-medium">{summaryError}</span>
                            </div>
                        </div>
                    </div>
                )}
                {paymentError && (
                    <div className="w-full max-w-7xl mx-auto mb-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                            <div className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 mr-2 text-sm sm:text-base" />
                                <span className="text-red-700 text-sm sm:text-base font-medium">{paymentError}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8 lg:space-y-10">
                        <CustomerForm 
                            form={form as UseFormReturn<any>} 
                            onPhoneValidation={(isValid) => {
                                if (!isValid) {
                                    form.setError('phone', { type: 'required', message: 'Phone number is required' });
                                } else {
                                    form.clearErrors('phone');
                                }
                            }}
                        />
                        <PaymentMethodSelector
                            selectedMethod={paymentMethod as any}
                            onMethodSelect={setPaymentMethod}
                        />
                        <CancellationPolicy onViewTerms={() => {}} />
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-8">
                            <BookingSummaryList
                                selectedDate={bookingDetails.date}
                                selectedTime={bookingDetails.time}
                                selectedTicket={{
                                    id: 1,
                                    title: bookingDetails.title,
                                    adult_count: bookingDetails.adult_count,
                                    child_count: bookingDetails.child_count,
                                    adult_price: bookingDetails.adult_price,
                                    child_price: bookingDetails.child_price
                                }}
                                adultCount={bookingDetails.adult_count}
                                childCount={bookingDetails.child_count}
                                addons={bookingDetails.addons.map(addon => ({
                                    ...addon,
                                    selected: true,
                                    desc: '',
                                    type: '',
                                    available: true,
                                    image: '',
                                    tickets: []
                                }))}
                                couponDiscount={0}
                                onApplyCoupon={() => {}}
                                couponCode={''}
                                onCouponChange={() => {}}
                                couponError={''}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {showPaymentModal && paymentMethod === 'omise' && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    amount={subtotal}
                    bookingCode={bookingCode}
                    onPaymentSuccess={() => setShowPaymentModal(false)}
                    onPaymentError={() => setShowPaymentModal(false)}
                />
            )}

            {/* Fixed Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 py-2 sm:py-8 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-row justify-between items-center">
                        <button
                            onClick={handleBackToBooking}
                            disabled={processing || isCreatingBooking}
                            className={`w-auto px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                                processing || isCreatingBooking
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Back
                        </button>

                        <button
                            onClick={handleConfirmBooking}
                            disabled={processing || isCreatingBooking}
                            className={`w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-base ${
                                processing || isCreatingBooking
                                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {isCreatingBooking ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Booking...
                                </>
                            ) : processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
