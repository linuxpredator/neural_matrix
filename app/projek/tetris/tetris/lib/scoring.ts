/**
 * NEONTRIS Scoring System
 * Calculates scores based on lines cleared, level, and block rarity
 */

import { BlockRarity, ScoreCalculation } from './types';
import { LINE_CLEAR_SCORES, RARITY_MULTIPLIERS } from '../constants';

/**
 * Calculate score for cleared lines
 * Formula: baseScore * level * rarityMultiplier
 */
export function calculateScore(
    linesCleared: number,
    level: number,
    rarity: BlockRarity
): ScoreCalculation {
    const baseScore = LINE_CLEAR_SCORES[linesCleared] || 0;
    const rarityMultiplier = RARITY_MULTIPLIERS[rarity];
    const totalScore = baseScore * level * rarityMultiplier;

    return {
        baseScore,
        levelMultiplier: level,
        rarityMultiplier,
        totalScore: Math.floor(totalScore),
    };
}

/**
 * Calculate current level based on lines cleared
 * Level increases every 10 lines
 */
export function calculateLevel(totalLines: number): number {
    return Math.floor(totalLines / 10) + 1;
}

/**
 * Calculate drop interval based on level
 * Gets faster each level, never below MIN_DROP_INTERVAL
 */
export function calculateDropInterval(level: number, initialInterval: number, minInterval: number, decreasePerLevel: number): number {
    const interval = initialInterval - (level - 1) * decreasePerLevel;
    return Math.max(minInterval, interval);
}

/**
 * Hard drop score calculation
 * Awards 2 points per cell dropped
 */
export function calculateHardDropBonus(cellsDropped: number): number {
    return cellsDropped * 2;
}

/**
 * Soft drop score calculation
 * Awards 1 point per cell dropped during soft drop
 */
export function calculateSoftDropBonus(cellsDropped: number): number {
    return cellsDropped;
}
