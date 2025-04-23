import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';

interface AddOn {
    id: string;
    name: string;
    price: number;
    duration: string;
    available: boolean;
    image: string;
}

interface AddOnState {
    selected: boolean;
    quantity: number;
}

interface AddOnSelectionProps {
    addons: { [key: string]: AddOnState };
    addonOptions: AddOn[];
    selectedTicket: string;
    totalPeople: number;
    onAddonToggle: (addonId: string) => void;
    onAddonQuantityChange: (addonId: string, change: number) => void;
}

const AddOnSelection: React.FC<AddOnSelectionProps> = ({
    addons,
    addonOptions,
    selectedTicket,
    totalPeople,
    onAddonToggle,
    onAddonQuantityChange
}) => {
    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Enhance Your Experience with Add-ons</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {addonOptions.map(addon => (
                    <div
                        key={addon.id}
                        className={`border rounded-lg transition-all duration-300 overflow-hidden ${
                            selectedTicket === 'premium' &&
                            (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride')
                                ? 'border-blue-500 bg-blue-50 opacity-75 cursor-not-allowed'
                                : addons[addon.id].selected
                                ? 'border-blue-500 bg-blue-50 hover:shadow-lg'
                                : 'border-gray-200 hover:shadow-lg'
                        }`}
                        onClick={() => {
                            if (!(selectedTicket === 'premium' &&
                                (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride'))) {
                                onAddonToggle(addon.id);
                            }
                        }}
                    >
                        <div className="relative h-32 overflow-hidden">
                            <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    addon.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                }`}>
                                    {addon.available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-800 mb-1">{addon.name}</h3>
                                <div className="flex items-center text-gray-500 text-xs mb-2">
                                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                                    {addon.duration}
                                </div>
                                <div className="text-blue-600 font-bold text-sm mb-2">
                                    ฿{addon.price.toLocaleString()}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!(selectedTicket === 'premium' &&
                                                    (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride'))) {
                                                    onAddonQuantityChange(addon.id, -1);
                                                }
                                            }}
                                            className={`w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors ${
                                                selectedTicket === 'premium' &&
                                                (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride')
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:bg-gray-200 cursor-pointer'
                                            }`}
                                            disabled={!addons[addon.id].selected || addons[addon.id].quantity <= 0 ||
                                                (selectedTicket === 'premium' &&
                                                    (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride'))}
                                        >
                                            <FontAwesomeIcon icon={faMinus} className="text-xs" />
                                        </button>
                                        <span className="w-6 text-center font-semibold text-sm">
                                            {addons[addon.id].quantity}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!(selectedTicket === 'premium' &&
                                                    (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride'))) {
                                                    onAddonQuantityChange(addon.id, 1);
                                                }
                                            }}
                                            className={`w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 !rounded-button whitespace-nowrap transition-colors ${
                                                selectedTicket === 'premium' &&
                                                (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride')
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:bg-gray-200 cursor-pointer'
                                            }`}
                                            disabled={addons[addon.id].quantity >= totalPeople ||
                                                (selectedTicket === 'premium' &&
                                                    (addon.id === 'parasailing' || addon.id === 'jetski' || addon.id === 'bananaride'))}
                                        >
                                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                                        </button>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                        addons[addon.id].selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                                    }`}>
                                        {addons[addon.id].selected && (
                                            <FontAwesomeIcon icon={faCheck} className="text-white text-[8px]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AddOnSelection; 