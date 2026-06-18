import React, { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────
// PokeballAnimation — Full-screen pokéball throw overlay
// Shown when a battle starts
//
// Props:
//   onComplete  fn  — called when animation finishes
// ─────────────────────────────────────────────────────────────

const Pokeball = ({ style = {}, size = 60 }) => (
  <div
    className="pokeball"
    style={{ width: size, height: size, ...style }}
  >
    <div className="pokeball-top" />
    <div className="pokeball-bot" />
    <div className="pokeball-band" />
    <div className="pokeball-center" />
  </div>
);

const PokeballAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState('throw');  // throw → flash → appear

  useEffect(() => {
    // Phase 1: Pokéballs fly across screen (1.4s)
    const t1 = setTimeout(() => setPhase('flash'), 1400);
    // Phase 2: Flash effect (600ms)
    const t2 = setTimeout(() => setPhase('appear'), 2000);
    // Phase 3: Pokémon appear (800ms) → done
    const t3 = setTimeout(() => onComplete?.(), 2800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* White flash on phase change */}
      {phase === 'flash' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'white',
            animation: 'pokeball-flash 0.15s ease-out 3',
            zIndex: 10,
          }}
        />
      )}

      {/* Left Pokéball (for Mistral / player) */}
      {phase === 'throw' && (
        <div
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '10%',
            animation: 'throw-right 1.4s cubic-bezier(0.4,0,0.8,1) forwards',
          }}
        >
          <Pokeball size={56} />
        </div>
      )}

      {/* Right Pokéball (for Cohere / opponent) */}
      {phase === 'throw' && (
        <div
          style={{
            position: 'absolute',
            bottom: '58%',
            right: '10%',
            animation: 'throw-left 1.4s cubic-bezier(0.4,0,0.8,1) 0.1s forwards',
          }}
        >
          <Pokeball size={48} />
        </div>
      )}

      {/* "GO! MISTRAL!" text */}
      {phase === 'throw' && (
        <div style={{
          position: 'absolute',
          bottom: '28%',
          left: '5%',
          fontFamily: 'var(--px-font)',
          fontSize: 9,
          color: '#60a0ff',
          textShadow: '0 0 8px rgba(96,160,255,0.8)',
          animation: 'slide-up-in 0.4s ease-out',
          letterSpacing: 1,
        }}>
          GO! MISTRAL!
        </div>
      )}
      {phase === 'throw' && (
        <div style={{
          position: 'absolute',
          top: '22%',
          right: '5%',
          fontFamily: 'var(--px-font)',
          fontSize: 9,
          color: '#ff8060',
          textShadow: '0 0 8px rgba(255,128,96,0.8)',
          animation: 'slide-down-in 0.4s ease-out',
          letterSpacing: 1,
        }}>
          GO! COHERE!
        </div>
      )}
    </div>
  );
};

export default PokeballAnimation;
