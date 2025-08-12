import React, { useEffect, useRef, useState } from 'react';
import Input from '../base/Input';
import Card from '../base/Card';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { UseFormReturn } from 'react-hook-form';
import { NationalitiesService, Nationality } from '../../lib/api';

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  hotelName: string;
  country: string;
  nationality: string;
  airport: string;
}

interface CustomerFormProps {
  form: UseFormReturn<CustomerFormData>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  form,
}) => {
  const { register, setValue, formState: { errors } } = form;
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const phoneInstanceRef = useRef<any>(null);
  const [nationalities, setNationalities] = useState<Nationality[]>([]);
  const [isLoadingNationalities, setIsLoadingNationalities] = useState(true);

  useEffect(() => {
    if (phoneInputRef.current && !phoneInstanceRef.current) {
      phoneInstanceRef.current = intlTelInput(phoneInputRef.current, {
        initialCountry: 'th',
        separateDialCode: true,
      });

      // Add event listener for country change
      const handleCountryChange = () => {
        const countryData = phoneInstanceRef.current.getSelectedCountryData();
        setValue('phoneCountryCode', countryData.dialCode);
      };

      // Add event listener for phone number change
      const handlePhoneChange = () => {
        setValue('phone', phoneInputRef.current?.value || '');
      };

      phoneInputRef.current.addEventListener('countrychange', handleCountryChange);
      phoneInputRef.current.addEventListener('input', handlePhoneChange);

      // Store the event handlers for cleanup
      phoneInstanceRef.current._handlers = { handleCountryChange, handlePhoneChange };
    }

    return () => {
      if (phoneInstanceRef.current) {
        // Remove event listeners before destroying
        if (phoneInstanceRef.current._handlers) {
          phoneInputRef.current?.removeEventListener('countrychange', phoneInstanceRef.current._handlers.handleCountryChange);
          phoneInputRef.current?.removeEventListener('input', phoneInstanceRef.current._handlers.handlePhoneChange);
        }
        phoneInstanceRef.current.destroy();
        phoneInstanceRef.current = null;
      }
    };
  }, [setValue]);

  // Fetch nationalities on component mount
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        setIsLoadingNationalities(true);
        const data = await NationalitiesService.getNationalities();
        setNationalities(data);
      } catch (error) {
        console.error('Failed to fetch nationalities:', error);
        // Fallback to default nationalities if API fails
        setNationalities([
          { id: 1, name: 'Thailand' },
          { id: 2, name: 'United States' },
          { id: 3, name: 'United Kingdom' },
          { id: 4, name: 'Australia' },
          { id: 5, name: 'India' },
          { id: 6, name: 'Singapore' },
          { id: 7, name: 'Malaysia' },
          { id: 8, name: 'Japan' },
          { id: 9, name: 'China' },
          { id: 10, name: 'South Korea' },
        ]);
      } finally {
        setIsLoadingNationalities(false);
      }
    };

    fetchNationalities();
  }, []);

  // Update phone country when country changes
  // (optional: you can add logic here if you want to sync country field)

  return (
    <Card title="Customer Information">
      <form className="space-y-0" autoComplete="off" onSubmit={e => e.preventDefault()}>
        {/* Full Name & Email Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              label="Full Name"
              id="name"
              {...register('name', { required: 'Full name is required' })}
              error={errors.name?.message}
              required
            />
          </div>
          <div>
            <Input
              label="Email Address"
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/, message: 'Enter a valid email address'
                }
              })}
              error={errors.email?.message}
              required
            />
          </div>
        </div>

        {/* Phone Number & Hotel Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              ref={phoneInputRef}
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              // Do not use {...register('phone', ...)} here to avoid ref conflict
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Hotel Name"
              id="hotelName"
              {...register('hotelName', { required: 'Hotel name is required' })}
              error={errors.hotelName?.message}
              required
            />
            <p className="text-gray-500 text-xs mt-1">We'll pick you up from this hotel</p>
          </div>
        </div>

        {/* Country/Region & Nationality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium text-sm mb-2">
              Nationality <span className="text-red-500">*</span>
              {isLoadingNationalities && (
                <span className="ml-2 text-blue-500 text-xs">Loading...</span>
              )}
            </label>
            <select
              id="nationality"
              {...register('nationality', { required: 'Nationality is required' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              disabled={isLoadingNationalities}
            >
              <option value="">
                {isLoadingNationalities ? 'Loading nationalities...' : 'Select your nationality'}
              </option>
              {nationalities.map((nationality) => (
                <option key={nationality.id} value={nationality.name}>
                  {nationality.name}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
            )}
          </div>
          <div>
            <Input
              label="Airport"
              id="airport"
              {...register('airport', { required: 'Airport is required' })}
              error={errors.airport?.message}
              required
            />
          </div>
        </div>
        {/* Hidden field for phoneCountryCode */}
        <input type="hidden" {...register('phoneCountryCode')} />
      </form>
    </Card>
  );
};

export default CustomerForm; 