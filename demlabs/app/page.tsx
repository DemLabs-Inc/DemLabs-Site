"use client";

import { useRef, useState, useEffect } from "react";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------- ASSETS & ICONS -------------------- */
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const Icons = {
  Cpu: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-16.5v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  Terminal: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 3-3 3m0-9l3 3 3-3M11.25 16.5h9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Rocket: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41a14.98 14.98 0 00-6.16 12.12 14.98 14.98 0 0012.12-6.16z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12.93 11.07a3 3 0 11-4.26-4.26 3 3 0 014.26 4.26z" /></svg>,
};

/* -------------------- AUTH GATE -------------------- */
const AuthGate = () => (
  <main className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
    <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-[#111625] shadow-2xl">
      <div className="text-center mb-8">
         <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-bold">D</div>
            <h1 className="text-2xl font-bold text-white">DemLabs</h1>
         </div>
        <p className="text-sm text-gray-400">Please sign in to continue</p>
      </div>
      <SignIn routing="hash" appearance={{
        variables: { colorPrimary: '#06b6d4', colorTextOnPrimaryBackground: 'black', colorBackground: '#111625', colorText: 'white', colorInputText: 'white', colorInputBackground: '#1a202e' },
        elements: { card: 'shadow-none p-0', headerTitle: 'hidden', headerSubtitle: 'hidden' }
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
  return (
    <AnimatePresence mode="wait">
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0B0F19] text-white min-h-screen selection:bg-cyan-500/30 scroll-smooth">
        
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 bg-[#0B0F19]/90 backdrop-blur-sm border-b border-white/5">
          <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)]">D</div>
              <span className="text-xl font-bold tracking-tight">DemLabs</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-300">
              {['Services', 'Projects', 'About', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">{l}</a>
              ))}
            </div>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }}/>
          </nav>
        </header>

        {/* Hero */}
        <section id="home" className="relative pt-48 pb-32 max-w-7xl mx-auto px-6 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b2c] border border-cyan-900/30 text-sm font-medium text-cyan-400 mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                DemLabs Inc
              </div>
              <h1 className="text-5xl lg:text-[4.2rem] font-extrabold leading-[1.15] mb-6">
                Innovating <br /> The Future Of <span className="text-cyan-400">Software</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
                We design futuristic AI systems, interfaces, and SaaS platforms with a focus on innovation, appearance, and performance.
              </p>
              <div className="flex gap-4">
                <a href="#services" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-md font-bold transition-all hover:scale-105">Explore Services</a>
                <a href="#about" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-md font-bold transition-all">About Us</a>
              </div>
            </motion.div>
            <div className="relative h-[500px] hidden lg:block">
               <div className="absolute top-0 right-0 w-[90%] h-[400px] bg-[#111625] rounded-xl border border-white/5 shadow-2xl p-6 font-mono text-sm">
                  <div className="text-gray-500 mb-4">// Core Initialization</div>
                  <div className="text-purple-400">await <span className="text-cyan-400">DemLabs.boot()</span>;</div>
               </div>
               <LiveStatusLayer />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-400">Pioneering solutions built in the Demlabs ecosystem.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard 
                title="Agent Hub" 
                tag="AI & Automation" 
                desc="An autonomous ecosystem for intelligent agent coordination and task management."
              />
              <ProjectCard 
                title="Quantum Forge" 
                tag="Developer Tools" 
                desc="Next-gen infrastructure for building high-performance decentralized applications."
              />
              <ProjectCard 
                title="DemLabs OS" 
                tag="Interfaces" 
                desc="A futuristic, sleek operating interface for cross-platform cloud management."
              />
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
                Demplabs is a next-generation technology lab creating intelligent software that transforms the way people interact with technology. We design AI agents, smart tools, and digital platforms that are not only powerful but also sleek, intuitive, and futuristic. Our mission is to push the boundaries of innovation, building software that adapts, learns, and empowers. We combine creativity, technology, and design to craft solutions that make life easier, work smarter, and bring the future closer. Today at Demplabs, we don't just develop software; we redefine what technology can do. Every project is a step towards smarter, more connected, and more intelligent experiences for users worldwide.
              </p>
              <a href="#contact" className="text-cyan-400 font-bold hover:underline">Contact us →</a>
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
            <div className="flex items-center justify-center gap-2 opacity-50">
                <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-black font-bold text-xs">D</div>
                <span className="font-bold">DemLabs</span>
            </div>
            <p className="text-gray-600 text-xs mt-8">© {new Date().getFullYear()} DemLabs. All rights reserved.</p>
        </footer>
      </motion.main>
    </AnimatePresence>
  );
};

const ProjectCard = ({ title, tag, desc }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group p-8 rounded-2xl bg-[#111625] border border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
        <Icons.Code />
    </div>
    <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-4 block">{tag}</span>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
    <div className="text-cyan-400 font-semibold text-sm group-hover:translate-x-2 transition-transform"><a href="https://github.com/DemLabs-Inc">View Project On Github</a></div>
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