"use client";

import React from 'react';
import { ArrowLeft, FileText, Users, DollarSign, Calendar, Settings, LogOut, Download, Plus, Terminal } from 'lucide-react';
import Link from 'next/link';
import MatrixRain from '@/components/MatrixRain';

export default function UnionDashboard() {
    return (
        <div className="min-h-screen bg-black font-mono text-matrix-green flex relative overflow-hidden">

            {/* BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0">
                <MatrixRain />
            </div>
            <div className="fixed inset-0 z-50 pointer-events-none scanline-effect opacity-30"></div>
            <div className="fixed inset-0 z-40 pointer-events-none crt-overlay opacity-20"></div>

            {/* SIDEBAR NAVIGATION */}
            <aside className="fixed left-0 top-0 w-64 h-full bg-black/90 border-r border-matrix-green/30 text-matrix-green p-6 shadow-xl flex flex-col z-20 backdrop-blur-sm">
                <Link href="/" className="flex items-center gap-2 text-matrix-green/70 hover:text-white transition-colors text-xs mb-6 hover:animate-pulse">
                    <ArrowLeft size={14} /> Back to System
                </Link>

                <h2 className="text-xl font-bold mb-10 tracking-tight flex items-center gap-2 font-terminal">
                    <span className="w-8 h-8 border border-matrix-green rounded flex items-center justify-center font-bold relative overflow-hidden group">
                        <span className="absolute inset-0 bg-matrix-green/20 group-hover:bg-matrix-green/40 transition-colors"></span>
                        U
                    </span>
                    UNION_OS <span className="text-white text-xs border border-white px-1 rounded">PRO</span>
                </h2>

                <nav className="space-y-6 text-sm flex-grow">
                    <div>
                        <div className="text-matrix-green/60 font-bold mb-3 text-xs uppercase tracking-wider relative pl-2 border-l-2 border-matrix-green/30">MODULES_01</div>
                        <a href="#" className="flex items-center gap-3 py-2 px-3 hover:bg-matrix-green/10 border border-transparent hover:border-matrix-green/30 rounded text-matrix-green/80 hover:text-matrix-green transition-all group">
                            <Users size={16} className="group-hover:animate-pulse" /> DATABASE_AHLI <span className="ml-auto bg-matrix-green/20 border border-matrix-green/50 text-[10px] py-0.5 px-2 rounded-full font-mono">646</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 py-2 px-3 hover:bg-matrix-green/10 border border-transparent hover:border-matrix-green/30 rounded text-matrix-green/80 hover:text-matrix-green transition-all group">
                            <DollarSign size={16} className="group-hover:animate-pulse" /> YURAN_TRACKER
                        </a>
                    </div>

                    <div>
                        <div className="text-matrix-green/60 font-bold mb-3 text-xs uppercase tracking-wider relative pl-2 border-l-2 border-matrix-green/30">COMPLIANCE_02</div>
                        <a href="#" className="flex items-center gap-3 py-2 px-3 hover:bg-matrix-green/10 border border-transparent hover:border-matrix-green/30 rounded text-matrix-green/80 hover:text-matrix-green transition-all group">
                            <FileText size={16} className="group-hover:animate-pulse" /> BORANG_9_12
                        </a>
                        <a href="#" className="flex items-center gap-3 py-2 px-3 hover:bg-matrix-green/10 border border-transparent hover:border-matrix-green/30 rounded text-matrix-green/80 hover:text-matrix-green transition-all group">
                            <Calendar size={16} className="group-hover:animate-pulse" /> LOG_AGM_SYS
                        </a>
                    </div>
                </nav>

                <div className="pt-6 border-t border-matrix-green/30">
                    <Link href="/" className="flex items-center gap-3 text-matrix-green/70 hover:text-matrix-green transition-colors text-sm hover:animate-pulse">
                        <ArrowLeft size={16} /> TERMINATE_SESSION
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="ml-64 w-full p-8 md:p-12 z-10 relative">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-matrix-green/30 pb-6 gap-4">
                    <div>
                        <div className="text-xs font-bold text-matrix-green/60 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                            KESATUAN_KAKITANGAN_PELAKSANA_V.2.0
                        </div>
                        <h1 className="text-3xl font-extrabold text-matrix-green font-terminal tracking-tighter shimmer-text">
                            &gt; DASHBOARD_UTAMA
                        </h1>
                        <p className="text-matrix-green/60 mt-1 font-mono text-xs">// TARGET: UNIVERSITI TUN HUSSEIN ONN MALAYSIA (UTHM)</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-black border border-matrix-green text-matrix-green px-4 py-2.5 rounded-none text-sm font-bold hover:bg-matrix-green hover:text-black transition-all flex items-center gap-2 font-mono uppercase">
                            <Download size={16} /> [DL]_REPORT
                        </button>
                        <button className="bg-matrix-green/10 border border-matrix-green text-matrix-green px-5 py-2.5 rounded-none text-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-matrix-green hover:text-black flex items-center gap-2 transition-all active:scale-95 font-mono uppercase">
                            <Plus size={16} /> NEW_MEMBER()
                        </button>
                    </div>
                </header>

                {/* COMPLIANCE STATUS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-black/50 backdrop-blur-md p-6 border border-red-500/50 relative overflow-hidden group hover:border-red-500 transition-colors">
                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Settings className="text-red-500 animate-spin-slow" />
                        </div>
                        <h3 className="text-xs font-bold text-red-400 mb-3 uppercase tracking-wider flex items-center justify-between font-mono">
                            STATUS_AGM_2026 <span className="text-black bg-red-500 px-2 py-0.5 text-[10px] font-bold animate-pulse">CRITICAL</span>
                        </h3>
                        <div className="text-3xl font-bold text-red-500 mb-1 font-terminal">PENDING_SCHEDULE</div>
                        <p className="text-xs text-red-400/80 font-mono">TIMEOUT: <span className="font-bold text-red-500">45 DAYS</span> REMAINING.</p>
                    </div>

                    <div className="bg-black/50 backdrop-blur-md p-6 border border-matrix-green/30 relative overflow-hidden group hover:border-matrix-green transition-colors">
                        <h3 className="text-xs font-bold text-matrix-green/60 mb-3 uppercase tracking-wider flex items-center justify-between font-mono">
                            FEES_COLLECTION_JAN <span className="text-black bg-matrix-green px-2 py-0.5 text-[10px] font-bold">+4.0%</span>
                        </h3>
                        <div className="text-3xl font-bold text-matrix-green mb-1 font-terminal">RM 9,690.00</div>
                        <p className="text-xs text-matrix-green/60 font-mono">TARGET: RM 9,500.00 [ACHIEVED]</p>
                    </div>

                    <div className="bg-black/50 backdrop-blur-md p-6 border border-blue-500/30 relative overflow-hidden group hover:border-blue-500 transition-colors">
                        <h3 className="text-xs font-bold text-blue-400/60 mb-3 uppercase tracking-wider flex items-center justify-between font-mono">
                            ACTIVE_MEMBERS <span className="text-black bg-blue-500 px-2 py-0.5 text-[10px] font-bold">100% ELIGIBLE</span>
                        </h3>
                        <div className="text-3xl font-bold text-blue-500 mb-1 font-terminal">646/646</div>
                        <p className="text-xs text-blue-400/60 font-mono">VOTING_ELIGIBILITY_STATUS: CONFIRMED</p>
                    </div>
                </div>

                {/* MEMBER LIST TABLE PREVIEW */}
                <section className="bg-black/80 backdrop-blur-sm border border-matrix-green/30 relative overflow-hidden">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-matrix-green"></div>

                    <div className="p-6 border-b border-matrix-green/20 bg-matrix-green/5 flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-matrix-green font-terminal tracking-wider">&gt; MEMBER_VOTING_LIST.dat</h4>
                            <p className="text-xs text-matrix-green/50 font-mono">LAST_SYNC: 17 JAN 2026, 08:00:00</p>
                        </div>
                        <div className="flex gap-2">
                            <input type="text" placeholder="SEARCH_QUERY..." className="bg-black border border-matrix-green/30 px-3 py-1.5 text-xs w-64 focus:outline-none focus:border-matrix-green text-matrix-green placeholder:text-matrix-green/30 font-mono" />
                        </div>
                    </div>
                    <table className="w-full text-left text-sm font-mono">
                        <thead>
                            <tr className="bg-black border-b border-matrix-green/20 text-matrix-green/50 uppercase text-[10px] tracking-wider">
                                <th className="p-4 font-normal">[NAME]</th>
                                <th className="p-4 font-normal">[ID_NO]</th>
                                <th className="p-4 font-normal">[GRADE]</th>
                                <th className="p-4 font-normal">[STATUS]</th>
                                <th className="p-4 font-normal text-right">[ACTION]</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-matrix-green/10">
                            {[
                                { name: 'Zulkifli Bin Ahmad', id: 'S12345', grade: 'JA29', status: 'PAID' },
                                { name: 'Siti Sarah Binti Razak', id: 'S12346', grade: 'N19', status: 'PAID' },
                                { name: 'Mohd Hafiz Bin Rosli', id: 'S12347', grade: 'FT19', status: 'PENDING' },
                                { name: 'Nurul Huda Binti Karim', id: 'S12348', grade: 'JA29', status: 'PAID' },
                                { name: 'Kamal Ariffin Bin Daud', id: 'S12349', grade: 'H11', status: 'PAID' },
                            ].map((member, i) => (
                                <tr key={i} className="hover:bg-matrix-green/10 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="font-bold text-matrix-green group-hover:text-white transition-colors">{member.name}</div>
                                    </td>
                                    <td className="p-4 text-matrix-green/60">{member.id}</td>
                                    <td className="p-4 text-matrix-green/80">
                                        <span className="border border-matrix-green/30 px-2 py-0.5 rounded textxs">{member.grade}</span>
                                    </td>
                                    <td className="p-4">
                                        {member.status === 'PAID' ?
                                            <span className="text-matrix-green px-2 py-1 text-[10px] font-bold border border-matrix-green/50 flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 bg-matrix-green rounded-full animate-pulse"></span> CLEARED</span> :
                                            <span className="text-amber-500 px-2 py-1 text-[10px] font-bold border border-amber-500/50 flex items-center w-fit gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></span> PENDING</span>
                                        }
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="text-matrix-green/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity">_EDIT_PROFILE</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 border-t border-matrix-green/20 bg-matrix-green/5 text-center text-xs text-matrix-green/50 cursor-pointer hover:bg-matrix-green/10 hover:text-matrix-green transition-colors font-mono">
                        [LOAD_MORE_DATA] (641 RECORDS HIDDEN)
                    </div>
                </section>
            </main>
        </div>
    );
}
