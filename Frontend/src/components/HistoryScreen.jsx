import React, { useState } from 'react';

const HistoryScreen = ({ historyList, onSelectBattle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter history list based on search query
  const filteredHistory = historyList.filter((battle) => {
    const query = searchQuery.toLowerCase();
    return (
      battle.prompt.toLowerCase().includes(query) ||
      battle.winner.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading font-black text-2xl tracking-wider text-white uppercase flex items-center gap-2">
            <span>Simulation Log Logs</span>
            <span className="text-neon-purple">⚔️</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Browse and reload previous code battles and Gemini verdicts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            placeholder="Search problems or winners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/45 text-sm text-gray-200 placeholder-gray-600 border border-white/5 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-neon-purple/50 focus:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300"
          />
          {/* Search Icon */}
          <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Grid of battles */}
      {filteredHistory.length === 0 ? (
        <div className="w-full border border-white/5 bg-black/25 rounded-2xl p-16 text-center text-gray-600 select-none flex flex-col items-center justify-center">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h4 className="font-heading text-sm font-bold tracking-widest uppercase text-gray-400">
            No Records Found
          </h4>
          <p className="text-xs text-gray-500 mt-1 max-w-[280px]">
            {searchQuery 
              ? `No logs match the keyword "${searchQuery}". Try searching for another term.` 
              : "No battles have been fought yet. Go to Battle Arena to start a new simulation!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((battle) => {
            const isWinnerMistral = battle.winner === 'Mistral AI';
            const winnerBorderClass = isWinnerMistral 
              ? 'border-l-4 border-l-electric-cyan glow-border-cyan glass-card-cyan' 
              : 'border-l-4 border-l-battle-red glow-border-red glass-card-red';
            
            return (
              <div
                key={battle.id}
                onClick={() => onSelectBattle(battle)}
                className={`flex flex-col justify-between rounded-xl p-5 cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ${winnerBorderClass}`}
              >
                {/* Card Top: Prompt and Date */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-[10px] text-gray-500 font-mono">
                    <span>ID: #{battle.id.substring(0, 8)}</span>
                    <span>{battle.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200 line-clamp-3 leading-relaxed mb-4">
                    "{battle.prompt}"
                  </h4>
                </div>

                {/* Card Bottom: Winner and scores */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-heading">WINNER</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gold-winner text-xs animate-pulse">🏆</span>
                      <span className={`font-heading font-black text-xs uppercase tracking-wide ${
                        isWinnerMistral ? 'text-electric-cyan glow-text-cyan' : 'text-battle-red glow-text-red'
                      }`}>
                        {battle.winner}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500">Combat Scores:</span>
                    <div className="flex gap-2 font-mono font-bold text-gray-300">
                      <span className={isWinnerMistral ? 'text-electric-cyan' : ''}>
                        M: {battle.judge?.scores?.mistral ?? battle.mistral?.score}%
                      </span>
                      <span className="text-gray-600">/</span>
                      <span className={!isWinnerMistral ? 'text-battle-red' : ''}>
                        C: {battle.judge?.scores?.cohere ?? battle.cohere?.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
