import type { HijriDate } from '../types/falak';

export function gregorianToHijri(date: Date = new Date()): HijriDate {
    // Using Ummul Qura algorithm approximation
    // This is a simplified version - in production, use a proper library

    const gYear = date.getFullYear();
    const gMonth = date.getMonth() + 1;
    const gDay = date.getDate();

    // Convert to Julian Day Number
    let a = Math.floor((14 - gMonth) / 12);
    let y = gYear + 4800 - a;
    let m = gMonth + 12 * a - 3;

    let jdn =
        gDay +
        Math.floor((153 * m + 2) / 5) +
        365 * y +
        Math.floor(y / 4) -
        Math.floor(y / 100) +
        Math.floor(y / 400) -
        32045;

    // Convert JDN to Hijri
    let l = jdn - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j =
        Math.floor((10985 - l) / 5316) *
        Math.floor((50 * l) / 17719) +
        Math.floor(l / 5670) *
        Math.floor((43 * l) / 15238);
    l =
        l -
        Math.floor((30 - j) / 15) *
        Math.floor((17719 * j) / 50) -
        Math.floor(j / 16) *
        Math.floor((15238 * j) / 43) +
        29;

    const hMonth = Math.floor((24 * l) / 709);
    const hDay = l - Math.floor((709 * hMonth) / 24);
    const hYear = 30 * n + j - 30;

    const monthNames = [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
        'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ];

    const monthNamesArabic = [
        'مُحَرَّم', 'صَفَر', 'رَبِيع ٱلْأَوَّل', 'رَبِيع ٱلثَّانِي',
        'جُمَادَىٰ ٱلْأُولَىٰ', 'جُمَادَىٰ ٱلثَّانِيَة', 'رَجَب', 'شَعْبَان',
        'رَمَضَان', 'شَوَّال', 'ذُو ٱلْقَعْدَة', 'ذُو ٱلْحِجَّة'
    ];

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {
        day: hDay,
        month: hMonth,
        year: hYear,
        monthName: monthNames[hMonth - 1],
        monthNameArabic: monthNamesArabic[hMonth - 1],
        weekday: weekdays[date.getDay()]
    };
}

export function getIslamicMonthSignificance(monthNumber: number): string {
    const significance: { [key: number]: string } = {
        1: 'First month of the Islamic calendar',
        7: 'Month of Isra and Mi\'raj',
        8: 'Month preceding Ramadan',
        9: 'Month of fasting (Ramadan)',
        10: 'Month of Eid al-Fitr',
        12: 'Month of Hajj and Eid al-Adha'
    };

    return significance[monthNumber] || '';
}
