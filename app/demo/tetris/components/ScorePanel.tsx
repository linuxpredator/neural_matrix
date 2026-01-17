// NEONTRIS - Score Panel Component
// Displays score, level, lines with glassmorphism styling

'use client';

import { GameState } from '../lib/types';
import { getRarityName } from '../lib/scoring';

interface ScorePanelProps {
    state: GameState;
}

export default function ScorePanel({ state }: ScorePanelProps) {
    return (
        <div className="space-y-4">
            {/* Score */}
            <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                <div className="text-neon-cyan/60 text-sm mb-1 font-mono">SCORE</div>
                <div className="text-4xl font-bold text-neon-cyan font-mono">
                    {state.score.toLocaleString()}
                </div>
            </div>

            {/* Level */}
            <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-purple/30 shadow-[0_0_20px_rgba(189,0,255,0.2)]">
                <div className="text-neon-purple/60 text-sm mb-1 font-mono">LEVEL</div>
                <div className="text-3xl font-bold text-neon-purple font-mono">
                    {state.level}
                </div>
            </div>

            {/* Lines */}
            <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-pink/30 shadow-[0_0_20px_rgba(255,16,240,0.2)]">
                <div className="text-neon-pink/60 text-sm mb-1 font-mono">LINES</div>
                <div className="text-3xl font-bold text-neon-pink font-mono">
                    {state.lines}
                </div>
            </div>

            {/* Last Clear Rarity Bonus */}
            {state.lastClearRarity && (
                <div className="backdrop-blur-md bg-white/5 p-3 rounded-xl border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">
                    <div className="text-white/60 text-xs mb-1 font-mono">BONUS</div>
                    <div className="text-sm font-bold text-white font-mono">
                        {getRarityName(state.lastClearRarity)}!
                    </div>
                </div>
            )}
        </div>
    );
}
