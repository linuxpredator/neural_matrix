'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== TYPES ====================

type TetrominoShape = number[][];
type Board = number[][];

interface Position {
    x: number;
    y: number;
}

// ==================== CONSTANTS ====================

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

const TETROMINOES: { [key: number]: { shape: TetrominoShape; color: string } } = {
    1: {
        shape: [[1, 1, 1, 1]], // I
        color: '#00f0f0',
    },
    2: {
        shape: [
            [2, 0, 0],
            [2, 2, 2],
        ], // J
        color: '#0000f0',
    },
    3: {
        shape: [
            [0, 0, 3],
            [3, 3, 3],
        ], // L
        color: '#f0a000',
    },
    4: {
        shape: [
            [4, 4],
            [4, 4],
        ], // O
        color: '#f0f000',
    },
    5: {
        shape: [
            [0, 5, 5],
            [5, 5, 0],
        ], // S
        color: '#00f000',
    },
    6: {
        shape: [
            [0, 6, 0],
            [6, 6, 6],
        ], // T
        color: '#a000f0',
    },
    7: {
        shape: [
            [7, 7, 0],
            [0, 7, 7],
        ], // Z
        color: '#f00000',
    },
};

// ==================== CUSTOM HOOK ====================

function useTetris() {
    const [board, setBoard] = useState<Board>(() =>
        Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
    );
    const [currentPiece, setCurrentPiece] = useState<TetrominoShape | null>(null);
    const [currentType, setCurrentType] = useState<number>(0);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [clearedRows, setClearedRows] = useState<number[]>([]);

    const gameLoopRef = useRef<number>();

    // Create new piece
    const createNewPiece = useCallback(() => {
        const types = Object.keys(TETROMINOES).map(Number);
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newPiece = TETROMINOES[randomType].shape;
        const startX = Math.floor((BOARD_WIDTH - newPiece[0].length) / 2);

        setCurrentPiece(newPiece);
        setCurrentType(randomType);
        setPosition({ x: startX, y: 0 });

        // Check if game over
        if (!canMove(newPiece, { x: startX, y: 0 }, board)) {
            setGameOver(true);
            return false;
        }
        return true;
    }, [board]);

    // Check if piece can move to position
    const canMove = (piece: TetrominoShape, pos: Position, currentBoard: Board): boolean => {
        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece[y].length; x++) {
                if (piece[y][x] !== 0) {
                    const newX = pos.x + x;
                    const newY = pos.y + y;

                    if (
                        newX < 0 ||
                        newX >= BOARD_WIDTH ||
                        newY >= BOARD_HEIGHT ||
                        (newY >= 0 && currentBoard[newY][newX] !== 0)
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    // Rotate piece
    const rotate = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;

        const rotated = currentPiece[0].map((_, i) =>
            currentPiece.map(row => row[i]).reverse()
        );

        if (canMove(rotated, position, board)) {
            setCurrentPiece(rotated);
        }
    }, [currentPiece, position, board, gameOver, isPaused]);

    // Move piece
    const move = useCallback((dir: 'left' | 'right' | 'down') => {
        if (!currentPiece || gameOver || isPaused) return false;

        const newPos = {
            x: position.x + (dir === 'left' ? -1 : dir === 'right' ? 1 : 0),
            y: position.y + (dir === 'down' ? 1 : 0),
        };

        if (canMove(currentPiece, newPos, board)) {
            setPosition(newPos);
            return true;
        }

        if (dir === 'down') {
            // Lock piece
            lockPiece();
            return false;
        }

        return false;
    }, [currentPiece, position, board, gameOver, isPaused]);

    // Hard drop
    const hardDrop = useCallback(() => {
        if (!currentPiece || gameOver || isPaused) return;

        let dropDistance = 0;
        while (canMove(currentPiece, { x: position.x, y: position.y + dropDistance + 1 }, board)) {
            dropDistance++;
        }

        setPosition(prev => ({ ...prev, y: prev.y + dropDistance }));
        setTimeout(() => lockPiece(), 0);
    }, [currentPiece, position, board, gameOver, isPaused]);

    // Lock piece to board
    const lockPiece = useCallback(() => {
        if (!currentPiece) return;

        const newBoard = board.map(row => [...row]);

        for (let y = 0; y < currentPiece.length; y++) {
            for (let x = 0; x < currentPiece[y].length; x++) {
                if (currentPiece[y][x] !== 0) {
                    const boardY = position.y + y;
                    const boardX = position.x + x;
                    if (boardY >= 0 && boardY < BOARD_HEIGHT) {
                        newBoard[boardY][boardX] = currentType;
                    }
                }
            }
        }

        // Check for lines to clear
        const rowsToClear: number[] = [];
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            if (newBoard[y].every(cell => cell !== 0)) {
                rowsToClear.push(y);
            }
        }

        if (rowsToClear.length > 0) {
            // Has lines to clear - show animation then update board
            setBoard(newBoard);
            setClearedRows(rowsToClear);

            setTimeout(() => {
                // Remove cleared rows and add empty ones at top
                const boardAfterClear = newBoard.filter((_, i) => !rowsToClear.includes(i));
                const clearedLines = rowsToClear.length;
                const emptyRows = Array(clearedLines)
                    .fill(null)
                    .map(() => Array(BOARD_WIDTH).fill(0));

                setBoard([...emptyRows, ...boardAfterClear]);
                setLines(prev => prev + clearedLines);
                setScore(prev => prev + clearedLines * 100 * level);
                setClearedRows([]);

                // Create new piece after clearing is done
                createNewPiece();
            }, 300);
        } else {
            // No lines to clear - just update board and create new piece
            setBoard(newBoard);
            createNewPiece();
        }
    }, [currentPiece, position, board, currentType, level, createNewPiece]);

    // Clear completed lines (no longer used directly, logic moved to lockPiece)
    const clearLines = useCallback((currentBoard: Board) => {
        const rowsToClear: number[] = [];

        for (let y = 0; y < BOARD_HEIGHT; y++) {
            if (currentBoard[y].every(cell => cell !== 0)) {
                rowsToClear.push(y);
            }
        }

        if (rowsToClear.length > 0) {
            setClearedRows(rowsToClear);

            setTimeout(() => {
                const newBoard = currentBoard.filter((_, i) => !rowsToClear.includes(i));
                const clearedLines = rowsToClear.length;
                const emptyRows = Array(clearedLines)
                    .fill(null)
                    .map(() => Array(BOARD_WIDTH).fill(0));

                setBoard([...emptyRows, ...newBoard]);
                setLines(prev => prev + clearedLines);
                setScore(prev => prev + clearedLines * 100 * level);
                setLevel(prev => Math.floor(lines / 10) + 1);
                setClearedRows([]);
            }, 300);
        }
    }, [level, lines]);

    // Get ghost position
    const getGhostPosition = useCallback((): number => {
        if (!currentPiece) return position.y;

        let ghostY = position.y;
        while (canMove(currentPiece, { x: position.x, y: ghostY + 1 }, board)) {
            ghostY++;
        }
        return ghostY;
    }, [currentPiece, position, board]);

    // Game loop
    useEffect(() => {
        if (gameOver || isPaused || !currentPiece) return;

        const speed = Math.max(100, 1000 - (level - 1) * 100);

        gameLoopRef.current = window.setTimeout(() => {
            move('down');
        }, speed);

        return () => {
            if (gameLoopRef.current) {
                clearTimeout(gameLoopRef.current);
            }
        };
    }, [position, gameOver, isPaused, level, move, currentPiece]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    move('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    move('right');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    move('down');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    rotate();
                    break;
                case ' ':
                    e.preventDefault();
                    hardDrop();
                    break;
                case 'p':
                case 'P':
                    e.preventDefault();
                    setIsPaused(prev => !prev);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [move, rotate, hardDrop, gameOver]);

    // Initialize game
    useEffect(() => {
        createNewPiece();
    }, []);

    const resetGame = () => {
        setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
        setScore(0);
        setLevel(1);
        setLines(0);
        setGameOver(false);
        setIsPaused(false);
        createNewPiece();
    };

    return {
        board,
        currentPiece,
        currentType,
        position,
        score,
        level,
        lines,
        gameOver,
        isPaused,
        clearedRows,
        getGhostPosition,
        resetGame,
        togglePause: () => setIsPaused(prev => !prev),
    };
}

// ==================== COMPONENT ====================

export default function TetrisGame() {
    const {
        board,
        currentPiece,
        currentType,
        position,
        score,
        level,
        lines,
        gameOver,
        isPaused,
        clearedRows,
        getGhostPosition,
        resetGame,
        togglePause,
    } = useTetris();

    const ghostY = getGhostPosition();

    const renderCell = (value: number, rowIndex: number, colIndex: number) => {
        const isCurrentPiece =
            currentPiece &&
            rowIndex >= position.y &&
            rowIndex < position.y + currentPiece.length &&
            colIndex >= position.x &&
            colIndex < position.x + currentPiece[0].length &&
            currentPiece[rowIndex - position.y][colIndex - position.x] !== 0;

        const isGhost =
            currentPiece &&
            rowIndex >= ghostY &&
            rowIndex < ghostY + currentPiece.length &&
            colIndex >= position.x &&
            colIndex < position.x + currentPiece[0].length &&
            currentPiece[rowIndex - ghostY][colIndex - position.x] !== 0 &&
            ghostY !== position.y;

        const isClearing = clearedRows.includes(rowIndex);

        const color = isCurrentPiece
            ? TETROMINOES[currentType].color
            : value
                ? TETROMINOES[value].color
                : 'transparent';

        return (
            <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`relative ${BLOCK_SIZE === 30 ? 'w-[30px] h-[30px]' : ''}`}
                animate={isClearing ? { opacity: [1, 0.3, 1, 0.3, 1, 0] } : {}}
                transition={{ duration: 0.3 }}
            >
                {/* Ghost piece */}
                {isGhost && (
                    <div
                        className="absolute inset-0.5 rounded-sm border-2 opacity-30"
                        style={{
                            borderColor: TETROMINOES[currentType].color,
                            backgroundColor: `${TETROMINOES[currentType].color}20`,
                        }}
                    />
                )}

                {/* Actual block */}
                {(isCurrentPiece || value !== 0) && (
                    <motion.div
                        className="absolute inset-0.5 rounded-sm"
                        initial={isCurrentPiece ? { scale: 0.8, opacity: 0 } : {}}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                            boxShadow: `0 0 10px ${color}80, inset 0 1px 0 rgba(255,255,255,0.3)`,
                        }}
                    />
                )}

                {/* Grid line */}
                <div className="absolute inset-0 border border-white/5" />
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black">
                <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                        background: [
                            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                            'radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 flex gap-8 items-start">
                {/* Game board */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl"
                >
                    <div
                        className="grid gap-0 bg-black/30 p-1 rounded-lg relative"
                        style={{
                            gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${BLOCK_SIZE}px)`,
                            gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${BLOCK_SIZE}px)`,
                        }}
                    >
                        {board.map((row, rowIndex) =>
                            row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
                        )}
                    </div>

                    {/* Pause/Game Over overlay */}
                    <AnimatePresence>
                        {(isPaused || gameOver) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center rounded-2xl"
                            >
                                <div className="text-center space-y-4">
                                    <h2 className="text-4xl font-bold text-white">
                                        {gameOver ? 'Game Over!' : 'Paused'}
                                    </h2>
                                    {gameOver && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={resetGame}
                                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow-lg"
                                        >
                                            Play Again
                                        </motion.button>
                                    )}
                                    {!gameOver && (
                                        <p className="text-white/70">Press P to resume</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Stats panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 w-48"
                >
                    {/* Score */}
                    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                        <div className="text-white/60 text-sm mb-1">Score</div>
                        <motion.div
                            key={score}
                            initial={{ scale: 1.2, color: '#fbbf24' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            className="text-3xl font-bold"
                        >
                            {score}
                        </motion.div>
                    </div>

                    {/* Level */}
                    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                        <div className="text-white/60 text-sm mb-1">Level</div>
                        <div className="text-2xl font-bold text-white">{level}</div>
                    </div>

                    {/* Lines */}
                    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                        <div className="text-white/60 text-sm mb-1">Lines</div>
                        <div className="text-2xl font-bold text-white">{lines}</div>
                    </div>

                    {/* Controls */}
                    <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl border border-white/20">
                        <div className="text-white/60 text-sm mb-2">Controls</div>
                        <div className="text-xs text-white/70 space-y-1">
                            <div>← → : Move</div>
                            <div>↑ : Rotate</div>
                            <div>↓ : Soft Drop</div>
                            <div>Space : Hard Drop</div>
                            <div>P : Pause</div>
                        </div>
                    </div>

                    {/* Pause button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePause}
                        disabled={gameOver}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPaused ? 'Resume' : 'Pause'}
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
