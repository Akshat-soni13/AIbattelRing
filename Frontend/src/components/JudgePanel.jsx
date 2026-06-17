import React from 'react';

const getSessionId = (reasoning) => {
  if (!reasoning) return 1000;
  const hash = reasoning.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 1000 + (hash % 8000);
};

const JudgePanel = ({ battleState, winnerName, scores, reasoning }) => {
  const isEvaluating = battleState === 'judging';
  const sessionId = getSessionId(reasoning);
  
  if (battleState === 'idle' || battleState === 'fighting') {
    return (
      <div className="w-full max-w-[860px] mx-auto mt-6 p-4 rounded-xl border border-white/5 bg-black/40 text-center select-none">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span className="font-heading text-xs font-bold tracking-widest uppercase">
            GEMINI AI ARBITRATOR — STANDBY
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[860px] mx-auto mt-6 rounded-xl border border-purple-500/20 bg-dark/80 backdrop-blur-md glow-border-purple overflow-hidden transition-all duration-700 transform translate-y-0 opacity-100`}>
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-black to-cyan-950/40 border-b border-white/5 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Gemini Gavel Avatar */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-neon-purple to-electric-cyan flex items-center justify-center p-[1px] shadow-[0_0_12px_rgba(139,92,246,0.3)]">
            <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
              <svg className={`w-5 h-5 text-gold-winner ${isEvaluating ? 'animate-gavel' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-extrabold text-sm tracking-widest uppercase text-white flex items-center gap-2">
              Gemini AI Judge
              <span className="inline-block px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-[9px] text-neon-purple font-bold tracking-normal uppercase animate-pulse">
                Active
              </span>
            </h3>
            <p className="text-[10px] text-gray-400">Verdicts are computed based on syntax, execution speed, and style.</p>
          </div>
        </div>
        
        {/* Right Info */}
        <div className="text-right">
          <span className="font-mono text-[10px] text-gray-500">SESSION: #AR-{sessionId}</span>
        </div>
      </div>

      {/* Main Verdict Panel Body */}
      <div className="p-6">
        {isEvaluating ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            {/* Spinning active loading radar */}
            <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-neon-purple/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-electric-cyan border-t-transparent animate-spin" />
              <div className="w-8 h-8 rounded-full bg-neon-purple/10 flex items-center justify-center">
                <span className="text-lg">⚖️</span>
              </div>
            </div>
            <h4 className="font-heading font-black text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-electric-cyan uppercase animate-pulse">
              ANALYZING RESPONSES...
            </h4>
            <p className="text-xs text-gray-400 mt-2 max-w-[400px]">
              Comparing algorithmic complexity, structural logic, and clean coding standards from both engines.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Score Comparison Display Card */}
            <div className="flex flex-col justify-center items-center md:w-[260px] bg-black/40 rounded-lg border border-white/5 p-4 text-center">
              <span className="font-heading text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-4">VERDICT CARD</span>
              
              <div className="flex items-center gap-4 w-full justify-center">
                {/* Mistral */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-medium">Mistral</span>
                  <span className={`font-heading font-black text-3xl mt-1 select-none text-electric-cyan glow-text-cyan`}>
                    {scores?.mistral}
                  </span>
                </div>
                
                {/* VS Divider */}
                <div className="text-gray-600 font-heading text-sm self-end pb-1.5">vs</div>
                
                {/* Cohere */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 font-medium">Cohere</span>
                  <span className={`font-heading font-black text-3xl mt-1 select-none text-battle-red glow-text-red`}>
                    {scores?.cohere}
                  </span>
                </div>
              </div>

              {/* Dynamic Winner banner indicator inside score block */}
              <div className={`w-full mt-5 py-1.5 rounded font-heading text-[10px] font-extrabold tracking-widest uppercase border ${
                winnerName === 'Mistral AI'
                  ? 'bg-electric-cyan/10 border-electric-cyan/30 text-electric-cyan shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : 'bg-battle-red/10 border-battle-red/30 text-battle-red shadow-[0_0_10px_rgba(239,68,68,0.15)]'
              }`}>
                {winnerName} Wins
              </div>
            </div>

            {/* Reasoning Text Box */}
            <div className="flex-1 flex flex-col bg-black/60 rounded-lg border border-white/5 overflow-hidden">
              <div className="bg-black/40 border-b border-white/5 px-4 py-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-winner animate-pulse" />
                <span className="font-heading text-[10px] text-gold-winner font-bold tracking-widest uppercase">DECISION ANALYSIS</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto font-body text-xs text-gray-300 leading-relaxed max-h-[160px] custom-scrollbar selection:bg-purple-500/30 selection:text-white whitespace-pre-line">
                {reasoning}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JudgePanel;
