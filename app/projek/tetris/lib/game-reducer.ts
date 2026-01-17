// NEONTRIS - Game State Reducer
// Manages all game state transitions with useReducer

import {
    GameState,
    GameAction,
    Block,
    Position,
    BOARD_WIDTH,
    BOARD_HEIGHT,
    INITIAL_DROP_SPEED,
    BlockRarity,
} from './types';
import { getRandomBlock, rotateBlock } from './blocks';
import { calculateScore, calculateLevel, calculateDropSpeed } from './scoring';

// Helper: Create empty board
function createEmptyBoard(): number[][] {
    return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
}

// Helper: Check if piece can be placed at position
function canPlacePiece(
    board: number[][],
    piece: Block,
    position: Position
): boolean {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0) {
                const boardX = position.x + x;
                const boardY = position.y + y;

                // Check boundaries
                if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
                    return false;
                }

                // Check collision with existing blocks
                if (boardY >= 0 && board[boardY][boardX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Helper: Try wall-kick offsets on rotation failure
function tryWallKick(
    board: number[][],
    piece: Block,
    position: Position,
    rotatedShape: number[][]
): { success: boolean; newPosition: Position } {
    const offsets = [
        { x: 0, y: 0 },   // No offset (original)
        { x: -1, y: 0 },  // Left
        { x: 1, y: 0 },   // Right
        { x: 0, y: -1 },  // Up
        { x: -2, y: 0 },  // Far left
    ];

    const testPiece = { ...piece, shape: rotatedShape };

    for (const offset of offsets) {
        const newPos = {
            x: position.x + offset.x,
            y: position.y + offset.y,
        };

        if (canPlacePiece(board, testPiece, newPos)) {
            return { success: true, newPosition: newPos };
        }
    }

    return { success: false, newPosition: position };
}

// Helper: Merge piece into board
function mergePieceToBoard(
    board: number[][],
    piece: Block,
    position: Position
): number[][] {
    const newBoard = board.map(row => [...row]);

    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x] !== 0) {
                const boardY = position.y + y;
                const boardX = position.x + x;
                if (boardY >= 0 && boardY < BOARD_HEIGHT) {
                    newBoard[boardY][boardX] = 1; // Mark as occupied
                }
            }
        }
    }

    return newBoard;
}

// Helper: Find and clear completed lines
function clearCompletedLines(board: number[][]): { newBoard: number[][]; linesCleared: number } {
    const completedRows: number[] = [];

    // Find completed rows
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        if (board[y].every(cell => cell !== 0)) {
            completedRows.push(y);
        }
    }

    if (completedRows.length === 0) {
        return { newBoard: board, linesCleared: 0 };
    }

    // Remove completed rows and add empty rows at top
    const newBoard = board.filter((_, index) => !completedRows.includes(index));
    const emptyRows = Array(completedRows.length)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(0));

    return {
        newBoard: [...emptyRows, ...newBoard],
        linesCleared: completedRows.length,
    };
}

// Helper: Get starting position for new piece
function getStartPosition(piece: Block): Position {
    return {
        x: Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2),
        y: 0,
    };
}

// Initial game state
export function getInitialState(): GameState {
    const firstPiece = getRandomBlock();
    const nextPiece = getRandomBlock();

    return {
        board: createEmptyBoard(),
        currentPiece: firstPiece,
        currentPosition: getStartPosition(firstPiece),
        nextPiece,
        holdPiece: null,
        canHold: true,
        score: 0,
        lines: 0,
        level: 1,
        gameOver: false,
        isPaused: false,
        isShaking: false,
        lastClearRarity: null,
        dropSpeed: INITIAL_DROP_SPEED,
    };
}

