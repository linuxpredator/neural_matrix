"use client";

import { motion } from "framer-motion";
import { Search, Loader2, AlertCircle, Download, MonitorPlay, Shield, Calendar, User, Globe, Hash, ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import MatrixRain from "@/components/MatrixRain";
import StatusBar from "@/components/StatusBar";
import Image from "next/image";
import { getLocationInfo } from "@/lib/locationMapper";

export default function TikTokUserFinder() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) return;

        setIsLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch(`/api/tiktok?username=${username}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch user data");
            }

            setResult({
                username: data.username,
                nickname: data.nickname,
                id: data.id,
                secUid: data.secUid,
                private: data.private,
                verified: data.verified,
                followers: data.stats?.followerCount || 0,
                following: data.stats?.followingCount || 0,
                hearts: data.stats?.heartCount || 0,
                videos: data.stats?.videoCount || 0,
                signature: data.signature,
                region: data.region,
                region_confidence: data.region_confidence,
                region_method: data.region_method,
                language: data.language,
                avatar: data.avatar,
                createdAt: data.createdAt,
                hasStories: data.hasStories,
                nicknameEdited: "Unknown"
            });
        } catch (err: any) {
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isScraping, setIsScraping] = useState(false);
    const [followingList, setFollowingList] = useState<any[]>([]);

    const mockFollowingList = Array.from({ length: 15 }).map((_, i) => ({
        id: `mock-${i}`,
        username: `@user_target_${i + 1}`,
        nickname: `Target ${i + 1}`,
        avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`,
        bio: "Explaining the world one video at a time. Digital explorer.",
    }));

    const displayList = followingList.length > 0 ? followingList : mockFollowingList;

    const handleScrapeFollowing = async () => {
        if (!result?.username || !sessionId) return;

        setIsScraping(true);
        setFollowingList([]);

        try {
            const response = await fetch('/api/tiktok/following', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: result.username,
                    sessionid: sessionId
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Scraping failed");
            }

            if (data.data && Array.isArray(data.data)) {
                setFollowingList(data.data.map((u: any, i: number) => ({
                    ...u,
                    id: `real-${i}`
                })));
            }
        } catch (error: any) {
            console.error("Scraping error:", error);
            alert(`Scraping Failed: ${error.message}\nMake sure your Session ID is valid.`);
        } finally {
            setIsScraping(false);
        }
    };

    const handleDownloadFollowing = () => {
        const headers = ["Username", "Nickname", "Bio", "Avatar URL"];
        const csvContent = [
            headers.join(","),
            headers.join(","),
            ...displayList.map(u => [u.username, u.nickname, `"${u.bio}"`, u.avatar].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${result?.username}_following.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleDownloadAvatar = () => {
        if (!result?.avatar) return;
        const filename = `${result.username}_avatar.jpg`;
        const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(result.avatar)}&filename=${encodeURIComponent(filename)}&t=${Date.now()}`;
        window.location.assign(proxyUrl);
    };

    const handleViewStories = () => {
        if (!result?.username) return;
        window.open(`https://www.tiktok.com/@${result.username}`, "_blank");
    };

    const handleViewProfile = () => {
        if (!result?.username) return;
        window.open(`https://www.tiktok.com/@${result.username}`, "_blank");
    };

    const handleViewFollowing = () => {
        setIsFollowingModalOpen(true);
    };

    return (
        <main className="min-h-screen w-full bg-black selection:bg-matrix-green selection:text-black font-sans overflow-x-hidden relative">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-matrix-green hover:text-white transition-colors text-sm z-50">
                <ArrowLeft size={16} /> Back to System
            </Link>

            {/* Matrix Rain Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <MatrixRain />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 flex flex-col gap-8">

                {/* SEKSYEN ATAS: SEARCH BOX */}
                <section className={`relative w-full border-2 border-matrix-green bg-black/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_0_20px_rgba(0,255,0,0.15)] transition-all duration-500 ${!result ? 'my-auto mt-32' : ''}`}>

                    {/* Corner Accents - Restored */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-matrix-green" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-matrix-green" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-matrix-green" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-matrix-green" />

                    <h1 className="text-center text-xl md:text-3xl font-terminal tracking-[0.2em] mb-6 text-white text-shadow-glow">
                        TIKTOK<span className="text-matrix-green animate-pulse">_</span>USER<span className="text-matrix-green animate-pulse">_</span>FINDER
                    </h1>

                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-matrix-green/70 group-focus-within:text-matrix-green transition-colors" size={20} />
                            <input
                                id="tiktok-search-input"
                                name="search_query"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="ENTER USERNAME..."
                                autoComplete="off"
                                data-lpignore="true"
                                spellCheck="false"
                                className="w-full bg-black border border-matrix-green/50 text-white px-12 py-4 focus:outline-none focus:border-matrix-green focus:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition-all font-mono placeholder:text-gray-700 appearance-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-matrix-green/10 border-2 border-matrix-green px-10 py-3 text-matrix-green font-bold tracking-widest hover:bg-matrix-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "EXECUTE"}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-sm font-mono flex items-center gap-2">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}
                </section>

                {/* SEKSYEN BAWAH: PROFILE INFO (Aligned perfectly) */}
                {result && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full border-2 border-matrix-green bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.15)] relative"
                    >
                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-matrix-green z-20" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-matrix-green z-20" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-matrix-green z-20" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-matrix-green z-20" />

                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-repeat-y bg-[length:100%_4px] bg-gradient-to-b from-transparent via-matrix-green/5 to-transparent pointer-events-none opacity-30 z-0" />

                        <div className="p-6 md:p-8 relative z-10">
                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                                {/* Avatar Section */}
                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    <div className="relative mx-auto md:mx-0">
                                        <div className="w-40 h-40 rounded-full border-2 border-matrix-green p-1 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                                            <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden relative">
                                                {result.avatar ? (
                                                    <Image src={result.avatar} alt="avatar" fill className="object-cover" unoptimized />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-full text-matrix-green"><User size={40} /></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-40 mx-auto md:mx-0">
                                        <button onClick={handleDownloadAvatar} className="w-full border border-matrix-green py-2 text-xs font-bold text-matrix-green hover:bg-matrix-green hover:text-black uppercase transition-colors flex items-center justify-center gap-2">
                                            <Download size={12} /> Save Avatar
                                        </button>
                                        <button onClick={handleViewStories} className={`w-full border py-2 text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2 ${result.hasStories ? 'border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-black cursor-pointer' : 'border-zinc-700 text-zinc-500 cursor-not-allowed'}`}>
                                            <MonitorPlay size={12} /> {result.hasStories ? "Stories" : "No Stories"}
                                        </button>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="flex-grow space-y-4 w-full text-center md:text-left">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white font-terminal tracking-wide flex items-center justify-center md:justify-start gap-2">
                                            {result.nickname}
                                            {result.verified && <Shield size={20} className="text-blue-400" />}
                                        </h2>
                                        <p className="text-gray-400 font-mono">@{result.username}</p>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        {/* Region Badge */}
                                        {(() => {
                                            const { name, flag } = getLocationInfo(result.region);

                                            return (
                                                <div className="group/region relative cursor-help">
                                                    <span className="bg-matrix-green/10 border border-matrix-green/50 px-3 py-1 text-xs font-bold text-matrix-green flex items-center gap-2 uppercase">
                                                        <span className="text-base leading-none">{flag}</span> {name}
                                                    </span>
                                                    <div className="opacity-0 group-hover/region:opacity-100 transition-opacity absolute bottom-full left-0 mb-2 px-2 py-1 bg-black border border-matrix-green text-[10px] text-matrix-green whitespace-nowrap z-50 pointer-events-none">
                                                        CONFIDENCE: {(result.region_confidence * 100).toFixed(0)}% ({result.region_method})
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <span className="bg-zinc-800 border border-zinc-700 px-3 py-1 text-xs text-gray-400 flex items-center gap-2 uppercase font-mono">
                                            🗣️ {result.language?.toUpperCase() || "N/A"}
                                        </span>
                                    </div>

                                    <div className="border border-matrix-green/30 p-4 bg-black/40 text-sm text-gray-300 font-mono italic relative">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-matrix-green/50"></div>
                                        "{result.signature || "No signature available."}"
                                    </div>

                                    {/* Tech Details with Info Icon */}
                                    <div className="text-xs text-gray-500 font-mono flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                        <div className="flex items-center gap-2">
                                            <Hash size={12} className="text-matrix-green" />
                                            ID: <span className="text-gray-300">{result.id}</span>
                                            <div className="group/info relative">
                                                <Info size={12} className="hover:text-matrix-green cursor-help" />
                                                <div className="opacity-0 group-hover/info:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1a1f] border border-gray-700 rounded-lg shadow-xl text-[10px] text-gray-300 w-48 text-center z-50 pointer-events-none">
                                                    This ID is permanent! Use it to find the account even if the username changes.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={12} className="text-matrix-green" />
                                            Created: <span className="text-gray-300">{result.createdAt}</span>
                                        </div>
                                    </div>

                                    <button onClick={handleViewProfile} className="text-xs flex items-center justify-center md:justify-start gap-1 hover:underline underline-offset-4 text-matrix-green mt-2 font-bold uppercase tracking-wider">
                                        <MonitorPlay size={12} /> View Original Profile
                                    </button>
                                </div>
                            </div>

                            {/* Stats Grid: Menjamin Keseimbangan Visual */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                                {[
                                    { label: 'FOLLOWERS', value: result.followers },
                                    { label: 'FOLLOWING', value: result.following },
                                    { label: 'HEARTS', value: result.hearts },
                                    { label: 'VIDEOS', value: result.videos }
                                ].map((item) => (
                                    <div key={item.label} className="border border-matrix-green/30 p-4 bg-black/20 text-center group hover:border-matrix-green hover:bg-matrix-green/5 transition-all cursor-default relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-matrix-green/30 group-hover:border-matrix-green transition-colors"></div>
                                        <div className="text-2xl md:text-3xl font-bold mb-1 text-white group-hover:text-matrix-green transition-colors font-terminal">{item.value.toLocaleString()}</div>
                                        <div className="text-[10px] tracking-[0.2em] text-gray-500 group-hover:text-matrix-green transition-colors font-mono">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button onClick={handleViewFollowing} className="text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase border-b border-transparent hover:border-white">
                                    [ EXTRACT FOLLOWING LIST ]
                                </button>
                            </div>
                        </div>
                    </motion.section>
                )}
            </div>

            <StatusBar />

            {/* Following Modal Logic Preserved */}
            {isFollowingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsFollowingModalOpen(false)} />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-2xl bg-[#0f0f12] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-[#0f0f12] z-10 flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">Following List</h3>
                                <button onClick={() => setIsLiveMode(!isLiveMode)} className={`px-2 py-1 text-[10px] font-mono border rounded uppercase transition-all ${isLiveMode ? 'bg-red-900/30 border-red-500 text-red-500 animate-pulse' : 'border-zinc-700 text-zinc-500 hover:text-matrix-green hover:border-matrix-green'}`}>
                                    {isLiveMode ? "● LIVE MODE" : "○ MOCK MODE"}
                                </button>
                            </div>
                            <button onClick={handleDownloadFollowing} className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded hover:bg-gray-200 transition-colors"><Download size={12} /> CSV</button>
                        </div>
                        {isLiveMode && (
                            <div className="p-4 bg-zinc-900/50 border-b border-matrix-green/20 flex flex-col gap-3">
                                <input type="text" placeholder="Paste sessionid cookie..." value={sessionId} onChange={(e) => setSessionId(e.target.value)} className="flex-1 bg-black border border-zinc-700 text-white px-3 py-2 rounded text-xs font-mono" />
                                <button onClick={handleScrapeFollowing} disabled={isScraping || !sessionId} className="bg-matrix-dark-green text-matrix-green border border-matrix-green px-4 py-2 font-bold text-xs uppercase hover:bg-matrix-green hover:text-black transition-colors disabled:opacity-50">{isScraping ? <Loader2 size={12} className="animate-spin" /> : "SCRAPE"}</button>
                            </div>
                        )}
                        <div className="overflow-y-auto p-4 custom-scrollbar">
                            {/* ... (Existing List Logic) ... */}
                            {!isScraping && displayList.map((user) => (
                                <div key={user.id} className="flex items-start gap-4 p-4 hover:bg-white/5 rounded-xl transition-colors border-b border-gray-800/50 relative">
                                    <div className="relative w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex-shrink-0">
                                        {user.avatar ? <Image src={user.avatar} fill className="object-cover" alt={user.nickname} /> : <User className="p-2 text-gray-500" />}
                                    </div>
                                    <div>
                                        <div className="text-blue-400 font-bold text-sm">{user.username}</div>
                                        <div className="text-gray-500 text-xs line-clamp-2">{user.bio || "No Bio"}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-800 md:hidden"><button onClick={() => setIsFollowingModalOpen(false)} className="w-full py-3 bg-zinc-800 text-white rounded-lg font-bold text-sm">Close</button></div>
                    </motion.div>
                </div>
            )}
        </main>
    );
}
