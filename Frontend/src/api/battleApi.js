/**
 * ============================================================
 * AI Battle Arena — Battle API Service
 * ============================================================
 *
 * HOW TO CONNECT YOUR BACKEND:
 *   1. Set USE_MOCK = false
 *   2. Set BASE_URL to your backend URL (or use VITE_API_URL env var)
 *   3. Ensure your backend returns the same data shape (BattleResult)
 *
 * All functions return Promises with the same shape whether
 * mock or real — so NO component changes are needed when
 * switching to the real backend.
 *
 * EXPECTED DATA SHAPE (BattleResult):
 * {
 *   id: string,
 *   prompt: string,
 *   winner: "Mistral AI" | "Cohere AI",
 *   date: string (ISO date),
 *   mistral: { score: number (0-100), response: string },
 *   cohere:  { score: number (0-100), response: string },
 *   judge:   { reasoning: string, scores: { mistral: number, cohere: number } }
 * }
 * ============================================================
 */

import { presetBattles, generateProceduralBattle } from '../mockData';

// ── Config ────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const USE_MOCK = true; // ← Set to false when backend is ready

// Timing for mock "loading" phases (ms)
const MOCK_FIGHT_DELAY  = 2200; // AIs thinking
const MOCK_JUDGE_DELAY  = 1500; // Judge evaluating

// ── Internal fetch wrapper ────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API ${response.status}: ${errorBody}`);
  }
  return response.json();
};

// ─────────────────────────────────────────────────────────────
// EXPORTED API FUNCTIONS
// Replace mock blocks with real API calls to your backend.
// ─────────────────────────────────────────────────────────────

/**
 * Start a new battle
 * @param {string} prompt
 * @returns {Promise<BattleResult>}
 *
 * REAL BACKEND: POST /api/battle/start  { body: { prompt } }
 */
export const startBattle = async (prompt) => {
  if (!USE_MOCK) {
    return apiFetch('/api/battle/start', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  // ── MOCK ──────────────────────────────────────────────────
  return new Promise((resolve) => {
    setTimeout(() => {
      const matched = presetBattles.find(
        (b) => b.prompt.toLowerCase() === prompt.toLowerCase()
      );
      const result = matched
        ? { ...matched, id: `battle-${Date.now()}`, date: new Date().toISOString().split('T')[0] }
        : generateProceduralBattle(prompt);
      resolve(result);
    }, MOCK_FIGHT_DELAY + MOCK_JUDGE_DELAY);
  });
};

/**
 * Get full battle history
 * @returns {Promise<BattleResult[]>}
 *
 * REAL BACKEND: GET /api/battle/history
 */
export const getBattleHistory = async () => {
  if (!USE_MOCK) return apiFetch('/api/battle/history');
  return Promise.resolve([...presetBattles]);
};

/**
 * Get a single battle by ID
 * @param {string} id
 * @returns {Promise<BattleResult|null>}
 *
 * REAL BACKEND: GET /api/battle/:id
 */
export const getBattleById = async (id) => {
  if (!USE_MOCK) return apiFetch(`/api/battle/${id}`);
  return Promise.resolve(presetBattles.find((b) => b.id === id) || null);
};

/**
 * Get preset battle prompts (the "moves" the trainer can select)
 * @returns {Promise<PresetMove[]>}
 *
 * REAL BACKEND: GET /api/battle/presets
 */
export const getPresetMoves = async () => {
  if (!USE_MOCK) return apiFetch('/api/battle/presets');

  const LABELS = {
    'fibonacci-python':    { label: 'FIBONACCI',   icon: '🐍', type: 'CODE',    pp: 15 },
    'poetry-ai-conflict':  { label: 'CYBER POEM',  icon: '✍️', type: 'CREATIVE', pp: 10 },
    'quantum-10-years-old':{ label: 'QUANTUM COIN',icon: '⚛️', type: 'SCIENCE',  pp: 10 },
  };

  return Promise.resolve(
    presetBattles.map((b) => ({
      id: b.id,
      prompt: b.prompt,
      ...(LABELS[b.id] || { label: b.id, icon: '⚡', type: 'SPECIAL', pp: 5 }),
    }))
  );
};

// Expose timing constants so components can use them for animations
export const BATTLE_TIMINGS = {
  FIGHT: MOCK_FIGHT_DELAY,
  JUDGE: MOCK_JUDGE_DELAY,
  TOTAL: MOCK_FIGHT_DELAY + MOCK_JUDGE_DELAY,
  POKEBALL_THROW: 1200, // pokéball animation duration
  HP_DRAIN: 1000,       // HP bar drain animation
};
