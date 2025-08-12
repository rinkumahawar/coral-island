import React, { useState } from 'react';
import Card from '../base/Card';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard,
  faShieldAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

type PaymentMethod = 'omise';

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
    features,
    isRecommended = false
  }: { 
    method: PaymentMethod;
    title: string;
    description: string;
    icons: React.ReactNode;
    features: string[];
    isRecommended?: boolean;
  }) => (
    <div
      className={cn(
        'border-2 rounded-lg p-4 sm:p-5 lg:p-6 transition-all duration-200 cursor-pointer relative',
        selectedMethod === method 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
      )}
      onClick={() => onMethodSelect(method)}
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          Recommended
        </div>
      )}
      
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="ml-3 flex items-center space-x-2">{icons}</div>
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="text-green-500 mr-2 w-4 h-4" 
                />
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <div className="ml-4 flex items-center h-full">
          <div className={cn(
            "w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            selectedMethod === method 
              ? 'border-blue-500 bg-blue-500' 
              : 'border-gray-300'
          )}>
            {selectedMethod === method && (
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card title="Secure Payment Methods">
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">Secure Payment Processing</span>
          </div>
          <p className="text-sm text-blue-700">
            All payments are processed securely. Your card details are encrypted and never stored on our servers.
          </p>
        </div>

        <PaymentOption
          method="omise"
          title="Credit/Debit Card (Omise)"
          description="Pay securely with your credit or debit card via Omise. 3D Secure supported."
          isRecommended={true}
          icons={
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">AMEX</span>
              </div>
            </div>
          }
          features={[
            "Credit & Debit Cards (Visa, Mastercard, Amex)",
            "3D Secure Authentication",
            "PCI DSS Compliant",
            "24/7 Thai support"
          ]}
        />
      </div>
    </Card>
  );
};

export default PaymentMethodSelector; 