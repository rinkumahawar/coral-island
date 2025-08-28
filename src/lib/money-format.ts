/**
 * Money Formatting Utilities
 * Provides consistent formatting for money amounts with dynamic currency support
 * Supports any currency while maintaining Thai Baht (THB) as default
 */

/**
 * Main function to format numbers as money (uses global currency context)
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted string with currency symbol
 */
export function formatMoney(
  amount: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    locale?: string;
    currency?: string;
    symbol?: string;
    useGlobalCurrency?: boolean;
    baseCurrency?: string; // The currency the amount is currently in
  } = {}
): string {
  const {
    showSymbol = true,
    showDecimals = true,
    locale,
    currency,
    symbol,
    useGlobalCurrency = true,
    baseCurrency = 'THB' // Default base currency (THB)
  } = options;
  
  // Get current currency from global context if available
  let currentCurrency = currency || 'THB';
  let currentSymbol = symbol || '฿';
  let currentLocale = locale || 'th-TH';
  let convertedAmount = amount;
  
  if (useGlobalCurrency && typeof window !== 'undefined') {
    try {
      // Try to get currency from localStorage as fallback
      const savedCurrencyCode = localStorage.getItem('currency_code');
      const savedExchangeRate = localStorage.getItem('exchange_rate');
      
      if (savedCurrencyCode) {
        // Get currency info from our currency data
        const currencyInfo = getCurrencyInfo(savedCurrencyCode);
        
        currentCurrency = currencyInfo.code;
        currentSymbol = currencyInfo.symbol;
        
        // Set appropriate locale based on currency
        currentLocale = getLocaleForCurrency(currencyInfo.code);
        
        // Convert amount if base currency is different from target currency
        if (baseCurrency !== currentCurrency && savedExchangeRate) {
          try {
            const exchangeRate = parseFloat(savedExchangeRate);
            
            if (!isNaN(exchangeRate) && exchangeRate > 0) {
              // Convert from base currency to target currency
              convertedAmount = amount * exchangeRate;
            } else {
              // invalid rate; keep original
            }
          } catch (rateError) {
            // ignore parsing errors and use original amount
          }
        } else {
          // no conversion needed
        }
      } else {
        // no saved currency code
      }
    } catch (error) {
      // ignore and use defaults
    }
  } else {
    // not using global currency or window missing
  }
  
  try {
    const formatter = new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentCurrency,
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });

    let formatted = formatter.format(convertedAmount);
    
    // Ensure the correct currency symbol is always displayed
    if (showSymbol) {
      // Replace any currency code/symbol chunk with the specified symbol (once per chunk)
      formatted = formatted.replace(/[^\d\s,.-]+/g, currentSymbol);
    } else {
      // Remove any currency code/symbol chunks if not needed
      formatted = formatted.replace(/[^\d\s,.-]+/g, '');
    }

    return formatted;
  } catch (error) {
    // Fallback formatting if Intl is not supported
    const fallback = amount.toFixed(showDecimals ? 2 : 0);
    const result = showSymbol ? `${currentSymbol}${fallback}` : fallback;
    return result;
  }
}

/**
 * Gets the appropriate locale for a given currency code
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @returns The appropriate locale string
 */
function getLocaleForCurrency(currencyCode: string): string {
  const localeMap: { [key: string]: string } = {
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'JPY': 'ja-JP',
    'CNY': 'zh-CN',
    'INR': 'en-IN',
    'SGD': 'en-SG',
    'AUD': 'en-AU',
    'CAD': 'en-CA',
    'CHF': 'de-CH',
    'SEK': 'sv-SE',
    'NOK': 'nb-NO',
    'DKK': 'da-DK',
    'PLN': 'pl-PL',
    'CZK': 'cs-CZ',
    'HUF': 'hu-HU',
    'RON': 'ro-RO',
    'BGN': 'bg-BG',
    'HRK': 'hr-HR',
    'RUB': 'ru-RU',
    'TRY': 'tr-TR',
    'BRL': 'pt-BR',
    'MXN': 'es-MX',
    'ARS': 'es-AR',
    'CLP': 'es-CL',
    'COP': 'es-CO',
    'PEN': 'es-PE',
    'UYU': 'es-UY',
    'VEF': 'es-VE',
    'ZAR': 'en-ZA',
    'EGP': 'ar-EG',
    'NGN': 'en-NG',
    'KES': 'en-KE',
    'GHS': 'en-GH',
    'MAD': 'ar-MA',
    'TND': 'ar-TN',
    'KRW': 'ko-KR',
    'TWD': 'zh-TW',
    'HKD': 'zh-HK',
    'MYR': 'ms-MY',
    'IDR': 'id-ID',
    'PHP': 'en-PH',
    'VND': 'vi-VN',
    'THB': 'th-TH', // Default
  };
  
  return localeMap[currencyCode] || 'en-US';
}

/**
 * Formats a number as money with compact notation (e.g., 1K, 1M)
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted string with compact notation
 */
