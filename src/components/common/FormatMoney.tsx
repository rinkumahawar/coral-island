'use client';

import { formatMoney } from '@/lib/money-format';
import React from 'react';

interface FormatMoneyProps {
  amount: number;
  baseCurrency?: string;
  showSymbol?: boolean;
  showDecimals?: boolean;
  className?: string;
}

const FormatMoney: React.FC<FormatMoneyProps> = ({
  amount,
  baseCurrency = 'THB',
  showSymbol = true,
  showDecimals = true,
  className = ''
}) => {
  const [renderKey, setRenderKey] = React.useState(0);

  React.useEffect(() => {
    // Trigger a re-render on mount to ensure we read client-side localStorage
    setRenderKey((k) => k + 1);

    const handleCurrencyChange = () => {
      try {
        localStorage.getItem('currency_code');
        localStorage.getItem('exchange_rate');
      } catch {}
      setRenderKey((k) => k + 1);
    };

    // Listen for custom event if emitter exists
    window.addEventListener('currencyChanged', handleCurrencyChange as EventListener);

    // Fallback: poll localStorage for changes (in case no custom event is emitted)
    let prevSignature = '';
    const makeSignature = () => {
      try {
        return `${localStorage.getItem('currency_code')}|${localStorage.getItem('exchange_rate')}`;
      } catch {
        return '';
      }
    };
    prevSignature = makeSignature();
    const intervalId = window.setInterval(() => {
      const sig = makeSignature();
      if (sig !== prevSignature) {
        prevSignature = sig;
        handleCurrencyChange();
      }
    }, 1500);

    return () => {
      window.removeEventListener('currencyChanged', handleCurrencyChange as EventListener);
      window.clearInterval(intervalId);
    };
  }, []);

  const formatted = formatMoney(amount, {
    showSymbol: showSymbol,
    showDecimals: showDecimals,
    baseCurrency: baseCurrency,
    useGlobalCurrency: true
  });

  return (
    <span className={className} data-render-key={renderKey}>
      {formatted}
    </span>
  );
};

export default FormatMoney; 