/**
 * NEONTRIS Game Engine Utilities
 * Core collision detection, rotation, and board manipulation logic
 */

import { BlockShape, Position } from './types';
import { getRotatedShape } from './blocks';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants';

/**
 * Create empty game board
 */
export function createEmptyBoard(height: number, width: number): number[][] {
    return Array.from({ length: height }, () => Array(width).fill(0));
}

/**
 * Check if piece can be placed at position
 * Returns true if no collision detected
 */
export function canPlacePiece(
    board: number[][],
    block: BlockShape,
    position: Position,
    rotation: number
): boolean {
    const shape = getRotatedShape(block, rotation);

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] === 1) {
                const boardRow = position.y + row;
                const boardCol = position.x + col;

                // Check bounds
                if (
                    boardRow < 0 ||
                    boardRow >= BOARD_HEIGHT ||
                    boardCol < 0 ||
                    boardCol >= BOARD_WIDTH
                ) {
                    return false;
                }

                // Check collision with existing pieces
                if (board[boardRow][boardCol] !== 0) {
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * Wall-kick system for rotation near walls/pieces
 * Tries multiple offset positions when rotation fails
 * Based on SRS (Super Rotation System)
 */
export function tryWallKick(
    board: number[][],
    block: BlockShape,
    position: Position,
    rotation: number
): Position | null {
    // SRS wall-kick offsets
    const kickOffsets: Position[] = [
        { x: 0, y: 0 }, // No offset (base position)
        { x: -1, y: 0 }, // Left
        { x: 1, y: 0 }, // Right
        { x: 0, y: -1 }, // Up
        { x: -1, y: -1 }, // Left-up
        { x: 1, y: -1 }, // Right-up
    ];

    for (const offset of kickOffsets) {
        const testPosition: Position = {
            x: position.x + offset.x,
            y: position.y + offset.y,
        };

        if (canPlacePiece(board, block, testPosition, rotation)) {
            return testPosition;
        }
    }

    return null; // All kicks failed
}

/**
 * Lock piece onto board
 * Returns new board with piece merged in
 */
export function lockPieceToBoard(
    board: number[][],
    block: BlockShape,
    position: Position,
    rotation: number
): number[][] {
    const newBoard = board.map((row) => [...row]);
    const shape = getRotatedShape(block, rotation);

    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] === 1) {
                const boardRow = position.y + row;
                const boardCol = position.x + col;
                if (boardRow >= 0 && boardRow < BOARD_HEIGHT) {
                    newBoard[boardRow][boardCol] = 1; // Mark as filled
                }
            }
        }
    }

    return newBoard;
}

/**
 * Find all complete lines on the board
 * Returns array of row indices
 */
export function findCompleteLines(board: number[][]): number[] {
    const completeLines: number[] = [];

    for (let row = 0; row < board.length; row++) {
        if (board[row].every((cell) => cell !== 0)) {
            completeLines.push(row);
        }
    }

    return completeLines;
}

/**
 * Remove completed lines and drop blocks above
 */
export function clearLines(board: number[][], linesToClear: number[]): number[][] {
    const newBoard = board.filter((_, index) => !linesToClear.includes(index));

    // Add empty rows at top
    while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    return newBoard;
}

/**
 * Calculate hard drop distance
 * Returns number of rows the piece would drop
 */
export function calculateDropDistance(
    board: number[][],
    block: BlockShape,
    position: Position,
    rotation: number
): number {
    let distance = 0;

    while (
        canPlacePiece(board, block, { x: position.x, y: position.y + distance + 1 }, rotation)
    ) {
        distance++;
    }

    return distance;
}

/**
 * Get ghost piece position (for preview)
 */
export function getGhostPosition(
    board: number[][],
    block: BlockShape,
    position: Position,
    rotation: number
): Position {
    const distance = calculateDropDistance(board, block, position, rotation);
    return {
        x: position.x,
        y: position.y + distance,
    };
}
