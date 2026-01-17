// NEONTRIS - Main Game Page
// Integrates all components with responsive layout

'use client';

import { useGameEngine } from './lib/game-engine';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import PiecePreview from './components/PiecePreview';
import Controls from './components/Controls';

export default function NeontrisPage() {
    const { state, controls } = useGameEngine();

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-neon-void to-black flex items-center justify-center p-4 md:p-8">
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

                {/* Mobile touch controls placeholder */}
                <div className="mt-6 lg:hidden text-center text-white/40 text-xs font-mono">
                    Use keyboard controls • Touch support coming soon
                </div>

                {/* Footer info */}
                <div className="mt-8 text-center text-white/30 text-xs font-mono">
                    Built with Next.js 15 • TypeScript • Tailwind CSS
                </div>
            </div>
        </div>
    );
}
