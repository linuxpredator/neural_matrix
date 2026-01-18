/**
 * NEONTRIS Game State Reducer
 * Manages all game state transitions using React useReducer pattern
 */

import { GameState, GameAction, BlockShape, Position } from './types';
import { getRandomBlock } from './blocks';
import {
    createEmptyBoard,
    canPlacePiece,
    tryWallKick,
    lockPieceToBoard,
    findCompleteLines,
    clearLines,
    calculateDropDistance,
} from './game-engine';
import {
    calculateScore,
    calculateLevel,
    calculateDropInterval,
    calculateHardDropBonus,
} from './scoring';
import {
    BOARD_WIDTH,
    BOARD_HEIGHT,
    INITIAL_DROP_INTERVAL,
    MIN_DROP_INTERVAL,
    DROP_SPEED_DECREASE_PER_LEVEL,
    LINES_PER_LEVEL,
} from '../constants';

/**
 * Initial game state
 */
export function getInitialState(): GameState {
    const firstPiece = getRandomBlock();
    const nextPiece = getRandomBlock();

    return {
        board: createEmptyBoard(BOARD_HEIGHT, BOARD_WIDTH),
        currentPiece: firstPiece,
        currentPosition: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
        currentRotation: 0,
        nextPiece,
        holdPiece: null,
        canHold: true,
        score: 0,
        lines: 0,
        level: 1,
        gameOver: false,
        isPaused: false,
        lastClearRarity: null,
        dropInterval: INITIAL_DROP_INTERVAL,
    };
}

/**
 * Game state reducer
 */
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
            const newPosition: Position = { ...state.currentPosition, x: state.currentPosition.x - 1 };
            if (canPlacePiece(state.board, state.currentPiece, newPosition, state.currentRotation)) {
                return { ...state, currentPosition: newPosition };
            }
            return state;
        }

        case 'MOVE_RIGHT': {
            if (!state.currentPiece) return state;
            const newPosition: Position = { ...state.currentPosition, x: state.currentPosition.x + 1 };
            if (canPlacePiece(state.board, state.currentPiece, newPosition, state.currentRotation)) {
                return { ...state, currentPosition: newPosition };
            }
            return state;
        }

        case 'MOVE_DOWN': {
            if (!state.currentPiece) return state;
            const newPosition: Position = { ...state.currentPosition, y: state.currentPosition.y + 1 };
            if (canPlacePiece(state.board, state.currentPiece, newPosition, state.currentRotation)) {
                return { ...state, currentPosition: newPosition };
            }
            // Can't move down - trigger lock
            return gameReducer(state, { type: 'LOCK_PIECE' });
        }

        case 'ROTATE_CW': {
            if (!state.currentPiece) return state;
            const newRotation = (state.currentRotation + 1) % 4;

            // Try basic rotation
            if (canPlacePiece(state.board, state.currentPiece, state.currentPosition, newRotation)) {
                return { ...state, currentRotation: newRotation };
            }

            // Try wall-kick
            const kickedPosition = tryWallKick(
                state.board,
                state.currentPiece,
                state.currentPosition,
                newRotation
            );
            if (kickedPosition) {
                return { ...state, currentPosition: kickedPosition, currentRotation: newRotation };
            }

            return state;
        }

        case 'ROTATE_CCW': {
            if (!state.currentPiece) return state;
            const newRotation = (state.currentRotation + 3) % 4; // +3 = -1 in mod 4

            if (canPlacePiece(state.board, state.currentPiece, state.currentPosition, newRotation)) {
                return { ...state, currentRotation: newRotation };
            }

            const kickedPosition = tryWallKick(
                state.board,
                state.currentPiece,
                state.currentPosition,
                newRotation
            );
            if (kickedPosition) {
                return { ...state, currentPosition: kickedPosition, currentRotation: newRotation };
            }

            return state;
        }

        case 'HARD_DROP': {
            if (!state.currentPiece) return state;
            const dropDistance = calculateDropDistance(
                state.board,
                state.currentPiece,
                state.currentPosition,
                state.currentRotation
            );
            const newPosition: Position = {
                ...state.currentPosition,
                y: state.currentPosition.y + dropDistance,
            };
            const bonus = calculateHardDropBonus(dropDistance);
            const newState = {
                ...state,
                currentPosition: newPosition,
                score: state.score + bonus,
            };
            return gameReducer(newState, { type: 'LOCK_PIECE' });
        }

        case 'HOLD_PIECE': {
            if (!state.canHold || !state.currentPiece) return state;

            const pieceToSpawn = state.holdPiece || state.nextPiece;
            const newNextPiece = state.holdPiece ? state.nextPiece : getRandomBlock();

            return {
                ...state,
                holdPiece: state.currentPiece,
                currentPiece: pieceToSpawn,
                currentPosition: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
                currentRotation: 0,
                nextPiece: newNextPiece,
                canHold: false,
            };
        }

        case 'LOCK_PIECE': {
            if (!state.currentPiece) return state;

            // Lock piece to board
            const newBoard = lockPieceToBoard(
                state.board,
                state.currentPiece,
                state.currentPosition,
                state.currentRotation
            );

            // Find complete lines
            const completeLines = findCompleteLines(newBoard);

            // Calculate score if lines cleared
            let newScore = state.score;
            let newLines = state.lines;
            let lastClearRarity = state.lastClearRarity;
            let clearedBoard = newBoard;

            if (completeLines.length > 0) {
                const scoreCalc = calculateScore(
                    completeLines.length,
                    state.level,
                    state.currentPiece.rarity
                );
                newScore += scoreCalc.totalScore;
                newLines += completeLines.length;
                lastClearRarity = state.currentPiece.rarity;
                clearedBoard = clearLines(newBoard, completeLines);
            }

            // Calculate new level
            const newLevel = calculateLevel(newLines);
            const newDropInterval = calculateDropInterval(
                newLevel,
                INITIAL_DROP_INTERVAL,
                MIN_DROP_INTERVAL,
                DROP_SPEED_DECREASE_PER_LEVEL
            );

            // Spawn next piece
            const nextPiece = getRandomBlock();
            const spawnPosition: Position = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

            // Check game over
            if (!canPlacePiece(clearedBoard, state.nextPiece, spawnPosition, 0)) {
                return {
                    ...state,
                    board: clearedBoard,
                    gameOver: true,
                    score: newScore,
                    lines: newLines,
                    level: newLevel,
                };
            }

            return {
                ...state,
                board: clearedBoard,
                currentPiece: state.nextPiece,
                currentPosition: spawnPosition,
                currentRotation: 0,
                nextPiece,
                canHold: true, // Reset hold ability
                score: newScore,
                lines: newLines,
                level: newLevel,
                dropInterval: newDropInterval,
                lastClearRarity,
            };
        }

        case 'TOGGLE_PAUSE': {
            return { ...state, isPaused: !state.isPaused };
        }

        case 'GAME_OVER': {
            return { ...state, gameOver: true };
        }

        case 'RESET': {
            return getInitialState();
        }

        default:
            return state;
    }
}
