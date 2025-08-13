import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { formatMoney } from '@/lib/money-format';

interface GuestInfo {
    adult: string;
    child: string;
}
interface PaxSelectionProps {
    adultCount: number;
    childCount: number;
    adultPrice: number;
    childPrice: number;
    onPaxIncrement: (type: 'adult' | 'child') => void;
    onPaxDecrement: (type: 'adult' | 'child') => void;
    disabled?: boolean;
    guestInfo: GuestInfo | null;
}

const PaxSelection: React.FC<PaxSelectionProps> = ({
    adultCount,
    childCount,
    adultPrice,
    childPrice,
    onPaxIncrement,
    onPaxDecrement,
    disabled = false,
    guestInfo
}) => {
    return (
        <section className={`bg-white rounded-lg sm:shadow-md sm:p-6 ${disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Number of People</h2>
            <div className="space-y-4 sm:space-y-6">
                {/* Adults Row */}
                <div className="flex items-center justify-between">
                    {/* Left Column - Content */}
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Adults</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">{guestInfo?.adult || 'Age 12+'}</p>
                        <p className="text-blue-600 font-medium text-sm sm:text-base">{formatMoney(Number(adultPrice))} per person</p>
                    </div>
                    {/* Right Column - Controller */}
                    <div className="flex items-center ml-4">
                        <button
                            onClick={() => onPaxDecrement('adult')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faMinus} className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="mx-4 sm:mx-6 text-lg sm:text-xl font-semibold w-4 sm:w-6 text-center">{adultCount}</span>
                        <button
                            onClick={() => onPaxIncrement('adult')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>

                {/* Children Row */}
                <div className="flex items-center justify-between">
                    {/* Left Column - Content */}
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Children</h3>
                        <p className="text-gray-500 text-xs sm:text-sm">{guestInfo?.child || 'Age 4-11'}</p>
                        <p className="text-blue-600 font-medium text-sm sm:text-base">{formatMoney(Number(childPrice))} per person</p> 
                    </div>
                    {/* Right Column - Controller */}
                    <div className="flex items-center ml-4">
                        <button
                            onClick={() => onPaxDecrement('child')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faMinus} className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="mx-4 sm:mx-6 text-lg sm:text-xl font-semibold w-4 sm:w-6 text-center">{childCount}</span>
                        <button
                            onClick={() => onPaxIncrement('child')}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaxSelection; 