'use client';

import { Compass } from 'lucide-react';
import type { QiblaData } from '../types/falak';
import { getCompassDirection } from '../lib/qibla';
import { translations, type Language } from '../lib/translations';

interface QiblaCompassProps {
    qibla: QiblaData;
    language: Language;
}

export default function QiblaCompass({ qibla, language }: QiblaCompassProps) {
    const t = translations[language];
    const compassDir = getCompassDirection(qibla.direction);

    return (
        <div className="bg-black/80 border-2 border-matrix-green/30 p-6">
            <div className="flex items-center gap-2 mb-6">
                <Compass size={20} className="text-matrix-green" />
                <h3 className="text-lg font-mono text-matrix-green uppercase tracking-wider">
                    {t.qiblaDirection}
                </h3>
            </div>

            {/* Compass Visual */}
            <div className="relative w-48 h-48 mx-auto mb-6">
                {/* Compass Circle */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-matrix-green/20"
                    />

                    {/* Cardinal directions */}
                    <text x="100" y="20" textAnchor="middle" className="fill-matrix-green font-mono text-sm">N</text>
                    <text x="180" y="105" textAnchor="middle" className="fill-matrix-green/60 font-mono text-xs">E</text>
                    <text x="100" y="190" textAnchor="middle" className="fill-matrix-green/60 font-mono text-xs">S</text>
                    <text x="20" y="105" textAnchor="middle" className="fill-matrix-green/60 font-mono text-xs">W</text>

                    {/* Qibla direction arrow */}
                    <g transform={`rotate(${qibla.direction} 100 100)`}>
                        <path
                            d="M 100 40 L 110 100 L 100 90 L 90 100 Z"
                            className="fill-matrix-green"
                            filter="drop-shadow(0 0 5px rgba(0,255,65,0.8))"
                        />
                    </g>
                </svg>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-matrix-green rounded-full"></div>
            </div>

            {/* Direction Info */}
            <div className="space-y-3">
                <div className="flex justify-between items-center p-2 border border-matrix-green/20">
                    <span className="text-sm font-mono text-matrix-green/80">{t.degreesFromNorth}:</span>
                    <span className="text-lg font-mono font-bold text-matrix-green">
                        {Math.round(qibla.direction)}° ({compassDir})
                    </span>
                </div>

                <div className="flex justify-between items-center p-2 border border-matrix-green/20">
                    <span className="text-sm font-mono text-matrix-green/80">{t.distanceToMakkah}:</span>
                    <span className="text-lg font-mono font-bold text-matrix-green">
                        {qibla.distance.toLocaleString()} km
                    </span>
                </div>
            </div>
        </div>
    );
}
