import { Illumination, SearchMoonPhase } from 'astronomy-engine';
import type { MoonPhase } from '../types/falak';

export function getMoonPhase(date: Date = new Date()): MoonPhase {
    // Get moon illumination percentage
    const illum = Illumination('Moon', date);
    const illumination = Math.round(illum.phase_fraction * 100);

    // Find the most recent new moon
    const newMoon = SearchMoonPhase(date);

    // Calculate days since new moon
    const daysSinceNew = (date.getTime() - newMoon.getTime()) / (1000 * 60 * 60 * 24);
    const age = Math.round(daysSinceNew);

    // Determine phase name and waxing status
    const { phase, isWaxing } = getPhaseName(age, illumination);

    return {
        phase,
        illumination,
        age,
        isWaxing
    };
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
