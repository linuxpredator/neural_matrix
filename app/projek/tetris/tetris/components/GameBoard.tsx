'use client';

/**
 * NEONTRIS GameBoard Component
 * Renders the 20x10 Tetris grid with neon visual effects
 */

import { BlockShape, Position, BlockRarity } from '../lib/types';
import { getRotatedShape } from '../lib/blocks';
import { getGhostPosition } from '../lib/game-engine';
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, RARITY_COLORS } from '../constants';

interface GameBoardProps {
    board: number[][];
    currentPiece: BlockShape | null;
    currentPosition: Position;
    currentRotation: number;
    showGhost?: boolean;
}

export default function GameBoard({
    board,
    currentPiece,
    currentPosition,
    currentRotation,
    showGhost = true,
}: GameBoardProps) {
    // Calculate ghost position
    const ghostPosition: Position | null =
        currentPiece && showGhost
            ? getGhostPosition(board, currentPiece, currentPosition, currentRotation)
            : null;

    // Get current piece shape
    const currentShape = currentPiece ? getRotatedShape(currentPiece, currentRotation) : null;

    // Helper to check if cell is part of current piece
    const isCurrentPiece = (row: number, col: number): boolean => {
        if (!currentShape) return false;
        const relativeRow = row - currentPosition.y;
        const relativeCol = col - currentPosition.x;
        return (
            relativeRow >= 0 &&
            relativeRow < currentShape.length &&
            relativeCol >= 0 &&
            relativeCol < currentShape[relativeRow].length &&
            currentShape[relativeRow][relativeCol] === 1
        );
    };

    // Helper to check if cell is part of ghost piece
    const isGhostPiece = (row: number, col: number): boolean => {
        if (!currentShape || !ghostPosition) return false;
        const relativeRow = row - ghostPosition.y;
        const relativeCol = col - ghostPosition.x;
        return (
            relativeRow >= 0 &&
            relativeRow < currentShape.length &&
            relativeCol >= 0 &&
            relativeCol < currentShape[relativeRow].length &&
            currentShape[relativeRow][relativeCol] === 1
        );
    };

    // Get neon glow styles based on rarity
    const getNeonStyles = (rarity: BlockRarity) => {
        const color = RARITY_COLORS[rarity];
        switch (rarity) {
            case BlockRarity.LEGENDARY:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 30px ${color}, 0 0 60px ${color}, 0 0 90px ${color}, inset 0 0 20px rgba(255,255,255,0.5)`,
                    animation: 'neon-pulse 1s ease-in-out infinite',
                };
            case BlockRarity.EPIC:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}, 0 0 40px ${color}, inset 0 0 10px rgba(255,255,255,0.3)`,
                    animation: 'neon-pulse 2s ease-in-out infinite',
                };
            case BlockRarity.RARE:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
                };
            default:
                return {
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}`,
                };
        }
    };

    return (
        <div
            className="relative border-2 border-neon-cyan mx-auto"
            style={{
                width: BOARD_WIDTH * BLOCK_SIZE,
                height: BOARD_HEIGHT * BLOCK_SIZE,
                backgroundColor: 'rgba(10, 10, 15, 0.8)',
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.3), inset 0 0 50px rgba(0, 245, 255, 0.1)',
            }}
        >
            {/* Holographic grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: `${BLOCK_SIZE}px ${BLOCK_SIZE}px`,
                }}
            />

            {/* Render board cells */}
            <div className="relative grid" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)` }}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                        const isCurrent = isCurrentPiece(rowIndex, colIndex);
                        const isGhost = !isCurrent && isGhostPiece(rowIndex, colIndex);
                        const isFilled = cell !== 0;

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="border border-transparent transition-all duration-100"
                                style={{
                                    width: BLOCK_SIZE,
                                    height: BLOCK_SIZE,
                                    ...(isCurrent && currentPiece
                                        ? getNeonStyles(currentPiece.rarity)
                                        : isGhost && currentPiece
                                            ? {
                                                backgroundColor: 'transparent',
                                                border: `2px dashed ${currentPiece.color}`,
                                                opacity: 0.3,
                                            }
                                            : isFilled
                                                ? {
                                                    backgroundColor: RARITY_COLORS[BlockRarity.COMMON],
                                                    boxShadow: `0 0 5px ${RARITY_COLORS[BlockRarity.COMMON]}`,
                                                }
                                                : {}),
                                }}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
