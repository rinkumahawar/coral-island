import React from 'react';

interface PaymentMethodIconProps {
  method: string;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method }) => {
  const getIconClass = () => {
    switch (method.toLowerCase()) {
      case 'visa':
        return 'fab fa-cc-visa';
      case 'mastercard':
        return 'fab fa-cc-mastercard';
      case 'amex':
        return 'fab fa-cc-amex';
      case 'paypal':
        return 'fab fa-cc-paypal';
      default:
        return 'fab fa-credit-card';
    }
  };

  return (
    <i 
      className={`${getIconClass()} text-2xl`}
      aria-label={`${method} payment method`}
    ></i>
  );
};

export default PaymentMethodIcon; 