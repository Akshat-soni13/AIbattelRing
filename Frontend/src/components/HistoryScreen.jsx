import React from 'react';

// ─────────────────────────────────────────────────────────────
// HistoryScreen — Pokédex-style battle history list
//
// Props:
//   historyList    BattleResult[]
//   onSelectBattle fn(battle)
// ─────────────────────────────────────────────────────────────
const HistoryScreen = ({ historyList = [], onSelectBattle }) => {
  const WINNER_COLORS = {
    'Mistral AI': { color: '#9060f0', bg: '#1a0a30' },
    'Cohere AI':  { color: '#f05020', bg: '#300a0a' },
  };

  return (
    <div style={{ padding: '16px', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--px-font)',
          fontSize: 14,
          color: 'var(--poke-yellow)',
          textShadow: '2px 2px 0 #806000',
          letterSpacing: 3,
          marginBottom: 8,
        }}>
          📜 BATTLE LOG
        </div>
        <div style={{
          fontFamily: 'var(--px-font)',
          fontSize: 7,
          color: '#505878',
          letterSpacing: 2,
        }}>
          {historyList.length} BATTLES RECORDED
        </div>
      </div>

      {/* Empty state */}
      {historyList.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          fontFamily: 'var(--px-font)',
          fontSize: 9,
          color: '#404060',
          lineHeight: 3,
        }}>
          No battles yet!<br />
          Go fight someone!
        </div>
      )}

      {/* Battle list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {historyList.map((battle, i) => {
          const wc = WINNER_COLORS[battle.winner] || { color: '#a0a8d8', bg: '#101028' };
          const mScore = battle.judge?.scores?.mistral || battle.mistral?.score || 0;
          const cScore = battle.judge?.scores?.cohere  || battle.cohere?.score  || 0;

          return (
            <button
              key={battle.id}
              id={`history-item-${battle.id}`}
              onClick={() => onSelectBattle?.(battle)}
              style={{
                background: '#0f0f28',
                border: `3px solid var(--box-border)`,
                borderLeft: `5px solid ${wc.color}`,
                borderRadius: 8,
                padding: '12px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                animation: `slide-up-in 0.3s ease-out ${i * 0.05}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#141430';
                e.currentTarget.style.borderColor = wc.color;
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0f0f28';
                e.currentTarget.style.borderColor = 'var(--box-border)';
                e.currentTarget.style.borderLeftColor = wc.color;
                e.currentTarget.style.transform = 'none';
              }}
            >
              {/* Battle number */}
              <div style={{
                fontFamily: 'var(--px-font)',
                fontSize: 8,
                color: '#404060',
                minWidth: 28,
              }}>
                #{String(historyList.length - i).padStart(3, '0')}
              </div>

              {/* Prompt */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--px-font)',
                  fontSize: 8,
                  color: '#ffffff',
                  marginBottom: 5,
                  letterSpacing: 0.5,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {battle.prompt}
                </div>
                <div style={{
                  fontFamily: 'var(--px-font)',
                  fontSize: 7,
                  color: '#505878',
                  letterSpacing: 1,
                }}>
                  {battle.date}
                </div>
              </div>

              {/* Scores */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <ScorePill label="M" score={mScore} color="#9060f0" />
                <span style={{ fontFamily: 'var(--px-font)', fontSize: 8, color: '#404060' }}>vs</span>
                <ScorePill label="C" score={cScore} color="#f05020" />
              </div>

              {/* Winner badge */}
              <div style={{
                background: wc.bg,
                border: `2px solid ${wc.color}`,
                borderRadius: 6,
                padding: '4px 8px',
                fontFamily: 'var(--px-font)',
                fontSize: 7,
                color: wc.color,
                whiteSpace: 'nowrap',
                letterSpacing: 0.5,
              }}>
                {battle.winner === 'Mistral AI' ? 'MISTRAL 🏆' : 'COHERE 🏆'}
              </div>

              <div style={{ color: '#404060', fontSize: 12 }}>▶</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ScorePill = ({ label, score, color }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  }}>
    <span style={{ fontFamily: 'var(--px-font)', fontSize: 6, color: '#505878' }}>{label}</span>
    <span style={{ fontFamily: 'var(--px-font)', fontSize: 9, color }}>
      {score}
    </span>
  </div>
);

export default HistoryScreen;
