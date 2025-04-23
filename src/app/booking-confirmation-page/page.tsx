// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client';
import React, { useState } from 'react';
// @ts-ignore: no type declarations for jsPDF
import jsPDF from 'jspdf';
// @ts-ignore: no type declarations for html2canvas
import html2canvas from 'html2canvas';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgressBar from '@/components/common/ProgressBar';
import BookingConfirmationHeader from '@/components/booking/BookingConfirmationHeader';
import BookingActions from '@/components/booking/BookingActions';
import BookingDetails from '@/components/booking/BookingDetails';
import BookingPrintView from '@/components/booking/BookingPrintView';
import BookingSupportSection from '@/components/booking/BookingSupportSection';
import ImportantInformation from '@/components/booking/ImportantInformation';

const BookingConfirmationPage: React.FC = () => {
    const [showPrintView, setShowPrintView] = useState(false);
    // Booking details
    const bookingDetails = {
        reference: "CORAL-25042-8X7Y",
        package: "Premium Tour Package",
        date: "Monday, April 28, 2025",
        time: "09:00 AM",
        adults: 2,
        adultPrice: 1800,
        children: 1,
        childPrice: 1200,
        addons: [
            { name: "Parasailing Adventure", price: 800, count: 3 },
            { name: "Jet Ski Ride", price: 1200, count: 3 },
            { name: "Banana Boat Ride", price: 400, count: 3 },
            { name: "Indian Lunch Upgrade", price: 300, count: 3 },
            { name: "Premium Insurance Coverage", price: 200, count: 3 }
        ],
        customer: {
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+1 (555) 123-4567",
            hotel: "Pattaya Beach Resort",
            country: "United States"
        },
        paymentMethod: "Credit Card (Visa ****4567)"
    };
    // Calculate totals
    const adultTotal = bookingDetails.adults * bookingDetails.adultPrice;
    const childTotal = bookingDetails.children * bookingDetails.childPrice;
    const addonTotal = bookingDetails.addons.reduce((total, addon) => total + (addon.price * addon.count), 0);
    const grandTotal = adultTotal + childTotal + addonTotal;

    if (showPrintView) {
        return (
            <BookingPrintView
                bookingDetails={bookingDetails}
                onClose={() => setShowPrintView(false)}
            />
        );
    }
    const steps = [
        { number: 1, label: 'Package Selection', status: 'completed' as const },
        { number: 2, label: 'Checkout', status: 'completed' as const },
        { number: 3, label: 'Confirmation', status: 'current' as const }
    ];
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <ProgressBar steps={steps} currentStep={3} />
                <BookingConfirmationHeader
                    reference={bookingDetails.reference}
                    email={bookingDetails.customer.email}
                    className="mb-4"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <BookingDetails
                            tourDetails={bookingDetails}
                            customerDetails={bookingDetails.customer}
                        />
                        
                        <ImportantInformation 
                            pickupDetails={{
                                hotel: "Pattaya Beach Resort",
                                time: "8:00 AM"
                            }}
                            itemsToBring={[
                                "Swimwear",
                                "Towel",
                                "Sunscreen",
                                "Sunglasses",
                                "Hat or cap",
                                "Camera",
                                "Cash for extras",
                                "Water bottle"
                            ]}
                            contactInfo={{
                                support: {
                                    phone: "+66 38 123 4567",
                                    email: "support@coralislandtour.com"
                                },
                                emergency: {
                                    phone: "+66 81 234 5678",
                                    available: "24/7"
                                }
                            }}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <BookingSupportSection
                                onContactSupport={() => console.log('Contact support clicked')}
                                onShareEmail={() => console.log('Share email clicked')}
                                onShareWhatsApp={() => console.log('Share WhatsApp clicked')}
                                onFaqClick={(question) => console.log('FAQ clicked:', question)}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default BookingConfirmationPage
