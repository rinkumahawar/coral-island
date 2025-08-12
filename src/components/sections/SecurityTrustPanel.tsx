'use client';

import React from 'react';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faCertificate, faLock, faCheckCircle, faUserShield, faCreditCard } from '@fortawesome/free-solid-svg-icons';

interface SecurityTrustPanelProps {
  className?: string;
}

const SecurityTrustPanel: React.FC<SecurityTrustPanelProps> = ({ className = '' }) => {
  const securityFeatures = [
    {
      icon: faShieldAlt,
      title: 'SSL Secure Connection',
      description: 'All transactions are protected with 256-bit SSL encryption'
    },
    {
      icon: faCertificate,
      title: 'Licensed Tour Operator',
      description: 'Fully licensed and insured tour operator in Thailand'
    },
    {
      icon: faLock,
      title: 'Secure Payment Gateway',
      description: 'Powered by Omise - Thailand\'s leading payment processor'
    },
    {
      icon: faCheckCircle,
      title: 'Verified Reviews',
      description: 'All customer reviews are verified and authentic'
    },
    {
      icon: faUserShield,
      title: 'Data Protection',
      description: 'Your personal information is protected under GDPR guidelines'
    },
    {
      icon: faCreditCard,
      title: 'Secure Payment Methods',
      description: 'Multiple secure payment options including credit cards and digital wallets'
    }
  ];

  const certifications = [
    'TAT Licensed Tour Operator',
    'TripAdvisor Certificate of Excellence',
    'Safe Travels Stamp',
    'COVID-19 Safety Certified'
  ];

  return (
    <Card title="Security & Trust" className={`mb-8 ${className}`}>
      <div className="space-y-6">
        {/* Security Features */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <FontAwesomeIcon 
                    icon={feature.icon} 
                    className="text-blue-600 text-lg"
                  />
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 text-sm">{feature.title}</h5>
                  <p className="text-gray-600 text-xs mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-semibold text-blue-900 mb-4 text-lg">Certifications & Licenses</h4>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <FontAwesomeIcon 
                  icon={faCheckCircle} 
                  className="text-green-500 text-sm"
                />
                <span className="text-gray-700 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <FontAwesomeIcon 
              icon={faShieldAlt} 
              className="text-green-600 text-lg"
            />
            <h5 className="font-semibold text-green-800">100% Secure Booking</h5>
          </div>
          <p className="text-green-700 text-sm">
            Your booking is protected with our comprehensive security measures and customer guarantee.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SecurityTrustPanel; 