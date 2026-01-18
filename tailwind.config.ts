import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // Forces Fira Code as the default mono stack
                mono: ["var(--font-fira-code)", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            colors: {
                matrix: {
                    black: "#050505",
                    green: "#00ff41",
                    dim: "rgba(0, 255, 65, 0.1)",
                },
                neon: {
                    cyan: '#00f5ff',
                    purple: '#bd00ff',
                    pink: '#ff10f0',
                    void: '#0a0a0f',
                },
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(-5px, 0)' },
                    '50%': { transform: 'translate(5px, 0)' },
                    '75%': { transform: 'translate(-5px, 0)' },
                },
                'neon-pulse': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
            animation: {
                shake: 'shake 0.5s ease-in-out',
                'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
export default config;
