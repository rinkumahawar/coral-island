import React, { useEffect, useState, useCallback } from "react";
import FormatMoney from '@/components/common/FormatMoney';
import { useCurrency } from '@/contexts/CurrencyContext';

interface OmiseCheckoutProps {
  amount: number; // Amount in THB (base currency)
  currency?: string;
  description?: string;
  onSuccess?: (charge: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  buttonText?: string;
  buttonClassName?: string;
  disabled?: boolean;
  isOpen?: boolean;
  onModalClose?: () => void;
  bookingCode?: string;
}

const OmiseCheckout: React.FC<OmiseCheckoutProps> = ({
  amount,
  currency = "thb",
  description = process.env.NEXT_PUBLIC_PAGE_NAME,     
  onSuccess,
  onError,
  onClose,
  buttonText = "Pay Now",
  buttonClassName = "",
  disabled = false,
  isOpen = false,
  onModalClose,
  bookingCode,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCurrency, currencyRates } = useCurrency();
  
  // Use the currency from props if provided, otherwise use the selected currency from context
  const currentCurrency = selectedCurrency.code.toLowerCase() || currency;

  // Convert amount to the selected currency and to the smallest unit (cents, satangs, etc.)
  const convertAmountForOmise = (originalAmount: number, targetCurrency: string): number => {
    // If the target currency is THB, convert to satangs (smallest unit)
    if (targetCurrency.toLowerCase() === 'thb') {
      return Math.round(originalAmount * 100); // Convert to satangs
    }
    
    // For other currencies, we need to convert from THB to the target currency
    if (currencyRates && currencyRates.exchange_rate) {
      const exchangeRate = parseFloat(currencyRates.exchange_rate);
      if (!isNaN(exchangeRate) && exchangeRate > 0) {
        const convertedAmount = originalAmount * exchangeRate;
        
        // Convert to smallest unit based on currency
        switch (targetCurrency.toLowerCase()) {
          case 'usd':
          case 'eur':
          case 'gbp':
          case 'aud':
          case 'cad':
          case 'sgd':
          case 'inr':
            return Math.round(convertedAmount * 100); // Convert to cents
          case 'jpy':
            return Math.round(convertedAmount); // Yen doesn't have cents
          default:
            return Math.round(convertedAmount * 100); // Default to cents
        }
      }
    }
    
    // Fallback: if no exchange rate available, use original amount in satangs
    return Math.round(originalAmount * 100);
  };

  const omiseAmount = convertAmountForOmise(amount, currentCurrency);

  // Load Omise script
  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement("script");
    script.src = "https://cdn.omise.co/omise.js";
    script.type = "text/javascript";
    document.head.appendChild(script);
    
    script.onload = () => {
      // Configure OmiseCard
      (window as any).OmiseCard.configure({
        publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
        image: "https://cdn.omise.co/assets/dashboard/images/omise-logo.png",
        amount: omiseAmount,
        currency: currentCurrency,
        frameLabel: process.env.NEXT_PUBLIC_PAGE_NAME,
        submitLabel: "Pay Now",
        description: description,
        buttonLabel: "Pay now", // for data-button-label
        location: "no",         // for data-location
        // otherPaymentMethods: ["promptpay"], // for data-other-payment-methods
      });
      // Configure the button to submit to /charge page
      (window as any).OmiseCard.configureButton('#omise-checkout-button', {
        frameLabel: process.env.NEXT_PUBLIC_PAGE_NAME,
        submitLabel: "Pay Now",
      });
      
      // Attach the configuration
      (window as any).OmiseCard.attach();
    };

    script.onerror = (error) => {
      console.error('Failed to load Omise script:', error);
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen, omiseAmount, currentCurrency, description]);

  const handleModalClose = useCallback(() => {
    if (isLoading) return;
    onModalClose?.();
  }, [isLoading, onModalClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
          <button
            onClick={handleModalClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Amount to pay:</p>
          <p className="text-2xl font-bold text-gray-900">
            <FormatMoney amount={Number(amount)} />
          </p>
        </div>

        <form action="/charge">
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="currency" value={currentCurrency} />
          <input type="hidden" name="description" value={description} />
          {bookingCode && <input type="hidden" name="booking_code" value={bookingCode} />}
          
          {/* Add currency conversion data */}
          <input type="hidden" name="converted_amount" value={currencyRates && currencyRates.exchange_rate ? (amount * parseFloat(currencyRates.exchange_rate)).toFixed(2) : amount} />
          <input type="hidden" name="exchange_rate" value={currencyRates?.exchange_rate || "1.0"} />
          <input type="hidden" name="payment_gateway" value="omise" />
          
          <button
            type="submit"
            id="omise-checkout-button"
            disabled={disabled || isLoading}
            className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${buttonClassName}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                {buttonText}
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>🔒 Your payment is secured by Omise</p>
          <p>SSL encrypted • PCI DSS compliant</p>
        </div>
      </div>
    </div>
  );
};

export default OmiseCheckout; 