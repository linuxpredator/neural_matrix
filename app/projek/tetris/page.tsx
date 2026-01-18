// NEONTRIS - Main Game Page
// Integrates all components with responsive layout

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MatrixRain from '@/components/MatrixRain';
import { useGameEngine } from './lib/game-engine';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import PiecePreview from './components/PiecePreview';
import Controls from './components/Controls';
import TouchControls from './components/TouchControls';

export default function NeontrisPage() {
    // Prevent SSR hydration mismatch - only render game on client
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { state, controls } = useGameEngine();

    // Show loading during SSR
    if (!isMounted) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-black via-neon-void to-black flex items-center justify-center">
                <div className="text-neon-cyan text-2xl font-bold font-mono animate-pulse">
                    Loading NEONTRIS...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 md:p-8">
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* CRT & Scanline Effects */}
            <div className="fixed inset-0 z-50 pointer-events-none scanline-effect opacity-50"></div>
            <div className="fixed inset-0 z-40 pointer-events-none crt-overlay opacity-30"></div>

            {/* Back to System button - Top left */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 group"
            >
                <ArrowLeft size={18} className="text-neon-cyan/60 group-hover:text-neon-cyan group-hover:translate-x-[-4px] transition-all duration-300" />
                <span className="text-sm font-mono text-neon-cyan/60 group-hover:text-neon-cyan transition-colors duration-300">
                    Back to System
                </span>
            </Link>
            {/* Animated background effect */}
            <div
                className="fixed inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `
            radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.15), transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(189, 0, 255, 0.15), transparent 50%)
          `,
                    animation: 'pulse 4s ease-in-out infinite',
                }}
            />

            <div className="relative z-10 max-w-7xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-5xl md:text-7xl font-bold font-mono mb-2"
                        style={{
                            background: 'linear-gradient(45deg, #00f5ff, #bd00ff, #ff10f0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 30px rgba(0, 245, 255, 0.5)',
                        }}
                    >
                        NEONTRIS
                    </h1>
                    <p className="text-neon-cyan/60 text-sm md:text-base font-mono">
                        Cyberpunk Tetris • {state.level} Levels of Neon Chaos
                    </p>
                </div>

                {/* Main game layout */}
                <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
                    {/* Left sidebar - Next & Hold */}
                    <div className="flex lg:flex-col gap-4 w-full lg:w-auto order-2 lg:order-1">
                        <div className="flex-1 lg:flex-none">
                            <PiecePreview piece={state.nextPiece} title="NEXT_PIECE" />
                        </div>
                        <div className="flex-1 lg:flex-none">
                            <PiecePreview piece={state.holdPiece} title="HOLD_PIECE" />
                        </div>
                    </div>

                    {/* Center - Game Board */}
                    <div className="order-1 lg:order-2">
                        <GameBoard state={state} />
                    </div>

                    {/* Right sidebar - Stats & Controls */}
                    <div className="flex lg:flex-col gap-4 w-full lg:w-auto order-3">
                        <div className="flex-1 lg:flex-none">
                            <ScorePanel state={state} />
                        </div>
                        <div className="flex-1 lg:flex-none">
                            <Controls />
                        </div>
                    </div>
                </div>

                {/* Mobile touch controls */}
                <TouchControls
                    controls={controls}
                    gameState={{
                        isPaused: state.isPaused,
                        gameOver: state.gameOver
                    }}
                />

                {/* Footer info */}
                <div className="mt-8 text-center text-white/30 text-xs font-mono">
                    Built with Next.js 15 • TypeScript • Tailwind CSS
                </div>
            </div>
        </div>
    );
}
