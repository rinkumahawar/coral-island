import React from 'react';
import Card from '../base/Card';  
import Button from '../base/Button';
import PaymentSummary from '../common/PaymentSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faHeadset, 
  faQuestionCircle,
  faMessage
} from '@fortawesome/free-solid-svg-icons';

interface BookingSupportSectionProps {
  onContactSupport: () => void;
  onShareEmail: () => void;
  onShareWhatsApp: () => void;
  onFaqClick: (question: string) => void;
  items: { name: string; quantity: number; price: number }[];
  addOns: { name: string; price: number }[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'unpaid' | 'failed'; // 'paid' | 'unpaid' | 'failed' ;
}

const BookingSupportSection: React.FC<BookingSupportSectionProps> = ({
  onContactSupport,
  onShareEmail,
  onShareWhatsApp,
  onFaqClick,
  items,
  addOns,
  totalAmount,
  paymentMethod,
  paymentStatus
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <PaymentSummary
        items={items}
        addOns={addOns}
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        paymentStatus={paymentStatus}
      />
      <div className="space-y-4">
        {/* <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Share Your Booking</h3>
          <div className="flex space-x-3">
            <Button
              variant="primary"
              onClick={onShareEmail}
              icon={<FontAwesomeIcon icon={faEnvelope} className="mr-2" />}
              className="flex-1"
            >
              Email
            </Button>
            <Button
              variant="success"
              onClick={onShareWhatsApp}
              icon={<FontAwesomeIcon icon={faMessage} className="mr-2" />}
              className="flex-1"
            >
              WhatsApp
            </Button>
          </div>
        </div> */}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-3">
            Have questions about your booking? Our support team is here to help.
          </p>
          <Button
            variant="primary"
            transparent={true}
            onClick={onContactSupport}
            icon={<FontAwesomeIcon icon={faHeadset} className="mr-2" />}
            className="w-full border border-blue-200 text-blue-600"
          >
            Contact Support
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Frequently Asked Questions</h3>
          <ul className="space-y-2 text-sm">
            <li
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => onFaqClick('change-booking')}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              What if I need to change my booking?
            </li>
            <li
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => onFaqClick('inclusions')}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              What's included in my tour package?
            </li>
            <li
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={() => onFaqClick('weather')}
            >
              <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
              What happens if the weather is bad?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingSupportSection; 