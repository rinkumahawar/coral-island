'use client';

import { formatMoney } from '@/lib/money-format';

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
  return (
    <span className={className}>
      {formatMoney(amount, {
        showSymbol: true,
        showDecimals: showDecimals,
        baseCurrency: baseCurrency,
        useGlobalCurrency: true
      })}
    </span>
  );
};

export default FormatMoney; 