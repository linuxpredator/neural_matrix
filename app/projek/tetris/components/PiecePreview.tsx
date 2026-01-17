// NEONTRIS - Next & Hold Piece Preview Components

'use client';

import { Block, BlockRarity } from '../lib/types';

interface PiecePreviewProps {
    piece: Block | null;
    title: string;
}

export default function PiecePreview({ piece, title }: PiecePreviewProps) {
    if (!piece) {
        return (
            <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-cyan/20">
                <div className="text-neon-cyan/60 text-xs mb-2 font-mono">{title}</div>
                <div className="h-20 flex items-center justify-center text-white/30 text-sm">
                    Empty
                </div>
            </div>
        );
    }

    const cellSize = 20;
    const maxSize = 5;

    // Get color based on rarity
    const rarityColors = {
        [BlockRarity.COMMON]: '#00f5ff',
        [BlockRarity.RARE]: '#bd00ff',
        [BlockRarity.EPIC]: '#ff10f0',
        [BlockRarity.LEGENDARY]: '#ffffff',
    };

    const color = rarityColors[piece.rarity];
    const glow = piece.glowIntensity;

    return (
        <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-cyan/20">
            <div className="text-neon-cyan/60 text-xs mb-2 font-mono">{title}</div>

            {/* Piece preview grid */}
            <div className="flex items-center justify-center min-h-[100px]">
                <div
                    className="grid gap-[2px]"
                    style={{
                        gridTemplateColumns: `repeat(${Math.min(piece.shape[0].length, maxSize)}, ${cellSize}px)`,
                        gridTemplateRows: `repeat(${Math.min(piece.shape.length, maxSize)}, ${cellSize}px)`,
                    }}
                >
                    {piece.shape.map((row, y) =>
                        row.map((cell, x) =>
                            cell !== 0 ? (
                                <div
                                    key={`${y}-${x}`}
                                    className="rounded-sm"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: `0 0 ${8 * glow}px ${color}`,
                                        width: cellSize,
                                        height: cellSize,
                                    }}
                                />
                            ) : (
                                <div
                                    key={`${y}-${x}`}
                                    className="bg-transparent"
                                    style={{
                                        width: cellSize,
                                        height: cellSize,
                                    }}
                                />
                            )
                        )
                    )}
                </div>
            </div>

            {/* Rarity indicator */}
            <div className="mt-2 text-center">
                <span
                    className="text-xs font-bold font-mono px-2 py-1 rounded"
                    style={{
                        color: color,
                        textShadow: `0 0 ${5 * glow}px ${color}`,
                    }}
                >
                    {piece.rarity.toUpperCase()}
                </span>
            </div>
        </div>
    );
}
