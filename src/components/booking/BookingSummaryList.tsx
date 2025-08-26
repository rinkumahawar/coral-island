import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import FormatMoney from '@/components/common/FormatMoney';

interface ExtraPrice {
    name: string;
    desc: string;
    price: number;
    type: string;
    available: boolean;
    image: string;
    selected: boolean;
    quantity: number;
    tickets: Array<string>; // array of ticket ids
}

interface BookingSummaryListProps {
    selectedDate: string;
    selectedTime: string;
    selectedTicket: {
        id: number;
        title: string;
        adult_count: number;
        child_count: number;
        adult_price: number;
        child_price: number;
    };
    adultCount: number;
    childCount: number;
    addons: ExtraPrice[];
    couponDiscount: number;
    onApplyCoupon: () => void;
    couponCode: string;
    onCouponChange: (code: string) => void;
    couponError?: string;
    onProceedToCheckout?: () => void;
}

const BookingSummaryList: React.FC<BookingSummaryListProps> = ({
    selectedDate,
    selectedTime,
    selectedTicket,
    adultCount,
    childCount,
    addons,
    couponDiscount,
    onApplyCoupon,
    couponCode,
    onCouponChange,
    couponError,
    onProceedToCheckout
}) => {
    const calculateSubtotal = () => {
        if (!selectedTicket || !selectedTicket.adult_price || !selectedTicket.child_price) {
            return 0;
        }
        const ticketTotal = (selectedTicket.adult_price * (adultCount || 0)) + (selectedTicket.child_price * (childCount || 0));
        const addonTotal = addons.reduce((total, addon) => {
            if (addon.selected) {
                return total + (addon.price || 0) * (addon.quantity || 0);
            }
            return total;
        }, 0);
        return ticketTotal + addonTotal;
    };

    const subtotal = calculateSubtotal();

    const handleProceedToCheckout = () => {
        if (onProceedToCheckout) {
            onProceedToCheckout();
        }
    };

    return (
        <div className="bg-white rounded-lg sm:shadow-md p-3 sm:p-6 lg:sticky lg:top-6 booking-summary-container">
            <h2 className="text-base sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6">Booking Summary</h2>
            {(!selectedDate || !selectedTime || !selectedTicket) ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-3 sm:mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs sm:text-sm text-yellow-700">
                                Please select a date, time, and ticket to continue.
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="space-y-2 sm:space-y-4 mb-3 sm:mb-6">
                <div className="flex justify-between">
                    <span className="text-xs sm:text-base font-medium">{selectedTicket?.title || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs sm:text-base text-gray-600">Date:</span>
                    <span className="text-xs sm:text-base font-medium">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) : 'Not selected'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs sm:text-base text-gray-600">Time:</span>
                    <span className="text-xs sm:text-base font-medium">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs sm:text-base text-gray-600">Adults:</span>
                    <span className="text-xs sm:text-base font-medium">{adultCount || 0} × <FormatMoney amount={Number(selectedTicket?.adult_price)} /></span>
                </div>
                {childCount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-xs sm:text-base text-gray-600">Children:</span>
                        <span className="text-xs sm:text-base font-medium">{childCount} × <FormatMoney amount={Number(selectedTicket?.child_price)} /></span>
                    </div>
                )}
                {addons.some(addon => addon.selected) && ( 
                    <div className="pt-2">
                        <span className="text-xs sm:text-base text-gray-600 font-medium">Selected Add-ons:</span>
                        <ul className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
                            {addons.filter(addon => addon.selected).map(addon => (
                                <li key={addon.name} className="flex justify-between">
                                    <span className="text-xs sm:text-base text-gray-600">- {addon.name} (x{addon.quantity || 0})</span>
                                    <span className="text-xs sm:text-base font-medium"><FormatMoney amount={Number((addon.price || 0) * (addon.quantity || 0))} /></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 pt-2 sm:pt-4">
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-lg text-gray-800">Subtotal:</span>
                        <span className="text-sm sm:text-lg text-gray-800"><FormatMoney amount={Number(subtotal)} /></span>
                    </div>
                    {couponDiscount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                            <span className="text-xs sm:text-base">Discount:</span>
                            <span className="text-xs sm:text-base">- <FormatMoney amount={Number(couponDiscount)} /></span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-1 sm:pt-2 border-t">
                        <span className="text-base sm:text-lg font-semibold text-gray-800">Total:</span>
                        <span className="text-lg sm:text-xl font-bold text-blue-600"><FormatMoney amount={Number(subtotal - (couponDiscount || 0))} /></span>
                    </div>
                </div>
            </div>
            
            {/* Desktop Layout */}
            {onProceedToCheckout && (
                <div className="hidden lg:block">
                    <button
                        onClick={handleProceedToCheckout}
                        className={`w-full py-3 px-4 rounded-button font-bold text-white text-center ${
                            (!selectedDate || !selectedTime || !selectedTicket) 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        } transition duration-300 whitespace-nowrap`}
                        disabled={!selectedDate || !selectedTime || !selectedTicket}
                    >
                        Checkout Now
                    </button>
                </div>
            )}

        </div>
    );
};

export default BookingSummaryList; 