import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface DateTimeSelectionProps {
    selectedDate: string;
    selectedTime: string;
    availableTimeSlots: string[];
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
    selectedTicket: {
        name: string;
        adultPrice: number;
        childPrice: number;
    };
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
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    const calculateTotalPrice = () => {
        const adultTotal = adultCount * selectedTicket.adultPrice;
        const childTotal = childCount * selectedTicket.childPrice;
        return adultTotal + childTotal;
    };

    // Custom price renderer for each date
    const renderDayContents = (day: number, date: Date) => {
        const totalPrice = calculateTotalPrice();
        const isHovered = hoveredDate && hoveredDate.getTime() === date.getTime();
        
        return (
            <div 
                className="relative w-full h-full"
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
            >
                <span className="absolute top-1 left-1">{day}</span>
                {isHovered && (
                    <div className="absolute bottom-1 right-1 text-xs bg-primary-light text-white px-2 py-1">
                        ฿{totalPrice.toLocaleString()}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Tour Date</label>
                    <div className="relative">
                        <DatePicker
                            selected={selectedDate ? new Date(selectedDate) : null}
                            onChange={(date: Date | null) => onDateChange(date ? date.toISOString().split('T')[0] : '')}
                            minDate={new Date()}
                            renderDayContents={renderDayContents}
                            className="w-[100%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Tour Time</label>
                    <div className="relative">
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                            value={selectedTime}
                            onChange={(e) => onTimeChange(e.target.value)}
                        >
                            <option value="">Select a time slot</option>
                            {availableTimeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .custom-calendar {
                    width: 100%;
                    border: 1px solid var(--color-border-light);
                    box-shadow: var(--shadow-md);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                }
                .custom-calendar .react-datepicker__month-container {
                    width: 100%;
                }
                .custom-calendar .react-datepicker__day {
                    height: 60px;
                    width: 60px;
                    line-height: 1;
                    margin: 0;
                    padding: 0;
                    position: relative;
                    border-radius: var(--radius-base);
                    transition: var(--transition-base);
                    box-shadow: var(--shadow-sm);
                }
                .custom-calendar .react-datepicker__day:hover {
                    background-color: var(--color-primary-light);
                    color: var(--color-text-white);
                    border: 1px solid #3b82f6; /* border-blue-500 */
                }
                .custom-calendar .selected-day {
                    background-color: var(--color-primary) !important;
                    color: var(--color-text-white);
                }
                .custom-calendar .selected-day span {
                    color: var(--color-text-white);
                }
                .custom-calendar .react-datepicker__day--disabled {
                    color: var(--color-gray-400);
                    background-color: var(--color-bg-secondary);
                }
                .custom-calendar .react-datepicker__header {
                    background-color: var(--color-bg-primary);
                    border-bottom: 1px solid var(--color-border-light);
                    padding: var(--spacing-4);
                }
                .custom-calendar .react-datepicker__current-month {
                    color: var(--color-text-primary);
                    font-weight: 600;
                    font-size: 1.1rem;
                    margin-bottom: var(--spacing-2);
                }
                .custom-calendar .react-datepicker__day-name {
                    color: var(--color-text-secondary);
                    font-weight: 500;
                    width: 60px;
                    margin: 0;
                    padding: var(--spacing-2) 0;
                }
                .custom-calendar .react-datepicker__navigation {
                    top: var(--spacing-4);
                }
                .custom-calendar .react-datepicker__navigation-icon::before {
                    border-color: var(--color-text-secondary);
                }
                .custom-calendar .react-datepicker__navigation:hover *::before {
                    border-color: var(--color-primary);
                }
                .custom-calendar .react-datepicker__day--keyboard-selected {
                    background-color: var(--color-primary-light) !important;
                    color: var(--color-text-white) !important;
                }
                .custom-calendar .react-datepicker__day--outside-month {
                    color: var(--color-gray-400);
                }
                .react-datepicker-popper {
                    z-index: 10;
                    padding: 0;
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                }
                .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::before,
                .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::before {
                    border-bottom-color: var(--color-bg-primary);
                }
                .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle::after,
                .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle::after {
                    border-bottom-color: var(--color-bg-primary);
                }
                
                /* Add border colors from TourInformation.tsx */
                .custom-calendar {
                    border: 1px solid #bfdbfe; /* border-blue-200 */
                }
                
                /* Add gradient background similar to TourInformation cards */
                .custom-calendar .react-datepicker__header {
                    background: linear-gradient(to bottom right, #eff6ff, #dbeafe); /* from-blue-50 to-blue-100 */
                }
                
                /* Style the day cells with a subtle border */
                .custom-calendar .react-datepicker__day {
                    border: 1px solid rgba(191, 219, 254, 0.3); /* border-blue-200 with opacity */
                }
                
                /* Style the selected day with a stronger border */
                .custom-calendar .selected-day {
                    border: 1px solid #3b82f6; /* border-blue-500 */
                }
            `}
            </style>
        </section>
    );
};

export default DateTimeSelection; 