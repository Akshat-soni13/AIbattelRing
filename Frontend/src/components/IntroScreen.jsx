import React, { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// IntroScreen — Classic Pokémon opening title sequence
// ─────────────────────────────────────────────────────────────
const IntroScreen = ({ onStart }) => {
  const [phase, setPhase] = useState('dark');   // dark → logo → sub → ready
  const [blink, setBlink] = useState(true);
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      dur: 1.5 + Math.random() * 2,
    }))
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'),  600);
    const t2 = setTimeout(() => setPhase('sub'),   1800);
    const t3 = setTimeout(() => setPhase('ready'), 3200);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase !== 'ready') return;
    const iv = setInterval(() => setBlink((b) => !b), 520);
    return () => clearInterval(iv);
  }, [phase]);

  return (
    <div className="intro-screen" onClick={phase === 'ready' ? onStart : undefined}>
      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Stars */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
            opacity: 0,
            animation: `blink-fast ${s.dur}s ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          zIndex: 2,
          transition: 'opacity 0.8s, transform 0.8s',
          opacity: phase === 'dark' ? 0 : 1,
          transform: phase === 'dark' ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        {/* Pokéball */}
        <div style={{ position: 'relative', animation: phase === 'logo' ? 'pokemon-appear 0.8s ease-out' : 'pokemon-victory 2s ease-in-out infinite', animationDelay: '0.2s' }}>
          <div className="pokeball" style={{ width: 100, height: 100, boxShadow: '0 0 40px rgba(248,64,64,0.5), 0 0 80px rgba(248,64,64,0.2)' }}>
            <div className="pokeball-top" />
            <div className="pokeball-bot" />
            <div className="pokeball-band" />
            <div className="pokeball-center" style={{ boxShadow: '0 0 10px rgba(255,255,255,0.8)' }} />
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="intro-title shimmer-text"
            style={{ fontSize: 'clamp(18px, 4vw, 30px)', lineHeight: 1.6 }}
          >
            AI BATTLE
          </div>
          <div
            className="intro-title"
            style={{ fontSize: 'clamp(18px, 4vw, 30px)', marginTop: 8, color: '#fff', textShadow: '2px 2px 0 #000, 4px 4px 0 #000' }}
          >
            ARENA
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            transition: 'opacity 0.7s',
            opacity: phase === 'logo' || phase === 'dark' ? 0 : 1,
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: 'var(--px-font)', fontSize: 8, color: '#a0a8d8', letterSpacing: 2, lineHeight: 2.2 }}>
            MISTRAL AI &nbsp;⚔️&nbsp; COHERE AI
          </div>
          <div style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: '#505870', marginTop: 6, letterSpacing: 1 }}>
            POWERED BY GEMINI JUDGE
          </div>
        </div>

        {/* Press Start */}
        <div
          style={{
            marginTop: 8,
            opacity: phase === 'ready' ? (blink ? 1 : 0) : 0,
            transition: 'opacity 0.15s',
          }}
        >
          <div style={{ fontFamily: 'var(--px-font)', fontSize: 10, color: 'var(--poke-yellow)', letterSpacing: 3 }}>
            ▶ PRESS START
          </div>
        </div>
      </div>

      {/* Version label */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontFamily: 'var(--px-font)',
          fontSize: 7,
          color: '#303050',
          zIndex: 2,
        }}
      >
        v2026.1
      </div>

      {/* Copyright */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--px-font)',
          fontSize: 7,
          color: '#303050',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        © 2026 AI BATTLE ARENA
      </div>
    </div>
  );
};

export default IntroScreen;
