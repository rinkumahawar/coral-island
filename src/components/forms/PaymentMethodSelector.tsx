import React from 'react';
import Card from '../base/Card';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUniversity,
  faCreditCard,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';

type PaymentMethod = 'credit' | 'paypal' | 'bank';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
}) => {
  const PaymentOption = ({ 
    method, 
    title, 
    description, 
    icons, 
    children 
  }: { 
    method: PaymentMethod;
    title: string;
    description: string;
    icons: React.ReactNode;
    children?: React.ReactNode;
  }) => (
    <div
      className={cn(
        'border-2 rounded-lg p-4 transition cursor-pointer',
        selectedMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
      )}
      onClick={() => onMethodSelect(method)}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="ml-4">{icons}</div>
          </div>
          <p className="text-gray-600 mt-1">{description}</p>
          {selectedMethod === method && children && (
            <div className="mt-4">{children}</div>
          )}
        </div>
        <div className="ml-4 flex items-center h-full">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selectedMethod === method ? 'border-blue-500' : 'border-gray-300'
          }`}>
            {selectedMethod === method && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card title="Payment Method">
      <div className="space-y-4">
        <PaymentOption
          method="credit"
          title="Credit/Debit Card"
          description="Secure payment with credit or debit card"
          icons={
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faCreditCard} className="text-blue-800 text-xl" />
              <FontAwesomeIcon icon={faCreditCard} className="text-red-600 text-xl" />
              <FontAwesomeIcon icon={faCreditCard} className="text-blue-500 text-xl" />
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Card Number</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name as it appears on card"
              />
            </div>
          </div>
        </PaymentOption>

        <PaymentOption
          method="paypal"
          title="PayPal"
          description="Fast and secure payment with PayPal"
          icons={<FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-700 text-xl" />}
        >
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700">You will be redirected to PayPal to complete your payment securely.</p>
          </div>
        </PaymentOption>

        <PaymentOption
          method="bank"
          title="Bank Transfer"
          description="Manual bank transfer to our account"
          icons={<FontAwesomeIcon icon={faUniversity} className="text-gray-700 text-xl" />}
        >
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 mb-2">Please transfer the total amount to the following bank account:</p>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Bank Name:</span> Bangkok Bank</p>
              <p><span className="font-medium">Account Name:</span> Coral Island Tours Co., Ltd.</p>
              <p><span className="font-medium">Account Number:</span> 123-4-56789-0</p>
              <p><span className="font-medium">SWIFT Code:</span> BKKBTHBK</p>
            </div>
            <p className="mt-2 text-gray-700">Please use your booking reference as payment reference.</p>
          </div>
        </PaymentOption>
      </div>
    </Card>
  );
};

export default PaymentMethodSelector; 