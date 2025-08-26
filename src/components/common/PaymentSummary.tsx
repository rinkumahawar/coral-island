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
import FormatMoney from '@/components/common/FormatMoney';

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
  paymentStatus?: 'paid' | 'unpaid' | 'failed'; // 'paid' | 'unpaid' | 'failed' ;
  currency?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  items,
  addOns = [],
  totalAmount,
  paymentMethod,
  paymentStatus = 'paid',
  currency = '฿'
}) => {
  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'paid':
        return 'text-green-500';
      case 'unpaid':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'paid':
        return faCheckCircle;
      case 'unpaid':
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
            <span className="font-medium">{item.quantity} × <FormatMoney amount={Number(item.price)} /></span>
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
                  <span className="font-medium"><FormatMoney amount={Number(addon.price)} /></span>
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
          <span className="text-xl font-bold text-green-600"><FormatMoney amount={Number(totalAmount)} /></span>
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