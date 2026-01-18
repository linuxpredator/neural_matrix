'use client';

/**
 * ScorePanel Component
 * Displays score, level, and lines with glassmorphism design
 */

import { BlockRarity } from '../lib/types';

interface ScorePanelProps {
    score: number;
    level: number;
    lines: number;
    lastClearRarity: BlockRarity | null;
}

export default function ScorePanel({ score, level, lines, lastClearRarity }: ScorePanelProps) {
    return (
        <div className="space-y-4">
            {/* Score Display */}
            <div className="bg-neon-void/50 backdrop-blur-md border-2 border-neon-cyan rounded-lg p-4 shadow-[0_0_30px_rgba(0,245,255,0.3)]">
                <div className="text-xs text-neon-cyan/70 uppercase tracking-wider mb-1 font-mono">Score</div>
                <div className="text-3xl font-bold text-white font-mono tabular-nums">{score.toLocaleString()}</div>
            </div>

            {/* Level Display */}
            <div className="bg-neon-void/50 backdrop-blur-md border-2 border-neon-purple rounded-lg p-4 shadow-[0_0_30px_rgba(189,0,255,0.3)]">
                <div className="text-xs text-neon-purple/70 uppercase tracking-wider mb-1 font-mono">Level</div>
                <div className="text-3xl font-bold text-white font-mono tabular-nums">{level}</div>
            </div>

            {/* Lines Display */}
            <div className="bg-neon-void/50 backdrop-blur-md border-2 border-neon-pink rounded-lg p-4 shadow-[0_0_30px_rgba(255,16,240,0.3)]">
                <div className="text-xs text-neon-pink/70 uppercase tracking-wider mb-1 font-mono">Lines</div>
                <div className="text-3xl font-bold text-white font-mono tabular-nums">{lines}</div>
                <div className="text-xs text-white/50 mt-2 font-mono">
                    Next Level: {Math.ceil(lines / 10) * 10}
                </div>
            </div>

            {/* Last Clear Rarity Badge */}
            {lastClearRarity && (
                <div className="bg-neon-void/50 backdrop-blur-md border-2 border-white/30 rounded-lg p-3">
                    <div className="text-xs text-white/70 uppercase tracking-wider mb-1 font-mono">Last Clear</div>
                    <div
                        className={`text-lg font-bold uppercase tracking-wide font-mono ${lastClearRarity === 'legendary'
                                ? 'text-white animate-neon-pulse'
                                : lastClearRarity === 'epic'
                                    ? 'text-neon-pink'
                                    : lastClearRarity === 'rare'
                                        ? 'text-neon-purple'
                                        : 'text-neon-cyan'
                            }`}
                    >
                        {lastClearRarity}
                    </div>
                </div>
            )}
        </div>
    );
}
