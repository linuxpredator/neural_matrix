/**
 * Format ISO date string to human-readable format
 * @param isoDate Date in format "2020-01-15"
 * @returns Formatted date like "January 2020"
 */
export function formatAccountCreationDate(isoDate: string): string {
    try {
        const date = new Date(isoDate);
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${year}`;
    } catch (error) {
        return isoDate; // Fallback to original if parsing fails
    }
}

/**
 * Format ISO date string to short format
 * @param isoDate Date in format "2020-01-15"
 * @returns Formatted date like "Jan 2020"
 */
export function formatAccountCreationDateShort(isoDate: string): string {
    try {
        const date = new Date(isoDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${year}`;
    } catch (error) {
        return isoDate;
    }
}
