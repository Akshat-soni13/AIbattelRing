import React from 'react';

// ─────────────────────────────────────────────────────────────
// Navbar — Pokémon-style top navigation bar
//
// Props:
//   currentScreen  string
//   setCurrentScreen fn
//   historyCount   number
//   onNewBattle    fn
// ─────────────────────────────────────────────────────────────
const Navbar = ({ currentScreen, setCurrentScreen, historyCount = 0, onNewBattle }) => {
  return (
    <nav
      style={{
        background: '#0a0a20',
        borderBottom: '4px solid var(--menu-border)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 54,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
        }}
        onClick={() => { setCurrentScreen('arena'); onNewBattle?.(); }}
      >
        {/* Mini Pokéball */}
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            border: '2px solid #444',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#e03030' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#eee' }} />
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 3, background: '#333', transform: 'translateY(-50%)', zIndex: 1 }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8, height: 8, borderRadius: '50%',
            background: '#eee', border: '2px solid #333',
            zIndex: 2,
          }} />
        </div>
        <span style={{ fontFamily: 'var(--px-font)', fontSize: 9, color: '#ffffff', letterSpacing: 1 }}>
          AI ARENA
        </span>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: 'flex', gap: 4 }}>
        <NavTab
          id="tab-arena"
          label="⚔️ BATTLE"
          active={currentScreen === 'arena'}
          onClick={() => setCurrentScreen('arena')}
        />
        <NavTab
          id="tab-history"
          label={`📜 HISTORY${historyCount ? ` (${historyCount})` : ''}`}
          active={currentScreen === 'history'}
          onClick={() => setCurrentScreen('history')}
        />
      </div>

      {/* New Battle button */}
      <button
        id="btn-navbar-new"
        onClick={() => { setCurrentScreen('arena'); onNewBattle?.(); }}
        style={{
          background: 'transparent',
          border: '2px solid var(--box-border)',
          borderRadius: 6,
          padding: '6px 12px',
          fontFamily: 'var(--px-font)',
          fontSize: 7,
          color: '#a0a8d8',
          cursor: 'pointer',
          letterSpacing: 1,
          transition: 'all 0.15s',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#6080f0';
          e.target.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'var(--box-border)';
          e.target.style.color = '#a0a8d8';
        }}
      >
        + NEW
      </button>
    </nav>
  );
};

const NavTab = ({ id, label, active, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    style={{
      background: active ? '#1e2858' : 'transparent',
      border: 'none',
      borderBottom: active ? '3px solid var(--poke-blue)' : '3px solid transparent',
      padding: '6px 12px',
      fontFamily: 'var(--px-font)',
      fontSize: 7,
      color: active ? '#fff' : '#6068a8',
      cursor: 'pointer',
      letterSpacing: 1,
      transition: 'all 0.15s',
      borderRadius: '4px 4px 0 0',
    }}
    onMouseEnter={(e) => { if (!active) e.target.style.color = '#a0a8d8'; }}
    onMouseLeave={(e) => { if (!active) e.target.style.color = '#6068a8'; }}
  >
    {label}
  </button>
);

export default Navbar;
