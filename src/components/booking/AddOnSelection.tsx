import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

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

interface AddOnSelectionProps {
    addons: ExtraPrice[];
    selectedTicket: string;
    totalGuests: number;
    onAddonToggle: (name: string) => void;
    onAddonQuantityChange: (name: string, change: number) => void;
    disabled?: boolean;
}

const AddOnSelection: React.FC<AddOnSelectionProps> = ({
    addons,
    selectedTicket,
    totalGuests,
    onAddonToggle,
    onAddonQuantityChange,
    disabled = false
}) => {
    return (
        <section className="bg-white rounded-lg sm:shadow-md p-0 sm:p-6">
            <div className="sm:px-0">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-6">Enhance Your Experience with Add-ons</h2>
                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4">
                    {addons
                        .filter(addon => addon.tickets.includes(selectedTicket))
                        .map(addon => {
                        // Check if the addon is available for the selected ticket
                        const isAddonAvailableForTicket = addon.tickets.includes(selectedTicket);
                        const isDisabled = disabled || !isAddonAvailableForTicket;
                        
                        return (
                        <div
                            key={addon.name}
                            className={`border rounded-lg transition-all duration-300 overflow-hidden ${addon.selected
                                ? 'border-blue-500 bg-blue-50 hover:shadow-lg'
                                : 'border-gray-200 hover:shadow-lg'
                                } ${isDisabled ? 'opacity-75 cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (!isDisabled) {
                                    onAddonToggle(addon.name);
                                }
                            }}
                        >
                            {/* Mobile: Horizontal Layout, Desktop: Vertical Layout */}
                            <div className="flex sm:flex-col">
                                {/* Image - Small on mobile, full width on desktop */}
                                <div className="relative w-20 h-20 sm:w-full sm:h-32 overflow-hidden flex-shrink-0">
                                    <img
                                        src="https://readdy.ai/api/search-image?query=Traditional%20Thai%20lunch%20spread%20at%20beachside%20restaurant%20in%20Coral%20Island%20Pattaya%2C%20colorful%20authentic%20Thai%20dishes%2C%20tom%20yum%2C%20pad%20thai%2C%20fresh%20seafood%2C%20beautiful%20presentation%20with%20tropical%20garnishes%2C%20ocean%20view%20dining%20setting&amp;width=400&amp;height=300&amp;seq=7&amp;orientation=landscape" 
                                        alt={addon.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                                        <span className={`px-0.5 sm:px-1 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${isAddonAvailableForTicket ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {isAddonAvailableForTicket ? 'Available' : 'Not Available'}
                                        </span>
                                    </div> */}
                                </div>
                                
                                {/* Content - Takes remaining space on mobile */}
                                <div className="flex-1 p-2 sm:p-3 flex flex-col justify-between relative">
                                    {/* Radio Button - Top Right Corner */}
                                    <div className={`absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center transition-colors ${addon.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                        }`}>
                                        {addon.selected && (
                                            <FontAwesomeIcon icon={faCheck} className="text-white text-[6px] sm:text-[8px]" />
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 pr-8">{addon.name}</h3>
                                        <div className="text-gray-500 text-xs mb-1 sm:mb-2 line-clamp-2">
                                            {addon.desc}
                                        </div>
                                    </div>
                                    
                                    {/* Price and Quantity Controller - Single Row */}
                                    <div className="flex items-center justify-between">
                                        {/* Left Column - Price */}
                                        <div className="text-blue-600 font-bold text-xs sm:text-sm">
                                            ฿{addon.price.toLocaleString()}
                                        </div>
                                        
                                        {/* Right Column - Quantity Controller */}
                                        <div className="flex items-center space-x-1 sm:space-x-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isDisabled) {
                                                        onAddonQuantityChange(addon.name, -1);
                                                    }
                                                }}
                                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                                            >
                                                <FontAwesomeIcon icon={faMinus} className="text-xs" />
                                            </button>
                                            <span className="w-4 sm:w-6 text-center font-semibold text-xs sm:text-sm">
                                                {addon.quantity}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!isDisabled) {
                                                        onAddonQuantityChange(addon.name, 1);
                                                    }
                                                }}
                                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    );
};

export default AddOnSelection; 