"use client";

import { useEffect, useState } from "react";
import { Activity, Globe, ShieldCheck } from "lucide-react";

export default function StatusBar() {
    const [ping, setPing] = useState(24);
    const [time, setTime] = useState("");

    useEffect(() => {
        // Ping simulation
        const pingInterval = setInterval(() => {
            setPing(Math.floor(Math.random() * 20) + 15);
        }, 2000);

        // Time update
        const timeInterval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false }));
        }, 1000);

        setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));

        return () => {
            clearInterval(pingInterval);
            clearInterval(timeInterval);
        };
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full bg-matrix-black border-t border-matrix-dark-green py-1 px-4 text-xs font-mono text-matrix-green/80 flex justify-between items-center z-50 uppercase backdrop-blur-sm">
            <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                    <Activity size={12} className="animate-pulse" />
                    PING: {ping}ms
                </span>
                <span className="flex items-center gap-2 hidden sm:flex">
                    <ShieldCheck size={12} />
                    SECURE_CONNECTION
                </span>
            </div>

            <div className="flex items-center gap-6">
                <span className="hidden sm:inline">LOC: UNKNOWN_VECTOR</span>
                <span className="flex items-center gap-2">
                    <Globe size={12} />
                    ENV: PRODUCTION
                </span>
                <span className="text-matrix-glowing font-bold">{time}</span>
            </div>
        </div>
    );
}
