"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface CurrencyRates {
  id: number;
  base_currency: string;
  target_currency: string;
  exchange_rate: string;
  fetched_at: string;
}

interface CurrencyContextType {
  selectedCurrency: Currency;
  currencyRates: CurrencyRates | null;
  setSelectedCurrency: (currency: Currency) => void;
  setCurrencyRates: (rates: CurrencyRates | null) => void;
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultCurrency: Currency = {
  code: 'THB',
  name: 'Thai Baht',
  symbol: '฿',
  flag: '🇹🇭'
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: Currency;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
  defaultCurrency: initialCurrency = defaultCurrency
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(initialCurrency);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const savedRates = localStorage.getItem('currencyRates');
    
    if (savedCurrency) {
      try {
        setSelectedCurrency(JSON.parse(savedCurrency));
      } catch (e) {
        console.warn('Failed to parse saved currency from localStorage');
      }
    }
    
    if (savedRates) {
      try {
        setCurrencyRates(JSON.parse(savedRates));
      } catch (e) {
        console.warn('Failed to parse saved currency rates from localStorage');
      }
    }
  }, []);

  // Save currency and rates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  useEffect(() => {
    if (currencyRates) {
      localStorage.setItem('currencyRates', JSON.stringify(currencyRates));
    }
  }, [currencyRates]);

  const value: CurrencyContextType = {
    selectedCurrency,
    currencyRates,
    setSelectedCurrency,
    setCurrencyRates,
    isLoading,
    error,
    setLoading: setIsLoading,
    setError,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}; 