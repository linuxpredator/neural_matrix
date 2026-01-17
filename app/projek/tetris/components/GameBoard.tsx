// NEONTR IS - Game Board Component
// Visual grid rendering with neon glow effects

'use client';

import { Block, GameState, BlockRarity, BOARD_WIDTH, BOARD_HEIGHT } from '../lib/types';
import { getGhostPosition } from '../lib/game-engine';

interface GameBoardProps {
    state: GameState;
}

// Get neon glow classes based on rarity
function getNeonGlow(rarity: BlockRarity, intensity: number = 1): string {
    const colors = {
        [BlockRarity.COMMON]: '00f5ff',
        [BlockRarity.RARE]: 'bd00ff',
        [BlockRarity.EPIC]: 'ff10f0',
        [BlockRarity.LEGENDARY]: 'ffffff',
    };

    const color = colors[rarity];
    const blur = 10 * intensity;
    const spread = 5 * intensity;

    return `shadow-[0_0_${blur}px_${spread}px_#${color}]`;
}

export default function GameBoard({ state }: GameBoardProps) {
    const ghostY = getGhostPosition(state);

    // Render a single cell
    const renderCell = (rowIndex: number, colIndex: number) => {
        const isOccupied = state.board[rowIndex][colIndex] !== 0;

        // Check if current piece occupies this cell
        let isCurrentPiece = false;
        let currentBlockRarity: BlockRarity | null = null;

        if (state.currentPiece) {
            const relY = rowIndex - state.currentPosition.y;
            const relX = colIndex - state.currentPosition.x;

            if (
                relY >= 0 &&
                relY < state.currentPiece.shape.length &&
                relX >= 0 &&
                relX < state.currentPiece.shape[0].length &&
                state.currentPiece.shape[relY][relX] !== 0
            ) {
                isCurrentPiece = true;
                currentBlockRarity = state.currentPiece.rarity;
            }
        }

        // Check if ghost piece occupies this cell
        let isGhost = false;
        if (state.currentPiece && ghostY !== state.currentPosition.y) {
            const relY = rowIndex - ghostY;
            const relX = colIndex - state.currentPosition.x;

            if (
                relY >= 0 &&
                relY < state.currentPiece.shape.length &&
                relX >= 0 &&
                relX < state.currentPiece.shape[0].length &&
                state.currentPiece.shape[relY][relX] !== 0
            ) {
                isGhost = true;
            }
        }

        const baseClass = "w-full h-full border border-neon-cyan/20 transition-all duration-75";

        if (isCurrentPiece && currentBlockRarity) {
            const color = state.currentPiece!.color;
            const glow = state.currentPiece!.glowIntensity;

            return (
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${baseClass} ${getNeonGlow(currentBlockRarity, glow)}`}
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 0 ${10 * glow}px ${color}, inset 0 0 ${5 * glow}px rgba(255,255,255,0.3)`,
                    }}
                />
            );
        }

        if (isGhost && state.currentPiece) {
            const color = state.currentPiece.color;
            return (
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${baseClass} opacity-30`}
                    style={{
                        backgroundColor: 'transparent',
                        border: `2px solid ${color}`,
                    }}
                />
            );
        }

        if (isOccupied) {
            // Static block from board
            return (
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${baseClass} bg-neon-cyan shadow-[0_0_8px_2px_#00f5ff]`}
                    style={{
                        boxShadow: '0 0 8px 2px #00f5ff, inset 0 0 4px rgba(255,255,255,0.2)',
                    }}
                />
            );
        }

        // Empty cell
        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                className={`${baseClass} bg-black/40`}
            />
        );
    };

    return (
        <div
            className={`relative bg-gradient-to-b from-black via-neon-void to-black rounded-lg p-2 border-2 border-neon-cyan/40 ${state.isShaking ? 'animate-shake' : ''
                }`}
            style={{
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
            }}
        >
            {/* Grid overlay for holographic effect */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-lg"
                style={{
                    backgroundImage: `
            linear-gradient(#00f5ff 1px, transparent 1px),
            linear-gradient(90deg, #00f5ff 1px, transparent 1px)
          `,
                    backgroundSize: '30px 30px',
                }}
            />

            {/* Game grid */}
            <div
                className="grid gap-[1px] relative z-10"
                style={{
                    gridTemplateColumns: `repeat(${BOARD_WIDTH}, 30px)`,
                    gridTemplateRows: `repeat(${BOARD_HEIGHT}, 30px)`,
                }}
            >
                {state.board.map((row, rowIndex) =>
                    row.map((_, colIndex) => renderCell(rowIndex, colIndex))
                )}
            </div>

            {/* Game Over overlay */}
            {state.gameOver && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-neon-pink animate-pulse">
                            GAME_OVER
                        </h2>
                        <p className="text-neon-cyan text-xl">Score: {state.score}</p>
                        <p className="text-white/60 text-sm">Press R to restart</p>
                    </div>
                </div>
            )}

            {/* Pause overlay */}
            {state.isPaused && !state.gameOver && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg backdrop-blur-sm">
                    <h2 className="text-3xl font-bold text-neon-purple animate-pulse">
                        PAUSED
                    </h2>
                </div>
            )}
        </div>
    );
}
