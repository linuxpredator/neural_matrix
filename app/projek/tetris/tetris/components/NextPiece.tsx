'use client';

/**
 * NextPiece Component
 * Preview of the next block to spawn
 */

import { BlockShape, BlockRarity } from '../lib/types';
import { BLOCK_SIZE, RARITY_COLORS } from '../constants';

interface NextPieceProps {
    piece: BlockShape;
}

export default function NextPiece({ piece }: NextPieceProps) {
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
        <div className="bg-neon-void/50 backdrop-blur-md border-2 border-neon-cyan/50 rounded-lg p-4 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <div className="text-xs text-neon-cyan uppercase tracking-wider mb-3 font-mono">Next Piece</div>

            {/* Piece Preview Grid */}
            <div className="flex items-center justify-center h-24">
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
            </div>

            {/* Rarity Badge */}
            <div className="mt-3 pt-3 border-t border-white/10">
                <div
                    className={`text-xs uppercase tracking-wide font-mono text-center font-bold ${piece.rarity === 'legendary'
                            ? 'text-white animate-neon-pulse'
                            : piece.rarity === 'epic'
                                ? 'text-neon-pink'
                                : piece.rarity === 'rare'
                                    ? 'text-neon-purple'
                                    : 'text-neon-cyan'
                        }`}
                >
                    {piece.rarity}
                </div>
                <div className="text-xs text-white/50 mt-1 text-center font-mono">
                    {piece.multiplier}x Multiplier
                </div>
            </div>
        </div>
    );
}
