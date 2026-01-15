"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "/HOME", href: "/" },
        { name: "/PROJECTS", href: "#projects" },
        { name: "/ABOUT", href: "#about" },
        { name: "/CONTACT", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold font-terminal text-white tracking-widest hover:text-matrix-green transition-colors"
                >
                    NEURAL_MATRIX
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-mono text-gray-400 hover:text-matrix-green transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-matrix-green group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-matrix-green transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black border-b border-matrix-green/20 overflow-hidden"
                >
                    <div className="flex flex-col p-6 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-mono text-gray-300 hover:text-matrix-green transition-colors border-l-2 border-transparent hover:border-matrix-green pl-4"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
