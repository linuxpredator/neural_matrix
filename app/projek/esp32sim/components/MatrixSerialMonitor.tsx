'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface SerialMonitorProps {
    baudRate?: number;
    maxLines?: number;
}

export default function MatrixSerialMonitor({ baudRate = 9600, maxLines = 100 }: SerialMonitorProps) {
    const [output, setOutput] = useState<string[]>([
        '# ESP32 Serial Monitor',
        '# ==================',
        `# Baud Rate: ${baudRate}`,
        '# Waiting for data...',
        ''
    ]);
    const [input, setInput] = useState('');
    const outputRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    // Simulate serial output for demo
    useEffect(() => {
        const interval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
            const randomMessages = [
                `[${timestamp}] GPIO 2: HIGH`,
                `[${timestamp}] Sensor reading: ${Math.floor(Math.random() * 1024)}`,
                `[${timestamp}] Temperature: ${(20 + Math.random() * 15).toFixed(1)}°C`,
                `[${timestamp}] Wi-Fi: Connected`,
                `[${timestamp}] Free heap: ${Math.floor(Math.random() * 100000)}`,
            ];

            const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
            setOutput(prev => {
                const newOutput = [...prev, message];
                return newOutput.slice(-maxLines); // Keep only last N lines
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [maxLines]);

    const handleClear = () => {
        setOutput([
            '# ESP32 Serial Monitor',
            '# ==================',
            `# Baud Rate: ${baudRate}`,
            '# Cleared',
            ''
        ]);
    };

    const handleSend = () => {
        if (input.trim()) {
            const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
            setOutput(prev => [...prev, `> [${timestamp}] ${input}`]);
            setInput('');
        }
    };

    return (
        <div className="border-2 border-matrix-green/30 bg-matrix-black flex flex-col h-full">
            {/* Header */}
            <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={16} className="text-matrix-green" />
                    <span className="text-xs font-mono text-matrix-green uppercase tracking-wider">
                        Serial Monitor (9600 baud)
                    </span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleClear}
                        className="text-xs font-mono text-matrix-green/60 hover:text-matrix-green px-2 py-1 border border-matrix-green/20 hover:border-matrix-green/40 transition-colors"
                    >
                        CLEAR
                    </button>
                </div>
            </div>

            {/* Output Area */}
            <div
                ref={outputRef}
                className="flex-1 p-4 font-mono text-sm text-matrix-green/80 overflow-y-auto min-h-[300px] max-h-[400px] custom-scrollbar"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#00ff41 #000000'
                }}
            >
                {output.map((line, index) => (
                    <div key={index} className="leading-relaxed">
                        {line}
                    </div>
                ))}
                {/* Cursor */}
                <div className="flex items-center">
                    <span className="animate-cursor ml-1"></span>
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-matrix-green/30 p-3 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Send command..."
                    className="flex-1 bg-black border border-matrix-green/30 px-3 py-1.5 text-sm font-mono text-matrix-green placeholder:text-matrix-green/30 focus:outline-none focus:border-matrix-green"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-1.5 bg-matrix-green/10 border border-matrix-green/40 text-matrix-green text-sm font-mono hover:bg-matrix-green/20 transition-colors uppercase"
                >
                    Send
                </button>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff4140;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00ff4180;
        }
      `}</style>
        </div>
    );
}
