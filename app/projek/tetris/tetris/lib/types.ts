/**
 * NEONTRIS Core Type Definitions
 * Strict TypeScript types for game state, blocks, and actions
 */

export enum BlockRarity {
    COMMON = 'common',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary',
}

export interface BlockShape {
    id: string;
    name: string;
    shape: number[][]; // 2D matrix: 1 = filled, 0 = empty
    rarity: BlockRarity;
    color: string; // Hex color for neon effect
    multiplier: number;
    rotationCount: number; // Number of unique rotations (1-4)
}

export interface Position {
    x: number;
    y: number;
}

export interface GameState {
    board: number[][]; // 20 rows x 10 columns
    currentPiece: BlockShape | null;
    currentPosition: Position;
    currentRotation: number; // 0-3 for rotation state
    nextPiece: BlockShape;
    holdPiece: BlockShape | null;
    canHold: boolean; // Prevents hold spam
    score: number;
    lines: number;
    level: number;
    gameOver: boolean;
    isPaused: boolean;
    lastClearRarity: BlockRarity | null; // For visual effects
    dropInterval: number; // ms between auto-drops
}

export type GameAction =
    | { type: 'MOVE_LEFT' }
    | { type: 'MOVE_RIGHT' }
    | { type: 'MOVE_DOWN' }
    | { type: 'ROTATE_CW' }
    | { type: 'ROTATE_CCW' }
    | { type: 'HARD_DROP' }
    | { type: 'SOFT_DROP_START' }
    | { type: 'SOFT_DROP_END' }
    | { type: 'HOLD_PIECE' }
    | { type: 'LOCK_PIECE' }
    | { type: 'CLEAR_LINES'; lines: number[]; rarity: BlockRarity }
    | { type: 'SPAWN_PIECE'; piece: BlockShape }
    | { type: 'GAME_OVER' }
    | { type: 'TOGGLE_PAUSE' }
    | { type: 'RESET' };

export interface RarityDistribution {
    [BlockRarity.COMMON]: number;
    [BlockRarity.RARE]: number;
    [BlockRarity.EPIC]: number;
    [BlockRarity.LEGENDARY]: number;
}

export interface ScoreCalculation {
    baseScore: number;
    levelMultiplier: number;
    rarityMultiplier: number;
    totalScore: number;
}
