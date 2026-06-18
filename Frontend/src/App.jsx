import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import IntroScreen from './components/IntroScreen';
import BattleScene from './components/BattleScene';
import HistoryScreen from './components/HistoryScreen';
import { startBattle, getBattleHistory, getPresetMoves, BATTLE_TIMINGS } from './api/battleApi';

// ─────────────────────────────────────────────────────────────
// App — Root controller
//
// Screen flow:
//   intro → arena (idle → throwing → fighting → judging → winner)
//                  ↕
//              history
// ─────────────────────────────────────────────────────────────
const App = () => {
  // ── UI state ────────────────────────────────────────────────
  const [showIntro, setShowIntro]       = useState(true);
  const [currentScreen, setScreen]      = useState('arena');

  // ── Battle state machine ─────────────────────────────────────
  // 'idle' | 'throwing' | 'fighting' | 'judging' | 'winner'
  const [battleState, setBattleState]   = useState('idle');
  const [activeBattle, setActiveBattle] = useState(null);
  const [historyList, setHistoryList]   = useState([]);
  const [moves, setMoves]               = useState([]);

  // ── Load initial data ─────────────────────────────────────────
  useEffect(() => {
    Promise.all([getBattleHistory(), getPresetMoves()]).then(([history, presetMoves]) => {
      setHistoryList(history);
      setMoves(presetMoves);
    });
  }, []);

  // ── Battle handler ────────────────────────────────────────────
  const triggerBattle = async (prompt) => {
    if (!prompt?.trim()) return;
    if (battleState === 'fighting' || battleState === 'judging') return;

    setScreen('arena');
    setActiveBattle(null);

    // Phase 1: Pokéball throw animation
    setBattleState('throwing');

    await sleep(BATTLE_TIMINGS.POKEBALL_THROW + 1600); // let animation play

    // Phase 2: AIs fighting (generating responses)
    setBattleState('fighting');

    await sleep(BATTLE_TIMINGS.FIGHT);

    // Phase 3: Judging
    setBattleState('judging');

    // Fetch result (mock returns after TOTAL delay, so we fetch in parallel)
    const battlePromise = startBattle(prompt);
    await sleep(BATTLE_TIMINGS.JUDGE);

    const result = await battlePromise;

    // Phase 4: Winner
    setActiveBattle(result);
    setBattleState('winner');
    setHistoryList((prev) => [result, ...prev]);
  };

  const handleSelectMove = (move) => triggerBattle(move.prompt);
  const handleCustomMove = (text) => triggerBattle(text);

  const handleNewBattle = () => {
    if (battleState === 'throwing' || battleState === 'fighting' || battleState === 'judging') return;
    setActiveBattle(null);
    setBattleState('idle');
    setScreen('arena');
  };

  const handleSelectHistoryBattle = (battle) => {
    setActiveBattle(battle);
    setBattleState('winner');
    setScreen('arena');
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 900,
        margin: '0 auto',
        background: '#0a0a1e',
        position: 'relative',
      }}
    >
      {/* Opening intro sequence */}
      {showIntro && (
        <IntroScreen onStart={() => setShowIntro(false)} />
      )}

      {/* Top navigation */}
      <Navbar
        currentScreen={currentScreen}
        setCurrentScreen={(s) => {
          if (battleState !== 'fighting' && battleState !== 'judging') setScreen(s);
        }}
        historyCount={historyList.length}
        onNewBattle={handleNewBattle}
      />

      {/* Main content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* ── SCREEN: Battle Arena ── */}
        {currentScreen === 'arena' && (
          <BattleScene
            battleState={battleState}
            activeBattle={activeBattle}
            moves={moves}
            onSelectMove={handleSelectMove}
            onCustomMove={handleCustomMove}
            onNewBattle={handleNewBattle}
            onShowHistory={() => setScreen('history')}
          />
        )}

        {/* ── SCREEN: History / Pokédex ── */}
        {currentScreen === 'history' && (
          <HistoryScreen
            historyList={historyList}
            onSelectBattle={handleSelectHistoryBattle}
          />
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '2px solid #1a1a38',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--px-font)',
          fontSize: 7,
          color: '#303050',
          letterSpacing: 2,
        }}>
          AI BATTLE ARENA © 2026
        </span>
      </footer>
    </div>
  );
};

// Simple sleep utility
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default App;