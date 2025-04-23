import React from 'react';
import Input from '../base/Input';
import Card from '../base/Card';

interface CustomerFormData {
  fullName: string;
  email: string;
  phone: string;
  hotelName: string;
  country: string;
  specialRequests: string;
  receiveUpdates: boolean;
}

interface CustomerFormErrors {
  fullName: boolean;
  email: boolean;
  phone: boolean;
  hotelName: boolean;
}

interface CustomerFormProps {
  formData: CustomerFormData;
  formErrors: CustomerFormErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  formErrors,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <Card title="Customer Information">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            error={formErrors.fullName ? 'Full name is required' : ''}
            required
          />
          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            error={formErrors.email ? 'Valid email is required' : ''}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            error={formErrors.phone ? 'Phone number is required' : ''}
            required
          />
          <div>
            <Input
              label="Hotel Name"
              id="hotelName"
              name="hotelName"
              value={formData.hotelName}
              onChange={onInputChange}
              error={formErrors.hotelName ? 'Hotel name is required' : ''}
              required
            />
            <p className="text-gray-500 text-sm mt-1">We'll pick you up from this hotel</p>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Country/Region</label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your country</option>
              <option value="TH">Thailand</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="IN">India</option>
              <option value="SG">Singapore</option>
              <option value="MY">Malaysia</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="KR">South Korea</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Special Requests/Notes</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={onInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requests or dietary requirements?"
          ></textarea>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={onCheckboxChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">
              I would like to receive updates about special offers and promotions
            </span>
          </label>
        </div>
      </form>
    </Card>
  );
};

export default CustomerForm; 