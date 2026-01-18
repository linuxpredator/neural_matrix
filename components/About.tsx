'use client';

export default function About() {
    return (
        <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto" id="about">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-terminal text-white">
                    <span className="text-matrix-green mr-2">root@system:~/about$</span>
                    cat profile.txt
                </h2>
                <div className="h-px bg-matrix-green/30 flex-grow"></div>
            </div>

            <div className="bg-black/80 border-2 border-matrix-green/30 p-8 md:p-12 font-mono text-sm leading-relaxed">
                <pre className="text-matrix-green/90 whitespace-pre-wrap">
                    {`================================================================================
SYSTEM_PROFILE: HELMI_KHAMIS
================================================================================

> System Architect | Full-Stack Engineer | Digital Grid Specialist

INITIALIZATION_SEQUENCE: [COMPLETE]
STATUS: [OPERATIONAL]

Primary Functions:
  • Interface Optimization: Constructing high-performance web architectures
  • Logic Stream Processing: Transforming complex algorithms into executable code
  • Neural Network Design: Building responsive, intelligent user experiences
  • System Integration: Bridging frontend aesthetics with backend efficiency

Core Competencies:
  [████████████████████████████████████] 100% Next.js/React
  [████████████████████████████████████] 100% TypeScript
  [███████████████████████████████     ]  85% Node.js/API Design
  [██████████████████████████          ]  75% Database Architecture

Mission Statement:
  Navigating the digital matrix to engineer solutions that transcend
  conventional boundaries. Every line of code is a calculated step
  toward optimizing the human-machine interface.

Specialization:
  • Cyberpunk UI/UX implementations
  • Real-time data visualization systems
  • Embedded systems simulation (ESP32/IoT)
  • Performance-critical web applications

Current_Projects: [NEONTRIS, ESP32_SIMULATOR, NEURAL_MATRIX]
Collaboration_Status: [OPEN]

TERMINAL_OUTPUT: "The grid is vast and infinite. I architect the pathways."

================================================================================
END_TRANSMISSION
================================================================================`}
                </pre>
            </div>
        </section>
    );
}
