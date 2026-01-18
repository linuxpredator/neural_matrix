import { Coordinates, CalculationMethod, CalculationParameters, PrayerTimes as AdhanPrayerTimes } from 'adhan';
import type { PrayerTimes, CalculationMethod as FalakMethod } from '../types/falak';

export function calculatePrayerTimes(
    latitude: number,
    longitude: number,
    date: Date = new Date(),
    method: FalakMethod = 'JAKIM'
): PrayerTimes {
    const coordinates = new Coordinates(latitude, longitude);

    // Map our method to adhan CalculationMethod
    let params: CalculationParameters;

    switch (method) {
        case 'JAKIM':
            // Malaysia (JAKIM) - Similar to Egypt with slight modifications
            params = CalculationMethod.Singapore(); // Close approximation
            params.fajrAngle = 20;
            params.ishaAngle = 18;
            break;

        case 'MWL':
            params = CalculationMethod.MuslimWorldLeague();
            break;

        case 'ISNA':
            params = CalculationMethod.NorthAmerica();
            break;

        case 'EGYPT':
            params = CalculationMethod.Egyptian();
            break;

        case 'TURKEY':
            params = CalculationMethod.Turkey();
            break;

        case 'RUSSIA':
            // Custom for Russia
            params = CalculationMethod.MuslimWorldLeague();
            params.fajrAngle = 16;
            params.ishaAngle = 15;
            break;

        default:
            params = CalculationMethod.MuslimWorldLeague();
    }

    const prayerTimes = new AdhanPrayerTimes(coordinates, date, params);

    return {
        fajr: prayerTimes.fajr,
        sunrise: prayerTimes.sunrise,
        dhuhr: prayerTimes.dhuhr,
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
        method: method
    };
}

export function getNextPrayer(prayerTimes: PrayerTimes): { name: string; time: Date } | null {
    const now = new Date();
    const prayers = [
        { name: 'fajr', time: prayerTimes.fajr },
        { name: 'sunrise', time: prayerTimes.sunrise },
        { name: 'dhuhr', time: prayerTimes.dhuhr },
        { name: 'asr', time: prayerTimes.asr },
        { name: 'maghrib', time: prayerTimes.maghrib },
        { name: 'isha', time: prayerTimes.isha }
    ];

    for (const prayer of prayers) {
        if (prayer.time > now) {
            return prayer;
        }
    }

    return null; // All prayers passed for today
}

export function formatPrayerTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}
