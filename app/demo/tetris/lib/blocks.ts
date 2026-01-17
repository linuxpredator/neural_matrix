// NEONTRIS - Custom Block Definitions
// 12+ unique shapes with rarity-based weighted selection

import { Block, BlockRarity } from './types';

// Neon color palette based on rarity
const RARITY_COLORS = {
    [BlockRarity.COMMON]: '#00f5ff',    // Cyan
    [BlockRarity.RARE]: '#bd00ff',      // Purple
    [BlockRarity.EPIC]: '#ff10f0',      // Pink
    [BlockRarity.LEGENDARY]: '#ffffff', // White
};

const RARITY_MULTIPLIERS = {
    [BlockRarity.COMMON]: 1,
    [BlockRarity.RARE]: 1.5,
    [BlockRarity.EPIC]: 3,
    [BlockRarity.LEGENDARY]: 10,
};

const RARITY_GLOW = {
    [BlockRarity.COMMON]: 1,
    [BlockRarity.RARE]: 1.5,
    [BlockRarity.EPIC]: 2,
    [BlockRarity.LEGENDARY]: 3,
};

// 12+ Custom Block Shapes (represented as 1 = filled cell)
const BLOCK_SHAPES: Record<string, number[][]> = {
    // 1. I-Beam (4x1)
    I_BEAM: [
        [1, 1, 1, 1]
    ],

    // 2. L-Hook (3x2)
    L_HOOK: [
        [1, 0, 0],
        [1, 1, 1]
    ],

    // 3. J-Curve (3x2)
    J_CURVE: [
        [0, 0, 1],
        [1, 1, 1]
    ],

    // 4. Z-Step (3x2)
    Z_STEP: [
        [1, 1, 0],
        [0, 1, 1]
    ],

    // 5. S-Step (3x2)
    S_STEP: [
        [0, 1, 1],
        [1, 1, 0]
    ],

    // 6. T-Cross (3x2)
    T_CROSS: [
        [0, 1, 0],
        [1, 1, 1]
    ],

    // 7. O-Cube (2x2)
    O_CUBE: [
        [1, 1],
        [1, 1]
    ],

    // 8. Cross (3x3)
    CROSS: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],

    // 9. Plus (3x3)
    PLUS: [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]
    ],

    // 10. Dot (1x1 - rare spawn)
    DOT: [
        [1]
    ],

    // 11. Big-L (4x2)
    BIG_L: [
        [1, 0, 0, 0],
        [1, 1, 1, 1]
    ],

    // 12. T-Rex (4x3 asymmetric)
    T_REX: [
        [0, 1, 1, 0],
        [1, 1, 1, 1],
        [0, 1, 0, 0]
    ],

    // 13. Snake (5x1 - legendary rare)
    SNAKE: [
        [1, 1, 1, 1, 1]
    ],

    // 14. W-Shape (3x3)
    W_SHAPE: [
        [1, 0, 1],
        [1, 1, 1],
        [0, 1, 0]
    ],
};

const BLOCK_IDS = Object.keys(BLOCK_SHAPES);

// Weighted rarity distribution: 70% Common, 20% Rare, 8% Epic, 2% Legendary
function getRandomRarity(): BlockRarity {
    const rand = Math.random() * 100;

    if (rand < 70) return BlockRarity.COMMON;
    if (rand < 90) return BlockRarity.RARE;
    if (rand < 98) return BlockRarity.EPIC;
    return BlockRarity.LEGENDARY;
}

// Get random block with weighted rarity
export function getRandomBlock(): Block {
    const rarity = getRandomRarity();
    const randomId = BLOCK_IDS[Math.floor(Math.random() * BLOCK_IDS.length)];

    return {
        id: randomId,
        shape: BLOCK_SHAPES[randomId],
        rarity,
        color: RARITY_COLORS[rarity],
        multiplier: RARITY_MULTIPLIERS[rarity],
        glowIntensity: RARITY_GLOW[rarity],
    };
}

// Create a specific block (for testing)
export function createBlock(id: string, rarity: BlockRarity = BlockRarity.COMMON): Block {
    if (!BLOCK_SHAPES[id]) {
        throw new Error(`Block ID "${id}" does not exist`);
    }

    return {
        id,
        shape: BLOCK_SHAPES[id],
        rarity,
        color: RARITY_COLORS[rarity],
        multiplier: RARITY_MULTIPLIERS[rarity],
        glowIntensity: RARITY_GLOW[rarity],
    };
}

// Rotate block shape 90 degrees clockwise
export function rotateBlock(shape: number[][]): number[][] {
    const rows = shape.length;
    const cols = shape[0].length;
    const rotated: number[][] = [];

    for (let i = 0; i < cols; i++) {
        rotated[i] = [];
        for (let j = 0; j < rows; j++) {
            rotated[i][j] = shape[rows - 1 - j][i];
        }
    }

    return rotated;
}

export { RARITY_COLORS, RARITY_MULTIPLIERS };
