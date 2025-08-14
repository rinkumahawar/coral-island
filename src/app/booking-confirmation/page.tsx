// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgressBar from '@/components/common/ProgressBar';
import BookingConfirmationHeader from '@/components/booking/BookingConfirmationHeader';
import BookingDetails from '@/components/booking/BookingDetails';
import BookingPrintView from '@/components/booking/BookingPrintView';
import BookingSupportSection from '@/components/booking/BookingSupportSection';
import ImportantInformation from '@/components/booking/ImportantInformation';
import { BookingService } from '@/lib/api/services/booking';
import { TicketService, TicketData, EventData } from '@/lib/api/services/ticket';
import { formatMoney } from '@/lib/money-format';

const BookingConfirmationContent: React.FC = () => {
    const [showPrintView, setShowPrintView] = useState(false);
    const searchParams = useSearchParams();
    const bookingCode = searchParams.get('code');

    // New state for fetched booking details
    const [bookingDetails, setBookingDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for voucher URL
    const [voucherUrl, setVoucherUrl] = useState<string | undefined>(undefined);

    // State for event and tickets
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [ticketsData, setTicketsData] = useState<{ [key: string]: TicketData }>({});
    const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
    const [ticketsLoading, setTicketsLoading] = useState(true);
    const [ticketsError, setTicketsError] = useState<string | null>(null);

    // Fetch event and tickets
    useEffect(() => {
        setTicketsLoading(true);
        setTicketsError(null);
        TicketService.getEventTickets()
            .then((response) => {
                setEventData(response.event);
                const formattedTickets = response.tickets.reduce<{ [key: string]: TicketData }>((acc, ticket) => {
                    acc[ticket.id] = ticket;
                    return acc;
                }, {});
                setTicketsData(formattedTickets);
            })
            .catch((err) => {
                setTicketsError(err?.message || 'Failed to fetch ticket details');
            })
            .finally(() => setTicketsLoading(false));
    }, []);

    // Fetch booking details
    useEffect(() => {
        if (bookingCode) {
            setLoading(true);
            setError(null);
            BookingService.getBooking(bookingCode)
                .then((res) => {
                    if (res.success && res.data) {
                        const data = res.data;
                        const mainService = data.booking_services && data.booking_services[0];
                        // Extract selected ticket meta
                        let selectedTicketMeta = null;
                        let selectedTicket = null;
                        let selectedTicketExtraPrice = null;
                        if (mainService && mainService.booking_services_meta) {
                            selectedTicketMeta = mainService.booking_services_meta.find((meta: any) => meta.name === 'selected_tickets');
                            if (selectedTicketMeta && Array.isArray(selectedTicketMeta.val) && selectedTicketMeta.val.length > 0) {
                                selectedTicket = selectedTicketMeta.val[0];
                            }
                            const extraPriceMeta = mainService.booking_services_meta.find((meta: any) => meta.name === 'extra_price');

                            if (extraPriceMeta && Array.isArray(extraPriceMeta.val) && extraPriceMeta.val.length > 0) {
                                selectedTicketExtraPrice = extraPriceMeta.val;
                            }

                        }
                        // Compose customer info
                        const customer = {
                            name: (data.first_name || '') + (data.last_name ? ' ' + data.last_name : ''),
                            email: data.email || '',
                            phone: "+" + data.phonecode + " " + data.phone || '',
                            hotel: mainService?.passenger_details?.pickup_hotel_name || '',
                            country: mainService?.passenger_details?.nationality || '',
                        };
                        setBookingDetails({
                            status: data.status || 'unpaid',
                            reference: data.code || '',
                            event: eventData?.title || '',
                            ticketType: selectedTicket?.title || 'Ticket',
                            date: mainService?.start_date ? new Date(mainService.start_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '',
                            time: selectedTicket?.timeSlotText || (selectedTicket?.timeslots?.time) || '',
                            adults: selectedTicket?.adult_ticket || 0,
                            adultPrice: selectedTicket?.adult_price || 0,
                            children: selectedTicket?.child_ticket || 0,
                            childPrice: selectedTicket?.child_price || 0,
                            extraPrice: selectedTicketExtraPrice || [], // Add-on mapping if available
                            customer,
                            payment_method: '', // Add if available
                            ticket_id: selectedTicket?.id || null,
                        });
                    } else {
                        setError(res.message || 'Booking not found');
                    }
                })
                .catch((err) => {
                    setError(err?.message || 'Failed to fetch booking details');
                })
                .finally(() => setLoading(false));
        }
    }, [bookingCode]);

    // Fetch voucher URL when booking details are loaded
    useEffect(() => {
        if (bookingCode && bookingDetails) {
            BookingService.getBookingVoucher(bookingCode)
                .then((response) => {
                    if (response.success && response.data?.url) {
                        setVoucherUrl(response.data.url);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching voucher URL:', error);
                });
        }
    }, [bookingCode, bookingDetails]);

    // Map booking's ticket to ticket data after both are loaded
    useEffect(() => {
        if (bookingDetails && ticketsData && Object.keys(ticketsData).length > 0) {
            const ticketId = bookingDetails.ticket_id;
            if (ticketId && ticketsData[ticketId]) {
                setSelectedTicket(ticketsData[ticketId]);
            } else {
                setSelectedTicket(null);
            }
        }
    }, [bookingDetails, ticketsData]);

    if (loading || ticketsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-lg text-blue-700">Loading booking details...</div>
            </div>
        );
    }
    if (error || ticketsError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-lg text-red-600">{error || ticketsError}</div>
            </div>
        );
    }
    if (!bookingDetails) {
        return null;
    }

    if (showPrintView) {
        return (
            <BookingPrintView
                bookingDetails={{
                    ...bookingDetails,
                    event: bookingDetails.event,
                    ticketType: bookingDetails.ticketType,
                }}
                onClose={() => setShowPrintView(false)}
            />
        );
    }
    const steps = [
        { number: 1, label: 'Event Selection', status: 'completed' as const },
        { number: 2, label: 'Checkout', status: 'completed' as const },
        { number: 3, label: 'Confirmation', status: 'current' as const }
    ];

    // Calculate payment summary data
    const adults = bookingDetails.adults || 0;
    const adultPrice = bookingDetails.adultPrice || 0;
    const children = bookingDetails.children || 0;
    const childPrice = bookingDetails.childPrice || 0;
    const extraPrice = bookingDetails.extraPrice || [];
    const addOnsSummary = extraPrice.map((addon: any) => ({
        name: addon.name,
        price: addon.total || 0
    }));
    const totalAmount = (adults * adultPrice) + (children * childPrice) + addOnsSummary.reduce((sum: number, a: any) => sum + a.price, 0);
    const paymentMethod = bookingDetails.payment_method || 'Card Payment';
    // Map status to allowed values

    let paymentStatus: 'paid' | 'unpaid' | 'failed' = 'unpaid';
    if (bookingDetails.status === 'paid') paymentStatus = 'paid';
    else if (bookingDetails.status === 'unpaid' || bookingDetails.status === 'pending') paymentStatus = 'unpaid';
    else if (bookingDetails.status === 'failed') paymentStatus = 'failed';

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <ProgressBar steps={steps} currentStep={3} />
                <BookingConfirmationHeader
                    voucherUrl={voucherUrl}
                    reference={bookingDetails.reference}
                    email={bookingDetails.customer.email}
                    className="mb-4"
                    status={paymentStatus}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <BookingDetails
                            eventDetails={bookingDetails}
                            customerDetails={bookingDetails.customer}
                        />
                        
                        <ImportantInformation 
                            pickupDetails={{
                                hotel: bookingDetails.customer.hotel,
                                time: "8:00 AM"
                            }}
                            itemsToBring={[
                                "Event ticket (printed or digital)",
                                "Photo ID",
                                "Comfortable clothing",
                                "Snacks & water",
                                "Cash for extras",
                                "Camera or phone",
                                "Any required documents"
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
                                onContactSupport={() => {}}
                                onShareEmail={() => {}}
                                onShareWhatsApp={() => {}}
                                onFaqClick={(question) => {}}
                                items={[
                                    { name: 'Adults', quantity: adults, price: adultPrice },
                                    { name: 'Children', quantity: children, price: childPrice }
                                ]}
                                addOns={addOnsSummary}
                                totalAmount={totalAmount}
                                paymentMethod={paymentMethod}
                                paymentStatus={paymentStatus}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const BookingConfirmationPage: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading booking details...</div>}>
            <BookingConfirmationContent />
        </Suspense>
    );
};
export default BookingConfirmationPage
