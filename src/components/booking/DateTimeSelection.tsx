import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { EventTicket } from './TicketTypes';
interface DateTimeSelectionProps {
    selectedDate: string;
    selectedTime: string;
    availableTimeSlots: Array<{ time: string; time_12: string }>;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
    selectedTicket: EventTicket;
    adultCount: number;
    childCount: number;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
    selectedDate,
    selectedTime,
    availableTimeSlots,
    onDateChange,
    onTimeChange,
    selectedTicket,
    adultCount,
    childCount
}) => {
    const timeSlots = availableTimeSlots.map(slot => {
        // Use the time_12 format directly
        return {
            value: slot.time,
            label: slot.time_12
        };
    });
    return (
        <section className="bg-white rounded-lg sm:p-6">  
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <label className="block text-gray-700 mb-2 font-medium text-xs sm:text-sm lg:text-base">Tour Date</label>
                    <div className="relative">
                        <DatePicker
                            selected={selectedDate ? new Date(selectedDate) : null}
                            onChange={(date: Date | null) => onDateChange(date ? date.toISOString().split('T')[0] : '')}
                            minDate={new Date()}
                            className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm lg:text-base"
                            calendarClassName="custom-calendar"
                            dayClassName={date => 
                                date.getTime() === new Date(selectedDate).getTime() 
                                    ? "selected-day" 
                                    : ""
                            }
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select a date"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2 font-medium text-xs sm:text-sm lg:text-base">Tour Time</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm lg:text-base"
                            value={selectedTime}
                            onChange={(e) => onTimeChange(e.target.value)}
                        >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot, index) => (
                                <option key={`${slot.value}-${index}`} value={slot.value}>{slot.label}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .react-datepicker-wrapper {
                    width: 100%;
                }
                .custom-calendar {
                    width: 100%;
                    background: #fff;
                    border: 1px solid #e5e7eb;
                    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.04);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    color: #111827;
                }
                .custom-calendar .react-datepicker__month-container {
                    width: 100%;
                }
                .custom-calendar .react-datepicker__day {
                    height: 40px;
                    width: 40px;
                    line-height: 40px;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    border-radius: var(--radius-base);
                    transition: var(--transition-base);
                    box-shadow: none;
                    font-size: 0.875rem;
                    color: #111827;
                    background: transparent;
                    text-align: center;
                }
                @media (min-width: 640px) {
                    .custom-calendar .react-datepicker__day {
                        height: 50px;
                        width: 50px;
                        font-size: 1rem;
                        line-height: 50px;
                    }
                }
                @media (min-width: 1024px) {
                    .custom-calendar .react-datepicker__day {
                        height: 60px;
                        width: 60px;
                        font-size: 1.125rem;
                        line-height: 60px;
                    }
                }
                .custom-calendar .react-datepicker__day:hover {
                    background-color: var(--color-primary-light);
                    color: var(--color-text-white);
                    border: 1px solid var(--color-primary-light);
                }
                .custom-calendar .selected-day {
                    background-color: var(--color-primary) !important;
                    color: var(--color-text-white) !important;
                }
                .custom-calendar .selected-day span {
                    color: var(--color-text-white) !important;
                }
                .custom-calendar .react-datepicker__day--disabled {
                    color: #d1d5db;
                    background-color: #f3f4f6;
                }
                .custom-calendar .react-datepicker__header {
                    background-color: #f9fafb;
                    border-bottom: 1px solid var(--color-border-light);
                    padding: var(--spacing-4);
                }
                .custom-calendar .react-datepicker__current-month {
                    color: #111827;
                    font-weight: 600;
                    font-size: 1rem;
                    margin-bottom: var(--spacing-2);
                }
                @media (min-width: 640px) {
                    .custom-calendar .react-datepicker__current-month {
                        font-size: 1.1rem;
                    }
                }
                .custom-calendar .react-datepicker__day-name {
                    color: #9ca3af;
                    font-weight: 500;
                    width: 40px;
                    margin: 0;
                    padding: var(--spacing-2) 0;
                    font-size: 0.75rem;
                }
                @media (min-width: 640px) {
                    .custom-calendar .react-datepicker__day-name {
                        width: 50px;
                        font-size: 0.875rem;
                    }
                }
                @media (min-width: 1024px) {
                    .custom-calendar .react-datepicker__day-name {
                        width: 60px;
                        font-size: 1rem;
                    }
                }
                .custom-calendar .react-datepicker__navigation {
                    top: var(--spacing-4);
                }
                .custom-calendar .react-datepicker__navigation-icon::before {
                    border-color: var(--color-gray-400);
                }
                .custom-calendar .react-datepicker__navigation:hover *::before {
                    border-color: var(--color-primary-light);
                }
                .custom-calendar .react-datepicker__day--keyboard-selected {
                    background-color: var(--color-primary-light) !important;
                    color: var(--color-text-white) !important;
                }
                .custom-calendar .react-datepicker__day--outside-month {
                    color: var(--color-gray-300);
                }
                .react-datepicker-popper {
                    z-index: 10;
                    padding: 0;
                    border-radius: var(--radius-lg);
                    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.04);
                }
                .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
                .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before {
                    border-bottom-color: #fff;
                }
                .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::after,
                .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::after {
                    border-bottom-color: #fff;
                }
            `}</style>
        </section>
    );
};

export default DateTimeSelection; 