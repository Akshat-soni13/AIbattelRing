import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FighterCard from './components/FighterCard';
import BattleRing from './components/BattleRing';
import JudgePanel from './components/JudgePanel';
import LoadingScreen from './components/LoadingScreen';
import HistoryScreen from './components/HistoryScreen';
import { presetBattles, generateProceduralBattle } from './mockData';

const generateConfettiParticles = () => {
  const colors = ['#8b5cf6', '#06b6d4', '#ef4444', '#f59e0b', '#10b981', '#ec4899'];
  const particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      id: i,
      left: Math.random() * 100, // percentage width
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6, // 6px - 14px
      delay: Math.random() * 1.5, // delay before starting fall
      duration: Math.random() * 2 + 2, // fall speed 2s - 4s
    });
  }
  return particles;
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('arena'); // 'arena' | 'history'
  const [battleState, setBattleState] = useState('idle'); // 'idle' | 'fighting' | 'judging' | 'winner'
  const [promptInput, setPromptInput] = useState('');
  const [activeBattle, setActiveBattle] = useState(null);
  const [historyList, setHistoryList] = useState(presetBattles);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);

  // Generate confetti particles
  const triggerConfetti = () => {
    setConfettiParticles(generateConfettiParticles());
    setShowConfetti(true);
    
    // Disable confetti after 4.5s loop
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiParticles([]);
    }, 4500);
  };

  const startBattle = (customPrompt = '') => {
    const promptToUse = (customPrompt || promptInput).trim();
    if (!promptToUse) return;

    // Transition to loading phase
    setBattleState('fighting');
    
    // Simulate fighter stage (thinking & writing solutions)
    setTimeout(() => {
      setBattleState('judging');

      // Simulate judging stage (Gemini evaluating responses)
      setTimeout(() => {
        // Resolve result: check if it's one of the preset prompts
        const matchedPreset = presetBattles.find(
          (b) => b.prompt.toLowerCase() === promptToUse.toLowerCase()
        );

        let battleResult;
        if (matchedPreset) {
          // Copy preset so we get new timestamps/ids
          battleResult = {
            ...matchedPreset,
            id: `battle-${Date.now()}`,
            date: new Date().toISOString().split('T')[0]
          };
        } else {
          // Generates responsive mock response
          battleResult = generateProceduralBattle(promptToUse);
        }

        // Add to history list
        setHistoryList((prev) => [battleResult, ...prev]);
        setActiveBattle(battleResult);
        setBattleState('winner');
        setCurrentScreen('arena');
        triggerConfetti();
      }, 1500);
    }, 2000);
  };

  const handleSelectPreset = (preset) => {
    if (battleState === 'fighting' || battleState === 'judging') return;
    setPromptInput(preset.prompt);
    startBattle(preset.prompt);
  };

  const handleNewBattle = () => {
    if (battleState === 'fighting' || battleState === 'judging') return;
    setPromptInput('');
    setActiveBattle(null);
    setBattleState('idle');
    setCurrentScreen('arena');
  };

  const handleSelectHistoryBattle = (battle) => {
    setActiveBattle(battle);
    setBattleState('winner');
    setCurrentScreen('arena');
  };

  // Determine theme colors of active battle
  const winnerName = activeBattle?.winner || '';
  const mistralScore = activeBattle?.mistral?.score || 0;
  const cohereScore = activeBattle?.cohere?.score || 0;

  return (
    <div className="relative min-h-screen flex flex-col max-w-[1440px] mx-auto bg-dark-bg text-gray-200">
      
      {/* Confetti Visual Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 z-40 overflow-hidden pointer-events-none">
          {confettiParticles.map((p) => (
            <div
              key={p.id}
              className="confetti rounded-sm"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 6px ${p.color}`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        historyCount={historyList.length}
        onNewBattle={handleNewBattle}
      />

      {/* Loading Overlay */}
      {(battleState === 'fighting' || battleState === 'judging') && (
        <LoadingScreen duration={3500} />
      )}

      {/* Main Container Content */}
      <main className="flex-1 w-full relative">
        
        {/* Winner announcement banner */}
        {battleState === 'winner' && activeBattle && (
          <div className="absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none animate-[slide-down_0.5s_cubic-bezier(0.18,0.89,0.32,1.28)]">
            <div className="bg-gradient-to-r from-gold-winner/90 to-amber-600/90 text-black font-heading font-black text-sm px-8 py-2.5 rounded-b-xl shadow-[0_4px_20px_rgba(245,158,11,0.4)] flex items-center gap-2 select-none border-x border-b border-gold-winner/60 backdrop-blur-sm pointer-events-auto">
              <span>👑 COMBAT ENDED:</span>
              <span className="uppercase tracking-wider font-extrabold">{activeBattle.winner}</span>
              <span>DECLARED THE WINNER!</span>
            </div>
          </div>
        )}

        {/* SCREEN 1: BATTLE ARENA */}
        {currentScreen === 'arena' && (
          <div className="w-full max-w-[1280px] mx-auto px-6 py-8 flex flex-col gap-6">
            
            {/* Arena Header Title */}
            <div className="text-center mb-2">
              <h1 className="font-heading font-black text-4xl tracking-widest text-white uppercase flex items-center justify-center gap-2 select-none">
                <span className="text-neon-purple filter drop-shadow-[0_0_5px_#8b5cf6]">⚔️</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-purple to-white">
                  AI Battle Arena
                </span>
                <span className="text-electric-cyan filter drop-shadow-[0_0_5px_#06b6d4]">⚔️</span>
              </h1>
              <p className="text-[11px] text-gray-500 font-heading tracking-widest uppercase mt-1">
                The absolute sandbox for LLM logic benchmarks
              </p>
            </div>

            {/* Main Stage Grid: Fighter Left | Ring Center | Fighter Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[420px]">
              
              {/* Left Side: Mistral Card */}
              <div className="lg:col-span-4 flex justify-center">
                <FighterCard
                  name="Mistral AI"
                  themeColor="cyan"
                  response={activeBattle?.mistral?.response}
                  score={mistralScore}
                  isRight={false}
                  isFighting={battleState === 'fighting'}
                  winnerName={activeBattle?.winner}
                />
              </div>

              {/* Center Column: Battle Ring */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center py-4">
                <BattleRing
                  battleState={battleState}
                  winnerName={activeBattle?.winner}
                />
              </div>

              {/* Right Side: Cohere Card */}
              <div className="lg:col-span-4 flex justify-center">
                <FighterCard
                  name="Cohere AI"
                  themeColor="red"
                  response={activeBattle?.cohere?.response}
                  score={cohereScore}
                  isRight={true}
                  isFighting={battleState === 'fighting'}
                  winnerName={activeBattle?.winner}
                />
              </div>

            </div>

            {/* Bottom Section: Judge Panel */}
            <div className="w-full">
              <JudgePanel
                battleState={battleState}
                winnerName={winnerName}
                scores={activeBattle?.judge?.scores}
                reasoning={activeBattle?.judge?.reasoning}
              />
            </div>

            {/* Input & Presets Controls Section */}
            {battleState !== 'fighting' && battleState !== 'judging' && (
              <div className="w-full max-w-[860px] mx-auto mt-6 flex flex-col gap-4">
                
                {/* Presets Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-heading font-bold uppercase tracking-wider select-none">
                    Select a Preset Challenge:
                  </span>
                  {presetBattles.map((pb) => (
                    <button
                      key={pb.id}
                      onClick={() => handleSelectPreset(pb)}
                      className="px-3 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-gray-400 hover:text-white hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300 font-heading cursor-pointer"
                    >
                      {pb.id === 'fibonacci-python' && '🐍 Fibonacci'}
                      {pb.id === 'poetry-ai-conflict' && '✍️ Cyber Poem'}
                      {pb.id === 'quantum-10-years-old' && '⚛️ Quantum Coin'}
                    </button>
                  ))}
                </div>

                {/* Floating Input Panel */}
                <div className="relative rounded-xl border border-white/10 bg-black/60 p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row gap-3 items-end">
                  <div className="flex-1 w-full">
                    <textarea
                      rows="2"
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="Type a coding problem or question (e.g. 'Write a Javascript function to filter primes...')"
                      className="w-full bg-transparent border-0 resize-none font-body text-xs text-gray-200 focus:outline-none placeholder-gray-600 custom-scrollbar pr-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          startBattle();
                        }
                      }}
                    />
                  </div>

                  <button
                    onClick={() => startBattle()}
                    disabled={!promptInput.trim()}
                    className={`px-5 py-3 rounded-lg font-heading text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer ${
                      promptInput.trim()
                        ? 'bg-gradient-to-r from-neon-purple to-purple-800 text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95'
                        : 'bg-gray-800 text-gray-500 border border-white/5 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <span>START BATTLE</span>
                    <span>⚔️</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* SCREEN 2: HISTORY LIST */}
        {currentScreen === 'history' && (
          <HistoryScreen
            historyList={historyList}
            onSelectBattle={handleSelectHistoryBattle}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-4 text-center select-none text-[10px] text-gray-600">
        <span className="font-heading tracking-widest uppercase">
          AI Battle Arena © 2026 — Decoded Operations
        </span>
      </footer>

    </div>
  );
};

export default App;