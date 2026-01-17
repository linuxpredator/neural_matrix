// NEONTRIS - Scoring System
// Advanced scoring with rarity multipliers and combo bonuses

import { BlockRarity, LINES_PER_LEVEL } from './types';
import { RARITY_MULTIPLIERS } from './blocks';

// Base points for line clears
const LINE_CLEAR_BASE_SCORES: Record<number, number> = {
    1: 100,    // Single
    2: 300,    // Double
    3: 500,    // Triple
    4: 800,    // Tetris
    5: 1200,   // Pentris (for larger blocks)
};

export function calculateScore(
    linesCleared: number,
    level: number,
    rarity: BlockRarity
): number {
    const baseScore = LINE_CLEAR_BASE_SCORES[linesCleared] || linesCleared * 100;
    const multiplier = RARITY_MULTIPLIERS[rarity];

    return Math.floor(baseScore * level * multiplier);
}

export function calculateLevel(linesCleared: number): number {
    return Math.floor(linesCleared / LINES_PER_LEVEL) + 1;
}

export function calculateDropSpeed(level: number): number {
    // Speed increases with level, min 100ms
    return Math.max(100, 1000 - (level - 1) * 80);
}

export function getRarityName(rarity: BlockRarity): string {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}
