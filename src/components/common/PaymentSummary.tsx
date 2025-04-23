import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faClock, 
  faTimesCircle, 
  faQuestionCircle,
  faPlus,
  faCreditCard
} from '@fortawesome/free-solid-svg-icons';

interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

interface AddOnItem {
  name: string;
  price: number;
}

interface PaymentSummaryProps {
  items: PaymentItem[];
  addOns?: AddOnItem[];
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus?: 'completed' | 'pending' | 'failed';
  currency?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  items,
  addOns = [],
  totalAmount,
  paymentMethod,
  paymentStatus = 'completed',
  currency = '฿'
}) => {
  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'completed':
        return faCheckCircle;
      case 'pending':
        return faClock;
      case 'failed':
        return faTimesCircle;
      default:
        return faQuestionCircle;
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Summary</h2>
      
      <div className="space-y-4 mb-6">
        {/* Main items */}
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{item.name}:</span>
            <span className="font-medium">{item.quantity} × {currency}{item.price.toLocaleString()}</span>
          </div>
        ))}
        
        {/* Add-ons section */}
        {addOns.length > 0 && (
          <div className="pt-2">
            <span className="text-gray-600 font-medium">
              <FontAwesomeIcon icon={faPlus} className="mr-2 text-blue-500" />
              Add-ons:
            </span>
            <ul className="mt-2 space-y-2">
              {addOns.map((addon, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-600">- {addon.name}</span>
                  <span className="font-medium">{currency}{addon.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Total and payment status */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">Total Paid:</span>
          <span className="text-xl font-bold text-green-600">{currency}{totalAmount.toLocaleString()}</span>
        </div>
        
        {paymentMethod && (
          <div className="text-sm text-gray-600 mt-2">
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={getStatusIcon()} 
                className={`${getStatusColor()} mr-2`} 
              />
              Payment {paymentStatus} via {paymentMethod}
              {paymentMethod.toLowerCase().includes('card') && (
                <FontAwesomeIcon icon={faCreditCard} className="ml-2 text-gray-400" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSummary; 