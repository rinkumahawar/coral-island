/**
 * Converts a time string in 24-hour format to 12-hour format
 * @param timeString - Time string in format HH:MM or HH:MM:SS
 * @returns Object containing both 24-hour and 12-hour format times
 */
export const convertTo12HourFormat = (timeString: string): { time: string; time_12: string } => {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(':');
    
    // Convert hours to number
    const hourNum = parseInt(hours, 10);
    
    // Determine AM/PM
    const period = hourNum >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    const hour12 = hourNum % 12 || 12;
    
    // Format the time
    const time12 = `${hour12}:${minutes} ${period}`;
    
    return {
        time: timeString,
        time_12: time12
    };
    
};

/**
 * Formats a date string to YYYY-MM-DD
 * @param dateStr - Any valid date string or Date object
 * @returns string in YYYY-MM-DD format
 */
export const formatDateYMD = (dateStr: string | Date): string => {
    const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

export const formatDuration = (duration: string) => {
    // Check if duration is just a number (minutes)
    if (/^\d+$/.test(duration)) {
      const minutes = parseInt(duration);
      if (minutes < 60) {
        return `${minutes}m`;
      } else if (minutes % 60 === 0) {
        return `${minutes / 60}h`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
      }
    }
    
    // If it's already formatted (e.g., "2h 30m", "1.5h"), return as is
    return duration;
  };