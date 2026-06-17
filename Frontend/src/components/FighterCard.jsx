import React, { useState, useEffect } from 'react';

const FighterCard = ({ name, themeColor, response, score, isRight, isFighting, winnerName }) => {
  const [copied, setCopied] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  // Animates the score counting up when score updates
  useEffect(() => {
    if (score) {
      const resetTimeout = setTimeout(() => {
        setDisplayScore(0);
      }, 0);

      let start = 0;
      const duration = 1000; // 1s
      const increment = score / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= score) {
          setDisplayScore(score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);

      return () => {
        clearTimeout(resetTimeout);
        clearInterval(timer);
      };
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayScore(0);
      }, 0);
      return () => clearTimeout(resetTimeout);
    }
  }, [score]);

  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isWinner = winnerName === name;
  const isThemeCyan = themeColor === 'cyan';
  const accentClass = isThemeCyan ? 'text-electric-cyan' : 'text-battle-red';
  const borderGlowClass = isThemeCyan ? 'glow-border-cyan' : 'glow-border-red';
  const bgClass = isThemeCyan ? 'glass-card-cyan' : 'glass-card-red';
  const barColorClass = isThemeCyan ? 'bg-gradient-to-r from-cyan-600 to-electric-cyan' : 'bg-gradient-to-r from-red-600 to-battle-red';
  const barShadowClass = isThemeCyan ? 'shadow-[0_0_12px_#06b6d4]' : 'shadow-[0_0_12px_#ef4444]';

  return (
    <div className={`flex flex-col w-full max-w-[420px] rounded-xl p-5 ${bgClass} ${borderGlowClass} relative overflow-hidden transition-all duration-500 ${isWinner ? 'scale-[1.02] shadow-[0_0_25px_rgba(245,158,11,0.25)] border-gold-winner/50' : ''}`}>
      {/* Golden Highlight for Winner */}
      {isWinner && (
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold-winner to-transparent animate-pulse" />
      )}

      {/* Header Profile Info (Mirrored for right side) */}
      <div className={`flex items-center gap-4 mb-4 ${isRight ? 'flex-row-reverse text-right' : 'text-left'}`}>
        {/* Avatar Container with glow */}
        <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center border bg-black/45 shadow-inner transition-transform duration-300 hover:scale-105 ${isThemeCyan ? 'border-electric-cyan/30 text-electric-cyan' : 'border-battle-red/30 text-battle-red'}`}>
          {/* Neon Ring behind Avatar */}
          <div className={`absolute inset-0 rounded-xl opacity-20 blur-sm scale-105 ${isThemeCyan ? 'bg-electric-cyan shadow-[0_0_10px_#06b6d4]' : 'bg-battle-red shadow-[0_0_10px_#ef4444]'}`} />
          
          {/* Avatar Robot SVG */}
          <svg className="w-10 h-10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>

        {/* Model Meta */}
        <div className="flex-1">
          <span className={`font-heading text-xs font-bold tracking-widest uppercase ${accentClass}`}>
            {isThemeCyan ? 'MISTRAL CORE v3.1' : 'COHERE NEURAL v2.5'}
          </span>
          <h3 className="text-xl font-heading font-black text-white tracking-wide mt-0.5 flex items-center gap-2 justify-start select-none">
            {name}
            {isWinner && (
              <span className="text-gold-winner text-base animate-bounce">🏆</span>
            )}
          </h3>
        </div>
      </div>

      {/* Health / Score Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1 text-xs">
          <span className="text-gray-400 font-heading tracking-wider uppercase text-[10px]">COMBAT SCORE</span>
          <span className={`font-heading font-bold text-sm tracking-wider ${accentClass}`}>
            {score ? `${displayScore}%` : '0%'}
          </span>
        </div>
        <div className="w-full h-3 bg-black/50 rounded-full border border-white/5 p-[2px] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${barColorClass} ${barShadowClass}`}
            style={{ width: score ? `${displayScore}%` : '0%' }}
          />
        </div>
      </div>

      {/* Solution Response Terminal Container */}
      <div className="flex-1 flex flex-col min-h-[320px] bg-black/60 rounded-lg border border-white/10 overflow-hidden relative">
        {/* Terminal Header */}
        <div className="bg-black/80 border-b border-white/5 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-[10px] text-gray-500 select-none">
              {isThemeCyan ? 'mistral_agent.py' : 'cohere_synthesizer.js'}
            </span>
          </div>
          
          {/* Copy Button */}
          {response && (
            <button
              onClick={copyToClipboard}
              className="p-1 rounded hover:bg-white/5 text-gray-500 hover:text-white transition-colors duration-200"
              title="Copy code"
            >
              {copied ? (
                <span className="text-[10px] font-heading font-semibold text-green-400 px-1">COPIED!</span>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className={`flex-1 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed text-gray-300 custom-scrollbar ${isThemeCyan ? 'custom-scrollbar-cyan' : 'custom-scrollbar-red'}`}>
          {isFighting ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-10">
              {/* Pulsing Loading Spinner */}
              <div className="relative w-10 h-10">
                <div className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${isThemeCyan ? 'border-electric-cyan' : 'border-battle-red'}`} />
                <div className={`absolute inset-1.5 rounded-full border border-b-transparent animate-spin-slow opacity-60 ${isThemeCyan ? 'border-electric-cyan' : 'border-battle-red'}`} />
              </div>
              <span className={`text-[10px] font-heading font-medium tracking-widest uppercase animate-pulse ${accentClass}`}>
                Generating Solution...
              </span>
            </div>
          ) : response ? (
            <div className="whitespace-pre-wrap select-text selection:bg-purple-500/30 selection:text-white">
              {response}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-600 select-none">
              <svg className="w-12 h-12 mb-3 opacity-30 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-heading text-[10px] font-bold tracking-widest uppercase">
                Awaiting Challenge Input
              </p>
              <p className="text-[10px] mt-1 opacity-70">
                Type a problem below and trigger the combat engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FighterCard;
