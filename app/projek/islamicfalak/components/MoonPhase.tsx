'use client';

import { Moon } from 'lucide-react';
import type { MoonPhase as MoonPhaseType } from '../types/falak';
import { getMoonEmoji } from '../lib/moon';
import { translations, type Language } from '../lib/translations';

interface MoonPhaseProps {
    moonData: MoonPhaseType;
    language: Language;
}

export default function MoonPhase({ moonData, language }: MoonPhaseProps) {
    const t = translations[language];

    // Convert phase to translation key
    const phaseKey = moonData.phase.toLowerCase().replace(/ /g, '') as keyof typeof translations.en;
    const phaseTranslation = t[phaseKey] || moonData.phase;

    return (
        <div className="bg-black/80 border-2 border-matrix-green/30 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Moon size={20} className="text-matrix-green" />
                <h3 className="text-lg font-mono text-matrix-green uppercase tracking-wider">
                    {t.moonPhase}
                </h3>
            </div>

            {/* Moon Visual */}
            <div className="text-center mb-6">
                <div className="text-8xl mb-4">
                    {getMoonEmoji(moonData.phase)}
                </div>
                <div className="text-xl font-mono font-bold text-matrix-green mb-2">
                    {phaseTranslation}
                </div>
                <div className="text-sm font-mono text-matrix-green/60">
                    {moonData.isWaxing ? '↗' : '↘'} {moonData.isWaxing ? 'Waxing' : 'Waning'}
                </div>
            </div>

            {/* Moon Stats */}
            <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border border-matrix-green/20">
                    <span className="text-sm font-mono text-matrix-green/80">{t.illumination}:</span>
                    <span className="text-lg font-mono font-bold text-matrix-green">
                        {moonData.illumination}%
                    </span>
                </div>

                <div className="flex justify-between items-center p-2 border border-matrix-green/20">
                    <span className="text-sm font-mono text-matrix-green/80">{t.dayOfYear}:</span>
                    <span className="text-lg font-mono font-bold text-matrix-green">
                        Day {moonData.age} / 29-30
                    </span>
                </div>

                {/* Illumination bar */}
                <div className="w-full h-2 bg-black border border-matrix-green/30">
                    <div
                        className="h-full bg-matrix-green transition-all duration-500"
                        style={{ width: `${moonData.illumination}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
