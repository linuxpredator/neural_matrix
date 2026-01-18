export interface Location {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
    timezone?: string;
}

export interface PrayerTimes {
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    maghrib: Date;
    isha: Date;
    method: string;
}

export interface QiblaData {
    direction: number; // degrees from North
    distance: number; // km to Makkah
}

export interface HijriDate {
    day: number;
    month: number;
    year: number;
    monthName: string;
    monthNameArabic: string;
    weekday: string;
}

export interface MoonPhase {
    phase: string; // New, Waxing Crescent, First Quarter, etc.
    illumination: number; // 0-100%
    age: number; // days into lunar month
    isWaxing: boolean;
}

export type CalculationMethod = 'JAKIM' | 'MWL' | 'ISNA' | 'EGYPT' | 'TURKEY' | 'RUSSIA';

export type Language = 'en' | 'ms';
