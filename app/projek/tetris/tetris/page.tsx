'use client';

/**
 * NEONTRIS - Cyberpunk Tetris Game
 * Main game page with 60 FPS game loop
 */

import { useReducer, useEffect, useRef, useCallback, useState } from 'react';
import { gameReducer, getInitialState } from './lib/game-reducer';
import { BlockRarity } from './lib/types';
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import NextPiece from './components/NextPiece';
import HoldPiece from './components/HoldPiece';
import { CONTROLS } from './constants';

export default function NEONTRISPage() {
    // Prevent SSR hydration mismatch - only render game on client
    const [isMounted, setIsMounted] = useState(false);

    const [gameState, dispatch] = useReducer(gameReducer, null, getInitialState);
    const lastDropTime = useRef<number>(0);
    const animationFrameId = useRef<number | null>(null);
    const keysPressed = useRef<Set<string>>(new Set());

    // Client-side only mounting
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle keyboard input
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (keysPressed.current.has(e.key)) return; // Prevent key repeat
        keysPressed.current.add(e.key);

        if (CONTROLS.PAUSE.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'TOGGLE_PAUSE' });
            return;
        }

        if (gameState.gameOver || gameState.isPaused) return;

        if (CONTROLS.LEFT.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'MOVE_LEFT' });
        } else if (CONTROLS.RIGHT.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'MOVE_RIGHT' });
        } else if (CONTROLS.SOFT_DROP.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'MOVE_DOWN' });
        } else if (CONTROLS.HARD_DROP.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'HARD_DROP' });
        } else if (CONTROLS.ROTATE_CW.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'ROTATE_CW' });
        } else if (CONTROLS.ROTATE_CCW.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'ROTATE_CCW' });
        } else if (CONTROLS.HOLD.includes(e.key)) {
            e.preventDefault();
            dispatch({ type: 'HOLD_PIECE' });
        }
    }, [gameState.gameOver, gameState.isPaused]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        keysPressed.current.delete(e.key);
    }, []);

    // Game loop with requestAnimationFrame
    useEffect(() => {
        if (gameState.gameOver || gameState.isPaused) {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
            return;
        }

        let lastTime = performance.now();

        const gameLoop = (currentTime: number) => {
            const deltaTime = currentTime - lastTime;

            // Auto-drop logic
            const timeSinceLastDrop = currentTime - lastDropTime.current;
            if (timeSinceLastDrop >= gameState.dropInterval) {
                dispatch({ type: 'MOVE_DOWN' });
                lastDropTime.current = currentTime;
            }

            lastTime = currentTime;
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        lastDropTime.current = performance.now();
        animationFrameId.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [gameState.dropInterval, gameState.gameOver, gameState.isPaused]);

    // Keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    // Screen shake effect for legendary blocks
    const shouldShake = gameState.lastClearRarity === BlockRarity.LEGENDARY;

    // Show loading state during SSR
    if (!isMounted) {
        return (
            <div className="min-h-screen bg-neon-void flex items-center justify-center p-4 font-mono">
                <div className="text-neon-cyan text-2xl font-bold animate-pulse">Loading NEONTRIS...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neon-void flex items-center justify-center p-4 font-mono">
            {/* Background grid overlay */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            <div className={`relative z-10 ${shouldShake ? 'animate-shake' : ''}`}>
                {/* Title */}
                <div className="text-center mb-6">
                    <h1
                        className="text-5xl font-bold mb-2 glitch-text"
                        style={{
                            color: '#00f5ff',
                            textShadow: '0 0 30px #00f5ff, 0 0 60px #00f5ff',
                        }}
                    >
                        NEONTRIS
                    </h1>
                    <p className="text-sm text-neon-purple/70 uppercase tracking-widest">
                        Cyberpunk Edition
                    </p>
                </div>

                {/* Game Layout */}
                <div className="flex gap-6 items-start">
                    {/* Left Panel */}
                    <div className="space-y-4">
                        <HoldPiece piece={gameState.holdPiece} canHold={gameState.canHold} />

                        {/* Controls */}
                        <div className="bg-neon-void/50 backdrop-blur-md border-2 border-white/20 rounded-lg p-4 text-xs text-white/60">
                            <div className="uppercase tracking-wider mb-2 text-neon-cyan font-bold">Controls</div>
                            <div className="space-y-1 font-mono">
                                <div>← → : Move</div>
                                <div>↓ : Soft Drop</div>
                                <div>Space : Hard Drop</div>
                                <div>Z/X : Rotate</div>
                                <div>C : Hold</div>
                                <div>P : Pause</div>
                            </div>
                        </div>
                    </div>

                    {/* Game Board */}
                    <div>
                        <GameBoard
                            board={gameState.board}
                            currentPiece={gameState.currentPiece}
                            currentPosition={gameState.currentPosition}
                            currentRotation={gameState.currentRotation}
                        />
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-4">
                        <NextPiece piece={gameState.nextPiece} />
                        <ScorePanel
                            score={gameState.score}
                            level={gameState.level}
                            lines={gameState.lines}
                            lastClearRarity={gameState.lastClearRarity}
                        />
                    </div>
                </div>

                {/* Pause Overlay */}
                {gameState.isPaused && !gameState.gameOver && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neon-cyan mb-4" style={{ textShadow: '0 0 20px #00f5ff' }}>
                                PAUSED
                            </div>
                            <div className="text-white/60">Press P to resume</div>
                        </div>
                    </div>
                )}

                {/* Game Over Overlay */}
                {gameState.gameOver && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="text-center bg-neon-void/90 border-2 border-neon-pink p-8 rounded-lg shadow-[0_0_50px_rgba(255,16,240,0.5)]">
                            <div className="text-5xl font-bold text-neon-pink mb-4 animate-neon-pulse" style={{ textShadow: '0 0 30px #ff10f0' }}>
                                GAME OVER
                            </div>
                            <div className="text-2xl text-white mb-2">Final Score</div>
                            <div className="text-4xl font-bold text-neon-cyan mb-6">{gameState.score.toLocaleString()}</div>
                            <button
                                onClick={() => dispatch({ type: 'RESET' })}
                                className="bg-neon-cyan text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,245,255,0.6)]"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
