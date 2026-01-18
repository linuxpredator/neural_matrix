export const translations = {
    en: {
        // Prayer names
        fajr: 'Fajr',
        sunrise: 'Sunrise',
        dhuhr: 'Dhuhr',
        asr: 'Asr',
        maghrib: 'Maghrib',
        isha: 'Isha',

        // UI labels
        prayerTimes: 'Prayer Times',
        qiblaDirection: 'Qibla Direction',
        islamicCalendar: 'Islamic Calendar',
        moonPhase: 'Moon Phase',
        currentLocation: 'Current Location',
        method: 'Method',
        nextPrayer: 'Next Prayer',
        distanceToMakkah: 'Distance to Makkah',
        degreesFromNorth: 'degrees from North',
        illumination: 'Illumination',
        dayOfYear: 'Day of Hijri Year',

        // Moon phases
        newMoon: 'New Moon',
        waxingCrescent: 'Waxing Crescent',
        firstQuarter: 'First Quarter',
        waxingGibbous: 'Waxing Gibbous',
        fullMoon: 'Full Moon',
        waningGibbous: 'Waning Gibbous',
        lastQuarter: 'Last Quarter',
        waningCrescent: 'Waning Crescent',

        // Weekdays
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
    },

    ms: {
        // Prayer names
        fajr: 'Subuh',
        sunrise: 'Syuruk',
        dhuhr: 'Zohor',
        asr: 'Asar',
        maghrib: 'Maghrib',
        isha: 'Isyak',

        // UI labels
        prayerTimes: 'Waktu Solat',
        qiblaDirection: 'Arah Kiblat',
        islamicCalendar: 'Kalendar Islam',
        moonPhase: 'Fasa Bulan',
        currentLocation: 'Lokasi Semasa',
        method: 'Kaedah',
        nextPrayer: 'Solat Seterusnya',
        distanceToMakkah: 'Jarak ke Makkah',
        degreesFromNorth: 'darjah dari Utara',
        illumination: 'Pencahayaan',
        dayOfYear: 'Hari Tahun Hijrah',

        // Moon phases
        newMoon: 'Bulan Mati',
        waxingCrescent: 'Anak Bulan',
        firstQuarter: 'Bulan Separuh Naik',
        waxingGibbous: 'Bulan Hampir Purnama',
        fullMoon: 'Bulan Purnama',
        waningGibbous: 'Bulan Menanggal',
        lastQuarter: 'Bulan Separuh Turun',
        waningCrescent: 'Bulan Sabit',

        // Weekdays
        sunday: 'Ahad',
        monday: 'Isnin',
        tuesday: 'Selasa',
        wednesday: 'Rabu',
        thursday: 'Khamis',
        friday: 'Jumaat',
        saturday: 'Sabtu'
    }
};

export type Language = keyof typeof translations;
