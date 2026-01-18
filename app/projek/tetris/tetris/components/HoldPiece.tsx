'use client';

/**
 * HoldPiece Component  
 * Displays the currently held block
 */

import { BlockShape, BlockRarity } from '../lib/types';
import { BLOCK_SIZE, RARITY_COLORS } from '../constants';

interface HoldPieceProps {
    piece: BlockShape | null;
    canHold: boolean;
}

export default function HoldPiece({ piece, canHold }: HoldPieceProps) {
    const getNeonStyles = (rarity: BlockRarity) => {
        const color = RARITY_COLORS[rarity];
        switch (rarity) {
            case BlockRarity.LEGENDARY:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                    animation: 'neon-pulse 1s ease-in-out infinite',
                };
            case BlockRarity.EPIC:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
                };
            case BlockRarity.RARE:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`,
                };
            default:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                };
        }
    };

    return (
        <div className={`bg-neon-void/50 backdrop-blur-md border-2 rounded-lg p-4 shadow-[0_0_20px_rgba(189,0,255,0.2)] transition-opacity ${canHold ? 'border-neon-purple/50' : 'border-white/20 opacity-50'
            }`}>
            <div className="text-xs text-neon-purple uppercase tracking-wider mb-3 font-mono">
                Hold Piece {!canHold && '(Locked)'}
            </div>

            {/* Piece Preview Grid */}
            <div className="flex items-center justify-center h-24">
                {piece ? (
                    <div
                        className="grid gap-0.5"
                        style={{
                            gridTemplateColumns: `repeat(${piece.shape[0].length}, ${BLOCK_SIZE - 5}px)`,
                        }}
                    >
                        {piece.shape.map((row, rowIndex) =>
                            row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="rounded-sm"
                                    style={{
                                        width: BLOCK_SIZE - 5,
                                        height: BLOCK_SIZE - 5,
                                        ...(cell === 1 ? getNeonStyles(piece.rarity) : {}),
                                    }}
                                />
                            ))
                        )}
                    </div>
                ) : (
                    <div className="text-white/30 text-sm font-mono">Empty</div>
                )}
            </div>

            {/* Controls Hint */}
            <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-xs text-white/50 text-center font-mono">
                    Press <span className="text-neon-purple">C</span> to hold
                </div>
            </div>
        </div>
    );
}
