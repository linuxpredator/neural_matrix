'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import type { PrayerTimes } from '../types/falak';
import { formatPrayerTime, getNextPrayer } from '../lib/prayer-times';
import { translations, type Language } from '../lib/translations';

interface PrayerTimesCardProps {
    prayerTimes: PrayerTimes;
    language: Language;
}

export default function PrayerTimesCard({ prayerTimes, language }: PrayerTimesCardProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const t = translations[language];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const nextPrayer = getNextPrayer(prayerTimes);

    const prayers = [
        { name: 'fajr', time: prayerTimes.fajr, label: t.fajr },
        { name: 'sunrise', time: prayerTimes.sunrise, label: t.sunrise },
        { name: 'dhuhr', time: prayerTimes.dhuhr, label: t.dhuhr },
        { name: 'asr', time: prayerTimes.asr, label: t.asr },
        { name: 'maghrib', time: prayerTimes.maghrib, label: t.maghrib },
        { name: 'isha', time: prayerTimes.isha, label: t.isha }
    ];

    return (
        <div className="bg-black/80 border-2 border-matrix-green/30 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Clock size={20} className="text-matrix-green" />
                    <h3 className="text-lg font-mono text-matrix-green uppercase tracking-wider">
                        {t.prayerTimes}
                    </h3>
                </div>
                <div className="text-xs font-mono text-matrix-green/60">
                    {t.method}: {prayerTimes.method}
                </div>
            </div>

            {/* Next Prayer Alert */}
            {nextPrayer && (
                <div className="mb-4 p-3 bg-matrix-green/10 border border-matrix-green/40">
                    <div className="text-xs font-mono text-matrix-green/60 mb-1">
                        {t.nextPrayer}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-mono font-bold text-matrix-green">
                            {translations[language][nextPrayer.name as keyof typeof translations.en] || nextPrayer.name.toUpperCase()}
                        </div>
                        <div className="text-lg font-mono font-bold text-matrix-green">
                            {formatPrayerTime(nextPrayer.time)}
                        </div>
                    </div>
                </div>
            )}

            {/* Prayer Times List */}
            <div className="space-y-2">
                {prayers.map((prayer) => {
                    const isNext = nextPrayer?.name === prayer.name;
                    const isPast = prayer.time < currentTime && !isNext;

                    return (
                        <div
                            key={prayer.name}
                            className={`flex items-center justify-between p-2 border ${isNext
                                    ? 'border-matrix-green bg-matrix-green/5'
                                    : 'border-matrix-green/20'
                                } ${isPast ? 'opacity-40' : ''}`}
                        >
                            <div className={`font-mono text-sm ${isNext ? 'text-matrix-green font-bold' : 'text-matrix-green/80'
                                }`}>
                                {prayer.label}
                            </div>
                            <div className={`font-mono ${isNext ? 'text-matrix-green font-bold' : 'text-matrix-green/80'
                                }`}>
                                {formatPrayerTime(prayer.time)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
