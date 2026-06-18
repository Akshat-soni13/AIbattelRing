import React from 'react';

// ─────────────────────────────────────────────────────────────
// HPBar — Pokémon-style HP bar with color transitions
// Props:
//   current  number  — current HP value
//   max      number  — maximum HP value
//   label    bool    — show "HP" label (default true)
// ─────────────────────────────────────────────────────────────
const HPBar = ({ current, max = 100, label = true }) => {
  const pct = Math.max(0, Math.min(100, (current / max) * 100));
  const cls = pct > 50 ? 'hp-high' : pct > 20 ? 'hp-mid' : 'hp-low';

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: '#8890c8', letterSpacing: 1 }}>HP</span>
          <span style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: '#a0a8d8' }}>
            {Math.round(current)}/{max}
          </span>
        </div>
      )}
      <div className="hp-track" style={{ width: '100%', position: 'relative' }}>
        <div
          className={`hp-fill ${cls}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default HPBar;
