import React, { useState, useEffect } from 'react';

const LOADING_STATUSES = [
  "AIs are thinking...",
  "Mistral AI compiling logical AST...",
  "Cohere AI optimizing transformer embeddings...",
  "Synthesizing comparative vectors...",
  "Sending payloads to Gemini AI Judge...",
  "Gemini evaluating complexity benchmarks..."
];

const LoadingScreen = ({ duration = 3500 }) => {
  const [statusIdx, setStatusIdx] = useState(0);
  const [mistralProgress, setMistralProgress] = useState(0);
  const [cohereProgress, setCohereProgress] = useState(0);

  // Cycle loading status text
  useEffect(() => {
    const textInterval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % LOADING_STATUSES.length);
    }, 700);

    return () => clearInterval(textInterval);
  }, []);

  // Animate the progress bars to complete in the given duration
  useEffect(() => {
    const resetTimeout = setTimeout(() => {
      setMistralProgress(0);
      setCohereProgress(0);
    }, 0);

    // Mistral finishes slightly faster than Cohere to add variation
    const mistralDuration = duration - 500;
    const cohereDuration = duration;

    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      const mProg = Math.min(100, Math.floor((elapsed / mistralDuration) * 100));
      const cProg = Math.min(100, Math.floor((elapsed / cohereDuration) * 100));

      setMistralProgress(mProg);
      setCohereProgress(cProg);

      if (elapsed >= duration) {
        clearInterval(progressTimer);
      }
    }, 30);

    return () => {
      clearTimeout(resetTimeout);
      clearInterval(progressTimer);
    };
  }, [duration]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-lg select-none">
      {/* High-tech matrix grid background overlay */}
      <div className="absolute inset-0 arena-grid opacity-20 pointer-events-none" />

      {/* Cybernetic center flare light */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[80px]" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-[800px] w-full px-6">
        
        {/* TOP STATUS SUBTITLE */}
        <div className="mb-4">
          <span className="font-heading text-[10px] font-extrabold tracking-[0.3em] uppercase text-neon-purple shadow-sm bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            SIMULATION ENGAGED
          </span>
        </div>

        {/* COMBAT ROBOTS ANIMATION STAGE */}
        <div className="relative w-full h-[220px] flex items-center justify-between px-16 mb-8 border border-white/5 bg-black/30 rounded-2xl overflow-hidden shadow-2xl">
          {/* Radial light in center of arena */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-red-500/10 rounded-full blur-2xl" />
          
          {/* Left Fighter: Robot 1 (Cyan) */}
          <div className="animate-robot1-punch relative">
            {/* Robot 1 Outer Glow */}
            <div className="absolute inset-0 bg-electric-cyan/25 blur-xl rounded-full scale-75" />
            <svg className="w-28 h-28 text-electric-cyan filter drop-shadow-[0_0_12px_#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <rect x="7" y="10" width="10" height="9" rx="1.5" strokeWidth="1.5" />
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v3M9 10V7h6v3M6 12h2v4H6zm10 0h2v4h-2z" />
              {/* Punching fist helper */}
              <circle cx="19" cy="11" r="1.5" fill="currentColor" className="animate-bounce" />
            </svg>
          </div>

          {/* Central Sparks Clash Visual */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
            <span className="font-heading font-black text-2xl text-white/25 scale-110 tracking-widest block animate-ping">⚡</span>
          </div>

          {/* Right Fighter: Robot 2 (Red) - mirrored by transform scaleX(-1) in index.css */}
          <div className="animate-robot2-punch relative">
            {/* Robot 2 Outer Glow */}
            <div className="absolute inset-0 bg-battle-red/25 blur-xl rounded-full scale-75" />
            <svg className="w-28 h-28 text-battle-red filter drop-shadow-[0_0_12px_#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <rect x="7" y="10" width="10" height="9" rx="1.5" strokeWidth="1.5" />
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v3M9 10V7h6v3M6 12h2v4H6zm10 0h2v4h-2z" />
              {/* Punching fist helper */}
              <circle cx="19" cy="11" r="1.5" fill="currentColor" className="animate-bounce" />
            </svg>
          </div>
        </div>

        {/* LOADING TERMINAL CARD */}
        <div className="w-full bg-black/60 rounded-xl border border-white/10 p-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] glow-border-purple text-center">
          
          {/* Typewriter text */}
          <div className="h-6 flex items-center justify-center mb-6">
            <span className="font-mono text-sm text-gray-300 typewriter-caret pr-1">
              {LOADING_STATUSES[statusIdx]}
            </span>
          </div>

          {/* Progress indicators */}
          <div className="flex flex-col gap-4 max-w-[500px] mx-auto">
            {/* Mistral AI progress */}
            <div>
              <div className="flex justify-between items-end mb-1 text-[10px]">
                <span className="text-electric-cyan font-heading font-semibold tracking-wider">MISTRAL AI PROCESSOR</span>
                <span className="text-electric-cyan font-mono font-bold">{mistralProgress}%</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full border border-white/5 overflow-hidden p-[1px]">
                <div
                  className="h-full rounded-full bg-electric-cyan transition-all duration-300 ease-out shadow-[0_0_6px_#06b6d4]"
                  style={{ width: `${mistralProgress}%` }}
                />
              </div>
            </div>

            {/* Cohere AI progress */}
            <div>
              <div className="flex justify-between items-end mb-1 text-[10px]">
                <span className="text-battle-red font-heading font-semibold tracking-wider">COHERE AI PROCESSOR</span>
                <span className="text-battle-red font-mono font-bold">{cohereProgress}%</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full border border-white/5 overflow-hidden p-[1px]">
                <div
                  className="h-full rounded-full bg-battle-red transition-all duration-300 ease-out shadow-[0_0_6px_#ef4444]"
                  style={{ width: `${cohereProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
