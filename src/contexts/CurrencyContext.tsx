"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrencyInfo } from '@/lib/money-format';

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


export interface SelectedCurrency {
  code: string;
}

export interface SelectedCurrencyExchangeRate {
  exchange_rate: string;
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
    const savedCurrencyCode = localStorage.getItem('currency_code');
    const savedExchangeRate = localStorage.getItem('exchange_rate');

    if (savedCurrencyCode) {
      const info = getCurrencyInfo(savedCurrencyCode);
      setSelectedCurrency({ code: info.code, name: info.name, symbol: info.symbol });
    }

    if (savedExchangeRate) {
      const rate = parseFloat(savedExchangeRate);
      if (!isNaN(rate)) {
        setCurrencyRates({
          id: 1,
          base_currency: 'THB',
          target_currency: savedCurrencyCode || selectedCurrency.code,
          exchange_rate: savedExchangeRate,
          fetched_at: new Date().toISOString()
        });
      }
    }
  }, []);

  // Save only single values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('currency_code', selectedCurrency.code);
  }, [selectedCurrency.code]);

  useEffect(() => {
    if (currencyRates?.exchange_rate) {
      localStorage.setItem('exchange_rate', currencyRates.exchange_rate);
    }
  }, [currencyRates?.exchange_rate]);

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