// Game reducer
export function gameReducer(state: GameState, action: GameAction): GameState {
    if (state.gameOver && action.type !== 'RESET') {
        return state;
    }

    if (state.isPaused && action.type !== 'TOGGLE_PAUSE' && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'MOVE_LEFT': {
            if (!state.currentPiece) return state;
            const newPos = { x: state.currentPosition.x - 1, y: state.currentPosition.y };
            if (canPlacePiece(state.board, state.currentPiece, newPos)) {
                return { ...state, currentPosition: newPos };
            }
            return state;
        }

        case 'MOVE_RIGHT': {
            if (!state.currentPiece) return state;
            const newPos = { x: state.currentPosition.x + 1, y: state.currentPosition.y };
            if (canPlacePiece(state.board, state.currentPiece, newPos)) {
                return { ...state, currentPosition: newPos };
            }
            return state;
        }

        case 'MOVE_DOWN': {
            if (!state.currentPiece) return state;
            const newPos = { x: state.currentPosition.x, y: state.currentPosition.y + 1 };
            if (canPlacePiece(state.board, state.currentPiece, newPos)) {
                return { ...state, currentPosition: newPos };
            }
            // Can't move down - lock piece
            return gameReducer(state, { type: 'LOCK_PIECE' });
        }

        case 'ROTATE': {
            if (!state.currentPiece) return state;
            const rotated = rotateBlock(state.currentPiece.shape);
            const wallKick = tryWallKick(state.board, state.currentPiece, state.currentPosition, rotated);

            if (wallKick.success) {
                return {
                    ...state,
                    currentPiece: { ...state.currentPiece, shape: rotated },
                    currentPosition: wallKick.newPosition,
                };
            }
            return state;
        }

        case 'HARD_DROP': {
            if (!state.currentPiece) return state;
            let dropDistance = 0;
            while (
                canPlacePiece(
                    state.board,
                    state.currentPiece,
                    { x: state.currentPosition.x, y: state.currentPosition.y + dropDistance + 1 }
                )
            ) {
                dropDistance++;
            }
            const newState = {
                ...state,
                currentPosition: {
                    x: state.currentPosition.x,
                    y: state.currentPosition.y + dropDistance,
                },
            };
            return gameReducer(newState, { type: 'LOCK_PIECE' });
        }

        case 'HOLD_PIECE': {
            if (!state.currentPiece || !state.canHold) return state;

            const newNext = state.holdPiece || getRandomBlock();
            const newHold = state.currentPiece;

            return {
                ...state,
                currentPiece: newNext,
                currentPosition: getStartPosition(newNext),
                holdPiece: newHold,
                canHold: false,
            };
        }

        case 'LOCK_PIECE': {
            if (!state.currentPiece) return state;

            const newBoard = mergePieceToBoard(state.board, state.currentPiece, state.currentPosition);
            const { newBoard: clearedBoard, linesCleared } = clearCompletedLines(newBoard);

            const newLines = state.lines + linesCleared;
            const newLevel = calculateLevel(newLines);
            const newScore = state.score + calculateScore(linesCleared, state.level, state.currentPiece.rarity);
            const newDropSpeed = calculateDropSpeed(newLevel);

            // Check if Legendary block
            const shouldShake = state.currentPiece.rarity === BlockRarity.LEGENDARY;

            // Spawn next piece
            const newCurrent = state.nextPiece;
            const newNext = getRandomBlock();
            const startPos = getStartPosition(newCurrent);

            // Check game over
            if (!canPlacePiece(clearedBoard, newCurrent, startPos)) {
                return {
                    ...state,
                    board: newBoard,
                    gameOver: true,
                };
            }

            return {
                ...state,
                board: clearedBoard,
                currentPiece: newCurrent,
                currentPosition: startPos,
                nextPiece: newNext,
                canHold: true,
                score: newScore,
                lines: newLines,
                level: newLevel,
                dropSpeed: newDropSpeed,
                isShaking: shouldShake,
                lastClearRarity: linesCleared > 0 ? state.currentPiece.rarity : null,
            };
        }

        case 'TOGGLE_PAUSE':
            return { ...state, isPaused: !state.isPaused };

        case 'TRIGGER_SHAKE':
            return { ...state, isShaking: true };

        case 'STOP_SHAKE':
            return { ...state, isShaking: false };

        case 'RESET':
            return getInitialState();

        default:
            return state;
    }
}
