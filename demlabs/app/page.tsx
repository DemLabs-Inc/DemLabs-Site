"use client";

import { useRef, useState, useEffect } from "react";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon, BotIcon } from "lucide-react";
import A from "@dl/component/Ai";
import Image from "next/image";

/* -------------------- ASSETS & ICONS -------------------- */
const Icons = {
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  Terminal: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 3-3 3m0-9l3 3 3-3M11.25 16.5h9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.98 14.98 0 00-6.16 12.12 14.98 14.98 0 0012.12-6.16z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.93 11.07a3 3 0 11-4.26-4.26 3 3 0 014.26 4.26z" /></svg>,
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
};

/* -------------------- AUTH GATE -------------------- */
const AuthGate = () => (
  <main className="min-h-screen flex items-center justify-center bg-[#0B0F19] p-6 text-white">
    <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-[#111625] shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-bold">D</div>
          <h1 className="text-2xl font-bold">DemLabs</h1>
        </div>
        <p className="text-sm text-gray-400 font-mono tracking-tighter">INITIALIZING_SECURE_ACCESS...</p>
      </div>
      <SignIn routing="hash" appearance={{
        variables: { colorPrimary: '#06b6d4', colorBackground: '#111625', colorText: 'white' },
        elements: { card: 'shadow-none p-0 bg-transparent', header: 'hidden' }
      }} />
    </div>
  </main>
);

/* -------------------- LIVE STATUS COMPONENT -------------------- */
const LiveStatusLayer = () => {
  const [logs, setLogs] = useState(["Initialize..."]);
  const logPool = ["> Optimizing Visual AI...", "> Neural Link established.", "> Syncing SaaS assets...", "> Rendering UI components...", "> DemLabs Agent: Ready", "> Processing core logic...", "> Encrypting data streams..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-3), logPool[Math.floor(Math.random() * logPool.length)]]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-[65%] h-[320px] bg-[#161b2c]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden z-20 flex flex-col">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">System Status</span>
        <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          ONLINE
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div animate={{ width: ["40%", "84%", "60%", "84%"] }} transition={{ repeat: Infinity, duration: 4 }} className="h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
        </div>
        <div className="font-mono text-[11px] space-y-2 text-cyan-400/70">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
      </div>
    </div>
  );
};

/* -------------------- MAIN WEBSITE -------------------- */
const Website = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-white min-h-screen selection:bg-cyan-500/30 scroll-smooth">
        
        {/* Navigation */}
        <header className="fixed top-0 w-full z-40 bg-[#0B0F19]/90 backdrop-blur-sm border-b border-white/5">
          <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-transform group-hover:rotate-12">D</div>
              <span className="text-xl font-bold tracking-tight">DemLabs</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-300">
              {['Services', 'Projects', 'About'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{l}</a>
              ))}
              <button 
                onClick={() => setIsAiOpen(true)}
                className="flex items-center gap-2 text-cyan-500 font-bold px-3 py-1 border border-cyan-500/20 rounded-full hover:bg-cyan-500/10 transition-all text-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                NEURAL LINK
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }}/>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section id="home" className="relative pt-48 pb-32 max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b2c] border border-cyan-900/30 text-sm font-medium text-cyan-400 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                DemLabs Intelligence
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold leading-[1.15] mb-6">
                Innovating <br /> The Future Of <span className="text-cyan-400">Software</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
                We design futuristic AI systems, interfaces, and SaaS platforms with a focus on innovation, appearance, and performance.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-md font-bold transition-all">Contact</a>
                <a href="#about" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-md font-bold transition-all">About Us</a>
              </div>
            </motion.div>
            
            <div className="relative h-[500px] hidden lg:block">
               <div className="absolute top-0 right-0 w-[90%] h-[400px] bg-[#111625] rounded-xl border border-white/5 shadow-2xl p-6 font-mono text-sm overflow-hidden">
                  <div className="text-gray-500 mb-4 tracking-tighter">// Core Initialization</div>
                  <div className="text-purple-400">await <span className="text-cyan-400">DemLabs.boot()</span>;</div>
                  <div className="mt-4 text-green-400/50">{`>> System kernel: v4.0.2`}</div>
                  <div className="text-green-400/50">{`>> Connection: Secure SSL`}</div>
               </div>
               <LiveStatusLayer />
            </div>
          </div>
        </section>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAiOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(6,182,212,0.4)] group"
        >
          <div className="absolute inset-0 rounded-2xl bg-cyan-400 animate-ping opacity-20 group-hover:opacity-40" />
          <BoltIcon/>
        </motion.button>

       {/* AI Console Overlay */}
        <AnimatePresence>
          {isAiOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsAiOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                /* MOBILE: Centered, fits screen exactly, no overflow.
                   TABLET/PC: Snaps to right, standard width.
                */
                className={`
                  fixed z-[70] bg-[#0B0F19] border border-white/10 shadow-2xl flex flex-col
                  
                  /* Mobile: 95% width, Dynamic height to prevent scrolling, centered */
                  bottom-4 left-1/2 -translate-x-1/2 w-[95%] h-[calc(100dvh-2rem)] rounded-[2rem]
                  
                  /* Tablet/PC: Right-aligned, fixed width */
                  md:translate-x-0 md:left-auto md:right-4 md:top-4 md:bottom-4 md:w-full md:max-w-[480px] md:h-auto md:rounded-[2.5rem]
                `}
              >
                {/* Header - Compact for mobile */}
                <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/5 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500">
                      Consulting AI
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsAiOpen(false)} 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>
                
                {/* AI Content Area: 
                   'flex-1' makes it take up all remaining space.
                   'overflow-hidden' prevents the window itself from scrolling.
                */}
                <div className="flex-1 relative bg-[#0D121F] overflow-hidden flex flex-col">
                  {/* We wrap <A /> in a container that forces it to fit */}
                  <div className="flex-1 w-full h-full max-h-full">
                    <A />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-400">Pioneering solutions built in the DemLabs ecosystem.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard title="Agent Hub" tag="AI & Automation" desc="An autonomous ecosystem for intelligent agent coordination and task management." />
              <ProjectCard title="Quantum Forge" tag="Developer Tools" desc="Next-gen infrastructure for building high-performance decentralized applications." />
              <ProjectCard title="DemLabs OS" tag="Interfaces" desc="A futuristic, sleek operating interface for cross-platform cloud management." />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-[#0D121F] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <div className="h-1 w-16 bg-cyan-500 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard icon={<Icons.Cpu />} title="AI Systems" description="Intelligent agents that adapt, learn, and empower your business logic." />
              <ServiceCard icon={<Icons.Code />} title="SaaS Platforms" description="Sleek, futuristic platforms built for global performance and scale." />
              <ServiceCard icon={<Icons.Terminal />} title="Web & App Dev" description="Futuristic, sleek, and mobile-responsive web and mobile applications." />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Redefining Tech at <span className="text-cyan-400">DemLabs</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                DemLabs is a next-generation technology lab creating intelligent software that transforms the way people interact with technology. We design AI agents, smart tools, and digital platforms that are not only powerful but also sleek, intuitive, and futuristic. Our mission is to push the boundaries of innovation, building software that adapts, learns, and empowers. We combine creativity, technology, and design to craft solutions that make life easier, work smarter, and bring the future closer. Today at DemLabs, we don't just develop software; we redefine what technology can do. Every project is a step towards smarter, more connected, and more intelligent experiences for users worldwide.
              </p>
            </div>
            <div className="h-64 bg-cyan-500/5 rounded-3xl border border-cyan-500/10 flex items-center justify-center">
               <Icons.Rocket />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-20 border-t border-white/5 text-center bg-[#0D121F]">
          <h3 className="text-2xl font-bold mb-6">Build the future with us.</h3>
          <div className="space-y-2 text-gray-500 mb-12">
            <p>Email: therealluisdem@gmail.com</p>
            <p>GitHub: DemLabs-Inc</p>
            <p>Tel: 08113331113 | 08122771922</p>
          </div>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} DemLabs. All rights reserved.</p>
        </footer>
      </motion.main>
    </AnimatePresence>
  );
};

/* ... (ProjectCard and ServiceCard remain unchanged) ... */

const ProjectCard = ({ title, tag, desc }: any) => (
  <motion.div whileHover={{ y: -10 }} className="group p-8 rounded-2xl bg-[#111625] border border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden">
    <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 block">{tag}</span>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
    <div className="text-cyan-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">View Project →</div>
  </motion.div>
);

const ServiceCard = ({ icon, title, description }: any) => (
  <div className="p-8 rounded-2xl bg-[#111625] border border-white/5 hover:border-cyan-500/30 transition-all group">
    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-black transition-colors">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function Page() {
  return (
    <>
      <SignedOut><AuthGate /></SignedOut>
      <SignedIn><Website /></SignedIn>
    </>
  );
}