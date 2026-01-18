'use client';

import { ArrowLeft, ArrowRight, ArrowDown, RotateCw, ChevronsDown, Square, Pause, Play, RotateCcw } from 'lucide-react';

interface TouchControlsProps {
    controls: {
        moveLeft: () => void;
        moveRight: () => void;
        rotate: () => void;
        hardDrop: () => void;
        holdPiece: () => void;
        togglePause: () => void;
        reset: () => void;
    };
    gameState: {
        isPaused: boolean;
        gameOver: boolean;
    };
}

export default function TouchControls({ controls, gameState }: TouchControlsProps) {
    const handleTouchButton = (action: () => void) => (e: React.TouchEvent) => {
        e.preventDefault();
        action();
    };

    const buttonBaseClass = "flex items-center justify-center border-2 border-neon-cyan/40 bg-black/80 backdrop-blur-sm text-neon-cyan active:bg-neon-cyan/20 active:scale-95 transition-all touch-none select-none shadow-[0_0_10px_rgba(0,245,255,0.3)]";

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
            {/* Control Container */}
            <div className="bg-gradient-to-t from-black/95 via-black/90 to-transparent p-4 pt-8">
                <div className="max-w-2xl mx-auto flex justify-between items-end gap-4">
                    {/* Left Side - D-Pad Movement */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] text-neon-cyan/60 font-mono mb-1 uppercase tracking-wider">Move</div>
                        <div className="grid grid-cols-3 gap-1">
                            {/* Top Row - Empty, Up (not used), Empty */}
                            <div></div>
                            <div></div>
                            <div></div>

                            {/* Middle Row - Left, Center, Right */}
                            <button
                                onTouchStart={handleTouchButton(controls.moveLeft)}
                                className={`${buttonBaseClass} w-14 h-14 rounded-l-lg`}
                            >
                                <ArrowLeft size={24} strokeWidth={2.5} />
                            </button>
                            <div className="w-14 h-14 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-neon-cyan/40"></div>
                            </div>
                            <button
                                onTouchStart={handleTouchButton(controls.moveRight)}
                                className={`${buttonBaseClass} w-14 h-14 rounded-r-lg`}
                            >
                                <ArrowRight size={24} strokeWidth={2.5} />
                            </button>

                            {/* Bottom Row - Empty, Down, Empty */}
                            <div></div>
                            <button
                                onTouchStart={handleTouchButton(() => {
                                    // Soft drop - dispatch MOVE_DOWN
                                    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
                                    window.dispatchEvent(event);
                                })}
                                className={`${buttonBaseClass} w-14 h-14 rounded-b-lg`}
                            >
                                <ArrowDown size={24} strokeWidth={2.5} />
                            </button>
                            <div></div>
                        </div>
                    </div>

                    {/* Center - Game Controls */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] text-neon-cyan/60 font-mono mb-1 uppercase tracking-wider">Game</div>
                        <div className="flex gap-2">
                            <button
                                onTouchStart={handleTouchButton(controls.togglePause)}
                                className={`${buttonBaseClass} w-12 h-12 rounded-lg`}
                                disabled={gameState.gameOver}
                            >
                                {gameState.isPaused ? <Play size={20} /> : <Pause size={20} />}
                            </button>
                            {gameState.gameOver && (
                                <button
                                    onTouchStart={handleTouchButton(controls.reset)}
                                    className={`${buttonBaseClass} w-12 h-12 rounded-lg border-neon-pink/40 text-neon-pink shadow-[0_0_10px_rgba(255,16,240,0.3)]`}
                                >
                                    <RotateCcw size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Action Buttons */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-[10px] text-neon-cyan/60 font-mono mb-1 uppercase tracking-wider">Actions</div>
                        <div className="grid grid-cols-2 gap-2">
                            {/* Top Row - Rotate, Hard Drop */}
                            <button
                                onTouchStart={handleTouchButton(controls.rotate)}
                                className={`${buttonBaseClass} w-16 h-14 rounded-lg`}
                            >
                                <div className="flex flex-col items-center gap-0.5">
                                    <RotateCw size={20} strokeWidth={2.5} />
                                    <span className="text-[9px] font-mono">ROT</span>
                                </div>
                            </button>
                            <button
                                onTouchStart={handleTouchButton(controls.hardDrop)}
                                className={`${buttonBaseClass} w-16 h-14 rounded-lg border-neon-purple/40 text-neon-purple shadow-[0_0_10px_rgba(189,0,255,0.3)]`}
                            >
                                <div className="flex flex-col items-center gap-0.5">
                                    <ChevronsDown size={20} strokeWidth={2.5} />
                                    <span className="text-[9px] font-mono">DROP</span>
                                </div>
                            </button>

                            {/* Bottom Row - Hold (spans 2 columns) */}
                            <button
                                onTouchStart={handleTouchButton(controls.holdPiece)}
                                className={`${buttonBaseClass} col-span-2 h-12 rounded-lg`}
                            >
                                <div className="flex items-center gap-2">
                                    <Square size={18} strokeWidth={2.5} />
                                    <span className="text-[10px] font-mono font-bold">HOLD</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Touch Hint */}
                <div className="text-center mt-3 text-neon-cyan/40 text-[10px] font-mono">
                    TOUCH_CONTROLS_ACTIVE
                </div>
            </div>
        </div>
    );
}
