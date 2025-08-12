'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { TicketData } from '@/lib/api/services/ticket';

export interface BookingData {
    event_id: number;
    booking_date: string;
    timeslot_id: number;
    timeslot: string;
    ticket: TicketData | null;
    adult_count: number;
    child_count: number;
    adult_price: number;
    child_price: number;
    addons: Array<{
        name: string;
        desc: string;
        price: number;
        type: string;
        available: boolean;
        image: string;
        selected: boolean;
        quantity: number;
        tickets: Array<string>;
    }>;
    total_guests: number;
    
}

interface BookingContextType {
    bookingData: BookingData | null;
    setBookingData: (data: BookingData) => void;
    clearBookingData: () => void;
    updateBookingData: (updates: Partial<BookingData>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
    children: ReactNode;
}

const BOOKING_STORAGE_KEY = 'coral-island-booking-data';

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [bookingData, setBookingDataState] = useState<BookingData | null>(null);

    // Load booking data from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(BOOKING_STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setBookingDataState(parsed);
                } catch (error) {
                    console.error('Failed to parse stored booking data:', error);
                    localStorage.removeItem(BOOKING_STORAGE_KEY);
                }
            }
        }
    }, []);

    const setBookingData = (data: BookingData) => {
        setBookingDataState(data);
        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(data));
        }
    };

    const clearBookingData = () => {
        setBookingDataState(null);
        // Remove from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem(BOOKING_STORAGE_KEY);
        }
    };

    const updateBookingData = (updates: Partial<BookingData>) => {
        if (bookingData) {
            const updatedData = {
                ...bookingData,
                ...updates
            };
            setBookingDataState(updatedData);
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(updatedData));
            }
        }
    };

    const value: BookingContextType = {
        bookingData,
        setBookingData,
        clearBookingData,
        updateBookingData
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = (): BookingContextType => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}; 