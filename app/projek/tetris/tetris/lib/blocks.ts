/**
 * NEONTRIS Custom Block System
 * 12+ unique block designs with rarity-based distribution
 */

import { BlockShape, BlockRarity } from './types';
import { RARITY_COLORS, RARITY_MULTIPLIERS, RARITY_WEIGHTS } from '../constants';

/**
 * All custom block definitions
 * Shape matrix: 1 = filled, 0 = empty
 */
export const BLOCK_DEFINITIONS: BlockShape[] = [
    // COMMON BLOCKS (70% spawn rate)
    {
        id: 'I_BEAM',
        name: 'I-Beam',
        shape: [[1, 1, 1, 1]],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 2,
    },
    {
        id: 'O_CUBE',
        name: 'O-Cube',
        shape: [
            [1, 1],
            [1, 1],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 1,
    },
    {
        id: 'T_CROSS',
        name: 'T-Cross',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 4,
    },
    {
        id: 'L_HOOK',
        name: 'L-Hook',
        shape: [
            [1, 0],
            [1, 0],
            [1, 1],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 4,
    },
    {
        id: 'J_CURVE',
        name: 'J-Curve',
        shape: [
            [0, 1],
            [0, 1],
            [1, 1],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 4,
    },
    {
        id: 'S_STEP',
        name: 'S-Step',
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 2,
    },
    {
        id: 'Z_STEP',
        name: 'Z-Step',
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
        rarity: BlockRarity.COMMON,
        color: RARITY_COLORS[BlockRarity.COMMON],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.COMMON],
        rotationCount: 2,
    },

    // RARE BLOCKS (20% spawn rate)
    {
        id: 'PLUS',
        name: 'Plus',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        rarity: BlockRarity.RARE,
        color: RARITY_COLORS[BlockRarity.RARE],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.RARE],
        rotationCount: 1,
    },
    {
        id: 'BIG_L',
        name: 'Big-L',
        shape: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
        ],
        rarity: BlockRarity.RARE,
        color: RARITY_COLORS[BlockRarity.RARE],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.RARE],
        rotationCount: 4,
    },

    // EPIC BLOCKS (8% spawn rate)
    {
        id: 'CROSS',
        name: 'Cross',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        rarity: BlockRarity.EPIC,
        color: RARITY_COLORS[BlockRarity.EPIC],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.EPIC],
        rotationCount: 1,
    },
    {
        id: 'T_REX',
        name: 'T-Rex',
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 1],
        ],
        rarity: BlockRarity.EPIC,
        color: RARITY_COLORS[BlockRarity.EPIC],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.EPIC],
        rotationCount: 4,
    },

    // LEGENDARY BLOCKS (2% spawn rate)
    {
        id: 'DOT',
        name: 'Dot',
        shape: [[1]],
        rarity: BlockRarity.LEGENDARY,
        color: RARITY_COLORS[BlockRarity.LEGENDARY],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.LEGENDARY],
        rotationCount: 1,
    },
    {
        id: 'PENTOMINO',
        name: 'Pentomino',
        shape: [
            [1, 1, 1],
            [1, 0, 0],
            [1, 0, 0],
        ],
        rarity: BlockRarity.LEGENDARY,
        color: RARITY_COLORS[BlockRarity.LEGENDARY],
        multiplier: RARITY_MULTIPLIERS[BlockRarity.LEGENDARY],
        rotationCount: 4,
    },
];

/**
 * Get all blocks filtered by rarity
 */
export function getBlocksByRarity(rarity: BlockRarity): BlockShape[] {
    return BLOCK_DEFINITIONS.filter((block) => block.rarity === rarity);
}

/**
 * Weighted random block selection based on rarity distribution
 * Returns a random block following the 70/20/8/2 distribution
 */
export function getRandomBlock(): BlockShape {
    const random = Math.random() * 100;
    let cumulativeWeight = 0;

    // Determine rarity based on cumulative probability
    let selectedRarity: BlockRarity;
    if (random < (cumulativeWeight += RARITY_WEIGHTS[BlockRarity.COMMON])) {
        selectedRarity = BlockRarity.COMMON;
    } else if (random < (cumulativeWeight += RARITY_WEIGHTS[BlockRarity.RARE])) {
        selectedRarity = BlockRarity.RARE;
    } else if (random < (cumulativeWeight += RARITY_WEIGHTS[BlockRarity.EPIC])) {
        selectedRarity = BlockRarity.EPIC;
    } else {
        selectedRarity = BlockRarity.LEGENDARY;
    }

    // Get all blocks of selected rarity
    const blocksOfRarity = getBlocksByRarity(selectedRarity);

    // Return random block from the rarity pool
    return blocksOfRarity[Math.floor(Math.random() * blocksOfRarity.length)];
}

/**
 * Rotate block shape 90 degrees clockwise
 */
export function rotateBlock(shape: number[][]): number[][] {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated: number[][] = [];

    for (let col = 0; col < cols; col++) {
        const newRow: number[] = [];
        for (let row = rows - 1; row >= 0; row--) {
            newRow.push(shape[row][col]);
        }
        rotated.push(newRow);
    }

    return rotated;
}

/**
 * Get rotated shape based on rotation index (0-3)
 */
export function getRotatedShape(block: BlockShape, rotation: number): number[][] {
    let shape = block.shape;
    const actualRotations = rotation % block.rotationCount;

    for (let i = 0; i < actualRotations; i++) {
        shape = rotateBlock(shape);
    }

    return shape;
}
