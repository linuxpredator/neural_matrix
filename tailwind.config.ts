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
                }
            }
        },
    },
    plugins: [],
};
export default config;
