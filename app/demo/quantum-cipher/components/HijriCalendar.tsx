'use client';

import { Calendar } from 'lucide-react';
import type { HijriDate } from '../types/falak';
import { getIslamicMonthSignificance } from '../lib/hijri';
import { translations, type Language } from '../lib/translations';

interface HijriCalendarProps {
    hijriDate: HijriDate;
    gregorianDate: Date;
    language: Language;
}

export default function HijriCalendar({ hijriDate, gregorianDate, language }: HijriCalendarProps) {
    const t = translations[language];
    const significance = getIslamicMonthSignificance(hijriDate.month);

    const weekdayTranslation = t[hijriDate.weekday.toLowerCase() as keyof typeof t] || hijriDate.weekday;

    return (
        <div className="bg-black/80 border-2 border-matrix-green/30 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-matrix-green" />
                <h3 className="text-lg font-mono text-matrix-green uppercase tracking-wider">
                    {t.islamicCalendar}
                </h3>
            </div>

            {/* Hijri Date Display */}
            <div className="text-center mb-6">
                <div className="text-4xl font-mono font-bold text-matrix-green mb-2">
                    {hijriDate.day}
                </div>
                <div className="text-2xl font-bold text-matrix-green/90 mb-1">
                    {hijriDate.monthNameArabic}
                </div>
                <div className="text-lg font-mono text-matrix-green/80 mb-1">
                    {hijriDate.monthName}
                </div>
                <div className="text-xl font-mono font-bold text-matrix-green">
                    {hijriDate.year} H
                </div>
            </div>

            {/* Gregorian Equivalent */}
            <div className="p-3 border border-matrix-green/20 mb-4">
                <div className="text-xs font-mono text-matrix-green/60 mb-1">Gregorian:</div>
                <div className="text-sm font-mono text-matrix-green">
                    {weekdayTranslation},{' '}
                    {gregorianDate.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
            </div>

            {/* Month Significance */}
            {significance && (
                <div className="p-3 bg-matrix-green/5 border border-matrix-green/30">
                    <div className="text-xs font-mono text-matrix-green/60 mb-1">Significance:</div>
                    <div className="text-xs font-mono text-matrix-green/80">
                        {significance}
                    </div>
                </div>
            )}
        </div>
    );
}
