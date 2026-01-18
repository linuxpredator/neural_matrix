'use client';

import { useState } from 'react';
import { Zap } from 'lucide-react';

interface GPIOPin {
    number: number;
    mode: 'INPUT' | 'OUTPUT' | 'DISABLED';
    value: boolean;
    label?: string;
}

const initialPins: GPIOPin[] = [
    { number: 2, mode: 'OUTPUT', value: false, label: 'Built-in LED' },
    { number: 4, mode: 'INPUT', value: false, label: 'Sensor' },
    { number: 5, mode: 'OUTPUT', value: false, label: 'Relay' },
    { number: 18, mode: 'OUTPUT', value: false, label: 'PWM' },
    { number: 19, mode: 'INPUT', value: false, label: 'Button' },
    { number: 21, mode: 'OUTPUT', value: false, label: 'LED 1' },
    { number: 22, mode: 'OUTPUT', value: false, label: 'LED 2' },
    { number: 23, mode: 'INPUT', value: false, label: 'Touch' },
];

export default function GPIOPanel() {
    const [pins, setPins] = useState<GPIOPin[]>(initialPins);

    const togglePin = (number: number) => {
        setPins(prev => prev.map(pin =>
            pin.number === number && pin.mode === 'OUTPUT'
                ? { ...pin, value: !pin.value }
                : pin
        ));
    };

    const setMode = (number: number, mode: GPIOPin['mode']) => {
        setPins(prev => prev.map(pin =>
            pin.number === number
                ? { ...pin, mode, value: mode === 'INPUT' ? false : pin.value }
                : pin
        ));
    };

    return (
        <div className="border-2 border-matrix-green/30 bg-matrix-black">
            {/* Header */}
            <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2 flex items-center gap-2">
                <Zap size={16} className="text-matrix-green" />
                <span className="text-xs font-mono text-matrix-green uppercase tracking-wider">
                    GPIO Control Panel
                </span>
            </div>

            {/* GPIO Pins */}
            <div className="p-4 space-y-2">
                {pins.map((pin) => (
                    <div
                        key={pin.number}
                        className="flex items-center gap-3 p-3 border border-matrix-green/20 bg-black/40 hover:border-matrix-green/40 transition-colors"
                    >
                        {/* Pin Number */}
                        <div className="flex-shrink-0 w-12 text-center">
                            <div className="text-matrix-green font-mono font-bold text-sm">
                                GPIO
                            </div>
                            <div className="text-matrix-green font-mono text-xl">
                                {pin.number}
                            </div>
                        </div>

                        {/* Label */}
                        <div className="flex-1 min-w-0">
                            <div className="text-matrix-green/80 font-mono text-sm truncate">
                                {pin.label || `Pin ${pin.number}`}
                            </div>
                            <div className="text-matrix-green/40 font-mono text-xs">
                                Mode: {pin.mode}
                            </div>
                        </div>

                        {/* Mode Selector */}
                        <select
                            value={pin.mode}
                            onChange={(e) => setMode(pin.number, e.target.value as GPIOPin['mode'])}
                            className="bg-black border border-matrix-green/30 text-matrix-green font-mono text-xs px-2 py-1 focus:outline-none focus:border-matrix-green"
                        >
                            <option value="OUTPUT">OUTPUT</option>
                            <option value="INPUT">INPUT</option>
                            <option value="DISABLED">DISABLED</option>
                        </select>

                        {/* Value Toggle/Display */}
                        {pin.mode === 'OUTPUT' ? (
                            <button
                                onClick={() => togglePin(pin.number)}
                                className={`w-20 px-3 py-1.5 font-mono text-xs font-bold border-2 transition-all ${pin.value
                                        ? 'bg-matrix-green/20 border-matrix-green text-matrix-green shadow-[0_0_10px_rgba(0,255,65,0.4)]'
                                        : 'bg-black border-matrix-green/40 text-matrix-green/60'
                                    }`}
                            >
                                {pin.value ? 'HIGH' : 'LOW'}
                            </button>
                        ) : (
                            <div className="w-20 px-3 py-1.5 text-center font-mono text-xs border border-matrix-green/20 text-matrix-green/40">
                                {pin.value ? 'HIGH' : 'LOW'}
                            </div>
                        )}

                        {/* LED Indicator */}
                        <div className="flex-shrink-0">
                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${pin.value && pin.mode === 'OUTPUT'
                                    ? 'bg-matrix-green border-matrix-green shadow-[0_0_8px_rgba(0,255,65,0.8)]'
                                    : 'bg-black border-matrix-green/30'
                                }`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-matrix-green/30 p-3 flex gap-2">
                <button
                    onClick={() => setPins(prev => prev.map(pin => ({ ...pin, value: true })))}
                    className="flex-1 px-3 py-1.5 bg-matrix-green/10 border border-matrix-green/40 text-matrix-green text-xs font-mono hover:bg-matrix-green/20 transition-colors uppercase"
                >
                    All HIGH
                </button>
                <button
                    onClick={() => setPins(prev => prev.map(pin => ({ ...pin, value: false })))}
                    className="flex-1 px-3 py-1.5 bg-black border border-matrix-green/40 text-matrix-green text-xs font-mono hover:bg-matrix-green/10 transition-colors uppercase"
                >
                    All LOW
                </button>
                <button
                    onClick={() => setPins(initialPins)}
                    className="flex-1 px-3 py-1.5 bg-black border border-matrix-green/40 text-matrix-green/60 text-xs font-mono hover:text-matrix-green hover:border-matrix-green/60 transition-colors uppercase"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
