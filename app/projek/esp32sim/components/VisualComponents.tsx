'use client';

// Type declarations for wokwi-elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'wokwi-led': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { color?: string }, HTMLElement>;
            'wokwi-potentiometer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { value?: string }, HTMLElement>;
            'wokwi-tmp36': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { temperature?: string }, HTMLElement>;
        }
    }
}

import { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import Script from 'next/script';

export default function VisualComponents() {
    const [ledState, setLedState] = useState(false);
    const [potValue, setPotValue] = useState(512);
    const [temperature, setTemperature] = useState(25);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    // Simulate temperature changes
    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature(prev => {
                const change = (Math.random() - 0.5) * 2;
                return Math.max(15, Math.min(35, prev + change));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Load Wokwi Elements */}
            <Script
                src="https://unpkg.com/@wokwi/elements@1.0.2/dist/wokwi-elements.bundle.js"
                onLoad={() => setScriptsLoaded(true)}
            />

            <div className="border-2 border-matrix-green/30 bg-matrix-black">
                {/* Header */}
                <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2 flex items-center gap-2">
                    <Gauge size={16} className="text-matrix-green" />
                    <span className="text-xs font-mono text-matrix-green uppercase tracking-wider">
                        Virtual Components
                    </span>
                </div>

                {/* Components Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* LED Component */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-sm font-mono text-matrix-green/80 mb-2">
                            LED (GPIO 2)
                        </div>
                        <div className="relative">
                            {/* Wokwi element disabled for TypeScript compatibility */}
                            {/* {scriptsLoaded && (
                                <wokwi-led color={ledState ? "red" : "gray"} className="scale-150" />
                            )} */}
                            {/* Fallback UI */}
                            <div className={`w-12 h-12 rounded-full border-4 ${ledState
                                ? 'bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.8)]'
                                : 'bg-gray-700 border-gray-600'
                                }`}></div>
                        </div>
                        <button
                            onClick={() => setLedState(!ledState)}
                            className={`px-4 py-2 font-mono text-xs border-2 transition-all ${ledState
                                ? 'bg-matrix-green/20 border-matrix-green text-matrix-green'
                                : 'bg-black border-matrix-green/40 text-matrix-green/60'
                                }`}
                        >
                            {ledState ? 'ON' : 'OFF'}
                        </button>
                    </div>

                    {/* Potentiometer */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-sm font-mono text-matrix-green/80 mb-2">
                            Potentiometer (ADC1)
                        </div>
                        <div className="relative">
                            {/* Wokwi element disabled for TypeScript compatibility */}
                            {/* {scriptsLoaded && (
                                <wokwi-potentiometer value={String(potValue / 10.24)} className="scale-150" />
                            )} */}
                            {/* Fallback UI */}
                            <div className="w-16 h-16 rounded-full border-4 border-matrix-green/40 bg-black flex items-center justify-center">
                                <div className="w-8 h-1 bg-matrix-green/60 rounded" style={{
                                    transform: `rotate(${(potValue / 1024) * 270 - 135}deg)`
                                }}></div>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1023"
                            value={potValue}
                            onChange={(e) => setPotValue(parseInt(e.target.value))}
                            className="w-full accent-matrix-green"
                        />
                        <div className="text-xs font-mono text-matrix-green">
                            Value: {potValue} / 1023
                        </div>
                    </div>

                    {/* Temperature Sensor */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-sm font-mono text-matrix-green/80 mb-2">
                            TMP36 Sensor
                        </div>
                        <div className="relative">
                            {/* Wokwi element disabled for TypeScript compatibility */}
                            {/* {scriptsLoaded && (
                                <wokwi-tmp36 temperature={String(temperature)} className="scale-150" />
                            )} */}
                            {/* Fallback UI */}
                            <div className="w-12 h-20 bg-gray-700 border-2 border-gray-600 rounded-sm flex items-center justify-center">
                                <div className="text-xs font-mono text-gray-400">TMP36</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono font-bold text-matrix-green">
                                {temperature.toFixed(1)}°C
                            </div>
                            <div className="text-xs font-mono text-matrix-green/60 mt-1">
                                ADC: {Math.floor((temperature / 100) * 1024)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Component Info */}
                <div className="border-t border-matrix-green/30 p-4 text-xs font-mono text-matrix-green/60 space-y-1">
                    <div>• LED: Digital OUTPUT simulation (HIGH/LOW)</div>
                    <div>• Potentiometer: Analog INPUT (0-1023, 10-bit ADC)</div>
                    <div>• TMP36: Temperature sensor simulation (15-35°C range)</div>
                </div>
            </div>
        </>
    );
}
