/**
 * Money Formatting Utilities
 * Export all money formatting functions from a single entry point
 * Defaults to Thai Baht (฿) formatting
 */

export {
  // Generic money formatting functions
  formatMoney,
  formatMoneyAmount,
  formatMoneySymbol,
  formatMoneyCompact,
  formatMoneyRange,
  formatMoneyCustom,
  parseMoney,
  isValidMoneyAmount,
  
  // Thai Baht convenience functions (backward compatibility)
  formatThaiBaht,
  formatThaiBahtAmount,
  formatThaiBahtSymbol,
  formatThaiBahtCompact,
  formatThaiBahtRange,
  formatThaiBahtCustom,
  parseThaiBaht,
  isValidThaiBahtAmount
} from '../money-format'; 