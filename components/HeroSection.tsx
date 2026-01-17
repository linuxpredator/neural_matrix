import React from 'react';

const HeroSection = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
            {/* GLITCH HEADER - Note: data-text attribute is required for CSS effect */}
            <h1
                className="glitch-text font-mono text-6xl font-bold tracking-tighter md:text-8xl"
                data-text="SYSTEM_READY"
            >
                SYSTEM_READY
            </h1>

            {/* SUBHEADER WITH BLINKING CURSOR */}
            <div className="flex items-center text-xl text-green-400/80 md:text-2xl">
                <span className="font-mono">
                    Initializing neural connection...
                </span>
                <span className="animate-cursor"></span>
            </div>

            {/* TERMINAL BUTTON */}
            <button className="mt-8 border border-[#00ff41] px-6 py-2 font-mono text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors duration-200">
                [ EXECUTE_PROTOCOL ]
            </button>
        </div>
    );
};

export default HeroSection;
