import React from 'react';

const Navbar = ({ currentScreen, setCurrentScreen, historyCount, onNewBattle }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-dark/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Left side: Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setCurrentScreen('arena')}
      >
        <div className="relative">
          <svg className="w-8 h-8 text-neon-purple filter drop-shadow-[0_0_8px_#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {/* Neon echo behind icon */}
          <svg className="absolute top-0 left-0 w-8 h-8 text-neon-purple opacity-40 blur-sm scale-110 group-hover:scale-125 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <span className="font-heading font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-electric-cyan to-battle-red glow-text-purple uppercase transition-all duration-300 group-hover:opacity-90">
          AI Battle Arena
        </span>
      </div>

      {/* Middle: Screen Toggle Tabs */}
      <div className="flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
        <button
          onClick={() => setCurrentScreen('arena')}
          className={`px-4 py-1.5 rounded-md font-heading text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
            currentScreen === 'arena'
              ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
              : 'text-gray-400 hover:text-gray-200 border border-transparent'
          }`}
        >
          Battle Arena
        </button>
        <button
          onClick={() => setCurrentScreen('history')}
          className={`px-4 py-1.5 rounded-md font-heading text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
            currentScreen === 'history'
              ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
              : 'text-gray-400 hover:text-gray-200 border border-transparent'
          }`}
        >
          <span>History</span>
          {historyCount > 0 && (
            <span className="bg-neon-purple/30 text-neon-purple border border-neon-purple/50 px-1.5 py-0.5 text-[10px] font-bold rounded-full min-w-4 text-center">
              {historyCount}
            </span>
          )}
        </button>
      </div>

      {/* Right side: New Battle button */}
      <div>
        <button
          onClick={onNewBattle}
          className="relative group overflow-hidden px-5 py-2 rounded-lg bg-gradient-to-r from-neon-purple to-purple-800 font-heading text-xs font-bold tracking-wider text-white uppercase shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Battle
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
