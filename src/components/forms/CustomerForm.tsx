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
  airport?: string; // Made optional
}

interface CustomerFormProps {
  form: UseFormReturn<CustomerFormData>;
  onPhoneValidation?: (isValid: boolean) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  form,
  onPhoneValidation
}) => {
  const { register, setValue, formState: { errors }, setError, clearErrors } = form;
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const phoneInstanceRef = useRef<any>(null);
  const [nationalities, setNationalities] = useState<Nationality[]>([]);
  const [isLoadingNationalities, setIsLoadingNationalities] = useState(true);

  // Function to manually validate phone field
  const validatePhone = () => {
    const phoneValue = phoneInputRef.current?.value || '';
    if (phoneValue.trim() === '') {
      setError('phone', { type: 'required', message: 'Phone number is required' });
      onPhoneValidation?.(false);
      return false;
    } else {
      clearErrors('phone');
      onPhoneValidation?.(true);
      return true;
    }
  };



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
        const phoneValue = phoneInputRef.current?.value || '';
        setValue('phone', phoneValue);
        
        // Trigger validation for the phone field
        if (phoneValue.trim() === '') {
          setError('phone', { type: 'required', message: 'Phone number is required' });
        } else {
          clearErrors('phone');
        }
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
        setNationalities([]);
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
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                errors.phone 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'
              }`}
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
                <option key={nationality.id} value={nationality.id}>
                  {nationality.name}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
            )}
          </div>
        </div>
        {/* Hidden field for phoneCountryCode */}
        <input type="hidden" {...register('phoneCountryCode')} />
        {/* Hidden field for phone validation */}
        <input type="hidden" {...register('phone', { required: 'Phone number is required' })} />
      </form>
    </Card>
  );
};

export default CustomerForm; 