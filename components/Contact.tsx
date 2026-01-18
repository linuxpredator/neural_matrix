'use client';

import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
    return (
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto" id="contact">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-terminal text-white">
                    <span className="text-matrix-green mr-2">root@system:~/contact$</span>
                    init protocol
                </h2>
                <div className="h-px bg-matrix-green/30 flex-grow"></div>
            </div>

            <div className="bg-black/80 border-2 border-matrix-green/30 p-8 md:p-12">
                <pre className="font-mono text-sm leading-relaxed text-matrix-green/90 mb-8">
                    {`================================================================================
CONTACT_PROTOCOL: [INITIALIZE]
================================================================================

> Establish direct uplink to system architect

Secure transmission channel active. Collaboration inquiries and project 
discussions—initiate contact through verified neural link below.

UPLINK_STATUS: [READY]
PRIMARY_CHANNEL: linuxpredator@gmail.com

> awaiting_transmission...
================================================================================`}
                </pre>

                {/* Contact Links */}
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                    <a
                        href="mailto:linuxpredator@gmail.com"
                        className="flex items-center gap-3 px-6 py-3 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all font-mono text-sm group"
                    >
                        <Mail size={20} className="group-hover:scale-110 transition-transform" />
                        <span>SEND_MESSAGE</span>
                    </a>

                    <a
                        href="https://github.com/linuxpredator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all font-mono text-sm group"
                    >
                        <Github size={20} className="group-hover:scale-110 transition-transform" />
                        <span>VIEW_REPOSITORY</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/muhammad-helmi-49104483/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-black border-2 border-matrix-green/40 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all font-mono text-sm group"
                    >
                        <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                        <span>PROFESSIONAL_NETWORK</span>
                    </a>
                </div>

                {/* Status Indicator */}
                <div className="mt-8 pt-6 border-t border-matrix-green/30 flex items-center gap-2 text-xs font-mono text-matrix-green/60">
                    <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                    <span>TRANSMISSION_CHANNEL: [ACTIVE]</span>
                </div>
            </div>
        </section>
    );
}
