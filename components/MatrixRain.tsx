"use client";

import { useEffect, useRef } from "react";

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*";
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100)); // Stored y positions, start offscreen

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#00FF41"; // Matrix Green
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // x = column index * font size
                // y = drop value * font size
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly or continue falling
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-initialize columns if needed, strictly speaking we might want to preserve drops or reset
            // For simplicity, we can just let it be or reset:
            // const newColumns = Math.floor(width / fontSize);
            // ...
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        />
    );
};

export default MatrixRain;
