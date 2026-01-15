"use client";

import { motion } from "framer-motion";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import MatrixRain from "@/components/MatrixRain";
import StatusBar from "@/components/StatusBar";

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

        // Simulate API Call
        setTimeout(() => {
            setIsLoading(false);
            if (Math.random() > 0.7) {
                setError("Error: TARGET_NOT_FOUND or API_LIMIT_EXCEEDED");
            } else {
                setResult({
                    username: username,
                    id: "67459032185672901",
                    secUid: "MS4wLjABAAAA...",
                    private: false,
                    verified: true,
                    followers: 1250000,
                    following: 12,
                    likes: 54000000,
                    signature: "Digital Ghost in the Shell 👻",
                    region: "MY"
                });
            }
        }, 2000);
    };

    return (
        <main className="relative min-h-screen w-full bg-black selection:bg-matrix-green selection:text-black font-sans overflow-x-hidden">
            <Navigation />
            <MatrixRain />

            {/* CRT & Scanline Effects */}
            <div className="fixed inset-0 z-50 pointer-events-none scanline-effect opacity-50"></div>
            <div className="fixed inset-0 z-40 pointer-events-none crt-overlay opacity-30"></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl bg-black/80 border border-matrix-green p-8 backdrop-blur-sm relative"
                >
                    {/* Decorative Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-matrix-green"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-matrix-green"></div>

                    <div className="flex flex-col gap-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-terminal text-white tracking-widest">
                            TIKTOK_<span className="text-matrix-green">USER_FINDER</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm max-w-lg mx-auto">
                            [SYSTEM_MESSAGE]: Enter target username to retrieve metadata.
                            <br />
                            WARNING: Use for educational purposes only.
                        </p>

                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mt-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter Username (e.g. alt_cmd)"
                                    className="w-full bg-black/50 border border-matrix-green text-white font-mono p-4 pl-12 focus:outline-none focus:ring-1 focus:ring-matrix-green placeholder-gray-600"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-matrix-green opacity-70" size={20} />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-matrix-dark-green hover:bg-matrix-green text-matrix-green hover:text-black border border-matrix-green px-8 py-4 font-mono font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Scanning...
                                    </>
                                ) : (
                                    "Execute"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-8 p-4 bg-red-900/20 border border-red-500/50 text-red-400 font-mono text-sm flex items-center gap-3"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 border-t border-matrix-green/30 pt-6 text-left"
                        >
                            <h3 className="text-matrix-green font-terminal text-xl mb-4">TARGET_ACQUIRED:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">USERNAME</span>
                                    <span className="text-white text-lg">@{result.username}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">REGION</span>
                                    <span className="text-white">{result.region}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">USER_ID</span>
                                    <span className="text-white truncate">{result.id}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">SEC_UID</span>
                                    <span className="text-white truncate text-xs">{result.secUid}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">FOLLOWERS</span>
                                    <span className="text-matrix-green">{result.followers.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-gray-500">LIKES</span>
                                    <span className="text-matrix-green">{result.likes.toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <StatusBar />
        </main>
    );
}
