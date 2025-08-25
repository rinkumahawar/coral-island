import { HttpClient, ApiResponse } from '../index';
import { API_CONFIG } from '../config';

export interface CurrencyResponse {
  id: number;
  base_currency: string;
  target_currency: string;
  exchange_rate: string;
  fetched_at: string;
}

export interface CurrencyRates {
  [currencyCode: string]: number;
}

export class CurrencyService {
  /**
   * Get currency exchange rates for a specific currency
   * @param currency - The base currency code (e.g., 'THB', 'USD')
   * @returns Promise with currency response data
   */
  public static async getCurrencyRates(currency: string): Promise<CurrencyResponse> {
    try {
      const response = await HttpClient.get<ApiResponse<CurrencyResponse>>(
        API_CONFIG.endpoints.currencyRates.replace(':currency', currency.toLowerCase())
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch currency rates: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Get exchange rate for converting from base currency to target currency
   * @param baseCurrency - The base currency code (e.g., 'THB')
   * @param targetCurrency - The target currency code (e.g., 'USD')
   * @returns Promise with exchange rate number
   */
  public static async getExchangeRate(baseCurrency: string, targetCurrency: string): Promise<number> {
    try {
      const response = await this.getCurrencyRates(baseCurrency);
      
      // If the response matches our target currency, return the rate
      if (response.target_currency.toLowerCase() === targetCurrency.toLowerCase()) {
        return parseFloat(response.exchange_rate);
      }
      
      // If not, we might need to fetch the reverse rate or calculate it
      // For now, return 1 if currencies are the same, otherwise throw error
      if (baseCurrency.toLowerCase() === targetCurrency.toLowerCase()) {
        return 1;
      }
      
      throw new Error(`Exchange rate not found for ${baseCurrency} to ${targetCurrency}`);
    } catch (error: any) {
      throw new Error(`Failed to get exchange rate: ${error.message}`);
    }
  }

  /**
   * Convert amount from one currency to another
   * @param amount - The amount to convert
   * @param fromCurrency - Source currency code
   * @param toCurrency - Target currency code
   * @returns Promise with converted amount
   */
  public static async convertCurrency(
    amount: number, 
    fromCurrency: string, 
    toCurrency: string
  ): Promise<number> {
    try {
      if (fromCurrency.toLowerCase() === toCurrency.toLowerCase()) {
        return amount;
      }

      const exchangeRate = await this.getExchangeRate(fromCurrency, toCurrency);
      return amount * exchangeRate;
    } catch (error: any) {
      throw new Error(`Failed to convert currency: ${error.message}`);
    }
  }
} 