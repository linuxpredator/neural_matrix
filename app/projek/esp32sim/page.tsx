"use client";

import Link from 'next/link';
import { ArrowLeft, Cpu, Upload, Play, Square } from 'lucide-react';
import { useState } from 'react';
import MatrixSerialMonitor from './components/MatrixSerialMonitor';
import GPIOPanel from './components/GPIOPanel';
import VisualComponents from './components/VisualComponents';

export default function ESP32SimPage() {
    const [isRunning, setIsRunning] = useState(false);

    return (
        <div className="min-h-screen bg-matrix-black text-matrix-green font-mono p-4 md:p-8 relative overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-matrix-green/60 hover:text-matrix-green transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to System</span>
            </Link>

            <div className="max-w-[1800px] mx-auto relative z-10">
                {/* Header */}
                <header className="mb-8 border-b border-matrix-green/30 pb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Cpu className="text-matrix-green" size={24} />
                                <span className="text-xs text-matrix-green/60 uppercase tracking-widest">
                                    ESP32 VIRTUAL LAB v1.0 • NEURAL MATRIX EDITION
                                </span>
                            </div>
                            <h1
                                className="text-4xl md:text-6xl font-bold mb-2 glitch-text"
                                data-text="ESP32_SIMULATOR"
                            >
                                ESP32_SIMULATOR
                            </h1>
                            <div className="text-base md:text-lg text-matrix-green/80 font-mono">
                                &gt; High-Performance Virtual Lab • Real Electronics Learning
                                <span className="animate-cursor"></span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-matrix-green/40 text-matrix-green/60 hover:text-matrix-green hover:border-matrix-green/60 transition-all text-sm font-mono uppercase">
                                <Upload size={16} />
                                Upload .bin
                            </button>
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className={`flex items-center gap-2 px-4 py-2 border-2 transition-all text-sm font-mono uppercase ${isRunning
                                        ? 'bg-matrix-green/20 border-matrix-green text-matrix-green shadow-[0_0_10px_rgba(0,255,65,0.4)]'
                                        : 'bg-black border-matrix-green/40 text-matrix-green/60'
                                    }`}
                            >
                                {isRunning ? (
                                    <>
                                        <Square size={16} />
                                        Stop
                                    </>
                                ) : (
                                    <>
                                        <Play size={16} />
                                        Start
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* System Status Bar */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-black/50 border border-matrix-green/30 p-3">
                        <div className="text-[10px] text-matrix-green/60 uppercase tracking-wider mb-1">Chip</div>
                        <div className="text-sm font-bold text-matrix-green">ESP32-WROOM-32</div>
                    </div>
                    <div className="bg-black/50 border border-matrix-green/30 p-3">
                        <div className="text-[10px] text-matrix-green/60 uppercase tracking-wider mb-1">Clock</div>
                        <div className="text-sm font-bold text-matrix-green">240 MHz</div>
                    </div>
                    <div className="bg-black/50 border border-matrix-green/30 p-3">
                        <div className="text-[10px] text-matrix-green/60 uppercase tracking-wider mb-1">Status</div>
                        <div className="text-sm font-bold flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-matrix-green animate-pulse' : 'bg-matrix-green/30'}`}></span>
                            {isRunning ? 'RUNNING' : 'IDLE'}
                        </div>
                    </div>
                    <div className="bg-black/50 border border-matrix-green/30 p-3">
                        <div className="text-[10px] text-matrix-green/60 uppercase tracking-wider mb-1">Free Heap</div>
                        <div className="text-sm font-bold text-matrix-green">333 KB</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column - GPIO & Visual Components */}
                    <div className="xl:col-span-1 space-y-6">
                        <GPIOPanel />
                        <VisualComponents />
                    </div>

                    {/* Right Column - Serial Monitor & Info */}
                    <div className="xl:col-span-2 space-y-6">
                        <MatrixSerialMonitor />

                        {/* Hardware Features */}
                        <div className="border-2 border-matrix-green/30 bg-matrix-black">
                            <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2">
                                <span className="text-xs font-mono text-matrix-green uppercase tracking-wider">
                                    Hardware Capabilities
                                </span>
                            </div>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                                <div>
                                    <div className="text-matrix-green font-bold mb-2">DIGITAL I/O</div>
                                    <ul className="space-y-1 text-matrix-green/70">
                                        <li>• 40 GPIO pins (INPUT/OUTPUT)</li>
                                        <li>• pinMode(), digitalWrite(), digitalRead()</li>
                                        <li>• Millisecond-accurate timing</li>
                                        <li>• Pull-up/pull-down resistors</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-matrix-green font-bold mb-2">ANALOG INPUT</div>
                                    <ul className="space-y-1 text-matrix-green/70">
                                        <li>• 10-bit ADC (0-1023 range)</li>
                                        <li>• 18 channels (ADC1 + ADC2)</li>
                                        <li>• analogRead() function</li>
                                        <li>• Sensor simulation support</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-matrix-green font-bold mb-2">SERIAL PROTOCOL</div>
                                    <ul className="space-y-1 text-matrix-green/70">
                                        <li>• UART at 9600 baud</li>
                                        <li>• Serial.begin(), Serial.print()</li>
                                        <li>• Real-time terminal output</li>
                                        <li>• Configurable baud rates</li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="text-matrix-green font-bold mb-2">PERIPHERALS</div>
                                    <ul className="space-y-1 text-matrix-green/70">
                                        <li>• SPI & I2C protocols</li>
                                        <li>• PWM output (8 channels)</li>
                                        <li>• Touch sensor interface</li>
                                        <li>• Wi-Fi & Bluetooth ready</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Supported Components */}
                        <div className="border-2 border-matrix-green/30 bg-matrix-black">
                            <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2">
                                <span className="text-xs font-mono text-matrix-green uppercase tracking-wider">
                                    Supported Components (SparkFun Inventory)
                                </span>
                            </div>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">CIRC-01: LED</div>
                                    <div className="text-matrix-green/60">Basic digital output</div>
                                </div>
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">CIRC-04: Servo</div>
                                    <div className="text-matrix-green/60">Motor control (PWM)</div>
                                </div>
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">CIRC-08: Potentiometer</div>
                                    <div className="text-matrix-green/60">Analog input (0-1023)</div>
                                </div>
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">CIRC-09: Photo Resistor</div>
                                    <div className="text-matrix-green/60">Light sensor (LDR)</div>
                                </div>
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">CIRC-10: TMP36</div>
                                    <div className="text-matrix-green/60">Temperature sensor</div>
                                </div>
                                <div className="border border-matrix-green/20 p-2 bg-black/40">
                                    <div className="text-matrix-green font-bold">Buttons & Switches</div>
                                    <div className="text-matrix-green/60">Digital inputs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-8 pt-6 border-t border-matrix-green/30 text-[10px] text-matrix-green/60 space-y-1">
                    <div>ESP32 VIRTUAL LAB • POWERED BY NEURAL_MATRIX FRAMEWORK</div>
                    <div>NEXT.JS 14 • WEB WORKERS • SHAREDARRAYBUFFER • WOKWI ELEMENTS</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                        SYSTEM STATUS: OPERATIONAL
                    </div>
                </footer>
            </div>
        </div>
    );
}