export function formatMoneyCompact(
  amount: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    locale?: string;
    symbol?: string;
    useGlobalCurrency?: boolean;
  } = {}
): string {
  const { 
    showSymbol = true, 
    showDecimals = true, 
    locale,
    symbol,
    useGlobalCurrency = true
  } = options;

  // Get current currency from global context if available
  let currentCurrency = 'THB';
  let currentSymbol = symbol || '฿';
  let currentLocale = locale || 'th-TH';
  
  if (useGlobalCurrency && typeof window !== 'undefined') {
    try {
      const savedCurrencyCode = localStorage.getItem('currency_code');
      if (savedCurrencyCode) {
        const currencyInfo = getCurrencyInfo(savedCurrencyCode);
        currentCurrency = currencyInfo.code;
        currentSymbol = currencyInfo.symbol;
        currentLocale = getLocaleForCurrency(currencyInfo.code);
      }
    } catch (error) {
      // ignore errors and use defaults
    }
  }

  try {
    const formatter = new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentCurrency,
      notation: 'compact',
      minimumFractionDigits: showDecimals ? 1 : 0,
      maximumFractionDigits: showDecimals ? 1 : 0,
    });

    let formatted = formatter.format(amount);
    
    // Ensure the correct currency symbol is displayed
    if (showSymbol) {
      formatted = formatted.replace(/[^\d\s,.-KMBT]+/g, currentSymbol);
    } else {
      formatted = formatted.replace(/[^\d\s,.-KMBT]+/g, '');
    }

    return formatted;
  } catch (error) {
    // Fallback compact formatting
    const compact = formatCompactNumber(amount);
    return showSymbol ? `${currentSymbol}${compact}` : compact;
  }
}

/**
 * Helper function to format numbers in compact notation
 * @param num - The number to format
 * @returns Compact formatted string
 */
function formatCompactNumber(num: number): string {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
  if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
  return (num / 1000000000).toFixed(1) + 'B';
}

/**
 * Gets the current currency information from global context
 * @returns Current currency object or default if not available
 */
export function getCurrentCurrency(): { code: string; symbol: string; name: string } {
  if (typeof window !== 'undefined') {
    try {
      const savedCurrencyCode = localStorage.getItem('currency_code');
      if (savedCurrencyCode) {
        const currencyInfo = getCurrencyInfo(savedCurrencyCode);
        return {
          code: currencyInfo.code,
          symbol: currencyInfo.symbol,
          name: currencyInfo.name
        };
      }
    } catch (error) {
      // ignore errors
    }
  }
  
  // Return default currency
  return {
    code: 'THB',
    symbol: '฿',
    name: 'Thai Baht'
  };
}

/**
 * Gets the current exchange rate from global context
 * @returns Current exchange rate or null if not available
 */
export function getCurrentExchangeRate(): number | null {
  if (typeof window !== 'undefined') {
    try {
      const savedExchangeRate = localStorage.getItem('exchange_rate');
      if (savedExchangeRate) {
        return parseFloat(savedExchangeRate);
      }
    } catch (error) {
      // ignore errors
    }
  }
  
  return null;
}

/**
 * Formats money for a specific currency (bypasses global context)
 * @param amount - The amount to format
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @param options - Additional formatting options
 * @returns Formatted string for the specified currency
 */
export function formatMoneyForCurrency(
  amount: number,
  currencyCode: string,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    symbol?: string;
  } = {}
): string {
  const { showSymbol = true, showDecimals = true, symbol } = options;
  
  // Get currency info from our currency data
  const currencyInfo = getCurrencyInfo(currencyCode);
  const locale = getLocaleForCurrency(currencyCode);
  
  return formatMoney(amount, {
    showSymbol,
    showDecimals,
    locale,
    currency: currencyCode,
    symbol: symbol || currencyInfo.symbol,
    useGlobalCurrency: false
  });
}

/**
 * Gets currency information for a specific currency code
 * @param currencyCode - The currency code to look up
 * @returns Currency information object
 */
export function getCurrencyInfo(currencyCode: string): { code: string; symbol: string; name: string } {
  const currencyMap: { [key: string]: { code: string; symbol: string; name: string } } = {
    'THB': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
    'USD': { code: 'USD', symbol: '$', name: 'US Dollar' },
    'EUR': { code: 'EUR', symbol: '€', name: 'Euro' },
    'GBP': { code: 'GBP', symbol: '£', name: 'British Pound' },
    'JPY': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    'CNY': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    'INR': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    'SGD': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    'AUD': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    'CAD': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    'CHF': { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    'SEK': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    'NOK': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    'DKK': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
    'PLN': { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
    'CZK': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
    'HUF': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
    'RON': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
    'BGN': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
    'HRK': { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
    'RUB': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    'TRY': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    'BRL': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    'MXN': { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    'ARS': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
    'CLP': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
    'COP': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
    'PEN': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
    'UYU': { code: 'UYU', symbol: '$', name: 'Uruguayan Peso' },
    'VEF': { code: 'VEF', symbol: 'Bs', name: 'Venezuelan Bolívar' },
    'ZAR': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    'EGP': { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
    'NGN': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    'KES': { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    'GHS': { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    'MAD': { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
    'TND': { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
    'KRW': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    'TWD': { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
    'HKD': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    'MYR': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    'IDR': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    'PHP': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
    'VND': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  };
  
  return currencyMap[currencyCode] || { code: currencyCode, symbol: currencyCode, name: currencyCode };
}

/**
 * Debug function to help troubleshoot currency switcher issues
 * Call this function in the browser console to see the current state
 */
export function debugCurrencyState(): void {
  // No-op in production
}

// The money formatting system supports any currency while maintaining THB as default
// Use formatMoney, formatMoneyForCurrency, or formatMoneyCompact as needed 