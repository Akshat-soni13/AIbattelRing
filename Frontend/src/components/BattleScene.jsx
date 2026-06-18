import React, { useEffect, useState } from 'react';
import PokemonDisplay from './PokemonDisplay';
import BattleMenu from './BattleMenu';
import PokeballAnimation from './PokeballAnimation';
import { BATTLE_TIMINGS } from '../api/battleApi';

// ─────────────────────────────────────────────────────────────
// Pokémon data for each AI fighter
// ─────────────────────────────────────────────────────────────
const POKEMON_DATA = {
  mistral: {
    name: 'MISTRAL',
    fullName: 'Mistral AI',
    // Using Mewtwo — psychic/powerful, perfect for a technical AI
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
    level: 52,
    typeColor: '#9060f0',
    typeName: 'PSYCHIC',
  },
  cohere: {
    name: 'COHERE',
    fullName: 'Cohere AI',
    // Using Charizard — fire/expressive, great for a creative AI
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    level: 50,
    typeColor: '#f05020',
    typeName: 'FIRE',
  },
};

// ─────────────────────────────────────────────────────────────
// BattleScene — Main Pokémon battle view
//
// Props:
//   battleState   string
//   activeBattle  object|null  — battle result
//   moves         array        — preset moves
//   onSelectMove  fn
//   onCustomMove  fn
//   onNewBattle   fn
//   onShowHistory fn
// ─────────────────────────────────────────────────────────────
const BattleScene = ({
  battleState,
  activeBattle,
  moves,
  onSelectMove,
  onCustomMove,
  onNewBattle,
  onShowHistory,
}) => {
  const [mistralHP, setMistralHP] = useState(100);
  const [cohereHP, setCohereHP]   = useState(100);
  const [mistralState, setMistralState] = useState('idle');
  const [cohereState, setCohereState]   = useState('idle');
  const [showPokeball, setShowPokeball] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const mistralData = POKEMON_DATA.mistral;
  const cohereData  = POKEMON_DATA.cohere;
  const winner      = activeBattle?.winner || '';

  // ── HP drain animation when battle result arrives ──────────
  useEffect(() => {
    if (battleState === 'winner' && activeBattle) {
      const mScore = activeBattle.mistral?.score || 80;
      const cScore = activeBattle.cohere?.score  || 80;

      // Drain HP to 100 - score (lower score = more "damage")
      const mHP = Math.max(5, mScore);
      const cHP = Math.max(5, cScore);

      // Add a slight delay so the transition is visible
      const t = setTimeout(() => {
        setMistralHP(mHP);
        setCohereHP(cHP);
      }, 400);

      return () => clearTimeout(t);
    }
    if (battleState === 'idle') {
      setMistralHP(100);
      setCohereHP(100);
    }
  }, [battleState, activeBattle]);

  // ── Pokémon state animations ───────────────────────────────
  useEffect(() => {
    if (battleState === 'throwing') {
      setShowPokeball(true);
      setMistralState('idle');
      setCohereState('idle');
    }
    if (battleState === 'fighting') {
      setShowPokeball(false);
      setMistralState('appear');
      setCohereState('appear');
      // Switch to fighting after appear animation
      const t = setTimeout(() => {
        setMistralState('fighting');
        setCohereState('fighting');
      }, 900);
      return () => clearTimeout(t);
    }
    if (battleState === 'winner' && activeBattle) {
      const isM = winner === mistralData.fullName;
      setMistralState(isM ? 'winner' : 'loser');
      setCohereState(isM ? 'loser' : 'winner');
      // Spawn confetti
      spawnConfetti();
    }
    if (battleState === 'idle') {
      setMistralState('idle');
      setCohereState('idle');
      setShowPokeball(false);
    }
  }, [battleState, activeBattle]);

  const spawnConfetti = () => {
    const colors = ['#f8c000', '#f04040', '#4090f0', '#40d040', '#c040f0', '#f08040'];
    setConfetti(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[i % colors.length],
        size: 6 + Math.random() * 8,
        delay: Math.random() * 1.5,
        dur: 2.5 + Math.random() * 1.5,
      }))
    );
    setTimeout(() => setConfetti([]), 5000);
  };

  // ── Dialogue text generation ───────────────────────────────
  const getDialogue = () => {
    if (battleState === 'idle' && !activeBattle)
      return 'Choose your battle challenge! What will you use?';
    if (battleState === 'idle' && activeBattle)
      return `${winner} won the battle! Choose a new challenge!`;
    if (battleState === 'throwing')
      return 'Trainer sent out their AI Pokémon!';
    if (battleState === 'fighting')
      return 'Both AI Pokémon are generating responses...';
    if (battleState === 'judging')
      return 'The Gemini Judge is evaluating the battle...';
    if (battleState === 'winner')
      return `The battle is over! ${winner} emerges victorious!`;
    return 'What will you do?';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-p"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            borderRadius: 2,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur}s`,
          }}
        />
      ))}

      {/* Pokéball throw overlay */}
      {showPokeball && (
        <PokeballAnimation onComplete={() => setShowPokeball(false)} />
      )}

      {/* ── BATTLE FIELD ────────────────────────────────────── */}
      <div
        className="battle-scene"
        style={{ flex: 1, minHeight: 380, position: 'relative', display: 'flex', flexDirection: 'column' }}
      >
        {/* Winner Banner */}
        {battleState === 'winner' && activeBattle && (
          <div
            style={{
              position: 'absolute',
              top: 0, left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              animation: 'winner-drop 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              background: 'linear-gradient(90deg, #c89000, #f8c000, #c89000)',
              border: '3px solid #a07000',
              borderTop: 'none',
              padding: '8px 24px',
              borderRadius: '0 0 10px 10px',
              fontFamily: 'var(--px-font)',
              fontSize: 9,
              color: '#000',
              letterSpacing: 2,
            }}>
              👑 {winner.toUpperCase()} WINS!
            </div>
          </div>
        )}

        {/* Enemy Pokémon (top area) — Cohere */}
        <div style={{ position: 'relative', zIndex: 2, paddingTop: 16 }}>
          <PokemonDisplay
            side="enemy"
            name={cohereData.name}
            spriteUrl={cohereData.spriteUrl}
            level={cohereData.level}
            hp={cohereHP}
            maxHP={100}
            score={battleState === 'winner' ? activeBattle?.cohere?.score : undefined}
            state={cohereState}
            typeColor={cohereData.typeColor}
            typeName={cohereData.typeName}
          />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Player Pokémon (bottom area) — Mistral */}
        <div style={{ position: 'relative', zIndex: 2, paddingBottom: 8 }}>
          <PokemonDisplay
            side="player"
            name={mistralData.name}
            spriteUrl={mistralData.spriteUrl}
            level={mistralData.level}
            hp={mistralHP}
            maxHP={100}
            score={battleState === 'winner' ? activeBattle?.mistral?.score : undefined}
            state={mistralState}
            typeColor={mistralData.typeColor}
            typeName={mistralData.typeName}
          />
        </div>
      </div>

      {/* ── BATTLE MENU ─────────────────────────────────────── */}
      <BattleMenu
        battleState={battleState}
        dialogueText={getDialogue()}
        moves={moves}
        onSelectMove={onSelectMove}
        onCustomMove={onCustomMove}
        winnerName={winner}
      />

      {/* ── Judge Result Panel (shown below after battle) ───── */}
      {battleState === 'winner' && activeBattle?.judge?.reasoning && (
        <div
          style={{
            background: '#0a0a20',
            borderTop: '4px solid var(--menu-border)',
            padding: '16px',
            animation: 'slide-up-in 0.5s ease-out',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}>
            <span style={{ fontSize: 20 }}>🏛️</span>
            <div>
              <div style={{ fontFamily: 'var(--px-font)', fontSize: 8, color: 'var(--poke-yellow)', letterSpacing: 1 }}>
                JUDGE VERDICT
              </div>
              <div style={{ fontFamily: 'var(--px-font)', fontSize: 7, color: '#6068a8', marginTop: 3 }}>
                GEMINI AI EVALUATION
              </div>
            </div>
            {/* Score pills */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <div style={{
                background: mistralData.typeColor + '22',
                border: `2px solid ${mistralData.typeColor}`,
                borderRadius: 6,
                padding: '4px 10px',
                fontFamily: 'var(--px-font)',
                fontSize: 8,
                color: mistralData.typeColor,
              }}>
                MISTRAL {activeBattle.judge.scores?.mistral}
              </div>
              <div style={{
                background: cohereData.typeColor + '22',
                border: `2px solid ${cohereData.typeColor}`,
                borderRadius: 6,
                padding: '4px 10px',
                fontFamily: 'var(--px-font)',
                fontSize: 8,
                color: cohereData.typeColor,
              }}>
                COHERE {activeBattle.judge.scores?.cohere}
              </div>
            </div>
          </div>

          {/* Reasoning text */}
          <div style={{
            background: '#0f0f28',
            border: '2px solid #1e2050',
            borderRadius: 6,
            padding: '12px 14px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: '#b0b8d8',
            lineHeight: 1.7,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            {activeBattle.judge.reasoning}
          </div>

          {/* New Battle button */}
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button
              id="btn-new-battle"
              onClick={onNewBattle}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #2040a0, #4060d0)',
                border: '3px solid #6080f0',
                borderRadius: 8,
                padding: '12px',
                fontFamily: 'var(--px-font)',
                fontSize: 9,
                color: '#fff',
                cursor: 'pointer',
                letterSpacing: 1,
              }}
            >
              ⚔️ NEW BATTLE
            </button>
            <button
              id="btn-view-history"
              onClick={onShowHistory}
              style={{
                flex: 1,
                background: '#101028',
                border: '3px solid var(--box-border)',
                borderRadius: 8,
                padding: '12px',
                fontFamily: 'var(--px-font)',
                fontSize: 9,
                color: '#a0a8d8',
                cursor: 'pointer',
                letterSpacing: 1,
              }}
            >
              📜 VIEW HISTORY
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleScene;
