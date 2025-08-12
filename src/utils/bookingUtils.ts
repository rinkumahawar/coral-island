import { BookingData } from '@/contexts/BookingContext';

export const validateBookingData = (data: BookingData | null): boolean => {
    if (!data) return false;
    
    return !!(
        data.booking_date &&
        data.timeslot &&
        data.ticket &&
        data.adult_count > 0 &&
        data.child_count >= 0 &&
        data.adult_price > 0 && 
        data.child_price > 0 &&
        data.total_guests > 0
    );
};

export const formatBookingSummary = (data: BookingData): string => {
    if (!validateBookingData(data)) {
        return 'Invalid booking data';
    }

    const ticket = data.ticket!;
    const adultTotal = data.adult_price * data.adult_count;
    const childTotal = data.child_price * data.child_count;
    const addonTotal = data.addons
        .filter((addon: any) => addon.selected)
        .reduce((total: number, addon: any) => total + (addon.price * addon.quantity), 0);
    
    const total = adultTotal + childTotal + addonTotal;

    return `${ticket.title} - ${data.booking_date} at ${data.timeslot} - Total: ฿${total.toLocaleString()}`;
};

export const clearStoredBookingData = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('coral-island-booking-data');
    }
}; 