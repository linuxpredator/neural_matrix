'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, RefreshCw, Globe, ArrowLeft } from 'lucide-react';
import PrayerTimesCard from './components/PrayerTimesCard';
import QiblaCompass from './components/QiblaCompass';
import HijriCalendar from './components/HijriCalendar';
import MoonPhase from './components/MoonPhase';
import { calculatePrayerTimes } from './lib/prayer-times';
import { calculateQibla } from './lib/qibla';
import { gregorianToHijri } from './lib/hijri';
import { getMoonPhase } from './lib/moon';
import type { PrayerTimes, QiblaData, HijriDate, MoonPhase as MoonPhaseType, CalculationMethod, Location } from './types/falak';
import type { Language } from './lib/translations';

export default function IslamicFalakPage() {
    const [location, setLocation] = useState<Location>({ latitude: 3.139, longitude: 101.6869, city: 'Kuala Lumpur' });
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [qibla, setQibla] = useState<QiblaData | null>(null);
    const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
    const [moonPhase, setMoonPhase] = useState<MoonPhaseType | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [method, setMethod] = useState<CalculationMethod>('JAKIM');
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Try to get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                () => {
                    // Fallback to default (KL)
                    console.log('Using default location: Kuala Lumpur');
                }
            );
        }
    }, []);

    useEffect(() => {
        calculateAll();

        // Update every minute
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, [location, method]);

    const calculateAll = () => {
        setLoading(true);

        try {
            const date = new Date();

            // Calculate prayer times
            const prayers = calculatePrayerTimes(
                location.latitude,
                location.longitude,
                date,
                method
            );
            setPrayerTimes(prayers);

            // Calculate Qibla
            const qiblaData = calculateQibla(location.latitude, location.longitude);
            setQibla(qiblaData);

            // Get Hijri date
            const hijri = gregorianToHijri(date);
            setHijriDate(hijri);

            // Get moon phase
            const moon = getMoonPhase(date);
            setMoonPhase(moon);

            setLoading(false);
        } catch (error) {
            console.error('Error calculating falak data:', error);
            setLoading(false);
        }
    };

    if (loading || !prayerTimes || !qibla || !hijriDate || !moonPhase) {
        return (
            <div className="min-h-screen bg-matrix-black flex items-center justify-center">
                <div className="text-matrix-green font-mono">
                    <div className="text-2xl mb-2">Calculating...</div>
                    <div className="text-sm text-matrix-green/60">Please wait</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-matrix-black text-matrix-green font-mono p-4 md:p-8">
            {/* Back to System Link */}
            <div className="max-w-7xl mx-auto mb-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all text-sm"
                >
                    <ArrowLeft size={16} />
                    <span>BACK_TO_SYSTEM</span>
                </Link>
            </div>

            {/* Header */}
            <header className="max-w-7xl mx-auto mb-8 border-b border-matrix-green/30 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 glitch-text" data-text="ISLAMIC_FALAK">
                            ISLAMIC_FALAK
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-matrix-green/80">
                            <MapPin size={16} />
                            <span>{location.city || `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}`}</span>
                        </div>
                        <div className="text-xs text-matrix-green/60 mt-1">
                            {currentTime.toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {/* Language Toggle */}
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
                            className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 transition-all"
                        >
                            <Globe size={16} />
                            <span className="text-sm">{language === 'en' ? 'BM' : 'EN'}</span>
                        </button>

                        {/* Method Selector */}
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value as CalculationMethod)}
                            className="px-4 py-2 bg-black border-2 border-matrix-green/40 text-matrix-green text-sm hover:bg-matrix-green/10 focus:outline-none focus:border-matrix-green transition-all"
                        >
                            <option value="JAKIM">JAKIM</option>
                            <option value="MWL">MWL</option>
                            <option value="ISNA">ISNA</option>
                            <option value="EGYPT">Egypt</option>
                            <option value="TURKEY">Turkey</option>
                            <option value="RUSSIA">Russia</option>
                        </select>

                        {/* Refresh Button */}
                        <button
                            onClick={calculateAll}
                            className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 transition-all"
                        >
                            <RefreshCw size={16} />
                            <span className="text-sm">Refresh</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PrayerTimesCard prayerTimes={prayerTimes} language={language} />
                    <QiblaCompass qibla={qibla} language={language} />
                    <HijriCalendar hijriDate={hijriDate} gregorianDate={currentTime} language={language} />
                    <MoonPhase moonData={moonPhase} language={language} />
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-matrix-green/30 text-center text-xs text-matrix-green/60">
                <div>Islamic Falak System • Phase 1 MVP</div>
                <div className="mt-1">Neural Matrix Framework • {new Date().getFullYear()}</div>
            </footer>
        </div>
    );
}
