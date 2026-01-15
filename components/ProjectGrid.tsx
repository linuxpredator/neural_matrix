"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        id: "ecommerce-ui",
        title: "NEON_MARKET",
        description: "Next-gen e-commerce interface with real-time inventory tracking and crypto payments.",
        tech: ["Next.js", "Stripe", "Web3"],
        status: "ONLINE",
        delay: 0.1
    },
    {
        id: "saas-dashboard",
        title: "DATA_NEXUS",
        description: "Analytics dashboard for visualizing high-dimensional data streams.",
        tech: ["React", "D3.js", "Tailwind"],
        status: "OPERATIONAL",
        delay: 0.2
    },
    {
        id: "ai-chat-interface",
        title: "CORTEX_LM",
        description: "AI conversational interface with neural network visualization.",
        tech: ["OpenAI", "WebSockets", "Canvas"],
        status: "PROCESSING",
        delay: 0.3
    },
    {
        id: "crypto-tracker",
        title: "BLOCK_WATCH",
        description: "Real-time cryptocurrency tracking and algorithmic trading signals.",
        tech: ["Solidity", "Ethers.js", "Graph"],
        status: "SYNCING",
        delay: 0.4
    },
    {
        id: "terminal-portfolio",
        title: "SHELL_OS",
        description: "Browser-based terminal operating system simulation.",
        tech: ["TypeScript", "Xterm.js", "Linux"],
        status: "ROOT_ACCESS",
        delay: 0.5
    }
];

export default function ProjectGrid() {
    return (
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-terminal text-white">
                    <span className="text-matrix-green mr-2">root@system:~/projects$</span>
                    ls -la
                </h2>
                <div className="h-px bg-matrix-green/30 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: project.delay, duration: 0.5 }}
                        className="group relative bg-black/80 border border-white/10 hover:border-matrix-green transition-colors duration-300 p-6 overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-matrix-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2 text-matrix-green/80 text-xs font-mono border border-matrix-green/30 px-2 py-1 rounded">
                                    <Terminal size={12} />
                                    {project.id}
                                </div>
                                <span className="text-xs font-mono text-gray-500 animate-pulse">
                                    [{project.status}]
                                </span>
                            </div>

                            <h3 className="text-xl font-bold font-terminal text-white mb-2 group-hover:text-matrix-green transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm font-mono mb-6 line-clamp-3 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t) => (
                                    <span key={t} className="text-xs text-gray-500 font-mono">
                                        #{t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                                <Link
                                    href={`/demo/${project.id}`}
                                    className="flex items-center gap-2 text-sm font-mono text-white hover:text-matrix-green transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    DEPLOY_LINK
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-white transition-colors"
                                >
                                    <Github size={14} />
                                    SOURCE
                                </Link>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-matrix-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-matrix-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
