"use client";

import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Upload, Cpu, TrendingUp, Activity, BarChart3, Settings, Shield, Globe, ArrowLeft, Terminal } from 'lucide-react';
import Link from 'next/link';
import MatrixRain from '@/components/MatrixRain';

// Mock data for equity curve
const equityData = Array.from({ length: 50 }, (_, i) => ({
    time: i,
    equity: 10000 + (Math.sin(i / 5) * 500) + (i * 200) + (Math.random() * 200)
}));

export default function MQL5CloudDashboard() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);

    const startSimulation = () => {
        setIsSimulating(true);
        setProgress(0);
        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsSimulating(false);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);
    };

    return (
        <div className="min-h-screen bg-black text-matrix-green font-mono p-6 selection:bg-matrix-green selection:text-black relative overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <MatrixRain />
            </div>
            <div className="fixed inset-0 z-50 pointer-events-none scanline-effect opacity-30"></div>
            <div className="fixed inset-0 z-40 pointer-events-none crt-overlay opacity-20"></div>

            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-matrix-green hover:text-white transition-colors text-sm font-mono z-50">
                <ArrowLeft size={16} /> Back to System
            </Link>

            <div className="max-w-7xl mx-auto space-y-6 pt-12 relative z-10">

                {/* HEADER: User Context & Credits */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-matrix-green/30 pb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-matrix-green bg-matrix-green/10 rounded flex items-center justify-center font-bold text-matrix-green hover:bg-matrix-green hover:text-black transition-colors">
                            M5
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-terminal">
                                MQL5_CLOUD_BACKTESTER
                                <span className="bg-blue-900/20 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/30 uppercase font-mono">ENTERPRISE_NODE</span>
                            </h1>
                            <p className="text-xs md:text-sm text-matrix-green/60 flex items-center gap-2 font-mono">
                                <span className="w-2 h-2 rounded-full bg-matrix-green animate-pulse"></span>
                                CONNECTED TO CLUSTER [SG-01] • LATENCY: 12ms
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase text-matrix-green/60 font-mono">CLOUD_CREDITS</span>
                            <span className="text-xl font-mono font-bold text-white">1,450.00</span>
                        </div>
                        <button className="bg-matrix-green text-black text-xs font-bold px-4 py-2 hover:bg-white transition-colors uppercase font-mono border border-transparent hover:border-matrix-green">
                            [TOP_UP]
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* COLUMN 1: CONFIGURATION (Left Sidebar) */}
                    <section className="lg:col-span-4 space-y-6">

                        {/* FILE UPLOAD CARD */}
                        <div className="bg-black/40 backdrop-blur-sm p-6 border border-matrix-green/30 shadow-[0_0_15px_rgba(0,255,65,0.05)] relative overflow-hidden group hover:border-matrix-green/60 transition-colors">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-matrix-green/50"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-matrix-green/50"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-matrix-green/50"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-matrix-green/50"></div>

                            <h3 className="text-sm font-bold uppercase text-matrix-green/80 mb-4 flex items-center gap-2 font-mono">
                                <Upload size={14} /> EXPERT_ADVISOR_SOURCE
                            </h3>

                            <div className="group/drop border-2 border-dashed border-matrix-green/20 hover:border-matrix-green hover:bg-matrix-green/5 transition-all p-8 text-center cursor-pointer">
                                <Cpu className="mx-auto text-matrix-green/50 group-hover/drop:text-matrix-green transition-colors mb-3 animate-pulse" size={32} />
                                <p className="text-sm text-matrix-green font-medium group-hover/drop:text-white font-mono">UPLOAD .EX5 / .MQ5</p>
                                <p className="text-[10px] text-matrix-green/40 mt-1 font-mono">COMPATIBILITY: v5.3+</p>
                            </div>
                        </div>

                        {/* SETTINGS CARD */}
                        <div className="bg-black/40 backdrop-blur-sm p-6 border border-matrix-green/30 shadow-[0_0_15px_rgba(0,255,65,0.05)] space-y-4 hover:border-matrix-green/60 transition-colors">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase text-matrix-green/80 flex items-center gap-2 font-mono">
                                    <Settings size={14} /> SIMULATION_CONFIG
                                </h3>
                                <div className="text-[10px] bg-matrix-green/10 text-matrix-green px-2 py-0.5 border border-matrix-green/30 font-mono">99.9% MODELING</div>
                            </div>

                            <div className="space-y-3 font-mono">
                                <div>
                                    <label className="text-[10px] text-matrix-green/60 font-bold uppercase mb-1 block">TARGET_ASSET</label>
                                    <select className="w-full bg-black border border-matrix-green/30 p-2.5 text-xs text-white focus:border-matrix-green focus:outline-none transition-colors appearance-none">
                                        <option>XAUUSD (GOLD) - PRO</option>
                                        <option>EURUSD (EURO)</option>
                                        <option>GBPUSD (Great Britain Pound)</option>
                                        <option>BTCUSD (BITCOIN)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-matrix-green/60 font-bold uppercase mb-1 block">TIMEFRAME</label>
                                        <select className="w-full bg-black border border-matrix-green/30 p-2.5 text-xs text-white appearance-none focus:border-matrix-green focus:outline-none">
                                            <option>H1 (1 HOUR)</option>
                                            <option>M15 (15 MIN)</option>
                                            <option>D1 (DAILY)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-matrix-green/60 font-bold uppercase mb-1 block">SPREAD_COST</label>
                                        <select className="w-full bg-black border border-matrix-green/30 p-2.5 text-xs text-white appearance-none focus:border-matrix-green focus:outline-none">
                                            <option>CURRENT</option>
                                            <option>10 POINTS</option>
                                            <option>20 POINTS</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] text-matrix-green/60 font-bold uppercase mb-1 block">DATE_RANGE</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="date" className="bg-black border border-matrix-green/30 p-2 text-xs text-matrix-green uppercase" />
                                        <input type="date" className="bg-black border border-matrix-green/30 p-2 text-xs text-matrix-green uppercase" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={startSimulation}
                                    disabled={isSimulating}
                                    className="w-full relative overflow-hidden bg-matrix-green/10 border border-matrix-green hover:bg-matrix-green hover:text-black text-matrix-green font-bold py-3.5 transition-all shadow-[0_0_20px_rgba(0,255,65,0.1)] disabled:opacity-50 disabled:cursor-not-allowed group uppercase font-mono tracking-wider"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSimulating ? <Activity className="animate-spin" size={16} /> : <Terminal size={16} />}
                                        {isSimulating ? "PROCESSING_MATRIX..." : "EXECUTE_BACKTEST"}
                                    </span>

                                    {/* Progress Bar background */}
                                    {isSimulating && (
                                        <div
                                            className="absolute inset-0 bg-matrix-green/30 transition-all duration-300 ease-linear"
                                            style={{ width: `${progress}%` }}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* COLUMN 2: VISUALIZATION (Main Content) */}
                    <section className="lg:col-span-8 space-y-6">

                        {/* Chart Area */}
                        <div className="bg-black/60 border border-matrix-green/30 p-6 h-[450px] relative overflow-hidden shadow-2xl group transition-colors hover:border-matrix-green/50">
                            {/* Detailed Grid Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2 font-terminal tracking-wider">
                                        EQUITY_CURVE_VISUALIZER
                                        <span className="text-[10px] text-matrix-green bg-matrix-green/10 border border-matrix-green/30 py-0.5 px-2 font-mono animate-pulse">LIVE_STREAM</span>
                                    </h3>
                                    <p className="text-[10px] text-matrix-green/50 font-mono mt-1">NETWORK_NODES: 48 THREADS ACTIVE</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 border border-matrix-green/20 hover:bg-matrix-green/10 rounded-none text-matrix-green transition-colors"><BarChart3 size={16} /></button>
                                    <button className="p-2 border border-matrix-green/20 hover:bg-matrix-green/10 rounded-none text-matrix-green transition-colors"><Settings size={16} /></button>
                                </div>
                            </div>

                            {/* Chart Placeholder / Implementation */}
                            <div className="h-[340px] w-full relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={equityData}>
                                        <defs>
                                            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00FF41" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#00FF41" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#00FF4120" vertical={false} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide domain={['auto', 'auto']} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #00FF41', color: '#00FF41', fontFamily: 'monospace' }}
                                            itemStyle={{ color: '#00FF41' }}
                                            labelStyle={{ color: '#fff' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="equity"
                                            stroke="#00FF41"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorEquity)"
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Performance KPIs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'NET_PROFIT', value: '$12,450.00', color: 'text-green-500', sub: '+12.5%' },
                                { label: 'PROFIT_FACTOR', value: '1.85', color: 'text-blue-400', sub: 'ROBUST' },
                                { label: 'MAX_DRAWDOWN', value: '4.2%', color: 'text-red-500', sub: 'LOW_RISK' },
                                { label: 'SHARPE_RATIO', value: '2.45', color: 'text-purple-400', sub: 'OPTIMAL' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-black/40 border border-matrix-green/20 p-5 hover:border-matrix-green/60 transition-colors cursor-default backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-matrix-green/30 group-hover:border-matrix-green transition-colors"></div>
                                    <div className="text-[10px] text-matrix-green/60 uppercase font-bold tracking-wider mb-1 font-mono">{stat.label}</div>
                                    <div className={`text-2xl font-bold ${stat.color} font-terminal mb-1`}>{stat.value}</div>
                                    <div className="text-[10px] text-gray-400 font-mono group-hover:text-white transition-colors">{stat.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* Monetization Banner */}
                        <div className="bg-gradient-to-r from-blue-900/10 via-transparent to-transparent border border-blue-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 bg-blue-500/10">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="text-blue-400 font-bold font-terminal tracking-wide uppercase">Monetize Strategy</h4>
                                    <p className="text-sm text-slate-400 max-w-md font-mono text-xs">LIST APPROVED SIGNALS ON MQL5 MARKETPLACE. AVG. YIELD: $450/MO.</p>
                                </div>
                            </div>
                            <button className="whitespace-nowrap bg-blue-600/20 border border-blue-500 text-blue-400 px-6 py-2.5 text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center gap-2 uppercase font-mono relative z-10">
                                [START_SELLING] <TrendingUp size={14} />
                            </button>
                        </div>

                    </section>
                </div>

            </div>
        </div>
    );
}
