import React, { useEffect, useState } from 'react';
import HPBar from './HPBar';

// ─────────────────────────────────────────────────────────────
// PokemonDisplay — One Pokémon on the battle field
//
// Props:
//   side        'player' | 'enemy'
//   name        string   — Pokémon name (e.g. "MISTRAL")
//   spriteUrl   string   — URL to sprite image
//   level       number
//   hp          number   — current HP (0-100)
//   maxHP       number   — max HP (default 100)
//   score       number   — battle score (optional)
//   state       string   — 'idle'|'appear'|'fighting'|'winner'|'loser'
//   typeColor   string   — accent color hex
//   typeName    string   — type label e.g. "PSYCHIC"
// ─────────────────────────────────────────────────────────────
const PokemonDisplay = ({
  side = 'player',
  name = 'UNKNOWN',
  spriteUrl,
  level = 50,
  hp = 100,
  maxHP = 100,
  score,
  state = 'idle',
  typeColor = '#4890f0',
  typeName = '?',
}) => {
  const isPlayer = side === 'player';

  // Determine sprite animation
  const getSpriteAnimation = () => {
    if (state === 'appear')   return 'pokemon-appear 0.8s ease-out both';
    if (state === 'fighting') return 'pokemon-shake 0.6s ease-in-out 3';
    if (state === 'winner')   return 'pokemon-victory 1.5s ease-in-out infinite';
    if (state === 'loser')    return 'faint 0.8s ease-in forwards';
    return 'none';
  };

  // Status box on player side is bottom-right, enemy is top-left
  const statusBox = (
    <div
      className="poke-box"
      style={{
        minWidth: 180,
        padding: '10px 14px',
        animation: state === 'appear' ? 'slide-up-in 0.5s ease-out 0.3s both' : 'none',
      }}
    >
      {/* Name + Level row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--px-font)', fontSize: 9, color: '#ffffff', letterSpacing: 1 }}>
          {name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Type badge */}
          <span
            className={`type-${typeName.toLowerCase()}`}
            style={{
              fontFamily: 'var(--px-font)',
              fontSize: 6,
              padding: '2px 5px',
              borderRadius: 3,
              background: typeColor,
              color: '#fff',
              letterSpacing: 0.5,
            }}
          >
            {typeName}
          </span>
          <span style={{ fontFamily: 'var(--px-font)', fontSize: 8, color: '#a0a8d8' }}>
            Lv{level}
          </span>
        </div>
      </div>

      {/* HP Bar */}
      <HPBar current={hp} max={maxHP} label />

      {/* Score (shown after battle) */}
      {score !== undefined && (
        <div style={{
          marginTop: 6,
          fontFamily: 'var(--px-font)',
          fontSize: 8,
          color: typeColor,
          textAlign: 'right',
          letterSpacing: 1,
        }}>
          SCORE: {score}/100
        </div>
      )}
    </div>
  );

  const sprite = (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: isPlayer ? 160 : 140,
      }}
    >
      {spriteUrl ? (
        <img
          src={spriteUrl}
          alt={name}
          style={{
            height: isPlayer ? 155 : 135,
            width: 'auto',
            imageRendering: 'pixelated',
            transform: isPlayer ? 'scaleX(1)' : 'scaleX(1)',
            filter: state === 'loser' ? 'grayscale(1) brightness(0.4)' : 'drop-shadow(0 6px 12px rgba(0,0,0,0.5))',
            animation: getSpriteAnimation(),
          }}
        />
      ) : (
        /* Fallback silhouette */
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: typeColor,
          opacity: 0.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
        }}>
          ?
        </div>
      )}
    </div>
  );

  // Layout: player = status bottom-right, sprite bottom-left
  //         enemy  = status top-left, sprite top-right
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isPlayer ? 'row' : 'row-reverse',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        padding: isPlayer ? '0 12px 16px 12px' : '16px 12px 0 12px',
        gap: 8,
      }}
    >
      {sprite}
      {statusBox}
    </div>
  );
};

export default PokemonDisplay;
