'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomerForm from '@/components/forms/CustomerForm';
import PaymentMethodSelector from '@/components/forms/PaymentMethodSelector';
import CancellationPolicy from '@/components/booking/CancellationPolicy';
import BookingSummary from '@/components/booking/BookingSummary';
import ProgressBar from '@/components/common/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage: React.FC = () => {
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        hotelName: '',
        country: '',
        specialRequests: '',
        receiveUpdates: false
    });

    const [formErrors, setFormErrors] = useState({
        fullName: false,
        email: false,
        phone: false,
        hotelName: false
    });

    const [paymentMethod, setPaymentMethod] = useState<'credit' | 'paypal' | 'bank'>('credit');

    // Booking details (would come from previous page in a real app)
    const bookingDetails = {
        package: "Premium Tour Package",
        date: "Monday, April 28, 2025",
        time: "09:00 AM",
        adults: 2,
        adultPrice: 1800,
        children: 1,
        childPrice: 1200,
        addons: [
            { name: "Parasailing Adventure", price: 800, quantity: 3 },
            { name: "Jet Ski Ride", price: 1200, quantity: 3 },
            { name: "Banana Boat Ride", price: 400, quantity: 3 },
            { name: "Indian Lunch Upgrade", price: 300, quantity: 3 },
            { name: "Premium Insurance Coverage", price: 200, quantity: 3 }
        ]
    };

    // Calculate totals
    const adultTotal = bookingDetails.adults * bookingDetails.adultPrice;
    const childTotal = bookingDetails.children * bookingDetails.childPrice;
    const addonTotal = bookingDetails.addons.reduce((total, addon) => total + (addon.price * addon.quantity), 0);
    const subtotal = adultTotal + childTotal + addonTotal;

    // Event handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user types
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors({
                ...formErrors,
                [name]: false
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        });
    };

    const validateForm = () => {
        const errors = {
            fullName: !formData.fullName,
            email: !formData.email || !/\S+@\S+\.\S+/.test(formData.email),
            phone: !formData.phone,
            hotelName: !formData.hotelName
        };
        setFormErrors(errors);
        return !Object.values(errors).some(error => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Form submitted successfully');
        } else {
            console.log('Form has errors');
        }
    };

    const steps = [
        { number: 1, label: 'Package Selection', status: 'completed' as const },
        { number: 2, label: 'Checkout', status: 'current' as const },
        { number: 3, label: 'Confirmation', status: 'upcoming' as const }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <ProgressBar steps={steps} currentStep={2} />

                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/booking"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back to Package Selection
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        <CustomerForm
                            formData={formData}
                            formErrors={formErrors}
                            onInputChange={handleInputChange}
                            onCheckboxChange={handleCheckboxChange}
                        />

                        <PaymentMethodSelector
                            selectedMethod={paymentMethod}
                            onMethodSelect={setPaymentMethod}
                        />

                        <CancellationPolicy
                            onViewTerms={() => console.log('View terms clicked')}
                        />
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="lg:col-span-1">
                        <BookingSummary
                            packageName={bookingDetails.package}
                            date={bookingDetails.date}
                            time={bookingDetails.time}
                            adultCount={bookingDetails.adults}
                            childCount={bookingDetails.children}
                            adultPrice={bookingDetails.adultPrice}
                            childPrice={bookingDetails.childPrice}
                            addons={bookingDetails.addons}
                            subtotal={subtotal}
                            couponDiscount={0}
                            onApplyCoupon={() => {}}
                            onProceedToCheckout={() => handleSubmit()}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage
