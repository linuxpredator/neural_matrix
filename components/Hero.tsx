"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
    const text = "alt_cmd";
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        let i = 0;
        const typing = setInterval(() => {
            if (i <= text.length) {
                setDisplayText(text.slice(0, i));
                i++;
            } else {
                clearInterval(typing);
            }
        }, 150);

        return () => clearInterval(typing);
    }, []);

    return (
        <section className="relative z-10 pt-32 pb-16 px-6 max-w-5xl mx-auto text-center sm:text-left">
            <div className="flex flex-col gap-2">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg text-matrix-green/70 font-mono mb-2"
                >
          // INITIALIZING SYSTEM...
                </motion.p>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-terminal tracking-wider text-white mb-4">
                    <span className="text-matrix-green">SYSTEM_READY: </span>
                    {displayText}
                    <span className="animate-cursor-blink inline-block w-4 h-[1em] bg-matrix-green ml-1 align-baseline"></span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                    className="text-xl sm:text-2xl text-gray-400 font-mono max-w-2xl mt-4"
                >
                    Architecting digital realities in the void.
                    <br />
                    Full-Stack Developer & UI/UX Specialist.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="mt-12 flex flex-wrap gap-4"
            >
                <button className="px-6 py-3 border border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black transition-all duration-300 font-mono tracking-widest text-sm uppercase">
                    [ Initiate_Sequence ]
                </button>
                <button className="px-6 py-3 border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-all duration-300 font-mono tracking-widest text-sm uppercase">
                    [ View_Logs ]
                </button>
            </motion.div>
        </section>
    );
}
