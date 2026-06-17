import React, { useState, useEffect } from 'react';

const BattleRing = ({ battleState, winnerName }) => {
  const [sparks, setSparks] = useState([]);

  // Generate random floating sparks during active phases
  useEffect(() => {
    if (battleState === 'fighting' || battleState === 'judging') {
      const interval = setInterval(() => {
        const id = Math.random();
        const size = Math.random() * 4 + 2; // 2px - 6px
        const left = Math.random() * 100;
        const color = Math.random() > 0.5 ? '#06b6d4' : '#ef4444'; // Cyan vs Red sparks
        const delay = Math.random() * 0.5;
        
        setSparks((prev) => [...prev.slice(-15), { id, size, left, color, delay }]);
      }, 200);

      return () => {
        clearInterval(interval);
        setSparks([]);
      };
    }
  }, [battleState]);

  // Determine state styling classes
  let centerText = 'VS';
  let centerTextColor = 'text-neon-purple glow-text-purple';
  let pulseClass = '';
  let ringColor = 'stroke-neon-purple/40';
  let ringGlow = 'rgba(139, 92, 246, 0.15)';

  if (battleState === 'fighting') {
    centerText = 'FIGHTING';
    centerTextColor = 'text-battle-red glow-text-red animate-pulse-red';
    pulseClass = 'animate-pulse';
    ringColor = 'stroke-battle-red/60';
    ringGlow = 'rgba(239, 68, 68, 0.2)';
  } else if (battleState === 'judging') {
    centerText = 'JUDGING';
    centerTextColor = 'text-electric-cyan glow-text-cyan animate-pulse-cyan';
    pulseClass = 'animate-pulse-cyan';
    ringColor = 'stroke-electric-cyan/60';
    ringGlow = 'rgba(6, 182, 212, 0.2)';
  } else if (battleState === 'winner') {
    centerText = 'WINNER';
    centerTextColor = 'text-gold-winner glow-text-gold';
    ringColor = 'stroke-gold-winner/70';
    ringGlow = 'rgba(245, 158, 11, 0.3)';
  }

  const isThemeCyan = winnerName === 'Mistral AI';
  const winnerColorClass = isThemeCyan ? 'text-electric-cyan glow-text-cyan' : 'text-battle-red glow-text-red';

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center select-none">
      {/* Sparks Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="spark"
            style={{
              left: `${spark.left}%`,
              bottom: '10%',
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.color,
              boxShadow: `0 0 8px ${spark.color}`,
              animationDelay: `${spark.delay}s`
            }}
          />
        ))}
      </div>

      {/* Dramatic Ring Radial Backlight */}
      <div 
        className="absolute w-[240px] h-[240px] rounded-full blur-[40px] opacity-60 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${ringGlow} 0%, transparent 70%)`
        }}
      />

      {/* Rotating Hexagonal SVG Ring */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {/* outer spinning ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
        />
        
        {/* Hexagon Outline */}
        <polygon
          points="50,9 85,30 85,70 50,91 15,70 15,30"
          fill="none"
          className={`transition-all duration-1000 ${ringColor}`}
          strokeWidth="1.5"
          strokeDasharray="6 2 4 4"
        />

        {/* Inner rotating technical ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          className={`animate-spin-slow ${ringColor}`}
          strokeWidth="0.75"
          strokeDasharray="12 6 24 12"
          strokeOpacity="0.8"
        />

        {/* Reverse spinning tick ring */}
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          className="animate-spin-reverse-slow stroke-white/5"
          strokeWidth="1"
          strokeDasharray="2 12"
        />

        {/* Small pointer nodes on hexagon */}
        <circle cx="50" cy="9" r="1.5" className="fill-neon-purple animate-pulse" />
        <circle cx="85" cy="30" r="1.2" className="fill-electric-cyan" />
        <circle cx="85" cy="70" r="1.2" className="fill-battle-red" />
        <circle cx="50" cy="91" r="1.5" className="fill-neon-purple animate-pulse" />
        <circle cx="15" cy="70" r="1.2" className="fill-battle-red" />
        <circle cx="15" cy="30" r="1.2" className="fill-electric-cyan" />
      </svg>

      {/* Center Status Indicators */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {battleState === 'idle' ? (
          <>
            {/* VS Mode */}
            <div className="relative">
              <span className="font-heading font-black text-6xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-neon-purple via-white to-electric-cyan glow-text-purple select-none animate-pulse-purple">
                VS
              </span>
              {/* Lightning Bolt */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold-winner text-xl animate-bounce">
                ⚡
              </div>
            </div>
            <span className="font-heading text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-2">
              Awaiting Combat
            </span>
          </>
        ) : (
          <>
            <span className={`font-heading font-black text-3xl tracking-widest uppercase ${centerTextColor} ${pulseClass}`}>
              {centerText}
            </span>
            {battleState === 'fighting' && (
              <div className="flex gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-battle-red animate-ping [animation-delay:0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-ping [animation-delay:0.6s]" />
              </div>
            )}
            {battleState === 'judging' && (
              <div className="absolute w-[180px] h-[180px] rounded-full border border-electric-cyan/20 animate-ping pointer-events-none" />
            )}
            {battleState === 'winner' && (
              <h4 className={`font-heading font-extrabold text-lg mt-1 tracking-wide uppercase ${winnerColorClass}`}>
                {winnerName}
              </h4>
            )}
            <span className="font-heading text-[9px] text-gray-500 font-bold tracking-wider uppercase mt-1 select-none">
              {battleState === 'fighting' && 'PROCESSING PROMPT'}
              {battleState === 'judging' && 'GEMINI AI ARBITRATION'}
              {battleState === 'winner' && 'DECISION FINAL'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleRing;
