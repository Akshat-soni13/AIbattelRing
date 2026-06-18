import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// BattleMenu — Bottom section of battle screen
//
// Handles dialogue text display and move/action selection.
// Mirrors the classic Pokémon DS bottom-menu layout.
//
// Props:
//   battleState  string   — 'idle'|'throwing'|'fighting'|'judging'|'winner'
//   dialogueText string   — text shown in the dialogue box
//   moves        array    — preset move options
//   onSelectMove fn(move) — called when a preset is selected
//   onCustomMove fn(text) — called when user types custom prompt
//   winnerName   string   — name of winner (shown in winner state)
// ─────────────────────────────────────────────────────────────

// Typing-effect text display
const TypewriterText = ({ text, speed = 28 }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    idx.current = 0;
    const iv = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        setDone(true);
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && (
        <span style={{ animation: 'blink-fast 0.5s infinite', opacity: 1 }}>▮</span>
      )}
    </span>
  );
};

const BattleMenu = ({
  battleState,
  dialogueText,
  moves = [],
  onSelectMove,
  onCustomMove,
  winnerName,
}) => {
  const [menuMode, setMenuMode] = useState('main');   // main | fight | custom
  const [customText, setCustomText] = useState('');
  const isActive = battleState === 'idle';
  const isWinner = battleState === 'winner';

  // Reset menu to main when battle starts
  useEffect(() => {
    if (!isActive) {
      setMenuMode('main');
      setCustomText('');
    }
  }, [isActive]);

  const handleCustomSubmit = () => {
    if (customText.trim()) {
      onCustomMove?.(customText.trim());
      setCustomText('');
      setMenuMode('main');
    }
  };

  // ── Main Menu (FIGHT / BAG / POKÉMON / RUN) ────────────────
  const MainMenu = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <button
        id="btn-fight"
        className="menu-btn fight"
        onClick={() => setMenuMode('fight')}
        disabled={!isActive}
      >
        <span style={{ fontSize: 18 }}>⚔️</span>
        <span>FIGHT</span>
      </button>
      <button
        id="btn-custom"
        className="menu-btn"
        onClick={() => setMenuMode('custom')}
        disabled={!isActive}
        style={{ borderColor: '#8848c8', background: 'rgba(136,72,200,0.1)' }}
      >
        <span style={{ fontSize: 18 }}>✏️</span>
        <span>CUSTOM</span>
      </button>
      <button
        id="btn-history"
        className="menu-btn"
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        disabled
      >
        <span style={{ fontSize: 18 }}>📜</span>
        <span>HISTORY</span>
      </button>
      <button
        id="btn-run"
        className="menu-btn"
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        disabled
      >
        <span style={{ fontSize: 18 }}>🏃</span>
        <span>RUN</span>
      </button>
    </div>
  );

  // ── Move List (preset prompts as "moves") ──────────────────
  const FightMenu = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {moves.map((move) => {
          const typeClass = `type-${(move.type || 'special').toLowerCase()}`;
          return (
            <button
              key={move.id}
              id={`move-${move.id}`}
              className="move-btn"
              onClick={() => {
                onSelectMove?.(move);
                setMenuMode('main');
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>{move.icon}</span>
                <span
                  className={typeClass}
                  style={{
                    fontFamily: 'var(--px-font)',
                    fontSize: 6,
                    padding: '1px 4px',
                    borderRadius: 2,
                    color: '#fff',
                    background: move.typeColor,
                  }}
                >
                  {move.type || 'SPECIAL'}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--px-font)', fontSize: 8, marginBottom: 3 }}>
                {move.label}
              </div>
              <div style={{ fontFamily: 'var(--px-font)', fontSize: 6, color: '#8890c8' }}>
                PP {move.pp || 10}/{move.pp || 10}
              </div>
            </button>
          );
        })}
      </div>
      <button
        id="btn-back"
        className="move-btn"
        onClick={() => setMenuMode('main')}
        style={{ fontSize: 8, textAlign: 'center', padding: '8px' }}
      >
        ← BACK
      </button>
    </div>
  );

  // ── Custom Input (name-entry style) ───────────────────────
  const CustomMenu = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontFamily: 'var(--px-font)', fontSize: 8, color: '#a0a8d8', marginBottom: 4 }}>
        TYPE YOUR CHALLENGE:
      </div>
      <textarea
        id="custom-prompt-input"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        placeholder="e.g. Write a binary search in Python..."
        rows={3}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCustomSubmit();
          }
        }}
        style={{
          width: '100%',
          background: '#101028',
          border: '2px solid var(--box-border)',
          borderRadius: 4,
          padding: '8px 10px',
          fontFamily: 'var(--px-font)',
          fontSize: 8,
          color: '#fff',
          resize: 'none',
          outline: 'none',
          lineHeight: 1.8,
        }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          id="btn-send-custom"
          className="menu-btn fight"
          onClick={handleCustomSubmit}
          disabled={!customText.trim()}
          style={{ flex: 2, padding: '10px', flexDirection: 'row', gap: 6, justifyContent: 'center' }}
        >
          <span>⚔️</span>
          <span>BATTLE!</span>
        </button>
        <button
          id="btn-back-custom"
          className="menu-btn"
          onClick={() => setMenuMode('main')}
          style={{ flex: 1, padding: '10px', flexDirection: 'row', gap: 4, justifyContent: 'center' }}
        >
          ← BACK
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="battle-menu-area"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 12,
        padding: '14px 16px',
        minHeight: 130,
        alignItems: 'stretch',
      }}
    >
      {/* Left: Dialogue Box */}
      <div className="dialogue-box">
        <div style={{ fontFamily: 'var(--px-font)', fontSize: 9, lineHeight: 2.2, color: '#fff' }}>
          <TypewriterText key={dialogueText} text={dialogueText} speed={30} />
        </div>

        {/* Scroll arrow */}
        {battleState !== 'idle' && (
          <div style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontFamily: 'var(--px-font)',
            fontSize: 9,
            color: '#6068a8',
            animation: 'blink-fast 0.8s infinite',
          }}>
            ▼
          </div>
        )}
      </div>

      {/* Right: Action Menu */}
      <div style={{ width: 200 }}>
        {battleState === 'idle' && menuMode === 'main'   && <MainMenu />}
        {battleState === 'idle' && menuMode === 'fight'  && <FightMenu />}
        {battleState === 'idle' && menuMode === 'custom' && <CustomMenu />}

        {/* During battle — show loading */}
        {(battleState === 'throwing' || battleState === 'fighting' || battleState === 'judging') && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 10,
          }}>
            <div style={{ fontSize: 28, animation: 'pokemon-victory 1.2s ease-in-out infinite' }}>⚡</div>
            <div style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: '#8890c8', textAlign: 'center', lineHeight: 2 }}>
              {battleState === 'throwing' ? 'SENDING...' : battleState === 'fighting' ? 'THINKING...' : 'JUDGING...'}
            </div>
          </div>
        )}

        {/* Winner state */}
        {isWinner && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{ fontSize: 28 }}>🏆</div>
            <div style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: 'var(--poke-yellow)', textAlign: 'center', lineHeight: 2 }}>
              {winnerName?.toUpperCase()}<br />WINS!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleMenu;
