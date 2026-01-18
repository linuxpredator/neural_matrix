"use client";

import Link from 'next/link';
import { ArrowLeft, Terminal, Cpu, Zap, Wifi, HardDrive } from 'lucide-react';

export default function ESP32SimPage() {
    return (
        <div className="min-h-screen bg-matrix-black text-matrix-green font-mono p-8 md:p-12 relative overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-matrix-green/60 hover:text-matrix-green transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to System</span>
            </Link>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <header className="mb-12 border-b border-matrix-green/30 pb-8">
                    <div className="mb-2">
                        <Terminal className="inline-block mr-2 text-matrix-green" size={20} />
                        <span className="text-xs text-matrix-green/60 uppercase tracking-widest">EMBEDDED SYSTEMS TERMINAL v1.0</span>
                    </div>
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-4 glitch-text"
                        data-text="SHELL_OS"
                    >
                        SHELL_OS
                    </h1>
                    <div className="text-lg md:text-xl text-matrix-green/80 font-mono">
                        &gt; ESP32 Simulator Loading...
                        <span className="animate-cursor"></span>
                    </div>
                </header>

                {/* Terminal Window */}
                <section className="bg-matrix-black border-2 border-matrix-green/30 p-0 mb-8 relative">
                    {/* Terminal Header */}
                    <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-matrix-green/60"></div>
                        </div>
                        <h2 className="text-sm font-bold uppercase tracking-wider">
                            root@esp32-sim:~#
                        </h2>
                        <div className="w-16"></div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 space-y-2 text-sm font-mono min-h-[400px]">
                        <div className="text-matrix-green/60"># ESP32 Development Board Simulator</div>
                        <div className="text-matrix-green/60"># ================================</div>
                        <div className="mt-4"></div>

                        <div className="text-matrix-green">$ system_info</div>
                        <div className="pl-4 space-y-1 text-matrix-green/80">
                            <div>Chip: ESP32-WROOM-32</div>
                            <div>CPU Cores: 2 (Xtensa LX6)</div>
                            <div>Clock: 240 MHz</div>
                            <div>Flash: 4 MB</div>
                            <div>RAM: 520 KB</div>
                            <div>Wi-Fi: 802.11 b/g/n</div>
                            <div>Bluetooth: v4.2 BR/EDR + BLE</div>
                        </div>

                        <div className="mt-4"></div>
                        <div className="text-matrix-green">$ gpio_status</div>
                        <div className="pl-4 space-y-1 text-matrix-green/80">
                            <div>GPIO 2:  OUTPUT [HIGH] - Built-in LED</div>
                            <div>GPIO 4:  INPUT  [LOW]  - Sensor Data</div>
                            <div>GPIO 5:  OUTPUT [LOW]  - Relay Control</div>
                            <div>GPIO 18: OUTPUT [HIGH] - PWM Signal</div>
                        </div>

                        <div className="mt-4"></div>
                        <div className="text-matrix-green">$ network_scan</div>
                        <div className="pl-4 space-y-1 text-matrix-green/80">
                            <div>Scanning for Wi-Fi networks...</div>
                            <div>Found 3 networks:</div>
                            <div className="pl-4">
                                <div>1. NEURAL_MATRIX_5G [-42 dBm] [WPA2]</div>
                                <div>2. IoT_Device_Net  [-58 dBm] [WPA2]</div>
                                <div>3. ESP32_AP_MODE   [-35 dBm] [OPEN]</div>
                            </div>
                        </div>

                        <div className="mt-4"></div>
                        <div className="flex items-center">
                            <span className="text-matrix-green">root@esp32-sim:~# </span>
                            <span className="animate-cursor ml-1"></span>
                        </div>
                    </div>
                </section>

                {/* System Modules */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border-2 border-matrix-green/30 p-6 bg-matrix-black/50">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu size={24} className="text-matrix-green" />
                            <h3 className="text-lg font-bold uppercase text-matrix-green">PROCESSOR_CORE</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Core 0 Usage:</span>
                                <span className="text-matrix-green">45%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Core 1 Usage:</span>
                                <span className="text-matrix-green">23%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Temperature:</span>
                                <span className="text-matrix-green">42°C</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-matrix-green/30 p-6 bg-matrix-black/50">
                        <div className="flex items-center gap-3 mb-4">
                            <Wifi size={24} className="text-matrix-green" />
                            <h3 className="text-lg font-bold uppercase text-matrix-green">NETWORK_STATUS</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Connection:</span>
                                <span className="text-matrix-green">CONNECTED</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">IP Address:</span>
                                <span className="text-matrix-green">192.168.1.42</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Signal:</span>
                                <span className="text-matrix-green">-42 dBm</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-matrix-green/30 p-6 bg-matrix-black/50">
                        <div className="flex items-center gap-3 mb-4">
                            <HardDrive size={24} className="text-matrix-green" />
                            <h3 className="text-lg font-bold uppercase text-matrix-green">STORAGE_SYSTEM</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Flash Used:</span>
                                <span className="text-matrix-green">2.1 MB / 4 MB</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">RAM Used:</span>
                                <span className="text-matrix-green">187 KB / 520 KB</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Free Heap:</span>
                                <span className="text-matrix-green">333 KB</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-matrix-green/30 p-6 bg-matrix-black/50">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap size={24} className="text-matrix-green" />
                            <h3 className="text-lg font-bold uppercase text-matrix-green">POWER_MANAGEMENT</h3>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Voltage:</span>
                                <span className="text-matrix-green">3.3V</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Current:</span>
                                <span className="text-matrix-green">180 mA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-matrix-green/60">Power Mode:</span>
                                <span className="text-matrix-green">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-matrix-green/30 text-xs text-matrix-green/60 space-y-1">
                    <div>ESP32 SHELL_OS SIMULATOR</div>
                    <div>POWERED BY NEURAL_MATRIX FRAMEWORK</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                        STATUS: OPERATIONAL
                    </div>
                </footer>
            </div>
        </div>
    );
}
