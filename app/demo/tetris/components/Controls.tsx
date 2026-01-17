// NEONTRIS - Controls Display Component

'use client';

export default function Controls() {
    const controls = [
        { key: '← →', action: 'Move' },
        { key: '↑ / SPACE', action: 'Rotate' },
        { key: '↓', action: 'Soft Drop' },
        { key: 'SHIFT', action: 'Hard Drop' },
        { key: 'C', action: 'Hold' },
        { key: 'P / ESC', action: 'Pause' },
        { key: 'R', action: 'Reset' },
    ];

    return (
        <div className="backdrop-blur-md bg-white/5 p-4 rounded-xl border border-neon-cyan/20">
            <div className="text-neon-cyan/60 text-xs mb-3 font-mono">CONTROLS</div>
            <div className="space-y-2">
                {controls.map(({ key, action }) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-white/80 font-mono">{action}</span>
                        <span className="text-neon-cyan font-mono px-2 py-1 bg-black/30 rounded border border-neon-cyan/30">
                            {key}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
