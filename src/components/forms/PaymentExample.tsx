'use client';

import React, { useState } from 'react';
import { PaymentService, PaymentRequest } from '@/lib/api/services/payment';

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  amount: number;
  currency: string;
  description: string;
}

export default function PaymentExample() {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardName: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    amount: 0,
    currency: 'THB',
    description: 'Payment for tour booking'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImmediatePayment = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // First create Omise token
      const token = await PaymentService.createOmiseToken({
        name: formData.cardName,
        number: formData.cardNumber,
        expiration_month: formData.expirationMonth,
        expiration_year: formData.expirationYear,
        security_code: formData.securityCode
      });

      // Then create immediate payment
      const paymentResult = await PaymentService.createImmediatePayment({
        token,
        amount: formData.amount,
        currency: formData.currency,
        description: formData.description
      });

      setResult(paymentResult);
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handle3DSPayment = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // First create Omise token
      const token = await PaymentService.createOmiseToken({
        name: formData.cardName,
        number: formData.cardNumber,
        expiration_month: formData.expirationMonth,
        expiration_year: formData.expirationYear,
        security_code: formData.securityCode
      });

      // Then create payment with 3DS support
      const paymentResult = await PaymentService.createPaymentWith3DS({
        token,
        amount: formData.amount,
        currency: formData.currency,
        description: formData.description,
        return_uri: `${window.location.origin}/payment-return`
      });

      setResult(paymentResult);

      // If 3DS redirect is required, redirect the user
      if (paymentResult.data.requires_redirect && paymentResult.data.redirect_url) {
        window.location.href = paymentResult.data.redirect_url;
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Example</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="4111 1111 1111 1111"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Month</label>
            <input
              type="text"
              name="expirationMonth"
              value={formData.expirationMonth}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              name="expirationYear"
              value={formData.expirationYear}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="2025"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="text"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="THB">THB</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Payment for tour booking"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleImmediatePayment}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Immediate Payment'}
          </button>
          
          <button
            onClick={handle3DSPayment}
            disabled={loading}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : '3DS Payment'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 