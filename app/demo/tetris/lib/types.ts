// NEONTRIS - TypeScript Type Definitions
// Strict typing for the entire game

export enum BlockRarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
}

export interface Block {
    id: string;
    shape: number[][];
    rarity: BlockRarity;
    color: string;
    multiplier: number;
    glowIntensity: number;
}

export interface Position {
    x: number;
    y: number;
}

export interface GameState {
    board: number[][];
    currentPiece: Block | null;
    currentPosition: Position;
    nextPiece: Block;
    holdPiece: Block | null;
    canHold: boolean;
    score: number;
    lines: number;
    level: number;
    gameOver: boolean;
    isPaused: boolean;
    isShaking: boolean;
    lastClearRarity: BlockRarity | null;
    dropSpeed: number;
}

export type GameAction =
    | { type: 'MOVE_LEFT' }
    | { type: 'MOVE_RIGHT' }
    | { type: 'MOVE_DOWN' }
    | { type: 'ROTATE' }
    | { type: 'HARD_DROP' }
    | { type: 'SOFT_DROP_START' }
    | { type: 'SOFT_DROP_STOP' }
    | { type: 'HOLD_PIECE' }
    | { type: 'LOCK_PIECE' }
    | { type: 'CLEAR_LINES'; linesCleared: number }
    | { type: 'GAME_OVER' }
    | { type: 'RESET' }
    | { type: 'TOGGLE_PAUSE' }
    | { type: 'SET_NEXT_PIECE'; piece: Block }
    | { type: 'TRIGGER_SHAKE' }
    | { type: 'STOP_SHAKE' };

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_DROP_SPEED = 1000; // ms
export const LINES_PER_LEVEL = 10;
