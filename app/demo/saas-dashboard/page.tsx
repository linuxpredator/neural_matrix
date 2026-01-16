"use client";

import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Upload, Cpu, TrendingUp, Activity, BarChart3, Settings, Shield, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
        <div className="min-h-screen bg-[#050505] text-slate-200 font-sans p-6 selection:bg-blue-500/30 font-sans relative">
            <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-matrix-green hover:text-white transition-colors text-sm font-mono z-50">
                <ArrowLeft size={16} /> Back to System
            </Link>

            <div className="max-w-7xl mx-auto space-y-6 pt-12">

                {/* HEADER: User Context & Credits */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white hover:bg-blue-500 transition-colors">
                            M5
                        </Link>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                                MQL5_CLOUD_BACKTESTER
                                <span className="bg-blue-900/40 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/30 uppercase">Enterprise</span>
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Connected to High-Performance Cluster [SG-01] • Latency: 12ms
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase text-slate-500">Cloud Credits</span>
                            <span className="text-xl font-mono font-bold text-white">1,450.00</span>
                        </div>
                        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                            TOP UP
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* COLUMN 1: CONFIGURATION (Left Sidebar) */}
                    <section className="lg:col-span-4 space-y-6">

                        {/* FILE UPLOAD CARD */}
                        <div className="bg-[#0f0f10] p-6 border border-white/5 rounded-2xl shadow-xl">
                            <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                                <Upload size={14} /> Expert Advisor Source
                            </h3>

                            <div className="group border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-xl p-8 text-center cursor-pointer">
                                <Cpu className="mx-auto text-slate-600 group-hover:text-blue-400 transition-colors mb-3" size={32} />
                                <p className="text-sm text-slate-300 font-medium group-hover:text-white">Click or Drop .EX5 / .MQ5</p>
                                <p className="text-xs text-slate-600 mt-1">Supports MQL5 language v5.3+</p>
                            </div>
                        </div>

                        {/* SETTINGS CARD */}
                        <div className="bg-[#0f0f10] p-6 border border-white/5 rounded-2xl shadow-xl space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase text-slate-400 flex items-center gap-2">
                                    <Settings size={14} /> Simulation Config
                                </h3>
                                <div className="text-[10px] bg-green-900/20 text-green-400 px-2 py-0.5 rounded border border-green-500/20">99.9% MODELING</div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Symbol</label>
                                    <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm text-slate-300 focus:border-blue-500 focus:outline-none transition-colors">
                                        <option>XAUUSD (Gold) - Pro</option>
                                        <option>EURUSD (Euro)</option>
                                        <option>GBPUSD (Great Britain Pound)</option>
                                        <option>BTCUSD (Bitcoin)</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Period</label>
                                        <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm text-slate-300">
                                            <option>H1 (1 Hour)</option>
                                            <option>M15 (15 Min)</option>
                                            <option>D1 (Daily)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Spread</label>
                                        <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm text-slate-300">
                                            <option>Current</option>
                                            <option>10 Points</option>
                                            <option>20 Points</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-slate-500 font-semibold uppercase mb-1 block">Dates</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="date" className="bg-black border border-white/10 rounded-lg p-2 text-xs text-slate-400" />
                                        <input type="date" className="bg-black border border-white/10 rounded-lg p-2 text-xs text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={startSimulation}
                                    disabled={isSimulating}
                                    className="w-full relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSimulating ? <Activity className="animate-spin" size={16} /> : <TrendingUp size={16} />}
                                        {isSimulating ? "OPTIMIZING MATRIX..." : "RUN CLOUD BACKTEST"}
                                    </span>

                                    {/* Progress Bar background */}
                                    {isSimulating && (
                                        <div
                                            className="absolute inset-0 bg-blue-800 transition-all duration-300 ease-linear"
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
                        <div className="bg-[#0f0f10] border border-white/5 p-6 rounded-2xl h-[450px] relative overflow-hidden shadow-2xl group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        Equity Curve
                                        <span className="text-[10px] text-slate-500 bg-white/5 py-0.5 px-2 rounded-full font-mono">LIVE_STREAM</span>
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono">MQL5 Cloud Network • 48 Threads</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><BarChart3 size={16} /></button>
                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Settings size={16} /></button>
                                </div>
                            </div>

                            {/* Chart Placeholder / Implementation */}
                            <div className="h-[340px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={equityData}>
                                        <defs>
                                            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                        <XAxis dataKey="time" hide />
                                        <YAxis hide domain={['auto', 'auto']} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="equity"
                                            stroke="#3b82f6"
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
                                { label: 'Total Net Profit', value: '$12,450.00', color: 'text-green-400', sub: '+12.5%' },
                                { label: 'Profit Factor', value: '1.85', color: 'text-blue-400', sub: 'Robust' },
                                { label: 'Max Drawdown', value: '4.2%', color: 'text-red-400', sub: 'Low Risk' },
                                { label: 'Sharpe Ratio', value: '2.45', color: 'text-purple-400', sub: 'High Quality' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-[#0f0f10] border border-white/5 p-5 rounded-xl hover:border-white/10 transition-colors cursor-default">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">{stat.label}</div>
                                    <div className={`text-2xl font-bold ${stat.color} font-mono mb-1`}>{stat.value}</div>
                                    <div className="text-[10px] text-slate-600 font-mono">{stat.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* Monetization Banner */}
                        <div className="bg-gradient-to-r from-blue-900/20 via-blue-900/10 to-transparent border border-blue-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                                    <Globe size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Monetize Your Strategy</h4>
                                    <p className="text-sm text-slate-400 max-w-md">Approved backtests can be listed on the MQL5 Signal Marketplace. Average creators earn $450/mo per signal.</p>
                                </div>
                            </div>
                            <button className="whitespace-nowrap bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2">
                                Start Selling <TrendingUp size={14} />
                            </button>
                        </div>

                    </section>
                </div>

            </div>
        </div>
    );
}
