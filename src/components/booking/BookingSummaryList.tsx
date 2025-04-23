import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface Addon {
    id: string;
    name: string;
    price: number;
}

interface AddOnState {
    selected: boolean;
    quantity: number;
}

interface BookingSummaryListProps {
    selectedDate: string;
    selectedTime: string;
    selectedTicket: {
        name: string;
        adultPrice: number;
        childPrice: number;
    };
    adultCount: number;
    childCount: number;
    addons: { [key: string]: AddOnState };
    addonOptions: Addon[];
    couponDiscount: number;
    onApplyCoupon: () => void;
    couponCode: string;
    onCouponChange: (code: string) => void;
    couponError?: string;
}

const BookingSummaryList: React.FC<BookingSummaryListProps> = ({
    selectedDate,
    selectedTime,
    selectedTicket,
    adultCount,
    childCount,
    addons,
    addonOptions,
    couponDiscount,
    onApplyCoupon,
    couponCode,
    onCouponChange,
    couponError
}) => {
    const calculateSubtotal = () => {
        const ticketTotal = (selectedTicket.adultPrice * adultCount) + (selectedTicket.childPrice * childCount);
        const addonTotal = addonOptions.reduce((total, addon) => {
            if (addons[addon.id].selected) {
                return total + addon.price * addons[addon.id].quantity;
            }
            return total;
        }, 0);
        return ticketTotal + addonTotal;
    };

    const subtotal = calculateSubtotal();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>
            {(!selectedDate || !selectedTime) ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Please select a date and time to continue.
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span className="font-medium">{selectedTicket.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        }) : 'Not selected'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Adults:</span>
                    <span className="font-medium">{adultCount} × ฿{selectedTicket.adultPrice.toLocaleString()}</span>
                </div>
                {childCount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Children:</span>
                        <span className="font-medium">{childCount} × ฿{selectedTicket.childPrice.toLocaleString()}</span>
                    </div>
                )}
                {Object.entries(addons).some(([_, data]) => data.selected) && (
                    <div className="pt-2">
                        <span className="text-gray-600 font-medium">Selected Add-ons:</span>
                        <ul className="mt-2 space-y-2">
                            {addonOptions.filter(addon => addons[addon.id].selected).map(addon => (
                                <li key={addon.id} className="flex justify-between">
                                    <span className="text-gray-600">- {addon.name} (x{addons[addon.id].quantity})</span>
                                    <span className="font-medium">฿{(addon.price * addons[addon.id].quantity).toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200 pt-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Coupon Code</label>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            className="w-full sm:w-auto flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={couponCode}
                            onChange={(e) => onCouponChange(e.target.value)}
                        />
                        <button
                            onClick={onApplyCoupon}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-button whitespace-nowrap cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                    {couponError && (
                        <p className="text-red-500 text-sm mt-1">{couponError}</p>
                    )}
                    {couponDiscount > 0 && (
                        <p className="text-green-500 text-sm mt-1">Coupon applied successfully!</p>
                    )}
                </div>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-lg text-gray-800">Subtotal:</span>
                        <span className="text-lg text-gray-800">฿{subtotal.toLocaleString()}</span>
                    </div>
                    {couponDiscount > 0 && (
                        <div className="flex justify-between items-center text-green-600">
                            <span>Discount:</span>
                            <span>-฿{couponDiscount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-lg font-semibold text-gray-800">Total:</span>
                        <span className="text-xl font-bold text-blue-600">฿{(subtotal - couponDiscount).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <a
                href="https://readdy.ai/home/29fc16bf-6388-4b07-a9a8-d85c71b8d89a/b572c93c-842d-4d79-9783-cfbdae44b276"
                data-readdy="true"
                className={`block w-full ${!selectedDate || !selectedTime ? 'pointer-events-none' : ''}`}
            >
                <button
                    className={`w-full py-3 px-4 rounded-button font-bold text-white text-center ${
                        (!selectedDate || !selectedTime) 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    } transition duration-300 whitespace-nowrap`}
                    disabled={!selectedDate || !selectedTime}
                >
                    Proceed to Checkout
                </button>
            </a>
            <div className="mt-4 text-center text-sm text-gray-500">
                <p>No payment required now</p>
            </div>
        </div>
    );
};

export default BookingSummaryList; 