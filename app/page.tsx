import Navigation from "@/components/Navigation";
import MatrixRain from "@/components/MatrixRain";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectGrid from "@/components/ProjectGrid";
import StatusBar from "@/components/StatusBar";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black selection:bg-matrix-green selection:text-black font-sans">
      <Navigation />
      <MatrixRain />

      {/* CRT & Scanline Effects */}
      <div className="fixed inset-0 z-50 pointer-events-none scanline-effect opacity-50"></div>
      <div className="fixed inset-0 z-40 pointer-events-none crt-overlay opacity-30"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Hero />
        <div id="projects">
          <ProjectGrid />
        </div>
        <About />
      </div>

      <StatusBar />
    </main>
  );
}
