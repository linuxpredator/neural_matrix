import type { MoonPhase } from '../types/falak';

export function getMoonPhase(date: Date = new Date()): MoonPhase {
    // Simple lunar phase calculation (Julian Day method)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Calculate days since known new moon (Jan 6, 2000)
    const jd = julianDate(year, month, day);
    const daysSinceNew = (jd - 2451550.1) % 29.53058867;
    const age = Math.round(daysSinceNew);

    // Calculate illumination
    const illumination = Math.round((1 - Math.cos(2 * Math.PI * (daysSinceNew / 29.53058867))) * 50);

    // Determine phase name and waxing status
    const { phase, isWaxing } = getPhaseName(age, illumination);

    return {
        phase,
        illumination,
        age,
        isWaxing
    };
}

function julianDate(year: number, month: number, day: number): number {
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function getPhaseName(age: number, illumination: number): { phase: string; isWaxing: boolean } {
    if (age < 1) {
        return { phase: 'New Moon', isWaxing: true };
    } else if (age >= 1 && age < 7) {
        return { phase: 'Waxing Crescent', isWaxing: true };
    } else if (age >= 7 && age < 9) {
        return { phase: 'First Quarter', isWaxing: true };
    } else if (age >= 9 && age < 14) {
        return { phase: 'Waxing Gibbous', isWaxing: true };
    } else if (age >= 14 && age < 16) {
        return { phase: 'Full Moon', isWaxing: false };
    } else if (age >= 16 && age < 22) {
        return { phase: 'Waning Gibbous', isWaxing: false };
    } else if (age >= 22 && age < 24) {
        return { phase: 'Last Quarter', isWaxing: false };
    } else {
        return { phase: 'Waning Crescent', isWaxing: false };
    }
}

export function getMoonEmoji(phase: string): string {
    const emojiMap: { [key: string]: string } = {
        'New Moon': '🌑',
        'Waxing Crescent': '🌒',
        'First Quarter': '🌓',
        'Waxing Gibbous': '🌔',
        'Full Moon': '🌕',
        'Waning Gibbous': '🌖',
        'Last Quarter': '🌗',
        'Waning Crescent': '🌘'
    };

    return emojiMap[phase] || '🌑';
}
