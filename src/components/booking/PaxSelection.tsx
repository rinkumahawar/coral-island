import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface PaxSelectionProps {
    adultCount: number;
    childCount: number;
    adultPrice: number;
    childPrice: number;
    onAdultIncrement: () => void;
    onAdultDecrement: () => void;
    onChildIncrement: () => void;
    onChildDecrement: () => void;
}

const PaxSelection: React.FC<PaxSelectionProps> = ({
    adultCount,
    childCount,
    adultPrice,
    childPrice,
    onAdultIncrement,
    onAdultDecrement,
    onChildIncrement,
    onChildDecrement
}) => {
    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Number of People</h2>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Adults</h3>
                        <p className="text-gray-500 text-sm">Age 12+</p>
                        <p className="text-blue-600 font-medium">฿{adultPrice.toLocaleString()} per person</p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={onAdultDecrement}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="mx-6 text-xl font-semibold w-6 text-center">{adultCount}</span>
                        <button
                            onClick={onAdultIncrement}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Children</h3>
                        <p className="text-gray-500 text-sm">Age 4-11</p>
                        <p className="text-blue-600 font-medium">฿{childPrice.toLocaleString()} per person</p>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={onChildDecrement}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="mx-6 text-xl font-semibold w-6 text-center">{childCount}</span>
                        <button
                            onClick={onChildIncrement}
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaxSelection; 