// NEONTRIS - Game Engine Hook
// Custom hook that manages game state and loop with requestAnimationFrame

'use client';

import { useReducer, useEffect, useCallback, useRef } from 'react';
import { gameReducer, getInitialState } from './game-reducer';
import { GameState, BlockRarity } from './types';

export function useGameEngine() {
    const [state, dispatch] = useReducer(gameReducer, null, getInitialState);
    const lastDropTime = useRef(Date.now());
    const animationFrameId = useRef<number | undefined>(undefined);

    // Movement controls
    const moveLeft = useCallback(() => dispatch({ type: 'MOVE_LEFT' }), []);
    const moveRight = useCallback(() => dispatch({ type: 'MOVE_RIGHT' }), []);
    const rotate = useCallback(() => dispatch({ type: 'ROTATE' }), []);
    const hardDrop = useCallback(() => dispatch({ type: 'HARD_DROP' }), []);
    const holdPiece = useCallback(() => dispatch({ type: 'HOLD_PIECE' }), []);
    const togglePause = useCallback(() => dispatch({ type: 'TOGGLE_PAUSE' }), []);
    const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

    // Game loop using requestAnimationFrame for 60 FPS
    useEffect(() => {
        if (state.gameOver || state.isPaused) return;

        const gameLoop = () => {
            const now = Date.now();
            const deltaTime = now - lastDropTime.current;

            // Auto-drop based on level speed
            if (deltaTime >= state.dropSpeed) {
                dispatch({ type: 'MOVE_DOWN' });
                lastDropTime.current = now;
            }

            animationFrameId.current = requestAnimationFrame(gameLoop);
        };

        animationFrameId.current = requestAnimationFrame(gameLoop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [state.gameOver, state.isPaused, state.dropSpeed]);

    // Keyboard controls
    useEffect(() => {
        if (state.gameOver) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    moveLeft();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moveRight();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    dispatch({ type: 'MOVE_DOWN' });
                    break;
                case 'ArrowUp':
                case ' ':
                    e.preventDefault();
                    rotate();
                    break;
                case 'Shift':
                    e.preventDefault();
                    hardDrop();
                    break;
                case 'c':
                case 'C':
                    e.preventDefault();
                    holdPiece();
                    break;
                case 'p':
                case 'P':
                case 'Escape':
                    e.preventDefault();
                    togglePause();
                    break;
                case 'r':
                case 'R':
                    if (state.gameOver) {
                        e.preventDefault();
                        reset();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.gameOver, moveLeft, moveRight, rotate, hardDrop, holdPiece, togglePause, reset]);

    // Auto-stop shake effect after 500ms
    useEffect(() => {
        if (state.isShaking) {
            const timeout = setTimeout(() => {
                dispatch({ type: 'STOP_SHAKE' });
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [state.isShaking]);

    return {
        state,
        controls: {
            moveLeft,
            moveRight,
            rotate,
            hardDrop,
            holdPiece,
            togglePause,
            reset,
        },
    };
}

// Helper to get ghost piece position (shows where piece will land)
export function getGhostPosition(state: GameState): number {
    if (!state.currentPiece) return state.currentPosition.y;

    let ghostY = state.currentPosition.y;

    // Move down until collision
    while (true) {
        let canMove = true;

        for (let y = 0; y < state.currentPiece.shape.length; y++) {
            for (let x = 0; x < state.currentPiece.shape[y].length; x++) {
                if (state.currentPiece.shape[y][x] !== 0) {
                    const boardX = state.currentPosition.x + x;
                    const boardY = ghostY + y + 1;

                    if (
                        boardY >= state.board.length ||
                        (boardY >= 0 && state.board[boardY][boardX] !== 0)
                    ) {
                        canMove = false;
                        break;
                    }
                }
            }
            if (!canMove) break;
        }

        if (!canMove) break;
        ghostY++;
    }

    return ghostY;
}
