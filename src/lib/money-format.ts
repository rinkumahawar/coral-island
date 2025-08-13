/**
 * Money Formatting Utilities
 * Provides consistent formatting for money amounts with Thai Baht (฿) as default
 */

/**
 * Main function to format numbers as money (defaults to Thai Baht)
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
  } = {}
): string {
  const {
    showSymbol = true,
    showDecimals = true,
    locale = 'th-TH',
    currency = 'THB',
    symbol = '฿'
  } = options;
  
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
    });

    let formatted = formatter.format(amount);
    
    // Ensure the correct currency symbol is always displayed
    if (showSymbol) {
      // Replace any currency symbol with the specified symbol
      formatted = formatted.replace(/[^\d\s,.-]/g, symbol);
    } else {
      // Remove currency symbol if not needed
      formatted = formatted.replace(/[^\d\s,.-]/g, '');
    }

    return formatted;
  } catch (error) {
    // Fallback formatting if Intl is not supported
    const fallback = amount.toFixed(showDecimals ? 2 : 0);
    return showSymbol ? `${symbol}${fallback}` : fallback;
  }
}

/**
 * Formats a number as money without the currency symbol
 * @param amount - The amount to format
 * @param showDecimals - Whether to show decimal places
 * @param locale - Locale for formatting
 * @returns Formatted string without currency symbol
 */
export function formatMoneyAmount(amount: number, showDecimals: boolean = true, locale: string = 'th-TH'): string {
  return formatMoney(amount, { showSymbol: false, showDecimals, locale });
}

/**
 * Formats a number as money with the symbol only
 * @param amount - The amount to format
 * @param showDecimals - Whether to show decimal places
 * @param symbol - Currency symbol to use
 * @param locale - Locale for formatting
 * @returns Formatted string with currency symbol
 */
export function formatMoneySymbol(amount: number, showDecimals: boolean = true, symbol: string = '฿', locale: string = 'th-TH'): string {
  return formatMoney(amount, { showSymbol: true, showDecimals, symbol, locale });
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
  } = {}
): string {
  const { showSymbol = true, showDecimals = true, locale = 'th-TH', symbol = '฿' } = options;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'THB',
      notation: 'compact',
      minimumFractionDigits: showDecimals ? 1 : 0,
      maximumFractionDigits: showDecimals ? 1 : 0,
    });

    let formatted = formatter.format(amount);
    
    // Ensure the correct currency symbol is displayed
    if (showSymbol) {
      formatted = formatted.replace(/[^\d\s,.-KMBT]/g, symbol);
    } else {
      formatted = formatted.replace(/[^\d\s,.-KMBT]/g, '');
    }

    return formatted;
  } catch (error) {
    // Fallback compact formatting
    const compact = formatCompactNumber(amount);
    return showSymbol ? `${symbol}${compact}` : compact;
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
 * Parses a money formatted string back to a number
 * @param formattedString - The formatted string to parse
 * @returns The parsed number or null if invalid
 */
export function parseMoney(formattedString: string): number | null {
  try {
    // Remove any currency symbol and non-numeric characters except decimal point
    const cleaned = formattedString.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(cleaned);
    
    return isNaN(parsed) ? null : parsed;
  } catch (error) {
    return null;
  }
}

/**
 * Validates if a string is a valid money amount
 * @param amount - The string to validate
 * @returns True if valid, false otherwise
 */
export function isValidMoneyAmount(amount: string): boolean {
  const parsed = parseMoney(amount);
  return parsed !== null && parsed >= 0;
}

/**
 * Formats a range of money amounts
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @param options - Formatting options
 * @returns Formatted range string
 */
export function formatMoneyRange(
  min: number,
  max: number,
  options: {
    showSymbol?: boolean;
    showDecimals?: boolean;
    separator?: string;
    symbol?: string;
    locale?: string;
  } = {}
): string {
  const { showSymbol = true, showDecimals = true, separator = ' - ', symbol = '฿', locale = 'th-TH' } = options;
  
  const minFormatted = formatMoney(min, { showSymbol, showDecimals, symbol, locale });
  const maxFormatted = formatMoney(max, { showSymbol, showDecimals, symbol, locale });
  
  return `${minFormatted}${separator}${maxFormatted}`;
}

/**
 * Formats a money amount with custom decimal places
 * @param amount - The amount to format
 * @param decimalPlaces - Number of decimal places to show
 * @param showSymbol - Whether to show the currency symbol
 * @param symbol - Currency symbol to use
 * @param locale - Locale for formatting
 * @returns Formatted string
 */
export function formatMoneyCustom(
  amount: number,
  decimalPlaces: number = 2,
  showSymbol: boolean = true,
  symbol: string = '฿',
  locale: string = 'th-TH'
): string {
  return formatMoney(amount, {
    showSymbol,
    showDecimals: decimalPlaces > 0,
    symbol,
    locale
  });
}

// Convenience functions for Thai Baht (keeping backward compatibility)
export const formatThaiBaht = formatMoney;
export const formatThaiBahtAmount = formatMoneyAmount;
export const formatThaiBahtSymbol = formatMoneySymbol;
export const formatThaiBahtCompact = formatMoneyCompact;
export const formatThaiBahtRange = formatMoneyRange;
export const formatThaiBahtCustom = formatMoneyCustom;
export const parseThaiBaht = parseMoney;
export const isValidThaiBahtAmount = isValidMoneyAmount; 