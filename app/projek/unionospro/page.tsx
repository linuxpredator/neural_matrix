"use client";

import Link from 'next/link';
import { ArrowLeft, Download, Terminal, Code, Database, Shield, Zap } from 'lucide-react';

export default function UnionOSProPage() {
    return (
        <div className="min-h-screen bg-matrix-black text-matrix-green font-mono p-8 md:p-12 relative overflow-hidden">
            {/* Back Button */}
            <Link
                href="/"
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-matrix-green/60 hover:text-matrix-green transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to System</span>
            </Link>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header with Glitch Effect */}
                <header className="mb-12 border-b border-matrix-green/30 pb-8">
                    <div className="mb-2">
                        <Terminal className="inline-block mr-2 text-matrix-green" size={20} />
                        <span className="text-xs text-matrix-green/60 uppercase tracking-widest">SYSTEM PROTOCOL v2.0.1</span>
                    </div>
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-4 glitch-text"
                        data-text="UNION_OS_PRO"
                    >
                        UNION_OS_PRO
                    </h1>
                    <div className="text-lg md:text-xl text-matrix-green/80 font-mono">
                        &gt; Initializing kernel...
                        <span className="animate-cursor"></span>
                    </div>
                </header>

                {/* System Release Log */}
                <section className="bg-matrix-black border-2 border-matrix-green/30 p-0 mb-8">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-matrix-green"></div>

                    {/* Section Header */}
                    <div className="bg-matrix-green/10 border-b border-matrix-green/30 px-6 py-3">
                        <h2 className="text-sm font-bold uppercase tracking-wider">
                            [SYSTEM_RELEASE_LOG.dat]
                        </h2>
                    </div>

                    {/* Release Details */}
                    <div className="p-6 space-y-4 text-sm">
                        {/* Version Info */}
                        <div className="space-y-2">
                            <div className="flex gap-4">
                                <span className="text-matrix-green/60 w-32">VERSION:</span>
                                <span className="text-matrix-green font-bold">2.0.1-stable</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-matrix-green/60 w-32">BUILD:</span>
                                <span className="text-matrix-green">20260118-1200</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-matrix-green/60 w-32">CODENAME:</span>
                                <span className="text-matrix-green">"NEURAL_NEXUS"</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-matrix-green/60 w-32">TARGET:</span>
                                <span className="text-matrix-green">UNIVERSITI TUN HUSSEIN ONN MALAYSIA</span>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="border-t border-matrix-green/20 pt-4 mt-4">
                            <div className="text-matrix-green/80 font-bold mb-3 uppercase text-xs tracking-wider">
                                [CORE_MODULES_INITIALIZED]
                            </div>
                            <div className="space-y-2 pl-4">
                                <div className="flex items-start gap-3">
                                    <Database size={16} className="mt-0.5 text-matrix-green flex-shrink-0" />
                                    <div>
                                        <div className="text-matrix-green font-semibold">DATABASE_AHLI</div>
                                        <div className="text-matrix-green/60 text-xs">646 active members | Real-time sync protocol</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Code size={16} className="mt-0.5 text-matrix-green flex-shrink-0" />
                                    <div>
                                        <div className="text-matrix-green font-semibold">YURAN_TRACKER</div>
                                        <div className="text-matrix-green/60 text-xs">Automated fee collection & monitoring system</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Shield size={16} className="mt-0.5 text-matrix-green flex-shrink-0" />
                                    <div>
                                        <div className="text-matrix-green font-semibold">BORANG_9_12_COMPLIANCE</div>
                                        <div className="text-matrix-green/60 text-xs">Statutory form generation & validation</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Zap size={16} className="mt-0.5 text-matrix-green flex-shrink-0" />
                                    <div>
                                        <div className="text-matrix-green font-semibold">LOG_AGM_SYSTEM</div>
                                        <div className="text-matrix-green/60 text-xs">Annual General Meeting scheduler & logger</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="border-t border-matrix-green/20 pt-4 mt-4">
                            <div className="text-matrix-green/80 font-bold mb-3 uppercase text-xs tracking-wider">
                                [SYSTEM_STATUS]
                            </div>
                            <div className="space-y-2 font-mono text-xs">
                                <div className="flex justify-between">
                                    <span className="text-matrix-green/60">[OK] Core modules initialized</span>
                                    <span className="text-matrix-green">100%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-matrix-green/60">[OK] Database connection established</span>
                                    <span className="text-matrix-green">STABLE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-matrix-green/60">[OK] Security protocols active</span>
                                    <span className="text-matrix-green">ENCRYPTED</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-amber-500">[WARN] AGM 2026 scheduling required</span>
                                    <span className="text-amber-500">PENDING</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Terminal Command Prompt */}
                <div className="bg-matrix-black border-2 border-matrix-green/30 p-6 mb-8 font-mono text-sm">
                    <div className="text-matrix-green/60 mb-2"># System ready for deployment</div>
                    <div className="text-matrix-green">
                        <span className="text-matrix-green/60">root@neural-matrix</span>
                        <span className="text-matrix-green/40">:</span>
                        <span className="text-matrix-green/60">~</span>
                        <span className="text-matrix-green"># </span>
                        <span className="animate-cursor"></span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-matrix-green/10 border-2 border-matrix-green text-matrix-green px-8 py-4 font-bold text-lg hover:bg-matrix-green hover:text-matrix-black transition-all flex items-center justify-center gap-3 group uppercase tracking-wider">
                        <Download size={20} className="group-hover:animate-bounce" />
                        [ACCESS_SYSTEM]
                    </button>
                    <button className="flex-1 bg-matrix-black border-2 border-matrix-green/30 text-matrix-green px-8 py-4 font-bold text-lg hover:border-matrix-green transition-all flex items-center justify-center gap-3 group uppercase tracking-wider">
                        <Terminal size={20} className="group-hover:animate-pulse" />
                        [DOCUMENTATION]
                    </button>
                </div>

                {/* Footer Info */}
                <footer className="mt-12 pt-8 border-t border-matrix-green/30 text-xs text-matrix-green/60 space-y-1">
                    <div>KESATUAN KAKITANGAN PELAKSANA (KKP-UTHM)</div>
                    <div>POWERED BY NEURAL_MATRIX FRAMEWORK</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></span>
                        STATUS: OPERATIONAL
                    </div>
                </footer>
            </div>
        </div>
    );
}
