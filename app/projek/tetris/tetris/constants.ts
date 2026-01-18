/**
 * NEONTRIS Game Constants
 * Board dimensions, timing, rarity weights, and visual constants
 */

import { BlockRarity, RarityDistribution } from './lib/types';

// Board Configuration
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const BLOCK_SIZE = 30; // pixels per block cell

// Game Timing (ms)
export const INITIAL_DROP_INTERVAL = 1000;
export const MIN_DROP_INTERVAL = 100;
export const SOFT_DROP_MULTIPLIER = 10; // Speed increase during soft drop
export const LOCK_DELAY = 500; // Grace period before locking piece

// Level Progression
export const LINES_PER_LEVEL = 10;
export const DROP_SPEED_DECREASE_PER_LEVEL = 80; // ms faster per level

// Rarity Distribution (must sum to 100)
export const RARITY_WEIGHTS: RarityDistribution = {
    [BlockRarity.COMMON]: 70,
    [BlockRarity.RARE]: 20,
    [BlockRarity.EPIC]: 8,
    [BlockRarity.LEGENDARY]: 2,
};

// Score Multipliers
export const RARITY_MULTIPLIERS: RarityDistribution = {
    [BlockRarity.COMMON]: 1,
    [BlockRarity.RARE]: 1.5,
    [BlockRarity.EPIC]: 3,
    [BlockRarity.LEGENDARY]: 10,
};

// Line Clear Base Scores
export const LINE_CLEAR_SCORES: Record<number, number> = {
    1: 100,
    2: 300,
    3: 500,
    4: 800, // Tetris bonus
};

// Neon Color Palette by Rarity
export const RARITY_COLORS: Record<BlockRarity, string> = {
    [BlockRarity.COMMON]: '#00f5ff', // Cyan
    [BlockRarity.RARE]: '#bd00ff', // Purple
    [BlockRarity.EPIC]: '#ff10f0', // Pink
    [BlockRarity.LEGENDARY]: '#ffffff', // White with intense glow
};

// Visual Effects
export const EPIC_GLOW_INTENSITY = '0 0 20px currentColor, 0 0 40px currentColor';
export const LEGENDARY_GLOW_INTENSITY =
    '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor';

// Keyboard Controls
export const CONTROLS = {
    LEFT: ['ArrowLeft', 'a', 'A'],
    RIGHT: ['ArrowRight', 'd', 'D'],
    SOFT_DROP: ['ArrowDown', 's', 'S'],
    HARD_DROP: [' ', 'ArrowUp', 'w', 'W'], // Space or up
    ROTATE_CW: ['x', 'X', 'l', 'L'], // Clockwise rotation
    ROTATE_CCW: ['z', 'Z', 'k', 'K'], // Counter-clockwise
    HOLD: ['c', 'C', 'Shift'],
    PAUSE: ['p', 'P', 'Escape'],
};
