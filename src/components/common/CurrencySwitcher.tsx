"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import { CurrencyService } from '@/lib/api/services/currency';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ReactCountryFlag from 'react-country-flag';

export interface CurrencySwitcherProps {
  onCurrencyChange?: (currency: Currency, rates?: any) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'outlined';
  showFlag?: boolean;
  showName?: boolean;
  disabled?: boolean;
  showSearch?: boolean;
}

// Simplified currency list with only the most commonly used currencies
const defaultCurrencies: Currency[] = [
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱' },
  { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷' },
  { code: 'AWG', name: 'Aruban Florin', symbol: 'ƒ', flag: '🇦🇼' },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: '$', flag: '🇧🇧' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  { code: 'BMD', name: 'Bermudian Dollar', symbol: '$', flag: '🇧🇲' },
  { code: 'BND', name: 'Brunei Dollar', symbol: '$', flag: '🇧🇳' },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴' },
  { code: 'BSD', name: 'Bahamian Dollar', symbol: '$', flag: '🇧🇸' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼' },
  { code: 'BZD', name: 'Belize Dollar', symbol: '$', flag: '🇧🇿' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'DOP', name: 'Dominican Peso', symbol: '$', flag: '🇩🇴' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', flag: '🇪🇲' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
  { code: 'FJD', name: 'Fijian Dollar', symbol: '$', flag: '🇫🇯' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
  { code: 'GIP', name: 'Gibraltar Pound', symbol: '£', flag: '🇬🇮' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', flag: '🇬🇲' },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹' },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: '$', flag: '🇬🇾' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', flag: '🇭🇷' },
  { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: '$', flag: '🇯🇲' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
  { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'с', flag: '🇰🇬' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭' },
  { code: 'KYD', name: 'Cayman Islands Dollar', symbol: '$', flag: '🇰🇾' },
  { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿' },
  { code: 'LAK', name: 'Laotian Kip', symbol: '₭', flag: '🇱🇦' },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', flag: '🇱🇰' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: '$', flag: '🇱🇷' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', flag: '🇱🇸' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩' },
  { code: 'MKD', name: 'Macedonian Denar', symbol: 'ден', flag: '🇲🇰' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲' },
  { code: 'MNT', name: 'Mongolian Tögrög', symbol: '₮', flag: '🇲🇳' },
  { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$', flag: '🇲🇴' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺' },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', flag: '🇲🇻' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: '$', flag: '🇳🇦' },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', flag: '🇳🇵' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', flag: '🇸🇨' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le', flag: '🇸🇱' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh', flag: '🇸🇴' },
  { code: 'SVC', name: 'Salvadoran Colón', symbol: '₡', flag: '🇸🇻' },
  { code: 'SZL', name: 'Eswatini Lilangeni', symbol: 'L', flag: '🇸🇿' },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: '$', flag: '🇹🇹' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$', flag: '🇺🇾' },
  { code: 'UZS', name: 'Uzbekistani Som', symbol: 'so\'m', flag: '🇺🇿' },
  { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
];

// Helper: map currency code to ISO 3166-1 alpha-2 country code (best-effort)
const getCountryCodeFromCurrency = (currencyCode: string): string | null => {
  const map: Record<string, string> = {
    THB: 'TH', INR: 'IN', USD: 'US', EUR: 'EU', SGD: 'SG', AUD: 'AU', GBP: 'GB', AED: 'AE',
    ALL: 'AL', AMD: 'AM', ARS: 'AR', AWG: 'AW', BBD: 'BB', BDT: 'BD', BMD: 'BM', BND: 'BN',
    BOB: 'BO', BSD: 'BS', BWP: 'BW', BZD: 'BZ', CAD: 'CA', CHF: 'CH', CNY: 'CN', COP: 'CO',
    CRC: 'CR', CZK: 'CZ', DKK: 'DK', DOP: 'DO', DZD: 'DZ', EGP: 'EG', ETB: 'ET', FJD: 'FJ',
    GHS: 'GH', GIP: 'GI', GMD: 'GM', GTQ: 'GT', GYD: 'GY', HKD: 'HK', HNL: 'HN', HRK: 'HR',
    HTG: 'HT', HUF: 'HU', IDR: 'ID', ILS: 'IL', JMD: 'JM', KES: 'KE', KGS: 'KG', KHR: 'KH',
    KYD: 'KY', KZT: 'KZ', LAK: 'LA', LBP: 'LB', LKR: 'LK', LRD: 'LR', LSL: 'LS', MAD: 'MA',
    MDL: 'MD', MKD: 'MK', MMK: 'MM', MNT: 'MN', MOP: 'MO', MUR: 'MU', MVR: 'MV', MWK: 'MW',
    MXN: 'MX', MYR: 'MY', NAD: 'NA', NIO: 'NI', NOK: 'NO', NPR: 'NP', NZD: 'NZ', PEN: 'PE',
    PGK: 'PG', PHP: 'PH', PKR: 'PK', QAR: 'QA', RUB: 'RU', SAR: 'SA', SCR: 'SC', SEK: 'SE',
    SLL: 'SL', SOS: 'SO', SVC: 'SV', SZL: 'SZ', TTD: 'TT', TZS: 'TZ', UYU: 'UY', UZS: 'UZ',
    YER: 'YE', ZAR: 'ZA', JPY: 'JP', VND: 'VN'
  };
  return map[currencyCode] || null;
};

// Helper function to render flags with fallback for Windows compatibility
const renderFlag = (currency: Currency) => {
  const countryCode = getCountryCodeFromCurrency(currency.code);
  if (countryCode) {
    return (
      <ReactCountryFlag
        svg
        countryCode={countryCode}
        title={currency.name}
        style={{ width: '20px', height: '20px'}}
      />
    );
  }
  
  // Fallback: Show country code in a styled box
  return (
    <span 
      className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-sm"
      title={currency.name}
      style={{ fontFamily: 'Arial, sans-serif' }}
    >
      {currency.code.slice(0, 2)}
    </span>
  );
};

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  onCurrencyChange,
  className = '',
  size = 'md',
  variant = 'default',
  showFlag = true,
  showName = true,
  disabled = false,
  showSearch = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    selectedCurrency,
    setSelectedCurrency,
    setCurrencyRates,
    isLoading,
    error,
    setLoading,
    setError
  } = useCurrency();

  const handleCurrencySelect = async (currency: Currency) => {
    if (currency.code === selectedCurrency.code) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currencyRates = await CurrencyService.getCurrencyRates(currency.code);
      setSelectedCurrency(currency);
      setCurrencyRates(currencyRates);
      setIsOpen(false);
      onCurrencyChange?.(currency, currencyRates);
      window.location.reload();
    } catch (err: any) {
      console.error('Failed to fetch currency rates:', err);
      setError(err.message || 'Failed to fetch currency rates');
      setSelectedCurrency(currency);
      setIsOpen(false);
      onCurrencyChange?.(currency);
    } finally {
      setLoading(false);
    }
  };

  const filteredCurrencies = defaultCurrencies.filter(currency =>
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50',
    minimal: 'bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50',
    outlined: 'bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50',
  };

  return (
    <>
      <div className={cn('relative inline-block', className)}>
        <button
          type="button"
          onClick={() => !disabled && !isLoading && setIsOpen(true)}
          disabled={disabled || isLoading}
          className={cn(
            'flex items-center justify-between w-full rounded-xl shadow-md transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
            'hover:shadow-lg active:scale-[0.98]',
            sizeClasses[size],
            variantClasses[variant],
            (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
            !disabled && !isLoading && 'cursor-pointer'
          )}
          aria-haspopup="dialog"
          aria-label="Select currency"
        >
          <div className="flex items-center space-x-3">
         
                        <div className="flex items-center space-x-2">
              {showFlag && renderFlag(selectedCurrency)}
              {showName && (
                <span className="hidden sm:inline text-gray-700 font-medium">
                  {selectedCurrency.code}
                </span>
              )}
              {isLoading && (
                <div className="ml-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                </div>
              )}
            </div>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-gray-500 transition-all duration-300 ml-2"
          />
        </button>

        {error && (
          <div className="absolute mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm z-50 right-0">
            {error}
          </div>
        )}
      </div>

      {/* Currency Selection Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                      Select Currency
                    </Dialog.Title>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                      aria-label="Close modal"
                    >
                      <XMarkIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {showSearch && (
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Search currencies..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {filteredCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => handleCurrencySelect(currency)}
                          disabled={isLoading}
                          className={cn(
                            'w-full text-left p-3 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 rounded-lg border border-gray-200',
                            'flex flex-col items-start space-y-2',
                            selectedCurrency.code === currency.code && 'bg-blue-100 text-blue-700 border-blue-300',
                            isLoading && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          <div className="flex items-center space-x-2 w-full">
                            {showFlag && renderFlag(currency)}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">
                                {currency.code}
                              </div>
                            </div>
                          </div>
                          {showName && (
                            <div className="text-xs text-gray-600 leading-tight truncate w-full">
                              {currency.name}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
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

export default CurrencySwitcher; 